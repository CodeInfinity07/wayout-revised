// db.js

const { MongoClient, ServerApiVersion } = require("mongodb");
const path = require("path");
const dotenv = require("dotenv").config({
  path: path.resolve(__dirname, "../../.env"),
});
const mongoURI = process.env.MONGO_URI;

let client;

function getClient() {
  if (!client) {
    client = new MongoClient(mongoURI, {
      serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
      },
    });
  }
  return client;
}

module.exports = { getClient };
