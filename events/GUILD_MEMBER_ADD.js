////////////////////////////////////
//Guild member add event
//When a new user joins the guild this gets triggered
////////////////////////////////////
module.exports = {
  eventTrigger: async function (c, client, CONFIG, npm) {
    ////////////////////////////////////
    //We define some quicker ways to call info
    //Basically you never need to do this, but it's easier.
    ////////////////////////////////////
    let msg = c.d;

    if (msg.user.bot == true) return;

    const gld = await client.guilds.cache.get(msg.guild_id);
    if (!gld) return;

    const mmbr = await gld.members.cache.get(msg.user.id);
    if (!mmbr) return;

    ////////////////////////////////////
    //Check if there are database entries for user
    //else create them
    ////////////////////////////////////
    USERINFO = require("../modules/USERINFO");
    await USERINFO.eventTrigger(c, client, CONFIG, npm, mmbr);

    POINTS = require("../modules/POINTS");
    await POINTS.eventTrigger(c, client, CONFIG, npm, mmbr);

    ////////////////////////////////////
    //Info collecting for logs channel
    //And send info to the logs channel if posible
    ////////////////////////////////////
    let veriMute = await getScore.get(msg.user.id, c.d.guild_id);
    const target = await gld.members.cache.get(msg.user.id);
    let a = moment();
    let b = moment(mmbr.user.createdTimestamp);

    let years = a.diff(b, "year");
    b.add(years, "years");

    let months = a.diff(b, "months");
    b.add(months, "months");

    let days = a.diff(b, "days");

    let embed = new Discord.MessageEmbed()
      .setThumbnail(
        `https://cdn.discordapp.com/avatars/${msg.user.id}/${msg.user.avatar}`
      )
      .setColor("DARK_VIVID_PINK")
      .setDescription("Member Joined")
      .addField("Member:", `${msg.user.username}#${msg.user.discriminator}`)
      .addField("ID:", `${msg.user.id}`)
      .addField("Account age:", `${years} Years  ${months} Months ${days} Days`)
      .setTimestamp();
    if (veriMute) {
      if (veriMute.muted == "1") {
        embed.addField(
          "!!WARNING!!",
          "This user seems to be muted!\nI did not give him/her permission to enter the verification channel!"
        );
      }
    }

    try {
      if ((await getLogs.get(msg.guild_id).gmemadd) == "ON")
        await client.channels.cache
          .get(await getGuild.get(msg.guild_id).logsChannel)
          .send({ embed });
    } catch (err) {
      console.log("");
    }

    ////////////////////////////////////
    //Mute Block!
    //We send the 'new' user to the chopping block instead.
    ////////////////////////////////////
    if (veriMute.muted == "1") {
      try {
        let channel2 = await gld.channels.cache.find(
          (channel) => channel.id === getGuild.get(gld.id).muteChannel
        );
        if (channel2) {
          return await channel2.createOverwrite(target, {
            VIEW_CHANNEL: true,
            READ_MESSAGES: true,
            SEND_MESSAGES: true,
            READ_MESSAGE_HISTORY: true,
            ATTACH_FILES: false,
          });
        } else {
          return;
        }
      } catch (err) {
        return console.log("");
      }
    }

    ////////////////////////////////////
    //We check for verification here
    //Channel must exist, role must exists etc
    ////////////////////////////////////
    let veriCall = await getGuild.get(msg.guild_id);
    let roleTest = await gld.roles.cache.find(
      (r) => r.id === getSettings.get(msg.guild_id).defaultrole
    );

    if (veriCall) {
      if (veriCall.verificationChannel) {
        let channelTest = await client.channels.cache.get(
          veriCall.verificationChannel
        );
        if (roleTest) {
          if (channelTest) {
            try {
              let channel = await gld.channels.cache.find(
                (channel) =>
                  channel.id === getGuild.get(gld.id).verificationChannel
              );
              await channel.createOverwrite(target, {
                VIEW_CHANNEL: true,
                READ_MESSAGES: true,
                SEND_MESSAGES: true,
                READ_MESSAGE_HISTORY: true,
                ATTACH_FILES: false,
              });
            } catch (err) {
              console.log("");
            }

            return await channelTest.send(
              `Welcome ${target}!\n\nTo get verified simply write:\n \`Hello Artemis\``
            );
          }
        }
      }
    }
    try {
      await target.roles.add(
        await gld.roles.cache.find(
          (r) => r.id === getSettings.get(msg.guild_id).defaultrole
        )
      );
    } catch (err) {
      console.log("");
    }

    let embed2 = new Discord.MessageEmbed()
      .setThumbnail(
        target.user.displayAvatarURL({
          format: "png",
          dynamic: true,
          size: 1024,
        })
      )
      .setColor("DARK_VIVID_PINK")
      .addField(
        "Member:",
        `${target.user.username}#${target.user.discriminator}`,
        true
      )
      .addField("ID:", `${target.user.id}`, true)
      .addField("Account age:", `${years} Years  ${months} Months ${days} Days`)
      .setImage("https://artemis.rest/static/images/fire.gif");

    try {
      await client.channels.cache
        .get(await getGuild.get(msg.guild_id).generalChannel)
        .send(`${target}`, { embed: embed2 });
    } catch (err) {
      console.log("");
    }

    let mmsSend = await getSettings.get(gld.id).wmessage;
    if (mmsSend) {
      try {
        await target.send(`Welcome message from ${gld.name},\n\n${mmsSend}`, {
          split: true,
        });
      } catch (err) {
        console.log("");
      }
    }
  },
};
