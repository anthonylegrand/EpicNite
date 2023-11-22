require("dotenv").config();
const express = require("express");

const app = express();

app.use(express.json());

require("./app/migrations/");
require("./app/routes")(app);

app.listen(process.env.EXPRESS_PORT, () => {
  console.log(`Express server is running on port ${process.env.EXPRESS_PORT}.`);
});
