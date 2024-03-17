import { BigNumber } from "ethers";

import useMAL3DContract from "./useMAL3dContract";
import { useWeb3Context } from "../context";
import { useState, useEffect } from "react";

const maxDiscount = 15;

export const useIs2DMinted = (tokenid: BigNumber) => {
  const [mintStatus, setMintStatus] = useState<boolean>(false);

  const { address } = useWeb3Context();
  const contract = useMAL3DContract();

  useEffect(() => {
    if (!contract) return;
    let mounted = true;

    const getContractStatus = async () => {
      try {
        const _mintStatus = await contract.isTokenMinted(tokenid);
        setMintStatus(_mintStatus);
      } catch (err) {
        console.error("getContractStatus", err);
      }
    };

    if (mounted) {
      getContractStatus();
    }

    return () => {
      mounted = false;
    };
  }, [address, contract, mintStatus, tokenid]);

  return mintStatus;
};
