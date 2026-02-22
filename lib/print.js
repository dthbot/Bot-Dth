import PhoneNumber from 'awesome-phonenumber'
import chalk from 'chalk'
import { watchFile } from 'fs'
import { fileURLToPath } from 'url'
import NodeCache from 'node-cache'

const __filename = fileURLToPath(import.meta.url)
const nameCache = new NodeCache({ stdTTL: 600 });
const groupMetaCache = new NodeCache({ stdTTL: 300 });
const errorThrottle = {};
const urlRegex = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/g

export default async function (m, conn = { user: {} }) {
  if (!m || m.key?.fromMe) return

  try {
    const senderJid = conn.decodeJid(m.sender)
    const chatJid = conn.decodeJid(m.chat || '')
    const botJid = conn.decodeJid(conn.user?.jid)

    if (!chatJid) return

    let senderName = nameCache.get(senderJid)
    if (!senderName) {
      senderName = await conn.getName(senderJid) || ''
      nameCache.set(senderJid, senderName)
    }

    let chatName = nameCache.get(chatJid)
    if (!chatName) {
      chatName = await conn.getName(chatJid) || 'Chat'
      nameCache.set(chatJid, chatName)
    }

    const sender = formatPhoneNumber(senderJid, senderName)
    const chat = chatName
    const me = formatPhoneNumber(botJid || '', conn.user?.name || 'Bot')

    const isGroup = chatJid.endsWith('@g.us')
    const isOwner = Array.isArray(global.owner)
      ? global.owner.map(([number]) => number).includes(senderJid.split('@')[0])
      : global.owner === senderJid.split('@')[0]

    const isPremium = global.prems?.includes(senderJid) || false
    const isBanned = global.DATABASE?.data?.users?.[senderJid]?.banned || false

    const ts = formatTimestamp(m.messageTimestamp)
    const c = getColorScheme()
    const bordi = getBorders(c)
    const tipo = (m.mtype || 'unknown').replace(/Message/gi, '')

    const righe = [
      `${bordi.top}`,
      `${bordi.pipe} ${c.label('📱 Bot:')} ${c.text(me)}`,
      `${bordi.pipe} ${c.label('⏰ Ora:')} ${c.text(ts)}`,
      `${bordi.pipe} ${c.label('👤 Da:')} ${c.text(sender)} ${getUserStatus(isOwner, isPremium, isBanned, c)}`,
      `${bordi.pipe} ${c.label('💬 Chat:')} ${c.text(chat)} ${isGroup ? c.secondary('(Gruppo)') : c.secondary('(Privato)')}`,
      `${bordi.pipe} ${c.label('📨 Tipo:')} ${c.text(tipo)}`
    ]

    if (m.isCommand) {
      righe.push(`${bordi.pipe} ${c.label('⚙️ Comando:')} ${c.background.whiteBright(m.text.split(' ')[0])}`)
    }

    righe.push(`${bordi.bottom}`)

    console.log('\n' + righe.join('\n'))

    const text = await formatText(m)
    if (text?.trim()) console.log(text)

  } catch (error) {
    throttleError('Errore in print.js:', error.message, 5000);
  }
}

/* ---------------- TEMA ICE BLUE ---------------- */

function getColorScheme() {
  return {
    label: chalk.hex('#00bfff').bold,      // Blu acceso
    text: chalk.hex('#e6f7ff'),            // Bianco ghiaccio
    secondary: chalk.hex('#0099cc'),       // Blu medio
    meta: chalk.hex('#00e5ff'),            // Ciano brillante
    bright: chalk.hex('#00ffff'),          // Ciano neon
    bold: chalk.bold,
    italic: chalk.italic,
    white: chalk.whiteBright,
    gray: chalk.gray,
    cyan: chalk.cyanBright,
    magenta: chalk.magentaBright,
    blue: chalk.blueBright,
    green: chalk.hex('#00ff88'),
    red: chalk.hex('#ff3b3b'),
    yellow: chalk.hex('#ffd000'),
    background: chalk.bgHex('#001f2f'),    // Blu notte
    info: chalk.hex('#00e5ff'),
    warning: chalk.hex('#ffd000'),
    error: chalk.hex('#ff3b3b'),
    success: chalk.hex('#00ff88')
  }
}

function getBorders(c) {
  return {
    top: `${c.secondary('╔══════════════╗')} ${c.label('NEXUS BOT')}`,
    bottom: `${c.secondary('╚══════════════╝')}`,
    pipe: c.secondary('║')
  }
}

function getUserStatus(isOwner, isPremium, isBanned, c) {
  let status = []
  if (isOwner) status.push(c.success('Owner'))
  if (isPremium) status.push(c.meta('Premium'))
  if (isBanned) status.push(c.error('Bannato'))
  return status.length ? `(${status.join(' | ')})` : c.text('User')
}

function throttleError(message, error, delay) {
  const key = message + error;
  if (!errorThrottle[key] || Date.now() - errorThrottle[key] > delay) {
    console.error(chalk.red(message), error);
    errorThrottle[key] = Date.now();
  }
}

function formatPhoneNumber(jid, name) {
  if (!jid) return 'Sconosciuto';
  let clean = jid.split('@')[0].split(':')[0];
  try {
    const number = PhoneNumber('+' + clean).getNumber('international');
    return number + (name ? ` ~${name}` : '');
  } catch {
    return clean + (name ? ` ~${name}` : '');
  }
}

function formatTimestamp(timestamp) {
  const date = timestamp ? new Date(timestamp * 1000) : new Date()
  return date.toLocaleTimeString('it-IT')
}

async function formatText(m) {
  if (!m.text && !m.caption) return ''
  let text = (m.text || m.caption || '').replace(/\u200e+/g, '')

  text = text.replace(urlRegex, url => chalk.hex('#00e5ff')(url))
  text = text.replace(/#[\w]+/g, tag => chalk.hex('#ffd000')(tag))
  text = text.replace(/\+?[\d\s\-\(\)]{10,}/g, phone => chalk.hex('#00ffff')(phone))

  if (m.error) return chalk.hex('#ff3b3b')(text)
  if (m.isCommand) return chalk.bgHex('#001f2f').whiteBright(text)
  if (m.quoted) return chalk.hex('#0099cc')(text)
  return chalk.hex('#e6f7ff')(text)
}

watchFile(__filename, () => {
  console.log(chalk.bgHex('#001f2f').white.bold("File 'lib/print.js' aggiornato"))
})