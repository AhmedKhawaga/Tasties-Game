//Main

const {
  Client,
  GatewayIntentBits,
  ActivityType,
  Collection,
  Partials,
} = require("discord.js");

require("dotenv").config();

const { connect } = require("mongoose");
connect(process.env.database, {}).then(() =>
  console.log("tmaamm yaba connected")
);

const { Guilds, GuildMessages, MessageContent, GuildMembers } =
  GatewayIntentBits;
const { User, Message, GuildMember, ThreadMember } = Partials;

const client = new Client({
  intents: [Guilds, GuildMessages, GuildMembers, MessageContent],
  Partials: [User, Message, GuildMember, ThreadMember],
  allowedMentions: {
    parse: ["users"],
  },
});
const { loadEvents } = require("./Handlers/EventHandler");
const { loadCommands } = require("./Handlers/CommandsHandler");

client.events = new Collection();
client.commands = new Collection();
client.once("ready", () => {
  console.log("Bot is online!");
  client.user.setPresence({
    activities: [{ name: `The Bunker`, type: ActivityType.Competing }],
    status: "dnd",
  });
});

//Client login
client.login(process.env.token).then(() => {
  loadEvents(client);
  loadCommands(client);
});
