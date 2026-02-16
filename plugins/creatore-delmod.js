import fetch from 'node-fetch'

const handler = async (m, { conn }) => {
  let who;
  if (m.isGroup)
    who = m.mentionedJid[0] || (m.quoted ? m.quoted.sender : null);
  else who = m.chat;

  if (!who)
    return m.reply('⚠️ Devi taggare l’utente a cui revocare il MODERATOR.');

  const user = global.db.data.users[who];
  if (!user)
    return m.reply('❌ Questo utente non esiste nel database.');

  if (!user.premium)
    return m.reply('ℹ️ Questo utente non è un MODERATOR.');

  // 🚫 Revoca MOD
  user.premium = false;
  user.premiumTime = 0;

  // 📸 Foto profilo → thumbnail
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
☠──────────────☠
🛡️ 𝐍ΞXSUS 𝚩𝚯𝐓 • 𝐌𝐎𝐃 𝐑𝐄𝐕𝐎𝐂𝐀𝐓𝐎 🛡️
☠──────────────☠

👤 Utente:
➤ ${name}

💀 Ruolo precedente:
➤ Guardiano dei rituali di NΞXSUS 𝚩𝚯𝐓

⏳ Stato attuale:
➤ ✨ POTERI REVOCA 🕳️

🔒 Tutti i privilegi di MOD sono stati rimossi
⚠️ L’ordine supremo ha deciso: nessun ritorno imminente

🌌 L’energia del rituale si ritira dall’utente...
`.trim();

  await conn.sendMessage(
    m.chat,
    {
      text: caption,
      mentions: [who],
      contextInfo: { jpegThumbnail: thumb }
    },
    { quoted: m }
  );
};

handler.help = ['delmod @user'];
handler.tags = ['owner'];
handler.command = ['delmod'];
handler.group = true;
handler.owner = true;

export default handler;