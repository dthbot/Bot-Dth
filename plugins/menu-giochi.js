const handler = async (message, { conn, usedPrefix = '.' }) => {

const userCount = Object.keys(global.db?.data?.users || {}).length;

const testo = `
╔═══════════════╗
   🎮 𝐌𝐄𝐍𝐔 𝐆𝐈𝐎𝐂𝐇𝐈 🩸
╚═══════════════╝

👥 𝐔𝐭𝐞𝐧𝐭𝐢 𝐫𝐞𝐠𝐢𝐬𝐭𝐫𝐚𝐭𝐢: *${userCount}*

━━━━━━━━━━━━
🕹️ 𝐆𝐈𝐎𝐂𝐇𝐈
━━━━━━━━━━━━

❌⭕ ➤ ${usedPrefix}𝐭𝐫𝐢𝐬  
🪢 ➤ ${usedPrefix}𝐢𝐦𝐩𝐢𝐜𝐜𝐚𝐭𝐨  
🤣 ➤ ${usedPrefix}𝐦𝐞𝐦𝐞  
🍣 ➤ ${usedPrefix}𝐜𝐢𝐛𝐨  
🚩 ➤ ${usedPrefix}𝐛𝐚𝐧𝐝𝐢𝐞𝐫𝐚  
🏆 ➤ ${usedPrefix}𝐜𝐥𝐚𝐬𝐬𝐢𝐟𝐢𝐜𝐚𝐛𝐚𝐧𝐝𝐢𝐞𝐫𝐚  

━━━━━━━━━━━
🎲 𝐅𝐔𝐍
━━━━━━━━━━━

🔮 ➤ ${usedPrefix}𝐫𝐚𝐧𝐝𝐨𝐦 <reply/tag>  
🔥 ➤ ${usedPrefix}𝐟𝐥𝐚𝐦𝐞 <reply/tag>  
🏷️ ➤ ${usedPrefix}𝐬  
✨ ➤ ${usedPrefix}𝐰𝐦  
🎶 ➤ ${usedPrefix}𝐜𝐮𝐫  
🩵 ➤ ${usedPrefix}𝐨𝐧𝐥𝐲𝐟𝐚𝐧𝐬 <nome>  
💼 ➤ ${usedPrefix}𝐜𝐮𝐫𝐫𝐢𝐜𝐮𝐥𝐮𝐦  
🏬 ➤ ${usedPrefix}𝐬𝐡𝐨𝐩  

━━━━━━━━━━━━━━━━
💍 𝐑𝐏 & 𝐅𝐀𝐌𝐈𝐆𝐋𝐈𝐀
━━━━━━━━━━━━━━━━

👰🏻 ➤ ${usedPrefix}𝐬𝐩𝐨𝐬𝐚  
💔 ➤ ${usedPrefix}𝐝𝐢𝐯𝐨𝐫𝐳𝐢𝐚  
🫂 ➤ ${usedPrefix}𝐚𝐦𝐚𝐧𝐭𝐞  
👶🏻 ➤ ${usedPrefix}𝐚𝐝𝐨𝐭𝐭𝐚  
👨‍👩‍👧‍👦 ➤ ${usedPrefix}𝐟𝐚𝐦𝐢𝐠𝐥𝐢𝐚  
👣 ➤ ${usedPrefix}𝐭𝐨𝐠𝐥𝐢𝐟𝐢𝐠𝐥𝐢𝐨  
💔 ➤ ${usedPrefix}𝐭𝐨𝐠𝐥𝐢𝐚𝐦𝐚𝐧𝐭𝐞  

━━━━━━━━━━━━━━━━━━━━
🔖 𝐕𝐞𝐫𝐬𝐢𝐨𝐧𝐞: 1.0 🚀
━━━━━━━━━━━━━━━━━━━━
`.trim();

await conn.sendMessage(message.chat, { text: testo });

};

handler.help = ['menugiochi', 'giochi'];
handler.tags = ['menu'];
handler.command = /^(menugiochi|giochi)$/i;

export default handler;