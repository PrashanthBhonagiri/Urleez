const monk = require("monk");

require("dotenv").config();

const dbUrl = process.env.DB_URL;

console.log(dbUrl);
const db = monk(dbUrl);

module.exports = db;