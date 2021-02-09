////////////////////////////////////
//Node modules collection
//Easy to modify
////////////////////////////////////
exports.nodes = async function () {
  db = require("better-sqlite3")("./modules/DATABASE.sqlite");
  fs = require("fs");
  path = require("path");
  Discord = require("discord.js");
  browser = require("browser");
  moment = require("moment");
  translate = require("translate");
  html = require("html-to-text");
  colour = require("./TERM_COLOURS");
  DATABASEINI = require("./DATABASE");
  TwitchEmitter = require("events");
  class Emitter extends TwitchEmitter {}
  twitchEmitter = new Emitter();
  Twitch = require("./twitchModule.js");
  request = require("request");
  cleverbot = require("cleverbot-free");
  adminEvent = require("./ADMINISTRATIVE_EVENT");
  term_clock = `\n${colour.cyan}${moment().format("MMMM Do YYYY, HH:mm:ss")}\n`;

  ////////////////////////////////////
  //Initiating the databases
  //All databases will be created or checked
  ////////////////////////////////////
  await DATABASEINI.DATABASE(db);

  ////////////////////////////////////
  //Loading/hotplugging all
  //databases for easy calling
  ////////////////////////////////////
  getPokemon = await db.prepare(
    "SELECT * FROM pokemon WHERE trainerpokemon = ?"
  );
  setPokemon = await db.prepare(
    "INSERT OR REPLACE INTO pokemon (trainerpokemon, level) VALUES (@trainerpokemon, @level);"
  );

  getTrainer = await db.prepare("SELECT * FROM trainers WHERE trainerid = ?");
  setTrainer = await db.prepare(
    "INSERT OR REPLACE INTO trainers (trainerid, pokeballs, greatballs, ultraballs, masterballs) VALUES (@trainerid, @pokeballs, @greatballs, @ultraballs, @masterballs);"
  );

  getScore = await db.prepare(
    "SELECT * FROM scores WHERE user = ? AND guild = ?"
  );
  setScore = await db.prepare(
    "INSERT OR REPLACE INTO scores (id, user, guild, points, level, warning, muted, permit, bonus) VALUES (@id, @user, @guild, @points, @level, @warning, @muted, @permit, @bonus);"
  );

  getUsage = await db.prepare("SELECT * FROM usage WHERE command = ?");
  setUsage = await db.prepare(
    "INSERT OR REPLACE INTO usage (command, number) VALUES (@command, @number);"
  );

  getRoles = await db.prepare(
    "SELECT * FROM roles WHERE guild = ? AND emoji = ?"
  );
  setRoles = await db.prepare(
    "INSERT OR REPLACE INTO roles (guild, roles, emoji) VALUES (@guild, @roles, @emoji);"
  ); //

  getGuild = await db.prepare("SELECT * FROM guildhub WHERE guild = ?");
  setGuild = await db.prepare(
    "INSERT OR REPLACE INTO guildhub (guild, generalChannel, highlightChannel, muteChannel, logsChannel, streamChannel, reactionChannel, verificationChannel, supportChannel, supportInUseChannel) VALUES (@guild, @generalChannel, @highlightChannel, @muteChannel, @logsChannel, @streamChannel, @reactionChannel, @verificationChannel, @supportChannel, @supportInUseChannel);"
  );

  getUserInfo = await db.prepare("SELECT * FROM userinfo WHERE id = ?");
  setUserInfo = await db.prepare(
    "INSERT OR REPLACE INTO userinfo (id, username, nickname, specs, totalwarnings, totalmutes) VALUES (@id, @username, @nickname, @specs, @totalwarnings, @totalmutes);"
  );

  getSettings = await db.prepare("SELECT * FROM settings WHERE guildid = ?");
  setSettings = await db.prepare(
    "INSERT OR REPLACE INTO settings (guildid, streamHere, autoMod, prefix, leveling, wmessage, defaultrole, bonuspoints, artemisTalks, wimage) VALUES (@guildid, @streamHere, @autoMod, @prefix, @leveling, @wmessage, @defaultrole, @bonuspoints, @artemisTalks, @wimage);"
  );

  getLogs = await db.prepare("SELECT * FROM logs WHERE guildid = ?");
  setLogs = await db.prepare(
    "INSERT OR REPLACE INTO logs (guildid, msgupdate, msgdelete, chancreate, chandelete, chanupdate, reactadd, reactdelete, invcreate, invdelete, grolecreate, groledelete, groleupdate, gmemadd, gmemupdate, gmemdelete, gbanadd, gbanremove, voiceupdate) VALUES (@guildid, @msgupdate, @msgdelete, @chancreate, @chandelete, @chanupdate, @reactadd, @reactdelete, @invcreate, @invdelete, @grolecreate, @groledelete, @groleupdate, @gmemadd, @gmemupdate, @gmemdelete, @gbanadd, @gbanremove, @voiceupdate);"
  );

  getPrivacy = await db.prepare("SELECT * FROM privacyisajoke WHERE msgid = ?");
  setPrivacy = await db.prepare(
    "INSERT OR REPLACE INTO privacyisajoke (msgid, userid, content, username) VALUES (@msgid, @userid, @content, @username);"
  );

  getStream = await db.prepare(
    "SELECT * FROM streamers WHERE streamerguild = ?"
  );
  setStream = await db.prepare(
    "INSERT OR REPLACE INTO streamers (streamerguild, streamer, guild, status) VALUES (@streamerguild, @streamer, @guild, @status);"
  );

  getACase = await db.prepare(
    'SELECT * FROM admincases WHERE guildid = ? ORDER BY "caseid" DESC'
  );
  setACase = await db.prepare(
    "INSERT OR REPLACE INTO admincases (guildidcaseid, caseid, guildid, userid, username, type, reason, date, judge) VALUES (@guildidcaseid, @caseid, @guildid, @userid, @username, @type, @reason, @date, @judge);"
  );

  getAdminTimer = await db.prepare("SELECT * FROM admintimers");
  setAdminTimer = await db.prepare(
    "INSERT OR REPLACE INTO admintimers (GuildUserTime, guildid, userid, type, time) VALUES (@GuildUserTime, @guildid, @userid, @type, @time);"
  );

  getLevelUp = await db.prepare("SELECT * FROM levelup WHERE guildid = ?");
  setLevelUp = await db.prepare(
    "INSERT OR REPLACE INTO levelup (GuildAndLevel, guildid, level, role) VALUES (@GuildAndLevel, @guildid, @level, @role);"
  );
};
