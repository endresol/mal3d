import { createContext, useState, useCallback, ReactNode } from "react";
import useMAL3dContract from "@/hooks/useMAL3dContract";
import { useWeb3Context } from "@/context";
import { BigNumber, ethers } from "ethers";

interface ContractData {
  paused: boolean;
  tokenCount: number;
  totalSupply: number;
  price: BigNumber;
  phase: number;
  maxPerTx: number;
  maxPerWallet: number;
}

const defaultState: ContractData = {
  paused: true,
  tokenCount: 0,
  totalSupply: 0,
  price: BigNumber.from(0),
  phase: 0,
  maxPerTx: 0,
  maxPerWallet: 0,
};

export interface ContractContextData {
  contract: ContractData;
  isLoading: boolean;
  fetchContractData: () => void;
  getDiscountedPrice: (discount: number) => BigNumber;
}

export const contractContextDefaultValues: ContractContextData = {
  contract: defaultState,
  isLoading: false,
  fetchContractData: () => null,
  getDiscountedPrice: (price: number) => BigNumber.from(0),
};

export const ContractContext = createContext<ContractContextData>(
  contractContextDefaultValues
);

function useContractContextValue(): ContractContextData {
  const [contract, setContract] = useState<ContractData>(defaultState);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const MAL3dContract = useMAL3dContract();

  const fetchContractData = useCallback(() => {
    console.log("fectchContractData");

    if (!MAL3dContract) return;
    setIsLoading(true);

    let _contract;
    try {
      const allPromise = Promise.all([
        MAL3dContract.paused(),
        MAL3dContract.totalSupply(),
        MAL3dContract.maxSupply(),
        MAL3dContract.maxMintAmountPerTx(),
        MAL3dContract.maxMintAmountPerWallet(),
        MAL3dContract.mintPhase(),
        MAL3dContract.cost(),
      ]);

      allPromise.then((values) => {
        _contract = {
          paused: values[0],
          tokenCount: values[1].toNumber(),
          totalSupply: values[2].toNumber(),
          maxPerTx: values[3].toNumber(),
          maxPerWallet: values[4].toNumber(),
          phase: values[5].toNumber(),
          price: values[6],
        };
        setContract(_contract);
      });
    } catch (err) {
      console.error("getContractStatus", err);
    } finally {
      setIsLoading(false);
    }
  }, [setContract, MAL3dContract]);

  function getDiscountedPrice(discount: number): BigNumber {
    const _discountPrice = contract.price.mul(100 - discount).div(100);
    return _discountPrice;
  }

  return {
    contract,
    isLoading,
    fetchContractData,
    getDiscountedPrice,
  };
}

export const ContractContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const contractContextValue = useContractContextValue();
  return (
    <ContractContext.Provider value={contractContextValue}>
      {children}
    </ContractContext.Provider>
  );
};
