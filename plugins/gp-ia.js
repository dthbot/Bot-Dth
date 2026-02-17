import fetch from 'node-fetch'

const handler = async (m, { conn, text }) => {
  if (!text)
    return m.reply('⚠️ Scrivi una domanda dopo il comando.\n\nEsempio:\n.ia Spiegami la teoria della relatività');

  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}` // Metti la tua API key nelle env
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          {
            role: 'system',
            content: 'Sei un assistente intelligente, rispondi in modo chiaro e professionale.'
          },
          {
            role: 'user',
            content: text
          }
        ],
        temperature: 0.7
      })
    });

    const data = await response.json();

    if (!data.choices)
      return m.reply('❌ Errore nella risposta dell\'IA.');

    const aiReply = data.choices[0].message.content;

    await conn.sendMessage(
      m.chat,
      {
        text: `🤖 *IA Risponde:*\n\n${aiReply}`
      },
      { quoted: m }
    );

  } catch (err) {
    console.error(err);
    m.reply('❌ Errore durante la richiesta all\'IA.');
  }
};

handler.help = ['ia <messaggio>'];
handler.tags = ['ai'];
handler.command = ['ia'];
handler.group = false;

export default handler;