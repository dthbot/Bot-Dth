// Plugin fatto da deadly 

import os from 'os';
import { performance } from 'perf_hooks';

let handler = async (m, { conn, usedPrefix }) => {
  try {
    const uptimeMs = process.uptime() * 1000;
    const uptimeStr = clockString(uptimeMs);

    // Calcolo ping
    const startTime = performance.now();
    const endTime = performance.now();
    const speed = (endTime - startTime).toFixed(4);

    const totalMem = os.totalmem();
    const freeMem = os.freemem();
    const usedMem = totalMem - freeMem;
    const percentUsed = ((usedMem / totalMem) * 100).toFixed(2);

    const totalMemGB = (totalMem / 1024 / 1024 / 1024).toFixed(2);
    const usedMemGB = (usedMem / 1024 / 1024 / 1024).toFixed(2);

    const botName = global.db?.data?.nomedelbot || "ᴅᴛʜ-ʙᴏᴛ";

    const botStartTime = new Date(Date.now() - uptimeMs);
    const activationTime = botStartTime.toLocaleString('it-IT', {
      timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });

    const textMsg = `⟦ 𝐏𝐈𝐍𝐆 · 𝐁𝐎𝐓 ⟧
│
├─ 🕒 𝐔𝐏𝐓𝐈𝐌𝐄  : ${uptimeStr}
├─ ⚡ 𝐏𝐈𝐍𝐆    : ${speed} ms
├─ 💾 𝐌𝐄𝐌𝐎𝐑𝐈𝐀  : ${usedMemGB}GB / ${totalMemGB}GB (${percentUsed}%)
└─ 🗓️ 𝐀𝐭𝐭𝐢𝐯𝐚𝐭𝐨 : ${activationTime}`;

    await conn.sendMessage(m.chat, {
      text: textMsg,
      footer: "𝑷𝑰𝑵𝑮 𝑩𝒀 𝐍𝚵𝑿𝐒𝐔𝐒 𝚩𝚯𝐓",
      buttons: [
        { buttonId: usedPrefix + "ping", buttonText: { displayText: "📡 𝐑𝐢𝐟𝐚𝐢 𝐏𝐢𝐧𝐠" }, type: 1 },
        { buttonId: usedPrefix + "menu", buttonText: { displayText: "📋 𝐌𝐞𝐧𝐮" }, type: 1 }
      ],
      headerType: 1
    }, { quoted: m });

  } catch (err) {
    console.error("Errore nell'handler:", err);
  }
};

function clockString(ms) {
  const d = Math.floor(ms / 86400000);
  const h = Math.floor(ms / 3600000) % 24;
  const m = Math.floor(ms / 60000) % 60;
  const s = Math.floor(ms / 1000) % 60;
  return [d, h, m, s].map(v => v.toString().padStart(2, '0')).join(':');
}

handler.help = ['ping'];
handler.tags = ['info'];
handler.command = /^(ping)$/i;
handler.admin = true;

export default handler;