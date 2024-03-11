import { Contract } from "ethers";
import { useMemo } from "react";
import { useWeb3Context } from "../context";

import { mal3DavatarAbi } from "../abis/mal3DavatarAbi";

const contractAddress = process.env.NEXT_PUBLIC_MOON_APE_LAB_3D_AVATAR;

const useMAL3DContract = () => {
  const { signer } = useWeb3Context();

  return useMemo(
    () =>
      signer &&
      contractAddress &&
      new Contract(contractAddress, mal3DavatarAbi, signer),
    [signer]
  );
};

export default useMAL3DContract;
