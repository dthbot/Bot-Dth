import fetch from 'node-fetch';
import { createCanvas, loadImage } from 'canvas';

// ------------------- FUNZIONI CANVAS ------------------- //

async function createNeonImage(name, profileUrl) {
    const imgResponse = await fetch(profileUrl);
    const buffer = await imgResponse.arrayBuffer();
    const img = await loadImage(Buffer.from(buffer));

    const canvas = createCanvas(img.width, img.height);
    const ctx = canvas.getContext('2d');

    ctx.drawImage(img, 0, 0);

    const fontSize = Math.floor(img.width / 8);
    ctx.font = `bold ${fontSize}px Arial`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    ctx.shadowColor = '#00FFFF';
    ctx.shadowBlur = 25;
    ctx.fillStyle = '#0FF';
    ctx.fillText(name.toUpperCase(), img.width / 2, img.height / 2);

    return canvas.toBuffer('image/png');
}

async function createPixelImage(profileUrl, pixelSize = 10) {
    const imgResponse = await fetch(profileUrl);
    const buffer = await imgResponse.arrayBuffer();
    const img = await loadImage(Buffer.from(buffer));

    const canvas = createCanvas(img.width, img.height);
    const ctx = canvas.getContext('2d');

    ctx.drawImage(img, 0, 0, img.width / pixelSize, img.height / pixelSize);
    ctx.imageSmoothingEnabled = false;
    ctx.drawImage(canvas, 0, 0, img.width / pixelSize, img.height / pixelSize, 0, 0, img.width, img.height);

    return canvas.toBuffer('image/png');
}

async function createGlitterFrame(profileUrl) {
    const imgResponse = await fetch(profileUrl);
    const buffer = await imgResponse.arrayBuffer();
    const img = await loadImage(Buffer.from(buffer));

    const canvas = createCanvas(img.width, img.height);
    const ctx = canvas.getContext('2d');

    ctx.drawImage(img, 0, 0);

    const frameWidth = img.width * 0.05;
    for (let i = 0; i < 200; i++) {
        ctx.fillStyle = `rgba(${Math.floor(Math.random()*255)}, ${Math.floor(Math.random()*255)}, 255, 0.8)`;
        const x = Math.random() * img.width;
        const y = Math.random() * img.height;
        if (x < frameWidth || x > img.width - frameWidth || y < frameWidth || y > img.height - frameWidth) {
            ctx.fillRect(x, y, 2 + Math.random() * 3, 2 + Math.random() * 3);
        }
    }

    return canvas.toBuffer('image/png');
}

// ------------------- HANDLER ------------------- //

let handler = async (m, { conn, text, usedPrefix, command }) => {
    let who = m.quoted ? m.quoted.sender : m.mentionedJid?.[0] ? m.mentionedJid[0] : m.sender;
    let name = text ? text.trim() : '';
    
    try {
        let profileUrl;
        if (m.quoted?.mtype === 'imageMessage') {
            const buffer = await m.quoted.download();
            if (!buffer) throw new Error('Impossibile scaricare l\'immagine quotata');
            profileUrl = buffer; // possiamo usare direttamente il buffer
            name = name || (await conn.getName(m.quoted.sender));
        } else {
            profileUrl = await conn.profilePictureUrl(who, 'image').catch(() => { throw new Error('L\'utente non ha una foto profilo!'); });
            name = name || (await conn.getName(who));
        }

        let bufferFinale;
        switch (command.toLowerCase()) {
            case 'neon':
                bufferFinale = await createNeonImage(name, profileUrl);
                break;
            case 'pixel':
                bufferFinale = await createPixelImage(profileUrl);
                break;
            case 'glitter':
                bufferFinale = await createGlitterFrame(profileUrl);
                break;
            default:
                return m.reply(`Comando non valido.`);
        }

        await conn.sendFile(m.chat, bufferFinale, `${command}.png`, '', m, false, { mentions: [who] });

    } catch (e) {
        console.error(e);
        await m.reply(`❌ Errore: ${e.message}`);
    }
};

handler.help = ['neon', 'pixel', 'glitter'];
handler.tags = ['effetti', 'giochi'];
handler.command = /^(neon|pixel|glitter)$/i;

export default handler;