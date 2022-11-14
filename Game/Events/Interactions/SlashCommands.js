const { ChatInputCommandInteraction } = require("discord.js");
module.exports = {
  name: "interactionCreate",
  /**
   * @param {ChatInputCommandInteraction} interaction
   */

  execute(interaction, client) {
    if (!interaction.isChatInputCommand()) return;

    const command = client.commands.get(interaction.commandName);
    if (!command) return;
    else if (!command.developer && interaction.user.id !== "907849032242700339")
      return interaction.reply({
        content: "Only Real Pharaoh Can use this commands !",
        ephemeral: true,
      });

    command.execute(interaction, client);
  },
};
