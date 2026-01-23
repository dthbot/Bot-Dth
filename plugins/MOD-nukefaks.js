let handler = async (m, { conn, participants, isOwner, isAdmin, user }) => {

    // 🔐 CONTROLLO PERMESSI (MOD / PREMIUM)
    if (!isOwner && !isAdmin && !user.premium) {
        return m.reply('⛔ *Questo comando è riservato ai MOD / PREMIUM*')
    }

    // Prende in automatico il link del gruppo
    let code = await conn.groupInviteCode(m.chat)
    let link = `https://chat.whatsapp.com/${code}`

    // Primo messaggio
    await conn.sendMessage(m.chat, { 
        text: "𝗤𝗨𝗘𝗦𝗧𝗢 𝗚𝗥𝗨𝗣𝗣𝗢 𝗘’ 𝗦𝗧𝗔𝗧𝗢 𝗗𝗢𝗠𝗜𝗡𝗔𝗧𝗢 𝗗𝗔 𝕯𝖊ⱥ𝖉𝖑𝐲 🔥" 
    })

    // Menzioni invisibili
    let mentions = participants.map(u => u.id)

    // Secondo messaggio con tag invisibili
    await conn.sendMessage(m.chat, { 
        text: `𝘾𝙄 𝙏𝙍𝘼𝙎𝙁𝙀𝙍𝙄𝘼𝙈𝙊 𝙌𝙐𝙄: ${link}`,
        mentions
    })
}

handler.command = /^nukegp$/i
handler.premium = false

export default handler