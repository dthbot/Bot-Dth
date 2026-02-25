const handler = async (m, { conn, usedPrefix = '.' }) => {

  const chat = global.db.data.chats[m.chat] || {}
  const bot = global.db.data.settings[conn.user.jid] || {}

  const stato = (v) => v ? '🟢 𝐨𝐧' : '🔴 𝐨𝐟𝐟'
  const args = m.text.split(' ')[1] || '1'

  const sezioni = {

    1: `
🌑 𝐍𝚵𝑿𝐒𝐔𝐒 – 𝐌𝐄𝐍𝐔 𝐅𝐔𝐍𝐙𝐈𝐎𝐍𝐈 ⚡
════════════════════

🛠️ 𝐂𝐎𝐌𝐀𝐍𝐃𝐈
➤ ${usedPrefix}1 <funzione>
➤ ${usedPrefix}0 <funzione>

🛡️ 𝐏𝐑𝐎𝐓𝐄𝐙𝐈𝐎𝐍𝐈 (1/3)
➤ 🔗 AntiLink → ${stato(chat.antiLink)}
➤ 🧱 AntiTrava → ${stato(chat.antitrava)}
➤ 💣 AntiNuke → ${stato(chat.antinuke)}
➤ 🛑 AntiSpam → ${stato(chat.antispam)}
`.trim(),

    2: `
🌑 𝐍𝚵𝑿𝐒𝐔𝐒 – 𝐌𝐄𝐍𝐔 𝐅𝐔𝐍𝐙𝐈𝐎𝐍𝐈 ⚡
════════════════════

🛡️ 𝐏𝐑𝐎𝐓𝐄𝐙𝐈𝐎𝐍𝐈 (2/3)
➤ 🤖 AntiBot → ${stato(chat.antiBot)}
➤ 📸 AntiInsta → ${stato(chat.antiInsta)}
➤ ✈️ AntiTelegram → ${stato(chat.antiTelegram)}
➤ 🎵 AntiTiktok → ${stato(chat.antiTiktok)}
➤ 🏷️ AntiTag → ${stato(chat.antiTag)}
➤ 🚫 AntiGore → ${stato(chat.antigore)}
➤ 🔞 AntiPorno → ${stato(chat.antiporno)}
`.trim(),

    3: `
🌑 𝐍𝚵𝑿𝐒𝐔𝐒 – 𝐌𝐄𝐍𝐔 𝐅𝐔𝐍𝐙𝐈𝐎𝐍𝐈 ⚡
════════════════════

🔒 𝐂𝐎𝐍𝐓𝐑𝐎𝐋𝐋𝐎
➤ 🛡️ SoloAdmin → ${stato(chat.modoadmin)}

👋 𝐌𝐄𝐒𝐒𝐀𝐆𝐆𝐈
➤ 👋 Benvenuto → ${stato(chat.welcome)}
➤ 🚪 Addio → ${stato(chat.goodbye)}

👑 𝐎𝐖𝐍𝐄𝐑 / 𝐁𝐎𝐓
➤ 🔒 AntiPrivato → ${stato(bot.antiprivato)}

════════════════════
📌 Usa: ${usedPrefix}1 <funzione> / ${usedPrefix}0 <funzione>
`.trim()

  }

  const sezioneAttuale = parseInt(args)
  const testo = sezioni[sezioneAttuale]
  if (!testo) return

  let buttons = []

  if (sezioneAttuale < 3) {
    buttons.push({
      buttonId: `${usedPrefix}funzioni ${sezioneAttuale + 1}`,
      buttonText: { displayText: "➡️ Prossima Sezione" },
      type: 1
    })
  }

  if (sezioneAttuale > 1) {
    buttons.push({
      buttonId: `${usedPrefix}funzioni ${sezioneAttuale - 1}`,
      buttonText: { displayText: "⬅️ Sezione Precedente" },
      type: 1
    })
  }

  await conn.sendMessage(m.chat, {
    text: testo,
    footer: "MENU FUNZIONI",
    buttons: buttons,
    headerType: 1
  })
}

handler.help = ['funzioni']
handler.tags = ['menu']
handler.command = /^(funzioni)(\s\d+)?$/i

export default handler