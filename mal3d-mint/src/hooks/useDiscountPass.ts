import { useState, useEffect } from "react";

import { useAccount, useContractReads } from "wagmi";
// import { readContract } from "wagmi/actions";

import { useMalpassBalanceOf } from "../generated";

import { moonpassAbi } from "../abis/moonpass";

const malpassContract = {
  address: "0x8344BE53FB250dd76E65B6721B6553C21053Ee8d",
  abi: moonpassAbi,
} as const;

const addItemsToContracts = (x) => {
  const updatedContracts = [];

  for (let i = 0; i < x; i++) {
    const newItem = {
      ...malpassContract,
      functionName: "tokenOfOwnerByIndex",
      args: [i],
    };

    updatedContracts.push(newItem);
  }

  return updatedContracts;
};

const useDiscountPass = async () => {
  const [maxPass, setMaxPass] = useState(0);
  // const [contracts, setContracts] = useState([]);

  console.log("useDiscountPass");

  const { address } = useAccount();
  console.log("address", address);
  const { data: passBalance } = useMalpassBalanceOf({ args: [address] });

  console.log("passes", passBalance);

  // for (let i = 0; i < passBalance; i++) {
  //   const data = await readContract({
  //     ...malpassContract,
  //     functionName: "tokenOfOwnerByIndex",
  //     args: [address, i],
  //   });
  //   console.log("pass loop", data);

  //   if (data > maxPass) {
  //     setMaxPass(data);
  //   }
  // }

  // Update the state with the new contracts array
  // setContracts(updatedContracts);
  const contracts = addItemsToContracts(passBalance);

  const { data } = useContractReads(contracts);

  // console.log("params", JSON.stringify({ contracts }));

  // const result = useContracts(JSON.stringify({ contracts }));

  console.log("restult", data);

  // useEffect(() => {
  //   for (let i = 0; i < passBalance; i++) {
  //     const { data: token } = useMalpassTokenOfOwnerByIndex();
  //     const { data: value } = useMalpassPassValueInApes(token);
  //     console.log("pass value", value);
  //     if (value > maxPass) {
  //       setMaxPass(value);
  //     }
  //   }
  // }, [passBalance]);

  return maxPass;
};

export default useDiscountPass;
