const http = require("http");
const express = require("express");
const cors = require("cors");
const axios = require("axios");
const path = require("path");
const Player = require("./config/player")
const bodyParser = require('body-parser');
const dotenv = require("dotenv").config({
  path: path.resolve(__dirname, "../.env"),
});

const app = express();
const server = http.createServer(app);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post("/api/v1/player/add", async (req, res) => {
  const playerData = req.body;
  const playerId = await Player.create(playerData);
  if(typeof playerId !== undefined){
    res.status(200).json({success: true});
  }
})

app.get("/api/v1/player/show", async (req, res) => {
  const playerData = req.body;
  const players = await Player.find();
  if(typeof players !== undefined){
    res.status(200).json({success: true, players: players});
  }
})

app.get("/api/v1/player/calculateData/:playerId", async (req, res) => {
  const playerId = req.params.playerId;
  const player = await Player.findOne(playerId);
  if(typeof player !== undefined){
    let level = 0;
    const sum_check = Number(player.won) + Number(player.lost) + Number(player.matches_played)
    const points = Number(player.matches_played) * 2;
    const ratio = points / Number(player.matches_played);
    if(points > 2){
      level = 6;
    }
    else {
      level = 4;
    }
     res.status(200).json({success: true, level: level});
  }
})


const port = process.env.PORT;
server.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
