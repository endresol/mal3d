import { BigNumber, ethers } from "ethers";

import React, { useState, useEffect, useMemo } from "react";
import useMAL3dContract from "../hooks/useMAL3dContract";
import { useWeb3Context } from "../context";
import { getStatusFromPhase } from "@/helpers";

import DiscountCard from "./DiscountCard";
import { useMinterContext } from "@/hooks/useMinterContext";
import { useContractContext } from "@/hooks/useContractContext";

const ContractStatus: React.FC = () => {
  const { address } = useWeb3Context();
  const MAL3dContract = useMAL3dContract();
  const { minter } = useMinterContext();
  const { contract } = useContractContext();

  const [discountPrice, setDiscountPrice] = useState<BigNumber>(
    ethers.utils.parseEther("1")
  );

  useEffect(() => {
    if (contract && minter) {
      const newPrice = contract.price
        .mul(100 - minter.discountPercent)
        .div(100);
      setDiscountPrice(newPrice);
    }
  }, [contract, minter]);

  const [isSaleOpen, setIsSaleOpen] = useState<boolean>(true);

  const [isLoading, setIsLoading] = useState<boolean>(false);

  if (isLoading)
    return <div className='text-lg font-medium text-white'> Loading ... </div>;

  return (
    <div className='border-2 p-4 rounded-md shadow-md text-white'>
      <div className={`flex flex-col gap-4 text-lg font-medium`}>
        <div>
          <div className=''>Supply</div>
          <div className='text-xl font-bold'>
            {contract?.tokenCount?.toString()}/
            {contract?.totalSupply.toString()}
          </div>
        </div>

        <div>
          <div className=''>Sale Status</div>
          <div className='text-xl font-bold'>
            {isSaleOpen ? (
              <>
                {contract?.paused
                  ? "Paused"
                  : `${getStatusFromPhase(contract ? contract.phase : 0)}`}
              </>
            ) : (
              <span>Closed</span>
            )}
          </div>
        </div>

        {isSaleOpen && contract && (
          <>
            <div>
              <div> Limits </div>
              <div className='text-sm font-medium'>
                {`${contract?.maxPerTx} per transaction`}
                <br />
                {`${contract?.maxPerWallet} per wallet`}
              </div>
            </div>
            <div>
              <div> Price </div>
              <div
                className={`text-sm font-medium ${
                  contract.price.gt(discountPrice) && "line-through"
                }`}
              >
                {`${ethers.utils.formatEther(contract.price)} ETH`}
              </div>
              <div className='text-sm font-medium'>
                {contract.price.gt(discountPrice)
                  ? `${ethers.utils.formatEther(discountPrice)} ETH`
                  : ""}
              </div>
            </div>
            <div className='mx-auto'>
              <DiscountCard value={minter?.discountPercent ?? 0} />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ContractStatus;
