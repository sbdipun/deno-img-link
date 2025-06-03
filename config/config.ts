export const BOT_TOKEN = Deno.env.get("BOT_TOKEN") || 
  "6627182185:AAEBRayb9vuLUbjbmwd-NwP0fssteLsDcgU";
export const ENVS_SH_UPLOAD_URL = "https://envs.sh/";
export const IMGBB_UPLOAD_URL = "https://api-integretion-unblocked.vercel.app/imgbb";
export const SUBSCRIPTION_CHECK_BOT_TOKEN = BOT_TOKEN;
export const CHANNEL_USERNAME = Deno.env.get("CHANNEL_USERNAME") || "@dcoolbots"; // example -> @Private_Bots
export const DEVELOPER_ID = 1164918935;
export const WELCOME_IMAGE_URL = "https://envs.sh/HQP.jpg/IMG31052025.jpg";

// Validate required variables
const requiredVars = ["BOT_TOKEN", "CHANNEL_USERNAME"];
requiredVars.forEach((varName) => {
  if (!Deno.env.get(varName)) {
    throw new Error(`Missing required environment variable: ${varName}`);
  }
});

if (!CHANNEL_USERNAME.startsWith("@")) {
  throw new Error('Invalid CHANNEL_USERNAME: it must start with "@"');
}

export const MONGO_URI = (() => {
  const uri = Deno.env.get("MONGO_URI");
  if (!uri) return null;
  
  if (!uri.includes("authMechanism=")) {
    const separator = uri.includes("?") ? "&" : "?";
    return `${uri}${separator}authMechanism=SCRAM-SHA-1`;
  }
  
  return uri;
})();

export const USE_DB = Boolean(MONGO_URI);
export const CLEAN_USERNAME = CHANNEL_USERNAME.replace(/@/g, '');
