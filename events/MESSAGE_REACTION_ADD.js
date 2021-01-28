module.exports = {
  eventTrigger: async function (c, client, CONFIG, npm) {
    let msg = c.d;

    const gld = await client.guilds.cache.get(msg.guild_id); //Get guild
    if (!gld) return;

    const mmbr = await gld.members.cache.get(msg.user_id); //Get Author
    if (!mmbr) return;

    let reactChan = await getGuild.get(msg.guild_id);
    if (reactChan) {
      let chanReact = await client.channels.cache.get(
        reactChan.reactionChannel
      );
      if (chanReact && chanReact.id == msg.channel_id) {
        const message = await client.channels.cache
          .get(c.d.channel_id)
          .messages.fetch(c.d.message_id);

        const emojiKey = msg.emoji.id || msg.emoji.name;

        const reaction = await message.reactions.cache
          .get(emojiKey)
          .users.remove(mmbr);
          
        if (msg.emoji.id) {
          let roleDBeId = await getRoles.get(msg.guild_id, msg.emoji.id);
          if (roleDBeId) {
            let findMeId = await mmbr.roles.cache.find(
              (r) => r.id === `${roleDBeId.roles}`
            );
            if (findMeId) {
              try {
                await mmbr.roles.remove(
                  await gld.roles.cache.find((r) => r.id === roleDBeId.roles)
                );
                let embed = new Discord.MessageEmbed().addField(
                  "Taken Role",
                  `${gld.roles.cache.find((r) => r.id === roleDBeId.roles)}`
                );
                return await client.channels.cache
                  .get(await getGuild.get(msg.guild_id).reactionChannel)
                  .send({ embed })
                  .then((message) => {
                    message
                      .delete({
                        timeout: 1000,
                        reason: "It had to be done.",
                      })
                      .catch((err) => console.log(""));
                  });
              } catch (err) {
                console.log("");
              }
            } else {
              try {
                await mmbr.roles.add(
                  await gld.roles.cache.find((r) => r.id === roleDBeId.roles)
                );
                let embed = new Discord.MessageEmbed().addField(
                  "Given Role",
                  `${gld.roles.cache.find((r) => r.id === roleDBeId.roles)}`
                );
                return await client.channels.cache
                  .get(await getGuild.get(msg.guild_id).reactionChannel)
                  .send({ embed })
                  .then((message) => {
                    message
                      .delete({
                        timeout: 1000,
                        reason: "It had to be done.",
                      })
                      .catch((err) => console.log(""));
                  });
              } catch (err) {
                console.log("");
              }
            }
          }
        } else {
          let roleDBeName = await getRoles.get(msg.guild_id, msg.emoji.name);
          if (roleDBeName) {
            let findMeName = await mmbr.roles.cache.find(
              (r) => r.id === `${roleDBeName.roles}`
            );
            if (findMeName) {
              try {
                await mmbr.roles.remove(
                  await gld.roles.cache.find((r) => r.id === roleDBeName.roles)
                );
                let embed = new Discord.MessageEmbed().addField(
                  "Taken Role",
                  `${gld.roles.cache.find((r) => r.id === roleDBeName.roles)}`
                );
                return await client.channels.cache
                  .get(await getGuild.get(msg.guild_id).reactionChannel)
                  .send({ embed })
                  .then((message) => {
                    message
                      .delete({
                        timeout: 1000,
                        reason: "It had to be done.",
                      })
                      .catch((err) => console.log(""));
                  });
              } catch (err) {
                console.log("");
              }
            } else {
              try {
                await mmbr.roles.add(
                  await gld.roles.cache.find((r) => r.id === roleDBeName.roles)
                );
                let embed = new Discord.MessageEmbed().addField(
                  "Given Role",
                  `${gld.roles.cache.find((r) => r.id === roleDBeName.roles)}`
                );
                return await client.channels.cache
                  .get(await getGuild.get(msg.guild_id).reactionChannel)
                  .send({ embed })
                  .then((message) => {
                    message
                      .delete({
                        timeout: 1000,
                        reason: "It had to be done.",
                      })
                      .catch((err) => console.log(""));
                  });
              } catch (err) {
                console.log("");
              }
            }
          }
        }
      }
    }

    let embed = new Discord.MessageEmbed()
      .setThumbnail(
        mmbr.user.displayAvatarURL({
          format: "png",
          dynamic: true,
          size: 1024,
        })
      )
      .setColor("DARK_GREEN")
      .setDescription("React Emote added to a message")
      .addField(
        "Reaction member:",
        `${mmbr.user.username}#${mmbr.user.discriminator}`
      )
      .addField("Emote used:", `${msg.emoji.name}`)
      .addField("On message ID:", `${msg.message_id}`)
      .addField("In Channel:", `<#${msg.channel_id}>`)
      .setTimestamp();

    try {
      if ((await getLogs.get(msg.guild_id).reactadd) == "ON")
        await client.channels.cache
          .get(await getGuild.get(msg.guild_id).logsChannel)
          .send({ embed });
    } catch (err) {
      console.log("");
    }
  },
};
