import fetch from 'node-fetch'
import { createCanvas, loadImage } from 'canvas'

async function applicaEffetto(m, conn, tipoEffetto, usedPrefix, command) {
    let who = m.sender

    const messaggiHelp = {
        gay: `『 🏳️‍🌈 』 Rendi gay qualcuno\n\nEsempio: ${usedPrefix + command} @utente o rispondi a un messaggio`,
        trans: `『 🏳️‍⚧️ 』 Rendi trans qualcuno\n\nEsempio: ${usedPrefix + command} @utente o rispondi a un messaggio`,
        sborra: `『 💦 』 Effetto splash\n\nEsempio: ${usedPrefix + command} @utente o rispondi a un messaggio`
    }

    if (!m.quoted && !m.mentionedJid?.[0] && !m.sender)
        return m.reply(messaggiHelp[tipoEffetto])

    try {
        let nomeUtente
        let bufferImmagine

        // 🔥 PRIORITÀ:
        // 1️⃣ Se quoto un'immagine → usa quella
        if (m.quoted?.mtype === 'imageMessage') {
            bufferImmagine = await m.quoted.download()
            nomeUtente = await conn.getName(m.quoted.sender)
        } else {

            // 2️⃣ Se rispondo a qualcuno → usa la sua foto profilo
            if (m.quoted) who = m.quoted.sender

            // 3️⃣ Se menziono qualcuno → usa la sua
            if (m.mentionedJid?.[0]) who = m.mentionedJid[0]

            nomeUtente = await conn.getName(who)

            let pp = await conn.profilePictureUrl(who, 'image')
                .catch(() => null)

            if (!pp)
                throw new Error("L'utente non ha una foto profilo!")

            let risposta = await fetch(pp)
            if (!risposta.ok)
                throw new Error("Errore nel recupero della foto profilo")

            bufferImmagine = await risposta.arrayBuffer()
        }

        let bufferFinale = await applicaEffettiPride(bufferImmagine, tipoEffetto)

        const messaggi = {
            gay: [`${nomeUtente} ora è rainbow 🌈`],
            trans: [`${nomeUtente} ha cambiato skin 🔥`],
            sborra: [`${nomeUtente} è stato colpito 💦`]
        }

        let didascalia = `*${messaggi[tipoEffetto][Math.floor(Math.random() * messaggi[tipoEffetto].length)]}*`

        await conn.sendFile(
            m.chat,
            bufferFinale,
            `${tipoEffetto}.jpeg`,
            didascalia,
            m,
            false,
            { mentions: [who] }
        )

    } catch (e) {
        console.error(e)
        m.reply(e.message || "Errore durante l'elaborazione.")
    }
}

async function applicaEffettiPride(bufferImmagine, tipoEffetto) {
    let img = await loadImage(bufferImmagine)

    let canvas = createCanvas(img.width, img.height)
    let ctx = canvas.getContext('2d')

    ctx.drawImage(img, 0, 0)

    const coloriPride = {
        gay: ['#E40303', '#FF8C00', '#FFED00', '#008563', '#409CFF', '#955ABE'],
        trans: ['#5BCEFA', '#F5A9B8', '#FFFFFF', '#F5A9B8', '#5BCEFA'],
        sborra: ['#FFFFFF', '#E6F3FF', '#F0F8FF']
    }

    let colori = coloriPride[tipoEffetto]

    if (tipoEffetto === 'sborra') {
        for (let i = 0; i < 20; i++) {
            ctx.beginPath()
            ctx.arc(
                Math.random() * img.width,
                Math.random() * img.height,
                Math.random() * 40 + 20,
                0,
                Math.PI * 2
            )
            ctx.fillStyle = colori[1] + 'AA'
            ctx.fill()
        }
    } else {
        ctx.globalAlpha = 0.45
        const stripeHeight = img.height / colori.length

        colori.forEach((colore, i) => {
            ctx.fillStyle = colore
            ctx.fillRect(0, i * stripeHeight, img.width, stripeHeight)
        })

        ctx.globalCompositeOperation = 'overlay'
        ctx.drawImage(img, 0, 0)
        ctx.globalCompositeOperation = 'source-over'
        ctx.globalAlpha = 1
    }

    return canvas.toBuffer('image/jpeg')
}

let handler = async (m, { conn, usedPrefix, command }) => {
    const tipoEffetto = command.toLowerCase()
    await applicaEffetto(m, conn, tipoEffetto, usedPrefix, command)
}

handler.help = ['gay', 'trans', 'sborra']
handler.tags = ['giochi']
handler.command = /^(gay|trans|sborra)$/i

export default handler