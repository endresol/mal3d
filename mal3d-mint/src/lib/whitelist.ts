import whitelistAddresses from '../../scripts/whitelist.json';
import { MerkleTree } from 'merkletreejs';
import keccak256 from 'keccak256';
import {Buffer} from 'buffer/index.js';

export default new class Whitelist {
  private merkleTree!: MerkleTree;

  private getMerkleTree(): MerkleTree
  {
    if (this.merkleTree === undefined) {
      const leafNodes = whitelistAddresses.map(addr => keccak256(addr));
      console.log(leafNodes);
      this.merkleTree = new MerkleTree(leafNodes, keccak256, { sortPairs: true });
      console.log(this.merkleTree);
    }

    return this.merkleTree;
  }

  public getProofForAddress(address: string): string[]
  {
    return this.getMerkleTree().getHexProof(keccak256(address));
  }

  public getRawProofForAddress(address: string): string
  {
    return this.getProofForAddress(address).toString().replaceAll('\'', '').replaceAll(' ', '');
  }

  public contains(address: string): boolean
  {
    return this.getMerkleTree().getLeafIndex(Buffer.from(keccak256(address))) >= 0;
  }
};