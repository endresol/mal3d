export type ContractProviderState = {
  paused: boolean | null | undefined;
  totalSupply: number | null | undefined;
  price: number | null | undefined;
  phase: string | null | undefined;
  maxPerTx: number | null | undefined;
  maxPerWallet: number | null | undefined;
};

export const contractInitialState: ContractProviderState = {
  paused: null,
  totalSupply: null,
  price: null,
  phase: null,
  maxPerTx: null,
  maxPerWallet: null,
};

export type ContractActions =
  | {
      type: "SET_CONTRACT_STATE";
      paused?: ContractProviderState["paused"];
      totalSupply?: ContractProviderState["totalSupply"];
      price?: ContractProviderState["price"];
      phase?: ContractProviderState["phase"];
      maxPerTx?: ContractProviderState["maxPerTx"];
      maxPerWallet?: ContractProviderState["maxPerWallet"];
    }
  | {
      type: "SET_TOTALSUPPLY";
      totalSupply?: ContractProviderState["totalSupply"];
    };

export function clientReducer(
  state: ContractProviderState,
  action: ContractActions
): ContractProviderState {
  switch (action.type) {
    case "SET_CONTRACT_STATE":
      return {
        ...state,
        paused: action.paused,
        totalSupply: action.totalSupply,
        price: action.price,
        phase: action.phase,
        maxPerTx: action.maxPerTx,
        maxPerWallet: action.maxPerWallet,
      };
    case "SET_TOTALSUPPLY":
      return {
        ...state,
        totalSupply: action.totalSupply,
      };
    default:
      return state;
  }
}
