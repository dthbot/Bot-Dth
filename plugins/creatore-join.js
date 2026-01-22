let handler = async (m, { conn, text, usedPrefix }) => {
  const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

  let linkRegex = /chat\.whatsapp\.com\/([0-9A-Za-z]{20,24})/i;
  let [, code] = text.match(linkRegex) || [];
  if (!code) throw '❌ Link non valido!';

  m.reply(`⏳ *mbare aspetta ora entro in sto gruppo demmerda*`);
  await delay(3000);

  try {
    let res = await conn.groupAcceptInvite(code);
    let meta = await conn.groupMetadata(res);
    let members = meta.participants.map(v => v.id);

    // messaggio subito dopo il join
    await conn.reply(
      res,
`╭━━━━━━━━━━━━━━━✦━━━━━━━━━━━━━━━╮
┃ 🤖 𝐃𝐓𝐇 𝐁𝐎𝐓 è entrato nel gruppo
┃ ✨ Grazie per l’invito!
┃ 📖 Usa ${usedPrefix}menu per iniziare
╰━━━━━━━━━━━━━━━✦━━━━━━━━━━━━━━━╯`,
      m,
      { mentions: members }
    );

  } catch (e) {
    throw '⚠️ Il bot è già nel gruppo o il link non è valido.';
  }
};

handler.help = ['join <chat.whatsapp.com>'];
handler.tags = ['owner'];
handler.command = ['join'];
handler.rowner = true;

export default handler;