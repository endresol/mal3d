import { http, createConfig } from "wagmi";
import { sepolia } from "wagmi/chains";

import { injected, metaMask, safe, walletConnect } from 'wagmi/connectors';

const projectId = 'aa05c57bb029900be2fc78b619cd4558';

export const config = createConfig({
  chains: [sepolia],
  connectors: [
    injected(),
    walletConnect({ projectId }),
    metaMask(),
    safe(),
  ],
  transports: {
    [sepolia.id]: http(),
  },
});
