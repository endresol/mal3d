import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

import { Buffer } from "buffer";

import { configureChains, createConfig, WagmiConfig } from "wagmi";
import { sepolia } from "viem/chains";
// import { config } from "./config.ts";

globalThis.Buffer = Buffer;

import "@rainbow-me/rainbowkit/styles.css";
import { RainbowKitProvider, getDefaultWallets } from "@rainbow-me/rainbowkit";

// import { createConfig, http } from "wagmi";

// // need to see if we can configure our own node here or infura
import { infuraProvider } from "wagmi/providers/infura";
import { publicProvider } from "wagmi/providers/public";

const { chains, publicClient } = configureChains(
  [sepolia],
  [
    infuraProvider({ apiKey: "9584f3a3ca404c0e9a6850325b48d99d" }),
    publicProvider(),
  ]
);

const { connectors } = getDefaultWallets({
  appName: "Moon Ape Lab",
  projectId: "aa05c57bb029900be2fc78b619cd4558",
  chains,
});

const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <WagmiConfig config={wagmiConfig}>
      <RainbowKitProvider chains={chains}>
        <App />
      </RainbowKitProvider>
    </WagmiConfig>
  </React.StrictMode>
);
