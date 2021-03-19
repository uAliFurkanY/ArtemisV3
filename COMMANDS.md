# Commands for Artemis V3

## Category `administrative`

### Command `add`

#### Permission Level: 2

#### Description:

```
This command allows you to add or remove points from a user or role.
This command needs parameters.

Example usage: !add --user=userID --points=20
Example usage: !add --user=@mention --points=20
Example usage: !add --user=roleID --points=20
Example usage: !add --user=@roleMention --points=20
Example usage: !add --user=userID --points=-20
```

### Command `ban`

#### Permission Level: 3

#### Description:

```
This command allows you to ban a user with a reason, you can also specify parameters for time.
Acceptable time parameters are: second OR minute OR hour OR day OR month OR year
Using this command without time parameter results always in a permanent ban.

Example usage: !ban userID --reason=This is a reason --time=10 hour
Example usage: !ban @mention --reason=This is a reason --time=10 minute
```

### Command `case`

#### Permission Level: 1

#### Description:

```
View, edit, invalidate and lookup cases.
Cases are created for mutes, warns, kicks and bans.

Example usage: !case --view=3
Example usage: !case --user=@mention
Example usage: !case --edit=3
Example usage: !case --invalidate=3
```

### Command `eval`

#### Permission Level: 4

#### Description:

```
Evaluate a piece of code.
This command allows you to execute smaller commands and such from the chatbox.

Example usage: !eval Math.random() * 10
```

### Command `kick`

#### Permission Level: 2

#### Description:

```
Allows the user to kick another user.

Example usage: !kick @mention --reason=Fill out reason here
Example usage: !kick userID --reason=Fill out reason here
```

### Command `lookup`

#### Permission Level: 1

#### Description:

```
Lookup user info.
This command shows you pas nicknames, usernames, wanrings, latest cases and such.

Example usage: !lookup --user=@mention
Example usage: !lookup --user=userID
```

### Command `massrole`

#### Permission Level: 2

#### Description:

```
This command allows you to give everyone a role.
Please use a role ID if you are in a public channel.

Example usage: !massrole roleID
Example usage: !massrole @roleMention
```

### Command `message`

#### Permission Level: 1

#### Description:

```
This command allows you to see messages send in your server.
This command compliments the privacy respecting deletion logs.
It allows you to see a message that has been deleted/send in channels where you do not expose the user in question.

Example usage: !message --message=messageID
Example usage: !message --user=@mention
Example usage: !message --user=userID
```

### Command `mute`

#### Permission Level: 1

#### Description:

```
Mute a specified user.
Mutes are always permanent without the time flag.
Acceptable time flags are: second, minute, hour, day, month, year

Example usage: !mute @mention --reason=Reason here --time=10 minute
Example usage: !mute userID --reason=Reason here --time=10 day
```

### Command `permissions`

#### Permission Level: 1

#### Description:

```
This command allows you to see what permissions the bot has in the channel you use the command in.

  Example usage: !permissions
```

### Command `permit`

#### Permission Level: 2

#### Description:

```
Allows the user of this command to ellevate another user permission level for one charge.
Permission changes with this command are good for one charge.
You can only bestow a permission level to another use that matches your own.

Example usage: !permit userID --level=2
Example usage: !permit @mention --level=2
```

### Command `phraseban`

#### Permission Level: 1

#### Description:

```
Allows you to add or remove blocked phrases.
To use this in action you need to have automod enabled!

Example usage: !phraseban --action=add
Example usage: !phraseban --action=delete
```

### Command `preban`

#### Permission Level: 3

#### Description:

```
Allows the user to ban another user even if they are not in your guild.
This command leaves no logs and will not remove past messages from the banned user.
However this command allows you to pre-emptively ban a user.

Example usage: !preban userID
Example usage: !preban @mention
```

### Command `purge`

#### Permission Level: 1

#### Description:

```
Allows you to purge messages in the current channel.
The limit decided by the API is 100 messages.

Example usage: !purge 100
Example usage: !purge 2
```

### Command `steal`

#### Permission Level: 1

#### Description:

```
Steal an emoji or image and make it an emoji in your own server.

Example usage: !steal https://example.com/emote.gif --name= EmoteName
Example usage: !steal <:KEKW:730486351970959501> --name= EmoteName
```

