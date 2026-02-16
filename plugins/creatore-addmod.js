import fetch from 'node-fetch'
import sharp from 'sharp'

const handler = async (m, { conn }) => {
  if (!m.isGroup)
    return m.reply('⚠️ Questo comando può essere usato solo nei gruppi.');

  let who = m.mentionedJid[0] || (m.quoted ? m.quoted.sender : null);
  if (!who)
    return m.reply('⚠️ Devi taggare l’utente da promuovere a MOD.');

  let user = global.db.data.users[who] || (global.db.data.users[who] = {});

  // 🔒 Se è già mod in questo gruppo
  if (user.premium && user.premiumGroup === m.chat)
    return m.reply('⚠️ Questo utente è già MOD in questo gruppo.');

  // ✅ Attiva premium
  user.premium = true;

  // ✅ Salva gruppo dove è valido
  user.premiumGroup = m.chat;

  // 📸 Thumbnail profilo ridimensionata
  let thumb;
  try {
    const ppUrl = await conn.profilePictureUrl(who, 'image');
    const res = await fetch(ppUrl);
    const buffer = await res.buffer();

    thumb = await sharp(buffer)
      .resize(200, 200)
      .jpeg({ quality: 60 })
      .toBuffer();

  } catch {
    thumb = null;
  }

  const name = '@' + who.split('@')[0];

  const caption = `
╔═[ 𝐍𝚵𝑿𝐒𝐔𝐒 𝚩𝚯𝐓 ]═╗
        🛡️ 𝐌𝐎𝐃 𝐀𝐆𝐆𝐈𝐔𝐍𝐓𝐎 🛡️
╚═══════════════╝

👤 Utente: ${name}
⚡ Ruolo attivo SOLO in questo gruppo
♾️ Durata: Fino a revoca

Benvenuto nello staff di NΞXSUS.
`.trim();

  await conn.sendMessage(
    m.chat,
    {
      text: caption,
      mentions: [who],
      contextInfo: {
        mentionedJid: [who],
        jpegThumbnail: thumb
      }
    },
    { quoted: m }
  );
};

handler.help = ['addmod @user'];
handler.tags = ['group'];
handler.command = ['addmod'];
handler.group = true;
handler.admin = true;

export default handler;