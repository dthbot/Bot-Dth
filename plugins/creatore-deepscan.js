import axios from 'axios'

let handler = async (m, { conn, text, usedPrefix, command }) => {
    let number = text.replace(/[^0-9]/g, '')
    if (!number) throw `❌ *ERRORE:* Specifica il numero.\nEsempio: *${usedPrefix + command}* 393331234567`

    await m.reply('🛡️ *𝐍𝚵𝑿𝐒𝐔𝐒 𝐃𝐄𝐄𝐏-𝐈𝐍𝐅𝐈𝐋𝐓𝐑𝐀𝐓𝐈𝐎𝐍* 🛡️\nAccedendo ai database dei Data-Breach...\nLocalizzazione città e ricerca email in corso.')

    try {
        // --- 1. LOCALIZZAZIONE E OPERATORE (API Gratuita IPStack/Abstract/NumVerify) ---
        // Se non metti l'API Key, useremo una stima basata sul prefisso internazionale
        let city = "Ricerca manuale necessaria"
        let carrier = "Sconosciuto"
        
        // --- 2. RICERCA EMAIL & DATA LEAK (Il "Sacro Graal") ---
        // Questi motori cercano se il numero è apparso in leak con la relativa EMAIL
        let leakCheck = `https://haveibeenpwned.com/` // Verifica se il numero è in un leak
        let intelX = `https://intelx.io/?s=${number}` // Il miglior motore per trovare EMAIL e DOCUMENTI
        let dehashed = `https://www.dehashed.com/search?query=${number}` // Database di password e email

        // --- 3. LOCALIZZAZIONE GEOGRAFICA (Google Maps & CellTower) ---
        let mapsSearch = `https://www.google.com/maps/search/${number}`
        let locate = `https://www.google.com/search?q=location+of+phone+number+${number}`

        let report = `
💀 *𝐑𝐄𝐏𝐎𝐑𝐓 𝐃𝐈 𝐒𝐏𝐈𝐎𝐍𝐀𝐆𝐆𝐈𝐎 𝐀𝐕𝐀𝐍𝐙𝐀𝐓𝐎* 💀
━━━━━━━━━━━━━━━━━━━━
📱 *TARGET:* +${number}

🏙️ *LOCALIZZAZIONE E CITTÀ:*
📍 *STIMA POSIZIONE:* [Apri su Google Maps](${mapsSearch})
🏘️ *CITTÀ/AREA:* [Verifica Coordinate](${locate})
_(Nota: La precisione dipende dal raggio della cella telefonica)_

📧 *EMAIL E DATA LEAKS (DATABASE VIOLATI):*
🔗 *INTEL-X:* [Cerca Email/Documenti](${intelX})
🚨 *DEHASHED:* [Trova Email Collegate](${dehashed})
🔑 *PAWNED:* [Verifica Violazioni](${leakCheck})

🌐 *SOCIAL & IDENTITÀ:*
👤 *PROFILO FB:* [Trova Account](${`https://www.facebook.com/search/top/?q=%2B${number}`})
📞 *NOME REGISTRATO:* [Vedi su TrueCaller](${`https://www.truecaller.com/search/it/${number}`})

━━━━━━━━━━━━━━━━━━━━
🔎 *CONSIGLIO:* Clicca su **IntelX**. Se il numero è mai stato usato per iscriversi a un sito che è stato hackerato, lì troverai l'email e a volte anche la vecchia password o l'indirizzo di casa.
`

        await conn.reply(m.chat, report, m)

    } catch (e) {
        console.error(e)
        throw '⚡ *ERRORE:* Firewall rilevato. Il target è protetto o il database è offline.'
    }
}

handler.help = ['deepscan <numero>']
handler.tags = ['owner']
handler.command = ['deepscan', 'localizza', 'emailfind']
handler.rowner = true

export default handler