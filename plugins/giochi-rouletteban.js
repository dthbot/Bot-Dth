let handler = async (m, { conn, participants }) => {

    const botId = conn.user.jid

    // === ADMIN & OWNER ===
    const admins = participants.filter(p => p.admin)
    const owner = admins.find(p => p.admin === 'superadmin')?.id

    // === UTENTI KICKABILI ===
    const kickable = participants.filter(p =>
        p.id !== botId &&
        p.id !== owner &&
        !p.admin
    )

    if (!kickable.length) {
        return m.reply('*⚠️ Nessun utente valido da rimuovere (tutti admin o owner).*')
    }

    // === RANDOM ===
    const randomUser = kickable[Math.floor(Math.random() * kickable.length)]
    const userJid = randomUser.id
    const userTag = userJid.split('@')[0]

    const probability = (100 / kickable.length).toFixed(2)

    // === ANNUNCIO ===
    await conn.reply(
        m.chat,
        `🎯 *Selezione Casuale*\n` +
        `╭─────────────\n` +
        `│ 👤 Utente: @${userTag}\n` +
        `│ 🎲 Probabilità: ${probability}%\n` +
        `╰─────────────`,
        m,
        { mentions: [userJid] }
    )

    // === RIMOZIONE ===
    try {
        await conn.groupParticipantsUpdate(m.chat, [userJid], 'remove')

        await conn.reply(
            m.chat,
            `💥 *@${userTag}* è stato rimosso dal gruppo.`,
            m,
            { mentions: [userJid] }
        )

        m.react('🖕🏻')
    } catch (e) {
        console.error(e)
        await conn.reply(
            m.chat,
            `❌ Non posso rimuovere *@${userTag}*.\n> Forse è admin o owner.`,
            m,
            { mentions: [userJid] }
        )
    }
}

handler.help = ['rouletteban']
handler.tags = ['giochi']
handler.command = /^(kickrandom|rouletterussa|rsban|rouletteban)$/i
handler.admin = true
handler.botAdmin = true
handler.group = true

export default handler