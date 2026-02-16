import fetch from 'node-fetch'

const handler = async (m, { conn }) => {
  if (!m.isGroup)
    return m.reply('⚠️ Questo comando può essere usato solo nei gruppi.');

  let who = m.mentionedJid[0] || (m.quoted ? m.quoted.sender : null);
  if (!who)
    return m.reply('⚠️ Devi taggare l’utente da promuovere a MODERATOR.');

  let chat = global.db.data.chats[m.chat] || (global.db.data.chats[m.chat] = {});
  if (!chat.mods) chat.mods = [];

  if (chat.mods.includes(who))
    return m.reply('⚠️ Questo utente è già moderatore in questo gruppo.');

  chat.mods.push(who);

  // 📸 Prende foto profilo
  let thumb;
  try {
    const ppUrl = await conn.profilePictureUrl(who, 'image');
    const res = await fetch(ppUrl);
    thumb = await res.buffer();
  } catch {
    const res = await fetch('https://i.ibb.co/3Fh9V6p/avatar-contact.png');
    thumb = await res.buffer();
  }

  const name = '@' + who.split('@')[0];

  const caption = `
🛡️ 𝐍ΞXSUS 𝚩𝚯𝐓 • 𝐌𝐎𝐃 𝐃𝐈 𝐆𝐑𝐔𝐏𝐏𝐎 🛡️

👤 Utente: ${name}
⚡ Ruolo attivo solo in questo gruppo
♾️ Durata: Fino a revoca

Benvenuto nell’élite del gruppo.
`.trim();

  await conn.sendMessage(
    m.chat,
    {
      text: caption,
      mentions: [who],
      contextInfo: {
        externalAdReply: {
          title: '🛡️ Nuovo Moderatore',
          body: `Promosso: ${name}`,
          thumbnail: thumb,
          showAdAttribution: false,
          renderLargerThumbnail: false,
          mediaType: 1
        }
      }
    },
    { quoted: m }
  );
};

handler.help = ['addmod @user'];
handler.tags = ['group'];
handler.command = ['addmod'];
handler.group = true;
handler.owner = true;

export default handler;