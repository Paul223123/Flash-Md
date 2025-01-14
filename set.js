const fs = require('fs-extra');
const path = require("path");
const { Sequelize } = require('sequelize');

// Load environment variables if the .env file exists
if (fs.existsSync('set.env')) {
    require('dotenv').config({ path: __dirname + '/set.env' });
}

const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined ? databasePath : process.env.DATABASE_URL;

module.exports = {
    session: process.env.SESSION_ID || 'FLASH-MD-WA-BOT;;;=>eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoic0I2S1IxcTREQVpLUytEZDZ3VG1iYWx3NnRmRDY3YzhSZEFPaFBpQUtsST0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQzZnRzRSRUZpQjgyK3RDcHFMeFlVSEU3SW4xd21KU0kzcVJ3blF5aVoyMD0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJ1SlY3T21YUUJOUE5NNW90UzNBM0EzV2tQb3JLY0lXOTQrUlJOb3ZhaldnPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJMNXYwVGNZYUx2Lzl6bC9uYWRpK2Q3dmdkUG5IejFkZGRmWlo3dUdrL0h3PSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Ik1MeXk3c3pTZ2lacU5neVAwd3RQQUwvSG1pR21oUHJKOXBValMxV1dCbjQ9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6InlBejZCemhHQnNaRXN3VnozUXlBU3hPVjRraTF5YUJLaDdPSFJYdTFEUU09In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiZ0k3VEJQWVdvVHBkeUplZStMbmhEMlNCYXBQcU0zOVBQLzNCVHhmai9tbz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoicWZ6TjE2cHdrNTdPTUFNZlQ0ekduR2xRY2dlakUxSHlRMHNrMFFKSGVEOD0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IndwNTU0eFlhSXZrbkpJNTZkM1FCVkYwK3pod2oyejh4dHpYVXIwdGNJa3lyWCtUdmdtOGMyMDFOelBaUzg0d2lPdC8yclE5SEtQcURmZ2N5N0NlL0NRPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MzYsImFkdlNlY3JldEtleSI6IjlMWC9tNG9iWnVONSttWUVyQWRoV2FWOEQ0WUV3cmxUK1dhWVFjZyt6ck09IiwicHJvY2Vzc2VkSGlzdG9yeU1lc3NhZ2VzIjpbeyJrZXkiOnsicmVtb3RlSmlkIjoiMjM0NzAyNjk2MTY3N0BzLndoYXRzYXBwLm5ldCIsImZyb21NZSI6dHJ1ZSwiaWQiOiJGQUY1QzFEN0Y2RTc5MDg4MkIyMzg1OTMzODQ5QjRERiJ9LCJtZXNzYWdlVGltZXN0YW1wIjoxNzM2ODI4NDY5fV0sIm5leHRQcmVLZXlJZCI6MzYsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozNiwiYWNjb3VudFN5bmNDb3VudGVyIjowLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwiZGV2aWNlSWQiOiJFeFNtVjBPZVRieWVXbHZEb1huTldnIiwicGhvbmVJZCI6Ijk5ZWUwYzI1LWE1N2QtNDQwMC1iMDliLThmMmQwN2QwOWE4NyIsImlkZW50aXR5SWQiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJId2xIUlUxM2Uxamk5NFdrT0xoMHVGajJrZE09In0sInJlZ2lzdGVyZWQiOmZhbHNlLCJiYWNrdXBUb2tlbiI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6InZhYTdTZ0hIU2lGSUprUkxhczR5SXBzT0d4MD0ifSwicmVnaXN0cmF0aW9uIjp7fSwiYWNjb3VudCI6eyJkZXRhaWxzIjoiQ09XYnpjRURFUHpLbDd3R0dBTWdBQ2dBIiwiYWNjb3VudFNpZ25hdHVyZUtleSI6IkY5a0tzK0kyQi9VdnZ0OHEvVjZSUzAwOXQ2TW5jcStEcjFDM0pLb1RqZ2M9IiwiYWNjb3VudFNpZ25hdHVyZSI6InFCb0Z1VVhkMEM5Z2l2amUvYTlUQjZsMlhFYVo3eW5UR0ZYeXNlY3BoalhTMml6Qyt0NUtKVlZQSUE3TzlNU2ViRjJnUkpwVUE4QkYvL0FZN1FMakFRPT0iLCJkZXZpY2VTaWduYXR1cmUiOiI2K0ZuQURJTHR0cHo2dmgzNVpwZlhOSSs5UThOQ0N6ZWJYZWYydWN4dzE1NGlWOVRpa2oyQUNuRzREeWtRU0NYMDY5b0tqT1hPNzBGd2EyNUJORUxDUT09In0sIm1lIjp7ImlkIjoiMjM0NzAyNjk2MTY3NzoyOUBzLndoYXRzYXBwLm5ldCIsIm5hbWUiOiJBeWFub2tvamkgVHJhZGVzIn0sInNpZ25hbElkZW50aXRpZXMiOlt7ImlkZW50aWZpZXIiOnsibmFtZSI6IjIzNDcwMjY5NjE2Nzc6MjlAcy53aGF0c2FwcC5uZXQiLCJkZXZpY2VJZCI6MH0sImlkZW50aWZpZXJLZXkiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJCUmZaQ3JQaU5nZjFMNzdmS3YxZWtVdE5QYmVqSjNLdmc2OVF0eVNxRTQ0SCJ9fV0sInBsYXRmb3JtIjoiYW5kcm9pZCIsImxhc3RBY2NvdW50U3luY1RpbWVzdGFtcCI6MTczNjgyODQ5NH0=',
    PREFIXES: (process.env.PREFIX || '').split(',').map(prefix => prefix.trim()).filter(Boolean),
    OWNER_NAME: process.env.OWNER_NAME || "France King",
    OWNER_NUMBER: process.env.OWNER_NUMBER || "+2347026961677",
    AUTO_READ_STATUS: process.env.AUTO_VIEW_STATUS || "on",
    AUTOREAD_MESSAGES: process.env.AUTO_READ_MESSAGES || "on",
    CHATBOT: process.env.CHAT_BOT || "off",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_SAVE_STATUS || 'off',
    A_REACT: process.env.AUTO_REACTION || 'off',
    L_S: process.env.STATUS_LIKE || 'on',
    AUTO_BLOCK: process.env.BLOCK_ALL || 'off',
    URL: process.env.MENU_LINKS || 'https://files.catbox.moe/c2jdkw.jpg',
    MODE: process.env.BOT_MODE || "private",
    PM_PERMIT: process.env.PM_PERMIT || 'on',
    HEROKU_APP_NAME: process.env.HEROKU_APP_NAME,
    HEROKU_API_KEY: process.env.HEROKU_API_KEY,
    WARN_COUNT: process.env.WARN_COUNT || '3',
    PRESENCE: process.env.PRESENCE || '',
    ADM: process.env.ANTI_DELETE || 'on',
    TZ: process.env.TIME_ZONE || 'Africa/Nairobi',
    DP: process.env.STARTING_MESSAGE || "on",
    ANTICALL: process.env.ANTICALL || 'on',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgresql://flashmd_user:JlUe2Vs0UuBGh0sXz7rxONTeXSOra9XP@dpg-cqbd04tumphs73d2706g-a/flashmd"
        : "postgresql://flashmd_user:JlUe2Vs0UuBGh0sXz7rxONTeXSOra9XP@dpg-cqbd04tumphs73d2706g-a/flashmd",
    W_M: null, // Add this line
};

// Watch for changes in this file and reload it automatically
const fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`Updated ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
