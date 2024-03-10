import whitelistAddresses from './whitelist.json' assert { type: "json" };
import { MerkleTree } from 'merkletreejs';
import keccak256 from 'keccak256';

async function main() {
  console.log('whitelistAddresses', whitelistAddresses);
  const leafNodes = whitelistAddresses.map(addr => keccak256(addr));
  const merkleTree = new MerkleTree(leafNodes, keccak256, { sortPairs: true });
  const rootHash = '0x' + merkleTree.getRoot().toString('hex');

  console.log('rootHash', rootHash);
}

main();
