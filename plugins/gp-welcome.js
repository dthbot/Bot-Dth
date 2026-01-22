import { WAMessageStubType } from '@realvare/based';
import axios from 'axios';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { promises as fs } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const groupBackgroundCache = new Map();
const profilePicCache = new Map();
const DEFAULT_AVATAR_URL = 'https://i.ibb.co/BKHtdBNp/default-avatar-profile-icon-1280x1280.jpg';

let defaultAvatarBuffer = null;
let puppeteer = null;
let browser = null;
let isPuppeteerAvailable = false;

/* =======================
   INIT PUPPETEER
======================= */
const initPuppeteer = async () => {
    try {
        puppeteer = await import('puppeteer');
        isPuppeteerAvailable = true;
        return true;
    } catch {
        isPuppeteerAvailable = false;
        return false;
    }
};

const initBrowser = async () => {
    if (!puppeteer || !isPuppeteerAvailable) return false;
    if (!browser) {
        browser = await puppeteer.launch({
            headless: 'new',
            args: [
                '--no-sandbox',
                '--disable-setuid-sandbox',
                '--disable-dev-shm-usage',
                '--disable-gpu',
                '--no-first-run',
                '--no-zygote'
            ]
        });
    }
    return true;
};

/* =======================
   AVATAR
======================= */
const createFallbackAvatar = async () => {
    const svg = `<svg width="400" height="400" xmlns="http://www.w3.org/2000/svg">
    <circle cx="200" cy="200" r="200" fill="#6B7280"/>
    <circle cx="200" cy="160" r="60" fill="#F3F4F6"/>
    <ellipse cx="200" cy="300" rx="100" ry="80" fill="#F3F4F6"/>
    </svg>`;
    return Buffer.from(svg);
};

const preloadDefaultAvatar = async () => {
    if (defaultAvatarBuffer) return;
    try {
        const res = await axios.get(DEFAULT_AVATAR_URL, { responseType: 'arraybuffer' });
        defaultAvatarBuffer = Buffer.from(res.data);
    } catch {
        defaultAvatarBuffer = await createFallbackAvatar();
    }
};

/* =======================
   USER DATA
======================= */
async function getUserName(conn, jid, pushNameFromStub = '') {
    const valid = s =>
        s &&
        typeof s === 'string' &&
        s.length > 1 &&
        s.length < 26 &&
        !/^\d+$/.test(s) &&
        !s.includes('@');

    if (valid(pushNameFromStub)) return pushNameFromStub;

    const c = conn.contacts?.[jid];
    if (c) {
        if (valid(c.notify)) return c.notify;
        if (valid(c.name)) return c.name;
        if (valid(c.pushName)) return c.pushName;
    }

    return `Utente ${jid.split('@')[0]}`;
}

async function getUserProfilePic(conn, jid) {
    if (profilePicCache.has(jid)) return profilePicCache.get(jid);
    try {
        const url = await conn.profilePictureUrl(jid, 'image');
        const res = await axios.get(url, { responseType: 'arraybuffer' });
        const buf = Buffer.from(res.data);
        profilePicCache.set(jid, buf);
        return buf;
    } catch {
        if (!defaultAvatarBuffer) await preloadDefaultAvatar();
        profilePicCache.set(jid, defaultAvatarBuffer);
        return defaultAvatarBuffer;
    }
}

/* =======================
   BACKGROUND
======================= */
async function getGroupBackgroundImage(groupJid, conn) {
    if (groupBackgroundCache.has(groupJid)) return groupBackgroundCache.get(groupJid);
    let buffer;
    try {
        const url = await conn.profilePictureUrl(groupJid, 'image');
        const res = await axios.get(url, { responseType: 'arraybuffer' });
        buffer = Buffer.from(res.data);
    } catch {
        try {
            buffer = await fs.readFile(path.join(__dirname, '..', 'media', 'benvenuto-addio.jpg'));
        } catch {
            buffer = null;
        }
    }
    if (buffer) groupBackgroundCache.set(groupJid, buffer);
    return buffer;
}

/* =======================
   IMAGE CREATION
======================= */
async function createImageWithBrowserless(html) {
    const key = global.APIKeys?.browserless;
    const res = await axios.post(
        `https://production-sfo.browserless.io/screenshot?token=${key}`,
        {
            html,
            viewport: { width: 1600, height: 900 },
            options: { type: 'jpeg', quality: 90 }
        },
        { responseType: 'arraybuffer' }
    );
    return Buffer.from(res.data);
}

/* =======================
   MAIN HANDLER
======================= */
initPuppeteer().then(preloadDefaultAvatar);

export async function before(m, { conn, groupMetadata }) {
    if (!m.isGroup || !m.messageStubType) return true;

    const chat = global.db?.data?.chats?.[m.chat];
    if (!chat || (!chat.welcome && !chat.goodbye)) return true;

    const who = m.messageStubParameters?.[0];
    if (!who) return true;

    const jid = conn.decodeJid(who);
    const cleanUserId = jid.split('@')[0];

    const isAdd =
        m.messageStubType === WAMessageStubType.GROUP_PARTICIPANT_ADD ||
        m.messageStubType === WAMessageStubType.GROUP_PARTICIPANT_INVITE;

    const isRemove =
        m.messageStubType === WAMessageStubType.GROUP_PARTICIPANT_LEAVE ||
        m.messageStubType === WAMessageStubType.GROUP_PARTICIPANT_KICK;

    if ((isAdd && !chat.welcome) || (isRemove && !chat.goodbye)) return true;

    const username = await getUserName(conn, jid);
    const groupName = groupMetadata?.subject || 'Gruppo';
    const memberCount = groupMetadata?.participants?.length || 0;

    /* =======================
       🌟 CAPTION ELEGANTE
    ======================= */
    const caption = isRemove
        ? `
╭❍「 👋 ADDIO 」❍╮
│
│  ✦ *Utente:* @${cleanUserId}
│  ✧ Ha lasciato il gruppo
│
│  ❖ *Membri attuali:* ${memberCount}
│     
│  🤬 *CAZZO ESCE STO CANE*
│
╰───────────────╯
`
        : `
╭❍「 🌟 BENVENUTO 🌟 」❍╮
│
│  ✦ *Utente:* @${cleanUserId}
│  ✧ *Gruppo:* ${groupName}
│
│  ❖ *Membri:* ${memberCount}
│
│  💫 *Benvenuto nel team BVO*
│
╰───────────────╯
`;

    await conn.sendMessage(m.chat, {
        text: caption,
        mentions: [jid]
    });

    return true;
}