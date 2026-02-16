import fetch from 'node-fetch'

const handler = async (m, { conn }) => {
  let who;
  if (m.isGroup)
    who = m.mentionedJid[0] || (m.quoted ? m.quoted.sender : null);
  else who = m.chat;

  if (!who)
    return m.reply('⚠️ Devi taggare l’utente da promuovere a MODERATOR.');

  // ✅ CREA L’UTENTE SE NON ESISTE
  let user = global.db.data.users[who] || (global.db.data.users[who] = {});

  // 🔒 MOD permanente
  user.premium = true;
  user.premiumTime = Infinity;

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
☯──────────────☯
🛡️ 𝐍ΞXSUS 𝚩𝚯𝐓 • 𝐌𝐎𝐃 𝐑𝐈𝐋𝐄𝐕𝐀𝐓𝐎 🛡️
☯──────────────☯

👤 𝐔𝐭𝐞𝐧𝐭𝐞: ${name}
🌌 𝐋’ESSENZA DEL MOD È STATA INFUSA

🗡️ 𝐑𝐮𝐨𝐥𝐨:
➤ Guardiano dei misteri di NΞXSUS 𝚩𝚯𝐓
⚡ Controllo totale sui rituali del gruppo

⏳ 𝐃𝐮𝐫𝐚𝐭𝐚:
➤ ♾️ Eternamente attivo

✨ 𝐀𝐜𝐜𝐞𝐬𝐬𝐨:
➤ Tutti i poteri moderatore sbloccati

🔥 𝐋𝐨𝐫𝐨 𝐜𝐡𝐞 𝐜𝐨𝐧𝐭𝐫𝐨𝐥𝐥𝐚𝐧𝐨 𝐢 𝐫𝐢𝐭𝐮𝐚𝐥𝐢
   sono ora al tuo comando, @${who.split('@')[0]}

⚡ Benvenuto nell’ordine supremo di NΞXSUS 𝚩𝚯𝐓 ⚡
─────────────────────
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

handler.help = ['addmod @user'];
handler.tags = ['owner'];
handler.command = ['addmod'];
handler.group = true;
handler.owner = true;

export default handler;