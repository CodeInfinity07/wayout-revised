const { ObjectId } = require("mongodb");
const { getClient } = require("./db");

const Player = {
  create: async (playerData) => {
    const client = getClient();
    try {
      await client.connect();
      const db = client.db("wayout");
      const playersCollection = db.collection("players");
      const collections = await db
        .listCollections({ name: "players" })
        .toArray();
      if (collections.length === 0) {
        await db.createCollection("players");
      }
      const result = await playersCollection.insertOne(playerData);
      return result.insertedId.toString();
    } finally {
      await client.close();
    }
  },

  find: async () => {
    const client = getClient();
    try {
      await client.connect();
      const playersCollection = client.db("wayout").collection("players");
      const cursor = playersCollection.find();
      const players = await cursor.toArray();
      return players;
    } finally {
      await client.close();
    }
  },

  findOne: async (id) => {
    const client = getClient();
    try {
      await client.connect();
      const playersCollection = client.db("wayout").collection("players");
      const player = await playersCollection.findOne({ _id: new ObjectId(id) });
      return player;
    } finally {
      await client.close();
    }
  },
};

module.exports = Player;
