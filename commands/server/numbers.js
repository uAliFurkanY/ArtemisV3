////////////////////////////////////
//We define Category name, Command name, Description
//Permission level and full explanation here
////////////////////////////////////
module.exports = {
  category: "server",
  name: "numbers",
  description:
    "This command shows the member sizes of the self asignable roles.",
  permission: "0",
  explain: `This command shows the member sizes of the self asignable roles.

Example usage: (PREFIX)numbers`,

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
    const prefix = await CONFIG.PREFIX("PREFIX", msg.guild_id);
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

    const allroles = await db
      .prepare("SELECT * FROM roles WHERE guild = ?;")
      .all(gld.id);

    if (allroles.length < 1) return snd.send("No roles found in database!");

    dataRole = [];

    for (const data of allroles) {
      //push into array2
      dataRole.push(await data.roles);
    }

    let gArr = await gld.roles.cache
      .sort((a, b) => a.position - b.position)
      .map((role) => role);

    finalRole = await [];

    for (let i of gArr) {
      if (dataRole.includes(i.id)) {
        finalRole.push(
          `**\@${await gld.roles.cache.find((r) => r.name === i.name)
            .name}** \`${await gld.roles.cache.find((r) => r.name === i.name)
            .members.size}\` Members`
        );
      }
    }

    snd.send(finalRole.join("\n"), {
      split: true,
    });
  },
};
