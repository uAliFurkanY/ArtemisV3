module.exports = {
  eventTrigger: async function (c, client, CONFIG, npm) {
    let msg = c.d;

    const gld = await client.guilds.cache.get(msg.guild_id); //Get guild
    if (!gld) return;

    let embed = new Discord.MessageEmbed()
      .setColor("GREY")
      .setDescription("Role Deleted")
      .setThumbnail(`https://cdn.discordapp.com/icons/${gld.id}/${gld.icon}`)
      .addField("Role ID:", `${msg.role_id}`)
      .setTimestamp();

    try {
      if ((await getLogs.get(msg.guild_id).groledelete) == "ON")
        await client.channels.cache
          .get(await getGuild.get(msg.guild_id).logsChannel)
          .send({ embed });
    } catch (err) {
      console.log("");
    }
  },
};
