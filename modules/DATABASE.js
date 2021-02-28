////////////////////////////////////
//All databases get checked
//and created if needed here
////////////////////////////////////
exports.DATABASE = async function (c, client, CONFIG, npm) {
  const scores = await db
    .prepare(
      "SELECT count(*) FROM sqlite_master WHERE type='table' AND name = 'scores';"
    )
    .get();
  if (!scores["count(*)"]) {
    await db
      .prepare(
        "CREATE TABLE scores (id TEXT PRIMARY KEY, user TEXT, guild TEXT, points INTEGER, level INTEGER, warning INTEGER, muted INTEGER, permit INTEGER, bonus INTEGER);"
      )
      .run();
    await db.prepare("CREATE UNIQUE INDEX idx_scores_id ON scores (id);").run();
    db.pragma("synchronous = 1");
    db.pragma("journal_mode = wal");
  }

  const Channelmanage = await db
    .prepare(
      "SELECT count(*) FROM sqlite_master WHERE type='table' AND name = 'guildhub';"
    )
    .get();
  if (!Channelmanage["count(*)"]) {
    await db
      .prepare(
        "CREATE TABLE guildhub (guild TEXT PRIMARY KEY, generalChannel TEXT, highlightChannel TEXT, muteChannel TEXT, logsChannel TEXT, streamChannel TEXT, reactionChannel TEXT, verificationChannel TEXT, supportChannel TEXT, supportInUseChannel TEXT);"
      )
      .run();
    await db
      .prepare("CREATE UNIQUE INDEX idx_guidhub_id ON guildhub (guild);")
      .run();
    db.pragma("synchronous = 1");
    db.pragma("journal_mode = wal");
  }

  const Rolemanage = await db
    .prepare(
      "SELECT count(*) FROM sqlite_master WHERE type='table' AND name = 'roles';"
    )
    .get();
  if (!Rolemanage["count(*)"]) {
    await db
      .prepare(
        "CREATE TABLE roles (guild TEXT, roles TEXT PRIMARY KEY, emoji TEXT);"
      )
      .run();
    await db
      .prepare("CREATE UNIQUE INDEX idx_roles_id ON roles (roles);")
      .run();
    db.pragma("synchronous = 1");
    db.pragma("journal_mode = wal");
  }

  const commandusage = await db
    .prepare(
      "SELECT count(*) FROM sqlite_master WHERE type='table' AND name = 'usage';"
    )
    .get();
  if (!commandusage["count(*)"]) {
    await db
      .prepare("CREATE TABLE usage (command TEXT PRIMARY KEY, number INTEGER);")
      .run();
    await db
      .prepare("CREATE UNIQUE INDEX idx_usage_id ON usage (command);")
      .run();
    db.pragma("synchronous = 1");
    db.pragma("journal_mode = wal");
  }

  const userInfo = await db
    .prepare(
      "SELECT count(*) FROM sqlite_master WHERE type='table' AND name = 'userinfo';"
    )
    .get();
  if (!userInfo["count(*)"]) {
    await db
      .prepare(
        "CREATE TABLE userinfo (id TEXT PRIMARY KEY, username TEXT, nickname TEXT, specs TEXT, totalwarnings INTEGER, totalmutes INTEGER);"
      )
      .run();
    await db
      .prepare("CREATE UNIQUE INDEX idx_userinfo_id ON userinfo (id);")
      .run();
    db.pragma("synchronous = 1");
    db.pragma("journal_mode = wal");
  }

  const settings = await db
    .prepare(
      "SELECT count(*) FROM sqlite_master WHERE type='table' AND name = 'settings';"
    )
    .get();
  if (!userInfo["count(*)"]) {
    await db
      .prepare(
        "CREATE TABLE settings (guildid TEXT PRIMARY KEY, streamHere TEXT, autoMod TEXT, prefix TEXT, leveling TEXT, wmessage TEXT, defaultrole TEXT, bonuspoints INTEGER, artemisTalks TEXT, wimage TEXT);"
      )
      .run();
    await db
      .prepare("CREATE UNIQUE INDEX idx_settings_id ON settings (guildid);")
      .run();
    db.pragma("synchronous = 1");
    db.pragma("journal_mode = wal");
  }

  const logs = await db
    .prepare(
      "SELECT count(*) FROM sqlite_master WHERE type='table' AND name = 'logs';"
    )
    .get();
  if (!logs["count(*)"]) {
    await db
      .prepare(
        "CREATE TABLE logs (guildid TEXT PRIMARY KEY, msgupdate TEXT, msgdelete TEXT, chancreate TEXT, chandelete TEXT, chanupdate TEXT, reactadd TEXT, reactdelete TEXT, invcreate TEXT, invdelete TEXT, grolecreate TEXT, groledelete TEXT, groleupdate TEXT, gmemadd TEXT, gmemupdate TEXT, gmemdelete TEXT, gbanadd TEXT, gbanremove TEXT, voiceupdate TEXT);"
      )
      .run();
    await db
      .prepare("CREATE UNIQUE INDEX idx_logs_id ON logs (guildid);")
      .run();
    db.pragma("synchronous = 1");
    db.pragma("journal_mode = wal");
  }

  const privacy = await db
    .prepare(
      "SELECT count(*) FROM sqlite_master WHERE type='table' AND name = 'privacyisajoke';"
    )
    .get();
  if (!privacy["count(*)"]) {
    await db
      .prepare(
        "CREATE TABLE privacyisajoke (msgid TEXT PRIMARY KEY, userid TEXT, content TEXT, username TEXT);"
      )
      .run();
    await db
      .prepare(
        "CREATE UNIQUE INDEX idx_privacyisajoke_id ON privacyisajoke (msgid);"
      )
      .run();
    db.pragma("synchronous = 1");
    db.pragma("journal_mode = wal");
  }

  const stream = await db
    .prepare(
      "SELECT count(*) FROM sqlite_master WHERE type='table' AND name = 'streamers';"
    )
    .get();
  if (!stream["count(*)"]) {
    await db
      .prepare(
        "CREATE TABLE streamers (streamerguild TEXT PRIMARY KEY, streamer TEXT, guild TEXT, status TEXT);"
      )
      .run();
    await db
      .prepare(
        "CREATE UNIQUE INDEX idx_streamers_id ON streamers (streamerguild);"
      )
      .run();
    db.pragma("synchronous = 1");
    db.pragma("journal_mode = wal");
  }

  const aCase = await db
    .prepare(
      "SELECT count(*) FROM sqlite_master WHERE type='table' AND name = 'admincases';"
    )
    .get();
  if (!aCase["count(*)"]) {
    await db
      .prepare(
        "CREATE TABLE admincases (guildidcaseid TEXT PRIMARY KEY, caseid INTEGER, guildid TEXT, userid TEXT, username TEXT, type TEXT, reason TEXT, date TEXT, judge TEXT);"
      )
      .run();
    await db
      .prepare(
        "CREATE UNIQUE INDEX idx_admincases_id ON admincases (guildidcaseid);"
      )
      .run();
    db.pragma("synchronous = 1");
    db.pragma("journal_mode = wal");
  }

  const caseTimers = await db
    .prepare(
      "SELECT count(*) FROM sqlite_master WHERE type='table' AND name = 'admintimers';"
    )
    .get();
  if (!caseTimers["count(*)"]) {
    await db
      .prepare(
        "CREATE TABLE admintimers (GuildUserTime TEXT PRIMARY KEY, guildid TEXT, userid TEXT, type TEXT, time TEXT);"
      )
      .run();
    await db
      .prepare(
        "CREATE UNIQUE INDEX idx_admintimers_id ON admintimers (GuildUserTime);"
      )
      .run();
    db.pragma("synchronous = 1");
    db.pragma("journal_mode = wal");
  }

  const levelup = await db
    .prepare(
      "SELECT count(*) FROM sqlite_master WHERE type='table' AND name = 'levelup';"
    )
    .get();
  if (!levelup["count(*)"]) {
    await db
      .prepare(
        "CREATE TABLE levelup (GuildAndLevel TEXT PRIMARY KEY, guildid TEXT, level INTEGER, role TEXT);"
      )
      .run();
    await db
      .prepare("CREATE UNIQUE INDEX idx_levelup_id ON levelup (GuildAndLevel);")
      .run();
    db.pragma("synchronous = 1");
    db.pragma("journal_mode = wal");
  }

  const reminderTimes = await db
    .prepare(
      "SELECT count(*) FROM sqlite_master WHERE type='table' AND name = 'remindtimers';"
    )
    .get();
  if (!reminderTimes["count(*)"]) {
    await db
      .prepare(
        "CREATE TABLE remindtimers (GuildUserTime TEXT PRIMARY KEY, reason TEXT, channel TEXT);"
      )
      .run();
    await db
      .prepare(
        "CREATE UNIQUE INDEX idx_remindtimers_id ON remindtimers (GuildUserTime);"
      )
      .run();
    db.pragma("synchronous = 1");
    db.pragma("journal_mode = wal");
  }

  const bumprecord = await db
    .prepare(
      "SELECT count(*) FROM sqlite_master WHERE type='table' AND name = 'bumprecord';"
    )
    .get();
  if (!bumprecord["count(*)"]) {
    await db
      .prepare(
        "CREATE TABLE bumprecord (GuildUser TEXT PRIMARY KEY, user TEXT, guild TEXT, bump INTEGER, dbump INTEGER, dlmbump INTEGER, like INTEGER);"
      )
      .run();
    await db
      .prepare(
        "CREATE UNIQUE INDEX idx_bumprecord_id ON bumprecord (GuildUser);"
      )
      .run();
    db.pragma("synchronous = 1");
    db.pragma("journal_mode = wal");
  }

  const supportchannels = await db
    .prepare(
      "SELECT count(*) FROM sqlite_master WHERE type='table' AND name = 'supportchannels';"
    )
    .get();
  if (!supportchannels["count(*)"]) {
    await db
      .prepare(
        "CREATE TABLE supportchannels (chanid TEXT PRIMARY KEY, inuse TEXT);"
      )
      .run();
    await db
      .prepare(
        "CREATE UNIQUE INDEX idx_supportchannels_id ON supportchannels (chanid);"
      )
      .run();
    db.pragma("synchronous = 1");
    db.pragma("journal_mode = wal");
  }

  const sCase = await db
    .prepare(
      "SELECT count(*) FROM sqlite_master WHERE type='table' AND name = 'supportcases';"
    )
    .get();
  if (!sCase["count(*)"]) {
    await db
      .prepare(
        "CREATE TABLE supportcases (caseid INTEGER PRIMARY KEY, userid TEXT, username TEXT, attachments TEXT, casemessage TEXT, date TEXT, solvedby TEXT, solution TEXT);"
      )
      .run();
    await db
      .prepare(
        "CREATE UNIQUE INDEX idx_supportcases_id ON supportcases (caseid);"
      )
      .run();
    db.pragma("synchronous = 1");
    db.pragma("journal_mode = wal");
  }

  const supportinusechannels = await db
    .prepare(
      "SELECT count(*) FROM sqlite_master WHERE type='table' AND name = 'supportinusechannels';"
    )
    .get();
  if (!supportinusechannels["count(*)"]) {
    await db
      .prepare(
        "CREATE TABLE supportinusechannels (chanid TEXT PRIMARY KEY, caseid INTEGER);"
      )
      .run();
    await db
      .prepare(
        "CREATE UNIQUE INDEX idx_supportinusechannels_id ON supportinusechannels (chanid);"
      )
      .run();
    db.pragma("synchronous = 1");
    db.pragma("journal_mode = wal");
  }

  const hlmsg = await db
    .prepare(
      "SELECT count(*) FROM sqlite_master WHERE type='table' AND name = 'hlmsg';"
    )
    .get();
  if (!hlmsg["count(*)"]) {
    await db.prepare("CREATE TABLE hlmsg (msgid TEXT PRIMARY KEY);").run();
    await db
      .prepare("CREATE UNIQUE INDEX idx_hlmsg_id ON hlmsg (msgid);")
      .run();
    db.pragma("synchronous = 1");
    db.pragma("journal_mode = wal");
  }
};
