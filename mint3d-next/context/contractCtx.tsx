import { createContext, useState, useCallback, ReactNode } from "react";
import useMAL3dContract from "@/hooks/useMAL3dContract";
import { useWeb3Context } from "@/context";
import { BigNumber, ethers } from "ethers";

interface ContractData {
  paused: boolean;
  tokenCount: number;
  price: BigNumber;
  phase: number;
  maxPerTx: number;
  maxPerWallet: number;
}

const defaultState: ContractData = {
  paused: true,
  tokenCount: 0,
  price: BigNumber.from(0),
  phase: 0,
  maxPerTx: 0,
  maxPerWallet: 0,
};

export interface ContractContextData {
  contract: ContractData | null | undefined;
  isLoading: boolean;
  fetchContractData: () => void;
}

export const contractContextDefaultValues: ContractContextData = {
  contract: defaultState,
  isLoading: false,
  fetchContractData: () => null,
};

export const ContractContext = createContext<ContractContextData>(
  contractContextDefaultValues
);

function useContractContextValue(): ContractContextData {
  const [contract, setContract] = useState<ContractData>();
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
        MAL3dContract.tokenCount(),
        MAL3dContract.maxMintAmountPerTx(),
        MAL3dContract.maxMintAmountPerWallet(),
        MAL3dContract.mintPhase(),
        MAL3dContract.cost(),
      ]);

      allPromise.then((values) => {
        _contract = {
          paused: values[0],
          tokenCount: values[1].toNumber(),
          maxPerTx: values[2].toNumber(),
          maxPerWallet: values[3].toNumber(),
          phase: values[4].toNumber(),
          price: values[5],
        };
        setContract(_contract);
      });
    } catch (err) {
      console.error("getContractStatus", err);
    } finally {
      setIsLoading(false);
    }
  }, [setContract, MAL3dContract]);

  return {
    contract,
    isLoading,
    fetchContractData,
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
