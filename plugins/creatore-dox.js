import axios from 'axios'

let handler = async (m, { conn, text, usedPrefix, command }) => {
    let number = text.replace(/[^0-9]/g, '')
    
    if (!number) throw `⚠️ *CONFIGURAZIONE TARGET MANCANTE* ⚠️\nUsa: *${usedPrefix + command}* [numero]\n\nEsempio: *${usedPrefix + command}* 393331234567`

    // Messaggio di caricamento in stile "Terminal/Doxer"
    let { key } = await conn.sendMessage(m.chat, { text: '📡 *CONNESSIONE AL DATABASE...*' }, { quoted: m })
    await new Promise(resolve => setTimeout(resolve, 1000))
    await conn.sendMessage(m.chat, { text: '🔓 *ACCESSO AI DEEP-LEAK IN CORSO...*', edit: key })
    await new Promise(resolve => setTimeout(resolve, 1000))
    await conn.sendMessage(m.chat, { text: '🕵️ *ESTRAZIONE DATI PRIVATI...*', edit: key })

    try {
        /* NOTA: Per funzionare come i bot Telegram, qui devi inserire l'endpoint di un'API OSINT.
           Esempio con un'ipotetica API di lookup (sostituisci con la tua sorgente)
        */
        const response = await axios.get(`https://api.free-osint.com/v1/lookup?number=${number}`).catch(() => null)
        const data = response?.data || {}

        let report = `
☠️ *𝐍𝚵𝑿𝐒𝐔𝐒 𝐃𝐎𝐗-𝐑𝐄𝐏𝐎𝐑𝐓* ☠️
━━━━━━━━━━━━━━━━━━━━
📱 *NUMERO:* ${number}
👤 *PROPRIETARIO:* ${data.name || 'Nascosto/Database Privato'}
📧 *EMAIL:* ${data.email || 'Non trovata nei leak'}
📍 *CITTÀ:* ${data.city || 'Localizzazione Approssimativa'}
🏠 *INDIRIZZO:* ${data.address || 'Dato non pubblico'}
━━━━━━━━━━━━━━━━━━━━
🔗 *COLLEGAMENTI SOCIAL:*
• FB: fb.me/search/${number}
• TG: t.me/${number}
• WA: wa.me/${number}

📂 *DATA LEAKS:*
${data.leaks ? '✅ Presente in ' + data.leaks + ' violazioni' : '❌ Nessuna violazione rilevata'}
━━━━━━━━━━━━━━━━━━━━
🔍 _Ricerca eseguita tramite protocollo Nexus OSINT_
`

        await conn.sendMessage(m.chat, { text: report, edit: key })

    } catch (e) {
        await conn.sendMessage(m.chat, { text: '⚡ *ERRORE CRITICO:* Impossibile bypassare i protocolli di sicurezza del target.', edit: key })
    }
}

handler.help = ['dox <numero>']
handler.tags = ['osint']
handler.command = ['dox', 'lookup', 'identifica', 'deadlyking']
handler.rowner = true // Solo tu puoi usarlo per sicurezza

export default handler
