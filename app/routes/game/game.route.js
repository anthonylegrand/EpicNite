const router = require("express").Router();

const controller = require("./../../controllers/game.controller");

module.exports = function (app) {
  router.post("/sendData", controller.sendData);

  app.use("/game", router);
};
