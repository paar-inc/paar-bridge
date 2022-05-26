import React, { useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import { useMoralis } from "react-moralis";

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

  useEffect(() => {
    if (!isWeb3Enabled && isAuthenticated) {
      enableWeb3({ provider: "walletconnect" });
      console.info("web3 enabled");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isWeb3Enabled, isAuthenticated, enableWeb3]);

  const login = async () => {
    const chainId = await Moralis.chainId;
    console.log("chainId", chainId);

    if (!isAuthenticated) {
      await authenticate({
        // signingMessage: "Log in using Moralis",
        provider: "walletconnect",
        chainId: 56,
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
    <div>
      <h1>Moralis!</h1>

      <div>
        <span>ETH Address: {ethAddress}</span>
      </div>

      <button onClick={login}>Moralis Login</button>
      <button onClick={logOut} disabled={isAuthenticating}>
        Logout
      </button>
    </div>
  );
}

export default App;
