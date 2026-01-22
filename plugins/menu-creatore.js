/**
 * MENU OWNER – SOLO TESTO
 */

const handler = async (message, { conn, usedPrefix = '.' }) => {

    const menuText = `
⚡ *MENU OWNER* ⚡
════════════════════

🚫 *GESTIONE UTENTI*
➤ ${usedPrefix}banuser 🔇
➤ ${usedPrefix}unbanuser 🔊

🤖 *GESTIONE BOT*
➤ ${usedPrefix}join + link ⚠️
➤ ${usedPrefix}out 👋
➤ ${usedPrefix}aggiorna 🌐

📢 *FUNZIONI SPECIALI*
➤ ${usedPrefix}bigtag
➤ ${usedPrefix}bonoir (AFK) 🚫
➤ ${usedPrefix}wakeywakey ✅

════════════════════
📂 *ALTRI MENU*
➤ ${usedPrefix}menu
➤ ${usedPrefix}menuadmin
➤ ${usedPrefix}menumod
➤ ${usedPrefix}menugruppo
➤ ${usedPrefix}funzioni 

════════════════════
🔖 Versione: *2.0*
`.trim();

    await conn.sendMessage(message.chat, { text: menuText });
};

handler.help = ['menuowner'];
handler.tags = ['menu'];
handler.command = /^(menuowner)$/i;

export default handler;