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
import Whitelist from "../helpers/whitelist";

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
  if (!network)
    return <div className='text-white'>Please connect your wallet.</div>;

  if (network.chainId.toString() != process.env.NEXT_PUBLIC_NETWORK_ID)
    return (
      <div className='text-white'>
        Wrong network! <br /> Please switch to{" "}
        {process.env.NEXT_PUBLIC_NETWORK_NAME}
      </div>
    );

  return (
    <>
      <div className=''>
        <Head>
          <title>Moon Ape Lab</title>
          <link rel='icon' href='favicon.png' />
        </Head>
        <div className='flex flex-row flex-1 gap-2 mt-4 text-white'>
          <div className='w-2/12'>
            <ContractStatus />
          </div>

          {(contract.phase == 0 || contract.paused) && (
            <div className='w-10/12'>
              <h2 className='text-xl'>Minting paused</h2>
            </div>
          )}
          {/* have to alter this to test contract 5 here and 6 on partner is correct */}
          {contract?.phase <= 4 && (
            <>
              <div className='w-10/12 '>
                <MatchedMint />
              </div>
            </>
          )}

          {contract?.phase >= 5 && (
            <>
              {contract?.phase == 5 && (
                <div className='w-2/12'>
                  <PartnerCollections />
                </div>
              )}
              <div className='w-8/12 '>
                <RandomMint />
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Home;
