import optionsStorage from "../options-storage.js";

var paarEthAddress = "";

async function init() {
  // const options = await optionsStorage.getAll();

  // TODO: use external message to retrieve address
  setInterval(() => {
    if (paarEthAddress === "") {
      const ethAddress = document.getElementById("paarEthAddress").textContent;

      if (ethAddress) {
        paarEthAddress = ethAddress;
        optionsStorage.set({ text: paarEthAddress });
      }
    }
  }, 1000);
}

init();

// async function getCurrentTab() {
//   let queryOptions = { active: true, lastFocusedWindow: true };
//   // `tab` will either be a `tabs.Tab` instance or `undefined`.
//   let [tab] = await chrome.tabs.query(queryOptions);
//   return tab;
// }

// console.info("content script", chrome.runtime.connection);

// chrome.runtime.onConnect((request, sender, sendResponse) => {
//   console.info("on connect content");
// });

// chrome.runtime.onConnectExternal((request, sender, sendResponse) => {
//   console.info("on connect ext content");
// });

// chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
//   console.info("onMessage content ", request, sender, sendResponse);
// });

// chrome.runtime.onMessageExternal.addListener(function (
//   request,
//   sender,
//   sendResponse
// ) {
//   console.info("onMessageExternal ext content ", request, sender, sendResponse);
// });
