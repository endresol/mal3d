import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Web3Button } from "../components";

export function NavBar() {
  return (
    <header className='flex justify-between items-center'>
      <div className='relative flex items-center'>
        <Image
          src='/MAL_LOGO.svg'
          height='75'
          width='75'
          alt='Moon Ape Lab logo'
          className='logo'
        />
        <Link
          className='text-neutral-200 hover:text-neutral-400 focus:text-neutral-400 disabled:text-black/30 dark:text-neutral-200 dark:hover:text-neutral-300 dark:focus:text-neutral-300 lg:px-2 [&.active]:text-black/90 dark:[&.active]:text-zinc-400'
          href='https://moonapelab.io'
          data-te-nav-link-ref
        >
          WEBSITE
        </Link>
      </div>
      <h1 className='text-white font-bold text-4xl mb-2'>
        Moon Ape Lab 3d Mint
      </h1>
      <div className='relative flex items-center'>
        <a target='_blank' href='https://raritysniper.com/nft-drops-calendar'>
          <Image
            src={
              "https://storage.moonapelab.io/static/mintsite/logo2-white.png"
            }
            height={35}
            width={125}
            alt='RaritySniper'
            loading='lazy'
            className='pr-5'
          />
        </a>
        <a href='https://www.walletguard.app/' target='_blank' className='mr-4'>
          <Image
            src={"/wallet-guard-logo.png"}
            height={35}
            width={125}
            alt='WalletGuard Partner'
            loading='lazy'
          />
        </a>
        <Web3Button />
      </div>
    </header>
  );
}
