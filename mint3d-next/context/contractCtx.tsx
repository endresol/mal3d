import { createContext, useState, useCallback, ReactNode } from "react";
import useMAL3dContract from "@/hooks/useMAL3dContract";
import { useWeb3Context } from "@/context";
import { BigNumber } from "ethers";

interface ContractData {
  paused: boolean;
  tokenCount: number;
  price: BigNumber | null;
  phase: number;
  maxPerTx: number;
  maxPerWallet: number;
}

export interface ContractContextData {
  contract: ContractData | null | undefined;
  isLoading: boolean;
  fetchContractData: () => void;
}

export const contractContextDefaultValues: ContractContextData = {
  contract: null,
  isLoading: false,
  fetchContractData: () => null,
};

export const ContractContext = createContext<ContractContextData>(
  contractContextDefaultValues
);

function useContractContextValue(): ContractContextData {
  const [contract, setContract] = useState<ContractData>();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const fetchContractData = useCallback(() => {
    console.log("fectchContractData");

    setIsLoading(true);
    const data: ContractData = {
      paused: false,
      tokenCount: 0,
      price: BigNumber.from(0.05),
      phase: 0,
      maxPerTx: 0,
      maxPerWallet: 0,
    };
    setContract(data);
    setIsLoading(false);
  }, [setContract]);

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
