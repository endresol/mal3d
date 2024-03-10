import { BigNumber } from "ethers";

import useMALPassContract from "@/hooks/useMALPassContract";
import { useWeb3Context } from "../context";
import { useMemo } from "react";

const maxDiscount = 15;

export const useMaxPass = () => {
  const { address } = useWeb3Context();
  const contract = useMALPassContract();

  return useMemo(async () => {
    console.log("useMaxPass", contract);
    if (!contract || !address) return;
    let maxPass = 0;

    const _number = await contract.balanceOf(address);
    for (let index = 0; index < _number.toNumber(); index++) {
      const _token = await contract.tokenOfOwnerByIndex(
        address,
        BigNumber.from(index)
      );
      const _tokenValue = await contract.pass_value_in_apes(_token);

      if (_tokenValue > maxPass) maxPass = _tokenValue.toNumber();
      if (_tokenValue >= maxDiscount) break;
      console.log("looping", index, maxPass);
    }
    return maxPass;
  }, [address, contract]);
};
