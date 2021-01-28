////////////////////////////////////
//We define Category name, Command name, Description
//Permission level and full explanation here
////////////////////////////////////
module.exports = {
  category: "administrative",
  name: "unmute",
  description: "unmute",
  permission: "1",
  explain: "unmute",

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
    const prefix = await CONFIG.PREFIX("PREFIX", msg.guild_id);
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

    if (!arguments)
      return await snd.send(
        "You might want to provide an user ID or something like that."
      );

    getTarget = arguments
      .replace("<", "")
      .replace("@", "")
      .replace("!", "")
      .replace(">", "")
      .replace(/ /g, "");

    const targetMute = await gld.members.cache.get(getTarget);

    if (!targetMute) return await snd.send("This user does not exist..");

    let mutingPointThing = await getScore.get(targetMute.user.id, msg.guild_id); //decrease warning point

    if (mutingPointThing) {
      mutingPointThing.muted = 0;
      await setScore.run(mutingPointThing);
    }

    try {
      await targetMute.roles.add(
        await snd.guild.roles.cache.find(
          (r) => r.id === getSettings.get(msg.guild_id).defaultrole
        )
      );
    } catch (err) {
      console.log("");
    }

    if (await getGuild.get(msg.guild_id).muteChannel) {
      try {
        let muteChan = await gld.channels.cache.find(
          (channel) => channel.id === getGuild.get(msg.guild_id).muteChannel
        );
        if (await muteChan.permissionOverwrites.get(targetMute.user.id)) {
          await muteChan.permissionOverwrites.get(targetMute.user.id).delete();
        }
      } catch (err) {
        console.log("");
      }
    }

    await snd.send("All done!");
  },
};
