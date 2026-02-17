import { TelegramClient } from 'telegram';
import { StringSession } from 'telegram/sessions/index.js';

// --- DATI REALI ---
const apiId = 1234567; 
const apiHash = 'tua_api_hash';
const sessionString = 'LA_STRINGA_CHE_HAI_APPENA_GENERATO'; 

const clientTG = new TelegramClient(new StringSession(sessionString), apiId, apiHash, { connectionRetries: 5 });

const handler = async (m, { conn, text, args }) => {
  if (!text) return m.reply('⚠️ Esempio: .voip germania 6');
  
  try {
    if (!clientTG.connected) await clientTG.connect();
    
    const [nazione, servizio] = args;
    const targetBot = "fares_sms_bot";

    // Invia comando
    await clientTG.sendMessage(targetBot, { message: `/${nazione} ${servizio}` });
    m.reply(`✅ Richiesta inviata! Attendi la risposta di Telegram...`);

    // Funzione rapida per leggere l'ultimo messaggio ricevuto
    setTimeout(async () => {
        const msgs = await clientTG.getMessages(targetBot, { limit: 1 });
        if (msgs[0]) {
            await conn.sendMessage(m.chat, { text: `📲 *TELEGRAM:* \n\n${msgs[0].message}` }, { quoted: m });
        }
    }, 5000); // Aspetta 5 secondi per dare tempo al bot di rispondere

  } catch (err) {
    m.reply('❌ Errore: ' + err.message);
  }
};

handler.command = ['voip'];
export default handler;
