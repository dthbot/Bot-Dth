import yts from "yt-search";
import { spawn } from "child_process";
import fs from "fs";
import os from "os";
import path from "path";

/* ================= HELPERS (Font & Simboli) ================= */
const styles = {
  title: (t) => `『 🎶 *${t.toUpperCase()}* 🎶 』`,
  info: (k, v) => `  ◦  *${k}:* \`${v}\``,
  divider: "▬▬▬▬▬▬▬▬▬▬▬▬▬▬"
};

/* ================= DOWNLOAD LOGIC ================= */
function downloadMedia(url, output, isAudio = true) {
  return new Promise((resolve, reject) => {
    // Argomenti ottimizzati per Termux + FFmpeg
    let args = isAudio 
      ? ["-f", "bestaudio", "--extract-audio", "--audio-format", "mp3", "--audio-quality", "0", "-o", output, url]
      : ["-f", "best[ext=mp4]/best", "--merge-output-format", "mp4", "-o", output, url];

    const proc = spawn("yt-dlp", args);
    let stderr = "";

    proc.stderr.on("data", d => stderr += d.toString());
    proc.on("close", code => {
      if (code !== 0) return reject(stderr);
      resolve(output);
    });
  });
}

/* ================= MAIN HANDLER ================= */
const handler = async (m, { conn, text, command }) => {
  // 1. Gestione Ricerca
  if (command === "play") {
    if (!text) return conn.reply(m.chat, "💡 *Esempio:* .play Peaches Justin Bieber", m);

    const search = await yts(text);
    const vid = search.videos[0];
    if (!vid) return conn.reply(m.chat, "❌ Video non trovato.", m);

    const caption = [
      styles.title(vid.title),
      "",
      styles.info("⏱ Durata", vid.timestamp),
      styles.info("👁️ Views", vid.views.toLocaleString()),
      styles.info("📅 Caricato", vid.ago),
      styles.info("🔗 Link", vid.url),
      "",
      "📥 *Scegli il formato desiderato qui sotto:*",
      styles.divider
    ].join("\n");

    // Invio con Bottoni (Nota: Assicurati che la tua versione di Baileys supporti i buttons)
    return await conn.sendMessage(m.chat, {
      image: { url: vid.thumbnail },
      caption: caption,
      footer: "VareBot Music Downloader",
      buttons: [
        { buttonId: `.playaudio ${vid.url}`, buttonText: { displayText: "🎵 AUDIO (MP3)" }, type: 1 },
        { buttonId: `.playvideo ${vid.url}`, buttonText: { displayText: "🎬 VIDEO (MP4)" }, type: 1 }
      ],
      headerType: 4
    }, { quoted: m });
  }

  // 2. Gestione Download Effettivo
  const isAudio = command.includes("audio");
  const url = text.trim();
  if (!url.startsWith("http")) return; // Protezione se l'utente scrive male

  const statusMsg = await conn.reply(m.chat, `⏳ *Elaborazione ${isAudio ? 'Audio' : 'Video'}...* \nAttendi un istante.`, m);
  
  const tmpDir = os.tmpdir();
  const fileName = `vare_${Date.now()}.${isAudio ? 'mp3' : 'mp4'}`;
  const filePath = path.join(tmpDir, fileName);

  try {
    await downloadMedia(url, filePath, isAudio);

    if (isAudio) {
      await conn.sendMessage(m.chat, {
        audio: { url: filePath },
        mimetype: "audio/mpeg",
        fileName: fileName,
        ptt: false // Imposta a true se lo vuoi come nota vocale
      }, { quoted: m });
    } else {
      await conn.sendMessage(m.chat, {
        video: { url: filePath },
        mimetype: "video/mp4",
        fileName: fileName,
        caption: "✅ Ecco il tuo video!"
      }, { quoted: m });
    }
  } catch (e) {
    console.error(e);
    await conn.reply(m.chat, "❌ Errore durante la conversione. Verifica il link.", m);
  } finally {
    // Pulizia file per non intasare Termux
    if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
  }
};

handler.command = ["play", "playaudio", "playvideo"];
handler.tags = ["downloader"];
handler.help = ["play <titolo/link>"];

export default handler;
