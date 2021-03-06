////////////////////////////////////
//Auto Mod module
//That stuff happens here
////////////////////////////////////
module.exports = {
  eventTrigger: async function (client, CONFIG, npm, mmbr, msg, snd, gld) {
    ////////////////////////////////////
    //Fetch message for deletion
    //Only gets triggered when needed
    ////////////////////////////////////
    let msgGet = await client.channels.cache
      .get(msg.channel_id)
      .messages.fetch(msg.id);

    if (!msgGet) return;

    ////////////////////////////////////
    //Word Filter
    //We check if there are disabled words here
    ////////////////////////////////////
    let wordSel = await db
      .prepare("SELECT badwords FROM badword WHERE gldid = ?;")
      .all(gld.id);

    if (wordSel) {
      if (wordSel[0]) {
        //   /\b(fuck)\b/giu
        MSG = msg.content.toLowerCase();

        SHOOT = 0;

        for (let i of wordSel) {
          let x = msg.content.toLowerCase().includes(`${i.badwords}`);

          if (x) {
            SHOOT++;

            MSG = MSG.split(`${i.badwords}`).join("***");
          }
        }

        if (SHOOT >= 1) {
          await msgGet.delete();

          return await snd.send(
            `${mmbr}, hold up!\nI detected a bad word in your message so I took the liberty of filtering it.\n\n>>> ${MSG}`
          );
        }
      }
    }

    ////////////////////////////////////
    //Phrase Filter
    //We check if there are disabled phrases here
    ////////////////////////////////////
    let phraseSel = await db
      .prepare("SELECT badphrases FROM badphrase WHERE gldid = ?;")
      .all(gld.id);

    if (phraseSel) {
      if (phraseSel[0]) {
        for (let i of phraseSel) {
          let y = msg.content.toLowerCase().includes(`${i.badphrases}`);

          if (y) {
            await msgGet.delete();
            return await snd.send(
              `${mmbr}, hold up!\nI detected a bad phrase in your message so I deleted it.`
            );
          }
        }
      }
    }

    ////////////////////////////////////
    //Discord invite filter
    //We check if there are discord invites here
    ////////////////////////////////////
    if (
      msg.content.toLowerCase().includes("discord.gg/") ||
      msg.content.toLowerCase().includes("discordapp.com/invite/")
    ) {
      try {
        await msgGet.delete();
        return await snd.send(
          `${mmbr}, hold up there, you posted a Discord Invite link, which is not allowed here.`
        );
      } catch (err) {
        return console.log("");
      }
    }
  },
};
