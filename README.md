# Project Artemis
## _Discord Moderation, support and music bot._

[![Open Issues](https://img.shields.io/github/issues/UtopicUnicorns/ArtemisV3?style=for-the-badge)](https://github.com/UtopicUnicorns/ArtemisV3/issues) [![License](https://img.shields.io/github/license/UtopicUnicorns/ArtemisV3?logo=GitHub&style=for-the-badge)](https://github.com/UtopicUnicorns/ArtemisV3/blob/master/LICENSE) [![Stars](https://img.shields.io/github/stars/UtopicUnicorns/ArtemisV3?logo=GitHub&style=for-the-badge)](https://github.com/UtopicUnicorns/ArtemisV3) [![Forks](https://img.shields.io/github/forks/UtopicUnicorns/ArtemisV3?logo=GitHub&style=for-the-badge)](https://github.com/UtopicUnicorns/ArtemisV3) [![Code Size](https://img.shields.io/github/languages/code-size/UtopicUnicorns/ArtemisV3?logo=GitHub&style=for-the-badge)](https://github.com/UtopicUnicorns/ArtemisV3)
[![Discord](https://img.shields.io/discord/660988248788697100?label=Discord&logo=Discord&style=for-the-badge)](https://discord.gg/Y6f3XQyuTQ)[![Website](https://img.shields.io/website?logo=javascript&style=for-the-badge&url=https%3A%2F%2Fartemis.rest)](https://artemis.rest)

Artemis is an all-round Discord bot, who's purpose is to provide your server with a powerful moderation and support bot!
_For example purposes the prefix used for bot commands in this file are `!`_

## Features

- Admin Cases
- Music commands
- Support Tickets
- Cleverbot integration
- Moderation commands
- Custom Commands

## Table_of_Contents

* [Table of contents](#Table_of_Contents)
   * [First Use](#First_Use)
      * [Adding the bot](#Adding_the_bot)
      * [Permissions overview](#Permissions_overview)
      * [Setting up the channels](#Setting_up_the_channels)
      * [Setting up the settings](#Setting_up_the_settings)
      * [Setting up the logs](#Setting_up_the_logs)
      * [Setting up the levels](#Setting_up_the_levels)
      * [Setting up a support channel](#Setting_up_a_support_channel)
      * [Brief overview of moderation commands](#Brief_overview_of_moderation_commands)
   * [Advanced Use](#Advanced_Use)
      * [Adding streamers](#Adding_streamers)
      * [Setting the Reaction Roles](#Setting_the_Reaction_Roles)
    * [Commands](#Commands)

## First_Use
### Adding_the_bot
To add the bot you can go to Artemis's [website](https://artemis.rest) or follow the [direct invite](https://discord.gg/Y6f3XQyuTQ)
It is important to give Artemis proper permissions(*administrative*) and a high spot in the role hierachy to ensure most functions work properly.

### Permissions_overview
_For Artemis itself the best option is to give her Administration permissions and a high spot in the role hierachy._

You might have noticed that there are permision levels in the command tree, this is basically what rights users have to use these commands, I have made a difference between Regular users, Helpers, Moderators and Administrators.
I will now explain the permission system:

- Permission level 0
    - Regular users regardless of their permissions can use these commands
     
- Permission level 1
    - Users with the permission `MUTE_MEMBERS` may use these commands, this level has helpers in mind.

- Permission level 2
    - Users with the permission `KICK_MEMBERS` may use these commands, this level has moderators in mind.

- Permission level 3
    - Users with the permission `BAN_MEMBERS` may use these commands, this level has administrators in mind.

- Permission level 4
    - Users who own the bot may use these commands, this does _NOT_ include server owners.

To give a user all rights to use all commands with exception of level 4 give the users all 3 relevant permissions in their role.

### Setting_up_the_channels
Within a channel use the command `!setup --setup=channels`
This will give you a step by step initialization of the channels.

- Welcome channel will post a small embed for the entering/verified user.
- Mute channel is where muted users are dropped
- Verification channel is where new members are dropped and have to perform a small verification test.
- Reaction Role channel is where Artemis will check if you have setup reaction roles and where users will have to get the roles.
- Highlight channel is where messages with 3 tea reactions on their message will be displayed, it's simular to a starboard
- Stream Notification channel is where streams from twitch will show up, you have to add streamers to your own list to let them pop up.
- Logs channel is where the enabled logs go.

### Setting_up_the_settings
Within a channel use the command `!setup --setup=settings`

- Stream (at)here pings: if this option is `ON` then streams that go online will be pushed out with an @here notification.
- Automod: If this is `ON` then anti discord invites, word filter and the phrase filter will be active.
- Guild Prefix: Basically what symbol has to be used before a command E.G: `a!setup`
- Point and level gathering: If this option is `ON` then users will gather points and level up respectivly.
- Guilds default role: This option allows you to select a role(*by mentioning it or using the ID*) which Artemis will read as the default role, to use Artemis properly you will have to set this up as it will unlock the muting command.
- Bonus Points: Thanking users and congratulating them will give the target user a set of points, this option allows you to edit how many points they get.
- Bots Welcome image: When a user joins the server and is verified then in the welcoming channel an embed appears, this embed has the option to use an image, that is what this option does. This setting wants you to give it an URL.
- Bot responses: When a sentence starts with `artemis` the bot will parse it and use cleverbot to give a reply. when this setting is `ON` it will do that.
- Welcoming message: Users who join the server will receive a DM from your server to notify they joined it, you can supply extra text such as information about what channels they should use etc.

### Setting_up_the_logs
Within a channel use the command `!setup --setup=logs`
This command will give you a step by step walktrough of which Logs are supposed to be `ON` and which one should be `OFF`

### Setting_up_the_levels
Within a channel use the command `!setup --setup=levels`
When this command is used it will ask you if you want to create or remove a level-up.
When you pick `create` it will give you a small step by step walktrough of which level and which role should be attached to each other.
When you pick `remove` the command will ask you to provide the level which has to be untied from a role.

### Setting_up_a_support_channel
Within a channel use the command `!setup --setup=support`
when this command is used it will ask you to mention a channel, this channel will be the core channel where support sessions are used, you will also be asked if there is something like a guru/scholar/know-it-all role and if there is you are allowed to mention the role or their role ID so that when a support ticket is opened the role gets pinged.

### Brief_overview_of_moderation_commands
The following commands will create an admin case, these cases can be reviewed, edited and invalidated:
- mute
- kick
- ban
- warn

When these commands are used Artemis will also try to DM the user in question to inform them about the moderation action taken against them.

## Advanced_Use
### Adding_streamers
By using the command `!streamer StreamerName` the streamername will be added to your personal guild database.
By using the same command again you can remove the streamer from your list.
When adding a streamer it will first check if it's a valid streamer, if not it will return an error which is completely fine.

When a streamer is on your list Artemis will regulary check if the streamer is online, if they are then Artemis will send a notification to the stream notification channel.

### Setting_the_Reaction_Roles
This is probably what you were looking for right?
Alright let's try to make this as easy to explain as possible.

You will need a reaction role channel which will be setup with the command `!setup --setup=channels`

Now you need to have a role which you create in your server settings. for this example we will call the role `@ArtyPatty` with the role ID 12345678 _NOTE: The role you create and want to be a reaction role has to be below Artemis's role in the role hierachy_

Now that we have a role we use the command `!role --action=add`
The processor will ask what role should be a reaction role, now you reply with either `@ArtyPatty` OR the role ID `12345678`
When you hit enter Artemis will check if the role exists, if it does then the processor will ask you which emote should be tied to the role, for this example we will use the emote `👍`, you can also use a custom emoji.
When you hit enter then the processor will tell you that the role has been added to the self-assignable list.

Click on the reaction role channel in your channel list.
If the channel is empty just write a new message in there, this message may contain everything.
Now that there is a message in there right click the message and hit `Copy ID`.
In the same channel use the command `!react 👍 --message=MESSAGE_ID_YOU_COPIED`
This will add a reaction emote to the message you provided with the message ID, when users click on this reaction the user will get the role that has been tied to the `👍` emoji.


## Commands
### Category: administrative
#### Command name: `!add`
Permission level: `2`
Description:
_This command allows you to add or remove points from a user or role.
This command needs parameters.

Example usage: !add --user=userID --points=20
Example usage: !add --user=@mention --points=20
Example usage: !add --user=roleID --points=20
Example usage: !add --user=@roleMention --points=20
Example usage: !add --user=userID --points=-20_

#### Command name: `!ban`
Permission level: `3`
Description:
_This command allows you to ban a user with a reason, you can also specify parameters for time.
Acceptable time parameters are: second OR minute OR hour OR day OR month OR year
Using this command without time parameter results always in a permanent ban.

Example usage: !ban userID --reason=This is a reason --time=10 hour
Example usage: !ban @mention --reason=This is a reason --time=10 minute_

#### Command name: `!case`
Permission level: `1`
Description:
_View, edit, invalidate and lookup cases.
Cases are created for mutes, warns, kicks and bans.

Example usage: !case --view=3
Example usage: !case --user=@mention
Example usage: !case --edit=3
Example usage: !case --invalidate=3_

#### Command name: `!eval`
Permission level: `4`
Description:
_Evaluate a piece of code.
This command allows you to execute smaller commands and such from the chatbox.

Example usage: !eval Math.random() * 10_

#### Command name: `!kick`
Permission level: `2`
Description:
_Allows the user to kick another user.

Example usage: !kick @mention --reason=Fill out reason here
Example usage: !kick userID --reason=Fill out reason here_

#### Command name: `!lookup`
Permission level: `1`
Description:
_Lookup user info.
This command shows you pas nicknames, usernames, wanrings, latest cases and such.

Example usage: !lookup --user=@mention
Example usage: !lookup --user=userID_

#### Command name: `!massrole`
Permission level: `2`
Description:
_This command allows you to give everyone a role.
Please use a role ID if you are in a public channel.

Example usage: !massrole roleID
Example usage: !massrole @roleMention_

#### Command name: `!message`
Permission level: `1`
Description:
_This command allows you to see messages send in your server.
This command compliments the privacy respecting deletion logs.
It allows you to see a message that has been deleted/send in channels where you do not expose the user in question.

Example usage: !message --message=messageID
Example usage: !message --user=@mention
Example usage: !message --user=userID_

#### Command name: `!mute`
Permission level: `1`
Description:
_Mute a specified user.
Mutes are always permanent without the time flag.
Acceptable time flags are: second, minute, hour, day, month, year

Example usage: !mute @mention --reason=Reason here --time=10 minute
Example usage: !mute userID --reason=Reason here --time=10 day_

#### Command name: `!permissions`
Permission level: `1`
Description:
_This command allows you to see what permissions the bot has in the channel you use the command in.
  
  Example usage: !permissions_

#### Command name: `!permit`
Permission level: `2`
Description:
_Allows the user of this command to ellevate another user permission level for one charge.
Permission changes with this command are good for one charge.
You can only bestow a permission level to another use that matches your own.

Example usage: !permit userID --level=2
Example usage: !permit @mention --level=2_

#### Command name: `!phraseban`
Permission level: `1`
Description:
_Allows you to add or remove blocked phrases.
To use this in action you need to have automod enabled!

Example usage: !phraseban --action=add
Example usage: !phraseban --action=delete_

#### Command name: `!preban`
Permission level: `3`
Description:
_Allows the user to ban another user even if they are not in your guild.
This command leaves no logs and will not remove past messages from the banned user.
However this command allows you to pre-emptively ban a user.

Example usage: !preban userID
Example usage: !preban @mention_

#### Command name: `!purge`
Permission level: `1`
Description:
_Allows you to purge messages in the current channel.
The limit decided by the API is 100 messages.

Example usage: !purge 100
Example usage: !purge 2_

#### Command name: `!steal`
Permission level: `1`
Description:
_Steal an emoji or image and make it an emoji in your own server.
  
Example usage: !steal https://example.com/emote.gif --name= EmoteName
Example usage: !steal <:KEKW:730486351970959501> --name= EmoteName_

#### Command name: `!unban`
Permission level: `3`
Description:
_This command allows you to unban a user.
Unbanning a user is only possible if they are actually banned!

Example usage: !unban userID
Example usage: !unban @mention_

#### Command name: `!unmute`
Permission level: `1`
Description:
_This command allows you to unmute a user.
Do note that the user has to be muted to actually be able to use this command.

Example usage: !unmute userID
Example usage: !unmute @mention_

#### Command name: `!warn`
Permission level: `1`
Description:
_Warns the target user.
Without the time flag the warn lasts forever.
Acceptable time flags are: second, minute, hour, day, month, year

Example usage: !warn userID --reason=Reason here --time=30 day
Example usage: !warn @mention --reason=Reason here --time=30 hour_

#### Command name: `!wordban`
Permission level: `1`
Description:
_Allows you to add or remove blocked words.
To use this in action you need to have automod enabled!

Example usage: !wordban --action=add
Example usage: !wordban --action=delete_


### Category: general
#### Command name: `!avatar`
Permission level: `0`
Description:
_This command allows you to see your own or another users avatar.

Example usage: !avatar
Example usage: !avatar --user=userID
Example usage: !avatar --user=@mention_

#### Command name: `!command`
Permission level: `0`
Description:
_This command will attempt to display all available commands to your server.
  The command may be elaborated upon to ask the bot to explain a certain command in detail.
  
  Example usage: !command ping
  Example usage: !command_

#### Command name: `!emoji`
Permission level: `0`
Description:
_Show a big version of an emoji.
  
Example usage: !emoji <:KEKW:730486351970959501>_

#### Command name: `!generate`
Permission level: `4`
Description:
_generate_

#### Command name: `!manual`
Permission level: `0`
Description:
_This command is able to fetch Linux manual pages.
  
Example usage: !manual neofetch_
,
#### Command name: `!ping`
Permission level: `0`
Description:
_This command checks the latency between the server, discord and yourself.
  
Example usage: !ping_

#### Command name: `!proton`
Permission level: `0`
Description:
_This command allows you to check if a steam game runs via proton on Linux.
*Courtesy of ProtonDB*

Example usage: !proton subnautica_

#### Command name: `!remindme`
Permission level: `0`
Description:
_This command allows you to set a reminder.
This command needs the time parameter!
Acceptable time flags are: second, minute, hour, day, month, year

Example usage: !remindme This is an example reminder --time=1 hour
Example usage: !remindme Another example reminder --time=2 day_

#### Command name: `!search`
Permission level: `0`
Description:
_Search the internet within Discord!
This command will pull your search query trough StartPage.

Example usage: !search Why do farts smell?_

#### Command name: `!translate`
Permission level: `0`
Description:
_Translate any language to English.
Nearly every language is supported.

Example usage: !translate Hoe gaat het met U?_

#### Command name: `!user`
Permission level: `0`
Description:
_Lookup some basic information about a user.

Example usage: !user --user=@mention
Example usage: !user --user=userID_

#### Command name: `!uwu`
Permission level: `0`
Description:
_Convert text to the horrifying UWU speech.

Example usage: !uwu Welcome to the jungle!_

#### Command name: `!bug`
Permission level: `0`
Description:
_Report a bug in the bot.
Abuse will be punished.

Example usage: !bug_


### Category: music
#### Command name: `!np`
Permission level: `0`
Description:
_This command shows you the current song that is playing.
Music needs to be playing to be able to use this command.

Example usage: !np_

#### Command name: `!pause`
Permission level: `0`
Description:
_This command allows you to pause the music player.
Music needs to be playing for you to use this command.

Example usage: !pause_

#### Command name: `!play`
Permission level: `0`
Description:
_Play a song.
You need to be in a voice channel to use this command.

Example usage: !play Never gonna give you up
Example usage: !play https://www.youtube.com/watch?v=dQw4w9WgXcQ_

#### Command name: `!queue`
Permission level: `0`
Description:
_This command allows you to view the music queue.
Music has to be playing for you to be able to use this command.

Example usage: !queue_

#### Command name: `!resume`
Permission level: `0`
Description:
_This command allows you to resume a paused music player.
Music has to be playing AND paused for you to use this command.

Example usage: !resume_

#### Command name: `!skip`
Permission level: `0`
Description:
_This command allows you to skip songs in the queue.
Compare the number within !queue to the song you want to skip.

Example usage: !skip
Example usage: !skip 4_

#### Command name: `!speen`
Permission level: `0`
Description:
_When there is no music playing, trigger a vinesauce spin.
This is purely for fun and all rights belong to vinny.

Example usage: !speen_

#### Command name: `!stop`
Permission level: `0`
Description:
_This command allows you to stop the music player.
You need to be inside a voice channel AND there has to be music playing for you to be able to use this command.

Example usage: !stop_

#### Command name: `!vol`
Permission level: `0`
Description:
_This command allows you to change the volume of the music player.
Volume changes persist trough music changes, but only if the bot has not left the voice channel.

Example usage: !vol 10
Example usage: !vol 50
Example usage: !vol 100_


### Category: server
#### Command name: `!board`
Permission level: `0`
Description:
_This command will show you the top 10 points holders.
  
Example usage: !board_

#### Command name: `!cc`
Permission level: `2`
Description:
_Custom command creation and deletion.
This command allows you to make or delete a custom command, commands made like this are fairly simple.

Example usage: !cc --action=create
Example usage: !cc --action=view
Example usage: !cc --action=delete_

#### Command name: `!level`
Permission level: `0`
Description:
_This command allows you to show your own or another user level and points.
This command also shows the amount of warning points and received bonusses.

Example usage: !level --user=userID
Example usage: !level --user=@mention_

#### Command name: `!migrate`
Permission level: `4`
Description:
_f_

#### Command name: `!numbers`
Permission level: `0`
Description:
_This command shows the member sizes of the self asignable roles.

Example usage: !numbers_

#### Command name: `!react`
Permission level: `1`
Description:
_This command allows you to add a reaction to a message within the channel you use this command in.
You have to use the emoji itself to use this command, both regular and custom emojis are supported.

Example usage: !react 👍 <:KEKW:730486351970959501> --message=messageID_

#### Command name: `!role`
Permission level: `2`
Description:
_This command allows you to add or remove a self asignable role.
You can specify a role within the process with either a roleID or a role mention.
Emojis askes can be custom emojis or regular emojis.

Example usage: !role --action=add
Example usage: !role --action=delete_

#### Command name: `!say`
Permission level: `1`
Description:
_Make the bot say stuff within other channels.

Example usage: !say Hello I am a bot! --channel=ChannelID
Example usage: !say Me so hungry. --channel= ChannelMention_

#### Command name: `!setup`
Permission level: `3`
Description:
_This command allows you to setup important server settings.
This command allows step by step configuration.

Example usage: !setup --setup=channels
Example usage: !setup --setup=settings
Example usage: !setup --setup=logs
Example usage: !setup --setup=levels
Example usage: !setup --setup=support

Example usage: !setup --view=channels
Example usage: !setup --view=logs
Example usage: !setup --view=levels
Example usage: !setup --view=settings_

#### Command name: `!topic`
Permission level: `1`
Description:
_This command allows you to set a topic or create/view them.
Without parameters this command will pull a random topic and applies it.

Example usage: !topic
Example usage: !topic Example Topic text --action=create
Example usage: !topic --action=view_


### Category: stream
#### Command name: `!streamer`
Permission level: `2`
Description:
_This command allows you to add or remove streamers from the stream list.
For this to be in action you need to have setup a streaming channel.

Example usage: !streamer StreamerName_


### Category: support
#### Command name: `!done`
Permission level: `0`
Description:
_Close an in-use support session.
You can only use this command within an in-use support session.

Example usage: !done_

#### Command name: `!help`
Permission level: `0`
Description:
_This command allows you to create a support session.
The channel this command is used in needs to be a designated support creation channel as setup in !setup --setup=support

Example usage: !help_

#### Command name: `!open`
Permission level: `0`
Description:
_This command allows you to reopen a previous support ticket.
This command is to be used in a designated support creation channel.

Example usage: !open 20_

#### Command name: `!view`
Permission level: `0`
Description:
_This command allows you to view a previous support ticket.
  
Example usage: !view 10_





