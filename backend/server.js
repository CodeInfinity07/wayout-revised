const http = require("http");
const express = require("express");
const cors = require("cors");
const axios = require("axios");
const path = require("path");
const Player = require("./config/player");
const bodyParser = require("body-parser");
const dotenv = require("dotenv").config({
  path: path.resolve(__dirname, "../.env"),
});

function calculateLevel(H, A, G, S) {
  const innerValue =
    Math.log(H + A / (H * 20)) / Math.log(1.3) - Math.min((G * 15) / A, 1);
  const result = (innerValue + (S - 1.33)) * 10;

  if (Math.round(result) > 100) {
    return 100;
  } else {
    return Math.round(result);
  }
}

const app = express();
const server = http.createServer(app);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post("/api/v1/player/add", async (req, res) => {
  const playerData = req.body;
  const playerId = await Player.create(playerData);
  if (typeof playerId !== undefined) {
    res.status(200).json({ success: true });
  }
});

app.get("/api/v1/player/show", async (req, res) => {
  const playerData = req.body;
  const players = await Player.find();
  if (typeof players !== undefined) {
    res.status(200).json({ success: true, players: players });
  }
});

app.get("/api/v1/player/calculateData/:playerId", async (req, res) => {
  const playerId = req.params.playerId;
  const player = await Player.findOne(playerId);
  if (typeof player !== undefined) {
    const points = (Number(player.won) * 3) + (Number(player.drawn) * 1);
    const pvs = Number(points) / Number(player.matches_played);
    const level = calculateLevel(Number(player.average_vote), Number(player.matches_played), Number(player.no_shows), pvs);
    const sum_check =
      Number(player.won) + Number(player.lost) + Number(player.matches_played);
    const ratio = points / Number(player.matches_played);
    res.status(200).json({ success: true, level: level });
  }
});

const port = process.env.PORT;
server.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
