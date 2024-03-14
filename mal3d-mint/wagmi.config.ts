import { defineConfig } from "@wagmi/cli";
import { etherscan, react } from "@wagmi/cli/plugins";
import { sepolia } from "wagmi/chains";

export default defineConfig({
  out: 'src/generated.ts',
  contracts: [],
  plugins: [
    etherscan({
      apiKey: "P7B1K4W9H8U6AXFHC6QIH4P9PBT6K1TU95",
      chainId: sepolia.id,
      contracts: [
        {
          name: "mal3d",
          address: {
            [sepolia.id]: "0xbB4F46A8B194b9BfF013536Ff03B10F8D984c993",
          },
        },
        {
          name: "malog",
          address: {
            [sepolia.id]: "0x0082F3387365e414512f06c4a587BbdC553c5049",
          },
        },
        {
          name: "malpass",
          address: {
            [sepolia.id]: "0x8344BE53FB250dd76E65B6721B6553C21053Ee8d",
          },
        },
        {
          name: "malstaking",
          address: {
            [sepolia.id]: "0xD78466a0F030Dd8D95CfFe33F867e436Ef5DC167",
          }
        },
        {
          name: "malstakingS2",
          address: {
            [sepolia.id]: "0x8d10861Cd2BddE665110eAF12Dd0490215F30eE6",
          }
        },
      ],
    }),
    react(),
  ],
})
