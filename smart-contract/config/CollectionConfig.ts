import CollectionConfigInterface from "../lib/CollectionConfigInterface";
import * as Networks from "../lib/Networks";
import * as Marketplaces from "../lib/Marketplaces";
import whitelistAddresses from "./whitelist.json";

const CollectionConfig: CollectionConfigInterface = {
  testnet: Networks.ethereumSepoliaTestnet,
  mainnet: Networks.ethereumMainnet,
  contractName: "MoonApeLab3D",
  tokenName: "Moon Ape Lab 3D",
  tokenSymbol: "MAL3D",
  hiddenMetadataUri: "https://api.moonapelab.io/mal3d/hidden.json",
  maxSupply: 80,
  whitelistSale: {
    price: 0.0005,
    maxMintAmountPerTx: 1,
  },
  preSale: {
    price: 0.0007,
    maxMintAmountPerTx: 2,
  },
  publicSale: {
    price: 0.0009,
    maxMintAmountPerTx: 5,
  },
  contractAddress: "0xFa2f7083e8Af1bFFD08Ec5D02F37F5ca32C53768",
  marketplaceIdentifier: "moon-ape-lab-3d",
  marketplaceConfig: Marketplaces.openSea,
  whitelistAddresses,
};

export default CollectionConfig;
