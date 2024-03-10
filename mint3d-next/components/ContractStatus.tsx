import { BigNumber, ethers } from "ethers";

import React, { useState, useEffect } from "react";
import useMAL3dContract from "../hooks/useMAL3dContract";
import { useWeb3Context } from "../context";
import { getStatusFromPhase } from "@/helpers";

import DiscountCard from "./DiscountCard";
import { useMinterContext } from "@/hooks/useMinterContext";
import { useContractContext } from "@/hooks/useContractContext";

const ContractInfoObject = {
  isPause: true,
  tokenCount: 0,
  maxMintTx: 0,
  maxMintWallet: 0,
  mintPhase: 0,
  mintPrice: 0,
};

const ContractStatus: React.FC = () => {
  const { address } = useWeb3Context();
  const MAL3dContract = useMAL3dContract();
  const { minter } = useMinterContext();

  const [contractInfo, setContractInfo] = useState<ContractInfoObject>();

  const [discountPrice, setDiscountPrice] = useState<BigNumber>(
    BigNumber.from(0)
  );

  const [isSaleOpen, setIsSaleOpen] = useState<boolean>(false);

  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    console.log("effect", MAL3dContract, address);

    if (!MAL3dContract) return;
    let mounted = true;

    const getContractStatus = async () => {
      let contract = contractInfo;
      try {
        const allPromise = Promise.all([
          MAL3dContract.paused(),
          MAL3dContract.tokenCount(),
          MAL3dContract.maxMintAmountPerTx(),
          MAL3dContract.maxMintAmountPerWallet(),
          MAL3dContract.mintPhase(),
          MAL3dContract.cost(),
        ]);

        allPromise.then((values) => {
          contract = {
            isPause: values[0],
            tokenCount: values[1],
            maxMintTx: values[2],
            maxMintWallet: values[3],
            mintPhase: values[4],
            mintPrice: values[5],
          };
          setContractInfo((prev) => contract);

          console.log("is Paused", contract.isPause);

          setIsSaleOpen(
            contract.mintPhase.gt(0) && contract.tokenCount?.lt(8000)
          );
          console.log("open?", isSaleOpen);

          const _discountPrice = contract.mintPrice
            .mul(100 - minter.discountPercent)
            .div(100);
          setDiscountPrice(_discountPrice);

          console.log("discountPrice in useEffect", discountPrice.toString());
        });
      } catch (err) {
        console.error("getContractStatus", err);
      }
    };

    if (mounted) {
      getContractStatus().then(() => {
        setIsLoading(false);
      });
    }

    return () => {
      mounted = false;
    };
  }, [address, MAL3dContract, minter]);

  if (isLoading)
    return <div className='text-lg font-medium text-white'> Loading ... </div>;

  return (
    <div className='border-2 p-4 rounded-md shadow-md text-white'>
      <div className={`flex flex-col gap-4 text-lg font-medium`}>
        <div>
          <div className=''>Supply</div>
          <div className='text-xl font-bold'>
            {contractInfo?.tokenCount?.toString()}/80(00)
          </div>
        </div>

        <div>
          <div className=''>Sale Status</div>
          <div className='text-xl font-bold'>
            {isSaleOpen ? (
              <>
                {contractInfo.isPaused
                  ? "Paused"
                  : `${getStatusFromPhase(contractInfo.mintPhase.toNumber())}`}
              </>
            ) : (
              <span>Closed</span>
            )}
          </div>
        </div>

        {isSaleOpen && (
          <>
            <div>
              <div> Limits </div>
              <div className='text-sm font-medium'>
                {`${contractInfo.maxMintTx} per transaction`}
                <br />
                {`${contractInfo.maxMintWallet} per wallet`}
              </div>
            </div>
            <div>
              <div> Price </div>
              <div
                className={`text-sm font-medium ${
                  contractInfo.mintPrice > discountPrice && "line-through"
                }`}
              >
                {`${ethers.utils.formatEther(contractInfo.mintPrice)} ETH`}
              </div>
              <div className='text-sm font-medium'>
                {contractInfo.mintPrice.gt(discountPrice)
                  ? `${ethers.utils.formatEther(discountPrice)} ETH`
                  : ""}
              </div>
            </div>
            <div className='mx-auto'>
              <DiscountCard value={minter.discountPercent} />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ContractStatus;
