// import { createContext, useMemo, useState, useContext, ReactNode } from "react";

// type MinterData = {
//   partnerCollection: string;
//   discountCard: number;
//   discountPercent: number;
//   merkleProof: string | null;
//   canMint: boolean;
// };

// const initialState = {
//   partnerCollection: "moonapelab",
//   discountCard: 0,
//   discountPercent: 0,
//   merkleProof: null,
//   canMint: false,
// };

// const MinterContext = createContext({
//   minter: initialState,
//   setMinter: (any) => null,
// });

// function MinterContextProvider({ children }: { children: ReactNode }) {
//   const [minter, setMinter] = useState<MinterData | null>(initialState);

//   const value = useMemo(
//     () => ({
//       minter,
//       setMinter,
//     }),
//     [minter]
//   );

//   return (
//     <MinterContext.Provider value={value}>{children}</MinterContext.Provider>
//   );
// }

// export function useMinterContext() {
//   return useContext(MinterContext);
// }

// export { MinterContextProvider, MinterContext };
