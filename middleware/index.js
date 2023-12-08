const applyHelmet = require("./helmet");
const applyBodyParser = require("./bodyParser");
const applyMorgan = require("./morgan");

module.exports = (app) => {
  applyHelmet(app);
  applyBodyParser(app);
  applyMorgan(app);
};
