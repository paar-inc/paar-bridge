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

  getTransactions(address) {
    console.info("getTransactions", this.ethAddress);

    if (this.ethAddress) {
      // TODO: call api
    }
  }
}

async function init() {
  const storedOptions = await optionsStorage.getAll();
  const ethAddress = storedOptions.text;

  console.info("popup content", ethAddress, storedOptions);

  document.getElementById("popupEthAddress").textContent = ethAddress;

  const apiClient = new APIClient(ethAddress);

  document.getElementById("getTransactions").onclick =
    apiClient.getTransactions();
}

init();
