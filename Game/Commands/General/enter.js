const {
  SlashCommandBuilder,
  ChatInputCommandInteraction,
  Client,
} = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("enter")
    .setDescription("Enter The Bunker"),
  /**
   * @param {ChatInputCommandInteraction} interaction
   */
  execute(interaction, Client) {
    let inGame = [];
    Client.on("message", () => {
      inGame.push(interaction.user.id);
    });
    interaction.reply({
      content: `${interaction.user} has entered the Bunker`,
    });
    if (inGame.includes(interaction.user.id)) {
      console.log(tmaam);
    }
    console.log(inGame);
  },
};
