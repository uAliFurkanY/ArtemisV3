////////////////////////////////////
//We define Category name, Command name, Description
//Permission level and full explanation here
////////////////////////////////////
module.exports = {
  category: "general",
  name: "remindme",
  description: "remindme",
  permission: "0",
  explain: "remindme",

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
    getTime = arguments.toLowerCase().split("--time=");
    let getTimeA;
    if (getTime[1]) {
      getTimeA = getTime[1];
    } else {
      getTimeA = "1 hour";
    }

    if (!getTime[0]) {
      return snd.send(
        "Please provide a message for yourself to remind you why you needed the reminder."
      );
    }

    info = {
      type: "remind",
      guild: msg.guild_id,
      channel: msg.channel_id,
      judge: `${mmbr.user.username}#${mmbr.user.discriminator}`,
      judge_id: mmbr.user.id,
      target: mmbr.user.id,
      reason: `${getTime[0]}`,
      time: `${getTimeA}`,
    };

    await adminEvent.remindEvent(msg, client, CONFIG, npm, mmbr, info, snd);
  },
};
