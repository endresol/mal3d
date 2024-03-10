import { Web3Button } from "@/components/Web3Button";
import Image from "next/image";

export default function Home() {
  return (
    <main className='flex min-h-screen flex-col items-center justify-between p-24'>
      <Web3Button />
    </main>
  );
}
