import { Contract } from "ethers";
import { useMemo } from "react";
import { useWeb3Context } from "../context";

import MoonStakingABI from "../abis/MoonStaking.json";

const contractAddress = process.env.NEXT_PUBLIC_MOON_APE_LAB_STAKING;

const useMoonStakingContract = () => {
  const { signer } = useWeb3Context();

  return useMemo(
    () =>
      signer &&
      contractAddress &&
      new Contract(contractAddress, MoonStakingABI.abi, signer),
    [signer]
  );
};

export default useMoonStakingContract;
