let handler = async (m, { conn, usedPrefix, command }) => {
  if (!m.isGroup) return m.reply('⚠️ Solo nei gruppi!');
  
  conn.bomba = conn.bomba ? conn.bomba : {};
  
  // Se l'utente scrive .bomba mentre ce n'è già una, avvisa e basta
  if (conn.bomba[m.chat]) {
    return m.reply('💣 La miccia è già accesa! Passala velocemente!');
  }

  // Trova la prima vittima
  let target = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : (m.quoted ? m.quoted.sender : null);
  
  if (!target) {
    const groupMetadata = await conn.groupMetadata(m.chat);
    const participants = groupMetadata.participants.map(p => p.id);
    const botNumber = conn.user.id.split(':')[0] + '@s.whatsapp.net';
    const filtered = participants.filter(p => p !== botNumber);
    target = filtered[Math.floor(Math.random() * filtered.length)];
  }

  const timer = Math.floor(Math.random() * (35 - 15 + 1) + 15) * 1000;

  conn.bomba[m.chat] = {
    vittima: target,
    attiva: true
  };

  const startMsg = `
╭━━━ ☢️ *ＢＯＭＢ  ＤＥＴECTORS* ☢️ ━━━╮
┃
┃ 🏃‍♂️ *BERSAGLIO:* @${target.split('@')[0]}
┃ 🧨 *STATUS:* INNESCATA
┃ ⚡ *AZIONE:* Scrivi *${usedPrefix}passa* taggando!
┃
┃ ⏱️ *TIMER:* [ CRIPTATO ]
╰━━━━━━━━━━━━━━━━━━━━━━━━━━━━━╯`;

  await conn.sendMessage(m.chat, { 
    text: startMsg, 
    mentions: [target] 
  }, { quoted: m });

  // Timer esplosione
  setTimeout(async () => {
    if (conn.bomba[m.chat] && conn.bomba[m.chat].attiva) {
      const sfigato = conn.bomba[m.chat].vittima;
      
      const boomMsg = `
💥 *ＢＯＯＯＯＯＭ* 💥
━━━━━━━━━━━━━━━━━━━━━━━━━━
L'ordigno è esploso tra le mani di @${sfigato.split('@')[0]}!

📊 *REPORT:*
• Onore: 0% 🔥
• Fuga: **3.750 passi** (2,5 km)
━━━━━━━━━━━━━━━━━━━━━━━━━━`;

      await conn.sendMessage(m.chat, { 
        text: boomMsg, 
        mentions: [sfigato] 
      });
      delete conn.bomba[m.chat];
    }
  }, timer);
};

// --- LOGICA PASSAGGIO (HANDLER BEFORE) ---
handler.before = async (m, { conn }) => {
  conn.bomba = conn.bomba ? conn.bomba : {};
  if (!m.isGroup || !conn.bomba[m.chat]) return;

  const game = conn.bomba[m.chat];
  const cmd = m.text.toLowerCase();

  // Gestisce solo se il messaggio inizia con .passa
  if (cmd.startsWith('.passa')) {
    // Controllo se chi scrive ha effettivamente la bomba
    if (m.sender !== game.vittima) return;

    let nextTarget = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : (m.quoted ? m.quoted.sender : null);
    
    if (!nextTarget) return; // Ignora se non c'è tag per evitare spam
    if (nextTarget === m.sender) return m.reply('🤡 Non puoi passarla a te stesso!');
    
    const botNumber = conn.user.id.split(':')[0] + '@s.whatsapp.net';
    if (nextTarget === botNumber) return m.reply('😏 Nice try. Passala a un umano!');

    // Passaggio riuscito
    game.vittima = nextTarget;
    
    await conn.sendMessage(m.chat, {
      text: `⚡ *RIFLESSI PRONTI!*\n\nLa bomba ora è di @${nextTarget.split('@')[0]}! 🏃‍♂️💨`,
      mentions: [nextTarget]
    });
  }
};

handler.help = ['bomba'];
handler.tags = ['giochi'];
handler.command = /^(bomba)$/i; 
handler.group = true;

export default handler;
