import { Contract } from "ethers";
import { useMemo } from "react";
import { useWeb3Context } from "../context";

import { moonpassAbi } from "../abis/moonpassAbi";
const contractAddress = process.env.NEXT_PUBLIC_MOON_APE_LAB_PASS;

const useMALPassContract = () => {
  const { signer } = useWeb3Context();

  return useMemo(
    () =>
      signer &&
      contractAddress &&
      new Contract(contractAddress, moonpassAbi, signer),
    [signer]
  );
};

export default useMALPassContract;
