module.exports = {
  eventTrigger: async function (c, client, CONFIG, npm) {
    const gld = await client.guilds.cache.get(c.d.guild_id); //Get guild
    if (!gld) return;

    const msg = c.d; //redefine c.d to msg

    const mmbr = await gld.members.cache.get(msg.user.id); //Get Author
    if (!mmbr) return;

    USERINFO = require("../modules/USERINFO");
    USERINFO.eventTrigger(c, client, CONFIG, npm, mmbr);
  },
};
