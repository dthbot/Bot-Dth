const handler = m => m;

async function handlePromotion(message) {
  const giver = message.sender.split('@')[0];
  const receiver = message.messageStubParameters[0].split('@')[0];

  const text = `@${giver} 𝖍𝖆 𝖉𝖆𝖙𝖔 𝖎 𝖕𝖔𝖙𝖊𝖗𝖎 𝖆 @${receiver}`;

  await conn.sendMessage(message.chat, {
    text,
    mentions: [message.sender, message.messageStubParameters[0]]
  });
}

async function handleDemotion(message) {
  const giver = message.sender.split('@')[0];
  const receiver = message.messageStubParameters[0].split('@')[0];

  const text = `@${giver} 𝖍𝖆 𝖙𝖔𝖑𝖙𝖔 𝖎 𝖕𝖔𝖙𝖊𝖗𝖎 𝖆 @${receiver}`;

  await conn.sendMessage(message.chat, {
    text,
    mentions: [message.sender, message.messageStubParameters[0]]
  });
}

handler.all = async function (m) {
  if (m.messageStubType === 29) {
    await handlePromotion(m);
  } 
  else if (m.messageStubType === 30) {
    await handleDemotion(m);
  }
};

export default handler;