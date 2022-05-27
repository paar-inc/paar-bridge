// const Moralis = require("moralis/node");

Moralis.Cloud.define("getEthTransactions", async (request) => {
  const ethAddress = request.params.ethAddress;

  // create query
  const query = new Moralis.Query("EthTransactions");
  query.equalTo("from_address", ethAddress);

  // run query
  const results = await query.find();

  console.log("transactions:", results);

  return results;
});
