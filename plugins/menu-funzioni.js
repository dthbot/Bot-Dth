/**
 * MENU FUNZIONI – SOLO TESTO
 */

const handler = async (m, { conn, usedPrefix = '.' }) => {

  const menuText = `
⚡ *MENU FUNZIONI* ⚡
════════════════════

🛠️ *COMANDI BASE*
➤ ${usedPrefix}1 on (funzione)
➤ ${usedPrefix}0 off (funzione)

🛡️ *PROTEZIONI*
➤ AntiSpam
➤ AntiTrava
➤ AntiNuke
➤ AntiBestemmie
➤ AntiBot

🔒 *CONTROLLO GRUPPO*
➤ SoloAdmin
➤ AntiMedia
➤ AntiLink
➤ AntiTikTok
➤ AntiInsta

👋 *BENVENUTO*
➤ Benvenuto
➤ Addio

════════════════════
📂 *ALTRI MENU*
➤ ${usedPrefix}menu
➤ ${usedPrefix}menuadmin
➤ ${usedPrefix}menuowner
➤ ${usedPrefix}menumod
➤ ${usedPrefix}menugruppo

════════════════════
🔖 Versione: *2.0*
`.trim()

  await conn.sendMessage(m.chat, { text: menuText })
}

handler.help = ['menusicurezza', 'funzioni']
handler.tags = ['menu']
handler.command = /^(menusicurezza|funzioni)$/i

export default handler