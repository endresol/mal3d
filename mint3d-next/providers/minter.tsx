// import React, { useReducer, useMemo, useCallback } from "react";
// import MinterContext from "@/context/minter";

// const initialState = {
//   partnerCollection: "moonapelab",
//   discountCard: 0,
//   discountPercent: 0,
//   canMint: false,
// };

// const reducer = (state, action) => {
//   switch (action.type) {
//     case "UPDATE_PARTNER":
//       return {
//         ...state,
//         partnerCollection: action.payload,
//       };
//     default:
//       return state;
//   }
// };

// export const MinterProvider = ({ children }) => {
//   const [minter, dispatch] = useReducer(reducer, initialState);

//   const updatePartner = useCallback((newPartner) => {
//     dispatch({
//       type: "UPDATE_PARTNER",
//       payload: newPartner,
//     });
//   }, []);

//   const value = useMemo(() => {
//     return { minter, updatePartner };
//   }, [minter, updatePartner]);

//   return (
//     <MinterContext.Provider value={value}>{children}</MinterContext.Provider>
//   );
// };
