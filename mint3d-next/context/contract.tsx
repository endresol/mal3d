// import {
//   createContext,
//   useReducer,
//   useMemo,
//   useCallback,
//   ReactNode,
// } from "react";
// import useMAL3dContract from "@/hooks/useMAL3dContract";
// import { useWeb3Context } from "@/context";
// import { BigNumber } from "ethers";

// const initialContractState = {
//   paused: null,
//   tokenCount: 0,
//   price: null,
//   phase: 0,
//   maxPerTx: 0,
//   maxPerWallet: 0,
// };

// const reducer = (
//   state: any,
//   action: {
//     type: any;
//     payload: {
//       paused: any;
//       tokenCount: any;
//       price: any;
//       phase: any;
//       maxPerTx: any;
//       maxPerWallet: any;
//     };
//   }
// ) => {
//   switch (action.type) {
//     case "UPDATE_CONTRACT":
//       return {
//         ...state,
//         paused: action.payload.paused,
//         tokenCount: action.payload.tokenCount,
//         price: action.payload.price,
//         phase: action.payload.phase,
//         maxPerTx: action.payload.maxPerTx,
//         maxPerWallet: action.payload.maxPerWallet,
//       };
//     case "UPDATE_SUPPLY":
//       return {
//         ...state,
//         tokenCount: action.payload,
//       };
//     // case "UPDATE_PROOF":
//     //   return {
//     //     ...state,
//     //     merkleProof: action.payload,
//     //     canMint:
//     //       (state.partnerCollection !== "moonapelab" &&
//     //         state.partnerCollection != "") ||
//     //       action.payload != "",
//     //   };
//     default:
//       return state;
//   }
// };

// const ContractContext = createContext(null);

// const ContractContextProvider = ({ children }: { children: ReactNode }) => {
//   const MAL3dContract = useMAL3dContract();

//   const [contract, dispatch] = useReducer(reducer, initialContractState);
//   const { address } = useWeb3Context();

//   console.log("inside the minter provider init code...:", address);

//   const updateContract = useCallback((newContract: any) => {
//     dispatch({
//       type: "UPDATE_CONTRACT",
//       payload: newContract,
//     });
//   }, []);

//   const updateSupply = useCallback((supply: any) => {
//     dispatch({
//       type: "UPDATE_SUPPLY",
//       payload: supply,
//     });
//   }, []);

//   // const updateWhitelist = useCallback((merkleProof) => {
//   //   dispatch({
//   //     type: "UPDATE_PROOF",
//   //     payload: merkleProof,
//   //   });
//   // }, []);

//   const value = useMemo(() => {
//     return { contract, updateContract, updateSupply };
//   }, [contract, updateContract, updateSupply]);

//   return (
//     <ContractContext.Provider value={value}>
//       {children}
//     </ContractContext.Provider>
//   );
// };

// export { ContractContextProvider, ContractContext };
