import React, { useState, useEffect } from "react";
import {
  useMalstakingS2GetStakerNft,
  useMal3dMaxMintAmountPerTx,
  useMal3dCost,
  useMal3dMatchedMint,
} from "../generated";
import { useAccount } from "wagmi";
import ApeCard from "./ApeCard";

import Whitelist from "../lib/whitelist";

export function extractIntegers(
  bigNumbers: bitint[] | null | undefined
): number[] {
  return bigNumbers.map((bigNumber) => Number(bigNumber));
}

const MatchedMint: React.FC = () => {
  const { address } = useAccount();
  const [unstakedApes, setUnstakedApes] = useState<number[]>([]);
  const [stakedApes, setStakedApes] = useState<number[]>([]);
  const [selectedApes, setSelectedApes] = useState<number[]>([]);
  const { data: maxMintTx } = useMal3dMaxMintAmountPerTx({});
  const { data: mintPrice } = useMal3dCost({});

  const { data, write } = useMal3dMatchedMint();

  const handleApeClick = (imageId: number) => {
    const isSelected = selectedApes.includes(imageId);

    if (isSelected) {
      setSelectedApes(selectedApes.filter((id) => id !== imageId));
    } else {
      if (selectedApes.length < maxMintTx) {
        setSelectedApes([...selectedApes, imageId]);
      }
    }
  };

  const handleMintClick = async () => {
    console.log("handleMintClick", selectedApes);
    const proof = Whitelist.getProofForAddress(address);
    console.log("proof", proof);

    if (mintPrice) {
      const price = BigInt(mintPrice) * BigInt(selectedApes.length);

      const hash = await write({
        args: [selectedApes, proof],
        value: price,
      });

      console.log("matchedMint", hash);
      setSelectedApes([]);
      // TODO: Update UI to remove minted tokens
    }
  };

  // Fetch numbers from API
  useEffect(() => {
    async function fetchApiNumbers() {
      const response = await fetch(`/api/ape_nft/${address}`);
      const data = await response.json();
      setUnstakedApes(extractIntegers(data.nft_ids));
    }
    fetchApiNumbers();
  }, [address]);

  // Fetch numbers from contract
  const { data: getStakerNFT } = useMalstakingS2GetStakerNft({
    args: [address],
  });

  useEffect(() => {
    if (getStakerNFT) {
      const stakedTokens: number[] = getStakerNFT[0].concat(getStakerNFT[3]);
      setStakedApes(extractIntegers(stakedTokens));
    }
  }, [getStakerNFT, address]);

  return (
    <>
      <div className='number-list grid grid-cols-6 gap-2'>
        {[...stakedApes, ...unstakedApes].map((number) => (
          <div key={number} className='number-card'>
            <ApeCard
              id={number}
              isSelected={selectedApes.includes(number) ? true : false}
              onClick={handleApeClick}
            />
          </div>
        ))}
      </div>
      {Whitelist.contains(address) ? (
        <button
          onClick={handleMintClick}
          className='mt-4 bg-transparent text-white font-semibold text-lg tracking-wider hover:text-white py-2 px-4 border-2 border-purple-300 hover:border-purple-700 rounded'
        >
          Mint
        </button>
      ) : (
        <div className='text-white font-bold text-xl tracking-wider'>
          {" "}
          Sorry; your address is not verified for mint
        </div>
      )}
    </>
  );
};

export default MatchedMint;
