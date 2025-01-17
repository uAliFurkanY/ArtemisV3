////////////////////////////////////
//We define Category name, Command name, Description
//Permission level and full explanation here
////////////////////////////////////
module.exports = {
  category: "general",
  name: "avatar",
  description:
    "This command allows you to see your own or another users avatar.",
  permission: "0",
  explain: `This command allows you to see your own or another users avatar.

Example usage: (PREFIX)avatar
Example usage: (PREFIX)avatar --user=userID
Example usage: (PREFIX)avatar --user=@mention`,

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
    if (!arguments) getTarget = mmbr.user.id;
    if (arguments) {
      getTarget = arguments.split("--user=");

      if (getTarget[1])
        getTarget = getTarget[1]
          .replace("<", "")
          .replace("@", "")
          .replace("!", "")
          .replace(">", "")
          .replace(/ /g, "");

      if (!getTarget[1]) getTarget = mmbr.user.id;
    }
    if (!getTarget) getTarget = mmbr.user.id;

    const gld = await client.guilds.cache.get(msg.guild_id); //Get guild
    if (!gld) return;

    const target = await gld.members.cache.get(getTarget); //Get author
    if (!target) return snd.send("Member not found!");

    const embed = new Discord.MessageEmbed().setImage(
      target.user.displayAvatarURL({ format: "png", dynamic: true, size: 1024 })
    );

    //send embed
    snd.send({
      embed: embed,
    });
  },
};
