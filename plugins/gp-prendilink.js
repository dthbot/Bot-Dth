import jsQR from 'jsqr'
import Jimp from 'jimp'

const handler = async (m, { conn }) => {
  if (!m.isGroup)
    return m.reply('⚠️ Questo comando può essere usato solo nei gruppi.');

  if (!m.quoted)
    return m.reply('⚠️ Devi rispondere ad un messaggio con un QR code.');

  if (!/image/.test(m.quoted.mimetype || ''))
    return m.reply('⚠️ Il messaggio deve contenere un\'immagine con un QR code.');

  try {
    const media = await m.quoted.download();
    const image = await Jimp.read(media);

    const { data, width, height } = image.bitmap;
    const code = jsQR(new Uint8ClampedArray(data), width, height);

    if (!code)
      return m.reply('❌ Nessun QR code rilevato nell\'immagine.');

    const link = code.data;

    const caption = `
╔═[ 𝐍𝚵𝑿𝐒𝐔𝐒 𝚩𝚯𝐓 ]═╗
        🔗 LINK TROVATO 🔗
╚═══════════════╝

📎 ${link}
`.trim();

    await conn.sendMessage(
      m.chat,
      { text: caption },
      { quoted: m }
    );

  } catch (e) {
    console.error(e);
    m.reply('❌ Errore durante la lettura del QR.');
  }
};

handler.help = ['prendilink'];
handler.tags = ['tools'];
handler.command = ['prendilink'];
handler.group = true;

export default handler;