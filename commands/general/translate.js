////////////////////////////////////
//We define Category name, Command name, Description
//Permission level and full explanation here
////////////////////////////////////
module.exports = {
  category: "general",
  name: "translate",
  description: "Translate any language to English.",
  permission: "0",
  explain: `Translate any language to English.
Nearly every language is supported.

Example usage: (PREFIX)translate Hoe gaat het met U?`,

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
    if (!arguments) return snd.send("Please provide text to translate!");

    const options = {
      method: "POST",
      url: "https://google-translate1.p.rapidapi.com/language/translate/v2",
      json: true,
      headers: {
        "content-type": "application/x-www-form-urlencoded",
        "accept-encoding": "application/gzip",
        "x-rapidapi-key": CONFIG.CONFIG.TRANSLATE_TOKEN,
        "x-rapidapi-host": "google-translate1.p.rapidapi.com",
        useQueryString: true,
      },
      form: { q: `${arguments}`, target: "en" },
    };

    request(options, function (error, response, body) {
      if (error) return snd.send("An error has occured!");

      if (!body) return snd.send("An error has occured!");
      if (!body.data) return snd.send("An error has occured!");
      if (!body.data.translations[0]) return snd.send("An error has occured!");
      if (!body.data.translations[0].translatedText)
        return snd.send("An error has occured!");

      const embed = new Discord.MessageEmbed()
        .setColor("DARK_BLUE")
        .setDescription(`${body.data.translations[0].translatedText}`);

      //embed
      snd.send({
        embed: embed,
      });
    });
  },
};
