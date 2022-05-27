import React, { useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.scss";
import { useMoralis } from "react-moralis";

// const editorExtensionId = "fkpodhjdhmbnefledelfaahicomofcne";

// const connection = chrome.runtime.connect(editorExtensionId);

// const sendExtensionMessage = async (data: any) => {
//   console.info("send message...", data, connection);
//   // NOTE: chrome.runtime requires https

//   chrome.runtime.sendMessage(editorExtensionId, { data }, function (response) {
//     // if (!response.success) console.error(data, response);
//     console.info("sendExtensionMessage response", response);
//   });
// };

function App() {
  const {
    authenticate,
    isAuthenticated,
    isAuthenticating,
    isWeb3Enabled,
    enableWeb3,
    user,
    account,
    logout,
    Moralis,
  } = useMoralis();

  const address = user?.get("ethAddress");

  const [ethAddress, setEthAddress] = useState(null);

  useEffect(() => {
    if (address) {
      setEthAddress(address);
      // sendExtensionMessage({ ethAddress: address });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [address]);

  useEffect(() => {
    if (!isWeb3Enabled && isAuthenticated) {
      enableWeb3({ provider: "walletconnect" });
      console.info("web3 enabled");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isWeb3Enabled, isAuthenticated, enableWeb3]);

  const login = async () => {
    if (!isAuthenticated) {
      await authenticate({
        // signingMessage: "Log in using Moralis",
        provider: "walletconnect",
      })
        .then(function (user) {
          console.info("logged in user:", user);

          const address = user!.get("ethAddress");

          console.info("address", address);

          setEthAddress(address);
          // sendExtensionMessage({ ethAddress: address });
        })
        .catch(function (error) {
          console.error(error);
        });
    }
  };

  const logOut = async () => {
    await logout();
    setEthAddress(null);
    console.log("logged out");
  };

  return (
    <section className="bridgeConnect">
      <div className="bridgeConnectInner">
        <h1>paar bridge</h1>

        <div className="ethAddress">
          <div className="ethAddressInner">
            <span className="addressLabel">ETH Address</span>
            <span className="addressContent" id="paarEthAddress">
              {ethAddress}
            </span>
          </div>
        </div>

        <div className="connectControls">
          <div className="connectControlsInner">
            {isAuthenticated ? (
              <button
                className="button"
                onClick={logOut}
                disabled={isAuthenticating}
              >
                Logout
              </button>
            ) : (
              <button className="button" onClick={login}>
                Moralis Login
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export default App;
