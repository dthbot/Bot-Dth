/**
 * MENU SOLO TESTO – NO IMMAGINI E SENZA PULSANTI
 */

const handler = async (message, { conn, usedPrefix = '.' }) => {

    const userId = message.sender;
    const groupId = message.isGroup ? message.chat : null;

    const userCount = Object.keys(global.db?.data?.users || {}).length;

    const menuText = `
𝔻𝕋ℍ-𝔹𝕆𝕋 *MENU PRINCIPALE*

════════════════════
👥 Utenti registrati: *${userCount}*
════════════════════

🏠 *COMANDI PRINCIPALI*
➤ ${usedPrefix}ping
➤ ${usedPrefix}staff
➤ ${usedPrefix}creatore

🎉 *ALTRI MENU*
➤ ${usedPrefix}menumod
➤ ${usedPrefix}menuowner
➤ ${usedPrefix}menugruppo
➤ ${usedPrefix}menuadmin
➤ ${usedPrefix}funzioni

════════════════════
💫 Usa i comandi sopra per navigare
`.trim();

    // INVIO SOLO TESTO
    await conn.sendMessage(message.chat, { text: menuText });
};

handler.help = ['menu', 'comandi'];
handler.tags = ['menu'];
handler.command = /^(menu|comandi)$/i;

export default handler;