// import { createContext, useReducer, useMemo, useCallback } from "react";
// import { useWeb3Context } from "@/context";

// const initialState = {
//   partnerCollection: "moonapelab",
//   discountCard: 0,
//   discountPercent: 0,
//   merkleProof: 0,
//   canMint: false,
// };

// const reducer = (state, action) => {
//   switch (action.type) {
//     case "UPDATE_PARTNER":
//       return {
//         ...state,
//         partnerCollection: action.payload,
//         canMint:
//           (action.payload !== "moonapelab" && action.payload != "") ||
//           state.merkleProof != "",
//       };
//     case "UPDATE_DISCOUNT":
//       return {
//         ...state,
//         discountCard: action.payload.discountCard,
//         discountPercent: action.payload.discountPercent,
//       };
//     case "UPDATE_PROOF":
//       return {
//         ...state,
//         merkleProof: action.payload,
//         canMint:
//           (state.partnerCollection !== "moonapelab" &&
//             state.partnerCollection != "") ||
//           action.payload != "",
//       };
//     default:
//       return state;
//   }
// };

// const MinterContext = createContext(null);

// const MinterContextProvider = ({ children }) => {
//   // const { discountCard, discountPercent } = useDiscountCard();
//   // initialState.discountCard = discountCard;
//   // initialState.discountPercent = discountPercent;

//   const [minter, dispatch] = useReducer(reducer, initialState);
//   const { address } = useWeb3Context();

//   console.log("inside the minter provider init code...:", address);

//   const updatePartner = useCallback((newPartner) => {
//     dispatch({
//       type: "UPDATE_PARTNER",
//       payload: newPartner,
//     });
//   }, []);

//   const updateDiscount = useCallback((discountCard, discountPercent) => {
//     dispatch({
//       type: "UPDATE_DISCOUNT",
//       payload: { discountCard, discountPercent },
//     });
//   }, []);

//   const updateWhitelist = useCallback((merkleProof) => {
//     dispatch({
//       type: "UPDATE_PROOF",
//       payload: merkleProof,
//     });
//   }, []);

//   const value = useMemo(() => {
//     return { minter, updatePartner, updateDiscount, updateWhitelist };
//   }, [minter, updatePartner, updateDiscount, updateWhitelist]);

//   return (
//     <MinterContext.Provider value={value}>{children}</MinterContext.Provider>
//   );
// };

// export { MinterContextProvider, MinterContext };
