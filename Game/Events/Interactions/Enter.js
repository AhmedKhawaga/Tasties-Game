const { Client } = require("discord.js");
const DB = require("../../Database/database.js");
module.exports = {
  name: "Enter",
  /**
   * @param {Client} client
   */
  async execute(interaction) {
    const data = await DB.findOne({
      GuildID: interaction.guild.id,
      ChannelID: interaction.channel.id,
      MessageID: interaction.message.id,
    });

    if (!data) {
      embed.setColor("Red").setDescription("There is no data in the database");
      return interaction.reply({ embeds: [embed], ephemeral: true });
    }

    if (data.Entered.includes(interaction.user.id)) {
      embed
        .setColor("Red")
        .setDescription(`${interaction.user} is already in the Bunker`);
      return interaction.reply({ embeds: [embed] });
    }
    await DB.findOneAndUpdate(
      {
        GuildID: interaction.guild.id,
        ChannelID: interaction.channel.id,
        MessageID: interaction.message.id,
      },
      {
        $push: { Entered: interaction.user.id },
      }
    ).then(() => {
      embed
        .setColor("Green")
        .setDescription(`${interaction.user} has entered the Bunker`);
      return interaction.reply({ embeds: [embed] });
    });
  },
};
