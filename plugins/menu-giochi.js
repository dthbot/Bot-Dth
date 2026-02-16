const handler = async (message, { conn, usedPrefix = '.' }) => {

    const userId = message.sender;
    const groupId = message.isGroup ? message.chat : null;

    const userCount = Object.keys(global.db?.data?.users || {}).length;

    const menuText = `
🩸 𝐍𝚵𝑿𝐒𝐔𝐒 𝚩𝚯𝐓 *MENU GIOCHI* 🩸

════════════════════
👥 Utenti registrati: *${userCount}*
════════════════════

🎮 𝐆𝐀𝐌𝐄 𝐌𝐄𝐓𝐑𝐈𝐂𝐈 & DIVERTIMENTO
➤ ${usedPrefix}bellometro 🥰
➤ ${usedPrefix}gaymetro 🌈
➤ ${usedPrefix}lesbiometro 💖
➤ ${usedPrefix}masturbometro 🍆
➤ ${usedPrefix}fortunometro 🍀
➤ ${usedPrefix}intelligiometro 🧠
➤ ${usedPrefix}sborra 💦
➤ ${usedPrefix}il 🤔
➤ ${usedPrefix}wasted 🕴🏻
➤ ${usedPrefix}comunista 💂🏻
➤ ${usedPrefix}bisex 👙
➤ ${usedPrefix}gay 🏳️‍🌈
➤ ${usedPrefix}simpcard 🃏
➤ ${usedPrefix}trans 🏳️‍⚧️
➤ ${usedPrefix}tris ❌⭕
➤ ${usedPrefix}meme 🤣
➤ ${usedPrefix}cibo 🍣 
➤ ${usedPrefix}bandiera 🚩
➤ ${usedPrefix}classificabandiera 🏆
➤ ${usedPrefix}impiccato 🪢
➤ ${usedPrefix}s / sticker 🏷️
➤ ${usedPrefix}wm 🔮
➤ ${usedPrefix}cur 🎶
➤ ${usedPrefix}sposa 👰🏻
➤ ${usedPrefix}divorzia 💔
➤ ${usedPrefix}amante 🫂
➤ ${usedPrefix}adotta 👶🏻
➤ ${usedPrefix}famiglia 🧑‍🧑‍🧒‍🧒
➤ ${usedPrefix}toglifiglio 👣
➤ ${usedPrefix}togliamante 💔

════════════════════
`.trim();

    // INVIO SOLO TESTO
    await conn.sendMessage(message.chat, { text: menuText });
};

handler.help = ['menugiochi'];
handler.tags = ['menu'];
handler.command = /^(menugiochi|giochi)$/i;

export default handler;