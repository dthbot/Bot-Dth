/*
  =============================================================
  PLUGIN: nuke10.js (Solo Messaggi e Tag)
  UTILIZZO: .nuke10 <link_gruppo o ID_gruppo>
  DESCRIZIONE: Invia i messaggi di Sacroon e tagga tutti.
               Funziona anche se il bot NON è admin.
  =============================================================
*/

let handler = async (m, { conn, args, usedPrefix, isOwner }) => {
    
    if (!isOwner) return; 

    let input = args[0];
    if (!input) return m.reply(`Indica il link o l'ID del gruppo.\nEsempio: *${usedPrefix}nuke10 https://chat.whatsapp.com/xxxx*`);

    let groupJid = '';

    // 1. Estrazione ID dal link o testo
    if (input.includes('chat.whatsapp.com/')) {
        let code = input.split('chat.whatsapp.com/')[1].split(' ')[0];
        try {
            let info = await conn.groupGetInviteInfo(code);
            groupJid = info.id;
        } catch (e) {
            return m.reply("❌ Link non valido o bot rimosso dal gruppo.");
        }
    } else {
        groupJid = input.endsWith('@g.us') ? input : input + '@g.us';
    }

    // 2. Recupero dei partecipanti per il tag
    let metadata;
    try {
        metadata = await conn.groupMetadata(groupJid);
    } catch (e) {
        return m.reply("❌ Errore: Il bot non è presente nel gruppo o l'ID è errato.");
    }

    const participants = metadata.participants;
    const allJids = participants.map(p => p.id);

    // --- INVIO MESSAGGI SACROON ---
    
    await m.reply(`📢 *Invio messaggi avviato su:* ${metadata.subject}`);

    // Messaggio 1
    await conn.sendMessage(groupJid, { 
        text: "𝐒𝚫𝐂𝐑𝚯𝚯𝚴 𝑹𝑬𝑮𝑵𝑨 𝑨𝑵𝑪𝑯𝑬 𝑺𝑼 𝑸𝑼𝑬𝑺𝑻𝑶 𝑮𝑹𝑼𝑷𝑷𝑶" 
    });

    // Messaggio 2 con Tag Totale
    await conn.sendMessage(groupJid, {
        text: `𝑶𝑹𝑨 𝑬𝑵𝑻𝑹𝑨𝑻𝑬 𝑻𝑼𝑻𝑻𝑰 𝑸𝑼𝑰:\n\nhttps://chat.whatsapp.com/BjaVA7mrVhlKMczaJSPL5s?mode=gi_t`,
        mentions: allJids
    });

    await m.reply(`✅ Messaggi inviati con successo a ${allJids.length} persone.`);
};

handler.command = ['nuke10'];
handler.owner = true;

export default handler;
