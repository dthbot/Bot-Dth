const handler = async (message, { conn, usedPrefix = '.' }) => {

const testo = `
╔══════════════════════╗
   🌩️ 𝐍𝚵𝑿𝐒𝐔𝐒 – 𝐎𝐖𝐍𝐄𝐑 𝐏𝐀𝐍𝐄𝐋 🌩️
╚══════════════════════╝

━━━━━━━━━━━━━━━━━━━━
🚫 𝐆𝐄𝐒𝐓𝐈𝐎𝐍𝐄 𝐔𝐓𝐄𝐍𝐓𝐈 👥
━━━━━━━━━━━━━━━━━━━━

🔇 ➤ ${usedPrefix}banuser  
🔊 ➤ ${usedPrefix}unbanuser  
🛡️ ➤ ${usedPrefix}addmod  
❌ ➤ ${usedPrefix}delmod  
🗑️ ➤ ${usedPrefix}resetmod  


━━━━━━━━━━━━━━━━━━━━
🤖 𝐆𝐄𝐒𝐓𝐈𝐎𝐍𝐄 𝐁𝐎𝐓 ⚙️
━━━━━━━━━━━━━━━━━━━━

📥 ➤ ${usedPrefix}join + link  
💾 ➤ ${usedPrefix}reimpostagp  
📢 ➤ ${usedPrefix}tuttigp  
🆔 ➤ ${usedPrefix}getid (link gp)  
👋 ➤ ${usedPrefix}out  
🌐 ➤ ${usedPrefix}aggiorna  


━━━━━━━━━━━━━━━━━━━━
📢 𝐅𝐔𝐍𝐙𝐈𝐎𝐍𝐈 𝐒𝐏𝐄𝐂𝐈𝐀𝐋𝐈 ✨
━━━━━━━━━━━━━━━━━━━━

🏹 ➤ ${usedPrefix}bigtag  
📂 ➤ ${usedPrefix}gruppi  
🚪 ➤ ${usedPrefix}esci <numero>  
🌙 ➤ ${usedPrefix}bonoir  
☀️ ➤ ${usedPrefix}wakeywakey  
🗂️ ➤ ${usedPrefix}getpl  


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