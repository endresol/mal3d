import { BigNumber, ethers } from "ethers";
import React, { useState, useEffect } from "react";
import { useWeb3Context } from "../context";
import useMAL3dContract from "../hooks/useMAL3dContract";
import useMoonStakingS2Contract from "@/hooks/useMoonStakingS2Contract";
import { useDiscountCard } from "@/hooks/useDiscountCard";
import { useMinterContext } from "@/hooks/useMinterContext";
import { useContractContext } from "@/hooks/useContractContext";
import AnimatedButton from "./AnimatedButton";
import { toast } from "react-toastify";
import { etherscanTransaction } from "@/helpers/toasts";

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

  const { minter } = useMinterContext();
  const { contract } = useContractContext();

  const [mintPrice, setMintPrice] = useState<BigNumber>(BigNumber.from(0));
  const [discountPrice, setDiscountPrice] = useState<BigNumber>(
    BigNumber.from(0)
  );

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [totalprice, setTotalprice] = useState<BigNumber>(BigNumber.from(0));

  const mal3dContract = useMAL3dContract();
  const malStakingContract = useMoonStakingS2Contract();

  useEffect(() => {
    if (contract && minter) {
      const newPrice = contract.price
        .mul(100 - minter.discountPercent)
        .div(100);
      setDiscountPrice(newPrice);
    }
  }, [contract, minter]);

  const { passDiscount, passToken } = useDiscountCard();
  const [maxMintTx, setMaxMintTx] = useState<number>(3);

  const handleApeClick = (imageId: number) => {
    const isSelected = selectedApes.includes(imageId);

    if (isSelected) {
      setSelectedApes(selectedApes.filter((id) => id !== imageId));
      setTotalprice(
        totalprice?.sub(discountPrice.gt(0) ? discountPrice : mintPrice)
      );
    } else {
      if (selectedApes.length < maxMintTx) {
        setSelectedApes([...selectedApes, imageId]);
        setTotalprice(
          totalprice?.add(discountPrice.gt(0) ? discountPrice : mintPrice)
        );
      }
    }
  };

  const handleMintClick = async () => {
    if (selectedApes.length === 0) {
      toast.error("Please select ape(s) to mint");
      return;
    }

    console.log("handleMintClick", selectedApes);
    const proof = Whitelist.getProofForAddress(address);

    console.log("proof", proof);

    if (mintPrice && mal3dContract) {
      console.log("phase is", contract.phase);

      if (contract.phase == 3) {
        console.log("inside phase 3");
        const tx = await mal3dContract.transactionLimitedMatchedMint(
          convertToBigNumber(selectedApes),
          proof
        );
        toast.info(etherscanTransaction(tx.hash));
        setSelectedApes([]);
        await tx.wait();
        toast.success("Transaction completed");
      } else if (contract.phase == 4) {
        console.log("inside phase 4");

        const tx = await mal3dContract.walletLimitedMatchedMint(
          convertToBigNumber(selectedApes),
          proof
        );
        toast.info(etherscanTransaction(tx.hash));
        setSelectedApes([]);
        await tx.wait();
        toast.success("Transaction completed");
      } else if (
        contract.phase == 1 ||
        contract.phase == 2 ||
        contract.phase == 5
      ) {
        console.log("inside phase 1-2-5");

        if (passDiscount > 0) {
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
          const tx = await mal3dContract.matchedMintDicounted(
            convertToBigNumber(selectedApes),
            proof,
            passToken,
            props
          );
          toast.info(etherscanTransaction(tx.hash));
          setSelectedApes([]);
          await tx.wait();
          toast.success("Transaction completed");
        } else {
          if (mintPrice && mal3dContract) {
            const totalprice = mintPrice.mul(selectedApes.length);

            const props = { value: totalprice };
            const tx = await mal3dContract.matchedMint(
              convertToBigNumber(selectedApes),
              proof,
              props
            );
            toast.info(etherscanTransaction(tx.hash));
            setSelectedApes([]);
            await tx.wait();
            toast.success("Transaction completed");
          } else {
            console.error("Serious error on mint");
          }
        }
      }
      console.log("after");
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

  console.log("minterCtx:", minter);
  return (
    <>
      <div className='pl-5 pr-5'>
        <div className='text-left'>
          <h3 className='inline text-xl'>Your Moon Apes:</h3>(select the once
          you want to mint)
        </div>
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
        {minter?.canMint ? (
          <div className='mt-4 text-white'>
            <div>Total mint price: {ethers.utils.formatEther(totalprice)}</div>
            <AnimatedButton
              handleClick={handleMintClick}
              isPaused={contract.paused}
            >
              Mint
            </AnimatedButton>
          </div>
        ) : (
          <div className='text-white font-bold text-xl tracking-wider'>
            {" "}
            Sorry; your address is not verified for mint
          </div>
        )}
      </div>
    </>
  );
};

export default MintMatched;
