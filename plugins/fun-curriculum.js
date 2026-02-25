// Plugin fatto da deadly

global.curriculumGame = global.curriculumGame || {}

const random = (arr) => arr[Math.floor(Math.random()*arr.length)]
const randomNum = (min,max) => Math.floor(Math.random()*(max-min+1))+min

// 📝 LISTE
const lavori = [
  { nome:"Web Developer", desc:"💻 Crea siti e applicazioni web" },
  { nome:"Data Scientist", desc:"📊 Analizza dati e crea insight" },
  { nome:"Graphic Designer", desc:"🎨 Disegna loghi e grafiche" },
  { nome:"Marketing Specialist", desc:"📈 Promuove brand e prodotti" },
  { nome:"Social Media Manager", desc:"📱 Gestisce profili e community" },
  { nome:"Project Manager", desc:"📋 Coordina team e progetti" },
  { nome:"Content Creator", desc:"🎬 Crea contenuti virali" },
  { nome:"Video Editor", desc:"✂️ Monta video professionali" },
  { nome:"AI Engineer", desc:"🤖 Sviluppa algoritmi e AI" },
  { nome:"UX/UI Designer", desc:"🖌️ Migliora esperienza utente e interfaccia" },
  { nome:"Blockchain Developer", desc:"⛓️ Lavora su crypto e smart contract" },
  { nome:"Community Manager", desc:"👥 Gestisce community online" },
  { nome:"Game Designer", desc:"🎮 Crea giochi e mondi virtuali" }
]

const aziende = ["Google","Meta","Amazon","Tesla","OpenAI","Microsoft","Netflix","Startup Innovativa SRL"]
const studi = ["Laurea in Informatica","Laurea in Economia","Diploma Tecnico Informatico","Master in Marketing Digitale","Laurea in Ingegneria"]
const skillsList = ["Problem Solving","Team Leadership","JavaScript","Cybersecurity","Marketing Strategy","UI/UX Design","AI & Automation","Content Strategy","Video Editing","Data Analysis"]

// 🎮 HANDLER PRINCIPALE
let handler = async (m,{conn,command}) => {
  const chat = m.chat

  // Click sul bottone "Cerca lavoro"
  if(m.buttonId === 'cerca_lavoro'){
    let reply = '💼 *Ecco alcuni lavori che potresti fare:*\n\n'
    let used = new Set()
    while(used.size < 5){
      const job = random(lavori)
      if(!used.has(job.nome)){
        used.add(job.nome)
        reply += `• ${job.nome} ${job.desc}\n`
      }
    }
    reply += `\n🔄 Premi di nuovo "Cerca lavoro" per nuovi suggerimenti!`
    return await conn.sendMessage(chat,{text:reply})
  }

  // Comando .curriculum → genera CV fake
  const nome = await conn.getName(m.sender)
  const lavoro = random(lavori).nome
  const azienda = random(aziende)
  const studio = random(studi)
  const esperienza = randomNum(1,15)
  const skills = Array.from({length:4},()=>random(skillsList)).join(" • ")
  const email = nome.toLowerCase().replace(/[^a-z]/g,'')+randomNum(10,99)+"@gmail.com"
  const telefono = "+39 3"+randomNum(10000000,99999999)

  const text = `
📄 *Curriculum di ${nome}*

👤 *Profilo*: ${lavoro}
🏢 *Azienda*: ${azienda}
📅 *Esperienza*: ${esperienza} anni

🎓 *Formazione*: ${studio}
🛠️ *Competenze*: ${skills}

📧 *Email*: ${email}
📱 *Telefono*: ${telefono}
  `

  const buttonMessage = {
    text,
    footer: '💼 Premi il bottone per esplorare altri lavori',
    buttons:[
      {buttonId:'cercalavoro',buttonText:{displayText:'Cerca lavoro'},type:1}
    ],
    headerType:1
  }

  await conn.sendMessage(chat,buttonMessage)
}

// 🔧 CONFIG PLUGIN
handler.help = ['curriculum', 'cercalavoro']
handler.tags = ['fun']
handler.command = ['curriculum', 'cercalavoro']
handler.group = false

export default handler