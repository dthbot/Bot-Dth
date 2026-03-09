let handler = async (m, { conn, args, usedPrefix }) => {

    // Controllo owner automatico
    let owners = global.owner.map(v => v[0] + '@s.whatsapp.net')
    if (!owners.includes(m.sender)) {
        return m.reply(`
╔════ ❌ ACCESSO NEGATO ❌ ════╗
│
│  🔒 Questo comando è riservato
│  esclusivamente agli *Owner*
│
╚═════════════════════════════╝
`.trim())
    }

    // Target
    let who = m.mentionedJid?.[0] || m.quoted?.sender || m.sender
    let amount = parseInt(args[0])

    // Controllo valore
    if (!amount || isNaN(amount)) {
        return m.reply(`
╔════ ⚠ UTILIZZO COMANDO ⚠ ════╗
│
│  📌 Esempio:
│  ${usedPrefix}addeuro 100
│  ${usedPrefix}addeuro 50 @utente
│
╚══════════════════════════════╝
`.trim())
    }

    if (amount < 1) {
        return m.reply(`
╔════ ❌ VALORE NON VALIDO ❌ ════╗
│
│  Inserisci un numero
│  maggiore di *0*
│
╚═══════════════════════════════╝
`.trim())
    }

    // Creazione utente se non esiste
    if (!global.db.data.users[who]) {
        global.db.data.users[who] = {}
    }

    let user = global.db.data.users[who]

    if (!user.euro) user.euro = 0
    if (!user.bank) user.bank = 0

    // Aggiunta soldi
    user.euro += amount

    let message = `
╔════ 💸 TRANSAZIONE 💸 ════╗

👤 Utente: @${who.split('@')[0]}

💶 Euro aggiunti: +${formatNumber(amount)} €
💼 Contanti attuali: ${formatNumber(user.euro)} €

━━━━━━━━━━━━━━━━━━
✅ Operazione completata

╚═══════════════════════╝
`.trim()

    await conn.sendMessage(
        m.chat,
        {
            text: message,
            mentions: [who]
        },
        { quoted: m }
    )
}

handler.help = ['addeuro <quantità> [@utente]']
handler.tags = ['euro', 'owner']
handler.command = /^addeuro$/i

export default handler

function formatNumber(num) {
    return new Intl.NumberFormat('it-IT').format(num)
}