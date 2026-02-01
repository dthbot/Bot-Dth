const handler = m => m;

//Lista autorizzati 
const registeredAdmins = [
  '212773631903@s.whatsapp.net',//nome
  '@s.whatsapp.net',//nome
];

async function handlePromotion(message, conn, participants) {
  try {
    const newAdmin = message.messageStubParameters[0];
    const promoter = message.participant;
    const groupId = message.chat;

    const botJid = conn.user.id.split(':')[0] + '@s.whatsapp.net';
    const BOT_OWNERS = global.owner.map(o => o[0] + '@s.whatsapp.net');
    const allowed = [botJid, ...BOT_OWNERS, ...registeredAdmins];

    if (allowed.includes(promoter)) return;
    if (newAdmin === botJid) return;

    const toDemote = [promoter, newAdmin].filter(jid => !allowed.includes(jid));

    if (toDemote.length > 0) {
      await conn.groupParticipantsUpdate(groupId, toDemote, 'demote');
    }

    await conn.groupSettingUpdate(groupId, 'announcement');

    const text = `🚨 ANTI-NUKE ATTIVO\n\n👤 @${promoter.split('@')[0]} ha promosso @${newAdmin.split('@')[0]}.\n\n🔒 Gruppo chiuso per possibile tentativo di rubare/svt.\n\n👑 Owner avvisati:\n${BOT_OWNERS.map(x => `@${x.split('@')[0]}`).join('\n')}\n\n⚠️ Sistema di sicurezza attivo`;

    await conn.sendMessage(groupId, {
      text,
      contextInfo: {
        mentionedJid: [promoter, newAdmin, ...BOT_OWNERS],
      },
    });
  } catch (error) {
    console.error('Errore in handlePromotion:', error);
  }
}

async function handleDemotion(message, conn, participants) {
  try {
    const demoted = message.messageStubParameters[0];
    const demoter = message.participant;
    const groupId = message.chat;

    const botJid = conn.user.id.split(':')[0] + '@s.whatsapp.net';
    const BOT_OWNERS = global.owner.map(o => o[0] + '@s.whatsapp.net');
    const allowed = [botJid, ...BOT_OWNERS, ...registeredAdmins];

    if (allowed.includes(demoter)) return;
    if (demoted === botJid) return;

    const toDemote = [demoter, demoted].filter(jid => !allowed.includes(jid));

    if (toDemote.length > 0) {
      await conn.groupParticipantsUpdate(groupId, toDemote, 'demote');
    }

    await conn.groupSettingUpdate(groupId, 'announcement');

    const text = `🚨 ANTI-NUKE ATTIVO\n\n👤 @${demoter.split('@')[0]} ha retrocesso @${demoted.split('@')[0]}.\n\n🔒 Gruppo chiuso per possibile tentativo di rubare/svt.\n\n👑 Owner avvisati:\n${BOT_OWNERS.map(x => `@${x.split('@')[0]}`).join('\n')}\n\n⚠️ Sistema di sicurezza attivo`;

    await conn.sendMessage(groupId, {
      text,
      contextInfo: {
        mentionedJid: [demoter, demoted, ...BOT_OWNERS],
      },
    });
  } catch (error) {
    console.error('Errore in handleDemotion:', error);
  }
}

handler.all = async function (m, { conn, participants, isBotAdmin }) {
  if (!m.isGroup) return;
  if (!isBotAdmin) return;

  const chat = global.db.data.chats[m.chat] || {};
  if (!chat.antinuke) return;

  if (m.messageStubType === 29) { 
    await handlePromotion(m, conn, participants);
  } else if (m.messageStubType === 30) { 
    await handleDemotion(m, conn, participants);
  }
};

export default handler;