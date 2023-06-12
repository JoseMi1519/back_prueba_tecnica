require("dotenv").config();
const MongoClient = require("mongodb").MongoClient;
const URL = process.env.DB_URL;
const databaseName = process.env.DB_NAME;

var DbConnection = function () {
  var client = null;

  async function DbConnect() {
    try {
      console.log("DB Connect");
      var _client = new MongoClient(URL, { useUnifiedTopology: true });
      await _client.connect();
      //let _db = await MongoClient.connect(URL);

      return _client;
    } catch (e) {
      console.log("ERRROR: ", e);

      return null;
    }
  }

  async function Get() {
    try {
      if (client != null) {
        return client.db(databaseName);
      } else {
        client = await DbConnect();

        return client.db(databaseName);
      }
    } catch (e) {
      return e;
    }
  }

  async function GetClient() {
    try {
      if (client != null) {
        return client;
      } else {
        client = await DbConnect();

        return client;
      }
    } catch (e) {
      return e;
    }
  }

  async function ConnectToOld() {
    try {
      if (client != null) {
        return client.db("apache");
      } else {
        client = await DbConnect();

        return client.db("apache");
      }
    } catch (e) {
      return e;
    }
  }

  return {
    GetConection: Get,
    GetClient: GetClient,
    ConnectToOld: ConnectToOld,
  };
};

module.exports = DbConnection
