////////////////////////////////////
//We define Category name, Command name, Description
//Permission level and full explanation here
////////////////////////////////////
module.exports = {
  category: "administrative",
  name: "kick",
  description: "Allows the user to kick another user.",
  permission: "2",
  explain: `Allows the user to kick another user.

Example usage: (PREFIX)kick @mention --reason=Fill out reason here
Example usage: (PREFIX)kick userID --reason=Fill out reason here`,

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
    if (!snd.guild.me.hasPermission(["KICK_MEMBERS"]))
      return snd.send(`I do not have \`KICK_MEMBERS\` permission!`);
    getReason = arguments.toLowerCase().split("--reason=");
    let getReasonA;
    if (getReason[1]) getReasonA = getReason[1].replace(/\-\-time\=.*/gm, "");
    if (!getReasonA) getReasonA = "None given!";

    getTime = arguments.toLowerCase().split("--time=");
    let getTimeA;
    if (getTime[1]) getTimeA = getTime[1].replace(/\-\-reason\=.*/gm, "");
    if (!getTimeA) getTimeA = "0";

    getTarget = arguments.toLowerCase().split("--");
    getTargetA = getTarget[0]
      .replace("<", "")
      .replace("@", "")
      .replace("!", "")
      .replace(">", "")
      .replace(/ /g, "");

    if (!getTargetA) return snd.send("No target specified!");

    info = {
      type: "kick",
      guild: msg.guild_id,
      channel: msg.channel_id,
      judge: `${mmbr.user.username}#${mmbr.user.discriminator}`,
      judge_id: mmbr.user.id,
      target: `${getTargetA}`,
      reason: `${getReasonA}`,
      time: `${getTimeA}`,
    };

    async function confirmActionFN() {
      let confirmAction = snd.createMessageCollector(
        (m) => m.author.id === msg.author.id
      );
      confirmAction.on("collect", async (m) => {
        if (m.content.toLowerCase() == "yes") {
          await adminEvent.kickEvent(msg, client, CONFIG, npm, mmbr, info, snd);
          confirmAction.stop();
        } else {
          snd.send("Action canceled!");
          confirmAction.stop();
        }
      });
    }

    confirmActionFN();
    snd.send("Are you sure you want to perform this action?\n`YES` or `NO`");
  },
};
