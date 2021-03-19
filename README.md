# Project Artemis
## _Discord Moderation, support and music bot._

[![Open Issues](https://img.shields.io/github/issues/UtopicUnicorns/ArtemisV3?logo=GitHub&style=for-the-badge)](https://github.com/UtopicUnicorns/ArtemisV3/issues) [![License](https://img.shields.io/github/license/UtopicUnicorns/ArtemisV3?logo=GitHub&style=for-the-badge)](https://github.com/UtopicUnicorns/ArtemisV3/blob/master/LICENSE) [![Stars](https://img.shields.io/github/stars/UtopicUnicorns/ArtemisV3?logo=GitHub&style=for-the-badge)](https://github.com/UtopicUnicorns/ArtemisV3) [![Forks](https://img.shields.io/github/forks/UtopicUnicorns/ArtemisV3?logo=GitHub&style=for-the-badge)](https://github.com/UtopicUnicorns/ArtemisV3) [![Code Size](https://img.shields.io/github/languages/code-size/UtopicUnicorns/ArtemisV3?logo=GitHub&style=for-the-badge)](https://github.com/UtopicUnicorns/ArtemisV3)
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

## Table of Contents

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

## First Use
### Adding the bot
To add the bot you can go to Artemis's [website](https://artemis.rest) or follow the [direct invite](https://discord.gg/Y6f3XQyuTQ)
It is important to give Artemis proper permissions(*administrative*) and a high spot in the role hierachy to ensure most functions work properly.

### Permissions overview
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

### Setting up the channels
Within a channel use the command `!setup --setup=channels`
This will give you a step by step initialization of the channels.

- Welcome channel will post a small embed for the entering/verified user.
- Mute channel is where muted users are dropped
- Verification channel is where new members are dropped and have to perform a small verification test.
- Reaction Role channel is where Artemis will check if you have setup reaction roles and where users will have to get the roles.
- Highlight channel is where messages with 3 tea reactions on their message will be displayed, it's simular to a starboard
- Stream Notification channel is where streams from twitch will show up, you have to add streamers to your own list to let them pop up.
- Logs channel is where the enabled logs go.

### Setting up the settings
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

### Setting up the logs
Within a channel use the command `!setup --setup=logs`
This command will give you a step by step walktrough of which Logs are supposed to be `ON` and which one should be `OFF`

### Setting up the levels
Within a channel use the command `!setup --setup=levels`
When this command is used it will ask you if you want to create or remove a level-up.
When you pick `create` it will give you a small step by step walktrough of which level and which role should be attached to each other.
When you pick `remove` the command will ask you to provide the level which has to be untied from a role.

### Setting up a support channel
Within a channel use the command `!setup --setup=support`
when this command is used it will ask you to mention a channel, this channel will be the core channel where support sessions are used, you will also be asked if there is something like a guru/scholar/know-it-all role and if there is you are allowed to mention the role or their role ID so that when a support ticket is opened the role gets pinged.

### Brief overview of moderation commands
The following commands will create an admin case, these cases can be reviewed, edited and invalidated:
- mute
- kick
- ban
- warn

When these commands are used Artemis will also try to DM the user in question to inform them about the moderation action taken against them.

## Advanced Use
### Adding streamers
By using the command `!streamer StreamerName` the streamername will be added to your personal guild database.
By using the same command again you can remove the streamer from your list.
When adding a streamer it will first check if it's a valid streamer, if not it will return an error which is completely fine.

When a streamer is on your list Artemis will regulary check if the streamer is online, if they are then Artemis will send a notification to the stream notification channel.

### Setting the Reaction Roles
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

