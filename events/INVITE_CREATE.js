module.exports = {
  eventTrigger: async function (c, client, CONFIG, npm) {
    let msg = c.d;

    const gld = await client.guilds.cache.get(msg.guild_id); //Get guild
    if (!gld) return;

    let embed = new Discord.MessageEmbed()
      .setThumbnail(
        `https://cdn.discordapp.com/avatars/${msg.inviter.id}/${msg.inviter.avatar}`
      )
      .setColor("GOLD")
      .setDescription("New Invite created")
      .addField(
        "Creator name:",
        `${msg.inviter.username}#${msg.inviter.discriminator}`
      )
      .addField("Creator ID", `${msg.inviter.id}`)
      .addField("Channel Link:", `<#${msg.channel_id}>`)
      .addField("Channel Invite ID:", `${msg.channel_id}`)
      .addField("Invite Code:", `${msg.code}`)
      .addField("Invite Link:", `https://discord/gg/${msg.code}`)
      .setTimestamp();

    try {
      if ((await getLogs.get(msg.guild_id).invcreate) == "ON")
        await client.channels.cache
          .get(await getGuild.get(msg.guild_id).logsChannel)
          .send({ embed });
    } catch (err) {
      console.log("");
    }
  },
};
