import { useState, useEffect } from "react";
import malLogo from "/MAL_LOGO.svg";
import "./App.css";

import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useMal3dMintPhase } from "./generated";
import CollectionStatus from "./components/CollectionStatus";
import MatchedMint from "./components/MatchedMint";
import useDiscountPass from "./hooks/useDiscountPass";

function App() {
  const [currentMintPhase, setCurrentMintPhase] = useState<number>(0);

  const { data: mintPhase } = useMal3dMintPhase({});

  const malPass = useDiscountPass();
  console.log("malPass", malPass);

  // Log the fetched tokenURI to the console
  useEffect(() => {
    console.log("WL?", mintPhase);
    setCurrentMintPhase(mintPhase);
  }, [mintPhase]);

  return (
    <div className='flex flex-col h-screen'>
      <header className='flex justify-between items-center'>
        <img src={malLogo} alt='moon ape lab logo' className='logo' />
        <h1 className='text-white font-bold text-4xl mb-2'>
          Moon Ape Lab 3d mint
        </h1>
        <ConnectButton />
      </header>
      <div className='mb-4'></div>
      <div className='flex flex-row flex-1 gap-2'>
        <div className='w-2/12'>
          <CollectionStatus />
        </div>
        <div className='w-10/12 '>
          {currentMintPhase >= 1 && currentMintPhase <= 4 ? (
            <MatchedMint />
          ) : (
            <div className='flex flex-col justify-center items-center'>
              <h1 className='text-white font-bold text-4xl mb-2'>
                Minting is closed
              </h1>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
