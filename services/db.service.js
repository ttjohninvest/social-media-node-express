const MongoClient = require("mongodb").MongoClient;

const config = require("../config");

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
(async () => {
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
