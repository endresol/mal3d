import { BigNumber, ethers } from "ethers";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import AnimatedButton from "./AnimatedButton";

import { useWeb3Context } from "../context";
import useMAL3dContract from "../hooks/useMAL3dContract";
import { useDiscountCard } from "@/hooks/useDiscountCard";
import Whitelist from "../helpers/whitelist";

import { toast } from "react-toastify";
import DiscountCard from "./DiscountCard";

import { useMinterContext } from "@/hooks/useMinterContext";

import { etherscanTransaction } from "@/helpers/toasts";

const RandomMint: React.FC = () => {
  const { address } = useWeb3Context();
  const { minter } = useMinterContext();
  const MAL3dContract = useMAL3dContract();

  const [canMint, setCanMint] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isPaused, setIsPaused] = useState<boolean>(true);

  const [tokenPrice, setTokenPrice] = useState<BigNumber>(
    BigNumber.from("60000000000000000")
  );
  const [discountPrice, setDiscountPrice] = useState<BigNumber>(
    BigNumber.from("0")
  );

  const [maxMintTx, setMaxMintTx] = useState<number>(10);
  const [mintAmount, setMintAmount] = useState<number>(0);
  const [isWhitelistMintEnabled, setIsWhitelistMintEnabled] =
    useState<boolean>(false);

  const mal3dContract = useMAL3dContract();
  const { passDiscount, passToken } = useDiscountCard();

  const handleChangeMintAmount = (value: number) => {
    const newAmount = mintAmount + value;
    if (newAmount >= 0 && newAmount <= maxMintTx)
      setMintAmount(mintAmount + value);
  };

  const handleMint = async () => {
    if (!mal3dContract) {
      toast.error("Contract not loaded. Reload page an try again.");
      return;
    }
    if (passDiscount > 0) {
      const totalprice = discountPrice.mul(mintAmount);
      const props = { value: totalprice };
      const tx = await mal3dContract.mintDiscount(mintAmount, passToken, props);
      toast.info(etherscanTransaction(tx.hash));
      await tx.wait();
      toast.success("Transaction completed");
    } else {
      const totalprice = tokenPrice.mul(mintAmount);
      const props = { value: totalprice };
      const hash = await mal3dContract.mint(mintAmount, props);
    }
  };

  useEffect(() => {
    if (!mal3dContract) return;
    let mounted = true;

    const getContractData = async () => {
      try {
        const _price = await mal3dContract.cost();
        const _maxMintTx = await mal3dContract.maxMintAmountPerTx();
        const _isPaused = await mal3dContract.paused();
        setTokenPrice(_price);
        setMaxMintTx(_maxMintTx);
        setIsPaused(_isPaused);
        console.log("here");

        const _discountPrice = _price.mul(100 - passDiscount).div(100);
        setDiscountPrice(_discountPrice);
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
  }, [address, mal3dContract, passDiscount]);

  return (
    <>
      <div className=' text-yellow-100'>
        Partner: {minter?.partnerCollection}
      </div>
      <div className=' text-yellow-100'>MerkleProof: {minter?.merkleProof}</div>
      {minter?.canMint ? (
        <>
          <div className='container mx-auto max-w-sm bg-white border rounded-lg p-1'>
            <div className='mx-auto w-full h-3/4'>
              <Image
                src='/moonie.gif'
                width='500'
                height='500'
                alt='Collection preview'
                priority={true}
              />
            </div>
          </div>
          <div className='text-white container mx-auto max-w-sm p-1'>
            <div className='text-xl'>
              <strong>Total price:</strong>{" "}
              {ethers.utils.formatEther(
                discountPrice
                  ? discountPrice.mul(mintAmount)
                  : tokenPrice.mul(mintAmount)
              )}{" "}
              ETH
            </div>

            <div className='flex justify-between mt-5'>
              <AnimatedButton handleClick={() => handleChangeMintAmount(-1)}>
                -
              </AnimatedButton>
              {/* TODO : fix AniBtn to take children in and fix onclick */}
              <div className='w-1/3'>
                <span className='text-xl font-bold'>{mintAmount}</span>
              </div>

              <AnimatedButton handleClick={() => handleChangeMintAmount(1)}>
                +
              </AnimatedButton>
            </div>
          </div>
          <div>
            <AnimatedButton handleClick={() => handleMint()}>
              Mint
            </AnimatedButton>
          </div>
        </>
      ) : (
        <div className='border-2 p-4 rounded-md shadow-md text-white text-lg'>
          {isPaused ? (
            <>
              The contract is <strong>paused</strong>.
            </>
          ) : (
            <>
              You are not included in the <strong>whitelist</strong>.
              <br />
              If you hold a token/NFT in any our partner collections listed to
              the left, a green circle should indicate this. Please select the
              partner collections you want to be associated with for this mint.
            </>
          )}
          <br />
          Please come back during the next phase!
        </div>
      )}
    </>
  );
};

export default RandomMint;