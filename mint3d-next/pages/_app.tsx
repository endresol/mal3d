import "./globals.css";
import localFont from "next/font/local";

import type { AppProps } from "next/app";
import {
  Web3ContextProvider,
  MinterContextProvider,
  ContractContextProvider,
} from "@/context";

import { ToastContainer } from "react-toastify";
import { NavBar } from "../components";

import "react-toastify/dist/ReactToastify.css";

import { ClerkProvider } from "@clerk/nextjs";

(BigInt.prototype as any).toJSON = function () {
  return Number(this);
};

const fontForMAL = localFont({
  src: "../fonts/SpaceGrotesk-VariableFont_wght.ttf",
  variable: "--font-for-mal",
});

function myApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <ClerkProvider {...pageProps}>
        <style jsx global>{`
          html {
            font-family: ${fontForMAL.style.fontFamily};
          }
        `}</style>
        {process.env.NEXT_PUBLIC_NETWORK_ID !== "1" && (
          <div className="h-6 bg-red-500 text-center">
            {" "}
            {process.env.NEXT_PUBLIC_NETWORK_NAME}{" "}
          </div>
        )}
        <Web3ContextProvider>
          <div
            className={`flex flex-col h-full font-family: ${fontForMAL.style.fontFamily} font-sans`}
          >
            <ContractContextProvider>
              <MinterContextProvider>
                <NavBar />
                <Component {...pageProps} />
                <ToastContainer
                  hideProgressBar={false}
                  position="bottom-right"
                  autoClose={5000}
                  pauseOnHover
                  theme="dark"
                  closeOnClick
                />
              </MinterContextProvider>
            </ContractContextProvider>
          </div>
        </Web3ContextProvider>
      </ClerkProvider>
    </>
  );
}

export default myApp;
