const handler = async (m, { conn, text }) => {
  if (!m.isGroup)
    return m.reply('⚠️ Questo comando funziona solo nei gruppi.');

  const users = global.db.data.users || {};

  const mods = Object.entries(users)
    .filter(([jid, user]) =>
      user &&
      user.premium === true &&
      user.premiumGroup === m.chat
    )
    .map(([jid]) => jid);

  if (mods.length === 0)
    return m.reply('⚠️ 𝐍𝚵𝑿𝐒𝐔𝐒 𝚩𝚯𝐓 ❌ Nessun MOD attivo in questo gruppo.');

  const customMsg = text
    ? `╔═════[ 𝕄𝔼𝕊𝕊𝔸𝔾𝔾𝕀𝕆 ]══╗
${text}
╚═══════════════╝

`
    : '';

  const caption = `
╔═[ 𝐍𝚵𝑿𝐒𝐔𝐒 𝚩𝚯𝐓 ]═╗
            👑 𝐌𝐎𝐃 𝐋𝐈𝐒𝐓 👑
╚═══════════════╝

${customMsg}🔥 𝐓𝐨𝐭𝐚𝐥𝐞 MOD:
➤ ${mods.length}

⚔️ 𝐒𝐓𝐀𝐅𝐅 ATTIVO ⚔️
${mods.map((jid, i) => `➤ ${i + 1}. @${jid.split('@')[0]}`).join('\n')}
`.trim();

  await conn.sendMessage(
    m.chat,
    {
      text: caption,
      mentions: mods
    },
    { quoted: m }
  );
};

handler.help = ['modlist (messaggio)'];
handler.tags = ['group'];
handler.command = ['modlist'];
handler.group = true;

export default handler;