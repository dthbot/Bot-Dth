let handler = async (m, { conn, text }) => {
  const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

  let linkRegex = /chat\.whatsapp\.com\/([0-9A-Za-z]{20,24})/i;
  let [, code] = text.match(linkRegex) || [];
  if (!code) throw '❌ Link non valido! Inserisci un link valido di WhatsApp.';

  // Messaggio iniziale
  await m.reply('☠️ *𝐍𝚵𝑿𝐒𝐔𝐒 𝚩𝚯𝐓* sta preparando il rituale...\n🕯️ Sta per entrare nel gruppo.');

  await delay(2000);
  await m.reply('🔥 Le forze oscure convergono...');

  try {
    await conn.groupAcceptInvite(code);
    await delay(1500);
    await m.reply('🌌 Il rituale è completo!\n☠️ *𝐍𝚵𝑿𝐒𝐔𝐒 𝚩𝚯𝐓* è ora nel gruppo, pronto a mantenere l’ordine.');
  } catch (e) {
    throw '⚡ Errore: nexsus bot è già nel gruppo o il link non è valido.';
  }
};

handler.help = ['join <chat.whatsapp.com>'];
handler.tags = ['owner'];
handler.command = ['join'];
handler.rowner = true;

export default handler;