### Command `unban`

#### Permission Level: 3

#### Description:

```
This command allows you to unban a user.
Unbanning a user is only possible if they are actually banned!

Example usage: !unban userID
Example usage: !unban @mention
```

### Command `unmute`

#### Permission Level: 1

#### Description:

```
This command allows you to unmute a user.
Do note that the user has to be muted to actually be able to use this command.

Example usage: !unmute userID
Example usage: !unmute @mention
```

### Command `warn`

#### Permission Level: 1

#### Description:

```
Warns the target user.
Without the time flag the warn lasts forever.
Acceptable time flags are: second, minute, hour, day, month, year

Example usage: !warn userID --reason=Reason here --time=30 day
Example usage: !warn @mention --reason=Reason here --time=30 hour
```

### Command `wordban`

#### Permission Level: 1

#### Description:

```
Allows you to add or remove blocked words.
To use this in action you need to have automod enabled!

Example usage: !wordban --action=add
Example usage: !wordban --action=delete
```

## Category `general`

### Command `avatar`

#### Permission Level: 0

#### Description:

```
This command allows you to see your own or another users avatar.

Example usage: !avatar
Example usage: !avatar --user=userID
Example usage: !avatar --user=@mention
```

### Command `command`

#### Permission Level: 0

#### Description:

```
This command will attempt to display all available commands to your server.
  The command may be elaborated upon to ask the bot to explain a certain command in detail.

  Example usage: !command ping
  Example usage: !command
```

### Command `emoji`

#### Permission Level: 0

#### Description:

```
Show a big version of an emoji.

Example usage: !emoji <:KEKW:730486351970959501>
```

### Command `generate`

#### Permission Level: 4

#### Description:

```
generate
```

### Command `manual`

#### Permission Level: 0

#### Description:

```
This command is able to fetch Linux manual pages.

Example usage: !manual neofetch
```

### Command `ping`

#### Permission Level: 0

#### Description:

```
This command checks the latency between the server, discord and yourself.

Example usage: !ping
```

### Command `proton`

#### Permission Level: 0

#### Description:

```
This command allows you to check if a steam game runs via proton on Linux.
*Courtesy of ProtonDB*

Example usage: !proton subnautica
```

### Command `remindme`

#### Permission Level: 0

#### Description:

```
This command allows you to set a reminder.
This command needs the time parameter!
Acceptable time flags are: second, minute, hour, day, month, year

Example usage: !remindme This is an example reminder --time=1 hour
Example usage: !remindme Another example reminder --time=2 day
```

### Command `search`

#### Permission Level: 0

#### Description:

```
Search the internet within Discord!
This command will pull your search query trough StartPage.

Example usage: !search Why do farts smell?
```

### Command `translate`

#### Permission Level: 0

#### Description:

```
Translate any language to English.
Nearly every language is supported.

Example usage: !translate Hoe gaat het met U?
```

### Command `user`

#### Permission Level: 0

#### Description:

```
Lookup some basic information about a user.

Example usage: !user --user=@mention
Example usage: !user --user=userID
```

### Command `uwu`

#### Permission Level: 0

#### Description:

```
Convert text to the horrifying UWU speech.

Example usage: !uwu Welcome to the jungle!
```

## Category `music`

### Command `np`

#### Permission Level: 0

#### Description:

```
This command shows you the current song that is playing.
Music needs to be playing to be able to use this command.

Example usage: !np
```

### Command `pause`

#### Permission Level: 0

#### Description:

```
This command allows you to pause the music player.
Music needs to be playing for you to use this command.

Example usage: !pause
```

### Command `play`

#### Permission Level: 0

#### Description:

```
Play a song.
You need to be in a voice channel to use this command.

Example usage: !play Never gonna give you up
Example usage: !play https://www.youtube.com/watch?v=dQw4w9WgXcQ
```

### Command `queue`

#### Permission Level: 0

#### Description:

```
This command allows you to view the music queue.
Music has to be playing for you to be able to use this command.

Example usage: !queue
```

### Command `resume`

#### Permission Level: 0

#### Description:

```
This command allows you to resume a paused music player.
Music has to be playing AND paused for you to use this command.

Example usage: !resume
```

### Command `skip`

#### Permission Level: 0

#### Description:

