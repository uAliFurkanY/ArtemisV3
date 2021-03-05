////////////////////////////////////
//We define Category name, Command name, Description
//Permission level and full explanation here
////////////////////////////////////
module.exports = {
  category: "server",
  name: "say",
  description: "say",
  permission: "1",
  explain: "say",

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

    let chanID = arguments.split("--channel=");

    if (!chanID[1]) return snd.send("You have not entered a channel id!");

    try {
      channelCheck = chanID[1]
        .replace("<", "")
        .replace("@", "")
        .replace("&", "")
        .replace("!", "")
        .replace(">", "")
        .replace(/ /g, "");

      let chanCheck = await client.channels.cache.get(channelCheck);
    } catch (err) {
      return snd.send("The channel ID you provided is invalid!");
    }
    channelCheck = chanID[1]
      .replace("<", "")
      .replace("@", "")
      .replace("&", "")
      .replace("!", "")
      .replace("#", "")
      .replace(">", "")
      .replace(/ /g, "");

    let chanCheck = await client.channels.cache.get(channelCheck);

    if (!chanCheck) return snd.send("The channel ID you provided is invalid!");

    if (!chanID[0]) return snd.send("You provided no message to send!");

    let args = chanID[0];

    try {
      await chanCheck.send(args);
    } catch (err) {
      return snd.send("Something went wrong!");
    }
  },
};
