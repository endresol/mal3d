// import { createContext, useState } from "react";
// import useMAL3dContract from "@/hooks/useMAL3dContract";
// import { BigNumber } from "ethers";

// interface ContractDataInterface {
//   paused: boolean | null | undefined;
//   totalSupply: number | null | undefined;
//   price: BigNumber | null | undefined;
//   phase: string | null | undefined;
//   maxPerTx: number | null | undefined;
//   maxPerWallet: number | null | undefined;
// }

// export const ContractContext = createContext(null);

// export const ContractContextProvider = ({
//   children,
// }: {
//   children: ReactNode;
// }) => {
//   const MAL3dContract = useMAL3dContract();

//   // initialize state and functions
//   const [contractState, setContractState] = useState<ContractDataInterface>({
//     paused: false,
//     totalSupply: 0,
//     price: BigNumber.from(0),
//     phase: "",
//     maxPerTx: 0,
//     maxPerWallet: 0,
//   });

//   const updateContractState = (newState: ContractDataInterface) => {
//     setContractState(newState);
//   };

//   const updateTotalSupply = (newTotalSupply: number) => {
//     setContractState((prevState) => ({
//       ...prevState,
//       totalSupply: newTotalSupply,
//     }));
//   };

//   const fetchContractData = async () => {
//     let contractData = contractState;
//     if (MAL3dContract) {
//       console.log("fetchContractData", MAL3dContract);
//       try {
//         const allPromise = Promise.all([
//           MAL3dContract.paused(),
//           MAL3dContract.totalSupply(),
//           MAL3dContract.maxMintAmountPerTx(),
//           MAL3dContract.maxMintAmountPerWallet(),
//           MAL3dContract.mintPhase(),
//           MAL3dContract.cost(),
//         ]);

//         allPromise.then((values) => {
//           contractData = {
//             paused: values[0],
//             totalSupply: values[1],
//             maxPerTx: values[2],
//             maxPerWallet: values[3],
//             phase: values[4],
//             price: values[5],
//           };
//           updateContractState(contractData);
//         });
//       } catch (err) {
//         console.error("getContractStatus", err);
//       }
//     }
//     return;
//   };

//   const values = {
//     contractState,
//     updateContractState,
//     updateTotalSupply,
//     fetchContractData,
//   };

//   return (
//     <ContractContext.Provider value={values}>
//       {children}
//     </ContractContext.Provider>
//   );
// };

// //  MAL3dContract.paused(),
// //           MAL3dContract.totalSupply(),
// //           MAL3dContract.maxMintAmountPerTx(),
// //           MAL3dContract.maxMintAmountPerWallet(),
// //           MAL3dContract.mintPhase(),
// //           MAL3dContract.cost()