```
This command allows you to skip songs in the queue.
Compare the number within !queue to the song you want to skip.

Example usage: !skip
Example usage: !skip 4
```

### Command `speen`

#### Permission Level: 0

#### Description:

```
When there is no music playing, trigger a vinesauce spin.
This is purely for fun and all rights belong to vinny.

Example usage: !speen
```

### Command `stop`

#### Permission Level: 0

#### Description:

```
This command allows you to stop the music player.
You need to be inside a voice channel AND there has to be music playing for you to be able to use this command.

Example usage: !stop
```

### Command `vol`

#### Permission Level: 0

#### Description:

```
This command allows you to change the volume of the music player.
Volume changes persist trough music changes, but only if the bot has not left the voice channel.

Example usage: !vol 10
Example usage: !vol 50
Example usage: !vol 100
```

## Category `server`

### Command `board`

#### Permission Level: 0

#### Description:

```
This command will show you the top 10 points holders.

Example usage: !board
```

### Command `bug`

#### Permission Level: 0

#### Description:

```
Report a bug in the bot.
Abuse will be punished.

Example usage: !bug
```

### Command `cc`

#### Permission Level: 2

#### Description:

```
Custom command creation and deletion.
This command allows you to make or delete a custom command, commands made like this are fairly simple.

Example usage: !cc --action=create
Example usage: !cc --action=view
Example usage: !cc --action=delete
```

### Command `level`

#### Permission Level: 0

#### Description:

```
This command allows you to show your own or another user level and points.
This command also shows the amount of warning points and received bonusses.

Example usage: !level --user=userID
Example usage: !level --user=@mention
```

### Command `migrate`

#### Permission Level: 4

#### Description:

```
f
```

### Command `numbers`

#### Permission Level: 0

#### Description:

```
This command shows the member sizes of the self asignable roles.

Example usage: !numbers
```

### Command `react`

#### Permission Level: 1

#### Description:

```
This command allows you to add a reaction to a message within the channel you use this command in.
You have to use the emoji itself to use this command, both regular and custom emojis are supported.

Example usage: !react 👍 <:KEKW:730486351970959501> --message=messageID
```

### Command `role`

#### Permission Level: 2

#### Description:

```
This command allows you to add or remove a self asignable role.
You can specify a role within the process with either a roleID or a role mention.
Emojis askes can be custom emojis or regular emojis.

Example usage: !role --action=add
Example usage: !role --action=delete
```

### Command `say`

#### Permission Level: 1

#### Description:

```
Make the bot say stuff within other channels.

Example usage: !say Hello I am a bot! --channel=ChannelID
Example usage: !say Me so hungry. --channel= ChannelMention
```

### Command `setup`

#### Permission Level: 3

#### Description:

```
This command allows you to setup important server settings.
This command allows step by step configuration.

Example usage: !setup --setup=channels
Example usage: !setup --setup=settings
Example usage: !setup --setup=logs
Example usage: !setup --setup=levels
Example usage: !setup --setup=support

Example usage: !setup --view=channels
Example usage: !setup --view=logs
Example usage: !setup --view=levels
Example usage: !setup --view=settings
```

### Command `topic`

#### Permission Level: 1

#### Description:

```
This command allows you to set a topic or create/view them.
Without parameters this command will pull a random topic and applies it.

Example usage: !topic
Example usage: !topic Example Topic text --action=create
Example usage: !topic --action=view
```

## Category `stream`

### Command `streamer`

#### Permission Level: 2

#### Description:

```
This command allows you to add or remove streamers from the stream list.
For this to be in action you need to have setup a streaming channel.

Example usage: !streamer StreamerName
```

## Category `support`

### Command `done`

#### Permission Level: 0

#### Description:

```
Close an in-use support session.
You can only use this command within an in-use support session.

Example usage: !done
```

### Command `help`

#### Permission Level: 0

#### Description:

```
This command allows you to create a support session.
The channel this command is used in needs to be a designated support creation channel as setup in !setup --setup=support

Example usage: !help
```

### Command `open`

#### Permission Level: 0

#### Description:

```
This command allows you to reopen a previous support ticket.
This command is to be used in a designated support creation channel.

Example usage: !open 20
```

### Command `view`

#### Permission Level: 0

#### Description:

```
This command allows you to view a previous support ticket.

Example usage: !view 10
```

