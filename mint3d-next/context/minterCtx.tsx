import { createContext, useState, useCallback, ReactNode } from "react";
import useMAL3dContract from "@/hooks/useMAL3dContract";
import { useDiscountCard } from "@/hooks/useDiscountCard";

import { useWeb3Context } from "@/context";
import { BigNumber } from "ethers";

interface MinterData {
  partnerCollection: string;
  discountCard: BigNumber | null;
  discountPercent: number;
  merkleProof: string | null;
  canMint: boolean;
}

export interface MinterContextData {
  minter: MinterData | null | undefined;
  isLoading: boolean;
  fetchMinterData: () => void;
  updatePartner: (partner: string) => void;
}

const defaultState: MinterData = {
  partnerCollection: "moonapelab",
  discountCard: BigNumber.from(0),
  discountPercent: 0,
  merkleProof: null,
  canMint: false,
};

export const minterContextDefaultValues: MinterContextData = {
  minter: defaultState,
  isLoading: false,
  fetchMinterData: () => null,
  updatePartner: () => null,
};

export const MinterContext = createContext<MinterContextData>(
  minterContextDefaultValues
);

function useMinterContextValue(): MinterContextData {
  const [minter, setMinter] = useState<MinterData>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { passDiscount, passToken } = useDiscountCard();

  const fetchMinterData = useCallback(() => {
    console.log("fetchMinterData");

    setIsLoading(true);
    const data: MinterData = {
      partnerCollection: "moonapelab",
      discountCard: passToken,
      discountPercent: passDiscount,
      merkleProof: null,
      canMint: false,
    };
    setMinter(data);
    console.log("data:", data);

    setIsLoading(false);
  }, [setMinter, passDiscount, passToken]);

  const updatePartner = useCallback(
    (partner: string) => {
      if (minter) {
        setMinter({ ...minter, partnerCollection: partner });
      }
    },
    [setMinter, minter]
  );

  return {
    minter,
    isLoading,
    fetchMinterData,
    updatePartner,
  };
}

export const MinterContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const minterContextValue = useMinterContextValue();
  return (
    <MinterContext.Provider value={minterContextValue}>
      {children}
    </MinterContext.Provider>
  );
};
