////////////////////////////////////
//Music Player
//have fun
////////////////////////////////////
module.exports = {
  eventTrigger: async function (client, gld, song) {
    const queue = client.queue;
    const serverQueue = queue.get(gld.id);

    const VC = await client.channels.cache.get(serverQueue.voiceChannel.id);

    if (VC.members.size == 1) {
      serverQueue.voiceChannel.leave();
      serverQueue.textChannel.send(
        `There are no users in the channel I am playing music in, Goodbye 👋`
      );
      queue.delete(gld.id);

      fs.readdir(`./content/MUSIC/`, function (err, files) {
        if (err) return;
        files.forEach(function (file) {
          if (file.startsWith(gld.id)) {
            fs.unlink(`./content/MUSIC/${file}`, (err) => {
              if (err) return;
            });
          }
        });
      });

      return;
    }

    if (!song) {
      serverQueue.voiceChannel.leave();
      serverQueue.textChannel.send(`Goodbye 👋`);
      queue.delete(gld.id);

      fs.readdir(`./content/MUSIC/`, function (err, files) {
        if (err) return;
        files.forEach(function (file) {
          if (file.startsWith(gld.id)) {
            fs.unlink(`./content/MUSIC/${file}`, (err) => {
              if (err) return;
            });
          }
        });
      });
      return;
    }

    const dispatcher = serverQueue.connection
      .play(song.url)
      .on("finish", () => {
        serverQueue.songs.shift();
        PLAYER.eventTrigger(client, gld, serverQueue.songs[0]);
      })
      .on("error", (error) => console.error(error));
    dispatcher.setVolume(serverQueue.volume / 100);
    let addSong = new Discord.MessageEmbed()
      .setThumbnail(song.thumb)
      .setColor("GOLD")
      .setAuthor(
        "Artemis Music Player",
        "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e1/YouTube_play_buttom_icon_(2013-2017).svg/512px-YouTube_play_buttom_icon_(2013-2017).svg.png"
      )
      .addField("Title:", `${song.title}`)
      .addField("Duration:", `${song.dur}`)
      .addField("Requested by:", `${song.req}`)
      .setFooter(
        `${serverQueue.volume}% | Started playing this song`,
        "https://upload.wikimedia.org/wikipedia/commons/thumb/2/21/Speaker_Icon.svg/500px-Speaker_Icon.svg.png"
      );
    serverQueue.textChannel.send({ embed: addSong });
  },
};
