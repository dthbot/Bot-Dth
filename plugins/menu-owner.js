const handler = async (message, { conn, usedPrefix = '.' }) => {

    const args = message.text.split(' ')[1] || '1';

    const sezioni = {

        1: `
🌩️ 𝐍𝚵𝑿𝐒𝐔𝐒 – 𝐌𝐄𝐍𝐔 𝐎𝐖𝐍𝐄𝐑 ⚡
════════════════════

🚫 𝐆𝐄𝐒𝐓𝐈𝐎𝐍𝐄 𝐔𝐓𝐄𝐍𝐓𝐈 (1/3)
➤ ${usedPrefix}banuser 🔇 Blocca utente dal bot
➤ ${usedPrefix}unbanuser 🔊 Sblocca utente dal bot
➤ ${usedPrefix}addmod 🔉 Da moderatore
➤ ${usedPrefix}delmod 🚨 Togli moderatore
➤ ${usedPrefix}resetmod 🗑️ Resetta tutti i moderatori
`.trim(),

        2: `
🌩️ 𝐍𝚵𝑿𝐒𝐔𝐒 – 𝐌𝐄𝐍𝐔 𝐎𝐖𝐍𝐄𝐑 ⚡
════════════════════

🤖 𝐆𝐄𝐒𝐓𝐈𝐎𝐍𝐄 𝐁𝐎𝐓 (2/3)
➤ ${usedPrefix}join + link ⚠️ Fai entrare il bot
➤ ${usedPrefix}reimpostagp 💾 Reimposta link gruppo
➤ ${usedPrefix}tuttigp 🚨 Messaggio in tutti i gruppi
➤ ${usedPrefix}getid (link gp) 🆔 Ottieni ID gruppo
➤ ${usedPrefix}out 👋 Fai uscire il bot
➤ ${usedPrefix}aggiorna 🌐 Aggiorna bot
`.trim(),

        3: `
🌩️ 𝐍𝚵𝑿𝐒𝐔𝐒 – 𝐌𝐄𝐍𝐔 𝐎𝐖𝐍𝐄𝐑 ⚡
════════════════════

📢 𝐅𝐔𝐍𝐙𝐈𝐎𝐍𝐈 𝐒𝐏𝐄𝐂𝐈𝐀𝐋𝐈 (3/3)
➤ ${usedPrefix}bigtag 🏹 Tagga tutti spam
➤ ${usedPrefix}bonoir 🌙 Segna AFK
➤ ${usedPrefix}wakeywakey ✅ Toglie AFK
➤ ${usedPrefix}getpl 🗂️ Ti dà il plugin

════════════════════
🔖 Versione: *1.0*
`.trim()
    };

    const sezioneAttuale = parseInt(args);
    const testo = sezioni[sezioneAttuale];
    if (!testo) return;

    let buttons = [];

    if (sezioneAttuale < 3) {
        buttons.push({
            buttonId: `${usedPrefix}owner ${sezioneAttuale + 1}`,
            buttonText: { displayText: "➡️ Prossima Sezione" },
            type: 1
        });
    }

    if (sezioneAttuale > 1) {
        buttons.push({
            buttonId: `${usedPrefix}owner ${sezioneAttuale - 1}`,
            buttonText: { displayText: "⬅️ Sezione Precedente" },
            type: 1
        });
    }

    await conn.sendMessage(message.chat, {
        text: testo,
        footer: "MENU OWNER",
        buttons: buttons,
        headerType: 1
    });
};

handler.help = ['owner'];
handler.tags = ['menu'];
handler.command = /^(owner)(\s\d+)?$/i;

export default handler;