import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App.js";
import reportWebVitals from "./reportWebVitals.js";
import { ThirdwebProvider, coinbaseWallet, embeddedWallet, metamaskWallet, phantomWallet, rainbowWallet, trustWallet, walletConnect, zerionWallet } from "@thirdweb-dev/react";
import "scss/styles.scss";
// This is the chain your dApp will work on.
// Change this to the chain your app is built for.
// You can also import additional chains from `@thirdweb-dev/chains` and pass them directly.
const activeChain = "binance-testnet";

const container = document.getElementById("root");
const root = createRoot(container);
root.render(
  // <React.StrictMode>
  <ThirdwebProvider
    activeChain={activeChain}
    clientId={process.env.REACT_APP_CLIENT_ID}
    supportedWallets={[
      coinbaseWallet(),
      metamaskWallet({
        recommended: true,
      }),
      walletConnect(),
      trustWallet(),
      zerionWallet(),
      rainbowWallet(),
      phantomWallet(),
      embeddedWallet(
      {
        auth:{
          options: [
            "email",
            "google",
            "facebook",
          ]
        }
      }
      )
    ]}
  >

    <App />
  </ThirdwebProvider>
  // </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
