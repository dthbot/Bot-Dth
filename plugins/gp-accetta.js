const delay = ms => new Promise(resolve => setTimeout(resolve, ms))

var handler = async (m, { conn, isBotAdmin, isAdmin }) => {
  // 1. Controllo permessi: solo per Admin del gruppo
  if (!isAdmin) return m.reply('⚠️ Questo comando può essere utilizzato solo dagli amministratori del gruppo.')

  // 2. Il bot deve essere admin per cambiare le impostazioni
  if (!isBotAdmin) return m.reply('⚠️ Il bot deve essere admin per gestire l\'approvazione dei membri.')

  try {
    // Disattiva l'approvazione (Entrata libera)
    await conn.groupUpdateMembershipApprovalMode(m.chat, 'off')
    
    m.reply('🔓 *Approvazione DISATTIVATA*\nEntrata libera per 2 secondi...')

    // Attesa di 2 secondi
    await delay(2000)

    // Riattiva l'approvazione (Richiesta necessaria)
    await conn.groupUpdateMembershipApprovalMode(m.chat, 'on')
    
    m.reply('🔒 *Approvazione RIATTIVATA*\nIl gruppo è di nuovo protetto.')

  } catch (e) {
    console.error(e)
    m.reply('❌ Errore durante il cambio delle impostazioni. Assicurati che il gruppo supporti l\'approvazione partecipanti.')
  }
}

handler.help = ['accetta']
handler.tags = ['group']
handler.command = ['accetta', 'acetta'] 

handler.group = true
handler.admin = true // <--- SOLO PER ADMIN
handler.botAdmin = true

export default handler
