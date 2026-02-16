var handler = async (m, { conn, text, command }) => {
  let action, successMsg, errorMsg
  let sender = m.sender

  let number
  if (m.mentionedJid && m.mentionedJid[0]) {
    number = m.mentionedJid[0].split('@')[0]
  } else if (m.quoted && m.quoted.sender) {
    number = m.quoted.sender.split('@')[0]
  } else if (text && !isNaN(text)) {
    number = text
  } else {
    return conn.reply(m.chat, '⚠️ 𝐍𝐵𝐎𝐓 • 𝐌𝐞𝐧𝐳𝐢𝐨𝐧𝐚 𝐮𝐭𝐞𝐧𝐭𝐞!', m)
  }

  if (!number || number.length < 10 || number.length > 15) {
    return conn.reply(m.chat, '❌ 𝐍𝐵𝐎𝐓 • Numero non valido', m)
  }

  let user = number + '@s.whatsapp.net'

  if (['promote', 'promuovi', 'p'].includes(command)) {
    action = 'promote'
    successMsg = `
🛡️ 𝐍𝚵𝑿𝐒𝐔𝐒 𝚩𝚯𝐓
⚡ @${user.split('@')[0]} PROMOSSO
🔥 Da: @${sender.split('@')[0]}
`.trim()
    errorMsg = '❌ Promozione fallita!'
  }

  if (['demote', 'retrocedi', 'r'].includes(command)) {
    action = 'demote'
    successMsg = `
🛑 𝐍𝚵𝑿𝐒𝐔𝐒 𝚩𝚯𝐓
⚡ @${user.split('@')[0]} RETROCESSO
🔥 Da: @${sender.split('@')[0]}
`.trim()
    errorMsg = '❌ Retrocessione fallita!'
  }

  try {
    await conn.groupParticipantsUpdate(m.chat, [user], action)
    conn.reply(m.chat, successMsg, m, {
      mentions: [sender, user]
    })
  } catch (e) {
    conn.reply(m.chat, errorMsg, m)
  }
}

handler.command = ['promote', 'promuovi', 'p', 'demote', 'retrocedi', 'r']
handler.group = true
handler.owner = true
handler.botAdmin = true

export default handler