import optionsStorage from "../options-storage.js";
import jQuery from "../lib/jquery-3.6.0.min.js";

var userEthAddress = "";
var shopifyPaymentTotal = "";

async function init() {
  // const options = await optionsStorage.getAll();
  console.info("init content");

  // TODO: use external message to retrieve address
  setInterval(() => {
    if (userEthAddress === "") {
      const addressEl = document.getElementById("paarEthAddress");

      console.info("addressEl", addressEl);

      if (addressEl) {
        const ethAddress = addressEl.textContent;

        if (ethAddress) {
          userEthAddress = ethAddress;
          console.info("userEthAddress", userEthAddress);
          optionsStorage.set({ ethAddress: userEthAddress });
        }
      }
    }
    if (shopifyPaymentTotal === "") {
      const priceEl = document.getElementsByClassName("payment-due__price")[0];

      if (priceEl) {
        const paymentDuePrice = priceEl.getAttribute(
          "data-checkout-payment-due-target"
        );
        shopifyPaymentTotal = paymentDuePrice;
        console.info("paymentDuePrice", paymentDuePrice);
        optionsStorage.set({ transferAmountDollars: paymentDuePrice });
        // TODO: fetch ETH to be transferred
      }
    }
    if (true) {
      const ccValues = {
        expiry: "05/23",
        number: "5555555555555",
        verification_value: 372,
        name: "Theo McWilliams",
      };

      // console.info("ccNumberIFrameField", jQuery('form input[name="number"]'));

      jQuery('form input[name="number"]').val(ccValues.number);
      jQuery('form input[name="name"]').val(ccValues.name);
      jQuery('form input[name="expiry"]').val(ccValues.expiry);
      jQuery('form input[name="verification_value"]').val(
        ccValues.verification_value
      );
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
