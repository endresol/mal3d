import { createContext, useState, useCallback, ReactNode } from "react";
import { useDiscountCard } from "@/hooks/useDiscountCard";

import { useWeb3Context } from "@/context";
import { BigNumber } from "ethers";
import whitelist from "@/helpers/whitelist";

interface MinterData {
  partnerCollection: string;
  discountCard: BigNumber | null;
  discountPercent: number;
  merkleProof: string[] | null;
  canMint: boolean;
  delegateAddress: string | null;
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
  delegateAddress: null,
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
  const [minter, setMinter] = useState<MinterData>(defaultState);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { address } = useWeb3Context();
  const { passDiscount, passToken } = useDiscountCard();

  const fetchMinterData = useCallback(() => {
    console.log("fetchMinterData", address);
    if (!address) return;

    setIsLoading(true);

    let proof: string[] | null = null;
    if (whitelist.contains(address)) {
      proof = whitelist.getProofForAddress(address);
    }
    let delegateAddress: string | null = null;

    if (!proof) {
      const url = `https://api.delegate.xyz/registry/v2/${address}?chainId=${process.env.NEXT_PUBLIC_NETWORK_ID}`;
      console.log("no proof", url);
      fetch(url)
        .then((response) => response.json())
        .then((fetchedDelegates) => {
          console.log("delegate.xyz:", fetchedDelegates);
          const validDelegates = fetchedDelegates.filter(
            (delegate: { from: string | null | undefined }) => {
              // Check if the 'from' value is in the whitelist
              return whitelist.contains(delegate.from);
            }
          );
          if (validDelegates.length > 0) {
            console.log("Valid delegate.xyz:", validDelegates);
            delegateAddress = validDelegates[0].from;
            proof = whitelist.getProofForAddress(delegateAddress);
          }
        })
        .finally(() => {
          setMinter((previous: MinterData) => ({
            ...previous,
            merkleProof: proof,
            delegateAddress: delegateAddress,
            canMint: proof ? true : false,
          }));
        })
        .catch((err) => console.log("delegate.xyz:", err));
    }

    const data: MinterData = {
      partnerCollection: "moonapelab",
      discountCard: passToken,
      discountPercent: passDiscount,
      merkleProof: proof,
      canMint: proof ? true : false,
      delegateAddress: delegateAddress,
    };
    setMinter(data);
    console.log("data:", data);

    setIsLoading(false);
  }, [setMinter, passDiscount, passToken]);

  const updatePartner = useCallback(
    (partner: string) => {
      if (minter) {
        setMinter({
          ...minter,
          partnerCollection: partner,
          canMint: partner != "moonapelab" ? true : false,
        });
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
