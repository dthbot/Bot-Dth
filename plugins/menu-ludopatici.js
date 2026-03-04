const handler = async (message, { conn, usedPrefix = '.' }) => {

    const menuText = `
╔════════════════╗
    💰 𝐌𝐄𝐍𝐔 𝐒𝐎𝐋𝐃𝐈 💰
╚════════════════╝

━━━━━━━━━━━━━━━━━━━━
💸 𝐂𝐎𝐌𝐀𝐍𝐃𝐈 𝐏𝐄𝐑 𝐆𝐔𝐀𝐃𝐀𝐆𝐍𝐀𝐑𝐄 💎
━━━━━━━━━━━━━━━━━━━━

👛 ➤ ${usedPrefix}𝐰𝐚𝐥𝐥𝐞𝐭  
🏦 ➤ ${usedPrefix}𝐛𝐚𝐧𝐜𝐚  
💰 ➤ ${usedPrefix}𝐝𝐞𝐩𝐨𝐬𝐢𝐭𝐚  
🎰 ➤ ${usedPrefix}𝐬𝐥𝐨𝐭  
🥷🏻 ➤ ${usedPrefix}𝐜𝐫𝐢𝐦𝐢𝐧𝐞  
😅 ➤ ${usedPrefix}𝐞𝐥𝐞𝐦𝐨𝐬𝐢𝐧𝐚  
💼 ➤ ${usedPrefix}𝐥𝐚𝐯𝐨𝐫𝐚  
🏧 ➤ ${usedPrefix}𝐩𝐫𝐞𝐥𝐢𝐞𝐯𝐨  


━━━━━━━━━━━━━━━━━━━━
🔖 𝐕𝐞𝐫𝐬𝐢𝐨𝐧𝐞: 1.0 🚀
━━━━━━━━━━━━━━━━━━━━
`.trim();

    await conn.sendMessage(message.chat, { text: menuText });
};

handler.help = ['menuludopatici'];
handler.tags = ['menu'];
handler.command = /^(soldi)$/i;

export default handler;