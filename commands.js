const commands = new Object
const normalizedPath = require("path").join(__dirname, "lib", "commands");
require("fs").readdirSync(normalizedPath).forEach( (file) => {
    Object.assign(commands, require("./lib/commands/" + file));
});

module.exports = commands