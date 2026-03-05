let handler = async (m, { conn, usedPrefix, command }) => {
  if (!m.isGroup) return m.reply('⚠️ Questo gioco può essere giocato solo nei gruppi!');
  
  // Evita che ci siano due bombe contemporaneamente nello stesso gruppo
  conn.bomba = conn.bomba ? conn.bomba : {};
  if (conn.bomba[m.chat]) return m.reply('💣 C\'è già una bomba attiva in questo gruppo! Sbrigati a passarla!');

  // Selezione della prima vittima (tag o a caso)
  let target = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : (m.quoted ? m.quoted.sender : null);
  
  if (!target) {
    const participants = (await conn.groupMetadata(m.chat)).participants;
    target = participants[Math.floor(Math.random() * participants.length)].id;
  }

  const targetName = '@' + target.split('@')[0];
  // Timer casuale tra 25 e 45 secondi
  const timer = Math.floor(Math.random() * (45 - 25 + 1) + 25) * 1000;

  conn.bomba[m.chat] = {
    vittima: target,
    messaggio: null,
    scadenza: Date.now() + timer,
    attiva: true
  };

  const startMsg = `
┏━━━━━━━━━━━━━━━━━━━━━┓
┃   💣 *PASSA LA BOMBA* 💣
┗━━━━━━━━━━━━━━━━━━━━━┛
┃
┃ ⚡ *LA BOMBA È NELLE MANI DI:*
┃ ${targetName}
┃
┃ ⚠️ *ISTRUZIONI:*
┃ Scrivi *${usedPrefix}passa* taggando qualcuno
┃ o rispondendo a un suo messaggio!
┃
┃ ⏱️ *TIMER:* [ TRASMESSO ]
┃ 🧨 *DESTINO:* IMPREVEDIBILE
┗━━━━━━━━━━━━━━━━━━━━━┛`;

  conn.bomba[m.chat].messaggio = await conn.sendMessage(m.chat, {
    text: startMsg,
    mentions: [target]
  }, { quoted: m });

  // Ciclo di controllo dell'esplosione
  setTimeout(async () => {
    if (conn.bomba[m.chat] && conn.bomba[m.chat].attiva) {
      const vittimaFinale = conn.bomba[m.chat].vittima;
      const vittimaTag = '@' + vittimaFinale.split('@')[0];
      
      const boomMsg = `
💥 *ＢＯＯＯＯＯＭ* 💥
━━━━━━━━━━━━━━━━━━━━
L'ordigno è esploso tra le mani di ${vittimaTag}!

📊 *ESITO:*
• Integrità fisica: 0%
• Dignità: Disintegrata
• Passi per scappare: **3.750 passi** (2,5 km)

💀 *${vittimaTag} è ufficialmente cenere!*
━━━━━━━━━━━━━━━━━━━━`;

      await conn.sendMessage(m.chat, {
        text: boomMsg,
        mentions: [vittimaFinale]
      });
      
      delete conn.bomba[m.chat];
    }
  }, timer);
};

// --- COMANDO PER PASSARE LA BOMBA ---
handler.before = async (m, { conn }) => {
  conn.bomba = conn.bomba ? conn.bomba : {};
  if (!m.isGroup || !conn.bomba[m.chat] || !m.text.toLowerCase().startsWith('.passa')) return;

  const game = conn.bomba[m.chat];
  if (m.sender !== game.vittima) {
    return m.reply('❌ Non hai tu la bomba! Non puoi passarla, scemo!');
  }

  let nextTarget = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : (m.quoted ? m.quoted.sender : null);
  
  if (!nextTarget) {
    return m.reply('🎯 Devi taggare qualcuno o rispondere a un messaggio per passargli la bomba!');
  }

  if (nextTarget === conn.user.id.split(':')[0] + '@s.whatsapp.net') {
    return m.reply('😏 Bel tentativo, ma io la bomba la disinnesco col pensiero. Passala a un umano!');
  }

  // Passaggio riuscito
  game.vittima = nextTarget;
  const nextTag = '@' + nextTarget.split('@')[0];
  
  await conn.sendMessage(m.chat, {
    text: `🏃‍♂️💨 *PASSAGGIO RIUSCITO!*\n\nLa bomba ora è di ${nextTag}! Sbrigati!`,
    mentions: [nextTarget]
  }, { quoted: m });
};

handler.help = ['bomba', 'passa @user'];
handler.tags = ['giochi'];
handler.command = /^(bomba|passa)$/i;
handler.group = true;

export default handler;
