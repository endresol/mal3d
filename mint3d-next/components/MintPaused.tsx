import Image from "next/image";

const MintPaused = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-6 p-8">
      <Image
        src="/paused-mint.webp"
        alt="Minting Paused"
        width={400}
        height={400}
        className="opacity-80"
      />
      <h1 className="text-4xl md:text-6xl font-bold text-center text-white ">
        Minting Paused
      </h1>
    </div>
  );
};

export default MintPaused;
