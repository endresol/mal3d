import whitelistAddresses from "./whitelist-limit.json" assert { type: "json" };
import { MerkleTree } from "merkletreejs";
import keccak256 from "keccak256";
import { ethers } from "ethers";

async function main() {
  console.log("whitelistAddresses", whitelistAddresses);
  const leafNodes = whitelistAddresses.map((addr) =>
    keccak256(
      ethers.utils.solidityPack(
        ["address", "uint256"],
        [addr.address, addr.limit]
      )
    )
  );
  const merkleTree = new MerkleTree(leafNodes, keccak256, { sortPairs: true });
  const rootHash = "0x" + merkleTree.getRoot().toString("hex");

  console.log("rootHash", rootHash);
}

main();
