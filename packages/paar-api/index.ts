/* import moralis */
import "dotenv/config";
import Moralis from "moralis/node";

/* Moralis init code */
const serverUrl = process.env.SERVER_URL;
const appId = process.env.APP_ID;
const masterKey = process.env.MASTER_KEY;

const startServer = async () => {
  console.info("Moralis startServer", serverUrl, appId, masterKey);

  await Moralis.start({ serverUrl, appId, masterKey });
};

startServer();
