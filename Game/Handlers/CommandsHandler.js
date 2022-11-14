async function loadCommands(client) {
  const ascii = require("ascii-table");
  const { loadFiles } = require("../Functions/Loader");
  const table = new ascii().setHeading("Commands", "Status");

  await client.commands.clear();

  let commandsArray = [];

  const Files = await loadFiles("Commands");

  Files.forEach((file) => {
    const commands = require(file);
    client.commands.set(commands.data.name, commands);
    commandsArray.push(commands.data.toJSON());
    table.addRow(commands.data.name, "DONE");
  });
  client.application.commands.set(commandsArray);

  return console.log(table.toString(), "\n Loaded Commands");
}

module.exports = { loadCommands };
