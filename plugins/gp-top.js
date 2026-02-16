import fs from 'fs'

const dbPath = './database.json'

function loadDB() {
  if (!fs.existsSync(dbPath)) {
    fs.writeFileSync(dbPath, JSON.stringify({ users: {} }, null, 2))
  }

  let db = JSON.parse(fs.readFileSync(dbPath))
  if (!db.users) db.users = {}

  return db
}

function getRanking(db) {
  return Object.entries(db.users)
    .map(([jid, data]) => {
      let total = data?.messaggi || data?.messages || 0
      return [jid, total]
    })
    .filter(([_, total]) => total > 0)
    .sort((a, b) => b[1] - a[1])
}

let handler = async (m, { conn, command }) => {
  if (!m.isGroup)
    return m.reply('❌ Questo comando funziona solo nei gruppi.')

  let db = loadDB()
  let ranking = getRanking(db)

  if (!ranking.length)
    return m.reply('⚠️ Nessun messaggio registrato nel database.')

  let userJid = m.sender
  let userPosition = ranking.findIndex(([jid]) => jid === userJid) + 1

  // 🔹 COMANDO PRINCIPALE (mostra prima messaggi gruppo)
  if (command === 'stats') {
    let totalGroupMessages = ranking.reduce((acc, [, total]) => acc + total, 0)

    let text = `📊 *MESSAGGI TOTALI GRUPPO*\n\n`
    text += `💬 Totale messaggi: ${totalGroupMessages}\n\n`
    text += `📍 La tua posizione: ${userPosition || 'Non classificato'}`

    let buttons = [
      { buttonId: '.top', buttonText: { displayText: '🏆 Top 5' }, type: 1 },
      { buttonId: '.top10', buttonText: { displayText: '🔟 Top 10' }, type: 1 }
    ]

    return conn.sendMessage(m.chat, {
      text,
      footer: 'Statistiche gruppo',
      buttons,
      headerType: 1
    }, { quoted: m })
  }

  // 🔹 TOP 5
  if (command === 'top') {
    let top5 = ranking.slice(0, 5)
    let medals = ['🥇', '🥈', '🥉', '🏅', '🏅']
    let text = '🏆 *TOP 5 ATTIVITÀ*\n\n'
    let mentions = []

    top5.forEach(([jid, total], i) => {
      mentions.push(jid)
      text += `${medals[i]} @${jid.split('@')[0]}\n`
      text += `   💬 Messaggi: ${total}\n\n`
    })

    text += `📍 La tua posizione: ${userPosition || 'Non classificato'}`

    return conn.sendMessage(m.chat, {
      text,
      mentions
    }, { quoted: m })
  }

  // 🔹 TOP 10
  if (command === 'top10') {
    let top10 = ranking.slice(0, 10)
    let text = '🏆 *TOP 10 ATTIVITÀ*\n\n'
    let mentions = []

    top10.forEach(([jid, total], i) => {
      mentions.push(jid)
      text += `${i + 1}° @${jid.split('@')[0]}\n`
      text += `   💬 Messaggi: ${total}\n\n`
    })

    text += `📍 La tua posizione: ${userPosition || 'Non classificato'}`

    return conn.sendMessage(m.chat, {
      text,
      mentions
    }, { quoted: m })
  }
}

handler.command = ['stats', 'top', 'top10']
handler.tags = ['stats']
handler.help = ['stats']

export default handler