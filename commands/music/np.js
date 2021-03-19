////////////////////////////////////
//We define Category name, Command name, Description
//Permission level and full explanation here
////////////////////////////////////
module.exports = {
  category: "music",
  name: "np",
  description: "This command shows you the current song that is playing.",
  permission: "0",
  explain: `This command shows you the current song that is playing.
Music needs to be playing to be able to use this command.

Example usage: (PREFIX)np`,

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

    const queue = client.queue;
    const serverQueue = queue.get(gld.id);

    if (!serverQueue) return snd.send("There is nothing playing right now.");

    if (serverQueue.songs) {
      let infoSong = new Discord.MessageEmbed()
        .setThumbnail(serverQueue.songs[0].thumb)
        .setColor("GREEN")
        .setAuthor(
          "Artemis Music Player",
          "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e1/YouTube_play_buttom_icon_(2013-2017).svg/512px-YouTube_play_buttom_icon_(2013-2017).svg.png"
        )
        .addField("Title:", `${serverQueue.songs[0].title}`)
        .addField("Requested by:", `${serverQueue.songs[0].req}`)
        .addField("Duration:", `${serverQueue.songs[0].dur}`)
        .addField("Description:", `${serverQueue.songs[0].desc.slice(0, 1000)}`)
        .setFooter(
          `${serverQueue.volume}% | Now playing`,
          "https://upload.wikimedia.org/wikipedia/commons/thumb/2/21/Speaker_Icon.svg/500px-Speaker_Icon.svg.png"
        );
      return snd.send({ embed: infoSong });
    }
  },
};
