////////////////////////////////////
//This is the config file, we will set all
//Important stuff here!
////////////////////////////////////
const DBS = require("better-sqlite3")("./modules/DATABASE.sqlite");
module.exports = {
	CONFIG: {
		LOGIN: "BOT_TOKEN_HERE", // Bot login token
		OWNER: "OWNER_ID_HERE", // Bot Owner used ID
		CURRENCY: "CURRENCY SYMBOL HERE", // Currency for virtual points kek
		MAIN_LOG: "DISCORD_BOT_LOG_CHANNEL", // Main bot log channel
		TWITCH_ID: "TWITCH_ID", // Twitch first id
		TWITCH_SECRET: "TWITCH_SECRET", // Twitch first secret
		TRANSLATE_TOKEN: "TRANSLATION_API_CODE", // Translation token
		privkey: "privkey.pem", // privkey token
		cert: "cert.pem", // cert token
		chain: "chain.pem", // chain token
		ytkey: "YOUTUBE_KEY",
	},
	PREFIX: async function (ID) {
		try {
			let GG = DBS.prepare("SELECT * FROM settings WHERE guildid = ?");
			let prefix = await GG.get(ID);
			return prefix.prefix;
		} catch (err) {
			return "a!";
		}
	},
};
