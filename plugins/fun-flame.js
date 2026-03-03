// Plugin by deadly

let handler = async (m, { conn, usedPrefix, command }) => {
  // 1. Controllo se è un gruppo
  if (!m.isGroup) return m.reply('⚠️ Le fiamme ardono solo nei gruppi!');

  // 2. Identificazione vittima (Tag o Risposta)
  let who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : (m.quoted ? m.quoted.sender : null);
  
  if (!who) {
    return m.reply(`🔥 *FLAME ACTIVATED* 🔥\n\nTaggala persona o rispondi a un suo messaggio per iniziare!\n\nEsempio: ${usedPrefix + command} @utente`);
  }

  // 3. Impedisce di flammare il bot
  const botNumber = conn.user.id.split(':')[0] + '@s.whatsapp.net';
  if (who === botNumber) return m.reply('😏 Tentativo fallito. Non puoi incendiare chi controlla il lanciafiamme!');

  // 4. Setup nomi e messaggi estetici
  const victimName = '@' + who.split('@')[0];
  const attackerName = '@' + m.sender.split('@')[0];

  const startMsg = `
╭━━━ 🔥 *ＳＴＡＲＴ* 🔥 ━━━╮
┃
┃ 👊 *SFIDANTE:* 𝐍𝚵𝑿𝐒𝐔𝐒 𝚩𝚯𝐓
┃ 🎯 *VITTIMA:* ${victimName}
┃
┃ ⏱️ *DURATA:* 1 MINUTO DI INFERNO
┃ ⚡ *STATO:* CARICO A MOLLA...
┃
╰━━━━━━━━━━━━━━━━━━━━━━╯`;

  await conn.sendMessage(m.chat, {
    text: startMsg,
    mentions: [m.sender, who]
  }, { quoted: m });

  // --- LOGICA DELLA BATTAGLIA ---
  let flameCount = 0;
  let battleActive = true;

  const generateFlame = (target) => {
    const flames = [
      `🔊 *${target}*, il tuo unico talento è far sembrare intelligente un sasso!`,
      `🎭 *${target}*, sei come un errore 404: esisti ma non servi a niente!`,
      `📱 *${target}*, scrivi così tante idiozie che il tuo correttore ha chiesto il prepensionamento!`,
      `⚡ *${target}*, se la stupidità fosse oro, saresti più ricco di Elon Musk!`,
      `🤡 *${target}*, il circo ha chiamato: rivogliono il pagliaccio che è scappato!`,
      `⚰️ *${target}*, il tuo carisma è così basso che persino i fantasmi ti ignorano!`,
      `📡 *${target}*, hai la velocità mentale di una connessione 56k in una galleria!`,
      `💅 *${target}*, ti spiegherei perché hai torto, ma non ho né tempo né pastelli colorati per fartelo capire!`,
      `📉 *${target}*, guardando te capisco perché alcune specie si sono estinte!`,
      `🧟 *${target}*, se i neuroni fossero soldi, saresti in bancarotta fraudolenta!`,
      `🌪️ *${target}*, sei come una tempesta: quando te ne vai, tutti tirano un sospiro di sollievo!`,
      `🎬 *${target}*, la tua vita è un film horror, ma di quelli che fanno ridere per quanto sono fatti male!`
    ];
    return "💥 " + flames[Math.floor(Math.random() * flames.length)];
  };

  // Funzione che gestisce le risposte della vittima
  const battleHandler = async (chatUpdate) => {
    if (!battleActive) return;
    const m2 = chatUpdate.messages[0];
    if (!m2.message || m2.key.fromMe) return;

    const sender = m2.key.participant || m2.key.remoteJid;
    
    // Se la vittima scrive nel gruppo, il bot risponde istantaneamente
    if (sender === who && m2.key.remoteJid === m.chat) {
      flameCount++;
      const reply = generateFlame(victimName);
      
      await new Promise(res => setTimeout(res, 800)); // Delay ridotto per velocità
      await conn.sendMessage(m.chat, { text: reply, mentions: [who] }, { quoted: m2 });
    }
  };

  // Attiva il listener
  conn.ev.on('messages.upsert', battleHandler);

  // Primo attacco istantaneo
  setTimeout(() => {
    if (battleActive) conn.sendMessage(m.chat, { text: generateFlame(victimName), mentions: [who] });
  }, 1500);

  // Timer di chiusura (1 minuto)
  setTimeout(async () => {
    if (battleActive) {
      battleActive = false;
      conn.ev.off('messages.upsert', battleHandler); 
      
      const endMsg = `
╭━━━ ⏱️ *ＴＩＭＥ  ＯＶＥＲ* ⏱️ ━━━╮
┃
┃ 🥊 *RISULTATO:* KO TECNICO
┃ 📊 *COLPI SCAGLIATI:* ${flameCount + 1}
┃ 💀 *Danni al morale:* 100%
┃
┃ 🔥 *IL BOT VINCE ANCORA!*
╰━━━━━━━━━━━━━━━━━━━━╯
`;
      
      await conn.sendMessage(m.chat, { text: endMsg, mentions: [who] });
    }
  }, 60000); // 60 secondi
};

handler.help = ['flame'];
handler.tags = ['giochi'];
handler.command = /^(flame)$/i;
handler.group = true;
handler.admin = true;

export default handler;
