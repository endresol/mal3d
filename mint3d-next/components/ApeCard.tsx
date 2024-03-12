import React from "react";
import Image from "next/image";
import { BigNumber } from "ethers";

import { useIs2DMinted } from "@/hooks/useIs2DMinted";

interface ApeCardProps {
  id: number;
  onClick: (nft: number) => void;
  isSelected: boolean;
}

const ApeCard: React.FC<ApeCardProps> = ({ id, onClick, isSelected }) => {
  const handleApeClick = (id: number) => {
    // console.log("ape click", id, isMinted);
    if (!isMinted) {
      onClick(id);
    }
    // onClick(id);
  };

  const isMinted = useIs2DMinted(BigNumber.from(id));
  console.log("isminted:", isMinted);

  return (
    <div
      onClick={() => handleApeClick(id)}
      className={`relative overflow-hidden rounded-lg border-4 ${
        isSelected ? "border-green-500" : "border-gray-100"
      }`}
    >
      <>
        <Image
          src={`https://storage.moonapelab.io/static/moonapes/thumbs/${id}.png`}
          alt={`Moon Ape lag Geneis #${id}`}
          width={300}
          height={300}
          className='rounded-lg'
        />
        {isMinted && (
          <div className='absolute inset-0 flex items-center justify-center bg-black bg-opacity-75 rounded-lg'>
            <div className='text-2xl text-white transform -rotate-45'>
              MINTED
            </div>
          </div>
        )}
      </>
    </div>
  );
};

export default ApeCard;
