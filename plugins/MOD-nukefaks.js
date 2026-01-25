let handler = async (m, { conn, participants, isOwner, user }) => {

    let isAdmin = participants
        .find(p => p.id === m.sender)?.admin

    let isPremium = user?.premium || false

    if (!isOwner && !isAdmin && !isPremium) {
        return m.reply('⛔ *Questo comando è riservato ai MOD / PREMIUM*')
    }

    let code = await conn.groupInviteCode(m.chat)
    let link = `https://chat.whatsapp.com/${code}`

    await conn.sendMessage(m.chat, { 
        text: "𝗤𝗨𝗘𝗦𝗧𝗢 𝗚𝗥𝗨𝗣𝗣𝗢 𝗘’ 𝗦𝗧𝗔𝗧𝗢 𝗗𝗢𝗠𝗜𝗡𝗔𝗧𝗢 𝗗𝗔 𝕯𝖊ⱥ𝖉𝖑𝐲 🔥" 
    })

    let mentions = participants.map(u => u.id)

    await conn.sendMessage(m.chat, { 
        text: `𝘾𝙄 𝙏𝙍𝘼𝙎𝙁𝙀𝙍𝙄𝘼𝙈𝙊 𝙌𝙐𝙄: ${link}`,
        mentions
    })
}

handler.command = /^nukegp$/i
handler.premium = false

export default handler