import { useState } from "react";
import FileEditor from "../components/FileEditor";

import { NextPage } from "next";

import Whitelist from "../helpers/whitelist";

interface AdminState {
  price: string;
  maxTransactions: string;
  maxPerWallet: string;
  phase: string;
  merkleRoot: string;
}

const Admin: NextPage = () => {
  const [state, setState] = useState<AdminState>({
    price: "",
    maxTransactions: "",
    maxPerWallet: "",
    phase: "",
    merkleRoot: "",
  });

  const getMerkleRoot = () => {
    const root = Whitelist.getRootHash();
    setState({
      ...state,
      merkleRoot: root,
    });
  };

  const prepareFlight1 = () => {
    setState({
      ...state,
      price: "0.05",
      maxTransactions: "10",
      maxPerWallet: "1000",
      phase: "1",
    });
  };

  return (
    <div className='container mx-auto px-4 py-8 flex'>
      {/* Buttons Section */}
      <div className='w-1/4 flex flex-col space-y-4 mr-8'>
        <div className='flex justify-around'>
          <button
            onClick={prepareFlight1}
            className='px-4 py-2 border border-white text-white hover:bg-white hover:text-blue-500'
          >
            Load flight 1
          </button>
          <button className='px-4 py-2 border border-white text-white hover:bg-white hover:text-blue-500'>
            Open flight 1
          </button>
        </div>
        <div className='flex justify-around'>
          <button className='px-4 py-2 border border-white text-white hover:bg-white hover:text-blue-500'>
            Load flight 2
          </button>
          <button className='px-4 py-2 border border-white text-white hover:bg-white hover:text-blue-500'>
            Open flight 2
          </button>
        </div>
        <div className='flex justify-around'>
          <button className='px-4 py-2 border border-white text-white hover:bg-white hover:text-blue-500'>
            load flight 3
          </button>
          <button className='px-4 py-2 border border-white text-white hover:bg-white hover:text-blue-500'>
            Open flight 3
          </button>
        </div>
      </div>
      {/* Admin Section */}
      <div className='w-3/4 flex flex-col space-y-4'>
        <div className='grid grid-cols-2 gap-4'>
          <div className='flex items-center'>
            <label className='text-white mr-2 w-36 text-left'>
              Price per mint
            </label>
            <input
              value={state.price}
              onChange={(e) => setState({ ...state, price: e.target.value })}
              className='text-left border border-white rounded px-2 py-1 focus:outline-none focus:border-blue-500'
            />
          </div>
          <div className='flex items-center'>
            <label className='text-white mr-2 w-36 text-left'>
              Max transactions
            </label>
            <input
              value={state.maxTransactions}
              onChange={(e) =>
                setState({ ...state, maxTransactions: e.target.value })
              }
              className='text-left border border-white rounded px-2 py-1 focus:outline-none focus:border-blue-500'
            />
          </div>
          <div className='flex items-center'>
            <label className='text-white mr-2 w-36 text-left'>
              Max mints per wallet
            </label>
            <input
              value={state.maxPerWallet}
              onChange={(e) =>
                setState({ ...state, maxPerWallet: e.target.value })
              }
              className='text-left border border-white rounded px-2 py-1 focus:outline-none focus:border-blue-500'
            />
          </div>
          <div className='flex items-center'>
            <label className='text-white mr-2 w-36 text-left'>Phase</label>
            <input
              value={state.phase}
              onChange={(e) => setState({ ...state, phase: e.target.value })}
              className='text-left border border-white rounded px-2 py-1 focus:outline-none focus:border-blue-500'
            />
          </div>
          <div className='flex items-center'>
            <label className='text-white mr-2 w-36 text-left'>
              Merkle root
            </label>
            <input
              value={state.merkleRoot}
              onChange={(e) =>
                setState({ ...state, merkleRoot: e.target.value })
              }
              className='text-left border border-white rounded px-2 py-1 focus:outline-none focus:border-blue-500'
            />
          </div>
        </div>
        <FileEditor parentAction={getMerkleRoot} />
      </div>
    </div>
  );
};

export default Admin;
