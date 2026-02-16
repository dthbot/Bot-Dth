const handler = async (m, { conn }) => {
  if (!m.isGroup) return m.reply('☠️ Questo comando funziona solo nei gruppi.');

  // Metadata del gruppo
  const metadata = await conn.groupMetadata(m.chat);
  const participants = metadata.participants || [];

  // Lista admin
  const admins = participants.filter(p => p.admin).map(p => `@${p.id.split('@')[0]}`);
  const totalAdmins = admins.length;

  // Conteggio membri
  const totalMembers = participants.length;

  // Invite link
  let inviteCode;
  try {
    inviteCode = await conn.groupInviteCode(m.chat);
  } catch {
    inviteCode = '⚠️ Impossibile recuperare il link.';
  }

  const caption = `
🔗 *Link gruppo:* ${inviteCode ? 'https://chat.whatsapp.com/' + inviteCode : 'Non disponibile'}
👥 *Membri:* ${totalMembers}
🛡️ *Admin (${totalAdmins}):* ${admins.join(', ') || 'Nessuno'}
🆔 *ID Gruppo:* ${m.chat}
`.trim();

  await conn.sendMessage(m.chat, {
    text: caption,
    mentions: admins
  }, { quoted: m });
};

handler.help = ['link'];
handler.tags = ['group'];
handler.command = /^link$/i;
handler.group = true;
handler.botAdmin = true;

export default handler;