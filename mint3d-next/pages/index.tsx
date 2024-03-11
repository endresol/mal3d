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
import { useEffect } from "react";
import Whitelist from "../helpers/whitelist";

const Home: NextPage = () => {
  const { network, address } = useWeb3Context();
  const { passDiscount, passToken } = useDiscountCard();
  const { contract } = useContractContext();
  const { minter, fetchMinterData } = useMinterContext();

  useEffect(() => {
    fetchMinterData();
  }, [fetchMinterData]);

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

  if (network?.chainId != process.env.NEXT_PUBLIC_NETWORK_ID)
    return <div className='text-white'>Wrong network</div>;

  return (
    <>
      <div className=''>
        <Head>
          <title>Moon Ape Lab</title>
          <link rel='icon' href='favicon.png' />
        </Head>
        <div className='flex flex-row flex-1 gap-2 mt-4'>
          <div className='w-2/12'>
            <ContractStatus />
          </div>
          <div className='w-2/12'>
            <PartnerCollections />
          </div>
          <div className='w-8/12 '>
            {/* <RandomMint /> */}
            <MatchedMint />
            {/* {currentMintPhase >= 1 && currentMintPhase <= 4 ? (
          ) : (
            <div className='flex flex-col justify-center items-center'>
              <h1 className='text-white font-bold text-4xl mb-2'>
                Minting is closed
              </h1>
            </div>
          )} */}
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
