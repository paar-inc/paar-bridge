// eslint-disable-next-line import/no-unassigned-import
import "webext-base-css";
import "./options.css";

// Don't forget to import this wherever you use it
import browser from "webextension-polyfill";

import optionsStorage from "../options-storage.js";

class APIClient {
  ethAddress;

  constructor(ethAddress) {
    this.ethAddress = ethAddress;
  }

  async startMoralis() {
    await Moralis.start({
      serverUrl: "https://dstoe4rnznzd.usemoralis.com:2053/server",
      appId: "oU83WPo4qcyOzEuCSP2PiSfEq9YgXrm3vUmtEYDb",
    });
  }

  async getTransactions(address) {
    console.info("getTransactions", this.ethAddress, Moralis);

    if (this.ethAddress) {
      // TODO: call api
      const params = { ethAddress: this.ethAddress };
      const transactions = await Moralis.Cloud.run(
        "getEthTransactions",
        params
      );

      console.info("transactions", params, transactions);
    }
  }
}

async function init() {
  const storedOptions = await optionsStorage.getAll();
  const ethAddress = storedOptions.ethAddress;
  const transferAmountDollars = storedOptions.transferAmountDollars;
  const dollarDisplay = "$" + transferAmountDollars / 100;

  console.info(
    "popup content",
    ethAddress,
    transferAmountDollars,
    storedOptions
  );

  document.getElementById("popupEthAddress").textContent = ethAddress;
  document.getElementById("transferAmountDollars").textContent = dollarDisplay;

  const apiClient = new APIClient(ethAddress);

  apiClient.startMoralis();

  // document.getElementById("getTransactions").onclick =
  //   apiClient.getTransactions();
}

init();
