const { model, Schema } = require("mongoose");

module.exports = model(
  "Giveaway",
  new Schema({
    GuildID: String,
    ChannelID: String,
    MessageID: String,
    Winners: Number,
    Prize: String,
    EndTime: String,
    HostedBy: String,
    Entered: [String],
  })
);
