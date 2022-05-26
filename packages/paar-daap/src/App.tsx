import React, { useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.scss";
import { useMoralis } from "react-moralis";
// import Web3Provider from "@walletconnect/web3-provider";

function App() {
  const [ethAddress, setEthAddress] = useState(null);
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

  useEffect(() => {
    if (!isWeb3Enabled && isAuthenticated) {
      enableWeb3({ provider: "walletconnect" });
      console.info("web3 enabled");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isWeb3Enabled, isAuthenticated, enableWeb3]);

  useEffect(() => {
    if (address) {
      setEthAddress(address);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [address]);

  const login = async () => {
    // const user = await Moralis.authenticate({ provider: "walletconnect" });
    // console.info("user", user);
    // const chainId = await Moralis.chainId;
    // console.log("chainId", chainId);

    if (!isAuthenticated) {
      await authenticate({
        // signingMessage: "Log in using Moralis",
        provider: "walletconnect",
        // chainId: 56,
        // mobileLinks: [
        //   "rainbow",
        //   "metamask",
        //   "argent",
        //   "trust",
        //   "imtoken",
        //   "pillar",
        // ],
      })
        .then(function (user) {
          console.log("logged in user:", user);

          const address = user!.get("ethAddress");

          console.log(address);
          setEthAddress(address);
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  };

  const logOut = async () => {
    await logout();
    console.log("logged out");
  };

  return (
    <section className="bridgeConnect">
      <div className="bridgeConnectInner">
        <h1>paar bridge</h1>

        <div className="ethAddress">
          <div className="ethAddressInner">
            <span className="addressLabel">ETH Address</span>
            <span className="addressContent">{ethAddress}</span>
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
