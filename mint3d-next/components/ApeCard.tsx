import React from "react";
import Image from "next/image";
import { BigNumber } from "ethers";

import { useIs2DMinted } from "@/hooks/useIs2DMinted";

interface ApeCardProps {
  id: number;
  onClick: (nft: number) => void;
  isSelected: boolean;
}

const getImage = (id: number, isSelected: boolean, isMinted: boolean) => {
  if (isMinted)
    return "https://storage.moonapelab.io/static/mintsite/Bum-sq.jpg";
  if (isSelected)
    return `https://storage.moonapelab.io/static/moonapes3d/thumbs/${id}.png`;
  return `https://storage.moonapelab.io/static/moonapes/thumbs/${id}.png`;
};

const ApeCard: React.FC<ApeCardProps> = ({ id, onClick, isSelected }) => {
  const handleApeClick = (id: number) => {
    if (!isMinted) {
      onClick(id);
    }
  };

  const isMinted = useIs2DMinted(BigNumber.from(id));

  return (
    <div
      onClick={() => handleApeClick(id)}
      className={`relative overflow-hidden rounded-lg border-4 ${
        isSelected ? "border-green-500" : "border-gray-100"
      }`}
    >
      <>
        <div className='relative'>
          {isMinted && (
            <div className='absolute inset-0 flex items-center justify-center rounded-lg'>
              <div className='text-2xl text-white transform'>MINTED</div>
            </div>
          )}
          <Image
            src={getImage(id, isSelected, isMinted)}
            alt={`Moon Ape lag Geneis #${id}`}
            width={300}
            height={300}
            className='rounded-lg'
          />
          <div className='absolute bottom-0 left-0 w-full bg-white bg-opacity-75 text-black text-center py-1  font-mono font-bold'>
            MAL #{id}
          </div>
        </div>
      </>
    </div>
  );
};

export default ApeCard;
