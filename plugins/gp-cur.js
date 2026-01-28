// gp-cur.js — Last.fm CUR + SETUSER (BASED MD compatible)
import fetch from 'node-fetch'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const USERS_FILE = path.join(__dirname, '..', 'lastfm_users.json')

if (!fs.existsSync(USERS_FILE)) fs.writeFileSync(USERS_FILE, '{}', 'utf8')

const LASTFM_API_KEY = '36f859a1fc4121e7f0e931806507d5f9'

// ================= UTILS =================
const loadUsers = () => JSON.parse(fs.readFileSync(USERS_FILE, 'utf8'))
const saveUsers = (u) => fs.writeFileSync(USERS_FILE, JSON.stringify(u, null, 2))
const getUser = (id) => loadUsers()[id] || null
const setUser = (id, name) => {
  const users = loadUsers()
  users[id] = name
  saveUsers(users)
}

async function fetchJson(url) {
  try {
    const res = await fetch(url)
    return await res.json()
  } catch {
    return null
  }
}

// ================= LAST.FM =================
async function getRecentTrack(user) {
  const url = `https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=${user}&api_key=${LASTFM_API_KEY}&format=json&limit=1`
  const json = await fetchJson(url)
  return json?.recenttracks?.track?.[0]
}

async function getTrackInfo(user, artist, track) {
  const url = `https://ws.audioscrobbler.com/2.0/?method=track.getInfo&api_key=${LASTFM_API_KEY}&artist=${encodeURIComponent(artist)}&track=${encodeURIComponent(track)}&username=${user}&format=json`
  const json = await fetchJson(url)
  return json?.track
}

async function getArtistInfo(artist) {
  const url = `https://ws.audioscrobbler.com/2.0/?method=artist.getInfo&api_key=${LASTFM_API_KEY}&artist=${encodeURIComponent(artist)}&format=json`
  const json = await fetchJson(url)
  return json?.artist
}

// ================= LYRICS =================
async function getLyrics(artist, track) {
  try {
    const url = `https://api.lyrics.ovh/v1/${encodeURIComponent(artist)}/${encodeURIComponent(track)}`
    const res = await fetch(url)
    const json = await res.json()
    return json?.lyrics || null
  } catch {
    return null
  }
}

// ================= STYLE =================
const likeReplies = [
  '🔥 Gusto musicale approvato.',
  '🎧 Questa va in repeat.',
  '😌 Vibe rispettata.',
  '💿 Scelta solida.',
  '🖤 Approved.'
]

const dislikeReplies = [
  '💀 Skippata.',
  '😬 No, grazie.',
  '🗑️ Rimossa.',
  '🙉 Orecchie off.',
  '🚫 Bannata.'
]

const rand = (a) => a[Math.floor(Math.random() * a.length)]

// ================= HANDLER =================
const handler = async (m, { conn, usedPrefix, command, text }) => {

  // ===== TEMPLATE BUTTON HANDLER (BASED) =====
  const btnId = m.message?.templateButtonReplyMessage?.selectedId

  if (btnId) {

    if (btnId.startsWith('like_')) {
      const track = btnId.replace('like_', '')
      return m.reply(`👍 *${track}*\n${rand(likeReplies)}`)
    }

    if (btnId.startsWith('dislike_')) {
      const track = btnId.replace('dislike_', '')
      return m.reply(`👎 *${track}*\n${rand(dislikeReplies)}`)
    }

    if (btnId.startsWith('lyrics_')) {
      const data = btnId.replace('lyrics_', '')
      const [artist, track] = data.split('|||')
      const lyrics = await getLyrics(artist, track)

      return m.reply(
        lyrics
          ? `📜 *${track}* — ${artist}\n\n${lyrics.slice(0, 3500)}`
          : '❌ Testo non trovato 😔'
      )
    }
  }

  // ===== SETUSER =====
  if (command === 'setuser') {
    const username = text.trim()
    if (!username) return m.reply(`❌ Usa: ${usedPrefix}setuser <username>`)
    setUser(m.sender, username)
    return m.reply(`✅ Username Last.fm *${username}* salvato!`)
  }

  // ===== CUR =====
  if (command === 'cur') {
    const targetId = m.mentionedJid?.[0] || m.sender
    const user = getUser(targetId)

    if (!user)
      return conn.sendMessage(m.chat, {
        text: `❌ Registrati con ${usedPrefix}setuser <username>`,
        mentions: [targetId]
      })

    const track = await getRecentTrack(user)
    if (!track) return m.reply('❌ Nessun ascolto trovato.')

    const artistName = track.artist['#text']
    const trackName = track.name
    const album = track.album?.['#text'] || '—'
    const image = track.image?.find(i => i.size === 'extralarge')?.['#text']

    const info = await getTrackInfo(user, artistName, trackName)

    const tagsArr = info?.toptags?.tag || []
    const tags = tagsArr.length
      ? tagsArr.slice(0, 4).map(t => `#${t.name.toLowerCase()}`).join(' ')
      : '#music'

    const caption = `
🎧 *Ora in ascolto*
*${trackName}* — ${artistName}

💿 Album: ${album}
🎨 Mood: ${tags}
`.trim()

    const buttons = [
      {
        buttonId: `like_${trackName}`,
        buttonText: { displayText: '👍 Ti piace?' },
        type: 1
      },
      {
        buttonId: `dislike_${trackName}`,
        buttonText: { displayText: '👎 Non ti piace?' },
        type: 1
      },
      {
        buttonId: `lyrics_${artistName}|||${trackName}`,
        buttonText: { displayText: '📜 Testo' },
        type: 1
      }
    ]

    return conn.sendMessage(m.chat, {
      image: image ? { url: image } : undefined,
      caption,
      buttons,
      headerType: image ? 4 : 1
    }, { quoted: m })
  }
}

handler.command = ['cur', 'setuser']
handler.group = true

export default handler