async function loadEvents(client) {
  const ascii = require("ascii-table");
  const table = new ascii().setHeading("Events", "Status");
  const { loadFiles } = require("../Functions/Loader");
  await client.events.clear();

  const Files = await loadFiles("Events");

  Files.forEach((file) => {
    const event = require(file);

    const execute = (...args) => event.execute(...args, client);
    client.events.set(event.name, execute);

    if (event.rest) {
      if (event.once) client.reset.once(event.name, execute);
      else client.reset.on(event.name, execute);
    } else {
      if (event.once) client.once(event.name, execute);
      else client.on(event.name, execute);
    }
    table.addRow(event.name, "DONE");
  });
  return console.log(table.toString(), "\nLoaded events");
}

module.exports = { loadEvents };
