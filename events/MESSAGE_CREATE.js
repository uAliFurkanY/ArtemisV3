////////////////////////////////////
//This event is triggered whenever Artemis receives a NEW message
//A lot gets set in motion.
////////////////////////////////////
module.exports = {
  eventTrigger: async function (c, client, CONFIG, npm) {
    ////////////////////////////////////
    //For safety reasons any and all bots after this line
    //may not go on, bots therefor cannot execute commands and such.
    ////////////////////////////////////
    if (c.d.author.bot == true) return;

    ////////////////////////////////////
    //We define some quicker ways to call info
    //Basically you never need to do this, but it's easier.
    ////////////////////////////////////
    const prefix = await CONFIG.PREFIX("PREFIX", c.d.guild_id); //To be replaced by db

    const snd = await client.channels.cache.get(c.d.channel_id); // Get channel
    if (!snd) return;

    const gld = await client.guilds.cache.get(c.d.guild_id); //Get guild
    if (!gld) return;

    const msg = c.d; //redefine c.d to msg

    const mmbr = await gld.members.cache.get(msg.author.id); //Get Author
    if (!mmbr) return;

    const mntns = c.d.mentions; //Mentions

    ////////////////////////////////////
    //This is exactly what you think
    //Big Brother is watching you
    ////////////////////////////////////
    privacyIsAJoke = {
      msgid: msg.id,
      userid: msg.author.id,
      content: `${moment().format("MMMM Do YYYY, HH:mm:ss")}:\n${msg.content}`,
      username: `${mmbr.user.username}#${mmbr.user.discriminator}`,
    };
    await setPrivacy.run(privacyIsAJoke); //New entry

    ////////////////////////////////////
    //Some functions now that we know
    //the user is real
    ////////////////////////////////////
    USERINFO = require("../modules/USERINFO");
    USERINFO.eventTrigger(c, client, CONFIG, npm, mmbr);

    POINTS = require("../modules/POINTS");
    POINTS.eventTrigger(c, client, CONFIG, npm, mmbr);

    ////////////////////////////////////
    //Fake AI
    //Or maybe real I don't know, fuck you
    ////////////////////////////////////
    if (msg.content.toLowerCase().startsWith("hecate")) {
      let artSet = await getSettings.get(msg.guild_id); //Get database
      if (artSet) {
        if (artSet.artemisTalks == "ON") {
          let contextMsg = msg.content.slice(7);
          cleverbot(contextMsg).then(async (response) => {
            await snd.send(response);
          });
        }
      }
    }

    ////////////////////////////////////
    //Bump triggers
    //Will have to be expanded upon
    ////////////////////////////////////
    let bumpArray = ["!bump", "!d bump", "dlm!bump", "!like"];

    await bumpArray.forEach((b) => {
      if (msg.content.toLowerCase() == b) {
        BUMP = require("../modules/BUMP");
        BUMP.eventTrigger(client, CONFIG, npm, mmbr, msg, snd, gld);
      }
    });

    ////////////////////////////////////
    //Hello Artemis Module
    //Basically this is the verification stuff.
    ////////////////////////////////////
    let veriCall = await getGuild.get(msg.guild_id); //Getting the verification channel
    if (veriCall) {
      if (veriCall.verificationChannel) {
        //If there is a verification channel and the entry exists
        if (c.d.channel_id == veriCall.verificationChannel) {
          VERIFICATION = require("../modules/VERIFICATION");
          VERIFICATION.eventTrigger(client, CONFIG, npm, mmbr, msg, snd, gld);
        }
      }
    }

    ////////////////////////////////////
    //Thanking and congratulating module
    //Calls all mentions and rewards accordingly
    ////////////////////////////////////
    if (
      msg.content.toLowerCase().includes("thank") ||
      msg.content.toLowerCase().includes("congrat")
    ) {
      THANKS = require("../modules/THANKS");
      THANKS.eventTrigger(client, CONFIG, npm, mmbr, msg, snd, gld, mntns);
    }

    ////////////////////////////////////
    //Level up events/modules
    //Only happens on new messages period
    ////////////////////////////////////
    LEVEL_UP = require("../modules/LEVEL_UP");
    LEVEL_UP.eventTrigger(client, CONFIG, npm, mmbr, msg, snd, gld);

    ////////////////////////////////////
    //Commands get executed here
    //We pass trough information to the command file.
    ////////////////////////////////////
    if (!msg.content.startsWith(prefix)) return;

    try {
      const comExec = await client.commands.get(
        msg.content.slice(prefix.length).split(/ +/).shift().toLowerCase()
      );
      if (!comExec) return;

      ////////////////////////////////////
      //Permission check system
      //Goes from 0 to 4
      ////////////////////////////////////
      let perm = "NO";
      let permitCheck = await getScore.get(mmbr.id, gld.id);

      switch (comExec.permission) {
        case "0": //Regular Members
          perm = "YES";
          if (permitCheck.permit >= 0) perm = "YES";
          break;
        case "1": //Mute permissions
          if (mmbr.permissions.has("MUTE_MEMBERS")) perm = "YES";
          if (mmbr.permissions.has("KICK_MEMBERS")) perm = "YES";
          if (mmbr.permissions.has("BAN_MEMBERS")) perm = "YES";
          if (mmbr.id == (await CONFIG.CONFIG("OWNER"))) perm = "YES";
          if (permitCheck.permit >= 1) {
            perm = "YES";
            permitCheck.permit = 0;
            await setScore.run(permitCheck);
          }
          break;
        case "2": //Kick permissions
          if (mmbr.permissions.has("KICK_MEMBERS")) perm = "YES";
          if (mmbr.permissions.has("BAN_MEMBERS")) perm = "YES";
          if (mmbr.id == (await CONFIG.CONFIG("OWNER"))) perm = "YES";
          if (permitCheck.permit >= 2) {
            perm = "YES";
            permitCheck.permit = 0;
            await setScore.run(permitCheck);
          }
          break;
        case "3": //Ban permissions
          if (mmbr.permissions.has("BAN_MEMBERS")) perm = "YES";
          if (mmbr.id == (await CONFIG.CONFIG("OWNER"))) perm = "YES";
          if (permitCheck.permit >= 3) {
            perm = "YES";
            permitCheck.permit = 0;
            await setScore.run(permitCheck);
          }
          break;
        case "4": //Bot Owner
          if (mmbr.id == (await CONFIG.CONFIG("OWNER"))) perm = "YES";
          if (permitCheck.permit >= 4) {
            perm = "YES";
            permitCheck.permit = 0;
            await setScore.run(permitCheck);
          }
          break;
      }

      if (perm == "YES") {
        let usage = await getUsage.get(comExec.name);
        usage.number++;
        setUsage.run(usage);

        comExec.execute(msg, client, CONFIG, npm, mmbr);
      }

      if (perm == "NO")
        snd.send(
          `${mmbr}, You are lacking permissions to use this command!\n You need permission level: ${comExec.permission}!`
        );
    } catch (error) {
      console.error(error);
    }
  },
};
