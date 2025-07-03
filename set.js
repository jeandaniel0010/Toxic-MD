const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoib0YrSzd5b1RuSnZPcldDUTB1YXpQU1VVZ0FuRWdJeVg3RWhISURnRnYyUT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoibS9HYXNCVWk1bkg3VzQwaWlocVBPVmdiSlhsYmlVUkN1eUdVbUpTUEpoST0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJhT3NORzJvbzRZMkFQUlBiMGY3RktoUXFmRjA2dHJPc0lFSmYwV2EvVEc4PSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiI0cCswUzhDZGdSWjYzSWhLdkVxODBuMjR0WXl4bzg0TFVUTEowR0oyOUY4PSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IjBNeEY4dEtSNi9iSFd3WXpvYUFmWnIvZy9LdmxDNEYreTNpTEx0NVVVbGc9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IklhTUp4QUFDNi9HSVFCaXRuWnFmMDh1WU56L2dzR05rQXN3TFBWcFEvVXM9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiNkZTN2JXNHhjTUdVeGQ5VWtIMjNwenVqQlJmdlIzTE5QQ2FDM2RwTjBIbz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoib0tPcmMySklFWnREYTF6eHJBM1pBemJMTnBiTkpicVNuN3p5SEFobW1oTT0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Ill1Z21SL3NCL01oM1NWUlk0TE9vY2Ivd2R2L1NZcUpmOVBiSUhxelQvM3o1Q3hrNkZkTU02NlFZTzJQM1ozcnE2NHkyZGthMzQ1KzdUNFNISFpyd0N3PT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6OCwiYWR2U2VjcmV0S2V5IjoidnJpUWZ5TDZlRndOZC9Ob2FHRW1sY3dXa3RnNDQ5Y3E4cE1wK0VGY1dJND0iLCJwcm9jZXNzZWRIaXN0b3J5TWVzc2FnZXMiOlt7ImtleSI6eyJyZW1vdGVKaWQiOiIyMjUwNTAwNjk0NjUyQHMud2hhdHNhcHAubmV0IiwiZnJvbU1lIjp0cnVlLCJpZCI6IjhGNjY3NUE0MkYxMUE3QkE2RDVBQkMwOUI1NEIwMEYzIn0sIm1lc3NhZ2VUaW1lc3RhbXAiOjE3NTE1NTcxNzN9XSwibmV4dFByZUtleUlkIjozMSwiZmlyc3RVbnVwbG9hZGVkUHJlS2V5SWQiOjMxLCJhY2NvdW50U3luY0NvdW50ZXIiOjEsImFjY291bnRTZXR0aW5ncyI6eyJ1bmFyY2hpdmVDaGF0cyI6ZmFsc2V9LCJkZXZpY2VJZCI6IjUwQ0VfM0h0U0wybUQwN1FZQ015UmciLCJwaG9uZUlkIjoiMTQ2ZGQ2ZWQtNzZiYS00NmZkLTk3MGQtMmNkYmVhNzAzMDhlIiwiaWRlbnRpdHlJZCI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IjU2K3FNa2xyc25RVTdBSkI3Q3hHWTBZRlVraz0ifSwicmVnaXN0ZXJlZCI6dHJ1ZSwiYmFja3VwVG9rZW4iOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJLWklhVHVLM1Ivd254Rjh2dlR6SEgra0JacHM9In0sInJlZ2lzdHJhdGlvbiI6e30sInBhaXJpbmdDb2RlIjoiQUJDRDEyMzQiLCJtZSI6eyJpZCI6IjIyNTA1MDA2OTQ2NTI6MjNAcy53aGF0c2FwcC5uZXQiLCJuYW1lIjoiSkVBTiBEQU5JRUwiLCJsaWQiOiI0OTc4NDM3NTU4MzkyOjIzQGxpZCJ9LCJhY2NvdW50Ijp7ImRldGFpbHMiOiJDSVRBeEMwUW9NaWF3d1lZQXlBQUtBQT0iLCJhY2NvdW50U2lnbmF0dXJlS2V5IjoiMW94cWVJTGs0emZ0bjJma05CK3hkL2M2WisxSEE5cW1hbkJrMGRoTWkwcz0iLCJhY2NvdW50U2lnbmF0dXJlIjoidXprWWJIbDk1TCtRYVZaSGFXRFE3MWJ0S3BoWnowMTlSdFROdkp6L1I4TCtPS3hXM2hJNG5BTHVpc2l1TXF4a1hBSzNYWUJiMDIzVnhmb3hEdG5KRGc9PSIsImRldmljZVNpZ25hdHVyZSI6ImRBanFYR21zNWZzN28vWnQvZmJRQ1dJZkc0QktKak4xbFc2ZGFVWFdiMVV2RTVDRWlDeENKOXhLempwWlR0TE1laGhENWVMKzNubXhRb3F6K0o4ZERBPT0ifSwic2lnbmFsSWRlbnRpdGllcyI6W3siaWRlbnRpZmllciI6eyJuYW1lIjoiMjI1MDUwMDY5NDY1MjoyM0BzLndoYXRzYXBwLm5ldCIsImRldmljZUlkIjowfSwiaWRlbnRpZmllcktleSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkJkYU1hbmlDNU9NMzdaOW41RFFmc1hmM09tZnRSd1BhcG1wd1pOSFlUSXRMIn19XSwicGxhdGZvcm0iOiJzbWJhIiwicm91dGluZ0luZm8iOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJDQWdJRFE9PSJ9LCJsYXN0QWNjb3VudFN5bmNUaW1lc3RhbXAiOjE3NTE1NTcxNjcsIm15QXBwU3RhdGVLZXlJZCI6IkFBQUFBQ1pXIn0=',
    PREFIXE: process.env.PREFIX || ".",
    OWNER_NAME: process.env.OWNER_NAME || "xh_clinton",
    NUMERO_OWNER : process.env.NUMERO_OWNER || "2250500694652",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "yes",
    AUTO_READ_MESSAGES: process.env.AUTO_READ_MESSAGES || "no",       
    AUTO_LIKE_STATUS: process.env.AUTO_LIKE_STATUS || "yes",                     
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'no',
    BOT : process.env.BOT_NAME || 'Toxic-MD',
    URL : process.env.BOT_MENU_LINKS || 'https://i.ibb.co/mChCjFPL/ad76194e124ff34e.jpg',
    MODE: process.env.PUBLIC_MODE || "yes",
    PM_PERMIT: process.env.PM_PERMIT || 'yes',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_APY_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    ETAT : process.env.PRESENCE || '',
    CHATBOT : process.env.PM_CHATBOT || 'no',
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    ADM : process.env.ANTI_DELETE_MESSAGE || 'no',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway" : "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway",
   
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
