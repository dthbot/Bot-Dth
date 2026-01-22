/**
 * MENU ADMIN – SOLO TESTO
 */

const handler = async (message, { conn, usedPrefix = '.' }) => {

    const menuText = `
⚙️ *MENU ADMIN* ⚙️
════════════════════

👑 *GESTIONE RUOLI*
➤ ${usedPrefix}p / promuovi
➤ ${usedPrefix}r / retrocedi
➤ ${usedPrefix}admins

⚠️ *WARN & DISCIPLINA*
➤ ${usedPrefix}warn
➤ ${usedPrefix}listwarn
➤ ${usedPrefix}unwarn
➤ ${usedPrefix}delwarn
➤ ${usedPrefix}resetwarn

🔇 *CONTROLLO CHAT*
➤ ${usedPrefix}muta
➤ ${usedPrefix}smuta
➤ ${usedPrefix}tag

🔒 *IMPOSTAZIONI GRUPPO*
➤ ${usedPrefix}aperto
➤ ${usedPrefix}chiuso
➤ ${usedPrefix}inattivi

👋 *UTENTI*
➤ ${usedPrefix}kick

⛓️ *MESSAGGI AUTOMATICI*
➤ ${usedPrefix}setbye
➤ ${usedPrefix}setbenvenuto

🔗 *LINK*
➤ ${usedPrefix}link
➤ ${usedPrefix}linkqr

════════════════════
📂 *ALTRI MENU*
➤ ${usedPrefix}menu
➤ ${usedPrefix}menuowner
➤ ${usedPrefix}menumod
➤ ${usedPrefix}menugruppo
➤ ${usedPrefix}menusicurezza
➤ ${usedPrefix}menuia

════════════════════
🔖 Versione: *2.0*
`.trim();

    await conn.sendMessage(message.chat, { text: menuText });
};

handler.help = ['menuadmin'];
handler.tags = ['menu'];
handler.command = /^(menuadmin)$/i;
handler.admin = true;

export default handler;