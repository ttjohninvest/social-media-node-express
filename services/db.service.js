const MongoClient = require("mongodb").MongoClient;

const config = require("../config");
const logger = require("../services/logger.service");

module.exports = {
  getCollection,
};

// Database Name - enter your db
const dbName = "social_network_db";

var dbConn = null;

async function getCollection(collectionName) {
  try {
    const db = await connect();
    const collection = await db.collection(collectionName);
    return collection;
  } catch (err) {
    logger.error("Failed to get Mongo collection", err);
    throw err;
  }
}

async function connect() {
  if (dbConn) return dbConn;
  try {
    const client = await MongoClient.connect(config.dbURL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    const db = client.db(dbName);
    dbConn = db;
    console.log("Connected to database");

    return db;
  } catch (err) {
    logger.error("Cannot Connect to DB", err);
    throw err;
  }
}

const collectionsToEnsure = ["user", "post", "activity", "chat"];
// eslint-disable-next-line no-undef
(async () => {
  await ensureDatabaseExists();
  await ensureCollectionsExist();
})();
async function ensureCollectionsExist(collections = collectionsToEnsure) {
  try {
    const client = await MongoClient.connect(config.dbURL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    const db = client.db(dbName);

    const existingCollections = await db.listCollections().toArray();
    const existingCollectionNames = existingCollections.map((col) => col.name);

    for (const collection of collections) {
      if (!existingCollectionNames.includes(collection)) {
        console.log(
          `Collection "${collection}" does not exist. Creating it...`
        );
        await db.createCollection(collection);
        console.log(`Collection "${collection}" created.`);
      } else {
        console.log(`Collection "${collection}" already exists.`);
      }
    }
  } catch (err) {
    console.error("Error:", err);
  }
}

async function ensureDatabaseExists(dbName = "social_network_db") {
  try {
    const client = await MongoClient.connect(config.dbURL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    const adminDb = client.db().admin();
    const databases = await adminDb.listDatabases();

    const dbExists = databases.databases.some((db) => db.name === dbName);

    if (dbExists) {
      console.log(`Database "${dbName}" already exists.`);
    } else {
      console.log(`Database "${dbName}" does not exist. Creating it now...`);
      await client?.db(dbName).collection("temp").insertOne({ temp: true });
      console.log(`Database "${dbName}" created.`);
    }
  } catch (err) {
    console.error("Error ensuring database exists:", err);
  }
}
