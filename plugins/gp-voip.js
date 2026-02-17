import { TelegramClient, Api } from 'gramjs';
import { StringSession } from 'gramjs/sessions';

// --- CONFIGURAZIONE TELEGRAM ---
const apiId = 1234567; // Ottienilo da https://my.telegram.org
const apiHash = 'tua_api_hash';
const sessionString = 'tua_sessione_salvata'; // Sessione generata precedentemente
const clientTG = new TelegramClient(new StringSession(sessionString), apiId, apiHash, { connectionRetries: 5 });

let isConnected = false;

const handler = async (m, { conn, text, args }) => {
  if (!text) return m.reply('⚠️ Esempio: .voip germania 6');

  // Connessione al client Telegram se non è attivo
  if (!isConnected) {
    await clientTG.connect();
    isConnected = true;
  }

  const [nazione, servizio] = args;
  const targetBot = "fares_sms_bot";

  try {
    // 1. Invia il comando al bot Telegram
    await clientTG.sendMessage(targetBot, { message: `/${nazione} ${servizio}` });
    m.reply(`⏳ Richiesta inviata a @${targetBot}. Attendo il numero...`);

    // 2. Funzione per "ascoltare" la risposta specifica
    const checkResponse = async () => {
      // Prendiamo gli ultimi messaggi dalla chat con il bot Telegram
      const msgs = await clientTG.getMessages(targetBot, { limit: 1 });
      const lastMsg = msgs[0];

      if (lastMsg && !lastMsg.out) {
        // Se il messaggio non è il nostro (è la risposta del bot)
        await conn.sendMessage(m.chat, { text: `📲 *RISPOSTA TELEGRAM:*\n\n${lastMsg.message}` }, { quoted: m });
      } else {
        // Riprova dopo 3 secondi se non c'è ancora risposta
        setTimeout(checkResponse, 3000);
      }
    };

    // Avvia il controllo della risposta (con un timeout di sicurezza di 30s)
    setTimeout(checkResponse, 2000);

  } catch (err) {
    console.error(err);
    m.reply('❌ Errore nel collegamento con Telegram.');
  }
};

handler.help = ['voip <nazione> <servizio>'];
handler.tags = ['tools'];
handler.command = ['voip'];

export default handler;