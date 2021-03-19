////////////////////////////////////
//We define Category name, Command name, Description
//Permission level and full explanation here
////////////////////////////////////
module.exports = {
  category: "administrative",
  name: "message",
  description: "This command allows you to see messages send in your server.",
  permission: "1",
  explain: `This command allows you to see messages send in your server.
This command compliments the privacy respecting deletion logs.
It allows you to see a message that has been deleted/send in channels where you do not expose the user in question.

Example usage: (PREFIX)message --message=messageID
Example usage: (PREFIX)message --user=@mention
Example usage: (PREFIX)message --user=userID`,

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

    getUser = arguments.toLowerCase().split("--user=");
    let getUserA;
    if (getUser[1]) getUserA = getUser[1].replace(/\-\-user\=.*/gm, "");
    if (getUserA) {
      let userID = await getUserA
        .replace("<", "")
        .replace("@", "")
        .replace("!", "")
        .replace(">", "")
        .replace(/ /g, "");

      getPrivacy2 = await db
        .prepare(
          `SELECT * FROM privacyisajoke WHERE userid = ? ORDER BY "msgid" DESC;`
        )
        .all(userID);

      if (!getPrivacy2[0]) return snd.send("No messages found for this user!");

      let messageArr = [];
      let mCount = 0;

      await getPrivacy2.forEach((m) => {
        mCount++;
        if (mCount <= 5)
          messageArr.push(
            `Username: \`${m.username}\`\nMessage ID: \`${m.msgid}\`\nDate: \`${
              m.content.split("\n")[0]
            }\`\n`
          );
      });

      const embed = new Discord.MessageEmbed()
        .setColor("LUMINOUS_VIVID_PINK")
        .setThumbnail(`https://cdn.discordapp.com/icons/${gld.id}/${gld.icon}`)
        .addField("Last 5 messages found:", `${messageArr.join("\n")}`);

      return snd.send({
        embed: embed,
      });
    }

    getMessage = arguments.toLowerCase().split("--message=");
    let getMessageA;
    if (getMessage[1])
      getMessageA = getMessage[1].replace(/\-\-message\=.*/gm, "");
    if (getMessageA) {
      let messageID = await getMessageA
        .replace("<", "")
        .replace("@", "")
        .replace("!", "")
        .replace(">", "")
        .replace(/ /g, "");

      let messageProc = await getPrivacy.get(messageID);

      if (!messageProc) return snd.send("Message not found!");

      const embed = new Discord.MessageEmbed()
        .setColor("DARK_VIVID_PINK")
        .setThumbnail(`https://cdn.discordapp.com/icons/${gld.id}/${gld.icon}`)
        .addField("Message by:", `${messageProc.username}`)
        .addField("User ID:", `${messageProc.userid}`)
        .addField("Message ID:", `${messageProc.msgid}`)
        .addField("Message:", `${messageProc.content.slice(0, 1000)}`);

      return snd.send({
        embed: embed,
      });
    }
  },
};
