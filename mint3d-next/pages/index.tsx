import type { NextPage } from "next";
import Head from "next/head";
import ContractStatus from "@/components/ContractStatus";
import RandomMint from "@/components/RandomMint";
import MatchedMint from "@/components/MintMatched";
import PartnerCollections from "@/components/PartnerCollections";
import { useWeb3Context } from "@/context";
import { useDiscountCard } from "@/hooks/useDiscountCard";
import { useMinterContext } from "@/hooks/useMinterContext";
import { useContractContext } from "@/hooks/useContractContext";
import { useEffect, useState } from "react";

import { BiError } from "react-icons/bi";

import Whitelist from "../helpers/whitelist";
import MintPaused from "@/components/MintPaused";

const Home: NextPage = () => {
  const { network, address } = useWeb3Context();
  // const { passDiscount, passToken } = useDiscountCard();
  // const { enter, setEnter } = useState(false);

  const {
    contract,
    isLoading: isContractLoading,
    fetchContractData,
  } = useContractContext();
  const { minter, isLoading, fetchMinterData } = useMinterContext();

  const isSoldOut = contract?.tokenCount == contract?.totalSupply;
  const isPaused = process.env.NEXT_PUBLIC_MINT_PAUSED;

  useEffect(() => {
    fetchMinterData();
  }, [fetchMinterData]);

  useEffect(() => {
    fetchContractData();
  }, [fetchContractData]);

  // if (Whitelist.contains(address)) {
  //   updateWhitelist(Whitelist.getProofForAddress(address));
  // }

  // useEffect(() => {
  //   console.log("update discount effect", passDiscount, passToken);

  //   if (setMinter) {
  //     setMinter({
  //       ...minter,
  //       discountCard: passToken,
  //       discountPercent: passDiscount,
  //       merkleProof: Whitelist.getProofForAddress(address),
  //     });
  //     // updateDiscount(passToken, passDiscount);
  //     // updateWhitelist(Whitelist.getProofForAddress(address));
  //   }
  // }, [setMinter, passDiscount, passToken, address, minter]);

  // useEffect(() => {
  //   console.log("contract context effect");

  //   if (!fetchContractData) return;
  //   let mounted = true;

  //   const getContractStatus = async () => {
  //     await fetchContractData();
  //     console.log("after fetch contract data effect");
  //   };

  //   if (mounted) {
  //     getContractStatus().then(() => {});
  //   }

  //   return () => {
  //     mounted = false;
  //   };
  // }, [useContractContext]);
  if (isPaused)
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <MintPaused />
      </div>
    );
  if (!network)
    return (
      <div className="text-white nowallet">Please connect your wallet.</div>
    );

  if (network.chainId.toString() != process.env.NEXT_PUBLIC_NETWORK_ID)
    return (
      <div className="text-white nowallet">
        Wrong network! <br /> Please switch to{" "}
        {process.env.NEXT_PUBLIC_NETWORK_NAME}
      </div>
    );
  if (isLoading || isContractLoading) {
    return <div>LOADING</div>;
  }

  return (
    <>
      <div className="">
        <Head>
          <title>Moon Ape Lab 3D Avatar Mint</title>
          <link rel="icon" href="/favicon.ico" sizes="any" />
        </Head>
        <div className="flex flex-row flex-1 gap-2 mt-4 text-white">
          <div className="w-2/12">
            <ContractStatus />
          </div>

          {contract?.phase <= 5 && (
            <>
              <div className="w-10/12 ">
                {(contract.phase == 0 || contract.paused) && (
                  <span className="text-3xl p-10 inline">
                    <BiError className="inline" /> Minting paused{" "}
                    <BiError className="inline" />
                  </span>
                )}
                <MatchedMint />
              </div>
            </>
          )}

          {contract?.phase >= 6 && (
            <>
              {contract?.phase == 6 && (
                <div className="w-4/12">
                  <PartnerCollections />
                </div>
              )}
              <div className="w-6/12 relative">
                {(contract.phase == 0 || contract.paused) && (
                  <h2 className="text-xl">Minting paused</h2>
                )}

                <RandomMint />
                {isSoldOut && (
                  <div className="absolute bottom-1/8 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-yellow-500 text-white text-6xl font-bold py-2 px-4 rounded-full z-10">
                    SOLD OUT!
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Home;
