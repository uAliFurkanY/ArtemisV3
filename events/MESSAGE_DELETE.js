module.exports = {
  eventTrigger: async function (c, client, CONFIG, npm) {
    let msg = c.d;

    const gld = await client.guilds.cache.get(msg.guild_id); //Get guild
    if (!gld) return;

    let veriCall = await getGuild.get(msg.guild_id); //Getting the verification channel
    if (veriCall) {
      if (veriCall.verificationChannel) {
        if (veriCall.verificationChannel == msg.channel_id) return;
      }
    }

    let fuckPrivacy = await getPrivacy.get(msg.id);

    if (!fuckPrivacy) return;

    let embed = new Discord.MessageEmbed()
      .setColor("DARK_ORANGE")
      .setThumbnail(`https://cdn.discordapp.com/icons/${gld.id}/${gld.icon}`)
      .setDescription("Message deleted")
      .addField("message ID:", `${msg.id}`)
      .addField("In Channel:", `<#${msg.channel_id}>`)
      .setTimestamp();

    if (fuckPrivacy) {
      embed.addField("Author Name:", fuckPrivacy.username);
      embed.addField("Author ID:", fuckPrivacy.userid);
    }

    try {
      if ((await getLogs.get(msg.guild_id).msgdelete) == "ON")
        await client.channels.cache
          .get(await getGuild.get(msg.guild_id).logsChannel)
          .send({ embed });
    } catch (err) {
      console.log("");
    }
  },
};
