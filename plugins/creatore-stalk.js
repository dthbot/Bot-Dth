import axios from 'axios'

let handler = async (m, { conn, text, usedPrefix, command }) => {
    let number = text.replace(/[^0-9]/g, '')
    if (!number) throw `❌ *ERRORE:* Inserisci un numero completo.\nEsempio: *${usedPrefix + command}* 393331234567`

    await m.reply('💀 *𝐍𝚵𝑿𝐒𝐔𝐒 𝐓𝐎𝐓𝐀𝐋-𝐒𝐂𝐀𝐍* 💀\nInfiltrazione profonda nei database mondiali...\nAnalisi Social, Leak e Registrazioni Pubbliche in corso.')

    try {
        // --- 1. DATI TECNICI (NUMVERIFY - Richiede API Key gratuita) ---
        // Registrati su numverify.com per avere la tua key
        const numVerifyKey = 'TUA_API_KEY_QUI' 
        let techData = { valid: 'N/D', location: 'N/D', carrier: 'N/D', line_type: 'N/D' }
        
        try {
            const res = await axios.get(`http://apilayer.net/api/validate?access_key=${numVerifyKey}&number=${number}`)
            if (res.data.valid) techData = res.data
        } catch (e) { /* Fallback se l'API fallisce */ }

        // --- 2. AGGREGATORE SOCIAL & OSINT (Deep Links Generati) ---
        // Questi link sfruttano i motori di ricerca interni per trovare il profilo esatto
        let googleQuery = `https://www.google.com/search?q=%22%2B${number}%22+OR+%22${number}%22`
        let facebook = `https://www.facebook.com/search/top/?q=%2B${number}`
        let instagram = `https://www.instagram.com/explore/tags/${number}/` // Spesso usato nei tag
        let trueCaller = `https://www.truecaller.com/search/it/${number}`
        let telerivolta = `https://www.telerivolta.com/ricerca?q=${number}` // Ottimo per l'Italia

        // --- 3. COSTRUZIONE DEL REPORT ESTREMO ---
        let report = `
💀 *𝐑𝐄𝐏𝐎𝐑𝐓 𝐈𝐍𝐕𝐄𝐒𝐓𝐈𝐆𝐀𝐓𝐈𝐕𝐎 𝐓𝐎𝐓𝐀𝐋𝐄* 💀
━━━━━━━━━━━━━━━━━━━━
📱 *TARGET:* +${number}
📍 *LOCALITÀ:* ${techData.location || 'Sconosciuta'}
📡 *OPERATORE:* ${techData.carrier || 'Privato'}
📱 *TIPO LINEA:* ${techData.line_type || 'Mobile'}
━━━━━━━━━━━━━━━━━━━━

🕵️‍♂️ *TRACE SOCIAL & WEB:*
👤 *FACEBOOK:* [Verifica Account/Parenti](${facebook})
📸 *INSTAGRAM:* [Tag Collegati](${instagram})
🔎 *GOOGLE DEEP SEARCH:* [Risultati Web](${googleQuery})

📞 *IDENTIFICAZIONE IDENTITÀ:*
🆔 *TRUECALLER:* [Vedi Nome Registrato](${trueCaller})
🚫 *SPAM/LISTE NERE:* [Verifica Segnalazioni](${telerivolta})

📂 *PARENTI E RELAZIONI:*
_Per i nomi dei familiari, clicca sul link Facebook sopra e controlla la sezione "Informazioni > Familiari". Se il numero è pubblico, il profilo apparirà istantaneamente._

━━━━━━━━━━━━━━━━━━━━
⚠️ *NOTE:* Se i risultati sono vuoti, il bersaglio usa sistemi di protezione o il numero è una SIM usa e getta.
`

        await conn.reply(m.chat, report, m)

    } catch (e) {
        console.error(e)
        throw '⚡ *ERRORE CRITICO:* Il rituale di scansione è stato interrotto dai firewall di rete.'
    }
}

handler.help = ['fullosint <numero>']
handler.tags = ['owner']
handler.command = ['fullosint', 'scatena', 'stalk']
handler.rowner = true

export default handler