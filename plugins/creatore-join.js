let handler = async (m, { conn, text }) => {
  let linkRegex = /chat\.whatsapp\.com\/([0-9A-Za-z]{20,24})/i;
  let [, code] = text.match(linkRegex) || [];
  if (!code) throw 'Link non valido!';

  // Messaggio unico stilizzato
  await m.reply('✨ 𝐍𝚵𝑿𝐒𝐔𝐒 𝚩𝚯𝐓 ✨\n\n🚪 sta entrando nel gruppo...');

  try {
    await conn.groupAcceptInvite(code);
  } catch (e) {
    throw 'Errore: il bot è già nel gruppo o il link non è valido.';
  }
};

handler.help = ['join <chat.whatsapp.com>'];
handler.tags = ['owner'];
handler.command = ['join'];
handler.rowner = true;

export default handler;