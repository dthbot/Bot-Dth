const handler = async (message, { conn, usedPrefix = '.' }) => {

    const menuText = `
🩸 𝐍𝚵𝑿𝐒𝐔𝐒 – 𝐌𝐄𝐍𝐔 𝐌𝐎𝐃 🛡️

════════════════════
🛠️ 𝐂𝐎𝐌𝐀𝐍𝐃𝐈 𝐌𝐎𝐃𝐄𝐑𝐀𝐓𝐎𝐑𝐈
➤ ${usedPrefix}tagmod 🧙‍♂️ Tagga tutto il gruppo 
➤ ${usedPrefix}pingmod ⚡ Verifica il ping
➤ ${usedPrefix}delm 🚫 Elimina messaggio 
➤ ${usedPrefix}nukegp 💀 Fake nuke
➤ ${usedPrefix}warnmod ⚠️ Avvisa utente
➤ ${usedPrefix}unwarnmod ✅ Rimuovi avviso

════════════════════
🔖 Versione: *1.0*
`.trim();

    // INVIO SOLO TESTO
    await conn.sendMessage(message.chat, { text: menuText });
};

handler.help = ['menumod'];
handler.tags = ['menu'];
handler.command = /^(mod)$/i;

export default handler;