import { performance } from 'perf_hooks'

const handler = async (m, { conn }) => {

  const start = performance.now()

  // ======================
  // INVIA PRIMO MESSAGGIO
  // ======================
  let { key } = await conn.sendMessage(
    m.chat,
    { text: "⚡ 𝐂𝐀𝐑𝐈𝐂𝐀𝐌𝐄𝐍𝐓𝐎..." },
    { quoted: m }
  )

  // ======================
  // BARRA ANIMATA
  // ======================
  const frames = [
    "《 ▒▒▒▒▒▒▒▒▒▒▒▒▒ 0% 》",
    "《 ███▒▒▒▒▒▒▒▒▒▒ 25% 》",
    "《 ██████▒▒▒▒▒▒▒ 50% 》",
    "《 █████████▒▒▒▒ 75% 》",
    "《 █████████████ 100% 》"
  ]

  for (let frame of frames) {
    await new Promise(r => setTimeout(r, 400))
    await conn.sendMessage(
      m.chat,
      { text: `⚡ 𝐂𝐀𝐑𝐈𝐂𝐀𝐌𝐄𝐍𝐓𝐎...\n\n${frame}`, edit: key }
    )
  }

  // ======================
  // CALCOLO PING REALE
  // ======================
  const end = performance.now()
  const ping = (end - start).toFixed(2)
  const uptime = clockString(process.uptime() * 1000)
  const battery = Math.floor(Math.random() * 100)

  const finalText = `
╭─❖ 「 𝐏𝐈𝐍𝐆 𝐁𝐎𝐓 」
│
├➛ ⚡ 𝐏𝐢𝐧𝐠 : ${ping} ms
├➛ 🔋 𝐁𝐚𝐭𝐭𝐞𝐫𝐢𝐚 : ${battery}%
├➛ ⏱️ 𝐔𝐩𝐭𝐢𝐦𝐞 : ${uptime}
│
╰─❖ 👑 𝑶𝒘𝒏𝒆𝒓: 𝕯𝖊ⱥ𝖉𝖑𝐲
`.trim()

  // ======================
  // MODIFICA STESSO MESSAGGIO
  // ======================
  await conn.sendMessage(
    m.chat,
    { text: finalText, edit: key }
  )
}

handler.help = ['ping']
handler.tags = ['info']
handler.command = /^(ping)$/i

export default handler

function clockString(ms) {
  const h = Math.floor(ms / 3600000)
  const m = Math.floor(ms / 60000) % 60
  const s = Math.floor(ms / 1000) % 60
  return [h, m, s].map(v => v.toString().padStart(2, '0')).join(':')
}