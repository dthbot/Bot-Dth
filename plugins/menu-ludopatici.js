const handler = async (message, { conn, usedPrefix = '.' }) => {

        const menuText = `
╭━━━〔 💰 SOLDI PANEL 〕━⬣
┃ 🪙 Sistema soldi del bot
╰━━━━━━━━━━━━━━━━⬣

╭━━━〔 💎 COMANDI ECONOMIA 〕━⬣
┃ 👛 ${usedPrefix}wallet
┃ 🏦 ${usedPrefix}banca
┃ 💰 ${usedPrefix}deposita
┃ 🏧 ${usedPrefix}prelievo
┃
┃ 🎰 ${usedPrefix}slot
┃ 🥷 ${usedPrefix}crimine
┃ 😅 ${usedPrefix}elemosina
┃ 💼 ${usedPrefix}lavora
╰━━━━━━━━━━━━━━━━⬣

╭━━━〔 📊 INFO 〕━⬣
┃ Sistema: Economy 
┃ Versione: 1.0
┃ Status: Online ⚡
╰━━━━━━━━━━━━━━━━⬣
`.trim();
    await conn.sendMessage(message.chat, { text: menuText });
};

handler.help = ['menuludopatici'];
handler.tags = ['menu'];
handler.command = /^(soldi)$/i;

export default handler;