const delay = ms => new Promise(resolve => setTimeout(resolve, ms))

var handler = async (m, { conn, isBotAdmin, isAdmin }) => {
  if (!isAdmin) return m.reply('⚠️ Solo gli admin possono usare questo comando.')
  if (!isBotAdmin) return m.reply('⚠️ Il bot deve essere admin per cambiare le impostazioni.')

  try {
    // Prova il metodo standard di Baileys
    await conn.groupUpdateMembershipApprovalMode(m.chat, 'off')
    
    await conn.reply(m.chat, '🔓 *Approvazione DISATTIVATA*\nEntrata libera per 5 secondi...', m)

    // Aumentiamo a 5 secondi per dare tempo al server di elaborare
    await delay(5000)

    await conn.groupUpdateMembershipApprovalMode(m.chat, 'on')
    
    await conn.reply(m.chat, '🔒 *Approvazione RIATTIVATA*\nIl gruppo è di nuovo protetto.', m)

  } catch (e) {
    console.error("ERRORE_APPROVAZIONE:", e)
    
    // Tentativo alternativo se il primo fallisce
    try {
        await conn.query({
            tag: 'iq',
            attrs: {
                to: m.chat,
                type: 'set',
                xmlns: 'w:g2',
            },
            content: [{
                tag: 'membership_approval_mode',
                attrs: {},
                content: [{
                    tag: 'group_join',
                    attrs: { state: 'off' } // Prova a forzare lo stato
                }]
            }]
        })
        m.reply('⚠️ Metodo alternativo inviato, ma controlla se le impostazioni sono cambiate.')
    } catch (e2) {
        m.reply('❌ Errore critico: WhatsApp ha rifiutato il comando. Assicurati che l\'opzione "Approva nuovi partecipanti" sia visibile manualmente nelle info del gruppo.')
    }
  }
}

handler.help = ['accetta']
handler.tags = ['group']
handler.command = ['accetta', 'acetta'] 

handler.group = true
handler.admin = true 
handler.botAdmin = true

export default handler
