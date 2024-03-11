import { Contract } from "ethers";
import { useMemo } from "react";
import { useWeb3Context } from "../context";

import MoonStakingS2ABI from "../abis/MoonStakingS2.json";

const contractAddress = process.env.NEXT_PUBLIC_MOON_APE_LAB_STAKING_S2;

const useMoonStakingS2Contract = () => {
  const { signer } = useWeb3Context();

  return useMemo(
    () =>
      signer &&
      contractAddress &&
      new Contract(contractAddress, MoonStakingS2ABI, signer),
    [signer]
  );
};

export default useMoonStakingS2Contract;
