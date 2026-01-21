import fetch from 'node-fetch';

let handler = async (m, { conn, usedPrefix, command, args, isOwner, isAdmin, isROwner }) => {
  const userName = m.pushName || 'Utente';

  let userProfilePicBuffer;
  try {
    const profilePicUrl = await conn.profilePictureUrl(m.sender, 'image');
    userProfilePicBuffer = await (await fetch(profilePicUrl)).arrayBuffer();
  } catch {
    userProfilePicBuffer = Buffer.from([]);
  }

  let dynamicContextInfo = {
    externalAdReply: {
      title: "𝚅𝙰𝚁𝙴𝙱𝙾𝚃",
      body: "Sistema avanzato di gestione",
      mediaType: 1,
      jpegThumbnail: userProfilePicBuffer.length ? userProfilePicBuffer : null
    }
  };

  let isEnable = /true|enable|attiva|(turn)?on|1/i.test(command);
  if (/disable|disattiva|off|0/i.test(command)) isEnable = false;

  global.db.data.chats[m.chat] ??= {};
  global.db.data.users[m.sender] ??= {};
  let chat = global.db.data.chats[m.chat];
  let bot = global.db.data.settings[conn.user.jid] || {};

  /* ================= MENU ================= */
  if (!args.length) {
    const message = {
      text:
`╭────〔 ⚙️ *GESTIONE FUNZIONI* ⚙️ 〕────╮
│
│ 👋 *Benvenuto ${userName}*
│
│ Da questo pannello puoi:
│ • Attivare funzioni
│ • Disattivare funzioni
│ • Gestire il gruppo
│
│ 💡 Usa il menu qui sotto
│    per selezionare l’azione
│
╰──────────────────────────╯`,
      footer: '˗ˏˋ ☾ 𝚟𝚊𝚛𝚎𝚋𝚘𝚝 ☽ ˎˊ˗',
      contextInfo: dynamicContextInfo
    };

    return conn.sendMessage(m.chat, message);
  }

  /* ================= RISULTATI ================= */
  let results = [];

  for (let type of args.map(a => a.toLowerCase())) {
    let result = { type, status: '' };

    const already = isEnable ? 'già attiva' : 'già disattiva';
    const enabled = isEnable ? '🟢 *ATTIVATA*' : '🔴 *DISATTIVATA*';

    const adminOnly =
`╭────〔 ❌ *ACCESSO NEGATO* ❌ 〕────╮
│
│ Questo comando è riservato
│ agli *ADMIN DEL GRUPPO*
│
╰────────────────────────────╯`;

    const ownerOnly =
`╭────〔 👑 *SOLO OWNER* 👑 〕────╮
│
│ Questa funzione è riservata
│ esclusivamente al creatore
│ del bot
│
╰────────────────────────────╯`;

    switch (type) {

      case 'welcome':
        if (!isAdmin && !isOwner && !isROwner) {
          result.status = adminOnly; break;
        }
        if (chat.welcome === isEnable) {
          result.status = `⚠️ Funzione ${already}`; break;
        }
        chat.welcome = isEnable;
        result.status =
`╭────〔 👋 *WELCOME* 👋 〕────╮
│ Stato: ${enabled}
│
│ Il bot ora gestirà
│ i messaggi di benvenuto
╰────────────────────╯`;
        break;

      case 'goodbye':
        if (!isAdmin && !isOwner && !isROwner) {
          result.status = adminOnly; break;
        }
        chat.goodbye = isEnable;
        result.status =
`╭────〔 🚪 *ADDIO* 🚪 〕────╮
│ Stato: ${enabled}
│
│ Messaggi di uscita
│ configurati correttamente
╰──────────────────╯`;
        break;

      case 'antiprivato':
        if (!isOwner && !isROwner) {
          result.status = ownerOnly; break;
        }
        bot.antiprivato = isEnable;
        result.status =
`╭────〔 🔒 *ANTIPRIVATO* 🔒 〕────╮
│ Stato: ${enabled}
│
│ Il bot non accetterà
│ messaggi in privato
╰──────────────────────╯`;
        break;

      case 'antibot':
        if (!isAdmin && !isOwner && !isROwner) {
          result.status = adminOnly; break;
        }
        chat.antiBot = isEnable;
        result.status =
`╭────〔 🤖 *ANTIBOT* 🤖 〕────╮
│ Stato: ${enabled}
│
│ Bot indesiderati
│ verranno rimossi
╰──────────────────╯`;
        break;

      case 'antilink':
        if (!isAdmin && !isOwner && !isROwner) {
          result.status = adminOnly; break;
        }
        chat.antiLink = isEnable;
        result.status =
`╭────〔 🔗 *ANTILINK* 🔗 〕────╮
│ Stato: ${enabled}
│
│ I link non consentiti
│ verranno bloccati
╰──────────────────╯`;
        break;

      default:
        result.status =
`╭────〔 ❓ *COMANDO SCONOSCIUTO* ❓ 〕────╮
│
│ La funzione "${type}"
│ non è riconosciuta
│
╰────────────────────────────╯`;
        break;
    }

    results.push(result);
  }

  /* ================= RIEPILOGO ================= */
  let summary =
`╭────〔 📋 *RIEPILOGO OPERAZIONI* 📋 〕────╮
│`;

  for (let r of results) {
    summary += `\n│ 🔹 ${r.type}\n│ ${r.status.replace(/\n/g, '\n│ ')}`;
  }

  summary += `\n╰──────────────────────────────────╯`;

  await conn.sendMessage(m.chat, {
    text: summary,
    contextInfo: dynamicContextInfo
  });
};

handler.help = ['attiva', 'disattiva'];
handler.tags = ['main'];
handler.command = ['enable', 'disable', 'attiva', 'disattiva', 'on', 'off'];

export default handler;