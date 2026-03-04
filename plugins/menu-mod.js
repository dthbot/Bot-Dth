const handler = async (message, { conn, usedPrefix = '.' }) => {

    const menuText = `
╔══════════════╗
   🛡️ 𝐌𝐎𝐃 𝐏𝐀𝐍𝐄𝐋 🛡️
╚══════════════╝

━━━━━━━━━━━━━━━━━━━━
🛠️ 𝐂𝐎𝐌𝐀𝐍𝐃𝐈 𝐌𝐎𝐃𝐄𝐑𝐀𝐓𝐎𝐑𝐈 👮
━━━━━━━━━━━━━━━━━━━━

🧙‍♂️ ➤ ${usedPrefix}𝐭𝐚𝐠𝐦𝐨𝐝  
⚡ ➤ ${usedPrefix}𝐩𝐢𝐧𝐠𝐦𝐨𝐝  
🚫 ➤ ${usedPrefix}𝐝𝐞𝐥𝐦  
💀 ➤ ${usedPrefix}𝐧𝐮𝐤𝐞𝐠𝐩  
⚠️ ➤ ${usedPrefix}𝐰𝐚𝐫𝐧𝐦𝐨𝐝  
✅ ➤ ${usedPrefix}𝐮𝐧𝐰𝐚𝐫𝐧𝐦𝐨𝐝  


━━━━━━━━━━━━━━━━━━━━
🔖 𝐕𝐞𝐫𝐬𝐢𝐨𝐧𝐞: 1.0 🚀
━━━━━━━━━━━━━━━━━━━━
`.trim();

    await conn.sendMessage(message.chat, { text: menuText });
};

handler.help = ['menumod'];
handler.tags = ['menu'];
handler.command = /^(mod)$/i;

export default handler;