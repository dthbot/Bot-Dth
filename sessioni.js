import { TelegramClient } from "telegram";
import { StringSession } from "telegram/sessions/index.js";
import input from "input"; // npm install input

const apiId = 1234567; // METTI IL TUO API ID (da my.telegram.org)
const apiHash = "tua_api_hash"; // METTI IL TUO API HASH (da my.telegram.org)
const stringSession = new StringSession(""); 

(async () => {
  const client = new TelegramClient(stringSession, apiId, apiHash, { connectionRetries: 5 });
  await client.start({
    phoneNumber: async () => await input.text("Inserisci il tuo numero (+39...): "),
    password: async () => await input.text("Inserisci la password (se hai il 2FA): "),
    phoneCode: async () => await input.text("Inserisci il codice ricevuto su Telegram: "),
  });
  console.log("\n--- COPIA QUESTA STRINGA NEL PLUGIN ---");
  console.log(client.session.save()); 
  await client.disconnect();
})();
