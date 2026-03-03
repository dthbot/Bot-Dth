const handler = async (m, { conn, args, usedPrefix, command }) => {
  if (!m.isGroup) {
    return m.reply('⚠️ La roulette si gioca solo nei gruppi!');
  }

  // Verifica che l'utente sia admin
  let isAdmin = m.isAdmin || false;
  if (!isAdmin) {
    return m.reply('❌ Solo gli amministratori possono giocare alla roulette!');
  }

  // Prendi tutti i partecipanti del gruppo
  const groupMetadata = await conn.groupMetadata(m.chat);
  const participants = groupMetadata.participants;
  
  // Filtra solo utenti normali (non admin, non bot stesso)
  const botNumber = conn.user.id.split(':')[0] + '@s.whatsapp.net';
  
  const eligibleUsers = participants.filter(p => {
    return !p.admin && // Non admin
           p.id !== botNumber && // Non il bot
           p.id !== m.sender; // Non chi esegue il comando (per sicurezza)
  });

  if (eligibleUsers.length === 0) {
    return m.reply('🎯 Non ci sono utenti rimovibili nel gruppo!');
  }

  // Scegli una vittima casuale
  const randomVictim = eligibleUsers[Math.floor(Math.random() * eligibleUsers.length)];
  const victimNumber = randomVictim.id.split('@')[0];

  // Genera percentuale di "fortuna"
  const luckPercent = Math.floor(Math.random() * 101);
  
  // Messaggi diversi in base al comando
  if (command === 'rouletteban' || command === 'roulette') {
    // Roulotte russa con colpi di scena
    const messages = [
      "🎯 *ROULETTE RUSSA* 🎯",
      "🔫 *GIOCO PERICOLOSO* 🔫",
      "💀 *LA PALLOTTOLA GIRA* 💀",
      "🎲 *FORTUNA O MORTE* 🎲"
    ];
    
    const randomTitle = messages[Math.floor(Math.random() * messages.length)];
    
    const initialMsg = `
╔══════════════════════╗
   ${randomTitle}
╚══════════════════════╝

🔄 *Caricamento del tamburo...*
👥 *Giocatori in gioco:* ${eligibleUsers.length}

${createLoadingBar(luckPercent, 12)}

📊 *Probabilità di sopravvivenza:* ${100 - luckPercent}%
    `;

    const sentMsg = await conn.sendMessage(m.chat, { 
      text: initialMsg,
      contextInfo: {
        mentionedJid: [m.sender],
        externalAdReply: {
          title: '🎲 ROULETTE RUSSA',
          body: 'Il destino sta per decidere...',
          mediaType: 1,
          renderLargerThumbnail: false,
          thumbnailUrl: 'https://telegra.ph/file/your-roulette-image.jpg'
        }
      }
    }, { quoted: m });

    await new Promise(resolve => setTimeout(resolve, 3000));

    if (luckPercent > 50) {
      // Vittima colpita
      await conn.sendMessage(m.chat, { 
        text: `💥 *BANG!* 💥\n\nLa pallottola ha colpito @${victimNumber}\n\n💀 *ELIMINATO DAL GRUPPO* 💀`,
        mentions: [randomVictim.id]
      }, { quoted: sentMsg });
      
      await new Promise(resolve => setTimeout(resolve, 1500));
      await conn.groupParticipantsUpdate(m.chat, [randomVictim.id], 'remove');
    } else {
      // Colpo a salve
      await conn.sendMessage(m.chat, { 
        text: `😮‍💨 *CLICK!* 😮‍💨\n\n*COLPO A SALVE!*\n\n@${victimNumber} è stato fortunato... questa volta!`,
        mentions: [randomVictim.id]
      }, { quoted: sentMsg });
    }
    
  } else {
    // Kickrandom - semplice e diretto
    const emojis = ['🎯', '🎲', '💫', '⭐', '⚡', '🌀'];
    const randomEmoji = emojis[Math.floor(Math.random() * emojis.length)];
    
    const actions = [
      "sta volando via",
      "viene teletrasportato",
      "saluta il gruppo",
      "fa le valigie",
      "cambia aria",
      "prende un volo"
    ];
    const randomAction = actions[Math.floor(Math.random() * actions.length)];
    
    const banMessage = `
╔══════════════════════╗
   ${randomEmoji} *KICK RANDOM* ${randomEmoji}
╚══════════════════════╝

🎰 *Estrazione in corso...*

${createLoadingBar(luckPercent, 10)}

🔮 *Il destino ha scelto:*

👤 @${victimNumber} ${randomAction}!

━━━━━━━━━━━━━━━━━━━
📊 *Statistiche roulette:*
• Totale estrazioni: ${Math.floor(Math.random() * 50) + 10}
• Probabilità scelta: ${luckPercent}%
• Utenti rimasti: ${eligibleUsers.length - 1}
    `;

    await conn.sendMessage(m.chat, {
      text: banMessage,
      mentions: [randomVictim.id, m.sender]
    }, { quoted: m });

    await new Promise(resolve => setTimeout(resolve, 2000));
    await conn.groupParticipantsUpdate(m.chat, [randomVictim.id], 'remove');
  }
};

// Funzione per creare barra di caricamento
function createLoadingBar(percent, length = 10) {
  const filledLength = Math.round((percent / 100) * length);
  const emptyLength = length - filledLength;
  
  const filledBar = '▓'.repeat(filledLength);
  const emptyBar = '░'.repeat(emptyLength);
  
  return `[${filledBar}${emptyBar}]`;
}

// Configurazione
handler.help = [
  'kickrandom - Rimuove un utente casuale dal gruppo',
  'rouletteban - Roulette russa: 50% di probabilità di essere bannati'
];

handler.tags = ['admin', 'fun'];
handler.command = ['kickrandom', 'rouletteban', 'roulette'];
handler.group = true;
handler.admin = true; // Solo admin
handler.botAdmin = true; // Il bot deve essere admin

export default handler;