import { BigNumber } from "ethers";
import React, { useState, useEffect } from "react";
import { useWeb3Context } from "../context";
import useMAL3dContract from "../hooks/useMAL3dContract";
import useMoonStakingS2Contract from "@/hooks/useMoonStakingS2Contract";
import { useDiscountCard } from "@/hooks/useDiscountCard";
import AnimatedButton from "./AnimatedButton";

import ApeCard from "./ApeCard";
import Whitelist from "../helpers/whitelist";

export function extractIntegers(
  bigNumbers: BigNumber[] | null | undefined
): number[] {
  if (!bigNumbers) return [];
  return bigNumbers.map((bigNumber) => Number(bigNumber));
}

export function convertToBigNumber(
  myNumbers: number[] | null | undefined
): BigNumber[] {
  if (!myNumbers) return [];
  return myNumbers.map((number) => BigNumber.from(number));
}

const MintMatched: React.FC = () => {
  const { address } = useWeb3Context();
  const [unstakedApes, setUnstakedApes] = useState<number[]>([]);
  const [stakedApes, setStakedApes] = useState<number[]>([]);
  const [selectedApes, setSelectedApes] = useState<number[]>([]);
  const [mintPrice, setMintPrice] = useState<BigNumber | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const mal3dContract = useMAL3dContract();
  const malStakingContract = useMoonStakingS2Contract();

  const { passDiscount, passToken } = useDiscountCard();

  const [maxMintTx, setMaxMintTx] = useState<number>(3);

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

    if (passDiscount > 0 && mintPrice && mal3dContract) {
      const totalprice = mintPrice
        .mul(100 - passDiscount)
        .div(100)
        .mul(selectedApes.length);
      console.log(
        "discount price",
        totalprice.toString(),
        passToken?.toNumber()
      );
      console.log("apes", selectedApes);

      const props = { value: totalprice };
      const hash = await mal3dContract.matchedMintDicounted(
        convertToBigNumber(selectedApes),
        proof,
        passToken,
        props
      );

      setSelectedApes([]);
    } else {
      if (mintPrice && mal3dContract) {
        const totalprice = mintPrice.mul(selectedApes.length);

        const props = { value: totalprice };
        const hash = await mal3dContract.matchedMint(
          convertToBigNumber(selectedApes),
          proof,
          props
        );
        setSelectedApes([]);
      } else {
        console.error("Serious error on mint");
      }
    }
  };

  // // Fetch numbers from API
  useEffect(() => {
    async function fetchApiNumbers() {
      const response = await fetch(`/api/ape_nft/${address}`);
      const data = await response.json();
      setUnstakedApes(extractIntegers(data.nft_ids));
    }
    fetchApiNumbers();
  }, [address]);

  // Fetch numbers from contract
  useEffect(() => {
    if (!malStakingContract || !mal3dContract) return;
    let mounted = true;

    const getContractData = async () => {
      try {
        const stakedNFTs = await malStakingContract.getStakerNFT(address);
        console.log("getting staked nfts", stakedNFTs);

        const allstaked = stakedNFTs[0].concat(stakedNFTs[3]);
        setStakedApes(extractIntegers(allstaked));

        const _price = await mal3dContract.cost();
        setMintPrice(_price);

        const _maxMintTx = await mal3dContract.maxMintAmountPerTx();
        setMaxMintTx(_maxMintTx);
      } catch (err) {
        console.error("getContractStatus", err);
      }
    };

    if (mounted) {
      getContractData().then(() => {
        setIsLoading(false);
      });
    }

    return () => {
      mounted = false;
    };
  }, [address, malStakingContract, mal3dContract]);

  console.log("staked:", stakedApes);

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
        <AnimatedButton handleClick={handleMintClick}>Mint</AnimatedButton>
      ) : (
        <div className='text-white font-bold text-xl tracking-wider'>
          {" "}
          Sorry; your address is not verified for mint
        </div>
      )}
    </>
  );
};

export default MintMatched;
