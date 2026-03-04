const handler = async (message, { conn, usedPrefix = '.' }) => {

const testo = `
╔════════════════╗
   🌩️ 𝐎𝐖𝐍𝐄𝐑 𝐏𝐀𝐍𝐄𝐋 🌩️
╚════════════════╝

━━━━━━━━━━━━━━━━━━━━
🚫 𝐆𝐄𝐒𝐓𝐈𝐎𝐍𝐄 𝐔𝐓𝐄𝐍𝐓𝐈 👥
━━━━━━━━━━━━━━━━━━━━

🔇 ➤ ${usedPrefix}𝐛𝐚𝐧𝐮𝐬𝐞𝐫  
🔊 ➤ ${usedPrefix}𝐮𝐧𝐛𝐚𝐧𝐮𝐬𝐞𝐫  
🛡️ ➤ ${usedPrefix}𝐚𝐝𝐝𝐦𝐨𝐝  
❌ ➤ ${usedPrefix}𝐝𝐞𝐥𝐦𝐨𝐝  
🗑️ ➤ ${usedPrefix}𝐫𝐞𝐬𝐞𝐭𝐦𝐨𝐝  


━━━━━━━━━━━━━━━━━━━━
🤖 𝐆𝐄𝐒𝐓𝐈𝐎𝐍𝐄 𝐁𝐎𝐓 ⚙️
━━━━━━━━━━━━━━━━━━━━

📥 ➤ ${usedPrefix}𝐣𝐨𝐢𝐧 + 𝐥𝐢𝐧𝐤  
💾 ➤ ${usedPrefix}𝐫𝐞𝐢𝐦𝐩𝐨𝐬𝐭𝐚𝐠𝐩  
📢 ➤ ${usedPrefix}𝐭𝐮𝐭𝐭𝐢𝐠𝐩  
🆔 ➤ ${usedPrefix}𝐠𝐞𝐭𝐢𝐝 (𝐥𝐢𝐧𝐤 𝐠𝐩)  
👋 ➤ ${usedPrefix}𝐨𝐮𝐭  
🌐 ➤ ${usedPrefix}𝐚𝐠𝐠𝐢𝐨𝐫𝐧𝐚  


━━━━━━━━━━━━━━━━━━━━
📢 𝐅𝐔𝐍𝐙𝐈𝐎𝐍𝐈 𝐒𝐏𝐄𝐂𝐈𝐀𝐋𝐈 ✨
━━━━━━━━━━━━━━━━━━━━

🏹 ➤ ${usedPrefix}𝐛𝐢𝐠𝐭𝐚𝐠  
📂 ➤ ${usedPrefix}𝐠𝐫𝐮𝐩𝐩𝐢  
🚪 ➤ ${usedPrefix}𝐞𝐬𝐜𝐢 <𝐧𝐮𝐦𝐞𝐫𝐨>  
🌙 ➤ ${usedPrefix}𝐛𝐨𝐧𝐨𝐢𝐫  
☀️ ➤ ${usedPrefix}𝐰𝐚𝐤𝐞𝐲𝐰𝐚𝐤𝐞𝐲  
🗂️ ➤ ${usedPrefix}𝐠𝐞𝐭𝐩𝐥  


━━━━━━━━━━━━━━━━━━━━
🔖 𝐕𝐞𝐫𝐬𝐢𝐨𝐧𝐞: 1.0 🚀
━━━━━━━━━━━━━━━━━━━━
`.trim();

await conn.sendMessage(message.chat, {
    text: testo
});

};

handler.help = ['owner'];
handler.tags = ['menu'];
handler.command = /^(owner)$/i;

export default handler;