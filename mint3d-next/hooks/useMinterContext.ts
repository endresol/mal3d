import { useContext } from "react";
import { MinterContext } from "@/context/minterCtx";

export const useMinterContext = () => {
  const context = useContext(MinterContext);
  if (!context) {
    throw new Error("Contract context not initialized");
  }
  return context;
};
