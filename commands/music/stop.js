////////////////////////////////////
//We define Category name, Command name, Description
//Permission level and full explanation here
////////////////////////////////////
module.exports = {
  category: "music",
  name: "stop",
  description: "This command allows you to stop the music player.",
  permission: "0",
  explain: `This command allows you to stop the music player.
You need to be inside a voice channel AND there has to be music playing for you to be able to use this command.

Example usage: (PREFIX)stop`,

  ////////////////////////////////////
  //We pass trough some predefined things
  //Within this command we can work with Client, raw content and a config file
  ////////////////////////////////////
  async execute(msg, client, CONFIG, npm, mmbr) {
    ////////////////////////////////////
    //We fetch the channel here
    //We can easely send with this const
    ////////////////////////////////////
    const snd = await client.channels.cache.get(msg.channel_id);

    ////////////////////////////////////
    //Defining the arguments here
    //Splits can happen later if needed
    ////////////////////////////////////
    const prefix = await CONFIG.PREFIX(msg.guild_id);
    const comName = module.exports.name;
    const arguments = await msg.content.slice(
      prefix.length + comName.length + 1
    );

    ////////////////////////////////////
    //Main command starts here
    //Comments might get smaller here
    ////////////////////////////////////
    const gld = await client.guilds.cache.get(msg.guild_id); //Get guild
    if (!gld) return;

    const voiceChannel = mmbr.voice.channel;
    if (!voiceChannel)
      return snd.send("You need to be in a voice channel to play music!");
    const permissions = voiceChannel.permissionsFor(client.user);
    if (!permissions.has("CONNECT") || !permissions.has("SPEAK")) {
      return snd.send(
        "I need the permissions to join and speak in your voice channel!"
      );
    }

    const queue = client.queue;
    const serverQueue = queue.get(gld.id);

    if (!serverQueue) return snd.send("There is nothing playing right now.");

    await serverQueue.voiceChannel.leave();

    await queue.delete(gld.id);

    fs.readdir(`./content/MUSIC/`, function (err, files) {
      if (err) return;
      files.forEach(function (file) {
        if (file.startsWith(gld.id)) {
          fs.unlink(`./content/MUSIC/${file}`, (err) => {
            if (err) return;
          });
        }
      });
    });

    snd.send(`Goodbye 👋`);
  },
};
