const handler = async (message, { conn, usedPrefix = '.' }) => {

    const menuText = `
🛡️ 𝐍𝚵𝑿𝐒𝐔𝐒 – 𝐌𝐄𝐍𝐔 𝐀𝐃𝐌𝐈𝐍 ⚙️

════════════════════
👑 𝐆𝐄𝐒𝐓𝐈𝐎𝐍𝐄 𝐑𝐔𝐎𝐋𝐈
➤ ${usedPrefix}p ✨ Promuovi utente
➤ ${usedPrefix}r 🔥 Retrocedi utente
➤ ${usedPrefix}admins  🛡️ Lista admin

⚠️ 𝐖𝐀𝐑𝐍 & 𝐃𝐈𝐒𝐂𝐈𝐏𝐋𝐈𝐍𝐀
➤ ${usedPrefix}warn ⚠️ Avvisa utente
➤ ${usedPrefix}listwarn 📄 Lista avvisi
➤ ${usedPrefix}unwarn ✅ Rimuovi avviso
➤ ${usedPrefix}delwarn ❌ Cancella avviso
➤ ${usedPrefix}resetwarn 🔄 Reset avvisi

🔇 𝐂𝐎𝐍𝐓𝐑𝐎𝐋𝐋𝐎 𝐂𝐇𝐀𝐓
➤ ${usedPrefix}muta 🤫 Muta la persona 
➤ ${usedPrefix}smuta 🔊 Smuta la persona
➤ ${usedPrefix}tag 🏹 Tagga utenti

🔒 𝐈𝐌𝐏𝐎𝐒𝐓𝐀𝐙𝐈𝐎𝐍𝐈 𝐆𝐑𝐔𝐏𝐏𝐎
➤ ${usedPrefix}aperto  🌙 Apri gruppo
➤ ${usedPrefix}chiuso  🔐 Chiudi gruppo
➤ ${usedPrefix}modlist  📳 lista moderatori 

👋 𝐔𝐓𝐄𝐍𝐓𝐈
➤ ${usedPrefix}kick   ⚔️ Espelle utente

🔗 𝐋𝐈𝐍𝐊
➤ ${usedPrefix}link   🔗 Link gruppo

════════════════════
🔖 Versione: *1.0*
`.trim();

    await conn.sendMessage(message.chat, { text: menuText });
};

handler.help = ['menuadmin'];
handler.tags = ['menu'];
handler.command = /^(admin)$/i;

export default handler;