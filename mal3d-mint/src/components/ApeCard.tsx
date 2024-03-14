// ApeCard.tsx
import React from "react";
import { useMal3dIs2dMinted } from "../generated";

interface ApeCardProps {
  id: number;
  onClick: (nft: number) => void;
  isSelected: boolean;
}

const ApeCard: React.FC<ApeCardProps> = ({ id, onClick, isSelected }) => {
  const handleApeClick = (id: number) => {
    console.log("ape click", id, isMinted);

    if (!isMinted) {
      onClick(id);
    }
  };

  const { data: isMinted } = useMal3dIs2dMinted({ args: [id] });
  console.log("isminted:", isMinted);

  return (
    <div
      onClick={() => handleApeClick(id)}
      className={`relative overflow-hidden rounded-lg border-4 ${
        isSelected ? "border-green-500" : "border-gray-100"
      }`}
    >
      <>
        <img
          src={`https://storage.moonapelab.io/static/moonapes/thumbs/${id}.png`}
          alt={`Moon Ape lag Geneis #${id}`}
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
