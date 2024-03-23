import React, { useEffect, useState } from "react";
import Image from "next/image";
import { ethers } from "ethers";

import { useWeb3Context } from "../context";
import { useMinterContext } from "../hooks/useMinterContext";

import partnerList from "../scripts/partners.json";

const ERC721ABI = [
  "function balanceOf(address owner) view returns (uint256)",
  // ...
];

// const partnerList = [
//   {
//     name: "Lost Miners",
//     icon: "/partners/lostminer.png",
//     real_address: "0x3bcacb18f4d60c8cba68cd95860daf3e32bebcb6",
//     address: "0xFa2f7083e8Af1bFFD08Ec5D02F37F5ca32C53768",
//     holder: false,
//   },
//   {
//     name: "Ape Reunion",
//     icon: "/partners/ape_reunion.gif",
//     real_address: "0x47f3a38990ca12e39255e959f7d97fbe5906afd4",
//     address: "0xe29f8038d1a3445ab22ad1373c65ec0a6e1161a4",
//     holder: false,
//   },
//   {
//     name: "Toxic Skull Club",
//     icon: "/partners/toxicskullclub.avif",
//     real_address: "0x5ca8dd7f8e1ee6d0c27a7be6d9f33ef403fbcdd8",
//     address: "0x5e28ab57d09c589ff5c7a2970d911178e97eab81",
//     holder: false,
//   },
//   {
//     name: "Space Riders",
//     icon: "/partners/spaceriders.png",
//     real_address: "0xc9d198089d6c31d0ca5cc5b92c97a57a97bbfde2",
//     address: "0xFa2f7083e8Af1bFFD08Ec5D02F37F5ca32C53768",
//     holder: false,
//   },
// ];

const PartnerCollections: React.FC = () => {
  const [partners, setPartners] = useState(partnerList);
  const { signer, address } = useWeb3Context();
  const { minter, updatePartner } = useMinterContext();

  const handlePartnerClick = (partner: {
    name?: string;
    icon?: string;
    address: any;
    holder: any;
  }) => {
    if (partner.holder) updatePartner(partner.address);
  };

  const checkContract = async () => {
    const partnerUpdate = [];
    if (!signer) return;
    for (const partner of partners) {
      const partnerContract = new ethers.Contract(
        partner.address,
        ERC721ABI,
        signer
      );

      try {
        const balance = await partnerContract.balanceOf(address);

        if (balance.gt(0)) {
          partnerUpdate.push({ ...partner, holder: true });
        } else {
          partnerUpdate.push({ ...partner });
        }
      } catch (error) {
        console.error("Error checking", partner.name, partner.address);
      }
    }
    setPartners(partnerUpdate);
  };

  useEffect(() => {
    checkContract();
  }, [signer]);

  return (
    <>
      <div className='text-white border-2 p-4 rounded-md shadow-md w-72'>
        <h2 className='text-xl'>Partner Collections</h2>
        <ul className='grid grid-cols-3 gap-2'>
          {partners.map((partner, index) => (
            <li key={index}>
              <div
                className={`mt-2 border-4 rounded-full overflow-hidden w-24 h-24 ${
                  partner.holder ? "border-green-500" : "border-slate-500"
                }`}
              >
                <Image
                  src={partner.icon.toString()}
                  height={200}
                  width={200}
                  alt='partner'
                  className={`${
                    partner.holder ? "" : "grayscale"
                  } object-cover h-24 w-24`}
                  onClick={() => handlePartnerClick(partner)}
                />
              </div>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default PartnerCollections;
