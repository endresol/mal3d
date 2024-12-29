import Image from "next/image";

const MintPaused = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-2 p-2">
      <Image
        src="/7403_mint_paused_12_28_2024.png"
        alt="Minting Paused"
        width={1000}
        height={1000}
        className="opacity-80"
      />
    </div>
  );
};

export default MintPaused;
