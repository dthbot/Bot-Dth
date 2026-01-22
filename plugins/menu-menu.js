/**
 * MENU SOLO TESTO – NO IMMAGINI
 */

const handler = async (message, { conn, usedPrefix = '.' }) => {

    const userId = message.sender
    const groupId = message.isGroup ? message.chat : null

    const userCount = Object.keys(global.db?.data?.users || {}).length

    const menuText = `
𝔻𝕋ℍ-𝔹𝕆𝕋 *MENU PRINCIPALE*

════════════════════
👥 Utenti registrati: *${userCount}*
════════════════════

🏠 *COMANDI PRINCIPALI*
➤ ${usedPrefix}ping
➤ ${usedPrefix}staff
➤ ${usedPrefix}creatore

════════════════════
💫 Usa i pulsanti qui sotto
`;

    await conn.sendMessage(message.chat, {
        text: menuText,
        footer: 'Scegli una categoria:',
        buttons: [
            { buttonId: `${usedPrefix}menuadmin`, buttonText: { displayText: '🛡️ Menu Admin' }, type: 1 },
            { buttonId: `${usedPrefix}menuowner`, buttonText: { displayText: '👑 Menu Owner' }, type: 1 },
            { buttonId: `${usedPrefix}menusicurezza`, buttonText: { displayText: '🚨 Menu Sicurezza' }, type: 1 },
            { buttonId: `${usedPrefix}menugruppo`, buttonText: { displayText: '👥 Menu Gruppo' }, type: 1 },
            { buttonId: `${usedPrefix}menuia`, buttonText: { displayText: '🤖 Menu IA' }, type: 1 }
        ],
        viewOnce: true
    })
}

handler.help = ['menu', 'comandi']
handler.tags = ['menu']
handler.command = /^(menu|comandi)$/i

export default handler