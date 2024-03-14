import React, { useState } from "react";
import {
  useMal3dPaused,
  useMal3dTotalSupply,
  useMal3dMaxSupply,
  useMal3dMintPhase,
  useMal3dMaxMintAmountPerTx,
  useMal3dMaxMintAmountPerWallet,
  useMal3dCost,
} from "../generated";

import DiscountCard from "./DiscountCard";

import { formatEther } from "viem";

import { getStatusFromPhase } from "../lib/stringfunctions";

const CollectionStatus: React.FC = () => {
  const { data: isPaused } = useMal3dPaused({});
  const { data: mintPhase } = useMal3dMintPhase({});
  const { data: totalSupply } = useMal3dTotalSupply({});
  const { data: maxSupply } = useMal3dMaxSupply({});
  const { data: maxMintTx } = useMal3dMaxMintAmountPerTx({});
  const { data: maxMintWallet } = useMal3dMaxMintAmountPerWallet({});
  const { data: cost } = useMal3dCost({});

  console.log("cost", cost);
  // const [isPaused, setIsPaused] = useState(paused);

  const isSoldOut = totalSupply >= maxSupply;

  const isSaleOpen = (): boolean => {
    return mintPhase > 0 && !isPaused && !isSoldOut;
  };

  return (
    <div className='border-2 p-4 rounded-md shadow-md'>
      <div className={`flex flex-col gap-4 text-lg font-medium text-white`}>
        <div>
          <div className=''>Supply</div>
          <div className='text-xl font-bold'>
            {totalSupply?.toString()}/{maxSupply?.toString()}
          </div>
        </div>

        <div>
          <div className=''>Sale Status</div>

          <div className='text-xl font-bold'>
            {isSaleOpen() ? getStatusFromPhase(Number(mintPhase)) : "Closed"}
          </div>
        </div>

        {isSaleOpen() && (
          <>
            <div>
              <div> Limits </div>
              <div className='text-sm font-medium text-white'>
                {`${maxMintTx} per transaction`}
                <br />
                {`${maxMintWallet} per wallet`}
              </div>
            </div>
            <div>
              <div> Price </div>
              <div className='text-sm font-medium text-white'>
                {`${formatEther(cost)} ETH`}
              </div>
            </div>
            <div>
              <DiscountCard color='blue' />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default CollectionStatus;
