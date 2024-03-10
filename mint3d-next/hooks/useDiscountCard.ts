import { BigNumber } from "ethers";
import { useState, useEffect } from "react";

import useMALPassContract from "@/hooks/useMALPassContract";
import { useWeb3Context } from "../context";
import { getDiscount } from "@/helpers/discount";

const maxDiscount = 15;

export const useDiscountCard = () => {
  const [passDiscount, setPassDiscount] = useState<number>(0);
  const [passToken, setPassToken] = useState<BigNumber | null>(null);

  const { address } = useWeb3Context();
  const contract = useMALPassContract();

  useEffect(() => {
    let _maxDiscount = 0;
    let _maxToken = BigNumber.from(0);

    if (!contract) return;
    let mounted = true;
    console.log("inside hook useDiscountCard");

    const getContractStatus = async () => {
      try {
        const _number = await contract.balanceOf(address);

        for (let index = 0; index < _number.toNumber(); index++) {
          const _token = await contract.tokenOfOwnerByIndex(
            address,
            BigNumber.from(index)
          );
          const _tokenValue = await contract.pass_value_in_apes(_token);
          const _tokenDiscount = getDiscount(_tokenValue.toNumber());

          if (_tokenDiscount > _maxDiscount) {
            _maxDiscount = _tokenDiscount;
            _maxToken = _token;
          }

          if (_tokenDiscount >= maxDiscount) break;
        }
      } catch (err) {
        console.error("getContractStatus", err);
      }

      setPassDiscount(_maxDiscount);
      setPassToken(_maxToken);
    };

    if (mounted) {
      getContractStatus().then(() => {
        console.log("all done...");
      });
    }

    return () => {
      mounted = false;
    };
  }, [address, contract, passDiscount]);

  return { passDiscount, passToken };
};
