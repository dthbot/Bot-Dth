// pip install openai-whisper && npm install fluent-ffmpeg && pip install faster-whisper

import fs from 'fs'
import path from 'path'
import { exec } from 'child_process'
import ffmpeg from 'fluent-ffmpeg'

const handler = async (m, { conn }) => {
  if (!m.isGroup) return m.reply('⚠️ Solo nei gruppi.')
  if (!m.quoted || !/audio/.test(m.quoted.mimetype))
    return m.reply('⚠️ Rispondi a un messaggio audio.')

  await m.reply('🎙️ Trascrizione in corso...')

  try {
    // scarica l'audio
    const audioBuffer = await m.quoted.download()
    const fileBase = `${Date.now()}`
    const oggPath = path.join('.', `${fileBase}.ogg`)
    const wavPath = path.join('.', `${fileBase}.wav`)
    const txtPath = path.join('.', `${fileBase}.txt`)

    // salva l'audio scaricato
    fs.writeFileSync(oggPath, audioBuffer)

    // converte in WAV con ffmpeg
    await new Promise((resolve, reject) => {
      ffmpeg(oggPath)
        .toFormat('wav')
        .save(wavPath)
        .on('end', resolve)
        .on('error', reject)
    })

    // esegue whisper locale
    exec(`whisper "${wavPath}" --model small --output_format txt --output_dir . --language Italian`, async (err) => {
      if (err) {
        console.error(err)
        return m.reply('❌ Errore nella trascrizione.')
      }

      if (!fs.existsSync(txtPath))
        return m.reply('❌ File di trascrizione non trovato.')

      const text = fs.readFileSync(txtPath, 'utf-8')

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
      )

      // pulizia dei file
      fs.unlinkSync(oggPath)
      fs.unlinkSync(wavPath)
      fs.unlinkSync(txtPath)
    })
  } catch (e) {
    console.error(e)
    m.reply('❌ Errore durante la trascrizione.')
  }
}

handler.help = ['trascrivi']
handler.tags = ['group']
handler.command = ['trascrivi']
handler.group = true

export default handler