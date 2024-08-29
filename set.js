const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'FLASH-MD-WA-BOT;;;=>eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiZUd1SGJKU1owZytSVHVnQUdlSmR0UVNBbjJiZVR6M1M2dmZLUXFJOE5YWT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiOWpYR1JqbFBKWEZPb3dWbk1hNm14ZU85b2NReG5zbFlMUVNyblF6TkFIVT0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJ1SXR1eFdMTitGdU90YnJ2eXluSTZFTllBUDFmV01YbWVZbkVEUTVOYTJJPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJ2UjJIM2Z5cHdLSnFtc09VVXdYVjR0SHNOcUtLQ0NObHdmWFQ2U0tHNTNnPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkVDeGxNWlBhQUh5QzRnanR1VkFPYy82YmVNTHdNQzY4OTRZdzlVMzRyWEU9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImxodG9KTmdxMWY3aDhEMS8wSHJTSzk0dkNMRE9FZ1h4d1MzMW1kNGcyQWc9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQUk3ZWgrTlZJaG5EaHVTQWticFRRSW11dWxWNWc3dHMwSTdtVW9ZUXFuQT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiWWtmVlJ2Qmx0UWIwYWlWVUZnRUNQdGFzOTNhSW5lOTJISnVrZVY3K1lXUT0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImVWMENta0FRaDZIZ2laNmJUaFpBS2ZSTENQYzRMUVUzU2gzVm9VUXRpczhvUmZCTkFJRCsvUWRYT1BjdC9VYUZqcnJucVhrM05Bb010VURYWEw5SGdnPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6NDEsImFkdlNlY3JldEtleSI6IkNkeHp4SGlxQnpqcDlkdVRPdFVnWXkwVE5yZ2tGYUI1UWRqZDNaMldlV3M9IiwicHJvY2Vzc2VkSGlzdG9yeU1lc3NhZ2VzIjpbXSwibmV4dFByZUtleUlkIjozMSwiZmlyc3RVbnVwbG9hZGVkUHJlS2V5SWQiOjMxLCJhY2NvdW50U3luY0NvdW50ZXIiOjAsImFjY291bnRTZXR0aW5ncyI6eyJ1bmFyY2hpdmVDaGF0cyI6ZmFsc2V9LCJkZXZpY2VJZCI6IkRUemM5clJIUmhXcnNxZUsxYWdBVGciLCJwaG9uZUlkIjoiODZkODUwMWYtMGJlNS00NTBkLWE1YzYtYzRkNGM1ZWE2MWVmIiwiaWRlbnRpdHlJZCI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6InZreGdFeHdsYWZxRFVBNm11YjFjRms4YnQrdz0ifSwicmVnaXN0ZXJlZCI6dHJ1ZSwiYmFja3VwVG9rZW4iOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJWRk5iWjdtZE16cFZRcFphZ290R0pLSEhBZGs9In0sInJlZ2lzdHJhdGlvbiI6e30sInBhaXJpbmdDb2RlIjoiREc2WUZXNkYiLCJtZSI6eyJpZCI6IjIzNDcwMjY5NjE2Nzc6NDdAcy53aGF0c2FwcC5uZXQifSwiYWNjb3VudCI6eyJkZXRhaWxzIjoiQ055bWdPNEZFTlA5d3JZR0dBRWdBQ2dBIiwiYWNjb3VudFNpZ25hdHVyZUtleSI6Ik1GVkJVSEhjV1ZOd0dTdS9WWk8zZHlTKzg2MEZHaFN6ZUJKY0N0dmJNRVk9IiwiYWNjb3VudFNpZ25hdHVyZSI6InJSazFQYVlkdko4VmdxMGpyd2hSWmo1d0tqUlhjcXJ0WWtxSHZ6c24zMHpCVlB5QnZmYzM0TEJxRTNGblBTQlQ0ZWtMQnQxZkV1NlBibStqaXZjTkNRPT0iLCJkZXZpY2VTaWduYXR1cmUiOiJjaDR5MUVram1XRmx6RE1qV0tsbVJOaytHeCt0aitxREprc2lrWlB3bzFHYTRjVm9tNFMrcThSQURHeFpBQ3ErRXkzMk11SU1CWHpDdVhiUUdoVDVoQT09In0sInNpZ25hbElkZW50aXRpZXMiOlt7ImlkZW50aWZpZXIiOnsibmFtZSI6IjIzNDcwMjY5NjE2Nzc6NDdAcy53aGF0c2FwcC5uZXQiLCJkZXZpY2VJZCI6MH0sImlkZW50aWZpZXJLZXkiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJCVEJWUVZCeDNGbFRjQmtydjFXVHQzY2t2dk90QlJvVXMzZ1NYQXJiMnpCRyJ9fV0sInBsYXRmb3JtIjoiYW5kcm9pZCIsImxhc3RBY2NvdW50U3luY1RpbWVzdGFtcCI6MTcyNDk1NjM4NH0=',
    PREFIXE: process.env.PREFIX || ".",
    OWNER_NAME: process.env.OWNER_NAME || "Paul Hacker",
    OWNER_NUMBER : process.env.OWNER_NUMBER || "2347026961677", 
    A_REACT : process.env.AUTO_REACTION || 'on',     
    AUTO_READ_STATUS: process.env.AUTO_VIEW_STATUS || "on",
AUTOREAD_MESSAGES: process.env.AUTO_READ_MESSAGES || "off",
CHATBOT: process.env.CHAT_BOT || "on",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_SAVE_STATUS || 'off',
    BOT : process.env.BOT_NAME || 'FLASH-MD',
    //OPENAI_API_KEY : process.env.OPENAI_API_KEY || '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',
    URL : process.env.BOT_MENU_LINKS || '',
    MODE: process.env.BOT_MODE || "private",
    PM_PERMIT: process.env.PM_PERMIT || 'off',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_API_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    PRESENCE : process.env.PRESENCE || '',
    //GPT : process.env.OPENAI_API_KEY || '',
    DP : process.env.STARTING_MESSAGE || "on",
//    ADM : process.env.ANTI_DELETE_MESSAGE || 'off',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgresql://flashmd_user:JlUe2Vs0UuBGh0sXz7rxONTeXSOra9XP@dpg-cqbd04tumphs73d2706g-a/flashmd" : "postgresql://flashmd_user:JlUe2Vs0UuBGh0sXz7rxONTeXSOra9XP@dpg-cqbd04tumphs73d2706g-a/flashmd",
    /* new Sequelize({
     dialect: 'sqlite',
     storage: DATABASE_URL,
     logging: false,
})
: new Sequelize(DATABASE_URL, {
     dialect: 'postgres',
     ssl: true,
     protocol: 'postgres',
     dialectOptions: {
         native: true,
         ssl: { require: true, rejectUnauthorized: false },
     },
     logging: false,
}),*/
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});

