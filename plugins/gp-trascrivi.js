// pip install openai-whisper && npm install fluent-ffmpeg && pip install faster-whisper

import fs from 'fs'
import { exec } from 'child_process'
import path from 'path'

const handler = async (m, { conn }) => {
  if (!m.isGroup)
    return m.reply('⚠️ Solo nei gruppi.');

  if (!m.quoted || !/audio/.test(m.quoted.mimetype))
    return m.reply('⚠️ Rispondi a un audio.');

  await m.reply('🎙️ Trascrizione in corso...');

  try {
    const audioBuffer = await m.quoted.download();
    const filePath = path.join('./tmp', `${Date.now()}.ogg`);
    const outputPath = filePath.replace('.ogg', '.txt');

    fs.writeFileSync(filePath, audioBuffer);

    exec(`whisper ${filePath} --language Italian --model small --output_format txt --output_dir ./tmp`, async (err) => {
      if (err) {
        console.error(err);
        return m.reply('❌ Errore nella trascrizione.');
      }

      const resultFile = filePath.replace('.ogg', '.txt');

      if (!fs.existsSync(resultFile))
        return m.reply('❌ File trascrizione non trovato.');

      const text = fs.readFileSync(resultFile, 'utf-8');

      await conn.sendMessage(
        m.chat,
        {
          text: `
╔═[ 𝐃𝐀𝐍𝐆𝐄𝐑 𝐁𝐎𝐓 ]═╗
 🎙️ 𝐓𝐑𝐀𝐒𝐂𝐑𝐈𝐙𝐈𝐎𝐍𝐄 🎙️
╚═══════════════╝

${text}
`.trim()
        },
        { quoted: m }
      );

      // pulizia file
      fs.unlinkSync(filePath);
      fs.unlinkSync(resultFile);
    });

  } catch (e) {
    console.error(e);
    m.reply('❌ Errore.');
  }
};

handler.help = ['trascrivi'];
handler.tags = ['group'];
handler.command = ['trascrivi'];
handler.group = true;

export default handler;