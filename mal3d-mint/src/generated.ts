import {
  useContractRead,
  UseContractReadConfig,
  useContractWrite,
  Address,
  UseContractWriteConfig,
  usePrepareContractWrite,
  UsePrepareContractWriteConfig,
  useContractEvent,
  UseContractEventConfig,
} from 'wagmi'
import {
  ReadContractResult,
  WriteContractMode,
  PrepareWriteContractResult,
} from 'wagmi/actions'

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// mal3d
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xbB4F46A8B194b9BfF013536Ff03B10F8D984c993)
 */
export const mal3dABI = [
  {
    stateMutability: 'nonpayable',
    type: 'constructor',
    inputs: [
      { name: '_tokenName', internalType: 'string', type: 'string' },
      { name: '_tokenSymbol', internalType: 'string', type: 'string' },
      { name: '_cost', internalType: 'uint256', type: 'uint256' },
      { name: '_maxSupply', internalType: 'uint256', type: 'uint256' },
      { name: '_maxMintAmountPerTx', internalType: 'uint256', type: 'uint256' },
      { name: '_hiddenMetadataUri', internalType: 'string', type: 'string' },
    ],
  },
  { type: 'error', inputs: [], name: 'ApprovalCallerNotOwnerNorApproved' },
  { type: 'error', inputs: [], name: 'ApprovalQueryForNonexistentToken' },
  { type: 'error', inputs: [], name: 'ApprovalToCurrentOwner' },
  { type: 'error', inputs: [], name: 'ApproveToCaller' },
  { type: 'error', inputs: [], name: 'BalanceQueryForZeroAddress' },
  { type: 'error', inputs: [], name: 'InvalidQueryRange' },
  { type: 'error', inputs: [], name: 'MintToZeroAddress' },
  { type: 'error', inputs: [], name: 'MintZeroQuantity' },
  { type: 'error', inputs: [], name: 'OwnerQueryForNonexistentToken' },
  { type: 'error', inputs: [], name: 'TransferCallerNotOwnerNorApproved' },
  { type: 'error', inputs: [], name: 'TransferFromIncorrectOwner' },
  { type: 'error', inputs: [], name: 'TransferToNonERC721ReceiverImplementer' },
  { type: 'error', inputs: [], name: 'TransferToZeroAddress' },
  { type: 'error', inputs: [], name: 'URIQueryForNonexistentToken' },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'owner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'approved',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'tokenId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true,
      },
    ],
    name: 'Approval',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'owner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'operator',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      { name: 'approved', internalType: 'bool', type: 'bool', indexed: false },
    ],
    name: 'ApprovalForAll',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'previousOwner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'newOwner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
    ],
    name: 'OwnershipTransferred',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'from', internalType: 'address', type: 'address', indexed: true },
      { name: 'to', internalType: 'address', type: 'address', indexed: true },
      {
        name: 'tokenId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true,
      },
    ],
    name: 'Transfer',
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'MoonStaking',
    outputs: [
      { name: '', internalType: 'contract IMoonStaking', type: 'address' },
    ],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'PassNft',
    outputs: [
      { name: '', internalType: 'contract IMoonPass', type: 'address' },
    ],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [{ name: '_collection', internalType: 'address', type: 'address' }],
    name: 'addPartnerCollection',
    outputs: [],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: '', internalType: 'address', type: 'address' }],
    name: 'ambassadorClaimed',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'approve',
    outputs: [],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: 'owner', internalType: 'address', type: 'address' }],
    name: 'balanceOf',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'cost',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: 'tokenId', internalType: 'uint256', type: 'uint256' }],
    name: 'explicitOwnershipOf',
    outputs: [
      {
        name: '',
        internalType: 'struct IERC721A.TokenOwnership',
        type: 'tuple',
        components: [
          { name: 'addr', internalType: 'address', type: 'address' },
          { name: 'startTimestamp', internalType: 'uint64', type: 'uint64' },
          { name: 'burned', internalType: 'bool', type: 'bool' },
        ],
      },
    ],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [
      { name: 'tokenIds', internalType: 'uint256[]', type: 'uint256[]' },
    ],
    name: 'explicitOwnershipsOf',
    outputs: [
      {
        name: '',
        internalType: 'struct IERC721A.TokenOwnership[]',
        type: 'tuple[]',
        components: [
          { name: 'addr', internalType: 'address', type: 'address' },
          { name: 'startTimestamp', internalType: 'uint64', type: 'uint64' },
          { name: 'burned', internalType: 'bool', type: 'bool' },
        ],
      },
    ],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: 'tokenId', internalType: 'uint256', type: 'uint256' }],
    name: 'getApproved',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'getMintPhase',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'hiddenMetadataUri',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: '_2dTokenId', internalType: 'uint256', type: 'uint256' }],
    name: 'is2dMinted',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [
      { name: 'owner', internalType: 'address', type: 'address' },
      { name: 'operator', internalType: 'address', type: 'address' },
    ],
    name: 'isApprovedForAll',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
  },
  {
    stateMutability: 'payable',
    type: 'function',
    inputs: [
      { name: '_tokens', internalType: 'uint256[]', type: 'uint256[]' },
      { name: '_merkleProof', internalType: 'bytes32[]', type: 'bytes32[]' },
    ],
    name: 'limitedMatchedMint',
    outputs: [],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    name: 'match2dTo3d',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'payable',
    type: 'function',
    inputs: [
      { name: '_tokens', internalType: 'uint256[]', type: 'uint256[]' },
      { name: '_merkleProof', internalType: 'bytes32[]', type: 'bytes32[]' },
    ],
    name: 'matchedMint',
    outputs: [],
  },
  {
    stateMutability: 'payable',
    type: 'function',
    inputs: [
      { name: '_tokens', internalType: 'uint256[]', type: 'uint256[]' },
      { name: '_merkleProof', internalType: 'bytes32[]', type: 'bytes32[]' },
      { name: '_discountToken', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'matchedMintDicounted',
    outputs: [],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'matchedMintEnabled',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'maxMintAmountPerTx',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'maxMintAmountPerWallet',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'maxSupply',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'merkleRoot',
    outputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }],
  },
  {
    stateMutability: 'payable',
    type: 'function',
    inputs: [
      { name: '_mintAmount', internalType: 'uint256', type: 'uint256' },
      { name: '_discountToken', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'mint',
    outputs: [],
  },
  {
    stateMutability: 'payable',
    type: 'function',
    inputs: [{ name: '_mintAmount', internalType: 'uint256', type: 'uint256' }],
    name: 'mint',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: '_mintAmount', internalType: 'uint256', type: 'uint256' },
      { name: '_receiver', internalType: 'address', type: 'address' },
    ],
    name: 'mintForAddress',
    outputs: [],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'mintPhase',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    name: 'mintedGenesis',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'moonpassaddress',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'moonstakingaddress',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'name',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'owner',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: 'tokenId', internalType: 'uint256', type: 'uint256' }],
    name: 'ownerOf',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: '', internalType: 'address', type: 'address' }],
    name: 'partnerClaimed',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: '', internalType: 'address', type: 'address' }],
    name: 'partnerCollections',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
  },
  {
    stateMutability: 'payable',
    type: 'function',
    inputs: [
      { name: '_mintAmount', internalType: 'uint256', type: 'uint256' },
      { name: '_collection', internalType: 'address', type: 'address' },
    ],
    name: 'partnerMint',
    outputs: [],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'partnerMintEnabled',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'paused',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [{ name: '_collection', internalType: 'address', type: 'address' }],
    name: 'removePartnerCollection',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [],
    name: 'renounceOwnership',
    outputs: [],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'revealed',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    name: 'royalties',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [
      { name: '', internalType: 'uint256', type: 'uint256' },
      { name: '_salePrice', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'royaltyInfo',
    outputs: [
      { name: '', internalType: 'address', type: 'address' },
      { name: '', internalType: 'uint256', type: 'uint256' },
    ],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    name: 'royaltyLevels',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'from', internalType: 'address', type: 'address' },
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'safeTransferFrom',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'from', internalType: 'address', type: 'address' },
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
      { name: '_data', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'safeTransferFrom',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'operator', internalType: 'address', type: 'address' },
      { name: 'approved', internalType: 'bool', type: 'bool' },
    ],
    name: 'setApprovalForAll',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [{ name: '_cost', internalType: 'uint256', type: 'uint256' }],
    name: 'setCost',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: '_hiddenMetadataUri', internalType: 'string', type: 'string' },
    ],
    name: 'setHiddenMetadataUri',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [{ name: '_state', internalType: 'bool', type: 'bool' }],
    name: 'setMatchedMintEnabled',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: '_maxMintAmountPerTx', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'setMaxMintAmountPerTx',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      {
        name: '_maxMintAmountPerWallet',
        internalType: 'uint256',
        type: 'uint256',
      },
    ],
    name: 'setMaxMintAmountPerWallet',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [{ name: '_merkleRoot', internalType: 'bytes32', type: 'bytes32' }],
    name: 'setMerkleRoot',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [{ name: '_state', internalType: 'bool', type: 'bool' }],
    name: 'setPartnerMintEnabled',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [{ name: '_state', internalType: 'bool', type: 'bool' }],
    name: 'setPaused',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [{ name: '_state', internalType: 'bool', type: 'bool' }],
    name: 'setRevealed',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [{ name: '_uriPrefix', internalType: 'string', type: 'string' }],
    name: 'setUriPrefix',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [{ name: '_uriSuffix', internalType: 'string', type: 'string' }],
    name: 'setUriSuffix',
    outputs: [],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: '', internalType: 'address', type: 'address' }],
    name: 'staffClaimed',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [{ name: '_merkleRoot', internalType: 'bytes32', type: 'bytes32' }],
    name: 'startAmbassadorPhase',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [],
    name: 'startPartnerPhase',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [],
    name: 'startPublicPhase',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [{ name: '_merkleRoot', internalType: 'bytes32', type: 'bytes32' }],
    name: 'startSnapshot2Phase',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [{ name: '_merkleRoot', internalType: 'bytes32', type: 'bytes32' }],
    name: 'startSnapshotPhase',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [{ name: '_merkleRoot', internalType: 'bytes32', type: 'bytes32' }],
    name: 'startStaffPhase',
    outputs: [],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: 'interfaceId', internalType: 'bytes4', type: 'bytes4' }],
    name: 'supportsInterface',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'symbol',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: '_tokenId', internalType: 'uint256', type: 'uint256' }],
    name: 'tokenURI',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: 'owner', internalType: 'address', type: 'address' }],
    name: 'tokensOfOwner',
    outputs: [{ name: '', internalType: 'uint256[]', type: 'uint256[]' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [
      { name: 'owner', internalType: 'address', type: 'address' },
      { name: 'start', internalType: 'uint256', type: 'uint256' },
      { name: 'stop', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'tokensOfOwnerIn',
    outputs: [{ name: '', internalType: 'uint256[]', type: 'uint256[]' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'totalSupply',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'from', internalType: 'address', type: 'address' },
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'transferFrom',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [{ name: 'newOwner', internalType: 'address', type: 'address' }],
    name: 'transferOwnership',
    outputs: [],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'uriPrefix',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'uriSuffix',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [],
    name: 'withdraw',
    outputs: [],
  },
] as const

/**
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xbB4F46A8B194b9BfF013536Ff03B10F8D984c993)
 */
export const mal3dAddress = {
  11155111: '0xbB4F46A8B194b9BfF013536Ff03B10F8D984c993',
} as const

/**
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xbB4F46A8B194b9BfF013536Ff03B10F8D984c993)
 */
export const mal3dConfig = { address: mal3dAddress, abi: mal3dABI } as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// malog
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x0082F3387365e414512f06c4a587BbdC553c5049)
 */
export const malogABI = [
  { stateMutability: 'nonpayable', type: 'constructor', inputs: [] },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'owner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'approved',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'tokenId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true,
      },
    ],
    name: 'Approval',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'owner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'operator',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      { name: 'approved', internalType: 'bool', type: 'bool', indexed: false },
    ],
    name: 'ApprovalForAll',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'previousOwner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'newOwner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
    ],
    name: 'OwnershipTransferred',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'from', internalType: 'address', type: 'address', indexed: true },
      { name: 'to', internalType: 'address', type: 'address', indexed: true },
      {
        name: 'tokenId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true,
      },
    ],
    name: 'Transfer',
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'APE_PRICE',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'MAX_SUPPLY',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'MINTING_PAUSED',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'PASS_CONTRACT_ADDRESS',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'REVEALED',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'wl_addresses', internalType: 'address[]', type: 'address[]' },
    ],
    name: 'addWhitelisted',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'approve',
    outputs: [],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: 'owner', internalType: 'address', type: 'address' }],
    name: 'balanceOf',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: 'tokenId', internalType: 'uint256', type: 'uint256' }],
    name: 'getApproved',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: 'my_address', internalType: 'address', type: 'address' }],
    name: 'getTeamMemberBalance',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [
      { name: 'owner', internalType: 'address', type: 'address' },
      { name: 'operator', internalType: 'address', type: 'address' },
    ],
    name: 'isApprovedForAll',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
  },
  {
    stateMutability: 'payable',
    type: 'function',
    inputs: [
      { name: 'number_of_tokens', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'mintApe',
    outputs: [],
  },
  {
    stateMutability: 'payable',
    type: 'function',
    inputs: [
      { name: 'number_of_tokens', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'mintApeForWhitelisted',
    outputs: [],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'name',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'owner',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: 'tokenId', internalType: 'uint256', type: 'uint256' }],
    name: 'ownerOf',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [],
    name: 'pause',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [],
    name: 'renounceOwnership',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [{ name: 'baseURI', internalType: 'string', type: 'string' }],
    name: 'revealApes',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [{ name: 'to', internalType: 'address', type: 'address' }],
    name: 'safeMint',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'receivers', internalType: 'address[]', type: 'address[]' },
    ],
    name: 'safeMintMultiple',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'from', internalType: 'address', type: 'address' },
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'safeTransferFrom',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'from', internalType: 'address', type: 'address' },
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
      { name: '_data', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'safeTransferFrom',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'operator', internalType: 'address', type: 'address' },
      { name: 'approved', internalType: 'bool', type: 'bool' },
    ],
    name: 'setApprovalForAll',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: '_pass_address', internalType: 'address', type: 'address' },
    ],
    name: 'setPassContract',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [],
    name: 'startPublicSale',
    outputs: [],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: 'interfaceId', internalType: 'bytes4', type: 'bytes4' }],
    name: 'supportsInterface',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'symbol',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [],
    name: 'toggle',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: 'tokenId', internalType: 'uint256', type: 'uint256' }],
    name: 'tokenURI',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'totalSupply',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'from', internalType: 'address', type: 'address' },
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'transferFrom',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [{ name: 'newOwner', internalType: 'address', type: 'address' }],
    name: 'transferOwnership',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'ape_owners', internalType: 'address[]', type: 'address[]' },
      { name: 'qs', internalType: 'uint8[]', type: 'uint8[]' },
    ],
    name: 'transformToAddressesWithNum',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [],
    name: 'unpause',
    outputs: [],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'whitelist_sale',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'to_address', internalType: 'address payable', type: 'address' },
    ],
    name: 'withdraw',
    outputs: [],
  },
] as const

/**
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x0082F3387365e414512f06c4a587BbdC553c5049)
 */
export const malogAddress = {
  11155111: '0x0082F3387365e414512f06c4a587BbdC553c5049',
} as const

/**
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x0082F3387365e414512f06c4a587BbdC553c5049)
 */
export const malogConfig = { address: malogAddress, abi: malogABI } as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// malpass
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x8344BE53FB250dd76E65B6721B6553C21053Ee8d)
 */
export const malpassABI = [
  { stateMutability: 'nonpayable', type: 'constructor', inputs: [] },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'owner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'approved',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'tokenId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true,
      },
    ],
    name: 'Approval',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'owner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'operator',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      { name: 'approved', internalType: 'bool', type: 'bool', indexed: false },
    ],
    name: 'ApprovalForAll',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'previousOwner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'newOwner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
    ],
    name: 'OwnershipTransferred',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'account',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
    ],
    name: 'Paused',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'from', internalType: 'address', type: 'address', indexed: true },
      { name: 'to', internalType: 'address', type: 'address', indexed: true },
      {
        name: 'tokenId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true,
      },
    ],
    name: 'Transfer',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'account',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
    ],
    name: 'Unpaused',
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'APE_CONTRACT',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'MAX_FOR_ONE_ADDRESS_BLUE',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'MAX_FOR_ONE_ADDRESS_GOLD',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'MAX_FOR_ONE_ADDRESS_GREEN',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'MAX_SUPPLY_BLUE',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'MAX_SUPPLY_GOLD',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'MAX_SUPPLY_GREEN',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'MINTED_BLUE',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'MINTED_GOLD',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'MINTED_GREEN',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'PASS_PRICE_BLUE',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'PASS_PRICE_GOLD',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'PASS_PRICE_GREEN',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'PASS_VALUE_IN_APES_BLUE',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'PASS_VALUE_IN_APES_GOLD',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'PASS_VALUE_IN_APES_GREEN',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'RESERVED_GREEN',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'approve',
    outputs: [],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: 'owner', internalType: 'address', type: 'address' }],
    name: 'balanceOf',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [{ name: 'tokenId', internalType: 'uint256', type: 'uint256' }],
    name: 'burn',
    outputs: [],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: 'tokenId', internalType: 'uint256', type: 'uint256' }],
    name: 'getApproved',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
  },
  {
    stateMutability: 'payable',
    type: 'function',
    inputs: [
      { name: 'quantity', internalType: 'uint256', type: 'uint256' },
      { name: '_pass_type', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'get_pass',
    outputs: [],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [
      { name: 'owner', internalType: 'address', type: 'address' },
      { name: 'operator', internalType: 'address', type: 'address' },
    ],
    name: 'isApprovedForAll',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: '_pass_type', internalType: 'uint256', type: 'uint256' }],
    name: 'myBalance',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'name',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'owner',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: 'tokenId', internalType: 'uint256', type: 'uint256' }],
    name: 'ownerOf',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: '_tokenId', internalType: 'uint256', type: 'uint256' }],
    name: 'pass_value_in_apes',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [],
    name: 'pause',
    outputs: [],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'paused',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [],
    name: 'renounceOwnership',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'quantity', internalType: 'uint256', type: 'uint256' },
      { name: '_pass_type', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'reservePasses',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'from', internalType: 'address', type: 'address' },
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'safeTransferFrom',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'from', internalType: 'address', type: 'address' },
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
      { name: '_data', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'safeTransferFrom',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      {
        name: 'ape_contract_address',
        internalType: 'address',
        type: 'address',
      },
    ],
    name: 'setApeContract',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'operator', internalType: 'address', type: 'address' },
      { name: 'approved', internalType: 'bool', type: 'bool' },
    ],
    name: 'setApprovalForAll',
    outputs: [],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: 'interfaceId', internalType: 'bytes4', type: 'bytes4' }],
    name: 'supportsInterface',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'symbol',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: 'my_address', internalType: 'address', type: 'address' }],
    name: 'team_get_percentage',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: 'my_address', internalType: 'address', type: 'address' }],
    name: 'team_get_share_balance',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: 'index', internalType: 'uint256', type: 'uint256' }],
    name: 'tokenByIndex',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [
      { name: 'owner', internalType: 'address', type: 'address' },
      { name: 'index', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'tokenOfOwnerByIndex',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: 'tokenId', internalType: 'uint256', type: 'uint256' }],
    name: 'tokenURI',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'totalSupply',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'from', internalType: 'address', type: 'address' },
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'transferFrom',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [{ name: 'newOwner', internalType: 'address', type: 'address' }],
    name: 'transferOwnership',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [],
    name: 'unpause',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'to_address', internalType: 'address payable', type: 'address' },
    ],
    name: 'withdraw',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
  },
] as const

/**
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x8344BE53FB250dd76E65B6721B6553C21053Ee8d)
 */
export const malpassAddress = {
  11155111: '0x8344BE53FB250dd76E65B6721B6553C21053Ee8d',
} as const

/**
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x8344BE53FB250dd76E65B6721B6553C21053Ee8d)
 */
export const malpassConfig = {
  address: malpassAddress,
  abi: malpassABI,
} as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// malstaking
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xD78466a0F030Dd8D95CfFe33F867e436Ef5DC167)
 */
export const malstakingABI = [
  {
    stateMutability: 'nonpayable',
    type: 'constructor',
    inputs: [{ name: '_ape', internalType: 'address', type: 'address' }],
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'staker',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'apesAmount',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'AddLootToStakedApes',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'receiver',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'tokenAddress',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'tokenId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true,
      },
    ],
    name: 'ForceWithdraw721',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'previousOwner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'newOwner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
    ],
    name: 'OwnershipTransferred',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'staker',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'lootsAmount',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'RemoveLootFromStakedApes',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'staker',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'contractAddress',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
      {
        name: 'tokensAmount',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'Stake721',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'staker',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'apesAmount',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'StakeApesWithLoots',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'staker',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'numberOfPetIds',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'StakePets',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'staker',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'contractAddress',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
      {
        name: 'tokensAmount',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'Unstake721',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'staker',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'numberOfPetIds',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'UnstakePets',
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'ApeNft',
    outputs: [{ name: '', internalType: 'contract IERC721', type: 'address' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'BreedingNft',
    outputs: [{ name: '', internalType: 'contract IERC721', type: 'address' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'LootNft',
    outputs: [{ name: '', internalType: 'contract IERC721', type: 'address' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'PetNft',
    outputs: [{ name: '', internalType: 'contract IERC1155', type: 'address' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'SECONDS_IN_DAY',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'TreasuryNft',
    outputs: [{ name: '', internalType: 'contract IERC721', type: 'address' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: '', internalType: 'address', type: 'address' }],
    name: '_baseRates',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'apeIds', internalType: 'uint256[]', type: 'uint256[]' },
      { name: 'lootIds', internalType: 'uint256[]', type: 'uint256[]' },
    ],
    name: 'addLootToStakedApes',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [{ name: 'toAuth', internalType: 'address', type: 'address' }],
    name: 'authorise',
    outputs: [],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    name: 'authorisedLog',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: 'user', internalType: 'address', type: 'address' }],
    name: 'balanceOf',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'depositPaused',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'tokenAddress', internalType: 'address', type: 'address' },
      { name: 'tokenIds', internalType: 'uint256[]', type: 'uint256[]' },
    ],
    name: 'forceWithdraw721',
    outputs: [],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: 'staker', internalType: 'address', type: 'address' }],
    name: 'getAccumulatedAmount',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [
      { name: 'apeId', internalType: 'uint256', type: 'uint256' },
      { name: 'lootId', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'getApeLootTokenYield',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: 'staker', internalType: 'address', type: 'address' }],
    name: 'getCurrentReward',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [
      { name: 'petId', internalType: 'uint256', type: 'uint256' },
      { name: 'amount', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'getPetTokenYield',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: 'staker', internalType: 'address', type: 'address' }],
    name: 'getStakerNFT',
    outputs: [
      { name: '', internalType: 'uint256[]', type: 'uint256[]' },
      { name: '', internalType: 'uint256[]', type: 'uint256[]' },
      { name: '', internalType: 'uint256[]', type: 'uint256[]' },
      { name: '', internalType: 'uint256[]', type: 'uint256[]' },
      { name: '', internalType: 'uint256[]', type: 'uint256[]' },
    ],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: 'staker', internalType: 'address', type: 'address' }],
    name: 'getStakerYield',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [
      { name: 'contractAddress', internalType: 'address', type: 'address' },
      { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'getTokenYield',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [],
    name: 'launchStaking',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: '', internalType: 'address', type: 'address' },
      { name: '', internalType: 'address', type: 'address' },
      { name: '', internalType: 'uint256[]', type: 'uint256[]' },
      { name: '', internalType: 'uint256[]', type: 'uint256[]' },
      { name: '', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'onERC1155BatchReceived',
    outputs: [{ name: '', internalType: 'bytes4', type: 'bytes4' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: '', internalType: 'address', type: 'address' },
      { name: '', internalType: 'address', type: 'address' },
      { name: '', internalType: 'uint256', type: 'uint256' },
      { name: '', internalType: 'uint256', type: 'uint256' },
      { name: '', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'onERC1155Received',
    outputs: [{ name: '', internalType: 'bytes4', type: 'bytes4' }],
  },
  {
    stateMutability: 'pure',
    type: 'function',
    inputs: [
      { name: '', internalType: 'address', type: 'address' },
      { name: '', internalType: 'address', type: 'address' },
      { name: '', internalType: 'uint256', type: 'uint256' },
      { name: '', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'onERC721Received',
    outputs: [{ name: '', internalType: 'bytes4', type: 'bytes4' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'owner',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [
      { name: 'contractAddress', internalType: 'address', type: 'address' },
      { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'ownerOf',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [{ name: '_pause', internalType: 'bool', type: 'bool' }],
    name: 'pauseDeposit',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [{ name: 'apeIds', internalType: 'uint256[]', type: 'uint256[]' }],
    name: 'removeLootFromStakedApes',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [],
    name: 'renounceOwnership',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: '_breeding', internalType: 'address', type: 'address' },
      { name: '_baseReward', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'setBREEDING',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'contractAddress', internalType: 'address', type: 'address' },
      { name: 'tokenIds', internalType: 'uint256[]', type: 'uint256[]' },
      { name: 'rates', internalType: 'uint256[]', type: 'uint256[]' },
    ],
    name: 'setIndividualRates',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: '_loot', internalType: 'address', type: 'address' },
      { name: '_baseBoost', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'setLOOTContract',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: '_pet', internalType: 'address', type: 'address' },
      { name: '_baseReward', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'setPETContract',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: '_treasury', internalType: 'address', type: 'address' },
      { name: '_baseReward', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'setTREASURYContract',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'tokenIds', internalType: 'uint256[]', type: 'uint256[]' },
      { name: 'amounts', internalType: 'uint256[]', type: 'uint256[]' },
    ],
    name: 'stake1155',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'contractAddress', internalType: 'address', type: 'address' },
      { name: 'tokenIds', internalType: 'uint256[]', type: 'uint256[]' },
    ],
    name: 'stake721',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'apeIds', internalType: 'uint256[]', type: 'uint256[]' },
      { name: 'lootIds', internalType: 'uint256[]', type: 'uint256[]' },
    ],
    name: 'stakeApesWithLoots',
    outputs: [],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'stakingLaunched',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: 'interfaceId', internalType: 'bytes4', type: 'bytes4' }],
    name: 'supportsInterface',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [{ name: 'newOwner', internalType: 'address', type: 'address' }],
    name: 'transferOwnership',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'addressToUnAuth', internalType: 'address', type: 'address' },
    ],
    name: 'unauthorise',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'tokenIds', internalType: 'uint256[]', type: 'uint256[]' },
    ],
    name: 'unstake1155',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'contractAddress', internalType: 'address', type: 'address' },
      { name: 'tokenIds', internalType: 'uint256[]', type: 'uint256[]' },
    ],
    name: 'unstake721',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: '_contract', internalType: 'address', type: 'address' },
      { name: '_yield', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'updateBaseYield',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [],
    name: 'withdrawETH',
    outputs: [],
  },
] as const

/**
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xD78466a0F030Dd8D95CfFe33F867e436Ef5DC167)
 */
export const malstakingAddress = {
  11155111: '0xD78466a0F030Dd8D95CfFe33F867e436Ef5DC167',
} as const

/**
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xD78466a0F030Dd8D95CfFe33F867e436Ef5DC167)
 */
export const malstakingConfig = {
  address: malstakingAddress,
  abi: malstakingABI,
} as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// malstakingS2
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x8d10861Cd2BddE665110eAF12Dd0490215F30eE6)
 */
export const malstakingS2ABI = [
  {
    stateMutability: 'nonpayable',
    type: 'constructor',
    inputs: [
      { name: '_genesis', internalType: 'address', type: 'address' },
      { name: '_mooonstakings1', internalType: 'address', type: 'address' },
    ],
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'receiver',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'tokenAddress',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'tokenId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true,
      },
    ],
    name: 'ForceWithdraw721',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'previousOwner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'newOwner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
    ],
    name: 'OwnershipTransferred',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'staker',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'contractAddress',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
      {
        name: 'tokensAmount',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'Stake721',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'staker',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'contractAddress',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
      {
        name: 'tokensAmount',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'Unstake721',
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'DekuNFT',
    outputs: [{ name: '', internalType: 'contract IERC721', type: 'address' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'GenesisNFT',
    outputs: [{ name: '', internalType: 'contract IERC721', type: 'address' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'MoonStakingS1',
    outputs: [
      { name: '', internalType: 'contract IMoonStaking', type: 'address' },
    ],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'MutantNFT',
    outputs: [{ name: '', internalType: 'contract IERC721', type: 'address' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'SECONDS_IN_DAY',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: '', internalType: 'address', type: 'address' }],
    name: '_baseRates',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [{ name: 'toAuth', internalType: 'address', type: 'address' }],
    name: 'authorise',
    outputs: [],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    name: 'authorisedLog',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: 'user', internalType: 'address', type: 'address' }],
    name: 'balanceOf',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'depositPaused',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'tokenAddress', internalType: 'address', type: 'address' },
      { name: 'tokenIds', internalType: 'uint256[]', type: 'uint256[]' },
    ],
    name: 'forceWithdraw721',
    outputs: [],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'genesisOwnershipRequired',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: 'staker', internalType: 'address', type: 'address' }],
    name: 'getAccumulatedAmount',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: 'staker', internalType: 'address', type: 'address' }],
    name: 'getCurrentReward',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: 'dekuId', internalType: 'uint256', type: 'uint256' }],
    name: 'getDekuYield',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: 'genesisId', internalType: 'uint256', type: 'uint256' }],
    name: 'getGenesisYield',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: 'mutantId', internalType: 'uint256', type: 'uint256' }],
    name: 'getMutantsYield',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: 'staker', internalType: 'address', type: 'address' }],
    name: 'getStakerNFT',
    outputs: [
      { name: '', internalType: 'uint256[]', type: 'uint256[]' },
      { name: '', internalType: 'uint256[]', type: 'uint256[]' },
      { name: '', internalType: 'uint256[]', type: 'uint256[]' },
      { name: '', internalType: 'uint256[]', type: 'uint256[]' },
    ],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: 'staker', internalType: 'address', type: 'address' }],
    name: 'getStakerYield',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [
      { name: 'contractAddress', internalType: 'address', type: 'address' },
      { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'getTokenYield',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [],
    name: 'launchStaking',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: '', internalType: 'address', type: 'address' },
      { name: '', internalType: 'address', type: 'address' },
      { name: '', internalType: 'uint256', type: 'uint256' },
      { name: '', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'onERC721Received',
    outputs: [{ name: '', internalType: 'bytes4', type: 'bytes4' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'owner',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [
      { name: 'contractAddress', internalType: 'address', type: 'address' },
      { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'ownerOf',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [{ name: '_pause', internalType: 'bool', type: 'bool' }],
    name: 'pauseDeposit',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [],
    name: 'renounceOwnership',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: '_deku', internalType: 'address', type: 'address' },
      { name: '_baseReward', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'setDEKUContract',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [{ name: '_newvalue', internalType: 'bool', type: 'bool' }],
    name: 'setGenesisOwnershipRequired',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'contractAddress', internalType: 'address', type: 'address' },
      { name: 'tokenIds', internalType: 'uint256[]', type: 'uint256[]' },
      { name: 'rates', internalType: 'uint256[]', type: 'uint256[]' },
    ],
    name: 'setIndividualRates',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: '_mutant', internalType: 'address', type: 'address' },
      { name: '_mutantrewards', internalType: 'uint256[]', type: 'uint256[]' },
    ],
    name: 'setMUTANTContract',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'contractAddress', internalType: 'address', type: 'address' },
      { name: 'tokenIds', internalType: 'uint256[]', type: 'uint256[]' },
    ],
    name: 'stake721',
    outputs: [],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'stakingLaunched',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'startTimestamp',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [{ name: 'newOwner', internalType: 'address', type: 'address' }],
    name: 'transferOwnership',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'addressToUnAuth', internalType: 'address', type: 'address' },
    ],
    name: 'unauthorise',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'contractAddress', internalType: 'address', type: 'address' },
      { name: 'tokenIds', internalType: 'uint256[]', type: 'uint256[]' },
    ],
    name: 'unstake721',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [{ name: 'staker', internalType: 'address', type: 'address' }],
    name: 'updateAccumulatedAmount',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: '_contract', internalType: 'address', type: 'address' },
      { name: '_yield', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'updateBaseYield',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [],
    name: 'withdrawETH',
    outputs: [],
  },
] as const

/**
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x8d10861Cd2BddE665110eAF12Dd0490215F30eE6)
 */
export const malstakingS2Address = {
  11155111: '0x8d10861Cd2BddE665110eAF12Dd0490215F30eE6',
} as const

/**
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x8d10861Cd2BddE665110eAF12Dd0490215F30eE6)
 */
export const malstakingS2Config = {
  address: malstakingS2Address,
  abi: malstakingS2ABI,
} as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// React
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link mal3dABI}__.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xbB4F46A8B194b9BfF013536Ff03B10F8D984c993)
 */
export function useMal3dRead<
  TFunctionName extends string,
  TSelectData = ReadContractResult<typeof mal3dABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof mal3dABI, TFunctionName, TSelectData>,
    'abi' | 'address'
  > & { chainId?: keyof typeof mal3dAddress } = {} as any,
) {
  return useContractRead({
    abi: mal3dABI,
    address: mal3dAddress[11155111],
    ...config,
  } as UseContractReadConfig<typeof mal3dABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link mal3dABI}__ and `functionName` set to `"MoonStaking"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xbB4F46A8B194b9BfF013536Ff03B10F8D984c993)
 */
export function useMal3dMoonStaking<
  TFunctionName extends 'MoonStaking',
  TSelectData = ReadContractResult<typeof mal3dABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof mal3dABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof mal3dAddress } = {} as any,
) {
  return useContractRead({
    abi: mal3dABI,
    address: mal3dAddress[11155111],
    functionName: 'MoonStaking',
    ...config,
  } as UseContractReadConfig<typeof mal3dABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link mal3dABI}__ and `functionName` set to `"PassNft"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xbB4F46A8B194b9BfF013536Ff03B10F8D984c993)
 */
export function useMal3dPassNft<
  TFunctionName extends 'PassNft',
  TSelectData = ReadContractResult<typeof mal3dABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof mal3dABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof mal3dAddress } = {} as any,
) {
  return useContractRead({
    abi: mal3dABI,
    address: mal3dAddress[11155111],
    functionName: 'PassNft',
    ...config,
  } as UseContractReadConfig<typeof mal3dABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link mal3dABI}__ and `functionName` set to `"ambassadorClaimed"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xbB4F46A8B194b9BfF013536Ff03B10F8D984c993)
 */
export function useMal3dAmbassadorClaimed<
  TFunctionName extends 'ambassadorClaimed',
  TSelectData = ReadContractResult<typeof mal3dABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof mal3dABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof mal3dAddress } = {} as any,
) {
  return useContractRead({
    abi: mal3dABI,
    address: mal3dAddress[11155111],
    functionName: 'ambassadorClaimed',
    ...config,
  } as UseContractReadConfig<typeof mal3dABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link mal3dABI}__ and `functionName` set to `"balanceOf"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xbB4F46A8B194b9BfF013536Ff03B10F8D984c993)
 */
export function useMal3dBalanceOf<
  TFunctionName extends 'balanceOf',
  TSelectData = ReadContractResult<typeof mal3dABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof mal3dABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof mal3dAddress } = {} as any,
) {
  return useContractRead({
    abi: mal3dABI,
    address: mal3dAddress[11155111],
    functionName: 'balanceOf',
    ...config,
  } as UseContractReadConfig<typeof mal3dABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link mal3dABI}__ and `functionName` set to `"cost"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xbB4F46A8B194b9BfF013536Ff03B10F8D984c993)
 */
export function useMal3dCost<
  TFunctionName extends 'cost',
  TSelectData = ReadContractResult<typeof mal3dABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof mal3dABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof mal3dAddress } = {} as any,
) {
  return useContractRead({
    abi: mal3dABI,
    address: mal3dAddress[11155111],
    functionName: 'cost',
    ...config,
  } as UseContractReadConfig<typeof mal3dABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link mal3dABI}__ and `functionName` set to `"explicitOwnershipOf"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xbB4F46A8B194b9BfF013536Ff03B10F8D984c993)
 */
export function useMal3dExplicitOwnershipOf<
  TFunctionName extends 'explicitOwnershipOf',
  TSelectData = ReadContractResult<typeof mal3dABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof mal3dABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof mal3dAddress } = {} as any,
) {
  return useContractRead({
    abi: mal3dABI,
    address: mal3dAddress[11155111],
    functionName: 'explicitOwnershipOf',
    ...config,
  } as UseContractReadConfig<typeof mal3dABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link mal3dABI}__ and `functionName` set to `"explicitOwnershipsOf"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xbB4F46A8B194b9BfF013536Ff03B10F8D984c993)
 */
export function useMal3dExplicitOwnershipsOf<
  TFunctionName extends 'explicitOwnershipsOf',
  TSelectData = ReadContractResult<typeof mal3dABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof mal3dABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof mal3dAddress } = {} as any,
) {
  return useContractRead({
    abi: mal3dABI,
    address: mal3dAddress[11155111],
    functionName: 'explicitOwnershipsOf',
    ...config,
  } as UseContractReadConfig<typeof mal3dABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link mal3dABI}__ and `functionName` set to `"getApproved"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xbB4F46A8B194b9BfF013536Ff03B10F8D984c993)
 */
export function useMal3dGetApproved<
  TFunctionName extends 'getApproved',
  TSelectData = ReadContractResult<typeof mal3dABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof mal3dABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof mal3dAddress } = {} as any,
) {
  return useContractRead({
    abi: mal3dABI,
    address: mal3dAddress[11155111],
    functionName: 'getApproved',
    ...config,
  } as UseContractReadConfig<typeof mal3dABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link mal3dABI}__ and `functionName` set to `"getMintPhase"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xbB4F46A8B194b9BfF013536Ff03B10F8D984c993)
 */
export function useMal3dGetMintPhase<
  TFunctionName extends 'getMintPhase',
  TSelectData = ReadContractResult<typeof mal3dABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof mal3dABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof mal3dAddress } = {} as any,
) {
  return useContractRead({
    abi: mal3dABI,
    address: mal3dAddress[11155111],
    functionName: 'getMintPhase',
    ...config,
  } as UseContractReadConfig<typeof mal3dABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link mal3dABI}__ and `functionName` set to `"hiddenMetadataUri"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xbB4F46A8B194b9BfF013536Ff03B10F8D984c993)
 */
export function useMal3dHiddenMetadataUri<
  TFunctionName extends 'hiddenMetadataUri',
  TSelectData = ReadContractResult<typeof mal3dABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof mal3dABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof mal3dAddress } = {} as any,
) {
  return useContractRead({
    abi: mal3dABI,
    address: mal3dAddress[11155111],
    functionName: 'hiddenMetadataUri',
    ...config,
  } as UseContractReadConfig<typeof mal3dABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link mal3dABI}__ and `functionName` set to `"is2dMinted"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xbB4F46A8B194b9BfF013536Ff03B10F8D984c993)
 */
export function useMal3dIs2dMinted<
  TFunctionName extends 'is2dMinted',
  TSelectData = ReadContractResult<typeof mal3dABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof mal3dABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof mal3dAddress } = {} as any,
) {
  return useContractRead({
    abi: mal3dABI,
    address: mal3dAddress[11155111],
    functionName: 'is2dMinted',
    ...config,
  } as UseContractReadConfig<typeof mal3dABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link mal3dABI}__ and `functionName` set to `"isApprovedForAll"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xbB4F46A8B194b9BfF013536Ff03B10F8D984c993)
 */
export function useMal3dIsApprovedForAll<
  TFunctionName extends 'isApprovedForAll',
  TSelectData = ReadContractResult<typeof mal3dABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof mal3dABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof mal3dAddress } = {} as any,
) {
  return useContractRead({
    abi: mal3dABI,
    address: mal3dAddress[11155111],
    functionName: 'isApprovedForAll',
    ...config,
  } as UseContractReadConfig<typeof mal3dABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link mal3dABI}__ and `functionName` set to `"match2dTo3d"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xbB4F46A8B194b9BfF013536Ff03B10F8D984c993)
 */
export function useMal3dMatch2dTo3d<
  TFunctionName extends 'match2dTo3d',
  TSelectData = ReadContractResult<typeof mal3dABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof mal3dABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof mal3dAddress } = {} as any,
) {
  return useContractRead({
    abi: mal3dABI,
    address: mal3dAddress[11155111],
    functionName: 'match2dTo3d',
    ...config,
  } as UseContractReadConfig<typeof mal3dABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link mal3dABI}__ and `functionName` set to `"matchedMintEnabled"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xbB4F46A8B194b9BfF013536Ff03B10F8D984c993)
 */
export function useMal3dMatchedMintEnabled<
  TFunctionName extends 'matchedMintEnabled',
  TSelectData = ReadContractResult<typeof mal3dABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof mal3dABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof mal3dAddress } = {} as any,
) {
  return useContractRead({
    abi: mal3dABI,
    address: mal3dAddress[11155111],
    functionName: 'matchedMintEnabled',
    ...config,
  } as UseContractReadConfig<typeof mal3dABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link mal3dABI}__ and `functionName` set to `"maxMintAmountPerTx"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xbB4F46A8B194b9BfF013536Ff03B10F8D984c993)
 */
export function useMal3dMaxMintAmountPerTx<
  TFunctionName extends 'maxMintAmountPerTx',
  TSelectData = ReadContractResult<typeof mal3dABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof mal3dABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof mal3dAddress } = {} as any,
) {
  return useContractRead({
    abi: mal3dABI,
    address: mal3dAddress[11155111],
    functionName: 'maxMintAmountPerTx',
    ...config,
  } as UseContractReadConfig<typeof mal3dABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link mal3dABI}__ and `functionName` set to `"maxMintAmountPerWallet"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xbB4F46A8B194b9BfF013536Ff03B10F8D984c993)
 */
export function useMal3dMaxMintAmountPerWallet<
  TFunctionName extends 'maxMintAmountPerWallet',
  TSelectData = ReadContractResult<typeof mal3dABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof mal3dABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof mal3dAddress } = {} as any,
) {
  return useContractRead({
    abi: mal3dABI,
    address: mal3dAddress[11155111],
    functionName: 'maxMintAmountPerWallet',
    ...config,
  } as UseContractReadConfig<typeof mal3dABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link mal3dABI}__ and `functionName` set to `"maxSupply"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xbB4F46A8B194b9BfF013536Ff03B10F8D984c993)
 */
export function useMal3dMaxSupply<
  TFunctionName extends 'maxSupply',
  TSelectData = ReadContractResult<typeof mal3dABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof mal3dABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof mal3dAddress } = {} as any,
) {
  return useContractRead({
    abi: mal3dABI,
    address: mal3dAddress[11155111],
    functionName: 'maxSupply',
    ...config,
  } as UseContractReadConfig<typeof mal3dABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link mal3dABI}__ and `functionName` set to `"merkleRoot"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xbB4F46A8B194b9BfF013536Ff03B10F8D984c993)
 */
export function useMal3dMerkleRoot<
  TFunctionName extends 'merkleRoot',
  TSelectData = ReadContractResult<typeof mal3dABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof mal3dABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof mal3dAddress } = {} as any,
) {
  return useContractRead({
    abi: mal3dABI,
    address: mal3dAddress[11155111],
    functionName: 'merkleRoot',
    ...config,
  } as UseContractReadConfig<typeof mal3dABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link mal3dABI}__ and `functionName` set to `"mintPhase"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xbB4F46A8B194b9BfF013536Ff03B10F8D984c993)
 */
export function useMal3dMintPhase<
  TFunctionName extends 'mintPhase',
  TSelectData = ReadContractResult<typeof mal3dABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof mal3dABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof mal3dAddress } = {} as any,
) {
  return useContractRead({
    abi: mal3dABI,
    address: mal3dAddress[11155111],
    functionName: 'mintPhase',
    ...config,
  } as UseContractReadConfig<typeof mal3dABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link mal3dABI}__ and `functionName` set to `"mintedGenesis"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xbB4F46A8B194b9BfF013536Ff03B10F8D984c993)
 */
export function useMal3dMintedGenesis<
  TFunctionName extends 'mintedGenesis',
  TSelectData = ReadContractResult<typeof mal3dABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof mal3dABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof mal3dAddress } = {} as any,
) {
  return useContractRead({
    abi: mal3dABI,
    address: mal3dAddress[11155111],
    functionName: 'mintedGenesis',
    ...config,
  } as UseContractReadConfig<typeof mal3dABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link mal3dABI}__ and `functionName` set to `"moonpassaddress"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xbB4F46A8B194b9BfF013536Ff03B10F8D984c993)
 */
export function useMal3dMoonpassaddress<
  TFunctionName extends 'moonpassaddress',
  TSelectData = ReadContractResult<typeof mal3dABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof mal3dABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof mal3dAddress } = {} as any,
) {
  return useContractRead({
    abi: mal3dABI,
    address: mal3dAddress[11155111],
    functionName: 'moonpassaddress',
    ...config,
  } as UseContractReadConfig<typeof mal3dABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link mal3dABI}__ and `functionName` set to `"moonstakingaddress"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xbB4F46A8B194b9BfF013536Ff03B10F8D984c993)
 */
export function useMal3dMoonstakingaddress<
  TFunctionName extends 'moonstakingaddress',
  TSelectData = ReadContractResult<typeof mal3dABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof mal3dABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof mal3dAddress } = {} as any,
) {
  return useContractRead({
    abi: mal3dABI,
    address: mal3dAddress[11155111],
    functionName: 'moonstakingaddress',
    ...config,
  } as UseContractReadConfig<typeof mal3dABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link mal3dABI}__ and `functionName` set to `"name"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xbB4F46A8B194b9BfF013536Ff03B10F8D984c993)
 */
export function useMal3dName<
  TFunctionName extends 'name',
  TSelectData = ReadContractResult<typeof mal3dABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof mal3dABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof mal3dAddress } = {} as any,
) {
  return useContractRead({
    abi: mal3dABI,
    address: mal3dAddress[11155111],
    functionName: 'name',
    ...config,
  } as UseContractReadConfig<typeof mal3dABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link mal3dABI}__ and `functionName` set to `"owner"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xbB4F46A8B194b9BfF013536Ff03B10F8D984c993)
 */
export function useMal3dOwner<
  TFunctionName extends 'owner',
  TSelectData = ReadContractResult<typeof mal3dABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof mal3dABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof mal3dAddress } = {} as any,
) {
  return useContractRead({
    abi: mal3dABI,
    address: mal3dAddress[11155111],
    functionName: 'owner',
    ...config,
  } as UseContractReadConfig<typeof mal3dABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link mal3dABI}__ and `functionName` set to `"ownerOf"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xbB4F46A8B194b9BfF013536Ff03B10F8D984c993)
 */
export function useMal3dOwnerOf<
  TFunctionName extends 'ownerOf',
  TSelectData = ReadContractResult<typeof mal3dABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof mal3dABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof mal3dAddress } = {} as any,
) {
  return useContractRead({
    abi: mal3dABI,
    address: mal3dAddress[11155111],
    functionName: 'ownerOf',
    ...config,
  } as UseContractReadConfig<typeof mal3dABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link mal3dABI}__ and `functionName` set to `"partnerClaimed"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xbB4F46A8B194b9BfF013536Ff03B10F8D984c993)
 */
export function useMal3dPartnerClaimed<
  TFunctionName extends 'partnerClaimed',
  TSelectData = ReadContractResult<typeof mal3dABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof mal3dABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof mal3dAddress } = {} as any,
) {
  return useContractRead({
    abi: mal3dABI,
    address: mal3dAddress[11155111],
    functionName: 'partnerClaimed',
    ...config,
  } as UseContractReadConfig<typeof mal3dABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link mal3dABI}__ and `functionName` set to `"partnerCollections"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xbB4F46A8B194b9BfF013536Ff03B10F8D984c993)
 */
export function useMal3dPartnerCollections<
  TFunctionName extends 'partnerCollections',
  TSelectData = ReadContractResult<typeof mal3dABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof mal3dABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof mal3dAddress } = {} as any,
) {
  return useContractRead({
    abi: mal3dABI,
    address: mal3dAddress[11155111],
    functionName: 'partnerCollections',
    ...config,
  } as UseContractReadConfig<typeof mal3dABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link mal3dABI}__ and `functionName` set to `"partnerMintEnabled"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xbB4F46A8B194b9BfF013536Ff03B10F8D984c993)
 */
export function useMal3dPartnerMintEnabled<
  TFunctionName extends 'partnerMintEnabled',
  TSelectData = ReadContractResult<typeof mal3dABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof mal3dABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof mal3dAddress } = {} as any,
) {
  return useContractRead({
    abi: mal3dABI,
    address: mal3dAddress[11155111],
    functionName: 'partnerMintEnabled',
    ...config,
  } as UseContractReadConfig<typeof mal3dABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link mal3dABI}__ and `functionName` set to `"paused"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xbB4F46A8B194b9BfF013536Ff03B10F8D984c993)
 */
export function useMal3dPaused<
  TFunctionName extends 'paused',
  TSelectData = ReadContractResult<typeof mal3dABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof mal3dABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof mal3dAddress } = {} as any,
) {
  return useContractRead({
    abi: mal3dABI,
    address: mal3dAddress[11155111],
    functionName: 'paused',
    ...config,
  } as UseContractReadConfig<typeof mal3dABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link mal3dABI}__ and `functionName` set to `"revealed"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xbB4F46A8B194b9BfF013536Ff03B10F8D984c993)
 */
export function useMal3dRevealed<
  TFunctionName extends 'revealed',
  TSelectData = ReadContractResult<typeof mal3dABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof mal3dABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof mal3dAddress } = {} as any,
) {
  return useContractRead({
    abi: mal3dABI,
    address: mal3dAddress[11155111],
    functionName: 'revealed',
    ...config,
  } as UseContractReadConfig<typeof mal3dABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link mal3dABI}__ and `functionName` set to `"royalties"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xbB4F46A8B194b9BfF013536Ff03B10F8D984c993)
 */
export function useMal3dRoyalties<
  TFunctionName extends 'royalties',
  TSelectData = ReadContractResult<typeof mal3dABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof mal3dABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof mal3dAddress } = {} as any,
) {
  return useContractRead({
    abi: mal3dABI,
    address: mal3dAddress[11155111],
    functionName: 'royalties',
    ...config,
  } as UseContractReadConfig<typeof mal3dABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link mal3dABI}__ and `functionName` set to `"royaltyInfo"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xbB4F46A8B194b9BfF013536Ff03B10F8D984c993)
 */
export function useMal3dRoyaltyInfo<
  TFunctionName extends 'royaltyInfo',
  TSelectData = ReadContractResult<typeof mal3dABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof mal3dABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof mal3dAddress } = {} as any,
) {
  return useContractRead({
    abi: mal3dABI,
    address: mal3dAddress[11155111],
    functionName: 'royaltyInfo',
    ...config,
  } as UseContractReadConfig<typeof mal3dABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link mal3dABI}__ and `functionName` set to `"royaltyLevels"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xbB4F46A8B194b9BfF013536Ff03B10F8D984c993)
 */
export function useMal3dRoyaltyLevels<
  TFunctionName extends 'royaltyLevels',
  TSelectData = ReadContractResult<typeof mal3dABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof mal3dABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof mal3dAddress } = {} as any,
) {
  return useContractRead({
    abi: mal3dABI,
    address: mal3dAddress[11155111],
    functionName: 'royaltyLevels',
    ...config,
  } as UseContractReadConfig<typeof mal3dABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link mal3dABI}__ and `functionName` set to `"staffClaimed"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xbB4F46A8B194b9BfF013536Ff03B10F8D984c993)
 */
export function useMal3dStaffClaimed<
  TFunctionName extends 'staffClaimed',
  TSelectData = ReadContractResult<typeof mal3dABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof mal3dABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof mal3dAddress } = {} as any,
) {
  return useContractRead({
    abi: mal3dABI,
    address: mal3dAddress[11155111],
    functionName: 'staffClaimed',
    ...config,
  } as UseContractReadConfig<typeof mal3dABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link mal3dABI}__ and `functionName` set to `"supportsInterface"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xbB4F46A8B194b9BfF013536Ff03B10F8D984c993)
 */
export function useMal3dSupportsInterface<
  TFunctionName extends 'supportsInterface',
  TSelectData = ReadContractResult<typeof mal3dABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof mal3dABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof mal3dAddress } = {} as any,
) {
  return useContractRead({
    abi: mal3dABI,
    address: mal3dAddress[11155111],
    functionName: 'supportsInterface',
    ...config,
  } as UseContractReadConfig<typeof mal3dABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link mal3dABI}__ and `functionName` set to `"symbol"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xbB4F46A8B194b9BfF013536Ff03B10F8D984c993)
 */
export function useMal3dSymbol<
  TFunctionName extends 'symbol',
  TSelectData = ReadContractResult<typeof mal3dABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof mal3dABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof mal3dAddress } = {} as any,
) {
  return useContractRead({
    abi: mal3dABI,
    address: mal3dAddress[11155111],
    functionName: 'symbol',
    ...config,
  } as UseContractReadConfig<typeof mal3dABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link mal3dABI}__ and `functionName` set to `"tokenURI"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xbB4F46A8B194b9BfF013536Ff03B10F8D984c993)
 */
export function useMal3dTokenUri<
  TFunctionName extends 'tokenURI',
  TSelectData = ReadContractResult<typeof mal3dABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof mal3dABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof mal3dAddress } = {} as any,
) {
  return useContractRead({
    abi: mal3dABI,
    address: mal3dAddress[11155111],
    functionName: 'tokenURI',
    ...config,
  } as UseContractReadConfig<typeof mal3dABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link mal3dABI}__ and `functionName` set to `"tokensOfOwner"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xbB4F46A8B194b9BfF013536Ff03B10F8D984c993)
 */
export function useMal3dTokensOfOwner<
  TFunctionName extends 'tokensOfOwner',
  TSelectData = ReadContractResult<typeof mal3dABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof mal3dABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof mal3dAddress } = {} as any,
) {
  return useContractRead({
    abi: mal3dABI,
    address: mal3dAddress[11155111],
    functionName: 'tokensOfOwner',
    ...config,
  } as UseContractReadConfig<typeof mal3dABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link mal3dABI}__ and `functionName` set to `"tokensOfOwnerIn"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xbB4F46A8B194b9BfF013536Ff03B10F8D984c993)
 */
export function useMal3dTokensOfOwnerIn<
  TFunctionName extends 'tokensOfOwnerIn',
  TSelectData = ReadContractResult<typeof mal3dABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof mal3dABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof mal3dAddress } = {} as any,
) {
  return useContractRead({
    abi: mal3dABI,
    address: mal3dAddress[11155111],
    functionName: 'tokensOfOwnerIn',
    ...config,
  } as UseContractReadConfig<typeof mal3dABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link mal3dABI}__ and `functionName` set to `"totalSupply"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xbB4F46A8B194b9BfF013536Ff03B10F8D984c993)
 */
export function useMal3dTotalSupply<
  TFunctionName extends 'totalSupply',
  TSelectData = ReadContractResult<typeof mal3dABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof mal3dABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof mal3dAddress } = {} as any,
) {
  return useContractRead({
    abi: mal3dABI,
    address: mal3dAddress[11155111],
    functionName: 'totalSupply',
    ...config,
  } as UseContractReadConfig<typeof mal3dABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link mal3dABI}__ and `functionName` set to `"uriPrefix"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xbB4F46A8B194b9BfF013536Ff03B10F8D984c993)
 */
export function useMal3dUriPrefix<
  TFunctionName extends 'uriPrefix',
  TSelectData = ReadContractResult<typeof mal3dABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof mal3dABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof mal3dAddress } = {} as any,
) {
  return useContractRead({
    abi: mal3dABI,
    address: mal3dAddress[11155111],
    functionName: 'uriPrefix',
    ...config,
  } as UseContractReadConfig<typeof mal3dABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link mal3dABI}__ and `functionName` set to `"uriSuffix"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xbB4F46A8B194b9BfF013536Ff03B10F8D984c993)
 */
export function useMal3dUriSuffix<
  TFunctionName extends 'uriSuffix',
  TSelectData = ReadContractResult<typeof mal3dABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof mal3dABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof mal3dAddress } = {} as any,
) {
  return useContractRead({
    abi: mal3dABI,
    address: mal3dAddress[11155111],
    functionName: 'uriSuffix',
    ...config,
  } as UseContractReadConfig<typeof mal3dABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link mal3dABI}__.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xbB4F46A8B194b9BfF013536Ff03B10F8D984c993)
 */
export function useMal3dWrite<
  TFunctionName extends string,
  TMode extends WriteContractMode = undefined,
  TChainId extends number = keyof typeof mal3dAddress,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<typeof mal3dABI, string>['request']['abi'],
        TFunctionName,
        TMode
      > & { address?: Address; chainId?: TChainId }
    : UseContractWriteConfig<typeof mal3dABI, TFunctionName, TMode> & {
        abi?: never
        address?: never
        chainId?: TChainId
      } = {} as any,
) {
  return useContractWrite<typeof mal3dABI, TFunctionName, TMode>({
    abi: mal3dABI,
    address: mal3dAddress[11155111],
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link mal3dABI}__ and `functionName` set to `"addPartnerCollection"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xbB4F46A8B194b9BfF013536Ff03B10F8D984c993)
 */
export function useMal3dAddPartnerCollection<
  TMode extends WriteContractMode = undefined,
  TChainId extends number = keyof typeof mal3dAddress,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof mal3dABI,
          'addPartnerCollection'
        >['request']['abi'],
        'addPartnerCollection',
        TMode
      > & {
        address?: Address
        chainId?: TChainId
        functionName?: 'addPartnerCollection'
      }
    : UseContractWriteConfig<typeof mal3dABI, 'addPartnerCollection', TMode> & {
        abi?: never
        address?: never
        chainId?: TChainId
        functionName?: 'addPartnerCollection'
      } = {} as any,
) {
  return useContractWrite<typeof mal3dABI, 'addPartnerCollection', TMode>({
    abi: mal3dABI,
    address: mal3dAddress[11155111],
    functionName: 'addPartnerCollection',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link mal3dABI}__ and `functionName` set to `"approve"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xbB4F46A8B194b9BfF013536Ff03B10F8D984c993)
 */
export function useMal3dApprove<
  TMode extends WriteContractMode = undefined,
  TChainId extends number = keyof typeof mal3dAddress,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof mal3dABI,
          'approve'
        >['request']['abi'],
        'approve',
        TMode
      > & { address?: Address; chainId?: TChainId; functionName?: 'approve' }
    : UseContractWriteConfig<typeof mal3dABI, 'approve', TMode> & {
        abi?: never
        address?: never
        chainId?: TChainId
        functionName?: 'approve'
      } = {} as any,
) {
  return useContractWrite<typeof mal3dABI, 'approve', TMode>({
    abi: mal3dABI,
    address: mal3dAddress[11155111],
    functionName: 'approve',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link mal3dABI}__ and `functionName` set to `"limitedMatchedMint"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xbB4F46A8B194b9BfF013536Ff03B10F8D984c993)
 */
export function useMal3dLimitedMatchedMint<
  TMode extends WriteContractMode = undefined,
  TChainId extends number = keyof typeof mal3dAddress,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof mal3dABI,
          'limitedMatchedMint'
        >['request']['abi'],
        'limitedMatchedMint',
        TMode
      > & {
        address?: Address
        chainId?: TChainId
        functionName?: 'limitedMatchedMint'
      }
    : UseContractWriteConfig<typeof mal3dABI, 'limitedMatchedMint', TMode> & {
        abi?: never
        address?: never
        chainId?: TChainId
        functionName?: 'limitedMatchedMint'
      } = {} as any,
) {
  return useContractWrite<typeof mal3dABI, 'limitedMatchedMint', TMode>({
    abi: mal3dABI,
    address: mal3dAddress[11155111],
    functionName: 'limitedMatchedMint',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link mal3dABI}__ and `functionName` set to `"matchedMint"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xbB4F46A8B194b9BfF013536Ff03B10F8D984c993)
 */
export function useMal3dMatchedMint<
  TMode extends WriteContractMode = undefined,
  TChainId extends number = keyof typeof mal3dAddress,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof mal3dABI,
          'matchedMint'
        >['request']['abi'],
        'matchedMint',
        TMode
      > & {
        address?: Address
        chainId?: TChainId
        functionName?: 'matchedMint'
      }
    : UseContractWriteConfig<typeof mal3dABI, 'matchedMint', TMode> & {
        abi?: never
        address?: never
        chainId?: TChainId
        functionName?: 'matchedMint'
      } = {} as any,
) {
  return useContractWrite<typeof mal3dABI, 'matchedMint', TMode>({
    abi: mal3dABI,
    address: mal3dAddress[11155111],
    functionName: 'matchedMint',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link mal3dABI}__ and `functionName` set to `"matchedMintDicounted"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xbB4F46A8B194b9BfF013536Ff03B10F8D984c993)
 */
export function useMal3dMatchedMintDicounted<
  TMode extends WriteContractMode = undefined,
  TChainId extends number = keyof typeof mal3dAddress,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof mal3dABI,
          'matchedMintDicounted'
        >['request']['abi'],
        'matchedMintDicounted',
        TMode
      > & {
        address?: Address
        chainId?: TChainId
        functionName?: 'matchedMintDicounted'
      }
    : UseContractWriteConfig<typeof mal3dABI, 'matchedMintDicounted', TMode> & {
        abi?: never
        address?: never
        chainId?: TChainId
        functionName?: 'matchedMintDicounted'
      } = {} as any,
) {
  return useContractWrite<typeof mal3dABI, 'matchedMintDicounted', TMode>({
    abi: mal3dABI,
    address: mal3dAddress[11155111],
    functionName: 'matchedMintDicounted',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link mal3dABI}__ and `functionName` set to `"mint"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xbB4F46A8B194b9BfF013536Ff03B10F8D984c993)
 */
export function useMal3dMint<
  TMode extends WriteContractMode = undefined,
  TChainId extends number = keyof typeof mal3dAddress,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<typeof mal3dABI, 'mint'>['request']['abi'],
        'mint',
        TMode
      > & { address?: Address; chainId?: TChainId; functionName?: 'mint' }
    : UseContractWriteConfig<typeof mal3dABI, 'mint', TMode> & {
        abi?: never
        address?: never
        chainId?: TChainId
        functionName?: 'mint'
      } = {} as any,
) {
  return useContractWrite<typeof mal3dABI, 'mint', TMode>({
    abi: mal3dABI,
    address: mal3dAddress[11155111],
    functionName: 'mint',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link mal3dABI}__ and `functionName` set to `"mintForAddress"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xbB4F46A8B194b9BfF013536Ff03B10F8D984c993)
 */
export function useMal3dMintForAddress<
  TMode extends WriteContractMode = undefined,
  TChainId extends number = keyof typeof mal3dAddress,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof mal3dABI,
          'mintForAddress'
        >['request']['abi'],
        'mintForAddress',
        TMode
      > & {
        address?: Address
        chainId?: TChainId
        functionName?: 'mintForAddress'
      }
    : UseContractWriteConfig<typeof mal3dABI, 'mintForAddress', TMode> & {
        abi?: never
        address?: never
        chainId?: TChainId
        functionName?: 'mintForAddress'
      } = {} as any,
) {
  return useContractWrite<typeof mal3dABI, 'mintForAddress', TMode>({
    abi: mal3dABI,
    address: mal3dAddress[11155111],
    functionName: 'mintForAddress',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link mal3dABI}__ and `functionName` set to `"partnerMint"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xbB4F46A8B194b9BfF013536Ff03B10F8D984c993)
 */
export function useMal3dPartnerMint<
  TMode extends WriteContractMode = undefined,
  TChainId extends number = keyof typeof mal3dAddress,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof mal3dABI,
          'partnerMint'
        >['request']['abi'],
        'partnerMint',
        TMode
      > & {
        address?: Address
        chainId?: TChainId
        functionName?: 'partnerMint'
      }
    : UseContractWriteConfig<typeof mal3dABI, 'partnerMint', TMode> & {
        abi?: never
        address?: never
        chainId?: TChainId
        functionName?: 'partnerMint'
      } = {} as any,
) {
  return useContractWrite<typeof mal3dABI, 'partnerMint', TMode>({
    abi: mal3dABI,
    address: mal3dAddress[11155111],
    functionName: 'partnerMint',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link mal3dABI}__ and `functionName` set to `"removePartnerCollection"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xbB4F46A8B194b9BfF013536Ff03B10F8D984c993)
 */
export function useMal3dRemovePartnerCollection<
  TMode extends WriteContractMode = undefined,
  TChainId extends number = keyof typeof mal3dAddress,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof mal3dABI,
          'removePartnerCollection'
        >['request']['abi'],
        'removePartnerCollection',
        TMode
      > & {
        address?: Address
        chainId?: TChainId
        functionName?: 'removePartnerCollection'
      }
    : UseContractWriteConfig<
        typeof mal3dABI,
        'removePartnerCollection',
        TMode
      > & {
        abi?: never
        address?: never
        chainId?: TChainId
        functionName?: 'removePartnerCollection'
      } = {} as any,
) {
  return useContractWrite<typeof mal3dABI, 'removePartnerCollection', TMode>({
    abi: mal3dABI,
    address: mal3dAddress[11155111],
    functionName: 'removePartnerCollection',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link mal3dABI}__ and `functionName` set to `"renounceOwnership"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xbB4F46A8B194b9BfF013536Ff03B10F8D984c993)
 */
export function useMal3dRenounceOwnership<
  TMode extends WriteContractMode = undefined,
  TChainId extends number = keyof typeof mal3dAddress,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof mal3dABI,
          'renounceOwnership'
        >['request']['abi'],
        'renounceOwnership',
        TMode
      > & {
        address?: Address
        chainId?: TChainId
        functionName?: 'renounceOwnership'
      }
    : UseContractWriteConfig<typeof mal3dABI, 'renounceOwnership', TMode> & {
        abi?: never
        address?: never
        chainId?: TChainId
        functionName?: 'renounceOwnership'
      } = {} as any,
) {
  return useContractWrite<typeof mal3dABI, 'renounceOwnership', TMode>({
    abi: mal3dABI,
    address: mal3dAddress[11155111],
    functionName: 'renounceOwnership',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link mal3dABI}__ and `functionName` set to `"safeTransferFrom"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xbB4F46A8B194b9BfF013536Ff03B10F8D984c993)
 */
export function useMal3dSafeTransferFrom<
  TMode extends WriteContractMode = undefined,
  TChainId extends number = keyof typeof mal3dAddress,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof mal3dABI,
          'safeTransferFrom'
        >['request']['abi'],
        'safeTransferFrom',
        TMode
      > & {
        address?: Address
        chainId?: TChainId
        functionName?: 'safeTransferFrom'
      }
    : UseContractWriteConfig<typeof mal3dABI, 'safeTransferFrom', TMode> & {
        abi?: never
        address?: never
        chainId?: TChainId
        functionName?: 'safeTransferFrom'
      } = {} as any,
) {
  return useContractWrite<typeof mal3dABI, 'safeTransferFrom', TMode>({
    abi: mal3dABI,
    address: mal3dAddress[11155111],
    functionName: 'safeTransferFrom',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link mal3dABI}__ and `functionName` set to `"setApprovalForAll"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xbB4F46A8B194b9BfF013536Ff03B10F8D984c993)
 */
export function useMal3dSetApprovalForAll<
  TMode extends WriteContractMode = undefined,
  TChainId extends number = keyof typeof mal3dAddress,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof mal3dABI,
          'setApprovalForAll'
        >['request']['abi'],
        'setApprovalForAll',
        TMode
      > & {
        address?: Address
        chainId?: TChainId
        functionName?: 'setApprovalForAll'
      }
    : UseContractWriteConfig<typeof mal3dABI, 'setApprovalForAll', TMode> & {
        abi?: never
        address?: never
        chainId?: TChainId
        functionName?: 'setApprovalForAll'
      } = {} as any,
) {
  return useContractWrite<typeof mal3dABI, 'setApprovalForAll', TMode>({
    abi: mal3dABI,
    address: mal3dAddress[11155111],
    functionName: 'setApprovalForAll',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link mal3dABI}__ and `functionName` set to `"setCost"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xbB4F46A8B194b9BfF013536Ff03B10F8D984c993)
 */
export function useMal3dSetCost<
  TMode extends WriteContractMode = undefined,
  TChainId extends number = keyof typeof mal3dAddress,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof mal3dABI,
          'setCost'
        >['request']['abi'],
        'setCost',
        TMode
      > & { address?: Address; chainId?: TChainId; functionName?: 'setCost' }
    : UseContractWriteConfig<typeof mal3dABI, 'setCost', TMode> & {
        abi?: never
        address?: never
        chainId?: TChainId
        functionName?: 'setCost'
      } = {} as any,
) {
  return useContractWrite<typeof mal3dABI, 'setCost', TMode>({
    abi: mal3dABI,
    address: mal3dAddress[11155111],
    functionName: 'setCost',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link mal3dABI}__ and `functionName` set to `"setHiddenMetadataUri"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xbB4F46A8B194b9BfF013536Ff03B10F8D984c993)
 */
export function useMal3dSetHiddenMetadataUri<
  TMode extends WriteContractMode = undefined,
  TChainId extends number = keyof typeof mal3dAddress,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof mal3dABI,
          'setHiddenMetadataUri'
        >['request']['abi'],
        'setHiddenMetadataUri',
        TMode
      > & {
        address?: Address
        chainId?: TChainId
        functionName?: 'setHiddenMetadataUri'
      }
    : UseContractWriteConfig<typeof mal3dABI, 'setHiddenMetadataUri', TMode> & {
        abi?: never
        address?: never
        chainId?: TChainId
        functionName?: 'setHiddenMetadataUri'
      } = {} as any,
) {
  return useContractWrite<typeof mal3dABI, 'setHiddenMetadataUri', TMode>({
    abi: mal3dABI,
    address: mal3dAddress[11155111],
    functionName: 'setHiddenMetadataUri',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link mal3dABI}__ and `functionName` set to `"setMatchedMintEnabled"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xbB4F46A8B194b9BfF013536Ff03B10F8D984c993)
 */
export function useMal3dSetMatchedMintEnabled<
  TMode extends WriteContractMode = undefined,
  TChainId extends number = keyof typeof mal3dAddress,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof mal3dABI,
          'setMatchedMintEnabled'
        >['request']['abi'],
        'setMatchedMintEnabled',
        TMode
      > & {
        address?: Address
        chainId?: TChainId
        functionName?: 'setMatchedMintEnabled'
      }
    : UseContractWriteConfig<
        typeof mal3dABI,
        'setMatchedMintEnabled',
        TMode
      > & {
        abi?: never
        address?: never
        chainId?: TChainId
        functionName?: 'setMatchedMintEnabled'
      } = {} as any,
) {
  return useContractWrite<typeof mal3dABI, 'setMatchedMintEnabled', TMode>({
    abi: mal3dABI,
    address: mal3dAddress[11155111],
    functionName: 'setMatchedMintEnabled',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link mal3dABI}__ and `functionName` set to `"setMaxMintAmountPerTx"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xbB4F46A8B194b9BfF013536Ff03B10F8D984c993)
 */
export function useMal3dSetMaxMintAmountPerTx<
  TMode extends WriteContractMode = undefined,
  TChainId extends number = keyof typeof mal3dAddress,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof mal3dABI,
          'setMaxMintAmountPerTx'
        >['request']['abi'],
        'setMaxMintAmountPerTx',
        TMode
      > & {
        address?: Address
        chainId?: TChainId
        functionName?: 'setMaxMintAmountPerTx'
      }
    : UseContractWriteConfig<
        typeof mal3dABI,
        'setMaxMintAmountPerTx',
        TMode
      > & {
        abi?: never
        address?: never
        chainId?: TChainId
        functionName?: 'setMaxMintAmountPerTx'
      } = {} as any,
) {
  return useContractWrite<typeof mal3dABI, 'setMaxMintAmountPerTx', TMode>({
    abi: mal3dABI,
    address: mal3dAddress[11155111],
    functionName: 'setMaxMintAmountPerTx',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link mal3dABI}__ and `functionName` set to `"setMaxMintAmountPerWallet"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xbB4F46A8B194b9BfF013536Ff03B10F8D984c993)
 */
export function useMal3dSetMaxMintAmountPerWallet<
  TMode extends WriteContractMode = undefined,
  TChainId extends number = keyof typeof mal3dAddress,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof mal3dABI,
          'setMaxMintAmountPerWallet'
        >['request']['abi'],
        'setMaxMintAmountPerWallet',
        TMode
      > & {
        address?: Address
        chainId?: TChainId
        functionName?: 'setMaxMintAmountPerWallet'
      }
    : UseContractWriteConfig<
        typeof mal3dABI,
        'setMaxMintAmountPerWallet',
        TMode
      > & {
        abi?: never
        address?: never
        chainId?: TChainId
        functionName?: 'setMaxMintAmountPerWallet'
      } = {} as any,
) {
  return useContractWrite<typeof mal3dABI, 'setMaxMintAmountPerWallet', TMode>({
    abi: mal3dABI,
    address: mal3dAddress[11155111],
    functionName: 'setMaxMintAmountPerWallet',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link mal3dABI}__ and `functionName` set to `"setMerkleRoot"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xbB4F46A8B194b9BfF013536Ff03B10F8D984c993)
 */
export function useMal3dSetMerkleRoot<
  TMode extends WriteContractMode = undefined,
  TChainId extends number = keyof typeof mal3dAddress,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof mal3dABI,
          'setMerkleRoot'
        >['request']['abi'],
        'setMerkleRoot',
        TMode
      > & {
        address?: Address
        chainId?: TChainId
        functionName?: 'setMerkleRoot'
      }
    : UseContractWriteConfig<typeof mal3dABI, 'setMerkleRoot', TMode> & {
        abi?: never
        address?: never
        chainId?: TChainId
        functionName?: 'setMerkleRoot'
      } = {} as any,
) {
  return useContractWrite<typeof mal3dABI, 'setMerkleRoot', TMode>({
    abi: mal3dABI,
    address: mal3dAddress[11155111],
    functionName: 'setMerkleRoot',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link mal3dABI}__ and `functionName` set to `"setPartnerMintEnabled"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xbB4F46A8B194b9BfF013536Ff03B10F8D984c993)
 */
export function useMal3dSetPartnerMintEnabled<
  TMode extends WriteContractMode = undefined,
  TChainId extends number = keyof typeof mal3dAddress,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof mal3dABI,
          'setPartnerMintEnabled'
        >['request']['abi'],
        'setPartnerMintEnabled',
        TMode
      > & {
        address?: Address
        chainId?: TChainId
        functionName?: 'setPartnerMintEnabled'
      }
    : UseContractWriteConfig<
        typeof mal3dABI,
        'setPartnerMintEnabled',
        TMode
      > & {
        abi?: never
        address?: never
        chainId?: TChainId
        functionName?: 'setPartnerMintEnabled'
      } = {} as any,
) {
  return useContractWrite<typeof mal3dABI, 'setPartnerMintEnabled', TMode>({
    abi: mal3dABI,
    address: mal3dAddress[11155111],
    functionName: 'setPartnerMintEnabled',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link mal3dABI}__ and `functionName` set to `"setPaused"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xbB4F46A8B194b9BfF013536Ff03B10F8D984c993)
 */
export function useMal3dSetPaused<
  TMode extends WriteContractMode = undefined,
  TChainId extends number = keyof typeof mal3dAddress,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof mal3dABI,
          'setPaused'
        >['request']['abi'],
        'setPaused',
        TMode
      > & { address?: Address; chainId?: TChainId; functionName?: 'setPaused' }
    : UseContractWriteConfig<typeof mal3dABI, 'setPaused', TMode> & {
        abi?: never
        address?: never
        chainId?: TChainId
        functionName?: 'setPaused'
      } = {} as any,
) {
  return useContractWrite<typeof mal3dABI, 'setPaused', TMode>({
    abi: mal3dABI,
    address: mal3dAddress[11155111],
    functionName: 'setPaused',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link mal3dABI}__ and `functionName` set to `"setRevealed"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xbB4F46A8B194b9BfF013536Ff03B10F8D984c993)
 */
export function useMal3dSetRevealed<
  TMode extends WriteContractMode = undefined,
  TChainId extends number = keyof typeof mal3dAddress,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof mal3dABI,
          'setRevealed'
        >['request']['abi'],
        'setRevealed',
        TMode
      > & {
        address?: Address
        chainId?: TChainId
        functionName?: 'setRevealed'
      }
    : UseContractWriteConfig<typeof mal3dABI, 'setRevealed', TMode> & {
        abi?: never
        address?: never
        chainId?: TChainId
        functionName?: 'setRevealed'
      } = {} as any,
) {
  return useContractWrite<typeof mal3dABI, 'setRevealed', TMode>({
    abi: mal3dABI,
    address: mal3dAddress[11155111],
    functionName: 'setRevealed',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link mal3dABI}__ and `functionName` set to `"setUriPrefix"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xbB4F46A8B194b9BfF013536Ff03B10F8D984c993)
 */
export function useMal3dSetUriPrefix<
  TMode extends WriteContractMode = undefined,
  TChainId extends number = keyof typeof mal3dAddress,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof mal3dABI,
          'setUriPrefix'
        >['request']['abi'],
        'setUriPrefix',
        TMode
      > & {
        address?: Address
        chainId?: TChainId
        functionName?: 'setUriPrefix'
      }
    : UseContractWriteConfig<typeof mal3dABI, 'setUriPrefix', TMode> & {
        abi?: never
        address?: never
        chainId?: TChainId
        functionName?: 'setUriPrefix'
      } = {} as any,
) {
  return useContractWrite<typeof mal3dABI, 'setUriPrefix', TMode>({
    abi: mal3dABI,
    address: mal3dAddress[11155111],
    functionName: 'setUriPrefix',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link mal3dABI}__ and `functionName` set to `"setUriSuffix"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xbB4F46A8B194b9BfF013536Ff03B10F8D984c993)
 */
export function useMal3dSetUriSuffix<
  TMode extends WriteContractMode = undefined,
  TChainId extends number = keyof typeof mal3dAddress,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof mal3dABI,
          'setUriSuffix'
        >['request']['abi'],
        'setUriSuffix',
        TMode
      > & {
        address?: Address
        chainId?: TChainId
        functionName?: 'setUriSuffix'
      }
    : UseContractWriteConfig<typeof mal3dABI, 'setUriSuffix', TMode> & {
        abi?: never
        address?: never
        chainId?: TChainId
        functionName?: 'setUriSuffix'
      } = {} as any,
) {
  return useContractWrite<typeof mal3dABI, 'setUriSuffix', TMode>({
    abi: mal3dABI,
    address: mal3dAddress[11155111],
    functionName: 'setUriSuffix',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link mal3dABI}__ and `functionName` set to `"startAmbassadorPhase"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xbB4F46A8B194b9BfF013536Ff03B10F8D984c993)
 */
export function useMal3dStartAmbassadorPhase<
  TMode extends WriteContractMode = undefined,
  TChainId extends number = keyof typeof mal3dAddress,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof mal3dABI,
          'startAmbassadorPhase'
        >['request']['abi'],
        'startAmbassadorPhase',
        TMode
      > & {
        address?: Address
        chainId?: TChainId
        functionName?: 'startAmbassadorPhase'
      }
    : UseContractWriteConfig<typeof mal3dABI, 'startAmbassadorPhase', TMode> & {
        abi?: never
        address?: never
        chainId?: TChainId
        functionName?: 'startAmbassadorPhase'
      } = {} as any,
) {
  return useContractWrite<typeof mal3dABI, 'startAmbassadorPhase', TMode>({
    abi: mal3dABI,
    address: mal3dAddress[11155111],
    functionName: 'startAmbassadorPhase',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link mal3dABI}__ and `functionName` set to `"startPartnerPhase"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xbB4F46A8B194b9BfF013536Ff03B10F8D984c993)
 */
export function useMal3dStartPartnerPhase<
  TMode extends WriteContractMode = undefined,
  TChainId extends number = keyof typeof mal3dAddress,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof mal3dABI,
          'startPartnerPhase'
        >['request']['abi'],
        'startPartnerPhase',
        TMode
      > & {
        address?: Address
        chainId?: TChainId
        functionName?: 'startPartnerPhase'
      }
    : UseContractWriteConfig<typeof mal3dABI, 'startPartnerPhase', TMode> & {
        abi?: never
        address?: never
        chainId?: TChainId
        functionName?: 'startPartnerPhase'
      } = {} as any,
) {
  return useContractWrite<typeof mal3dABI, 'startPartnerPhase', TMode>({
    abi: mal3dABI,
    address: mal3dAddress[11155111],
    functionName: 'startPartnerPhase',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link mal3dABI}__ and `functionName` set to `"startPublicPhase"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xbB4F46A8B194b9BfF013536Ff03B10F8D984c993)
 */
export function useMal3dStartPublicPhase<
  TMode extends WriteContractMode = undefined,
  TChainId extends number = keyof typeof mal3dAddress,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof mal3dABI,
          'startPublicPhase'
        >['request']['abi'],
        'startPublicPhase',
        TMode
      > & {
        address?: Address
        chainId?: TChainId
        functionName?: 'startPublicPhase'
      }
    : UseContractWriteConfig<typeof mal3dABI, 'startPublicPhase', TMode> & {
        abi?: never
        address?: never
        chainId?: TChainId
        functionName?: 'startPublicPhase'
      } = {} as any,
) {
  return useContractWrite<typeof mal3dABI, 'startPublicPhase', TMode>({
    abi: mal3dABI,
    address: mal3dAddress[11155111],
    functionName: 'startPublicPhase',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link mal3dABI}__ and `functionName` set to `"startSnapshot2Phase"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xbB4F46A8B194b9BfF013536Ff03B10F8D984c993)
 */
export function useMal3dStartSnapshot2Phase<
  TMode extends WriteContractMode = undefined,
  TChainId extends number = keyof typeof mal3dAddress,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof mal3dABI,
          'startSnapshot2Phase'
        >['request']['abi'],
        'startSnapshot2Phase',
        TMode
      > & {
        address?: Address
        chainId?: TChainId
        functionName?: 'startSnapshot2Phase'
      }
    : UseContractWriteConfig<typeof mal3dABI, 'startSnapshot2Phase', TMode> & {
        abi?: never
        address?: never
        chainId?: TChainId
        functionName?: 'startSnapshot2Phase'
      } = {} as any,
) {
  return useContractWrite<typeof mal3dABI, 'startSnapshot2Phase', TMode>({
    abi: mal3dABI,
    address: mal3dAddress[11155111],
    functionName: 'startSnapshot2Phase',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link mal3dABI}__ and `functionName` set to `"startSnapshotPhase"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xbB4F46A8B194b9BfF013536Ff03B10F8D984c993)
 */
export function useMal3dStartSnapshotPhase<
  TMode extends WriteContractMode = undefined,
  TChainId extends number = keyof typeof mal3dAddress,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof mal3dABI,
          'startSnapshotPhase'
        >['request']['abi'],
        'startSnapshotPhase',
        TMode
      > & {
        address?: Address
        chainId?: TChainId
        functionName?: 'startSnapshotPhase'
      }
    : UseContractWriteConfig<typeof mal3dABI, 'startSnapshotPhase', TMode> & {
        abi?: never
        address?: never
        chainId?: TChainId
        functionName?: 'startSnapshotPhase'
      } = {} as any,
) {
  return useContractWrite<typeof mal3dABI, 'startSnapshotPhase', TMode>({
    abi: mal3dABI,
    address: mal3dAddress[11155111],
    functionName: 'startSnapshotPhase',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link mal3dABI}__ and `functionName` set to `"startStaffPhase"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xbB4F46A8B194b9BfF013536Ff03B10F8D984c993)
 */
export function useMal3dStartStaffPhase<
  TMode extends WriteContractMode = undefined,
  TChainId extends number = keyof typeof mal3dAddress,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof mal3dABI,
          'startStaffPhase'
        >['request']['abi'],
        'startStaffPhase',
        TMode
      > & {
        address?: Address
        chainId?: TChainId
        functionName?: 'startStaffPhase'
      }
    : UseContractWriteConfig<typeof mal3dABI, 'startStaffPhase', TMode> & {
        abi?: never
        address?: never
        chainId?: TChainId
        functionName?: 'startStaffPhase'
      } = {} as any,
) {
  return useContractWrite<typeof mal3dABI, 'startStaffPhase', TMode>({
    abi: mal3dABI,
    address: mal3dAddress[11155111],
    functionName: 'startStaffPhase',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link mal3dABI}__ and `functionName` set to `"transferFrom"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xbB4F46A8B194b9BfF013536Ff03B10F8D984c993)
 */
export function useMal3dTransferFrom<
  TMode extends WriteContractMode = undefined,
  TChainId extends number = keyof typeof mal3dAddress,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof mal3dABI,
          'transferFrom'
        >['request']['abi'],
        'transferFrom',
        TMode
      > & {
        address?: Address
        chainId?: TChainId
        functionName?: 'transferFrom'
      }
    : UseContractWriteConfig<typeof mal3dABI, 'transferFrom', TMode> & {
        abi?: never
        address?: never
        chainId?: TChainId
        functionName?: 'transferFrom'
      } = {} as any,
) {
  return useContractWrite<typeof mal3dABI, 'transferFrom', TMode>({
    abi: mal3dABI,
    address: mal3dAddress[11155111],
    functionName: 'transferFrom',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link mal3dABI}__ and `functionName` set to `"transferOwnership"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xbB4F46A8B194b9BfF013536Ff03B10F8D984c993)
 */
export function useMal3dTransferOwnership<
  TMode extends WriteContractMode = undefined,
  TChainId extends number = keyof typeof mal3dAddress,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof mal3dABI,
          'transferOwnership'
        >['request']['abi'],
        'transferOwnership',
        TMode
      > & {
        address?: Address
        chainId?: TChainId
        functionName?: 'transferOwnership'
      }
    : UseContractWriteConfig<typeof mal3dABI, 'transferOwnership', TMode> & {
        abi?: never
        address?: never
        chainId?: TChainId
        functionName?: 'transferOwnership'
      } = {} as any,
) {
  return useContractWrite<typeof mal3dABI, 'transferOwnership', TMode>({
    abi: mal3dABI,
    address: mal3dAddress[11155111],
    functionName: 'transferOwnership',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link mal3dABI}__ and `functionName` set to `"withdraw"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xbB4F46A8B194b9BfF013536Ff03B10F8D984c993)
 */
export function useMal3dWithdraw<
  TMode extends WriteContractMode = undefined,
  TChainId extends number = keyof typeof mal3dAddress,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof mal3dABI,
          'withdraw'
        >['request']['abi'],
        'withdraw',
        TMode
      > & { address?: Address; chainId?: TChainId; functionName?: 'withdraw' }
    : UseContractWriteConfig<typeof mal3dABI, 'withdraw', TMode> & {
        abi?: never
        address?: never
        chainId?: TChainId
        functionName?: 'withdraw'
      } = {} as any,
) {
  return useContractWrite<typeof mal3dABI, 'withdraw', TMode>({
    abi: mal3dABI,
    address: mal3dAddress[11155111],
    functionName: 'withdraw',
    ...config,
  } as any)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link mal3dABI}__.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xbB4F46A8B194b9BfF013536Ff03B10F8D984c993)
 */
export function usePrepareMal3dWrite<TFunctionName extends string>(
  config: Omit<
    UsePrepareContractWriteConfig<typeof mal3dABI, TFunctionName>,
    'abi' | 'address'
  > & { chainId?: keyof typeof mal3dAddress } = {} as any,
) {
  return usePrepareContractWrite({
    abi: mal3dABI,
    address: mal3dAddress[11155111],
    ...config,
  } as UsePrepareContractWriteConfig<typeof mal3dABI, TFunctionName>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link mal3dABI}__ and `functionName` set to `"addPartnerCollection"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xbB4F46A8B194b9BfF013536Ff03B10F8D984c993)
 */
export function usePrepareMal3dAddPartnerCollection(
  config: Omit<
    UsePrepareContractWriteConfig<typeof mal3dABI, 'addPartnerCollection'>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof mal3dAddress } = {} as any,
) {
  return usePrepareContractWrite({
    abi: mal3dABI,
    address: mal3dAddress[11155111],
    functionName: 'addPartnerCollection',
    ...config,
  } as UsePrepareContractWriteConfig<typeof mal3dABI, 'addPartnerCollection'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link mal3dABI}__ and `functionName` set to `"approve"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xbB4F46A8B194b9BfF013536Ff03B10F8D984c993)
 */
export function usePrepareMal3dApprove(
  config: Omit<
    UsePrepareContractWriteConfig<typeof mal3dABI, 'approve'>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof mal3dAddress } = {} as any,
) {
  return usePrepareContractWrite({
    abi: mal3dABI,
    address: mal3dAddress[11155111],
    functionName: 'approve',
    ...config,
  } as UsePrepareContractWriteConfig<typeof mal3dABI, 'approve'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link mal3dABI}__ and `functionName` set to `"limitedMatchedMint"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xbB4F46A8B194b9BfF013536Ff03B10F8D984c993)
 */
export function usePrepareMal3dLimitedMatchedMint(
  config: Omit<
    UsePrepareContractWriteConfig<typeof mal3dABI, 'limitedMatchedMint'>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof mal3dAddress } = {} as any,
) {
  return usePrepareContractWrite({
    abi: mal3dABI,
    address: mal3dAddress[11155111],
    functionName: 'limitedMatchedMint',
    ...config,
  } as UsePrepareContractWriteConfig<typeof mal3dABI, 'limitedMatchedMint'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link mal3dABI}__ and `functionName` set to `"matchedMint"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xbB4F46A8B194b9BfF013536Ff03B10F8D984c993)
 */
export function usePrepareMal3dMatchedMint(
  config: Omit<
    UsePrepareContractWriteConfig<typeof mal3dABI, 'matchedMint'>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof mal3dAddress } = {} as any,
) {
  return usePrepareContractWrite({
    abi: mal3dABI,
    address: mal3dAddress[11155111],
    functionName: 'matchedMint',
    ...config,
  } as UsePrepareContractWriteConfig<typeof mal3dABI, 'matchedMint'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link mal3dABI}__ and `functionName` set to `"matchedMintDicounted"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xbB4F46A8B194b9BfF013536Ff03B10F8D984c993)
 */
export function usePrepareMal3dMatchedMintDicounted(
  config: Omit<
    UsePrepareContractWriteConfig<typeof mal3dABI, 'matchedMintDicounted'>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof mal3dAddress } = {} as any,
) {
  return usePrepareContractWrite({
    abi: mal3dABI,
    address: mal3dAddress[11155111],
    functionName: 'matchedMintDicounted',
    ...config,
  } as UsePrepareContractWriteConfig<typeof mal3dABI, 'matchedMintDicounted'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link mal3dABI}__ and `functionName` set to `"mint"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xbB4F46A8B194b9BfF013536Ff03B10F8D984c993)
 */
export function usePrepareMal3dMint(
  config: Omit<
    UsePrepareContractWriteConfig<typeof mal3dABI, 'mint'>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof mal3dAddress } = {} as any,
) {
  return usePrepareContractWrite({
    abi: mal3dABI,
    address: mal3dAddress[11155111],
    functionName: 'mint',
    ...config,
  } as UsePrepareContractWriteConfig<typeof mal3dABI, 'mint'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link mal3dABI}__ and `functionName` set to `"mintForAddress"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xbB4F46A8B194b9BfF013536Ff03B10F8D984c993)
 */
export function usePrepareMal3dMintForAddress(
  config: Omit<
    UsePrepareContractWriteConfig<typeof mal3dABI, 'mintForAddress'>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof mal3dAddress } = {} as any,
) {
  return usePrepareContractWrite({
    abi: mal3dABI,
    address: mal3dAddress[11155111],
    functionName: 'mintForAddress',
    ...config,
  } as UsePrepareContractWriteConfig<typeof mal3dABI, 'mintForAddress'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link mal3dABI}__ and `functionName` set to `"partnerMint"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xbB4F46A8B194b9BfF013536Ff03B10F8D984c993)
 */
export function usePrepareMal3dPartnerMint(
  config: Omit<
    UsePrepareContractWriteConfig<typeof mal3dABI, 'partnerMint'>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof mal3dAddress } = {} as any,
) {
  return usePrepareContractWrite({
    abi: mal3dABI,
    address: mal3dAddress[11155111],
    functionName: 'partnerMint',
    ...config,
  } as UsePrepareContractWriteConfig<typeof mal3dABI, 'partnerMint'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link mal3dABI}__ and `functionName` set to `"removePartnerCollection"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xbB4F46A8B194b9BfF013536Ff03B10F8D984c993)
 */
export function usePrepareMal3dRemovePartnerCollection(
  config: Omit<
    UsePrepareContractWriteConfig<typeof mal3dABI, 'removePartnerCollection'>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof mal3dAddress } = {} as any,
) {
  return usePrepareContractWrite({
    abi: mal3dABI,
    address: mal3dAddress[11155111],
    functionName: 'removePartnerCollection',
    ...config,
  } as UsePrepareContractWriteConfig<
    typeof mal3dABI,
    'removePartnerCollection'
  >)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link mal3dABI}__ and `functionName` set to `"renounceOwnership"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xbB4F46A8B194b9BfF013536Ff03B10F8D984c993)
 */
export function usePrepareMal3dRenounceOwnership(
  config: Omit<
    UsePrepareContractWriteConfig<typeof mal3dABI, 'renounceOwnership'>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof mal3dAddress } = {} as any,
) {
  return usePrepareContractWrite({
    abi: mal3dABI,
    address: mal3dAddress[11155111],
    functionName: 'renounceOwnership',
    ...config,
  } as UsePrepareContractWriteConfig<typeof mal3dABI, 'renounceOwnership'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link mal3dABI}__ and `functionName` set to `"safeTransferFrom"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xbB4F46A8B194b9BfF013536Ff03B10F8D984c993)
 */
export function usePrepareMal3dSafeTransferFrom(
  config: Omit<
    UsePrepareContractWriteConfig<typeof mal3dABI, 'safeTransferFrom'>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof mal3dAddress } = {} as any,
) {
  return usePrepareContractWrite({
    abi: mal3dABI,
    address: mal3dAddress[11155111],
    functionName: 'safeTransferFrom',
    ...config,
  } as UsePrepareContractWriteConfig<typeof mal3dABI, 'safeTransferFrom'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link mal3dABI}__ and `functionName` set to `"setApprovalForAll"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xbB4F46A8B194b9BfF013536Ff03B10F8D984c993)
 */
export function usePrepareMal3dSetApprovalForAll(
  config: Omit<
    UsePrepareContractWriteConfig<typeof mal3dABI, 'setApprovalForAll'>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof mal3dAddress } = {} as any,
) {
  return usePrepareContractWrite({
    abi: mal3dABI,
    address: mal3dAddress[11155111],
    functionName: 'setApprovalForAll',
    ...config,
  } as UsePrepareContractWriteConfig<typeof mal3dABI, 'setApprovalForAll'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link mal3dABI}__ and `functionName` set to `"setCost"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xbB4F46A8B194b9BfF013536Ff03B10F8D984c993)
 */
export function usePrepareMal3dSetCost(
  config: Omit<
    UsePrepareContractWriteConfig<typeof mal3dABI, 'setCost'>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof mal3dAddress } = {} as any,
) {
  return usePrepareContractWrite({
    abi: mal3dABI,
    address: mal3dAddress[11155111],
    functionName: 'setCost',
    ...config,
  } as UsePrepareContractWriteConfig<typeof mal3dABI, 'setCost'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link mal3dABI}__ and `functionName` set to `"setHiddenMetadataUri"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xbB4F46A8B194b9BfF013536Ff03B10F8D984c993)
 */
export function usePrepareMal3dSetHiddenMetadataUri(
  config: Omit<
    UsePrepareContractWriteConfig<typeof mal3dABI, 'setHiddenMetadataUri'>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof mal3dAddress } = {} as any,
) {
  return usePrepareContractWrite({
    abi: mal3dABI,
    address: mal3dAddress[11155111],
    functionName: 'setHiddenMetadataUri',
    ...config,
  } as UsePrepareContractWriteConfig<typeof mal3dABI, 'setHiddenMetadataUri'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link mal3dABI}__ and `functionName` set to `"setMatchedMintEnabled"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xbB4F46A8B194b9BfF013536Ff03B10F8D984c993)
 */
export function usePrepareMal3dSetMatchedMintEnabled(
  config: Omit<
    UsePrepareContractWriteConfig<typeof mal3dABI, 'setMatchedMintEnabled'>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof mal3dAddress } = {} as any,
) {
  return usePrepareContractWrite({
    abi: mal3dABI,
    address: mal3dAddress[11155111],
    functionName: 'setMatchedMintEnabled',
    ...config,
  } as UsePrepareContractWriteConfig<typeof mal3dABI, 'setMatchedMintEnabled'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link mal3dABI}__ and `functionName` set to `"setMaxMintAmountPerTx"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xbB4F46A8B194b9BfF013536Ff03B10F8D984c993)
 */
export function usePrepareMal3dSetMaxMintAmountPerTx(
  config: Omit<
    UsePrepareContractWriteConfig<typeof mal3dABI, 'setMaxMintAmountPerTx'>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof mal3dAddress } = {} as any,
) {
  return usePrepareContractWrite({
    abi: mal3dABI,
    address: mal3dAddress[11155111],
    functionName: 'setMaxMintAmountPerTx',
    ...config,
  } as UsePrepareContractWriteConfig<typeof mal3dABI, 'setMaxMintAmountPerTx'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link mal3dABI}__ and `functionName` set to `"setMaxMintAmountPerWallet"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xbB4F46A8B194b9BfF013536Ff03B10F8D984c993)
 */
export function usePrepareMal3dSetMaxMintAmountPerWallet(
  config: Omit<
    UsePrepareContractWriteConfig<typeof mal3dABI, 'setMaxMintAmountPerWallet'>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof mal3dAddress } = {} as any,
) {
  return usePrepareContractWrite({
    abi: mal3dABI,
    address: mal3dAddress[11155111],
    functionName: 'setMaxMintAmountPerWallet',
    ...config,
  } as UsePrepareContractWriteConfig<
    typeof mal3dABI,
    'setMaxMintAmountPerWallet'
  >)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link mal3dABI}__ and `functionName` set to `"setMerkleRoot"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xbB4F46A8B194b9BfF013536Ff03B10F8D984c993)
 */
export function usePrepareMal3dSetMerkleRoot(
  config: Omit<
    UsePrepareContractWriteConfig<typeof mal3dABI, 'setMerkleRoot'>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof mal3dAddress } = {} as any,
) {
  return usePrepareContractWrite({
    abi: mal3dABI,
    address: mal3dAddress[11155111],
    functionName: 'setMerkleRoot',
    ...config,
  } as UsePrepareContractWriteConfig<typeof mal3dABI, 'setMerkleRoot'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link mal3dABI}__ and `functionName` set to `"setPartnerMintEnabled"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xbB4F46A8B194b9BfF013536Ff03B10F8D984c993)
 */
export function usePrepareMal3dSetPartnerMintEnabled(
  config: Omit<
    UsePrepareContractWriteConfig<typeof mal3dABI, 'setPartnerMintEnabled'>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof mal3dAddress } = {} as any,
) {
  return usePrepareContractWrite({
    abi: mal3dABI,
    address: mal3dAddress[11155111],
    functionName: 'setPartnerMintEnabled',
    ...config,
  } as UsePrepareContractWriteConfig<typeof mal3dABI, 'setPartnerMintEnabled'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link mal3dABI}__ and `functionName` set to `"setPaused"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xbB4F46A8B194b9BfF013536Ff03B10F8D984c993)
 */
export function usePrepareMal3dSetPaused(
  config: Omit<
    UsePrepareContractWriteConfig<typeof mal3dABI, 'setPaused'>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof mal3dAddress } = {} as any,
) {
  return usePrepareContractWrite({
    abi: mal3dABI,
    address: mal3dAddress[11155111],
    functionName: 'setPaused',
    ...config,
  } as UsePrepareContractWriteConfig<typeof mal3dABI, 'setPaused'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link mal3dABI}__ and `functionName` set to `"setRevealed"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xbB4F46A8B194b9BfF013536Ff03B10F8D984c993)
 */
export function usePrepareMal3dSetRevealed(
  config: Omit<
    UsePrepareContractWriteConfig<typeof mal3dABI, 'setRevealed'>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof mal3dAddress } = {} as any,
) {
  return usePrepareContractWrite({
    abi: mal3dABI,
    address: mal3dAddress[11155111],
    functionName: 'setRevealed',
    ...config,
  } as UsePrepareContractWriteConfig<typeof mal3dABI, 'setRevealed'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link mal3dABI}__ and `functionName` set to `"setUriPrefix"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xbB4F46A8B194b9BfF013536Ff03B10F8D984c993)
 */
export function usePrepareMal3dSetUriPrefix(
  config: Omit<
    UsePrepareContractWriteConfig<typeof mal3dABI, 'setUriPrefix'>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof mal3dAddress } = {} as any,
) {
  return usePrepareContractWrite({
    abi: mal3dABI,
    address: mal3dAddress[11155111],
    functionName: 'setUriPrefix',
    ...config,
  } as UsePrepareContractWriteConfig<typeof mal3dABI, 'setUriPrefix'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link mal3dABI}__ and `functionName` set to `"setUriSuffix"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xbB4F46A8B194b9BfF013536Ff03B10F8D984c993)
 */
export function usePrepareMal3dSetUriSuffix(
  config: Omit<
    UsePrepareContractWriteConfig<typeof mal3dABI, 'setUriSuffix'>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof mal3dAddress } = {} as any,
) {
  return usePrepareContractWrite({
    abi: mal3dABI,
    address: mal3dAddress[11155111],
    functionName: 'setUriSuffix',
    ...config,
  } as UsePrepareContractWriteConfig<typeof mal3dABI, 'setUriSuffix'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link mal3dABI}__ and `functionName` set to `"startAmbassadorPhase"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xbB4F46A8B194b9BfF013536Ff03B10F8D984c993)
 */
export function usePrepareMal3dStartAmbassadorPhase(
  config: Omit<
    UsePrepareContractWriteConfig<typeof mal3dABI, 'startAmbassadorPhase'>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof mal3dAddress } = {} as any,
) {
  return usePrepareContractWrite({
    abi: mal3dABI,
    address: mal3dAddress[11155111],
    functionName: 'startAmbassadorPhase',
    ...config,
  } as UsePrepareContractWriteConfig<typeof mal3dABI, 'startAmbassadorPhase'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link mal3dABI}__ and `functionName` set to `"startPartnerPhase"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xbB4F46A8B194b9BfF013536Ff03B10F8D984c993)
 */
export function usePrepareMal3dStartPartnerPhase(
  config: Omit<
    UsePrepareContractWriteConfig<typeof mal3dABI, 'startPartnerPhase'>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof mal3dAddress } = {} as any,
) {
  return usePrepareContractWrite({
    abi: mal3dABI,
    address: mal3dAddress[11155111],
    functionName: 'startPartnerPhase',
    ...config,
  } as UsePrepareContractWriteConfig<typeof mal3dABI, 'startPartnerPhase'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link mal3dABI}__ and `functionName` set to `"startPublicPhase"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xbB4F46A8B194b9BfF013536Ff03B10F8D984c993)
 */
export function usePrepareMal3dStartPublicPhase(
  config: Omit<
    UsePrepareContractWriteConfig<typeof mal3dABI, 'startPublicPhase'>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof mal3dAddress } = {} as any,
) {
  return usePrepareContractWrite({
    abi: mal3dABI,
    address: mal3dAddress[11155111],
    functionName: 'startPublicPhase',
    ...config,
  } as UsePrepareContractWriteConfig<typeof mal3dABI, 'startPublicPhase'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link mal3dABI}__ and `functionName` set to `"startSnapshot2Phase"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xbB4F46A8B194b9BfF013536Ff03B10F8D984c993)
 */
export function usePrepareMal3dStartSnapshot2Phase(
  config: Omit<
    UsePrepareContractWriteConfig<typeof mal3dABI, 'startSnapshot2Phase'>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof mal3dAddress } = {} as any,
) {
  return usePrepareContractWrite({
    abi: mal3dABI,
    address: mal3dAddress[11155111],
    functionName: 'startSnapshot2Phase',
    ...config,
  } as UsePrepareContractWriteConfig<typeof mal3dABI, 'startSnapshot2Phase'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link mal3dABI}__ and `functionName` set to `"startSnapshotPhase"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xbB4F46A8B194b9BfF013536Ff03B10F8D984c993)
 */
export function usePrepareMal3dStartSnapshotPhase(
  config: Omit<
    UsePrepareContractWriteConfig<typeof mal3dABI, 'startSnapshotPhase'>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof mal3dAddress } = {} as any,
) {
  return usePrepareContractWrite({
    abi: mal3dABI,
    address: mal3dAddress[11155111],
    functionName: 'startSnapshotPhase',
    ...config,
  } as UsePrepareContractWriteConfig<typeof mal3dABI, 'startSnapshotPhase'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link mal3dABI}__ and `functionName` set to `"startStaffPhase"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xbB4F46A8B194b9BfF013536Ff03B10F8D984c993)
 */
export function usePrepareMal3dStartStaffPhase(
  config: Omit<
    UsePrepareContractWriteConfig<typeof mal3dABI, 'startStaffPhase'>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof mal3dAddress } = {} as any,
) {
  return usePrepareContractWrite({
    abi: mal3dABI,
    address: mal3dAddress[11155111],
    functionName: 'startStaffPhase',
    ...config,
  } as UsePrepareContractWriteConfig<typeof mal3dABI, 'startStaffPhase'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link mal3dABI}__ and `functionName` set to `"transferFrom"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xbB4F46A8B194b9BfF013536Ff03B10F8D984c993)
 */
export function usePrepareMal3dTransferFrom(
  config: Omit<
    UsePrepareContractWriteConfig<typeof mal3dABI, 'transferFrom'>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof mal3dAddress } = {} as any,
) {
  return usePrepareContractWrite({
    abi: mal3dABI,
    address: mal3dAddress[11155111],
    functionName: 'transferFrom',
    ...config,
  } as UsePrepareContractWriteConfig<typeof mal3dABI, 'transferFrom'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link mal3dABI}__ and `functionName` set to `"transferOwnership"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xbB4F46A8B194b9BfF013536Ff03B10F8D984c993)
 */
export function usePrepareMal3dTransferOwnership(
  config: Omit<
    UsePrepareContractWriteConfig<typeof mal3dABI, 'transferOwnership'>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof mal3dAddress } = {} as any,
) {
  return usePrepareContractWrite({
    abi: mal3dABI,
    address: mal3dAddress[11155111],
    functionName: 'transferOwnership',
    ...config,
  } as UsePrepareContractWriteConfig<typeof mal3dABI, 'transferOwnership'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link mal3dABI}__ and `functionName` set to `"withdraw"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xbB4F46A8B194b9BfF013536Ff03B10F8D984c993)
 */
export function usePrepareMal3dWithdraw(
  config: Omit<
    UsePrepareContractWriteConfig<typeof mal3dABI, 'withdraw'>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof mal3dAddress } = {} as any,
) {
  return usePrepareContractWrite({
    abi: mal3dABI,
    address: mal3dAddress[11155111],
    functionName: 'withdraw',
    ...config,
  } as UsePrepareContractWriteConfig<typeof mal3dABI, 'withdraw'>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link mal3dABI}__.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xbB4F46A8B194b9BfF013536Ff03B10F8D984c993)
 */
export function useMal3dEvent<TEventName extends string>(
  config: Omit<
    UseContractEventConfig<typeof mal3dABI, TEventName>,
    'abi' | 'address'
  > & { chainId?: keyof typeof mal3dAddress } = {} as any,
) {
  return useContractEvent({
    abi: mal3dABI,
    address: mal3dAddress[11155111],
    ...config,
  } as UseContractEventConfig<typeof mal3dABI, TEventName>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link mal3dABI}__ and `eventName` set to `"Approval"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xbB4F46A8B194b9BfF013536Ff03B10F8D984c993)
 */
export function useMal3dApprovalEvent(
  config: Omit<
    UseContractEventConfig<typeof mal3dABI, 'Approval'>,
    'abi' | 'address' | 'eventName'
  > & { chainId?: keyof typeof mal3dAddress } = {} as any,
) {
  return useContractEvent({
    abi: mal3dABI,
    address: mal3dAddress[11155111],
    eventName: 'Approval',
    ...config,
  } as UseContractEventConfig<typeof mal3dABI, 'Approval'>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link mal3dABI}__ and `eventName` set to `"ApprovalForAll"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xbB4F46A8B194b9BfF013536Ff03B10F8D984c993)
 */
export function useMal3dApprovalForAllEvent(
  config: Omit<
    UseContractEventConfig<typeof mal3dABI, 'ApprovalForAll'>,
    'abi' | 'address' | 'eventName'
  > & { chainId?: keyof typeof mal3dAddress } = {} as any,
) {
  return useContractEvent({
    abi: mal3dABI,
    address: mal3dAddress[11155111],
    eventName: 'ApprovalForAll',
    ...config,
  } as UseContractEventConfig<typeof mal3dABI, 'ApprovalForAll'>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link mal3dABI}__ and `eventName` set to `"OwnershipTransferred"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xbB4F46A8B194b9BfF013536Ff03B10F8D984c993)
 */
export function useMal3dOwnershipTransferredEvent(
  config: Omit<
    UseContractEventConfig<typeof mal3dABI, 'OwnershipTransferred'>,
    'abi' | 'address' | 'eventName'
  > & { chainId?: keyof typeof mal3dAddress } = {} as any,
) {
  return useContractEvent({
    abi: mal3dABI,
    address: mal3dAddress[11155111],
    eventName: 'OwnershipTransferred',
    ...config,
  } as UseContractEventConfig<typeof mal3dABI, 'OwnershipTransferred'>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link mal3dABI}__ and `eventName` set to `"Transfer"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xbB4F46A8B194b9BfF013536Ff03B10F8D984c993)
 */
export function useMal3dTransferEvent(
  config: Omit<
    UseContractEventConfig<typeof mal3dABI, 'Transfer'>,
    'abi' | 'address' | 'eventName'
  > & { chainId?: keyof typeof mal3dAddress } = {} as any,
) {
  return useContractEvent({
    abi: mal3dABI,
    address: mal3dAddress[11155111],
    eventName: 'Transfer',
    ...config,
  } as UseContractEventConfig<typeof mal3dABI, 'Transfer'>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link malogABI}__.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x0082F3387365e414512f06c4a587BbdC553c5049)
 */
export function useMalogRead<
  TFunctionName extends string,
  TSelectData = ReadContractResult<typeof malogABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof malogABI, TFunctionName, TSelectData>,
    'abi' | 'address'
  > & { chainId?: keyof typeof malogAddress } = {} as any,
) {
  return useContractRead({
    abi: malogABI,
    address: malogAddress[11155111],
    ...config,
  } as UseContractReadConfig<typeof malogABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link malogABI}__ and `functionName` set to `"APE_PRICE"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x0082F3387365e414512f06c4a587BbdC553c5049)
 */
export function useMalogApePrice<
  TFunctionName extends 'APE_PRICE',
  TSelectData = ReadContractResult<typeof malogABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof malogABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof malogAddress } = {} as any,
) {
  return useContractRead({
    abi: malogABI,
    address: malogAddress[11155111],
    functionName: 'APE_PRICE',
    ...config,
  } as UseContractReadConfig<typeof malogABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link malogABI}__ and `functionName` set to `"MAX_SUPPLY"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x0082F3387365e414512f06c4a587BbdC553c5049)
 */
export function useMalogMaxSupply<
  TFunctionName extends 'MAX_SUPPLY',
  TSelectData = ReadContractResult<typeof malogABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof malogABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof malogAddress } = {} as any,
) {
  return useContractRead({
    abi: malogABI,
    address: malogAddress[11155111],
    functionName: 'MAX_SUPPLY',
    ...config,
  } as UseContractReadConfig<typeof malogABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link malogABI}__ and `functionName` set to `"MINTING_PAUSED"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x0082F3387365e414512f06c4a587BbdC553c5049)
 */
export function useMalogMintingPaused<
  TFunctionName extends 'MINTING_PAUSED',
  TSelectData = ReadContractResult<typeof malogABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof malogABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof malogAddress } = {} as any,
) {
  return useContractRead({
    abi: malogABI,
    address: malogAddress[11155111],
    functionName: 'MINTING_PAUSED',
    ...config,
  } as UseContractReadConfig<typeof malogABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link malogABI}__ and `functionName` set to `"PASS_CONTRACT_ADDRESS"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x0082F3387365e414512f06c4a587BbdC553c5049)
 */
export function useMalogPassContractAddress<
  TFunctionName extends 'PASS_CONTRACT_ADDRESS',
  TSelectData = ReadContractResult<typeof malogABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof malogABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof malogAddress } = {} as any,
) {
  return useContractRead({
    abi: malogABI,
    address: malogAddress[11155111],
    functionName: 'PASS_CONTRACT_ADDRESS',
    ...config,
  } as UseContractReadConfig<typeof malogABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link malogABI}__ and `functionName` set to `"REVEALED"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x0082F3387365e414512f06c4a587BbdC553c5049)
 */
export function useMalogRevealed<
  TFunctionName extends 'REVEALED',
  TSelectData = ReadContractResult<typeof malogABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof malogABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof malogAddress } = {} as any,
) {
  return useContractRead({
    abi: malogABI,
    address: malogAddress[11155111],
    functionName: 'REVEALED',
    ...config,
  } as UseContractReadConfig<typeof malogABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link malogABI}__ and `functionName` set to `"balanceOf"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x0082F3387365e414512f06c4a587BbdC553c5049)
 */
export function useMalogBalanceOf<
  TFunctionName extends 'balanceOf',
  TSelectData = ReadContractResult<typeof malogABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof malogABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof malogAddress } = {} as any,
) {
  return useContractRead({
    abi: malogABI,
    address: malogAddress[11155111],
    functionName: 'balanceOf',
    ...config,
  } as UseContractReadConfig<typeof malogABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link malogABI}__ and `functionName` set to `"getApproved"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x0082F3387365e414512f06c4a587BbdC553c5049)
 */
export function useMalogGetApproved<
  TFunctionName extends 'getApproved',
  TSelectData = ReadContractResult<typeof malogABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof malogABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof malogAddress } = {} as any,
) {
  return useContractRead({
    abi: malogABI,
    address: malogAddress[11155111],
    functionName: 'getApproved',
    ...config,
  } as UseContractReadConfig<typeof malogABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link malogABI}__ and `functionName` set to `"getTeamMemberBalance"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x0082F3387365e414512f06c4a587BbdC553c5049)
 */
export function useMalogGetTeamMemberBalance<
  TFunctionName extends 'getTeamMemberBalance',
  TSelectData = ReadContractResult<typeof malogABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof malogABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof malogAddress } = {} as any,
) {
  return useContractRead({
    abi: malogABI,
    address: malogAddress[11155111],
    functionName: 'getTeamMemberBalance',
    ...config,
  } as UseContractReadConfig<typeof malogABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link malogABI}__ and `functionName` set to `"isApprovedForAll"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x0082F3387365e414512f06c4a587BbdC553c5049)
 */
export function useMalogIsApprovedForAll<
  TFunctionName extends 'isApprovedForAll',
  TSelectData = ReadContractResult<typeof malogABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof malogABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof malogAddress } = {} as any,
) {
  return useContractRead({
    abi: malogABI,
    address: malogAddress[11155111],
    functionName: 'isApprovedForAll',
    ...config,
  } as UseContractReadConfig<typeof malogABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link malogABI}__ and `functionName` set to `"name"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x0082F3387365e414512f06c4a587BbdC553c5049)
 */
export function useMalogName<
  TFunctionName extends 'name',
  TSelectData = ReadContractResult<typeof malogABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof malogABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof malogAddress } = {} as any,
) {
  return useContractRead({
    abi: malogABI,
    address: malogAddress[11155111],
    functionName: 'name',
    ...config,
  } as UseContractReadConfig<typeof malogABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link malogABI}__ and `functionName` set to `"owner"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x0082F3387365e414512f06c4a587BbdC553c5049)
 */
export function useMalogOwner<
  TFunctionName extends 'owner',
  TSelectData = ReadContractResult<typeof malogABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof malogABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof malogAddress } = {} as any,
) {
  return useContractRead({
    abi: malogABI,
    address: malogAddress[11155111],
    functionName: 'owner',
    ...config,
  } as UseContractReadConfig<typeof malogABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link malogABI}__ and `functionName` set to `"ownerOf"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x0082F3387365e414512f06c4a587BbdC553c5049)
 */
export function useMalogOwnerOf<
  TFunctionName extends 'ownerOf',
  TSelectData = ReadContractResult<typeof malogABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof malogABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof malogAddress } = {} as any,
) {
  return useContractRead({
    abi: malogABI,
    address: malogAddress[11155111],
    functionName: 'ownerOf',
    ...config,
  } as UseContractReadConfig<typeof malogABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link malogABI}__ and `functionName` set to `"supportsInterface"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x0082F3387365e414512f06c4a587BbdC553c5049)
 */
export function useMalogSupportsInterface<
  TFunctionName extends 'supportsInterface',
  TSelectData = ReadContractResult<typeof malogABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof malogABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof malogAddress } = {} as any,
) {
  return useContractRead({
    abi: malogABI,
    address: malogAddress[11155111],
    functionName: 'supportsInterface',
    ...config,
  } as UseContractReadConfig<typeof malogABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link malogABI}__ and `functionName` set to `"symbol"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x0082F3387365e414512f06c4a587BbdC553c5049)
 */
export function useMalogSymbol<
  TFunctionName extends 'symbol',
  TSelectData = ReadContractResult<typeof malogABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof malogABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof malogAddress } = {} as any,
) {
  return useContractRead({
    abi: malogABI,
    address: malogAddress[11155111],
    functionName: 'symbol',
    ...config,
  } as UseContractReadConfig<typeof malogABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link malogABI}__ and `functionName` set to `"tokenURI"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x0082F3387365e414512f06c4a587BbdC553c5049)
 */
export function useMalogTokenUri<
  TFunctionName extends 'tokenURI',
  TSelectData = ReadContractResult<typeof malogABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof malogABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof malogAddress } = {} as any,
) {
  return useContractRead({
    abi: malogABI,
    address: malogAddress[11155111],
    functionName: 'tokenURI',
    ...config,
  } as UseContractReadConfig<typeof malogABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link malogABI}__ and `functionName` set to `"totalSupply"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x0082F3387365e414512f06c4a587BbdC553c5049)
 */
export function useMalogTotalSupply<
  TFunctionName extends 'totalSupply',
  TSelectData = ReadContractResult<typeof malogABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof malogABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof malogAddress } = {} as any,
) {
  return useContractRead({
    abi: malogABI,
    address: malogAddress[11155111],
    functionName: 'totalSupply',
    ...config,
  } as UseContractReadConfig<typeof malogABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link malogABI}__ and `functionName` set to `"whitelist_sale"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x0082F3387365e414512f06c4a587BbdC553c5049)
 */
export function useMalogWhitelistSale<
  TFunctionName extends 'whitelist_sale',
  TSelectData = ReadContractResult<typeof malogABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof malogABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof malogAddress } = {} as any,
) {
  return useContractRead({
    abi: malogABI,
    address: malogAddress[11155111],
    functionName: 'whitelist_sale',
    ...config,
  } as UseContractReadConfig<typeof malogABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link malogABI}__.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x0082F3387365e414512f06c4a587BbdC553c5049)
 */
export function useMalogWrite<
  TFunctionName extends string,
  TMode extends WriteContractMode = undefined,
  TChainId extends number = keyof typeof malogAddress,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<typeof malogABI, string>['request']['abi'],
        TFunctionName,
        TMode
      > & { address?: Address; chainId?: TChainId }
    : UseContractWriteConfig<typeof malogABI, TFunctionName, TMode> & {
        abi?: never
        address?: never
        chainId?: TChainId
      } = {} as any,
) {
  return useContractWrite<typeof malogABI, TFunctionName, TMode>({
    abi: malogABI,
    address: malogAddress[11155111],
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link malogABI}__ and `functionName` set to `"addWhitelisted"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x0082F3387365e414512f06c4a587BbdC553c5049)
 */
export function useMalogAddWhitelisted<
  TMode extends WriteContractMode = undefined,
  TChainId extends number = keyof typeof malogAddress,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof malogABI,
          'addWhitelisted'
        >['request']['abi'],
        'addWhitelisted',
        TMode
      > & {
        address?: Address
        chainId?: TChainId
        functionName?: 'addWhitelisted'
      }
    : UseContractWriteConfig<typeof malogABI, 'addWhitelisted', TMode> & {
        abi?: never
        address?: never
        chainId?: TChainId
        functionName?: 'addWhitelisted'
      } = {} as any,
) {
  return useContractWrite<typeof malogABI, 'addWhitelisted', TMode>({
    abi: malogABI,
    address: malogAddress[11155111],
    functionName: 'addWhitelisted',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link malogABI}__ and `functionName` set to `"approve"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x0082F3387365e414512f06c4a587BbdC553c5049)
 */
export function useMalogApprove<
  TMode extends WriteContractMode = undefined,
  TChainId extends number = keyof typeof malogAddress,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof malogABI,
          'approve'
        >['request']['abi'],
        'approve',
        TMode
      > & { address?: Address; chainId?: TChainId; functionName?: 'approve' }
    : UseContractWriteConfig<typeof malogABI, 'approve', TMode> & {
        abi?: never
        address?: never
        chainId?: TChainId
        functionName?: 'approve'
      } = {} as any,
) {
  return useContractWrite<typeof malogABI, 'approve', TMode>({
    abi: malogABI,
    address: malogAddress[11155111],
    functionName: 'approve',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link malogABI}__ and `functionName` set to `"mintApe"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x0082F3387365e414512f06c4a587BbdC553c5049)
 */
export function useMalogMintApe<
  TMode extends WriteContractMode = undefined,
  TChainId extends number = keyof typeof malogAddress,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof malogABI,
          'mintApe'
        >['request']['abi'],
        'mintApe',
        TMode
      > & { address?: Address; chainId?: TChainId; functionName?: 'mintApe' }
    : UseContractWriteConfig<typeof malogABI, 'mintApe', TMode> & {
        abi?: never
        address?: never
        chainId?: TChainId
        functionName?: 'mintApe'
      } = {} as any,
) {
  return useContractWrite<typeof malogABI, 'mintApe', TMode>({
    abi: malogABI,
    address: malogAddress[11155111],
    functionName: 'mintApe',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link malogABI}__ and `functionName` set to `"mintApeForWhitelisted"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x0082F3387365e414512f06c4a587BbdC553c5049)
 */
export function useMalogMintApeForWhitelisted<
  TMode extends WriteContractMode = undefined,
  TChainId extends number = keyof typeof malogAddress,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof malogABI,
          'mintApeForWhitelisted'
        >['request']['abi'],
        'mintApeForWhitelisted',
        TMode
      > & {
        address?: Address
        chainId?: TChainId
        functionName?: 'mintApeForWhitelisted'
      }
    : UseContractWriteConfig<
        typeof malogABI,
        'mintApeForWhitelisted',
        TMode
      > & {
        abi?: never
        address?: never
        chainId?: TChainId
        functionName?: 'mintApeForWhitelisted'
      } = {} as any,
) {
  return useContractWrite<typeof malogABI, 'mintApeForWhitelisted', TMode>({
    abi: malogABI,
    address: malogAddress[11155111],
    functionName: 'mintApeForWhitelisted',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link malogABI}__ and `functionName` set to `"pause"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x0082F3387365e414512f06c4a587BbdC553c5049)
 */
export function useMalogPause<
  TMode extends WriteContractMode = undefined,
  TChainId extends number = keyof typeof malogAddress,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<typeof malogABI, 'pause'>['request']['abi'],
        'pause',
        TMode
      > & { address?: Address; chainId?: TChainId; functionName?: 'pause' }
    : UseContractWriteConfig<typeof malogABI, 'pause', TMode> & {
        abi?: never
        address?: never
        chainId?: TChainId
        functionName?: 'pause'
      } = {} as any,
) {
  return useContractWrite<typeof malogABI, 'pause', TMode>({
    abi: malogABI,
    address: malogAddress[11155111],
    functionName: 'pause',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link malogABI}__ and `functionName` set to `"renounceOwnership"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x0082F3387365e414512f06c4a587BbdC553c5049)
 */
export function useMalogRenounceOwnership<
  TMode extends WriteContractMode = undefined,
  TChainId extends number = keyof typeof malogAddress,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof malogABI,
          'renounceOwnership'
        >['request']['abi'],
        'renounceOwnership',
        TMode
      > & {
        address?: Address
        chainId?: TChainId
        functionName?: 'renounceOwnership'
      }
    : UseContractWriteConfig<typeof malogABI, 'renounceOwnership', TMode> & {
        abi?: never
        address?: never
        chainId?: TChainId
        functionName?: 'renounceOwnership'
      } = {} as any,
) {
  return useContractWrite<typeof malogABI, 'renounceOwnership', TMode>({
    abi: malogABI,
    address: malogAddress[11155111],
    functionName: 'renounceOwnership',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link malogABI}__ and `functionName` set to `"revealApes"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x0082F3387365e414512f06c4a587BbdC553c5049)
 */
export function useMalogRevealApes<
  TMode extends WriteContractMode = undefined,
  TChainId extends number = keyof typeof malogAddress,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof malogABI,
          'revealApes'
        >['request']['abi'],
        'revealApes',
        TMode
      > & { address?: Address; chainId?: TChainId; functionName?: 'revealApes' }
    : UseContractWriteConfig<typeof malogABI, 'revealApes', TMode> & {
        abi?: never
        address?: never
        chainId?: TChainId
        functionName?: 'revealApes'
      } = {} as any,
) {
  return useContractWrite<typeof malogABI, 'revealApes', TMode>({
    abi: malogABI,
    address: malogAddress[11155111],
    functionName: 'revealApes',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link malogABI}__ and `functionName` set to `"safeMint"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x0082F3387365e414512f06c4a587BbdC553c5049)
 */
export function useMalogSafeMint<
  TMode extends WriteContractMode = undefined,
  TChainId extends number = keyof typeof malogAddress,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof malogABI,
          'safeMint'
        >['request']['abi'],
        'safeMint',
        TMode
      > & { address?: Address; chainId?: TChainId; functionName?: 'safeMint' }
    : UseContractWriteConfig<typeof malogABI, 'safeMint', TMode> & {
        abi?: never
        address?: never
        chainId?: TChainId
        functionName?: 'safeMint'
      } = {} as any,
) {
  return useContractWrite<typeof malogABI, 'safeMint', TMode>({
    abi: malogABI,
    address: malogAddress[11155111],
    functionName: 'safeMint',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link malogABI}__ and `functionName` set to `"safeMintMultiple"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x0082F3387365e414512f06c4a587BbdC553c5049)
 */
export function useMalogSafeMintMultiple<
  TMode extends WriteContractMode = undefined,
  TChainId extends number = keyof typeof malogAddress,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof malogABI,
          'safeMintMultiple'
        >['request']['abi'],
        'safeMintMultiple',
        TMode
      > & {
        address?: Address
        chainId?: TChainId
        functionName?: 'safeMintMultiple'
      }
    : UseContractWriteConfig<typeof malogABI, 'safeMintMultiple', TMode> & {
        abi?: never
        address?: never
        chainId?: TChainId
        functionName?: 'safeMintMultiple'
      } = {} as any,
) {
  return useContractWrite<typeof malogABI, 'safeMintMultiple', TMode>({
    abi: malogABI,
    address: malogAddress[11155111],
    functionName: 'safeMintMultiple',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link malogABI}__ and `functionName` set to `"safeTransferFrom"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x0082F3387365e414512f06c4a587BbdC553c5049)
 */
export function useMalogSafeTransferFrom<
  TMode extends WriteContractMode = undefined,
  TChainId extends number = keyof typeof malogAddress,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof malogABI,
          'safeTransferFrom'
        >['request']['abi'],
        'safeTransferFrom',
        TMode
      > & {
        address?: Address
        chainId?: TChainId
        functionName?: 'safeTransferFrom'
      }
    : UseContractWriteConfig<typeof malogABI, 'safeTransferFrom', TMode> & {
        abi?: never
        address?: never
        chainId?: TChainId
        functionName?: 'safeTransferFrom'
      } = {} as any,
) {
  return useContractWrite<typeof malogABI, 'safeTransferFrom', TMode>({
    abi: malogABI,
    address: malogAddress[11155111],
    functionName: 'safeTransferFrom',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link malogABI}__ and `functionName` set to `"setApprovalForAll"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x0082F3387365e414512f06c4a587BbdC553c5049)
 */
export function useMalogSetApprovalForAll<
  TMode extends WriteContractMode = undefined,
  TChainId extends number = keyof typeof malogAddress,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof malogABI,
          'setApprovalForAll'
        >['request']['abi'],
        'setApprovalForAll',
        TMode
      > & {
        address?: Address
        chainId?: TChainId
        functionName?: 'setApprovalForAll'
      }
    : UseContractWriteConfig<typeof malogABI, 'setApprovalForAll', TMode> & {
        abi?: never
        address?: never
        chainId?: TChainId
        functionName?: 'setApprovalForAll'
      } = {} as any,
) {
  return useContractWrite<typeof malogABI, 'setApprovalForAll', TMode>({
    abi: malogABI,
    address: malogAddress[11155111],
    functionName: 'setApprovalForAll',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link malogABI}__ and `functionName` set to `"setPassContract"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x0082F3387365e414512f06c4a587BbdC553c5049)
 */
export function useMalogSetPassContract<
  TMode extends WriteContractMode = undefined,
  TChainId extends number = keyof typeof malogAddress,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof malogABI,
          'setPassContract'
        >['request']['abi'],
        'setPassContract',
        TMode
      > & {
        address?: Address
        chainId?: TChainId
        functionName?: 'setPassContract'
      }
    : UseContractWriteConfig<typeof malogABI, 'setPassContract', TMode> & {
        abi?: never
        address?: never
        chainId?: TChainId
        functionName?: 'setPassContract'
      } = {} as any,
) {
  return useContractWrite<typeof malogABI, 'setPassContract', TMode>({
    abi: malogABI,
    address: malogAddress[11155111],
    functionName: 'setPassContract',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link malogABI}__ and `functionName` set to `"startPublicSale"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x0082F3387365e414512f06c4a587BbdC553c5049)
 */
export function useMalogStartPublicSale<
  TMode extends WriteContractMode = undefined,
  TChainId extends number = keyof typeof malogAddress,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof malogABI,
          'startPublicSale'
        >['request']['abi'],
        'startPublicSale',
        TMode
      > & {
        address?: Address
        chainId?: TChainId
        functionName?: 'startPublicSale'
      }
    : UseContractWriteConfig<typeof malogABI, 'startPublicSale', TMode> & {
        abi?: never
        address?: never
        chainId?: TChainId
        functionName?: 'startPublicSale'
      } = {} as any,
) {
  return useContractWrite<typeof malogABI, 'startPublicSale', TMode>({
    abi: malogABI,
    address: malogAddress[11155111],
    functionName: 'startPublicSale',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link malogABI}__ and `functionName` set to `"toggle"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x0082F3387365e414512f06c4a587BbdC553c5049)
 */
export function useMalogToggle<
  TMode extends WriteContractMode = undefined,
  TChainId extends number = keyof typeof malogAddress,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<typeof malogABI, 'toggle'>['request']['abi'],
        'toggle',
        TMode
      > & { address?: Address; chainId?: TChainId; functionName?: 'toggle' }
    : UseContractWriteConfig<typeof malogABI, 'toggle', TMode> & {
        abi?: never
        address?: never
        chainId?: TChainId
        functionName?: 'toggle'
      } = {} as any,
) {
  return useContractWrite<typeof malogABI, 'toggle', TMode>({
    abi: malogABI,
    address: malogAddress[11155111],
    functionName: 'toggle',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link malogABI}__ and `functionName` set to `"transferFrom"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x0082F3387365e414512f06c4a587BbdC553c5049)
 */
export function useMalogTransferFrom<
  TMode extends WriteContractMode = undefined,
  TChainId extends number = keyof typeof malogAddress,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof malogABI,
          'transferFrom'
        >['request']['abi'],
        'transferFrom',
        TMode
      > & {
        address?: Address
        chainId?: TChainId
        functionName?: 'transferFrom'
      }
    : UseContractWriteConfig<typeof malogABI, 'transferFrom', TMode> & {
        abi?: never
        address?: never
        chainId?: TChainId
        functionName?: 'transferFrom'
      } = {} as any,
) {
  return useContractWrite<typeof malogABI, 'transferFrom', TMode>({
    abi: malogABI,
    address: malogAddress[11155111],
    functionName: 'transferFrom',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link malogABI}__ and `functionName` set to `"transferOwnership"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x0082F3387365e414512f06c4a587BbdC553c5049)
 */
export function useMalogTransferOwnership<
  TMode extends WriteContractMode = undefined,
  TChainId extends number = keyof typeof malogAddress,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof malogABI,
          'transferOwnership'
        >['request']['abi'],
        'transferOwnership',
        TMode
      > & {
        address?: Address
        chainId?: TChainId
        functionName?: 'transferOwnership'
      }
    : UseContractWriteConfig<typeof malogABI, 'transferOwnership', TMode> & {
        abi?: never
        address?: never
        chainId?: TChainId
        functionName?: 'transferOwnership'
      } = {} as any,
) {
  return useContractWrite<typeof malogABI, 'transferOwnership', TMode>({
    abi: malogABI,
    address: malogAddress[11155111],
    functionName: 'transferOwnership',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link malogABI}__ and `functionName` set to `"transformToAddressesWithNum"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x0082F3387365e414512f06c4a587BbdC553c5049)
 */
export function useMalogTransformToAddressesWithNum<
  TMode extends WriteContractMode = undefined,
  TChainId extends number = keyof typeof malogAddress,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof malogABI,
          'transformToAddressesWithNum'
        >['request']['abi'],
        'transformToAddressesWithNum',
        TMode
      > & {
        address?: Address
        chainId?: TChainId
        functionName?: 'transformToAddressesWithNum'
      }
    : UseContractWriteConfig<
        typeof malogABI,
        'transformToAddressesWithNum',
        TMode
      > & {
        abi?: never
        address?: never
        chainId?: TChainId
        functionName?: 'transformToAddressesWithNum'
      } = {} as any,
) {
  return useContractWrite<
    typeof malogABI,
    'transformToAddressesWithNum',
    TMode
  >({
    abi: malogABI,
    address: malogAddress[11155111],
    functionName: 'transformToAddressesWithNum',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link malogABI}__ and `functionName` set to `"unpause"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x0082F3387365e414512f06c4a587BbdC553c5049)
 */
export function useMalogUnpause<
  TMode extends WriteContractMode = undefined,
  TChainId extends number = keyof typeof malogAddress,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof malogABI,
          'unpause'
        >['request']['abi'],
        'unpause',
        TMode
      > & { address?: Address; chainId?: TChainId; functionName?: 'unpause' }
    : UseContractWriteConfig<typeof malogABI, 'unpause', TMode> & {
        abi?: never
        address?: never
        chainId?: TChainId
        functionName?: 'unpause'
      } = {} as any,
) {
  return useContractWrite<typeof malogABI, 'unpause', TMode>({
    abi: malogABI,
    address: malogAddress[11155111],
    functionName: 'unpause',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link malogABI}__ and `functionName` set to `"withdraw"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x0082F3387365e414512f06c4a587BbdC553c5049)
 */
export function useMalogWithdraw<
  TMode extends WriteContractMode = undefined,
  TChainId extends number = keyof typeof malogAddress,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof malogABI,
          'withdraw'
        >['request']['abi'],
        'withdraw',
        TMode
      > & { address?: Address; chainId?: TChainId; functionName?: 'withdraw' }
    : UseContractWriteConfig<typeof malogABI, 'withdraw', TMode> & {
        abi?: never
        address?: never
        chainId?: TChainId
        functionName?: 'withdraw'
      } = {} as any,
) {
  return useContractWrite<typeof malogABI, 'withdraw', TMode>({
    abi: malogABI,
    address: malogAddress[11155111],
    functionName: 'withdraw',
    ...config,
  } as any)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link malogABI}__.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x0082F3387365e414512f06c4a587BbdC553c5049)
 */
export function usePrepareMalogWrite<TFunctionName extends string>(
  config: Omit<
    UsePrepareContractWriteConfig<typeof malogABI, TFunctionName>,
    'abi' | 'address'
  > & { chainId?: keyof typeof malogAddress } = {} as any,
) {
  return usePrepareContractWrite({
    abi: malogABI,
    address: malogAddress[11155111],
    ...config,
  } as UsePrepareContractWriteConfig<typeof malogABI, TFunctionName>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link malogABI}__ and `functionName` set to `"addWhitelisted"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x0082F3387365e414512f06c4a587BbdC553c5049)
 */
export function usePrepareMalogAddWhitelisted(
  config: Omit<
    UsePrepareContractWriteConfig<typeof malogABI, 'addWhitelisted'>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof malogAddress } = {} as any,
) {
  return usePrepareContractWrite({
    abi: malogABI,
    address: malogAddress[11155111],
    functionName: 'addWhitelisted',
    ...config,
  } as UsePrepareContractWriteConfig<typeof malogABI, 'addWhitelisted'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link malogABI}__ and `functionName` set to `"approve"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x0082F3387365e414512f06c4a587BbdC553c5049)
 */
export function usePrepareMalogApprove(
  config: Omit<
    UsePrepareContractWriteConfig<typeof malogABI, 'approve'>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof malogAddress } = {} as any,
) {
  return usePrepareContractWrite({
    abi: malogABI,
    address: malogAddress[11155111],
    functionName: 'approve',
    ...config,
  } as UsePrepareContractWriteConfig<typeof malogABI, 'approve'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link malogABI}__ and `functionName` set to `"mintApe"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x0082F3387365e414512f06c4a587BbdC553c5049)
 */
export function usePrepareMalogMintApe(
  config: Omit<
    UsePrepareContractWriteConfig<typeof malogABI, 'mintApe'>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof malogAddress } = {} as any,
) {
  return usePrepareContractWrite({
    abi: malogABI,
    address: malogAddress[11155111],
    functionName: 'mintApe',
    ...config,
  } as UsePrepareContractWriteConfig<typeof malogABI, 'mintApe'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link malogABI}__ and `functionName` set to `"mintApeForWhitelisted"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x0082F3387365e414512f06c4a587BbdC553c5049)
 */
export function usePrepareMalogMintApeForWhitelisted(
  config: Omit<
    UsePrepareContractWriteConfig<typeof malogABI, 'mintApeForWhitelisted'>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof malogAddress } = {} as any,
) {
  return usePrepareContractWrite({
    abi: malogABI,
    address: malogAddress[11155111],
    functionName: 'mintApeForWhitelisted',
    ...config,
  } as UsePrepareContractWriteConfig<typeof malogABI, 'mintApeForWhitelisted'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link malogABI}__ and `functionName` set to `"pause"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x0082F3387365e414512f06c4a587BbdC553c5049)
 */
export function usePrepareMalogPause(
  config: Omit<
    UsePrepareContractWriteConfig<typeof malogABI, 'pause'>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof malogAddress } = {} as any,
) {
  return usePrepareContractWrite({
    abi: malogABI,
    address: malogAddress[11155111],
    functionName: 'pause',
    ...config,
  } as UsePrepareContractWriteConfig<typeof malogABI, 'pause'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link malogABI}__ and `functionName` set to `"renounceOwnership"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x0082F3387365e414512f06c4a587BbdC553c5049)
 */
export function usePrepareMalogRenounceOwnership(
  config: Omit<
    UsePrepareContractWriteConfig<typeof malogABI, 'renounceOwnership'>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof malogAddress } = {} as any,
) {
  return usePrepareContractWrite({
    abi: malogABI,
    address: malogAddress[11155111],
    functionName: 'renounceOwnership',
    ...config,
  } as UsePrepareContractWriteConfig<typeof malogABI, 'renounceOwnership'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link malogABI}__ and `functionName` set to `"revealApes"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x0082F3387365e414512f06c4a587BbdC553c5049)
 */
export function usePrepareMalogRevealApes(
  config: Omit<
    UsePrepareContractWriteConfig<typeof malogABI, 'revealApes'>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof malogAddress } = {} as any,
) {
  return usePrepareContractWrite({
    abi: malogABI,
    address: malogAddress[11155111],
    functionName: 'revealApes',
    ...config,
  } as UsePrepareContractWriteConfig<typeof malogABI, 'revealApes'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link malogABI}__ and `functionName` set to `"safeMint"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x0082F3387365e414512f06c4a587BbdC553c5049)
 */
export function usePrepareMalogSafeMint(
  config: Omit<
    UsePrepareContractWriteConfig<typeof malogABI, 'safeMint'>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof malogAddress } = {} as any,
) {
  return usePrepareContractWrite({
    abi: malogABI,
    address: malogAddress[11155111],
    functionName: 'safeMint',
    ...config,
  } as UsePrepareContractWriteConfig<typeof malogABI, 'safeMint'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link malogABI}__ and `functionName` set to `"safeMintMultiple"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x0082F3387365e414512f06c4a587BbdC553c5049)
 */
export function usePrepareMalogSafeMintMultiple(
  config: Omit<
    UsePrepareContractWriteConfig<typeof malogABI, 'safeMintMultiple'>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof malogAddress } = {} as any,
) {
  return usePrepareContractWrite({
    abi: malogABI,
    address: malogAddress[11155111],
    functionName: 'safeMintMultiple',
    ...config,
  } as UsePrepareContractWriteConfig<typeof malogABI, 'safeMintMultiple'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link malogABI}__ and `functionName` set to `"safeTransferFrom"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x0082F3387365e414512f06c4a587BbdC553c5049)
 */
export function usePrepareMalogSafeTransferFrom(
  config: Omit<
    UsePrepareContractWriteConfig<typeof malogABI, 'safeTransferFrom'>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof malogAddress } = {} as any,
) {
  return usePrepareContractWrite({
    abi: malogABI,
    address: malogAddress[11155111],
    functionName: 'safeTransferFrom',
    ...config,
  } as UsePrepareContractWriteConfig<typeof malogABI, 'safeTransferFrom'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link malogABI}__ and `functionName` set to `"setApprovalForAll"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x0082F3387365e414512f06c4a587BbdC553c5049)
 */
export function usePrepareMalogSetApprovalForAll(
  config: Omit<
    UsePrepareContractWriteConfig<typeof malogABI, 'setApprovalForAll'>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof malogAddress } = {} as any,
) {
  return usePrepareContractWrite({
    abi: malogABI,
    address: malogAddress[11155111],
    functionName: 'setApprovalForAll',
    ...config,
  } as UsePrepareContractWriteConfig<typeof malogABI, 'setApprovalForAll'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link malogABI}__ and `functionName` set to `"setPassContract"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x0082F3387365e414512f06c4a587BbdC553c5049)
 */
export function usePrepareMalogSetPassContract(
  config: Omit<
    UsePrepareContractWriteConfig<typeof malogABI, 'setPassContract'>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof malogAddress } = {} as any,
) {
  return usePrepareContractWrite({
    abi: malogABI,
    address: malogAddress[11155111],
    functionName: 'setPassContract',
    ...config,
  } as UsePrepareContractWriteConfig<typeof malogABI, 'setPassContract'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link malogABI}__ and `functionName` set to `"startPublicSale"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x0082F3387365e414512f06c4a587BbdC553c5049)
 */
export function usePrepareMalogStartPublicSale(
  config: Omit<
    UsePrepareContractWriteConfig<typeof malogABI, 'startPublicSale'>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof malogAddress } = {} as any,
) {
  return usePrepareContractWrite({
    abi: malogABI,
    address: malogAddress[11155111],
    functionName: 'startPublicSale',
    ...config,
  } as UsePrepareContractWriteConfig<typeof malogABI, 'startPublicSale'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link malogABI}__ and `functionName` set to `"toggle"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x0082F3387365e414512f06c4a587BbdC553c5049)
 */
export function usePrepareMalogToggle(
  config: Omit<
    UsePrepareContractWriteConfig<typeof malogABI, 'toggle'>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof malogAddress } = {} as any,
) {
  return usePrepareContractWrite({
    abi: malogABI,
    address: malogAddress[11155111],
    functionName: 'toggle',
    ...config,
  } as UsePrepareContractWriteConfig<typeof malogABI, 'toggle'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link malogABI}__ and `functionName` set to `"transferFrom"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x0082F3387365e414512f06c4a587BbdC553c5049)
 */
export function usePrepareMalogTransferFrom(
  config: Omit<
    UsePrepareContractWriteConfig<typeof malogABI, 'transferFrom'>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof malogAddress } = {} as any,
) {
  return usePrepareContractWrite({
    abi: malogABI,
    address: malogAddress[11155111],
    functionName: 'transferFrom',
    ...config,
  } as UsePrepareContractWriteConfig<typeof malogABI, 'transferFrom'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link malogABI}__ and `functionName` set to `"transferOwnership"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x0082F3387365e414512f06c4a587BbdC553c5049)
 */
export function usePrepareMalogTransferOwnership(
  config: Omit<
    UsePrepareContractWriteConfig<typeof malogABI, 'transferOwnership'>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof malogAddress } = {} as any,
) {
  return usePrepareContractWrite({
    abi: malogABI,
    address: malogAddress[11155111],
    functionName: 'transferOwnership',
    ...config,
  } as UsePrepareContractWriteConfig<typeof malogABI, 'transferOwnership'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link malogABI}__ and `functionName` set to `"transformToAddressesWithNum"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x0082F3387365e414512f06c4a587BbdC553c5049)
 */
export function usePrepareMalogTransformToAddressesWithNum(
  config: Omit<
    UsePrepareContractWriteConfig<
      typeof malogABI,
      'transformToAddressesWithNum'
    >,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof malogAddress } = {} as any,
) {
  return usePrepareContractWrite({
    abi: malogABI,
    address: malogAddress[11155111],
    functionName: 'transformToAddressesWithNum',
    ...config,
  } as UsePrepareContractWriteConfig<
    typeof malogABI,
    'transformToAddressesWithNum'
  >)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link malogABI}__ and `functionName` set to `"unpause"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x0082F3387365e414512f06c4a587BbdC553c5049)
 */
export function usePrepareMalogUnpause(
  config: Omit<
    UsePrepareContractWriteConfig<typeof malogABI, 'unpause'>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof malogAddress } = {} as any,
) {
  return usePrepareContractWrite({
    abi: malogABI,
    address: malogAddress[11155111],
    functionName: 'unpause',
    ...config,
  } as UsePrepareContractWriteConfig<typeof malogABI, 'unpause'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link malogABI}__ and `functionName` set to `"withdraw"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x0082F3387365e414512f06c4a587BbdC553c5049)
 */
export function usePrepareMalogWithdraw(
  config: Omit<
    UsePrepareContractWriteConfig<typeof malogABI, 'withdraw'>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof malogAddress } = {} as any,
) {
  return usePrepareContractWrite({
    abi: malogABI,
    address: malogAddress[11155111],
    functionName: 'withdraw',
    ...config,
  } as UsePrepareContractWriteConfig<typeof malogABI, 'withdraw'>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link malogABI}__.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x0082F3387365e414512f06c4a587BbdC553c5049)
 */
export function useMalogEvent<TEventName extends string>(
  config: Omit<
    UseContractEventConfig<typeof malogABI, TEventName>,
    'abi' | 'address'
  > & { chainId?: keyof typeof malogAddress } = {} as any,
) {
  return useContractEvent({
    abi: malogABI,
    address: malogAddress[11155111],
    ...config,
  } as UseContractEventConfig<typeof malogABI, TEventName>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link malogABI}__ and `eventName` set to `"Approval"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x0082F3387365e414512f06c4a587BbdC553c5049)
 */
export function useMalogApprovalEvent(
  config: Omit<
    UseContractEventConfig<typeof malogABI, 'Approval'>,
    'abi' | 'address' | 'eventName'
  > & { chainId?: keyof typeof malogAddress } = {} as any,
) {
  return useContractEvent({
    abi: malogABI,
    address: malogAddress[11155111],
    eventName: 'Approval',
    ...config,
  } as UseContractEventConfig<typeof malogABI, 'Approval'>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link malogABI}__ and `eventName` set to `"ApprovalForAll"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x0082F3387365e414512f06c4a587BbdC553c5049)
 */
export function useMalogApprovalForAllEvent(
  config: Omit<
    UseContractEventConfig<typeof malogABI, 'ApprovalForAll'>,
    'abi' | 'address' | 'eventName'
  > & { chainId?: keyof typeof malogAddress } = {} as any,
) {
  return useContractEvent({
    abi: malogABI,
    address: malogAddress[11155111],
    eventName: 'ApprovalForAll',
    ...config,
  } as UseContractEventConfig<typeof malogABI, 'ApprovalForAll'>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link malogABI}__ and `eventName` set to `"OwnershipTransferred"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x0082F3387365e414512f06c4a587BbdC553c5049)
 */
export function useMalogOwnershipTransferredEvent(
  config: Omit<
    UseContractEventConfig<typeof malogABI, 'OwnershipTransferred'>,
    'abi' | 'address' | 'eventName'
  > & { chainId?: keyof typeof malogAddress } = {} as any,
) {
  return useContractEvent({
    abi: malogABI,
    address: malogAddress[11155111],
    eventName: 'OwnershipTransferred',
    ...config,
  } as UseContractEventConfig<typeof malogABI, 'OwnershipTransferred'>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link malogABI}__ and `eventName` set to `"Transfer"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x0082F3387365e414512f06c4a587BbdC553c5049)
 */
export function useMalogTransferEvent(
  config: Omit<
    UseContractEventConfig<typeof malogABI, 'Transfer'>,
    'abi' | 'address' | 'eventName'
  > & { chainId?: keyof typeof malogAddress } = {} as any,
) {
  return useContractEvent({
    abi: malogABI,
    address: malogAddress[11155111],
    eventName: 'Transfer',
    ...config,
  } as UseContractEventConfig<typeof malogABI, 'Transfer'>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link malpassABI}__.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x8344BE53FB250dd76E65B6721B6553C21053Ee8d)
 */
export function useMalpassRead<
  TFunctionName extends string,
  TSelectData = ReadContractResult<typeof malpassABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof malpassABI, TFunctionName, TSelectData>,
    'abi' | 'address'
  > & { chainId?: keyof typeof malpassAddress } = {} as any,
) {
  return useContractRead({
    abi: malpassABI,
    address: malpassAddress[11155111],
    ...config,
  } as UseContractReadConfig<typeof malpassABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link malpassABI}__ and `functionName` set to `"APE_CONTRACT"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x8344BE53FB250dd76E65B6721B6553C21053Ee8d)
 */
export function useMalpassApeContract<
  TFunctionName extends 'APE_CONTRACT',
  TSelectData = ReadContractResult<typeof malpassABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof malpassABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof malpassAddress } = {} as any,
) {
  return useContractRead({
    abi: malpassABI,
    address: malpassAddress[11155111],
    functionName: 'APE_CONTRACT',
    ...config,
  } as UseContractReadConfig<typeof malpassABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link malpassABI}__ and `functionName` set to `"MAX_FOR_ONE_ADDRESS_BLUE"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x8344BE53FB250dd76E65B6721B6553C21053Ee8d)
 */
export function useMalpassMaxForOneAddressBlue<
  TFunctionName extends 'MAX_FOR_ONE_ADDRESS_BLUE',
  TSelectData = ReadContractResult<typeof malpassABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof malpassABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof malpassAddress } = {} as any,
) {
  return useContractRead({
    abi: malpassABI,
    address: malpassAddress[11155111],
    functionName: 'MAX_FOR_ONE_ADDRESS_BLUE',
    ...config,
  } as UseContractReadConfig<typeof malpassABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link malpassABI}__ and `functionName` set to `"MAX_FOR_ONE_ADDRESS_GOLD"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x8344BE53FB250dd76E65B6721B6553C21053Ee8d)
 */
export function useMalpassMaxForOneAddressGold<
  TFunctionName extends 'MAX_FOR_ONE_ADDRESS_GOLD',
  TSelectData = ReadContractResult<typeof malpassABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof malpassABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof malpassAddress } = {} as any,
) {
  return useContractRead({
    abi: malpassABI,
    address: malpassAddress[11155111],
    functionName: 'MAX_FOR_ONE_ADDRESS_GOLD',
    ...config,
  } as UseContractReadConfig<typeof malpassABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link malpassABI}__ and `functionName` set to `"MAX_FOR_ONE_ADDRESS_GREEN"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x8344BE53FB250dd76E65B6721B6553C21053Ee8d)
 */
export function useMalpassMaxForOneAddressGreen<
  TFunctionName extends 'MAX_FOR_ONE_ADDRESS_GREEN',
  TSelectData = ReadContractResult<typeof malpassABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof malpassABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof malpassAddress } = {} as any,
) {
  return useContractRead({
    abi: malpassABI,
    address: malpassAddress[11155111],
    functionName: 'MAX_FOR_ONE_ADDRESS_GREEN',
    ...config,
  } as UseContractReadConfig<typeof malpassABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link malpassABI}__ and `functionName` set to `"MAX_SUPPLY_BLUE"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x8344BE53FB250dd76E65B6721B6553C21053Ee8d)
 */
export function useMalpassMaxSupplyBlue<
  TFunctionName extends 'MAX_SUPPLY_BLUE',
  TSelectData = ReadContractResult<typeof malpassABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof malpassABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof malpassAddress } = {} as any,
) {
  return useContractRead({
    abi: malpassABI,
    address: malpassAddress[11155111],
    functionName: 'MAX_SUPPLY_BLUE',
    ...config,
  } as UseContractReadConfig<typeof malpassABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link malpassABI}__ and `functionName` set to `"MAX_SUPPLY_GOLD"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x8344BE53FB250dd76E65B6721B6553C21053Ee8d)
 */
export function useMalpassMaxSupplyGold<
  TFunctionName extends 'MAX_SUPPLY_GOLD',
  TSelectData = ReadContractResult<typeof malpassABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof malpassABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof malpassAddress } = {} as any,
) {
  return useContractRead({
    abi: malpassABI,
    address: malpassAddress[11155111],
    functionName: 'MAX_SUPPLY_GOLD',
    ...config,
  } as UseContractReadConfig<typeof malpassABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link malpassABI}__ and `functionName` set to `"MAX_SUPPLY_GREEN"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x8344BE53FB250dd76E65B6721B6553C21053Ee8d)
 */
export function useMalpassMaxSupplyGreen<
  TFunctionName extends 'MAX_SUPPLY_GREEN',
  TSelectData = ReadContractResult<typeof malpassABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof malpassABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof malpassAddress } = {} as any,
) {
  return useContractRead({
    abi: malpassABI,
    address: malpassAddress[11155111],
    functionName: 'MAX_SUPPLY_GREEN',
    ...config,
  } as UseContractReadConfig<typeof malpassABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link malpassABI}__ and `functionName` set to `"MINTED_BLUE"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x8344BE53FB250dd76E65B6721B6553C21053Ee8d)
 */
export function useMalpassMintedBlue<
  TFunctionName extends 'MINTED_BLUE',
  TSelectData = ReadContractResult<typeof malpassABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof malpassABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof malpassAddress } = {} as any,
) {
  return useContractRead({
    abi: malpassABI,
    address: malpassAddress[11155111],
    functionName: 'MINTED_BLUE',
    ...config,
  } as UseContractReadConfig<typeof malpassABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link malpassABI}__ and `functionName` set to `"MINTED_GOLD"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x8344BE53FB250dd76E65B6721B6553C21053Ee8d)
 */
export function useMalpassMintedGold<
  TFunctionName extends 'MINTED_GOLD',
  TSelectData = ReadContractResult<typeof malpassABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof malpassABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof malpassAddress } = {} as any,
) {
  return useContractRead({
    abi: malpassABI,
    address: malpassAddress[11155111],
    functionName: 'MINTED_GOLD',
    ...config,
  } as UseContractReadConfig<typeof malpassABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link malpassABI}__ and `functionName` set to `"MINTED_GREEN"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x8344BE53FB250dd76E65B6721B6553C21053Ee8d)
 */
export function useMalpassMintedGreen<
  TFunctionName extends 'MINTED_GREEN',
  TSelectData = ReadContractResult<typeof malpassABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof malpassABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof malpassAddress } = {} as any,
) {
  return useContractRead({
    abi: malpassABI,
    address: malpassAddress[11155111],
    functionName: 'MINTED_GREEN',
    ...config,
  } as UseContractReadConfig<typeof malpassABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link malpassABI}__ and `functionName` set to `"PASS_PRICE_BLUE"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x8344BE53FB250dd76E65B6721B6553C21053Ee8d)
 */
export function useMalpassPassPriceBlue<
  TFunctionName extends 'PASS_PRICE_BLUE',
  TSelectData = ReadContractResult<typeof malpassABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof malpassABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof malpassAddress } = {} as any,
) {
  return useContractRead({
    abi: malpassABI,
    address: malpassAddress[11155111],
    functionName: 'PASS_PRICE_BLUE',
    ...config,
  } as UseContractReadConfig<typeof malpassABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link malpassABI}__ and `functionName` set to `"PASS_PRICE_GOLD"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x8344BE53FB250dd76E65B6721B6553C21053Ee8d)
 */
export function useMalpassPassPriceGold<
  TFunctionName extends 'PASS_PRICE_GOLD',
  TSelectData = ReadContractResult<typeof malpassABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof malpassABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof malpassAddress } = {} as any,
) {
  return useContractRead({
    abi: malpassABI,
    address: malpassAddress[11155111],
    functionName: 'PASS_PRICE_GOLD',
    ...config,
  } as UseContractReadConfig<typeof malpassABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link malpassABI}__ and `functionName` set to `"PASS_PRICE_GREEN"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x8344BE53FB250dd76E65B6721B6553C21053Ee8d)
 */
export function useMalpassPassPriceGreen<
  TFunctionName extends 'PASS_PRICE_GREEN',
  TSelectData = ReadContractResult<typeof malpassABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof malpassABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof malpassAddress } = {} as any,
) {
  return useContractRead({
    abi: malpassABI,
    address: malpassAddress[11155111],
    functionName: 'PASS_PRICE_GREEN',
    ...config,
  } as UseContractReadConfig<typeof malpassABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link malpassABI}__ and `functionName` set to `"PASS_VALUE_IN_APES_BLUE"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x8344BE53FB250dd76E65B6721B6553C21053Ee8d)
 */
export function useMalpassPassValueInApesBlue<
  TFunctionName extends 'PASS_VALUE_IN_APES_BLUE',
  TSelectData = ReadContractResult<typeof malpassABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof malpassABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof malpassAddress } = {} as any,
) {
  return useContractRead({
    abi: malpassABI,
    address: malpassAddress[11155111],
    functionName: 'PASS_VALUE_IN_APES_BLUE',
    ...config,
  } as UseContractReadConfig<typeof malpassABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link malpassABI}__ and `functionName` set to `"PASS_VALUE_IN_APES_GOLD"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x8344BE53FB250dd76E65B6721B6553C21053Ee8d)
 */
export function useMalpassPassValueInApesGold<
  TFunctionName extends 'PASS_VALUE_IN_APES_GOLD',
  TSelectData = ReadContractResult<typeof malpassABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof malpassABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof malpassAddress } = {} as any,
) {
  return useContractRead({
    abi: malpassABI,
    address: malpassAddress[11155111],
    functionName: 'PASS_VALUE_IN_APES_GOLD',
    ...config,
  } as UseContractReadConfig<typeof malpassABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link malpassABI}__ and `functionName` set to `"PASS_VALUE_IN_APES_GREEN"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x8344BE53FB250dd76E65B6721B6553C21053Ee8d)
 */
export function useMalpassPassValueInApesGreen<
  TFunctionName extends 'PASS_VALUE_IN_APES_GREEN',
  TSelectData = ReadContractResult<typeof malpassABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof malpassABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof malpassAddress } = {} as any,
) {
  return useContractRead({
    abi: malpassABI,
    address: malpassAddress[11155111],
    functionName: 'PASS_VALUE_IN_APES_GREEN',
    ...config,
  } as UseContractReadConfig<typeof malpassABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link malpassABI}__ and `functionName` set to `"RESERVED_GREEN"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x8344BE53FB250dd76E65B6721B6553C21053Ee8d)
 */
export function useMalpassReservedGreen<
  TFunctionName extends 'RESERVED_GREEN',
  TSelectData = ReadContractResult<typeof malpassABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof malpassABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof malpassAddress } = {} as any,
) {
  return useContractRead({
    abi: malpassABI,
    address: malpassAddress[11155111],
    functionName: 'RESERVED_GREEN',
    ...config,
  } as UseContractReadConfig<typeof malpassABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link malpassABI}__ and `functionName` set to `"balanceOf"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x8344BE53FB250dd76E65B6721B6553C21053Ee8d)
 */
export function useMalpassBalanceOf<
  TFunctionName extends 'balanceOf',
  TSelectData = ReadContractResult<typeof malpassABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof malpassABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof malpassAddress } = {} as any,
) {
  return useContractRead({
    abi: malpassABI,
    address: malpassAddress[11155111],
    functionName: 'balanceOf',
    ...config,
  } as UseContractReadConfig<typeof malpassABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link malpassABI}__ and `functionName` set to `"getApproved"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x8344BE53FB250dd76E65B6721B6553C21053Ee8d)
 */
export function useMalpassGetApproved<
  TFunctionName extends 'getApproved',
  TSelectData = ReadContractResult<typeof malpassABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof malpassABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof malpassAddress } = {} as any,
) {
  return useContractRead({
    abi: malpassABI,
    address: malpassAddress[11155111],
    functionName: 'getApproved',
    ...config,
  } as UseContractReadConfig<typeof malpassABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link malpassABI}__ and `functionName` set to `"isApprovedForAll"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x8344BE53FB250dd76E65B6721B6553C21053Ee8d)
 */
export function useMalpassIsApprovedForAll<
  TFunctionName extends 'isApprovedForAll',
  TSelectData = ReadContractResult<typeof malpassABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof malpassABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof malpassAddress } = {} as any,
) {
  return useContractRead({
    abi: malpassABI,
    address: malpassAddress[11155111],
    functionName: 'isApprovedForAll',
    ...config,
  } as UseContractReadConfig<typeof malpassABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link malpassABI}__ and `functionName` set to `"myBalance"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x8344BE53FB250dd76E65B6721B6553C21053Ee8d)
 */
export function useMalpassMyBalance<
  TFunctionName extends 'myBalance',
  TSelectData = ReadContractResult<typeof malpassABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof malpassABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof malpassAddress } = {} as any,
) {
  return useContractRead({
    abi: malpassABI,
    address: malpassAddress[11155111],
    functionName: 'myBalance',
    ...config,
  } as UseContractReadConfig<typeof malpassABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link malpassABI}__ and `functionName` set to `"name"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x8344BE53FB250dd76E65B6721B6553C21053Ee8d)
 */
export function useMalpassName<
  TFunctionName extends 'name',
  TSelectData = ReadContractResult<typeof malpassABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof malpassABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof malpassAddress } = {} as any,
) {
  return useContractRead({
    abi: malpassABI,
    address: malpassAddress[11155111],
    functionName: 'name',
    ...config,
  } as UseContractReadConfig<typeof malpassABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link malpassABI}__ and `functionName` set to `"owner"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x8344BE53FB250dd76E65B6721B6553C21053Ee8d)
 */
export function useMalpassOwner<
  TFunctionName extends 'owner',
  TSelectData = ReadContractResult<typeof malpassABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof malpassABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof malpassAddress } = {} as any,
) {
  return useContractRead({
    abi: malpassABI,
    address: malpassAddress[11155111],
    functionName: 'owner',
    ...config,
  } as UseContractReadConfig<typeof malpassABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link malpassABI}__ and `functionName` set to `"ownerOf"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x8344BE53FB250dd76E65B6721B6553C21053Ee8d)
 */
export function useMalpassOwnerOf<
  TFunctionName extends 'ownerOf',
  TSelectData = ReadContractResult<typeof malpassABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof malpassABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof malpassAddress } = {} as any,
) {
  return useContractRead({
    abi: malpassABI,
    address: malpassAddress[11155111],
    functionName: 'ownerOf',
    ...config,
  } as UseContractReadConfig<typeof malpassABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link malpassABI}__ and `functionName` set to `"pass_value_in_apes"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x8344BE53FB250dd76E65B6721B6553C21053Ee8d)
 */
export function useMalpassPassValueInApes<
  TFunctionName extends 'pass_value_in_apes',
  TSelectData = ReadContractResult<typeof malpassABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof malpassABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof malpassAddress } = {} as any,
) {
  return useContractRead({
    abi: malpassABI,
    address: malpassAddress[11155111],
    functionName: 'pass_value_in_apes',
    ...config,
  } as UseContractReadConfig<typeof malpassABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link malpassABI}__ and `functionName` set to `"paused"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x8344BE53FB250dd76E65B6721B6553C21053Ee8d)
 */
export function useMalpassPaused<
  TFunctionName extends 'paused',
  TSelectData = ReadContractResult<typeof malpassABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof malpassABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof malpassAddress } = {} as any,
) {
  return useContractRead({
    abi: malpassABI,
    address: malpassAddress[11155111],
    functionName: 'paused',
    ...config,
  } as UseContractReadConfig<typeof malpassABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link malpassABI}__ and `functionName` set to `"supportsInterface"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x8344BE53FB250dd76E65B6721B6553C21053Ee8d)
 */
export function useMalpassSupportsInterface<
  TFunctionName extends 'supportsInterface',
  TSelectData = ReadContractResult<typeof malpassABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof malpassABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof malpassAddress } = {} as any,
) {
  return useContractRead({
    abi: malpassABI,
    address: malpassAddress[11155111],
    functionName: 'supportsInterface',
    ...config,
  } as UseContractReadConfig<typeof malpassABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link malpassABI}__ and `functionName` set to `"symbol"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x8344BE53FB250dd76E65B6721B6553C21053Ee8d)
 */
export function useMalpassSymbol<
  TFunctionName extends 'symbol',
  TSelectData = ReadContractResult<typeof malpassABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof malpassABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof malpassAddress } = {} as any,
) {
  return useContractRead({
    abi: malpassABI,
    address: malpassAddress[11155111],
    functionName: 'symbol',
    ...config,
  } as UseContractReadConfig<typeof malpassABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link malpassABI}__ and `functionName` set to `"team_get_percentage"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x8344BE53FB250dd76E65B6721B6553C21053Ee8d)
 */
export function useMalpassTeamGetPercentage<
  TFunctionName extends 'team_get_percentage',
  TSelectData = ReadContractResult<typeof malpassABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof malpassABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof malpassAddress } = {} as any,
) {
  return useContractRead({
    abi: malpassABI,
    address: malpassAddress[11155111],
    functionName: 'team_get_percentage',
    ...config,
  } as UseContractReadConfig<typeof malpassABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link malpassABI}__ and `functionName` set to `"team_get_share_balance"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x8344BE53FB250dd76E65B6721B6553C21053Ee8d)
 */
export function useMalpassTeamGetShareBalance<
  TFunctionName extends 'team_get_share_balance',
  TSelectData = ReadContractResult<typeof malpassABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof malpassABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof malpassAddress } = {} as any,
) {
  return useContractRead({
    abi: malpassABI,
    address: malpassAddress[11155111],
    functionName: 'team_get_share_balance',
    ...config,
  } as UseContractReadConfig<typeof malpassABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link malpassABI}__ and `functionName` set to `"tokenByIndex"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x8344BE53FB250dd76E65B6721B6553C21053Ee8d)
 */
export function useMalpassTokenByIndex<
  TFunctionName extends 'tokenByIndex',
  TSelectData = ReadContractResult<typeof malpassABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof malpassABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof malpassAddress } = {} as any,
) {
  return useContractRead({
    abi: malpassABI,
    address: malpassAddress[11155111],
    functionName: 'tokenByIndex',
    ...config,
  } as UseContractReadConfig<typeof malpassABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link malpassABI}__ and `functionName` set to `"tokenOfOwnerByIndex"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x8344BE53FB250dd76E65B6721B6553C21053Ee8d)
 */
export function useMalpassTokenOfOwnerByIndex<
  TFunctionName extends 'tokenOfOwnerByIndex',
  TSelectData = ReadContractResult<typeof malpassABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof malpassABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof malpassAddress } = {} as any,
) {
  return useContractRead({
    abi: malpassABI,
    address: malpassAddress[11155111],
    functionName: 'tokenOfOwnerByIndex',
    ...config,
  } as UseContractReadConfig<typeof malpassABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link malpassABI}__ and `functionName` set to `"tokenURI"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x8344BE53FB250dd76E65B6721B6553C21053Ee8d)
 */
export function useMalpassTokenUri<
  TFunctionName extends 'tokenURI',
  TSelectData = ReadContractResult<typeof malpassABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof malpassABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof malpassAddress } = {} as any,
) {
  return useContractRead({
    abi: malpassABI,
    address: malpassAddress[11155111],
    functionName: 'tokenURI',
    ...config,
  } as UseContractReadConfig<typeof malpassABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link malpassABI}__ and `functionName` set to `"totalSupply"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x8344BE53FB250dd76E65B6721B6553C21053Ee8d)
 */
export function useMalpassTotalSupply<
  TFunctionName extends 'totalSupply',
  TSelectData = ReadContractResult<typeof malpassABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof malpassABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof malpassAddress } = {} as any,
) {
  return useContractRead({
    abi: malpassABI,
    address: malpassAddress[11155111],
    functionName: 'totalSupply',
    ...config,
  } as UseContractReadConfig<typeof malpassABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link malpassABI}__.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x8344BE53FB250dd76E65B6721B6553C21053Ee8d)
 */
export function useMalpassWrite<
  TFunctionName extends string,
  TMode extends WriteContractMode = undefined,
  TChainId extends number = keyof typeof malpassAddress,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<typeof malpassABI, string>['request']['abi'],
        TFunctionName,
        TMode
      > & { address?: Address; chainId?: TChainId }
    : UseContractWriteConfig<typeof malpassABI, TFunctionName, TMode> & {
        abi?: never
        address?: never
        chainId?: TChainId
      } = {} as any,
) {
  return useContractWrite<typeof malpassABI, TFunctionName, TMode>({
    abi: malpassABI,
    address: malpassAddress[11155111],
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link malpassABI}__ and `functionName` set to `"approve"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x8344BE53FB250dd76E65B6721B6553C21053Ee8d)
 */
export function useMalpassApprove<
  TMode extends WriteContractMode = undefined,
  TChainId extends number = keyof typeof malpassAddress,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof malpassABI,
          'approve'
        >['request']['abi'],
        'approve',
        TMode
      > & { address?: Address; chainId?: TChainId; functionName?: 'approve' }
    : UseContractWriteConfig<typeof malpassABI, 'approve', TMode> & {
        abi?: never
        address?: never
        chainId?: TChainId
        functionName?: 'approve'
      } = {} as any,
) {
  return useContractWrite<typeof malpassABI, 'approve', TMode>({
    abi: malpassABI,
    address: malpassAddress[11155111],
    functionName: 'approve',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link malpassABI}__ and `functionName` set to `"burn"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x8344BE53FB250dd76E65B6721B6553C21053Ee8d)
 */
export function useMalpassBurn<
  TMode extends WriteContractMode = undefined,
  TChainId extends number = keyof typeof malpassAddress,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<typeof malpassABI, 'burn'>['request']['abi'],
        'burn',
        TMode
      > & { address?: Address; chainId?: TChainId; functionName?: 'burn' }
    : UseContractWriteConfig<typeof malpassABI, 'burn', TMode> & {
        abi?: never
        address?: never
        chainId?: TChainId
        functionName?: 'burn'
      } = {} as any,
) {
  return useContractWrite<typeof malpassABI, 'burn', TMode>({
    abi: malpassABI,
    address: malpassAddress[11155111],
    functionName: 'burn',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link malpassABI}__ and `functionName` set to `"get_pass"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x8344BE53FB250dd76E65B6721B6553C21053Ee8d)
 */
export function useMalpassGetPass<
  TMode extends WriteContractMode = undefined,
  TChainId extends number = keyof typeof malpassAddress,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof malpassABI,
          'get_pass'
        >['request']['abi'],
        'get_pass',
        TMode
      > & { address?: Address; chainId?: TChainId; functionName?: 'get_pass' }
    : UseContractWriteConfig<typeof malpassABI, 'get_pass', TMode> & {
        abi?: never
        address?: never
        chainId?: TChainId
        functionName?: 'get_pass'
      } = {} as any,
) {
  return useContractWrite<typeof malpassABI, 'get_pass', TMode>({
    abi: malpassABI,
    address: malpassAddress[11155111],
    functionName: 'get_pass',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link malpassABI}__ and `functionName` set to `"pause"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x8344BE53FB250dd76E65B6721B6553C21053Ee8d)
 */
export function useMalpassPause<
  TMode extends WriteContractMode = undefined,
  TChainId extends number = keyof typeof malpassAddress,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof malpassABI,
          'pause'
        >['request']['abi'],
        'pause',
        TMode
      > & { address?: Address; chainId?: TChainId; functionName?: 'pause' }
    : UseContractWriteConfig<typeof malpassABI, 'pause', TMode> & {
        abi?: never
        address?: never
        chainId?: TChainId
        functionName?: 'pause'
      } = {} as any,
) {
  return useContractWrite<typeof malpassABI, 'pause', TMode>({
    abi: malpassABI,
    address: malpassAddress[11155111],
    functionName: 'pause',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link malpassABI}__ and `functionName` set to `"renounceOwnership"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x8344BE53FB250dd76E65B6721B6553C21053Ee8d)
 */
export function useMalpassRenounceOwnership<
  TMode extends WriteContractMode = undefined,
  TChainId extends number = keyof typeof malpassAddress,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof malpassABI,
          'renounceOwnership'
        >['request']['abi'],
        'renounceOwnership',
        TMode
      > & {
        address?: Address
        chainId?: TChainId
        functionName?: 'renounceOwnership'
      }
    : UseContractWriteConfig<typeof malpassABI, 'renounceOwnership', TMode> & {
        abi?: never
        address?: never
        chainId?: TChainId
        functionName?: 'renounceOwnership'
      } = {} as any,
) {
  return useContractWrite<typeof malpassABI, 'renounceOwnership', TMode>({
    abi: malpassABI,
    address: malpassAddress[11155111],
    functionName: 'renounceOwnership',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link malpassABI}__ and `functionName` set to `"reservePasses"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x8344BE53FB250dd76E65B6721B6553C21053Ee8d)
 */
export function useMalpassReservePasses<
  TMode extends WriteContractMode = undefined,
  TChainId extends number = keyof typeof malpassAddress,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof malpassABI,
          'reservePasses'
        >['request']['abi'],
        'reservePasses',
        TMode
      > & {
        address?: Address
        chainId?: TChainId
        functionName?: 'reservePasses'
      }
    : UseContractWriteConfig<typeof malpassABI, 'reservePasses', TMode> & {
        abi?: never
        address?: never
        chainId?: TChainId
        functionName?: 'reservePasses'
      } = {} as any,
) {
  return useContractWrite<typeof malpassABI, 'reservePasses', TMode>({
    abi: malpassABI,
    address: malpassAddress[11155111],
    functionName: 'reservePasses',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link malpassABI}__ and `functionName` set to `"safeTransferFrom"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x8344BE53FB250dd76E65B6721B6553C21053Ee8d)
 */
export function useMalpassSafeTransferFrom<
  TMode extends WriteContractMode = undefined,
  TChainId extends number = keyof typeof malpassAddress,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof malpassABI,
          'safeTransferFrom'
        >['request']['abi'],
        'safeTransferFrom',
        TMode
      > & {
        address?: Address
        chainId?: TChainId
        functionName?: 'safeTransferFrom'
      }
    : UseContractWriteConfig<typeof malpassABI, 'safeTransferFrom', TMode> & {
        abi?: never
        address?: never
        chainId?: TChainId
        functionName?: 'safeTransferFrom'
      } = {} as any,
) {
  return useContractWrite<typeof malpassABI, 'safeTransferFrom', TMode>({
    abi: malpassABI,
    address: malpassAddress[11155111],
    functionName: 'safeTransferFrom',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link malpassABI}__ and `functionName` set to `"setApeContract"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x8344BE53FB250dd76E65B6721B6553C21053Ee8d)
 */
export function useMalpassSetApeContract<
  TMode extends WriteContractMode = undefined,
  TChainId extends number = keyof typeof malpassAddress,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof malpassABI,
          'setApeContract'
        >['request']['abi'],
        'setApeContract',
        TMode
      > & {
        address?: Address
        chainId?: TChainId
        functionName?: 'setApeContract'
      }
    : UseContractWriteConfig<typeof malpassABI, 'setApeContract', TMode> & {
        abi?: never
        address?: never
        chainId?: TChainId
        functionName?: 'setApeContract'
      } = {} as any,
) {
  return useContractWrite<typeof malpassABI, 'setApeContract', TMode>({
    abi: malpassABI,
    address: malpassAddress[11155111],
    functionName: 'setApeContract',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link malpassABI}__ and `functionName` set to `"setApprovalForAll"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x8344BE53FB250dd76E65B6721B6553C21053Ee8d)
 */
export function useMalpassSetApprovalForAll<
  TMode extends WriteContractMode = undefined,
  TChainId extends number = keyof typeof malpassAddress,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof malpassABI,
          'setApprovalForAll'
        >['request']['abi'],
        'setApprovalForAll',
        TMode
      > & {
        address?: Address
        chainId?: TChainId
        functionName?: 'setApprovalForAll'
      }
    : UseContractWriteConfig<typeof malpassABI, 'setApprovalForAll', TMode> & {
        abi?: never
        address?: never
        chainId?: TChainId
        functionName?: 'setApprovalForAll'
      } = {} as any,
) {
  return useContractWrite<typeof malpassABI, 'setApprovalForAll', TMode>({
    abi: malpassABI,
    address: malpassAddress[11155111],
    functionName: 'setApprovalForAll',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link malpassABI}__ and `functionName` set to `"transferFrom"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x8344BE53FB250dd76E65B6721B6553C21053Ee8d)
 */
export function useMalpassTransferFrom<
  TMode extends WriteContractMode = undefined,
  TChainId extends number = keyof typeof malpassAddress,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof malpassABI,
          'transferFrom'
        >['request']['abi'],
        'transferFrom',
        TMode
      > & {
        address?: Address
        chainId?: TChainId
        functionName?: 'transferFrom'
      }
    : UseContractWriteConfig<typeof malpassABI, 'transferFrom', TMode> & {
        abi?: never
        address?: never
        chainId?: TChainId
        functionName?: 'transferFrom'
      } = {} as any,
) {
  return useContractWrite<typeof malpassABI, 'transferFrom', TMode>({
    abi: malpassABI,
    address: malpassAddress[11155111],
    functionName: 'transferFrom',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link malpassABI}__ and `functionName` set to `"transferOwnership"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x8344BE53FB250dd76E65B6721B6553C21053Ee8d)
 */
export function useMalpassTransferOwnership<
  TMode extends WriteContractMode = undefined,
  TChainId extends number = keyof typeof malpassAddress,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof malpassABI,
          'transferOwnership'
        >['request']['abi'],
        'transferOwnership',
        TMode
      > & {
        address?: Address
        chainId?: TChainId
        functionName?: 'transferOwnership'
      }
    : UseContractWriteConfig<typeof malpassABI, 'transferOwnership', TMode> & {
        abi?: never
        address?: never
        chainId?: TChainId
        functionName?: 'transferOwnership'
      } = {} as any,
) {
  return useContractWrite<typeof malpassABI, 'transferOwnership', TMode>({
    abi: malpassABI,
    address: malpassAddress[11155111],
    functionName: 'transferOwnership',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link malpassABI}__ and `functionName` set to `"unpause"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x8344BE53FB250dd76E65B6721B6553C21053Ee8d)
 */
export function useMalpassUnpause<
  TMode extends WriteContractMode = undefined,
  TChainId extends number = keyof typeof malpassAddress,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof malpassABI,
          'unpause'
        >['request']['abi'],
        'unpause',
        TMode
      > & { address?: Address; chainId?: TChainId; functionName?: 'unpause' }
    : UseContractWriteConfig<typeof malpassABI, 'unpause', TMode> & {
        abi?: never
        address?: never
        chainId?: TChainId
        functionName?: 'unpause'
      } = {} as any,
) {
  return useContractWrite<typeof malpassABI, 'unpause', TMode>({
    abi: malpassABI,
    address: malpassAddress[11155111],
    functionName: 'unpause',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link malpassABI}__ and `functionName` set to `"withdraw"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x8344BE53FB250dd76E65B6721B6553C21053Ee8d)
 */
export function useMalpassWithdraw<
  TMode extends WriteContractMode = undefined,
  TChainId extends number = keyof typeof malpassAddress,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof malpassABI,
          'withdraw'
        >['request']['abi'],
        'withdraw',
        TMode
      > & { address?: Address; chainId?: TChainId; functionName?: 'withdraw' }
    : UseContractWriteConfig<typeof malpassABI, 'withdraw', TMode> & {
        abi?: never
        address?: never
        chainId?: TChainId
        functionName?: 'withdraw'
      } = {} as any,
) {
  return useContractWrite<typeof malpassABI, 'withdraw', TMode>({
    abi: malpassABI,
    address: malpassAddress[11155111],
    functionName: 'withdraw',
    ...config,
  } as any)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link malpassABI}__.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x8344BE53FB250dd76E65B6721B6553C21053Ee8d)
 */
export function usePrepareMalpassWrite<TFunctionName extends string>(
  config: Omit<
    UsePrepareContractWriteConfig<typeof malpassABI, TFunctionName>,
    'abi' | 'address'
  > & { chainId?: keyof typeof malpassAddress } = {} as any,
) {
  return usePrepareContractWrite({
    abi: malpassABI,
    address: malpassAddress[11155111],
    ...config,
  } as UsePrepareContractWriteConfig<typeof malpassABI, TFunctionName>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link malpassABI}__ and `functionName` set to `"approve"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x8344BE53FB250dd76E65B6721B6553C21053Ee8d)
 */
export function usePrepareMalpassApprove(
  config: Omit<
    UsePrepareContractWriteConfig<typeof malpassABI, 'approve'>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof malpassAddress } = {} as any,
) {
  return usePrepareContractWrite({
    abi: malpassABI,
    address: malpassAddress[11155111],
    functionName: 'approve',
    ...config,
  } as UsePrepareContractWriteConfig<typeof malpassABI, 'approve'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link malpassABI}__ and `functionName` set to `"burn"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x8344BE53FB250dd76E65B6721B6553C21053Ee8d)
 */
export function usePrepareMalpassBurn(
  config: Omit<
    UsePrepareContractWriteConfig<typeof malpassABI, 'burn'>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof malpassAddress } = {} as any,
) {
  return usePrepareContractWrite({
    abi: malpassABI,
    address: malpassAddress[11155111],
    functionName: 'burn',
    ...config,
  } as UsePrepareContractWriteConfig<typeof malpassABI, 'burn'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link malpassABI}__ and `functionName` set to `"get_pass"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x8344BE53FB250dd76E65B6721B6553C21053Ee8d)
 */
export function usePrepareMalpassGetPass(
  config: Omit<
    UsePrepareContractWriteConfig<typeof malpassABI, 'get_pass'>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof malpassAddress } = {} as any,
) {
  return usePrepareContractWrite({
    abi: malpassABI,
    address: malpassAddress[11155111],
    functionName: 'get_pass',
    ...config,
  } as UsePrepareContractWriteConfig<typeof malpassABI, 'get_pass'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link malpassABI}__ and `functionName` set to `"pause"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x8344BE53FB250dd76E65B6721B6553C21053Ee8d)
 */
export function usePrepareMalpassPause(
  config: Omit<
    UsePrepareContractWriteConfig<typeof malpassABI, 'pause'>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof malpassAddress } = {} as any,
) {
  return usePrepareContractWrite({
    abi: malpassABI,
    address: malpassAddress[11155111],
    functionName: 'pause',
    ...config,
  } as UsePrepareContractWriteConfig<typeof malpassABI, 'pause'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link malpassABI}__ and `functionName` set to `"renounceOwnership"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x8344BE53FB250dd76E65B6721B6553C21053Ee8d)
 */
export function usePrepareMalpassRenounceOwnership(
  config: Omit<
    UsePrepareContractWriteConfig<typeof malpassABI, 'renounceOwnership'>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof malpassAddress } = {} as any,
) {
  return usePrepareContractWrite({
    abi: malpassABI,
    address: malpassAddress[11155111],
    functionName: 'renounceOwnership',
    ...config,
  } as UsePrepareContractWriteConfig<typeof malpassABI, 'renounceOwnership'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link malpassABI}__ and `functionName` set to `"reservePasses"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x8344BE53FB250dd76E65B6721B6553C21053Ee8d)
 */
export function usePrepareMalpassReservePasses(
  config: Omit<
    UsePrepareContractWriteConfig<typeof malpassABI, 'reservePasses'>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof malpassAddress } = {} as any,
) {
  return usePrepareContractWrite({
    abi: malpassABI,
    address: malpassAddress[11155111],
    functionName: 'reservePasses',
    ...config,
  } as UsePrepareContractWriteConfig<typeof malpassABI, 'reservePasses'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link malpassABI}__ and `functionName` set to `"safeTransferFrom"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x8344BE53FB250dd76E65B6721B6553C21053Ee8d)
 */
export function usePrepareMalpassSafeTransferFrom(
  config: Omit<
    UsePrepareContractWriteConfig<typeof malpassABI, 'safeTransferFrom'>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof malpassAddress } = {} as any,
) {
  return usePrepareContractWrite({
    abi: malpassABI,
    address: malpassAddress[11155111],
    functionName: 'safeTransferFrom',
    ...config,
  } as UsePrepareContractWriteConfig<typeof malpassABI, 'safeTransferFrom'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link malpassABI}__ and `functionName` set to `"setApeContract"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x8344BE53FB250dd76E65B6721B6553C21053Ee8d)
 */
export function usePrepareMalpassSetApeContract(
  config: Omit<
    UsePrepareContractWriteConfig<typeof malpassABI, 'setApeContract'>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof malpassAddress } = {} as any,
) {
  return usePrepareContractWrite({
    abi: malpassABI,
    address: malpassAddress[11155111],
    functionName: 'setApeContract',
    ...config,
  } as UsePrepareContractWriteConfig<typeof malpassABI, 'setApeContract'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link malpassABI}__ and `functionName` set to `"setApprovalForAll"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x8344BE53FB250dd76E65B6721B6553C21053Ee8d)
 */
export function usePrepareMalpassSetApprovalForAll(
  config: Omit<
    UsePrepareContractWriteConfig<typeof malpassABI, 'setApprovalForAll'>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof malpassAddress } = {} as any,
) {
  return usePrepareContractWrite({
    abi: malpassABI,
    address: malpassAddress[11155111],
    functionName: 'setApprovalForAll',
    ...config,
  } as UsePrepareContractWriteConfig<typeof malpassABI, 'setApprovalForAll'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link malpassABI}__ and `functionName` set to `"transferFrom"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x8344BE53FB250dd76E65B6721B6553C21053Ee8d)
 */
export function usePrepareMalpassTransferFrom(
  config: Omit<
    UsePrepareContractWriteConfig<typeof malpassABI, 'transferFrom'>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof malpassAddress } = {} as any,
) {
  return usePrepareContractWrite({
    abi: malpassABI,
    address: malpassAddress[11155111],
    functionName: 'transferFrom',
    ...config,
  } as UsePrepareContractWriteConfig<typeof malpassABI, 'transferFrom'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link malpassABI}__ and `functionName` set to `"transferOwnership"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x8344BE53FB250dd76E65B6721B6553C21053Ee8d)
 */
export function usePrepareMalpassTransferOwnership(
  config: Omit<
    UsePrepareContractWriteConfig<typeof malpassABI, 'transferOwnership'>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof malpassAddress } = {} as any,
) {
  return usePrepareContractWrite({
    abi: malpassABI,
    address: malpassAddress[11155111],
    functionName: 'transferOwnership',
    ...config,
  } as UsePrepareContractWriteConfig<typeof malpassABI, 'transferOwnership'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link malpassABI}__ and `functionName` set to `"unpause"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x8344BE53FB250dd76E65B6721B6553C21053Ee8d)
 */
export function usePrepareMalpassUnpause(
  config: Omit<
    UsePrepareContractWriteConfig<typeof malpassABI, 'unpause'>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof malpassAddress } = {} as any,
) {
  return usePrepareContractWrite({
    abi: malpassABI,
    address: malpassAddress[11155111],
    functionName: 'unpause',
    ...config,
  } as UsePrepareContractWriteConfig<typeof malpassABI, 'unpause'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link malpassABI}__ and `functionName` set to `"withdraw"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x8344BE53FB250dd76E65B6721B6553C21053Ee8d)
 */
export function usePrepareMalpassWithdraw(
  config: Omit<
    UsePrepareContractWriteConfig<typeof malpassABI, 'withdraw'>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof malpassAddress } = {} as any,
) {
  return usePrepareContractWrite({
    abi: malpassABI,
    address: malpassAddress[11155111],
    functionName: 'withdraw',
    ...config,
  } as UsePrepareContractWriteConfig<typeof malpassABI, 'withdraw'>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link malpassABI}__.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x8344BE53FB250dd76E65B6721B6553C21053Ee8d)
 */
export function useMalpassEvent<TEventName extends string>(
  config: Omit<
    UseContractEventConfig<typeof malpassABI, TEventName>,
    'abi' | 'address'
  > & { chainId?: keyof typeof malpassAddress } = {} as any,
) {
  return useContractEvent({
    abi: malpassABI,
    address: malpassAddress[11155111],
    ...config,
  } as UseContractEventConfig<typeof malpassABI, TEventName>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link malpassABI}__ and `eventName` set to `"Approval"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x8344BE53FB250dd76E65B6721B6553C21053Ee8d)
 */
export function useMalpassApprovalEvent(
  config: Omit<
    UseContractEventConfig<typeof malpassABI, 'Approval'>,
    'abi' | 'address' | 'eventName'
  > & { chainId?: keyof typeof malpassAddress } = {} as any,
) {
  return useContractEvent({
    abi: malpassABI,
    address: malpassAddress[11155111],
    eventName: 'Approval',
    ...config,
  } as UseContractEventConfig<typeof malpassABI, 'Approval'>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link malpassABI}__ and `eventName` set to `"ApprovalForAll"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x8344BE53FB250dd76E65B6721B6553C21053Ee8d)
 */
export function useMalpassApprovalForAllEvent(
  config: Omit<
    UseContractEventConfig<typeof malpassABI, 'ApprovalForAll'>,
    'abi' | 'address' | 'eventName'
  > & { chainId?: keyof typeof malpassAddress } = {} as any,
) {
  return useContractEvent({
    abi: malpassABI,
    address: malpassAddress[11155111],
    eventName: 'ApprovalForAll',
    ...config,
  } as UseContractEventConfig<typeof malpassABI, 'ApprovalForAll'>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link malpassABI}__ and `eventName` set to `"OwnershipTransferred"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x8344BE53FB250dd76E65B6721B6553C21053Ee8d)
 */
export function useMalpassOwnershipTransferredEvent(
  config: Omit<
    UseContractEventConfig<typeof malpassABI, 'OwnershipTransferred'>,
    'abi' | 'address' | 'eventName'
  > & { chainId?: keyof typeof malpassAddress } = {} as any,
) {
  return useContractEvent({
    abi: malpassABI,
    address: malpassAddress[11155111],
    eventName: 'OwnershipTransferred',
    ...config,
  } as UseContractEventConfig<typeof malpassABI, 'OwnershipTransferred'>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link malpassABI}__ and `eventName` set to `"Paused"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x8344BE53FB250dd76E65B6721B6553C21053Ee8d)
 */
export function useMalpassPausedEvent(
  config: Omit<
    UseContractEventConfig<typeof malpassABI, 'Paused'>,
    'abi' | 'address' | 'eventName'
  > & { chainId?: keyof typeof malpassAddress } = {} as any,
) {
  return useContractEvent({
    abi: malpassABI,
    address: malpassAddress[11155111],
    eventName: 'Paused',
    ...config,
  } as UseContractEventConfig<typeof malpassABI, 'Paused'>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link malpassABI}__ and `eventName` set to `"Transfer"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x8344BE53FB250dd76E65B6721B6553C21053Ee8d)
 */
export function useMalpassTransferEvent(
  config: Omit<
    UseContractEventConfig<typeof malpassABI, 'Transfer'>,
    'abi' | 'address' | 'eventName'
  > & { chainId?: keyof typeof malpassAddress } = {} as any,
) {
  return useContractEvent({
    abi: malpassABI,
    address: malpassAddress[11155111],
    eventName: 'Transfer',
    ...config,
  } as UseContractEventConfig<typeof malpassABI, 'Transfer'>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link malpassABI}__ and `eventName` set to `"Unpaused"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x8344BE53FB250dd76E65B6721B6553C21053Ee8d)
 */
export function useMalpassUnpausedEvent(
  config: Omit<
    UseContractEventConfig<typeof malpassABI, 'Unpaused'>,
    'abi' | 'address' | 'eventName'
  > & { chainId?: keyof typeof malpassAddress } = {} as any,
) {
  return useContractEvent({
    abi: malpassABI,
    address: malpassAddress[11155111],
    eventName: 'Unpaused',
    ...config,
  } as UseContractEventConfig<typeof malpassABI, 'Unpaused'>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link malstakingABI}__.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xD78466a0F030Dd8D95CfFe33F867e436Ef5DC167)
 */
export function useMalstakingRead<
  TFunctionName extends string,
  TSelectData = ReadContractResult<typeof malstakingABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof malstakingABI, TFunctionName, TSelectData>,
    'abi' | 'address'
  > & { chainId?: keyof typeof malstakingAddress } = {} as any,
) {
  return useContractRead({
    abi: malstakingABI,
    address: malstakingAddress[11155111],
    ...config,
  } as UseContractReadConfig<typeof malstakingABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link malstakingABI}__ and `functionName` set to `"ApeNft"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xD78466a0F030Dd8D95CfFe33F867e436Ef5DC167)
 */
export function useMalstakingApeNft<
  TFunctionName extends 'ApeNft',
  TSelectData = ReadContractResult<typeof malstakingABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof malstakingABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof malstakingAddress } = {} as any,
) {
  return useContractRead({
    abi: malstakingABI,
    address: malstakingAddress[11155111],
    functionName: 'ApeNft',
    ...config,
  } as UseContractReadConfig<typeof malstakingABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link malstakingABI}__ and `functionName` set to `"BreedingNft"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xD78466a0F030Dd8D95CfFe33F867e436Ef5DC167)
 */
export function useMalstakingBreedingNft<
  TFunctionName extends 'BreedingNft',
  TSelectData = ReadContractResult<typeof malstakingABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof malstakingABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof malstakingAddress } = {} as any,
) {
  return useContractRead({
    abi: malstakingABI,
    address: malstakingAddress[11155111],
    functionName: 'BreedingNft',
    ...config,
  } as UseContractReadConfig<typeof malstakingABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link malstakingABI}__ and `functionName` set to `"LootNft"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xD78466a0F030Dd8D95CfFe33F867e436Ef5DC167)
 */
export function useMalstakingLootNft<
  TFunctionName extends 'LootNft',
  TSelectData = ReadContractResult<typeof malstakingABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof malstakingABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof malstakingAddress } = {} as any,
) {
  return useContractRead({
    abi: malstakingABI,
    address: malstakingAddress[11155111],
    functionName: 'LootNft',
    ...config,
  } as UseContractReadConfig<typeof malstakingABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link malstakingABI}__ and `functionName` set to `"PetNft"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xD78466a0F030Dd8D95CfFe33F867e436Ef5DC167)
 */
export function useMalstakingPetNft<
  TFunctionName extends 'PetNft',
  TSelectData = ReadContractResult<typeof malstakingABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof malstakingABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof malstakingAddress } = {} as any,
) {
  return useContractRead({
    abi: malstakingABI,
    address: malstakingAddress[11155111],
    functionName: 'PetNft',
    ...config,
  } as UseContractReadConfig<typeof malstakingABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link malstakingABI}__ and `functionName` set to `"SECONDS_IN_DAY"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xD78466a0F030Dd8D95CfFe33F867e436Ef5DC167)
 */
export function useMalstakingSecondsInDay<
  TFunctionName extends 'SECONDS_IN_DAY',
  TSelectData = ReadContractResult<typeof malstakingABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof malstakingABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof malstakingAddress } = {} as any,
) {
  return useContractRead({
    abi: malstakingABI,
    address: malstakingAddress[11155111],
    functionName: 'SECONDS_IN_DAY',
    ...config,
  } as UseContractReadConfig<typeof malstakingABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link malstakingABI}__ and `functionName` set to `"TreasuryNft"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xD78466a0F030Dd8D95CfFe33F867e436Ef5DC167)
 */
export function useMalstakingTreasuryNft<
  TFunctionName extends 'TreasuryNft',
  TSelectData = ReadContractResult<typeof malstakingABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof malstakingABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof malstakingAddress } = {} as any,
) {
  return useContractRead({
    abi: malstakingABI,
    address: malstakingAddress[11155111],
    functionName: 'TreasuryNft',
    ...config,
  } as UseContractReadConfig<typeof malstakingABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link malstakingABI}__ and `functionName` set to `"_baseRates"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xD78466a0F030Dd8D95CfFe33F867e436Ef5DC167)
 */
export function useMalstakingBaseRates<
  TFunctionName extends '_baseRates',
  TSelectData = ReadContractResult<typeof malstakingABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof malstakingABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof malstakingAddress } = {} as any,
) {
  return useContractRead({
    abi: malstakingABI,
    address: malstakingAddress[11155111],
    functionName: '_baseRates',
    ...config,
  } as UseContractReadConfig<typeof malstakingABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link malstakingABI}__ and `functionName` set to `"authorisedLog"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xD78466a0F030Dd8D95CfFe33F867e436Ef5DC167)
 */
export function useMalstakingAuthorisedLog<
  TFunctionName extends 'authorisedLog',
  TSelectData = ReadContractResult<typeof malstakingABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof malstakingABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof malstakingAddress } = {} as any,
) {
  return useContractRead({
    abi: malstakingABI,
    address: malstakingAddress[11155111],
    functionName: 'authorisedLog',
    ...config,
  } as UseContractReadConfig<typeof malstakingABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link malstakingABI}__ and `functionName` set to `"balanceOf"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xD78466a0F030Dd8D95CfFe33F867e436Ef5DC167)
 */
export function useMalstakingBalanceOf<
  TFunctionName extends 'balanceOf',
  TSelectData = ReadContractResult<typeof malstakingABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof malstakingABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof malstakingAddress } = {} as any,
) {
  return useContractRead({
    abi: malstakingABI,
    address: malstakingAddress[11155111],
    functionName: 'balanceOf',
    ...config,
  } as UseContractReadConfig<typeof malstakingABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link malstakingABI}__ and `functionName` set to `"depositPaused"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xD78466a0F030Dd8D95CfFe33F867e436Ef5DC167)
 */
export function useMalstakingDepositPaused<
  TFunctionName extends 'depositPaused',
  TSelectData = ReadContractResult<typeof malstakingABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof malstakingABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof malstakingAddress } = {} as any,
) {
  return useContractRead({
    abi: malstakingABI,
    address: malstakingAddress[11155111],
    functionName: 'depositPaused',
    ...config,
  } as UseContractReadConfig<typeof malstakingABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link malstakingABI}__ and `functionName` set to `"getAccumulatedAmount"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xD78466a0F030Dd8D95CfFe33F867e436Ef5DC167)
 */
export function useMalstakingGetAccumulatedAmount<
  TFunctionName extends 'getAccumulatedAmount',
  TSelectData = ReadContractResult<typeof malstakingABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof malstakingABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof malstakingAddress } = {} as any,
) {
  return useContractRead({
    abi: malstakingABI,
    address: malstakingAddress[11155111],
    functionName: 'getAccumulatedAmount',
    ...config,
  } as UseContractReadConfig<typeof malstakingABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link malstakingABI}__ and `functionName` set to `"getApeLootTokenYield"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xD78466a0F030Dd8D95CfFe33F867e436Ef5DC167)
 */
export function useMalstakingGetApeLootTokenYield<
  TFunctionName extends 'getApeLootTokenYield',
  TSelectData = ReadContractResult<typeof malstakingABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof malstakingABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof malstakingAddress } = {} as any,
) {
  return useContractRead({
    abi: malstakingABI,
    address: malstakingAddress[11155111],
    functionName: 'getApeLootTokenYield',
    ...config,
  } as UseContractReadConfig<typeof malstakingABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link malstakingABI}__ and `functionName` set to `"getCurrentReward"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xD78466a0F030Dd8D95CfFe33F867e436Ef5DC167)
 */
export function useMalstakingGetCurrentReward<
  TFunctionName extends 'getCurrentReward',
  TSelectData = ReadContractResult<typeof malstakingABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof malstakingABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof malstakingAddress } = {} as any,
) {
  return useContractRead({
    abi: malstakingABI,
    address: malstakingAddress[11155111],
    functionName: 'getCurrentReward',
    ...config,
  } as UseContractReadConfig<typeof malstakingABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link malstakingABI}__ and `functionName` set to `"getPetTokenYield"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xD78466a0F030Dd8D95CfFe33F867e436Ef5DC167)
 */
export function useMalstakingGetPetTokenYield<
  TFunctionName extends 'getPetTokenYield',
  TSelectData = ReadContractResult<typeof malstakingABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof malstakingABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof malstakingAddress } = {} as any,
) {
  return useContractRead({
    abi: malstakingABI,
    address: malstakingAddress[11155111],
    functionName: 'getPetTokenYield',
    ...config,
  } as UseContractReadConfig<typeof malstakingABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link malstakingABI}__ and `functionName` set to `"getStakerNFT"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xD78466a0F030Dd8D95CfFe33F867e436Ef5DC167)
 */
export function useMalstakingGetStakerNft<
  TFunctionName extends 'getStakerNFT',
  TSelectData = ReadContractResult<typeof malstakingABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof malstakingABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof malstakingAddress } = {} as any,
) {
  return useContractRead({
    abi: malstakingABI,
    address: malstakingAddress[11155111],
    functionName: 'getStakerNFT',
    ...config,
  } as UseContractReadConfig<typeof malstakingABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link malstakingABI}__ and `functionName` set to `"getStakerYield"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xD78466a0F030Dd8D95CfFe33F867e436Ef5DC167)
 */
export function useMalstakingGetStakerYield<
  TFunctionName extends 'getStakerYield',
  TSelectData = ReadContractResult<typeof malstakingABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof malstakingABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof malstakingAddress } = {} as any,
) {
  return useContractRead({
    abi: malstakingABI,
    address: malstakingAddress[11155111],
    functionName: 'getStakerYield',
    ...config,
  } as UseContractReadConfig<typeof malstakingABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link malstakingABI}__ and `functionName` set to `"getTokenYield"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xD78466a0F030Dd8D95CfFe33F867e436Ef5DC167)
 */
export function useMalstakingGetTokenYield<
  TFunctionName extends 'getTokenYield',
  TSelectData = ReadContractResult<typeof malstakingABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof malstakingABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof malstakingAddress } = {} as any,
) {
  return useContractRead({
    abi: malstakingABI,
    address: malstakingAddress[11155111],
    functionName: 'getTokenYield',
    ...config,
  } as UseContractReadConfig<typeof malstakingABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link malstakingABI}__ and `functionName` set to `"onERC721Received"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xD78466a0F030Dd8D95CfFe33F867e436Ef5DC167)
 */
export function useMalstakingOnErc721Received<
  TFunctionName extends 'onERC721Received',
  TSelectData = ReadContractResult<typeof malstakingABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof malstakingABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof malstakingAddress } = {} as any,
) {
  return useContractRead({
    abi: malstakingABI,
    address: malstakingAddress[11155111],
    functionName: 'onERC721Received',
    ...config,
  } as UseContractReadConfig<typeof malstakingABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link malstakingABI}__ and `functionName` set to `"owner"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xD78466a0F030Dd8D95CfFe33F867e436Ef5DC167)
 */
export function useMalstakingOwner<
  TFunctionName extends 'owner',
  TSelectData = ReadContractResult<typeof malstakingABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof malstakingABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof malstakingAddress } = {} as any,
) {
  return useContractRead({
    abi: malstakingABI,
    address: malstakingAddress[11155111],
    functionName: 'owner',
    ...config,
  } as UseContractReadConfig<typeof malstakingABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link malstakingABI}__ and `functionName` set to `"ownerOf"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xD78466a0F030Dd8D95CfFe33F867e436Ef5DC167)
 */
export function useMalstakingOwnerOf<
  TFunctionName extends 'ownerOf',
  TSelectData = ReadContractResult<typeof malstakingABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof malstakingABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof malstakingAddress } = {} as any,
) {
  return useContractRead({
    abi: malstakingABI,
    address: malstakingAddress[11155111],
    functionName: 'ownerOf',
    ...config,
  } as UseContractReadConfig<typeof malstakingABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link malstakingABI}__ and `functionName` set to `"stakingLaunched"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xD78466a0F030Dd8D95CfFe33F867e436Ef5DC167)
 */
export function useMalstakingStakingLaunched<
  TFunctionName extends 'stakingLaunched',
  TSelectData = ReadContractResult<typeof malstakingABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof malstakingABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof malstakingAddress } = {} as any,
) {
  return useContractRead({
    abi: malstakingABI,
    address: malstakingAddress[11155111],
    functionName: 'stakingLaunched',
    ...config,
  } as UseContractReadConfig<typeof malstakingABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link malstakingABI}__ and `functionName` set to `"supportsInterface"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xD78466a0F030Dd8D95CfFe33F867e436Ef5DC167)
 */
export function useMalstakingSupportsInterface<
  TFunctionName extends 'supportsInterface',
  TSelectData = ReadContractResult<typeof malstakingABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof malstakingABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof malstakingAddress } = {} as any,
) {
  return useContractRead({
    abi: malstakingABI,
    address: malstakingAddress[11155111],
    functionName: 'supportsInterface',
    ...config,
  } as UseContractReadConfig<typeof malstakingABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link malstakingABI}__.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xD78466a0F030Dd8D95CfFe33F867e436Ef5DC167)
 */
export function useMalstakingWrite<
  TFunctionName extends string,
  TMode extends WriteContractMode = undefined,
  TChainId extends number = keyof typeof malstakingAddress,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof malstakingABI,
          string
        >['request']['abi'],
        TFunctionName,
        TMode
      > & { address?: Address; chainId?: TChainId }
    : UseContractWriteConfig<typeof malstakingABI, TFunctionName, TMode> & {
        abi?: never
        address?: never
        chainId?: TChainId
      } = {} as any,
) {
  return useContractWrite<typeof malstakingABI, TFunctionName, TMode>({
    abi: malstakingABI,
    address: malstakingAddress[11155111],
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link malstakingABI}__ and `functionName` set to `"addLootToStakedApes"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xD78466a0F030Dd8D95CfFe33F867e436Ef5DC167)
 */
export function useMalstakingAddLootToStakedApes<
  TMode extends WriteContractMode = undefined,
  TChainId extends number = keyof typeof malstakingAddress,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof malstakingABI,
          'addLootToStakedApes'
        >['request']['abi'],
        'addLootToStakedApes',
        TMode
      > & {
        address?: Address
        chainId?: TChainId
        functionName?: 'addLootToStakedApes'
      }
    : UseContractWriteConfig<
        typeof malstakingABI,
        'addLootToStakedApes',
        TMode
      > & {
        abi?: never
        address?: never
        chainId?: TChainId
        functionName?: 'addLootToStakedApes'
      } = {} as any,
) {
  return useContractWrite<typeof malstakingABI, 'addLootToStakedApes', TMode>({
    abi: malstakingABI,
    address: malstakingAddress[11155111],
    functionName: 'addLootToStakedApes',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link malstakingABI}__ and `functionName` set to `"authorise"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xD78466a0F030Dd8D95CfFe33F867e436Ef5DC167)
 */
export function useMalstakingAuthorise<
  TMode extends WriteContractMode = undefined,
  TChainId extends number = keyof typeof malstakingAddress,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof malstakingABI,
          'authorise'
        >['request']['abi'],
        'authorise',
        TMode
      > & { address?: Address; chainId?: TChainId; functionName?: 'authorise' }
    : UseContractWriteConfig<typeof malstakingABI, 'authorise', TMode> & {
        abi?: never
        address?: never
        chainId?: TChainId
        functionName?: 'authorise'
      } = {} as any,
) {
  return useContractWrite<typeof malstakingABI, 'authorise', TMode>({
    abi: malstakingABI,
    address: malstakingAddress[11155111],
    functionName: 'authorise',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link malstakingABI}__ and `functionName` set to `"forceWithdraw721"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xD78466a0F030Dd8D95CfFe33F867e436Ef5DC167)
 */
export function useMalstakingForceWithdraw721<
  TMode extends WriteContractMode = undefined,
  TChainId extends number = keyof typeof malstakingAddress,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof malstakingABI,
          'forceWithdraw721'
        >['request']['abi'],
        'forceWithdraw721',
        TMode
      > & {
        address?: Address
        chainId?: TChainId
        functionName?: 'forceWithdraw721'
      }
    : UseContractWriteConfig<
        typeof malstakingABI,
        'forceWithdraw721',
        TMode
      > & {
        abi?: never
        address?: never
        chainId?: TChainId
        functionName?: 'forceWithdraw721'
      } = {} as any,
) {
  return useContractWrite<typeof malstakingABI, 'forceWithdraw721', TMode>({
    abi: malstakingABI,
    address: malstakingAddress[11155111],
    functionName: 'forceWithdraw721',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link malstakingABI}__ and `functionName` set to `"launchStaking"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xD78466a0F030Dd8D95CfFe33F867e436Ef5DC167)
 */
export function useMalstakingLaunchStaking<
  TMode extends WriteContractMode = undefined,
  TChainId extends number = keyof typeof malstakingAddress,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof malstakingABI,
          'launchStaking'
        >['request']['abi'],
        'launchStaking',
        TMode
      > & {
        address?: Address
        chainId?: TChainId
        functionName?: 'launchStaking'
      }
    : UseContractWriteConfig<typeof malstakingABI, 'launchStaking', TMode> & {
        abi?: never
        address?: never
        chainId?: TChainId
        functionName?: 'launchStaking'
      } = {} as any,
) {
  return useContractWrite<typeof malstakingABI, 'launchStaking', TMode>({
    abi: malstakingABI,
    address: malstakingAddress[11155111],
    functionName: 'launchStaking',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link malstakingABI}__ and `functionName` set to `"onERC1155BatchReceived"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xD78466a0F030Dd8D95CfFe33F867e436Ef5DC167)
 */
export function useMalstakingOnErc1155BatchReceived<
  TMode extends WriteContractMode = undefined,
  TChainId extends number = keyof typeof malstakingAddress,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof malstakingABI,
          'onERC1155BatchReceived'
        >['request']['abi'],
        'onERC1155BatchReceived',
        TMode
      > & {
        address?: Address
        chainId?: TChainId
        functionName?: 'onERC1155BatchReceived'
      }
    : UseContractWriteConfig<
        typeof malstakingABI,
        'onERC1155BatchReceived',
        TMode
      > & {
        abi?: never
        address?: never
        chainId?: TChainId
        functionName?: 'onERC1155BatchReceived'
      } = {} as any,
) {
  return useContractWrite<
    typeof malstakingABI,
    'onERC1155BatchReceived',
    TMode
  >({
    abi: malstakingABI,
    address: malstakingAddress[11155111],
    functionName: 'onERC1155BatchReceived',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link malstakingABI}__ and `functionName` set to `"onERC1155Received"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xD78466a0F030Dd8D95CfFe33F867e436Ef5DC167)
 */
export function useMalstakingOnErc1155Received<
  TMode extends WriteContractMode = undefined,
  TChainId extends number = keyof typeof malstakingAddress,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof malstakingABI,
          'onERC1155Received'
        >['request']['abi'],
        'onERC1155Received',
        TMode
      > & {
        address?: Address
        chainId?: TChainId
        functionName?: 'onERC1155Received'
      }
    : UseContractWriteConfig<
        typeof malstakingABI,
        'onERC1155Received',
        TMode
      > & {
        abi?: never
        address?: never
        chainId?: TChainId
        functionName?: 'onERC1155Received'
      } = {} as any,
) {
  return useContractWrite<typeof malstakingABI, 'onERC1155Received', TMode>({
    abi: malstakingABI,
    address: malstakingAddress[11155111],
    functionName: 'onERC1155Received',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link malstakingABI}__ and `functionName` set to `"pauseDeposit"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xD78466a0F030Dd8D95CfFe33F867e436Ef5DC167)
 */
export function useMalstakingPauseDeposit<
  TMode extends WriteContractMode = undefined,
  TChainId extends number = keyof typeof malstakingAddress,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof malstakingABI,
          'pauseDeposit'
        >['request']['abi'],
        'pauseDeposit',
        TMode
      > & {
        address?: Address
        chainId?: TChainId
        functionName?: 'pauseDeposit'
      }
    : UseContractWriteConfig<typeof malstakingABI, 'pauseDeposit', TMode> & {
        abi?: never
        address?: never
        chainId?: TChainId
        functionName?: 'pauseDeposit'
      } = {} as any,
) {
  return useContractWrite<typeof malstakingABI, 'pauseDeposit', TMode>({
    abi: malstakingABI,
    address: malstakingAddress[11155111],
    functionName: 'pauseDeposit',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link malstakingABI}__ and `functionName` set to `"removeLootFromStakedApes"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xD78466a0F030Dd8D95CfFe33F867e436Ef5DC167)
 */
export function useMalstakingRemoveLootFromStakedApes<
  TMode extends WriteContractMode = undefined,
  TChainId extends number = keyof typeof malstakingAddress,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof malstakingABI,
          'removeLootFromStakedApes'
        >['request']['abi'],
        'removeLootFromStakedApes',
        TMode
      > & {
        address?: Address
        chainId?: TChainId
        functionName?: 'removeLootFromStakedApes'
      }
    : UseContractWriteConfig<
        typeof malstakingABI,
        'removeLootFromStakedApes',
        TMode
      > & {
        abi?: never
        address?: never
        chainId?: TChainId
        functionName?: 'removeLootFromStakedApes'
      } = {} as any,
) {
  return useContractWrite<
    typeof malstakingABI,
    'removeLootFromStakedApes',
    TMode
  >({
    abi: malstakingABI,
    address: malstakingAddress[11155111],
    functionName: 'removeLootFromStakedApes',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link malstakingABI}__ and `functionName` set to `"renounceOwnership"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xD78466a0F030Dd8D95CfFe33F867e436Ef5DC167)
 */
export function useMalstakingRenounceOwnership<
  TMode extends WriteContractMode = undefined,
  TChainId extends number = keyof typeof malstakingAddress,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof malstakingABI,
          'renounceOwnership'
        >['request']['abi'],
        'renounceOwnership',
        TMode
      > & {
        address?: Address
        chainId?: TChainId
        functionName?: 'renounceOwnership'
      }
    : UseContractWriteConfig<
        typeof malstakingABI,
        'renounceOwnership',
        TMode
      > & {
        abi?: never
        address?: never
        chainId?: TChainId
        functionName?: 'renounceOwnership'
      } = {} as any,
) {
  return useContractWrite<typeof malstakingABI, 'renounceOwnership', TMode>({
    abi: malstakingABI,
    address: malstakingAddress[11155111],
    functionName: 'renounceOwnership',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link malstakingABI}__ and `functionName` set to `"setBREEDING"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xD78466a0F030Dd8D95CfFe33F867e436Ef5DC167)
 */
export function useMalstakingSetBreeding<
  TMode extends WriteContractMode = undefined,
  TChainId extends number = keyof typeof malstakingAddress,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof malstakingABI,
          'setBREEDING'
        >['request']['abi'],
        'setBREEDING',
        TMode
      > & {
        address?: Address
        chainId?: TChainId
        functionName?: 'setBREEDING'
      }
    : UseContractWriteConfig<typeof malstakingABI, 'setBREEDING', TMode> & {
        abi?: never
        address?: never
        chainId?: TChainId
        functionName?: 'setBREEDING'
      } = {} as any,
) {
  return useContractWrite<typeof malstakingABI, 'setBREEDING', TMode>({
    abi: malstakingABI,
    address: malstakingAddress[11155111],
    functionName: 'setBREEDING',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link malstakingABI}__ and `functionName` set to `"setIndividualRates"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xD78466a0F030Dd8D95CfFe33F867e436Ef5DC167)
 */
export function useMalstakingSetIndividualRates<
  TMode extends WriteContractMode = undefined,
  TChainId extends number = keyof typeof malstakingAddress,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof malstakingABI,
          'setIndividualRates'
        >['request']['abi'],
        'setIndividualRates',
        TMode
      > & {
        address?: Address
        chainId?: TChainId
        functionName?: 'setIndividualRates'
      }
    : UseContractWriteConfig<
        typeof malstakingABI,
        'setIndividualRates',
        TMode
      > & {
        abi?: never
        address?: never
        chainId?: TChainId
        functionName?: 'setIndividualRates'
      } = {} as any,
) {
  return useContractWrite<typeof malstakingABI, 'setIndividualRates', TMode>({
    abi: malstakingABI,
    address: malstakingAddress[11155111],
    functionName: 'setIndividualRates',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link malstakingABI}__ and `functionName` set to `"setLOOTContract"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xD78466a0F030Dd8D95CfFe33F867e436Ef5DC167)
 */
export function useMalstakingSetLootContract<
  TMode extends WriteContractMode = undefined,
  TChainId extends number = keyof typeof malstakingAddress,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof malstakingABI,
          'setLOOTContract'
        >['request']['abi'],
        'setLOOTContract',
        TMode
      > & {
        address?: Address
        chainId?: TChainId
        functionName?: 'setLOOTContract'
      }
    : UseContractWriteConfig<typeof malstakingABI, 'setLOOTContract', TMode> & {
        abi?: never
        address?: never
        chainId?: TChainId
        functionName?: 'setLOOTContract'
      } = {} as any,
) {
  return useContractWrite<typeof malstakingABI, 'setLOOTContract', TMode>({
    abi: malstakingABI,
    address: malstakingAddress[11155111],
    functionName: 'setLOOTContract',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link malstakingABI}__ and `functionName` set to `"setPETContract"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xD78466a0F030Dd8D95CfFe33F867e436Ef5DC167)
 */
export function useMalstakingSetPetContract<
  TMode extends WriteContractMode = undefined,
  TChainId extends number = keyof typeof malstakingAddress,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof malstakingABI,
          'setPETContract'
        >['request']['abi'],
        'setPETContract',
        TMode
      > & {
        address?: Address
        chainId?: TChainId
        functionName?: 'setPETContract'
      }
    : UseContractWriteConfig<typeof malstakingABI, 'setPETContract', TMode> & {
        abi?: never
        address?: never
        chainId?: TChainId
        functionName?: 'setPETContract'
      } = {} as any,
) {
  return useContractWrite<typeof malstakingABI, 'setPETContract', TMode>({
    abi: malstakingABI,
    address: malstakingAddress[11155111],
    functionName: 'setPETContract',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link malstakingABI}__ and `functionName` set to `"setTREASURYContract"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xD78466a0F030Dd8D95CfFe33F867e436Ef5DC167)
 */
export function useMalstakingSetTreasuryContract<
  TMode extends WriteContractMode = undefined,
  TChainId extends number = keyof typeof malstakingAddress,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof malstakingABI,
          'setTREASURYContract'
        >['request']['abi'],
        'setTREASURYContract',
        TMode
      > & {
        address?: Address
        chainId?: TChainId
        functionName?: 'setTREASURYContract'
      }
    : UseContractWriteConfig<
        typeof malstakingABI,
        'setTREASURYContract',
        TMode
      > & {
        abi?: never
        address?: never
        chainId?: TChainId
        functionName?: 'setTREASURYContract'
      } = {} as any,
) {
  return useContractWrite<typeof malstakingABI, 'setTREASURYContract', TMode>({
    abi: malstakingABI,
    address: malstakingAddress[11155111],
    functionName: 'setTREASURYContract',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link malstakingABI}__ and `functionName` set to `"stake1155"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xD78466a0F030Dd8D95CfFe33F867e436Ef5DC167)
 */
export function useMalstakingStake1155<
  TMode extends WriteContractMode = undefined,
  TChainId extends number = keyof typeof malstakingAddress,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof malstakingABI,
          'stake1155'
        >['request']['abi'],
        'stake1155',
        TMode
      > & { address?: Address; chainId?: TChainId; functionName?: 'stake1155' }
    : UseContractWriteConfig<typeof malstakingABI, 'stake1155', TMode> & {
        abi?: never
        address?: never
        chainId?: TChainId
        functionName?: 'stake1155'
      } = {} as any,
) {
  return useContractWrite<typeof malstakingABI, 'stake1155', TMode>({
    abi: malstakingABI,
    address: malstakingAddress[11155111],
    functionName: 'stake1155',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link malstakingABI}__ and `functionName` set to `"stake721"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xD78466a0F030Dd8D95CfFe33F867e436Ef5DC167)
 */
export function useMalstakingStake721<
  TMode extends WriteContractMode = undefined,
  TChainId extends number = keyof typeof malstakingAddress,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof malstakingABI,
          'stake721'
        >['request']['abi'],
        'stake721',
        TMode
      > & { address?: Address; chainId?: TChainId; functionName?: 'stake721' }
    : UseContractWriteConfig<typeof malstakingABI, 'stake721', TMode> & {
        abi?: never
        address?: never
        chainId?: TChainId
        functionName?: 'stake721'
      } = {} as any,
) {
  return useContractWrite<typeof malstakingABI, 'stake721', TMode>({
    abi: malstakingABI,
    address: malstakingAddress[11155111],
    functionName: 'stake721',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link malstakingABI}__ and `functionName` set to `"stakeApesWithLoots"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xD78466a0F030Dd8D95CfFe33F867e436Ef5DC167)
 */
export function useMalstakingStakeApesWithLoots<
  TMode extends WriteContractMode = undefined,
  TChainId extends number = keyof typeof malstakingAddress,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof malstakingABI,
          'stakeApesWithLoots'
        >['request']['abi'],
        'stakeApesWithLoots',
        TMode
      > & {
        address?: Address
        chainId?: TChainId
        functionName?: 'stakeApesWithLoots'
      }
    : UseContractWriteConfig<
        typeof malstakingABI,
        'stakeApesWithLoots',
        TMode
      > & {
        abi?: never
        address?: never
        chainId?: TChainId
        functionName?: 'stakeApesWithLoots'
      } = {} as any,
) {
  return useContractWrite<typeof malstakingABI, 'stakeApesWithLoots', TMode>({
    abi: malstakingABI,
    address: malstakingAddress[11155111],
    functionName: 'stakeApesWithLoots',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link malstakingABI}__ and `functionName` set to `"transferOwnership"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xD78466a0F030Dd8D95CfFe33F867e436Ef5DC167)
 */
export function useMalstakingTransferOwnership<
  TMode extends WriteContractMode = undefined,
  TChainId extends number = keyof typeof malstakingAddress,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof malstakingABI,
          'transferOwnership'
        >['request']['abi'],
        'transferOwnership',
        TMode
      > & {
        address?: Address
        chainId?: TChainId
        functionName?: 'transferOwnership'
      }
    : UseContractWriteConfig<
        typeof malstakingABI,
        'transferOwnership',
        TMode
      > & {
        abi?: never
        address?: never
        chainId?: TChainId
        functionName?: 'transferOwnership'
      } = {} as any,
) {
  return useContractWrite<typeof malstakingABI, 'transferOwnership', TMode>({
    abi: malstakingABI,
    address: malstakingAddress[11155111],
    functionName: 'transferOwnership',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link malstakingABI}__ and `functionName` set to `"unauthorise"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xD78466a0F030Dd8D95CfFe33F867e436Ef5DC167)
 */
export function useMalstakingUnauthorise<
  TMode extends WriteContractMode = undefined,
  TChainId extends number = keyof typeof malstakingAddress,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof malstakingABI,
          'unauthorise'
        >['request']['abi'],
        'unauthorise',
        TMode
      > & {
        address?: Address
        chainId?: TChainId
        functionName?: 'unauthorise'
      }
    : UseContractWriteConfig<typeof malstakingABI, 'unauthorise', TMode> & {
        abi?: never
        address?: never
        chainId?: TChainId
        functionName?: 'unauthorise'
      } = {} as any,
) {
  return useContractWrite<typeof malstakingABI, 'unauthorise', TMode>({
    abi: malstakingABI,
    address: malstakingAddress[11155111],
    functionName: 'unauthorise',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link malstakingABI}__ and `functionName` set to `"unstake1155"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xD78466a0F030Dd8D95CfFe33F867e436Ef5DC167)
 */
export function useMalstakingUnstake1155<
  TMode extends WriteContractMode = undefined,
  TChainId extends number = keyof typeof malstakingAddress,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof malstakingABI,
          'unstake1155'
        >['request']['abi'],
        'unstake1155',
        TMode
      > & {
        address?: Address
        chainId?: TChainId
        functionName?: 'unstake1155'
      }
    : UseContractWriteConfig<typeof malstakingABI, 'unstake1155', TMode> & {
        abi?: never
        address?: never
        chainId?: TChainId
        functionName?: 'unstake1155'
      } = {} as any,
) {
  return useContractWrite<typeof malstakingABI, 'unstake1155', TMode>({
    abi: malstakingABI,
    address: malstakingAddress[11155111],
    functionName: 'unstake1155',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link malstakingABI}__ and `functionName` set to `"unstake721"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xD78466a0F030Dd8D95CfFe33F867e436Ef5DC167)
 */
export function useMalstakingUnstake721<
  TMode extends WriteContractMode = undefined,
  TChainId extends number = keyof typeof malstakingAddress,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof malstakingABI,
          'unstake721'
        >['request']['abi'],
        'unstake721',
        TMode
      > & { address?: Address; chainId?: TChainId; functionName?: 'unstake721' }
    : UseContractWriteConfig<typeof malstakingABI, 'unstake721', TMode> & {
        abi?: never
        address?: never
        chainId?: TChainId
        functionName?: 'unstake721'
      } = {} as any,
) {
  return useContractWrite<typeof malstakingABI, 'unstake721', TMode>({
    abi: malstakingABI,
    address: malstakingAddress[11155111],
    functionName: 'unstake721',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link malstakingABI}__ and `functionName` set to `"updateBaseYield"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xD78466a0F030Dd8D95CfFe33F867e436Ef5DC167)
 */
export function useMalstakingUpdateBaseYield<
  TMode extends WriteContractMode = undefined,
  TChainId extends number = keyof typeof malstakingAddress,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof malstakingABI,
          'updateBaseYield'
        >['request']['abi'],
        'updateBaseYield',
        TMode
      > & {
        address?: Address
        chainId?: TChainId
        functionName?: 'updateBaseYield'
      }
    : UseContractWriteConfig<typeof malstakingABI, 'updateBaseYield', TMode> & {
        abi?: never
        address?: never
        chainId?: TChainId
        functionName?: 'updateBaseYield'
      } = {} as any,
) {
  return useContractWrite<typeof malstakingABI, 'updateBaseYield', TMode>({
    abi: malstakingABI,
    address: malstakingAddress[11155111],
    functionName: 'updateBaseYield',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link malstakingABI}__ and `functionName` set to `"withdrawETH"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xD78466a0F030Dd8D95CfFe33F867e436Ef5DC167)
 */
export function useMalstakingWithdrawEth<
  TMode extends WriteContractMode = undefined,
  TChainId extends number = keyof typeof malstakingAddress,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof malstakingABI,
          'withdrawETH'
        >['request']['abi'],
        'withdrawETH',
        TMode
      > & {
        address?: Address
        chainId?: TChainId
        functionName?: 'withdrawETH'
      }
    : UseContractWriteConfig<typeof malstakingABI, 'withdrawETH', TMode> & {
        abi?: never
        address?: never
        chainId?: TChainId
        functionName?: 'withdrawETH'
      } = {} as any,
) {
  return useContractWrite<typeof malstakingABI, 'withdrawETH', TMode>({
    abi: malstakingABI,
    address: malstakingAddress[11155111],
    functionName: 'withdrawETH',
    ...config,
  } as any)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link malstakingABI}__.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xD78466a0F030Dd8D95CfFe33F867e436Ef5DC167)
 */
export function usePrepareMalstakingWrite<TFunctionName extends string>(
  config: Omit<
    UsePrepareContractWriteConfig<typeof malstakingABI, TFunctionName>,
    'abi' | 'address'
  > & { chainId?: keyof typeof malstakingAddress } = {} as any,
) {
  return usePrepareContractWrite({
    abi: malstakingABI,
    address: malstakingAddress[11155111],
    ...config,
  } as UsePrepareContractWriteConfig<typeof malstakingABI, TFunctionName>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link malstakingABI}__ and `functionName` set to `"addLootToStakedApes"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xD78466a0F030Dd8D95CfFe33F867e436Ef5DC167)
 */
export function usePrepareMalstakingAddLootToStakedApes(
  config: Omit<
    UsePrepareContractWriteConfig<typeof malstakingABI, 'addLootToStakedApes'>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof malstakingAddress } = {} as any,
) {
  return usePrepareContractWrite({
    abi: malstakingABI,
    address: malstakingAddress[11155111],
    functionName: 'addLootToStakedApes',
    ...config,
  } as UsePrepareContractWriteConfig<
    typeof malstakingABI,
    'addLootToStakedApes'
  >)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link malstakingABI}__ and `functionName` set to `"authorise"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xD78466a0F030Dd8D95CfFe33F867e436Ef5DC167)
 */
export function usePrepareMalstakingAuthorise(
  config: Omit<
    UsePrepareContractWriteConfig<typeof malstakingABI, 'authorise'>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof malstakingAddress } = {} as any,
) {
  return usePrepareContractWrite({
    abi: malstakingABI,
    address: malstakingAddress[11155111],
    functionName: 'authorise',
    ...config,
  } as UsePrepareContractWriteConfig<typeof malstakingABI, 'authorise'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link malstakingABI}__ and `functionName` set to `"forceWithdraw721"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xD78466a0F030Dd8D95CfFe33F867e436Ef5DC167)
 */
export function usePrepareMalstakingForceWithdraw721(
  config: Omit<
    UsePrepareContractWriteConfig<typeof malstakingABI, 'forceWithdraw721'>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof malstakingAddress } = {} as any,
) {
  return usePrepareContractWrite({
    abi: malstakingABI,
    address: malstakingAddress[11155111],
    functionName: 'forceWithdraw721',
    ...config,
  } as UsePrepareContractWriteConfig<typeof malstakingABI, 'forceWithdraw721'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link malstakingABI}__ and `functionName` set to `"launchStaking"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xD78466a0F030Dd8D95CfFe33F867e436Ef5DC167)
 */
export function usePrepareMalstakingLaunchStaking(
  config: Omit<
    UsePrepareContractWriteConfig<typeof malstakingABI, 'launchStaking'>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof malstakingAddress } = {} as any,
) {
  return usePrepareContractWrite({
    abi: malstakingABI,
    address: malstakingAddress[11155111],
    functionName: 'launchStaking',
    ...config,
  } as UsePrepareContractWriteConfig<typeof malstakingABI, 'launchStaking'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link malstakingABI}__ and `functionName` set to `"onERC1155BatchReceived"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xD78466a0F030Dd8D95CfFe33F867e436Ef5DC167)
 */
export function usePrepareMalstakingOnErc1155BatchReceived(
  config: Omit<
    UsePrepareContractWriteConfig<
      typeof malstakingABI,
      'onERC1155BatchReceived'
    >,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof malstakingAddress } = {} as any,
) {
  return usePrepareContractWrite({
    abi: malstakingABI,
    address: malstakingAddress[11155111],
    functionName: 'onERC1155BatchReceived',
    ...config,
  } as UsePrepareContractWriteConfig<
    typeof malstakingABI,
    'onERC1155BatchReceived'
  >)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link malstakingABI}__ and `functionName` set to `"onERC1155Received"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xD78466a0F030Dd8D95CfFe33F867e436Ef5DC167)
 */
export function usePrepareMalstakingOnErc1155Received(
  config: Omit<
    UsePrepareContractWriteConfig<typeof malstakingABI, 'onERC1155Received'>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof malstakingAddress } = {} as any,
) {
  return usePrepareContractWrite({
    abi: malstakingABI,
    address: malstakingAddress[11155111],
    functionName: 'onERC1155Received',
    ...config,
  } as UsePrepareContractWriteConfig<typeof malstakingABI, 'onERC1155Received'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link malstakingABI}__ and `functionName` set to `"pauseDeposit"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xD78466a0F030Dd8D95CfFe33F867e436Ef5DC167)
 */
export function usePrepareMalstakingPauseDeposit(
  config: Omit<
    UsePrepareContractWriteConfig<typeof malstakingABI, 'pauseDeposit'>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof malstakingAddress } = {} as any,
) {
  return usePrepareContractWrite({
    abi: malstakingABI,
    address: malstakingAddress[11155111],
    functionName: 'pauseDeposit',
    ...config,
  } as UsePrepareContractWriteConfig<typeof malstakingABI, 'pauseDeposit'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link malstakingABI}__ and `functionName` set to `"removeLootFromStakedApes"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xD78466a0F030Dd8D95CfFe33F867e436Ef5DC167)
 */
export function usePrepareMalstakingRemoveLootFromStakedApes(
  config: Omit<
    UsePrepareContractWriteConfig<
      typeof malstakingABI,
      'removeLootFromStakedApes'
    >,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof malstakingAddress } = {} as any,
) {
  return usePrepareContractWrite({
    abi: malstakingABI,
    address: malstakingAddress[11155111],
    functionName: 'removeLootFromStakedApes',
    ...config,
  } as UsePrepareContractWriteConfig<
    typeof malstakingABI,
    'removeLootFromStakedApes'
  >)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link malstakingABI}__ and `functionName` set to `"renounceOwnership"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xD78466a0F030Dd8D95CfFe33F867e436Ef5DC167)
 */
export function usePrepareMalstakingRenounceOwnership(
  config: Omit<
    UsePrepareContractWriteConfig<typeof malstakingABI, 'renounceOwnership'>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof malstakingAddress } = {} as any,
) {
  return usePrepareContractWrite({
    abi: malstakingABI,
    address: malstakingAddress[11155111],
    functionName: 'renounceOwnership',
    ...config,
  } as UsePrepareContractWriteConfig<typeof malstakingABI, 'renounceOwnership'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link malstakingABI}__ and `functionName` set to `"setBREEDING"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xD78466a0F030Dd8D95CfFe33F867e436Ef5DC167)
 */
export function usePrepareMalstakingSetBreeding(
  config: Omit<
    UsePrepareContractWriteConfig<typeof malstakingABI, 'setBREEDING'>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof malstakingAddress } = {} as any,
) {
  return usePrepareContractWrite({
    abi: malstakingABI,
    address: malstakingAddress[11155111],
    functionName: 'setBREEDING',
    ...config,
  } as UsePrepareContractWriteConfig<typeof malstakingABI, 'setBREEDING'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link malstakingABI}__ and `functionName` set to `"setIndividualRates"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xD78466a0F030Dd8D95CfFe33F867e436Ef5DC167)
 */
export function usePrepareMalstakingSetIndividualRates(
  config: Omit<
    UsePrepareContractWriteConfig<typeof malstakingABI, 'setIndividualRates'>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof malstakingAddress } = {} as any,
) {
  return usePrepareContractWrite({
    abi: malstakingABI,
    address: malstakingAddress[11155111],
    functionName: 'setIndividualRates',
    ...config,
  } as UsePrepareContractWriteConfig<
    typeof malstakingABI,
    'setIndividualRates'
  >)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link malstakingABI}__ and `functionName` set to `"setLOOTContract"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xD78466a0F030Dd8D95CfFe33F867e436Ef5DC167)
 */
export function usePrepareMalstakingSetLootContract(
  config: Omit<
    UsePrepareContractWriteConfig<typeof malstakingABI, 'setLOOTContract'>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof malstakingAddress } = {} as any,
) {
  return usePrepareContractWrite({
    abi: malstakingABI,
    address: malstakingAddress[11155111],
    functionName: 'setLOOTContract',
    ...config,
  } as UsePrepareContractWriteConfig<typeof malstakingABI, 'setLOOTContract'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link malstakingABI}__ and `functionName` set to `"setPETContract"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xD78466a0F030Dd8D95CfFe33F867e436Ef5DC167)
 */
export function usePrepareMalstakingSetPetContract(
  config: Omit<
    UsePrepareContractWriteConfig<typeof malstakingABI, 'setPETContract'>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof malstakingAddress } = {} as any,
) {
  return usePrepareContractWrite({
    abi: malstakingABI,
    address: malstakingAddress[11155111],
    functionName: 'setPETContract',
    ...config,
  } as UsePrepareContractWriteConfig<typeof malstakingABI, 'setPETContract'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link malstakingABI}__ and `functionName` set to `"setTREASURYContract"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xD78466a0F030Dd8D95CfFe33F867e436Ef5DC167)
 */
export function usePrepareMalstakingSetTreasuryContract(
  config: Omit<
    UsePrepareContractWriteConfig<typeof malstakingABI, 'setTREASURYContract'>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof malstakingAddress } = {} as any,
) {
  return usePrepareContractWrite({
    abi: malstakingABI,
    address: malstakingAddress[11155111],
    functionName: 'setTREASURYContract',
    ...config,
  } as UsePrepareContractWriteConfig<
    typeof malstakingABI,
    'setTREASURYContract'
  >)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link malstakingABI}__ and `functionName` set to `"stake1155"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xD78466a0F030Dd8D95CfFe33F867e436Ef5DC167)
 */
export function usePrepareMalstakingStake1155(
  config: Omit<
    UsePrepareContractWriteConfig<typeof malstakingABI, 'stake1155'>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof malstakingAddress } = {} as any,
) {
  return usePrepareContractWrite({
    abi: malstakingABI,
    address: malstakingAddress[11155111],
    functionName: 'stake1155',
    ...config,
  } as UsePrepareContractWriteConfig<typeof malstakingABI, 'stake1155'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link malstakingABI}__ and `functionName` set to `"stake721"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xD78466a0F030Dd8D95CfFe33F867e436Ef5DC167)
 */
export function usePrepareMalstakingStake721(
  config: Omit<
    UsePrepareContractWriteConfig<typeof malstakingABI, 'stake721'>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof malstakingAddress } = {} as any,
) {
  return usePrepareContractWrite({
    abi: malstakingABI,
    address: malstakingAddress[11155111],
    functionName: 'stake721',
    ...config,
  } as UsePrepareContractWriteConfig<typeof malstakingABI, 'stake721'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link malstakingABI}__ and `functionName` set to `"stakeApesWithLoots"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xD78466a0F030Dd8D95CfFe33F867e436Ef5DC167)
 */
export function usePrepareMalstakingStakeApesWithLoots(
  config: Omit<
    UsePrepareContractWriteConfig<typeof malstakingABI, 'stakeApesWithLoots'>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof malstakingAddress } = {} as any,
) {
  return usePrepareContractWrite({
    abi: malstakingABI,
    address: malstakingAddress[11155111],
    functionName: 'stakeApesWithLoots',
    ...config,
  } as UsePrepareContractWriteConfig<
    typeof malstakingABI,
    'stakeApesWithLoots'
  >)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link malstakingABI}__ and `functionName` set to `"transferOwnership"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xD78466a0F030Dd8D95CfFe33F867e436Ef5DC167)
 */
export function usePrepareMalstakingTransferOwnership(
  config: Omit<
    UsePrepareContractWriteConfig<typeof malstakingABI, 'transferOwnership'>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof malstakingAddress } = {} as any,
) {
  return usePrepareContractWrite({
    abi: malstakingABI,
    address: malstakingAddress[11155111],
    functionName: 'transferOwnership',
    ...config,
  } as UsePrepareContractWriteConfig<typeof malstakingABI, 'transferOwnership'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link malstakingABI}__ and `functionName` set to `"unauthorise"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xD78466a0F030Dd8D95CfFe33F867e436Ef5DC167)
 */
export function usePrepareMalstakingUnauthorise(
  config: Omit<
    UsePrepareContractWriteConfig<typeof malstakingABI, 'unauthorise'>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof malstakingAddress } = {} as any,
) {
  return usePrepareContractWrite({
    abi: malstakingABI,
    address: malstakingAddress[11155111],
    functionName: 'unauthorise',
    ...config,
  } as UsePrepareContractWriteConfig<typeof malstakingABI, 'unauthorise'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link malstakingABI}__ and `functionName` set to `"unstake1155"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xD78466a0F030Dd8D95CfFe33F867e436Ef5DC167)
 */
export function usePrepareMalstakingUnstake1155(
  config: Omit<
    UsePrepareContractWriteConfig<typeof malstakingABI, 'unstake1155'>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof malstakingAddress } = {} as any,
) {
  return usePrepareContractWrite({
    abi: malstakingABI,
    address: malstakingAddress[11155111],
    functionName: 'unstake1155',
    ...config,
  } as UsePrepareContractWriteConfig<typeof malstakingABI, 'unstake1155'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link malstakingABI}__ and `functionName` set to `"unstake721"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xD78466a0F030Dd8D95CfFe33F867e436Ef5DC167)
 */
export function usePrepareMalstakingUnstake721(
  config: Omit<
    UsePrepareContractWriteConfig<typeof malstakingABI, 'unstake721'>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof malstakingAddress } = {} as any,
) {
  return usePrepareContractWrite({
    abi: malstakingABI,
    address: malstakingAddress[11155111],
    functionName: 'unstake721',
    ...config,
  } as UsePrepareContractWriteConfig<typeof malstakingABI, 'unstake721'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link malstakingABI}__ and `functionName` set to `"updateBaseYield"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xD78466a0F030Dd8D95CfFe33F867e436Ef5DC167)
 */
export function usePrepareMalstakingUpdateBaseYield(
  config: Omit<
    UsePrepareContractWriteConfig<typeof malstakingABI, 'updateBaseYield'>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof malstakingAddress } = {} as any,
) {
  return usePrepareContractWrite({
    abi: malstakingABI,
    address: malstakingAddress[11155111],
    functionName: 'updateBaseYield',
    ...config,
  } as UsePrepareContractWriteConfig<typeof malstakingABI, 'updateBaseYield'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link malstakingABI}__ and `functionName` set to `"withdrawETH"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xD78466a0F030Dd8D95CfFe33F867e436Ef5DC167)
 */
export function usePrepareMalstakingWithdrawEth(
  config: Omit<
    UsePrepareContractWriteConfig<typeof malstakingABI, 'withdrawETH'>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof malstakingAddress } = {} as any,
) {
  return usePrepareContractWrite({
    abi: malstakingABI,
    address: malstakingAddress[11155111],
    functionName: 'withdrawETH',
    ...config,
  } as UsePrepareContractWriteConfig<typeof malstakingABI, 'withdrawETH'>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link malstakingABI}__.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xD78466a0F030Dd8D95CfFe33F867e436Ef5DC167)
 */
export function useMalstakingEvent<TEventName extends string>(
  config: Omit<
    UseContractEventConfig<typeof malstakingABI, TEventName>,
    'abi' | 'address'
  > & { chainId?: keyof typeof malstakingAddress } = {} as any,
) {
  return useContractEvent({
    abi: malstakingABI,
    address: malstakingAddress[11155111],
    ...config,
  } as UseContractEventConfig<typeof malstakingABI, TEventName>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link malstakingABI}__ and `eventName` set to `"AddLootToStakedApes"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xD78466a0F030Dd8D95CfFe33F867e436Ef5DC167)
 */
export function useMalstakingAddLootToStakedApesEvent(
  config: Omit<
    UseContractEventConfig<typeof malstakingABI, 'AddLootToStakedApes'>,
    'abi' | 'address' | 'eventName'
  > & { chainId?: keyof typeof malstakingAddress } = {} as any,
) {
  return useContractEvent({
    abi: malstakingABI,
    address: malstakingAddress[11155111],
    eventName: 'AddLootToStakedApes',
    ...config,
  } as UseContractEventConfig<typeof malstakingABI, 'AddLootToStakedApes'>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link malstakingABI}__ and `eventName` set to `"ForceWithdraw721"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xD78466a0F030Dd8D95CfFe33F867e436Ef5DC167)
 */
export function useMalstakingForceWithdraw721Event(
  config: Omit<
    UseContractEventConfig<typeof malstakingABI, 'ForceWithdraw721'>,
    'abi' | 'address' | 'eventName'
  > & { chainId?: keyof typeof malstakingAddress } = {} as any,
) {
  return useContractEvent({
    abi: malstakingABI,
    address: malstakingAddress[11155111],
    eventName: 'ForceWithdraw721',
    ...config,
  } as UseContractEventConfig<typeof malstakingABI, 'ForceWithdraw721'>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link malstakingABI}__ and `eventName` set to `"OwnershipTransferred"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xD78466a0F030Dd8D95CfFe33F867e436Ef5DC167)
 */
export function useMalstakingOwnershipTransferredEvent(
  config: Omit<
    UseContractEventConfig<typeof malstakingABI, 'OwnershipTransferred'>,
    'abi' | 'address' | 'eventName'
  > & { chainId?: keyof typeof malstakingAddress } = {} as any,
) {
  return useContractEvent({
    abi: malstakingABI,
    address: malstakingAddress[11155111],
    eventName: 'OwnershipTransferred',
    ...config,
  } as UseContractEventConfig<typeof malstakingABI, 'OwnershipTransferred'>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link malstakingABI}__ and `eventName` set to `"RemoveLootFromStakedApes"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xD78466a0F030Dd8D95CfFe33F867e436Ef5DC167)
 */
export function useMalstakingRemoveLootFromStakedApesEvent(
  config: Omit<
    UseContractEventConfig<typeof malstakingABI, 'RemoveLootFromStakedApes'>,
    'abi' | 'address' | 'eventName'
  > & { chainId?: keyof typeof malstakingAddress } = {} as any,
) {
  return useContractEvent({
    abi: malstakingABI,
    address: malstakingAddress[11155111],
    eventName: 'RemoveLootFromStakedApes',
    ...config,
  } as UseContractEventConfig<typeof malstakingABI, 'RemoveLootFromStakedApes'>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link malstakingABI}__ and `eventName` set to `"Stake721"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xD78466a0F030Dd8D95CfFe33F867e436Ef5DC167)
 */
export function useMalstakingStake721Event(
  config: Omit<
    UseContractEventConfig<typeof malstakingABI, 'Stake721'>,
    'abi' | 'address' | 'eventName'
  > & { chainId?: keyof typeof malstakingAddress } = {} as any,
) {
  return useContractEvent({
    abi: malstakingABI,
    address: malstakingAddress[11155111],
    eventName: 'Stake721',
    ...config,
  } as UseContractEventConfig<typeof malstakingABI, 'Stake721'>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link malstakingABI}__ and `eventName` set to `"StakeApesWithLoots"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xD78466a0F030Dd8D95CfFe33F867e436Ef5DC167)
 */
export function useMalstakingStakeApesWithLootsEvent(
  config: Omit<
    UseContractEventConfig<typeof malstakingABI, 'StakeApesWithLoots'>,
    'abi' | 'address' | 'eventName'
  > & { chainId?: keyof typeof malstakingAddress } = {} as any,
) {
  return useContractEvent({
    abi: malstakingABI,
    address: malstakingAddress[11155111],
    eventName: 'StakeApesWithLoots',
    ...config,
  } as UseContractEventConfig<typeof malstakingABI, 'StakeApesWithLoots'>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link malstakingABI}__ and `eventName` set to `"StakePets"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xD78466a0F030Dd8D95CfFe33F867e436Ef5DC167)
 */
export function useMalstakingStakePetsEvent(
  config: Omit<
    UseContractEventConfig<typeof malstakingABI, 'StakePets'>,
    'abi' | 'address' | 'eventName'
  > & { chainId?: keyof typeof malstakingAddress } = {} as any,
) {
  return useContractEvent({
    abi: malstakingABI,
    address: malstakingAddress[11155111],
    eventName: 'StakePets',
    ...config,
  } as UseContractEventConfig<typeof malstakingABI, 'StakePets'>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link malstakingABI}__ and `eventName` set to `"Unstake721"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xD78466a0F030Dd8D95CfFe33F867e436Ef5DC167)
 */
export function useMalstakingUnstake721Event(
  config: Omit<
    UseContractEventConfig<typeof malstakingABI, 'Unstake721'>,
    'abi' | 'address' | 'eventName'
  > & { chainId?: keyof typeof malstakingAddress } = {} as any,
) {
  return useContractEvent({
    abi: malstakingABI,
    address: malstakingAddress[11155111],
    eventName: 'Unstake721',
    ...config,
  } as UseContractEventConfig<typeof malstakingABI, 'Unstake721'>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link malstakingABI}__ and `eventName` set to `"UnstakePets"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xD78466a0F030Dd8D95CfFe33F867e436Ef5DC167)
 */
export function useMalstakingUnstakePetsEvent(
  config: Omit<
    UseContractEventConfig<typeof malstakingABI, 'UnstakePets'>,
    'abi' | 'address' | 'eventName'
  > & { chainId?: keyof typeof malstakingAddress } = {} as any,
) {
  return useContractEvent({
    abi: malstakingABI,
    address: malstakingAddress[11155111],
    eventName: 'UnstakePets',
    ...config,
  } as UseContractEventConfig<typeof malstakingABI, 'UnstakePets'>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link malstakingS2ABI}__.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x8d10861Cd2BddE665110eAF12Dd0490215F30eE6)
 */
export function useMalstakingS2Read<
  TFunctionName extends string,
  TSelectData = ReadContractResult<typeof malstakingS2ABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof malstakingS2ABI, TFunctionName, TSelectData>,
    'abi' | 'address'
  > & { chainId?: keyof typeof malstakingS2Address } = {} as any,
) {
  return useContractRead({
    abi: malstakingS2ABI,
    address: malstakingS2Address[11155111],
    ...config,
  } as UseContractReadConfig<
    typeof malstakingS2ABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link malstakingS2ABI}__ and `functionName` set to `"DekuNFT"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x8d10861Cd2BddE665110eAF12Dd0490215F30eE6)
 */
export function useMalstakingS2DekuNft<
  TFunctionName extends 'DekuNFT',
  TSelectData = ReadContractResult<typeof malstakingS2ABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof malstakingS2ABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof malstakingS2Address } = {} as any,
) {
  return useContractRead({
    abi: malstakingS2ABI,
    address: malstakingS2Address[11155111],
    functionName: 'DekuNFT',
    ...config,
  } as UseContractReadConfig<
    typeof malstakingS2ABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link malstakingS2ABI}__ and `functionName` set to `"GenesisNFT"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x8d10861Cd2BddE665110eAF12Dd0490215F30eE6)
 */
export function useMalstakingS2GenesisNft<
  TFunctionName extends 'GenesisNFT',
  TSelectData = ReadContractResult<typeof malstakingS2ABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof malstakingS2ABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof malstakingS2Address } = {} as any,
) {
  return useContractRead({
    abi: malstakingS2ABI,
    address: malstakingS2Address[11155111],
    functionName: 'GenesisNFT',
    ...config,
  } as UseContractReadConfig<
    typeof malstakingS2ABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link malstakingS2ABI}__ and `functionName` set to `"MoonStakingS1"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x8d10861Cd2BddE665110eAF12Dd0490215F30eE6)
 */
export function useMalstakingS2MoonStakingS1<
  TFunctionName extends 'MoonStakingS1',
  TSelectData = ReadContractResult<typeof malstakingS2ABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof malstakingS2ABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof malstakingS2Address } = {} as any,
) {
  return useContractRead({
    abi: malstakingS2ABI,
    address: malstakingS2Address[11155111],
    functionName: 'MoonStakingS1',
    ...config,
  } as UseContractReadConfig<
    typeof malstakingS2ABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link malstakingS2ABI}__ and `functionName` set to `"MutantNFT"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x8d10861Cd2BddE665110eAF12Dd0490215F30eE6)
 */
export function useMalstakingS2MutantNft<
  TFunctionName extends 'MutantNFT',
  TSelectData = ReadContractResult<typeof malstakingS2ABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof malstakingS2ABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof malstakingS2Address } = {} as any,
) {
  return useContractRead({
    abi: malstakingS2ABI,
    address: malstakingS2Address[11155111],
    functionName: 'MutantNFT',
    ...config,
  } as UseContractReadConfig<
    typeof malstakingS2ABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link malstakingS2ABI}__ and `functionName` set to `"SECONDS_IN_DAY"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x8d10861Cd2BddE665110eAF12Dd0490215F30eE6)
 */
export function useMalstakingS2SecondsInDay<
  TFunctionName extends 'SECONDS_IN_DAY',
  TSelectData = ReadContractResult<typeof malstakingS2ABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof malstakingS2ABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof malstakingS2Address } = {} as any,
) {
  return useContractRead({
    abi: malstakingS2ABI,
    address: malstakingS2Address[11155111],
    functionName: 'SECONDS_IN_DAY',
    ...config,
  } as UseContractReadConfig<
    typeof malstakingS2ABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link malstakingS2ABI}__ and `functionName` set to `"_baseRates"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x8d10861Cd2BddE665110eAF12Dd0490215F30eE6)
 */
export function useMalstakingS2BaseRates<
  TFunctionName extends '_baseRates',
  TSelectData = ReadContractResult<typeof malstakingS2ABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof malstakingS2ABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof malstakingS2Address } = {} as any,
) {
  return useContractRead({
    abi: malstakingS2ABI,
    address: malstakingS2Address[11155111],
    functionName: '_baseRates',
    ...config,
  } as UseContractReadConfig<
    typeof malstakingS2ABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link malstakingS2ABI}__ and `functionName` set to `"authorisedLog"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x8d10861Cd2BddE665110eAF12Dd0490215F30eE6)
 */
export function useMalstakingS2AuthorisedLog<
  TFunctionName extends 'authorisedLog',
  TSelectData = ReadContractResult<typeof malstakingS2ABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof malstakingS2ABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof malstakingS2Address } = {} as any,
) {
  return useContractRead({
    abi: malstakingS2ABI,
    address: malstakingS2Address[11155111],
    functionName: 'authorisedLog',
    ...config,
  } as UseContractReadConfig<
    typeof malstakingS2ABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link malstakingS2ABI}__ and `functionName` set to `"balanceOf"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x8d10861Cd2BddE665110eAF12Dd0490215F30eE6)
 */
export function useMalstakingS2BalanceOf<
  TFunctionName extends 'balanceOf',
  TSelectData = ReadContractResult<typeof malstakingS2ABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof malstakingS2ABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof malstakingS2Address } = {} as any,
) {
  return useContractRead({
    abi: malstakingS2ABI,
    address: malstakingS2Address[11155111],
    functionName: 'balanceOf',
    ...config,
  } as UseContractReadConfig<
    typeof malstakingS2ABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link malstakingS2ABI}__ and `functionName` set to `"depositPaused"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x8d10861Cd2BddE665110eAF12Dd0490215F30eE6)
 */
export function useMalstakingS2DepositPaused<
  TFunctionName extends 'depositPaused',
  TSelectData = ReadContractResult<typeof malstakingS2ABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof malstakingS2ABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof malstakingS2Address } = {} as any,
) {
  return useContractRead({
    abi: malstakingS2ABI,
    address: malstakingS2Address[11155111],
    functionName: 'depositPaused',
    ...config,
  } as UseContractReadConfig<
    typeof malstakingS2ABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link malstakingS2ABI}__ and `functionName` set to `"genesisOwnershipRequired"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x8d10861Cd2BddE665110eAF12Dd0490215F30eE6)
 */
export function useMalstakingS2GenesisOwnershipRequired<
  TFunctionName extends 'genesisOwnershipRequired',
  TSelectData = ReadContractResult<typeof malstakingS2ABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof malstakingS2ABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof malstakingS2Address } = {} as any,
) {
  return useContractRead({
    abi: malstakingS2ABI,
    address: malstakingS2Address[11155111],
    functionName: 'genesisOwnershipRequired',
    ...config,
  } as UseContractReadConfig<
    typeof malstakingS2ABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link malstakingS2ABI}__ and `functionName` set to `"getAccumulatedAmount"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x8d10861Cd2BddE665110eAF12Dd0490215F30eE6)
 */
export function useMalstakingS2GetAccumulatedAmount<
  TFunctionName extends 'getAccumulatedAmount',
  TSelectData = ReadContractResult<typeof malstakingS2ABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof malstakingS2ABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof malstakingS2Address } = {} as any,
) {
  return useContractRead({
    abi: malstakingS2ABI,
    address: malstakingS2Address[11155111],
    functionName: 'getAccumulatedAmount',
    ...config,
  } as UseContractReadConfig<
    typeof malstakingS2ABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link malstakingS2ABI}__ and `functionName` set to `"getCurrentReward"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x8d10861Cd2BddE665110eAF12Dd0490215F30eE6)
 */
export function useMalstakingS2GetCurrentReward<
  TFunctionName extends 'getCurrentReward',
  TSelectData = ReadContractResult<typeof malstakingS2ABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof malstakingS2ABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof malstakingS2Address } = {} as any,
) {
  return useContractRead({
    abi: malstakingS2ABI,
    address: malstakingS2Address[11155111],
    functionName: 'getCurrentReward',
    ...config,
  } as UseContractReadConfig<
    typeof malstakingS2ABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link malstakingS2ABI}__ and `functionName` set to `"getDekuYield"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x8d10861Cd2BddE665110eAF12Dd0490215F30eE6)
 */
export function useMalstakingS2GetDekuYield<
  TFunctionName extends 'getDekuYield',
  TSelectData = ReadContractResult<typeof malstakingS2ABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof malstakingS2ABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof malstakingS2Address } = {} as any,
) {
  return useContractRead({
    abi: malstakingS2ABI,
    address: malstakingS2Address[11155111],
    functionName: 'getDekuYield',
    ...config,
  } as UseContractReadConfig<
    typeof malstakingS2ABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link malstakingS2ABI}__ and `functionName` set to `"getGenesisYield"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x8d10861Cd2BddE665110eAF12Dd0490215F30eE6)
 */
export function useMalstakingS2GetGenesisYield<
  TFunctionName extends 'getGenesisYield',
  TSelectData = ReadContractResult<typeof malstakingS2ABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof malstakingS2ABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof malstakingS2Address } = {} as any,
) {
  return useContractRead({
    abi: malstakingS2ABI,
    address: malstakingS2Address[11155111],
    functionName: 'getGenesisYield',
    ...config,
  } as UseContractReadConfig<
    typeof malstakingS2ABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link malstakingS2ABI}__ and `functionName` set to `"getMutantsYield"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x8d10861Cd2BddE665110eAF12Dd0490215F30eE6)
 */
export function useMalstakingS2GetMutantsYield<
  TFunctionName extends 'getMutantsYield',
  TSelectData = ReadContractResult<typeof malstakingS2ABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof malstakingS2ABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof malstakingS2Address } = {} as any,
) {
  return useContractRead({
    abi: malstakingS2ABI,
    address: malstakingS2Address[11155111],
    functionName: 'getMutantsYield',
    ...config,
  } as UseContractReadConfig<
    typeof malstakingS2ABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link malstakingS2ABI}__ and `functionName` set to `"getStakerNFT"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x8d10861Cd2BddE665110eAF12Dd0490215F30eE6)
 */
export function useMalstakingS2GetStakerNft<
  TFunctionName extends 'getStakerNFT',
  TSelectData = ReadContractResult<typeof malstakingS2ABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof malstakingS2ABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof malstakingS2Address } = {} as any,
) {
  return useContractRead({
    abi: malstakingS2ABI,
    address: malstakingS2Address[11155111],
    functionName: 'getStakerNFT',
    ...config,
  } as UseContractReadConfig<
    typeof malstakingS2ABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link malstakingS2ABI}__ and `functionName` set to `"getStakerYield"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x8d10861Cd2BddE665110eAF12Dd0490215F30eE6)
 */
export function useMalstakingS2GetStakerYield<
  TFunctionName extends 'getStakerYield',
  TSelectData = ReadContractResult<typeof malstakingS2ABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof malstakingS2ABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof malstakingS2Address } = {} as any,
) {
  return useContractRead({
    abi: malstakingS2ABI,
    address: malstakingS2Address[11155111],
    functionName: 'getStakerYield',
    ...config,
  } as UseContractReadConfig<
    typeof malstakingS2ABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link malstakingS2ABI}__ and `functionName` set to `"getTokenYield"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x8d10861Cd2BddE665110eAF12Dd0490215F30eE6)
 */
export function useMalstakingS2GetTokenYield<
  TFunctionName extends 'getTokenYield',
  TSelectData = ReadContractResult<typeof malstakingS2ABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof malstakingS2ABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof malstakingS2Address } = {} as any,
) {
  return useContractRead({
    abi: malstakingS2ABI,
    address: malstakingS2Address[11155111],
    functionName: 'getTokenYield',
    ...config,
  } as UseContractReadConfig<
    typeof malstakingS2ABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link malstakingS2ABI}__ and `functionName` set to `"owner"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x8d10861Cd2BddE665110eAF12Dd0490215F30eE6)
 */
export function useMalstakingS2Owner<
  TFunctionName extends 'owner',
  TSelectData = ReadContractResult<typeof malstakingS2ABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof malstakingS2ABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof malstakingS2Address } = {} as any,
) {
  return useContractRead({
    abi: malstakingS2ABI,
    address: malstakingS2Address[11155111],
    functionName: 'owner',
    ...config,
  } as UseContractReadConfig<
    typeof malstakingS2ABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link malstakingS2ABI}__ and `functionName` set to `"ownerOf"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x8d10861Cd2BddE665110eAF12Dd0490215F30eE6)
 */
export function useMalstakingS2OwnerOf<
  TFunctionName extends 'ownerOf',
  TSelectData = ReadContractResult<typeof malstakingS2ABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof malstakingS2ABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof malstakingS2Address } = {} as any,
) {
  return useContractRead({
    abi: malstakingS2ABI,
    address: malstakingS2Address[11155111],
    functionName: 'ownerOf',
    ...config,
  } as UseContractReadConfig<
    typeof malstakingS2ABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link malstakingS2ABI}__ and `functionName` set to `"stakingLaunched"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x8d10861Cd2BddE665110eAF12Dd0490215F30eE6)
 */
export function useMalstakingS2StakingLaunched<
  TFunctionName extends 'stakingLaunched',
  TSelectData = ReadContractResult<typeof malstakingS2ABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof malstakingS2ABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof malstakingS2Address } = {} as any,
) {
  return useContractRead({
    abi: malstakingS2ABI,
    address: malstakingS2Address[11155111],
    functionName: 'stakingLaunched',
    ...config,
  } as UseContractReadConfig<
    typeof malstakingS2ABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link malstakingS2ABI}__ and `functionName` set to `"startTimestamp"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x8d10861Cd2BddE665110eAF12Dd0490215F30eE6)
 */
export function useMalstakingS2StartTimestamp<
  TFunctionName extends 'startTimestamp',
  TSelectData = ReadContractResult<typeof malstakingS2ABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof malstakingS2ABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof malstakingS2Address } = {} as any,
) {
  return useContractRead({
    abi: malstakingS2ABI,
    address: malstakingS2Address[11155111],
    functionName: 'startTimestamp',
    ...config,
  } as UseContractReadConfig<
    typeof malstakingS2ABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link malstakingS2ABI}__.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x8d10861Cd2BddE665110eAF12Dd0490215F30eE6)
 */
export function useMalstakingS2Write<
  TFunctionName extends string,
  TMode extends WriteContractMode = undefined,
  TChainId extends number = keyof typeof malstakingS2Address,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof malstakingS2ABI,
          string
        >['request']['abi'],
        TFunctionName,
        TMode
      > & { address?: Address; chainId?: TChainId }
    : UseContractWriteConfig<typeof malstakingS2ABI, TFunctionName, TMode> & {
        abi?: never
        address?: never
        chainId?: TChainId
      } = {} as any,
) {
  return useContractWrite<typeof malstakingS2ABI, TFunctionName, TMode>({
    abi: malstakingS2ABI,
    address: malstakingS2Address[11155111],
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link malstakingS2ABI}__ and `functionName` set to `"authorise"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x8d10861Cd2BddE665110eAF12Dd0490215F30eE6)
 */
export function useMalstakingS2Authorise<
  TMode extends WriteContractMode = undefined,
  TChainId extends number = keyof typeof malstakingS2Address,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof malstakingS2ABI,
          'authorise'
        >['request']['abi'],
        'authorise',
        TMode
      > & { address?: Address; chainId?: TChainId; functionName?: 'authorise' }
    : UseContractWriteConfig<typeof malstakingS2ABI, 'authorise', TMode> & {
        abi?: never
        address?: never
        chainId?: TChainId
        functionName?: 'authorise'
      } = {} as any,
) {
  return useContractWrite<typeof malstakingS2ABI, 'authorise', TMode>({
    abi: malstakingS2ABI,
    address: malstakingS2Address[11155111],
    functionName: 'authorise',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link malstakingS2ABI}__ and `functionName` set to `"forceWithdraw721"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x8d10861Cd2BddE665110eAF12Dd0490215F30eE6)
 */
export function useMalstakingS2ForceWithdraw721<
  TMode extends WriteContractMode = undefined,
  TChainId extends number = keyof typeof malstakingS2Address,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof malstakingS2ABI,
          'forceWithdraw721'
        >['request']['abi'],
        'forceWithdraw721',
        TMode
      > & {
        address?: Address
        chainId?: TChainId
        functionName?: 'forceWithdraw721'
      }
    : UseContractWriteConfig<
        typeof malstakingS2ABI,
        'forceWithdraw721',
        TMode
      > & {
        abi?: never
        address?: never
        chainId?: TChainId
        functionName?: 'forceWithdraw721'
      } = {} as any,
) {
  return useContractWrite<typeof malstakingS2ABI, 'forceWithdraw721', TMode>({
    abi: malstakingS2ABI,
    address: malstakingS2Address[11155111],
    functionName: 'forceWithdraw721',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link malstakingS2ABI}__ and `functionName` set to `"launchStaking"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x8d10861Cd2BddE665110eAF12Dd0490215F30eE6)
 */
export function useMalstakingS2LaunchStaking<
  TMode extends WriteContractMode = undefined,
  TChainId extends number = keyof typeof malstakingS2Address,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof malstakingS2ABI,
          'launchStaking'
        >['request']['abi'],
        'launchStaking',
        TMode
      > & {
        address?: Address
        chainId?: TChainId
        functionName?: 'launchStaking'
      }
    : UseContractWriteConfig<typeof malstakingS2ABI, 'launchStaking', TMode> & {
        abi?: never
        address?: never
        chainId?: TChainId
        functionName?: 'launchStaking'
      } = {} as any,
) {
  return useContractWrite<typeof malstakingS2ABI, 'launchStaking', TMode>({
    abi: malstakingS2ABI,
    address: malstakingS2Address[11155111],
    functionName: 'launchStaking',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link malstakingS2ABI}__ and `functionName` set to `"onERC721Received"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x8d10861Cd2BddE665110eAF12Dd0490215F30eE6)
 */
export function useMalstakingS2OnErc721Received<
  TMode extends WriteContractMode = undefined,
  TChainId extends number = keyof typeof malstakingS2Address,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof malstakingS2ABI,
          'onERC721Received'
        >['request']['abi'],
        'onERC721Received',
        TMode
      > & {
        address?: Address
        chainId?: TChainId
        functionName?: 'onERC721Received'
      }
    : UseContractWriteConfig<
        typeof malstakingS2ABI,
        'onERC721Received',
        TMode
      > & {
        abi?: never
        address?: never
        chainId?: TChainId
        functionName?: 'onERC721Received'
      } = {} as any,
) {
  return useContractWrite<typeof malstakingS2ABI, 'onERC721Received', TMode>({
    abi: malstakingS2ABI,
    address: malstakingS2Address[11155111],
    functionName: 'onERC721Received',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link malstakingS2ABI}__ and `functionName` set to `"pauseDeposit"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x8d10861Cd2BddE665110eAF12Dd0490215F30eE6)
 */
export function useMalstakingS2PauseDeposit<
  TMode extends WriteContractMode = undefined,
  TChainId extends number = keyof typeof malstakingS2Address,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof malstakingS2ABI,
          'pauseDeposit'
        >['request']['abi'],
        'pauseDeposit',
        TMode
      > & {
        address?: Address
        chainId?: TChainId
        functionName?: 'pauseDeposit'
      }
    : UseContractWriteConfig<typeof malstakingS2ABI, 'pauseDeposit', TMode> & {
        abi?: never
        address?: never
        chainId?: TChainId
        functionName?: 'pauseDeposit'
      } = {} as any,
) {
  return useContractWrite<typeof malstakingS2ABI, 'pauseDeposit', TMode>({
    abi: malstakingS2ABI,
    address: malstakingS2Address[11155111],
    functionName: 'pauseDeposit',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link malstakingS2ABI}__ and `functionName` set to `"renounceOwnership"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x8d10861Cd2BddE665110eAF12Dd0490215F30eE6)
 */
export function useMalstakingS2RenounceOwnership<
  TMode extends WriteContractMode = undefined,
  TChainId extends number = keyof typeof malstakingS2Address,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof malstakingS2ABI,
          'renounceOwnership'
        >['request']['abi'],
        'renounceOwnership',
        TMode
      > & {
        address?: Address
        chainId?: TChainId
        functionName?: 'renounceOwnership'
      }
    : UseContractWriteConfig<
        typeof malstakingS2ABI,
        'renounceOwnership',
        TMode
      > & {
        abi?: never
        address?: never
        chainId?: TChainId
        functionName?: 'renounceOwnership'
      } = {} as any,
) {
  return useContractWrite<typeof malstakingS2ABI, 'renounceOwnership', TMode>({
    abi: malstakingS2ABI,
    address: malstakingS2Address[11155111],
    functionName: 'renounceOwnership',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link malstakingS2ABI}__ and `functionName` set to `"setDEKUContract"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x8d10861Cd2BddE665110eAF12Dd0490215F30eE6)
 */
export function useMalstakingS2SetDekuContract<
  TMode extends WriteContractMode = undefined,
  TChainId extends number = keyof typeof malstakingS2Address,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof malstakingS2ABI,
          'setDEKUContract'
        >['request']['abi'],
        'setDEKUContract',
        TMode
      > & {
        address?: Address
        chainId?: TChainId
        functionName?: 'setDEKUContract'
      }
    : UseContractWriteConfig<
        typeof malstakingS2ABI,
        'setDEKUContract',
        TMode
      > & {
        abi?: never
        address?: never
        chainId?: TChainId
        functionName?: 'setDEKUContract'
      } = {} as any,
) {
  return useContractWrite<typeof malstakingS2ABI, 'setDEKUContract', TMode>({
    abi: malstakingS2ABI,
    address: malstakingS2Address[11155111],
    functionName: 'setDEKUContract',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link malstakingS2ABI}__ and `functionName` set to `"setGenesisOwnershipRequired"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x8d10861Cd2BddE665110eAF12Dd0490215F30eE6)
 */
export function useMalstakingS2SetGenesisOwnershipRequired<
  TMode extends WriteContractMode = undefined,
  TChainId extends number = keyof typeof malstakingS2Address,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof malstakingS2ABI,
          'setGenesisOwnershipRequired'
        >['request']['abi'],
        'setGenesisOwnershipRequired',
        TMode
      > & {
        address?: Address
        chainId?: TChainId
        functionName?: 'setGenesisOwnershipRequired'
      }
    : UseContractWriteConfig<
        typeof malstakingS2ABI,
        'setGenesisOwnershipRequired',
        TMode
      > & {
        abi?: never
        address?: never
        chainId?: TChainId
        functionName?: 'setGenesisOwnershipRequired'
      } = {} as any,
) {
  return useContractWrite<
    typeof malstakingS2ABI,
    'setGenesisOwnershipRequired',
    TMode
  >({
    abi: malstakingS2ABI,
    address: malstakingS2Address[11155111],
    functionName: 'setGenesisOwnershipRequired',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link malstakingS2ABI}__ and `functionName` set to `"setIndividualRates"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x8d10861Cd2BddE665110eAF12Dd0490215F30eE6)
 */
export function useMalstakingS2SetIndividualRates<
  TMode extends WriteContractMode = undefined,
  TChainId extends number = keyof typeof malstakingS2Address,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof malstakingS2ABI,
          'setIndividualRates'
        >['request']['abi'],
        'setIndividualRates',
        TMode
      > & {
        address?: Address
        chainId?: TChainId
        functionName?: 'setIndividualRates'
      }
    : UseContractWriteConfig<
        typeof malstakingS2ABI,
        'setIndividualRates',
        TMode
      > & {
        abi?: never
        address?: never
        chainId?: TChainId
        functionName?: 'setIndividualRates'
      } = {} as any,
) {
  return useContractWrite<typeof malstakingS2ABI, 'setIndividualRates', TMode>({
    abi: malstakingS2ABI,
    address: malstakingS2Address[11155111],
    functionName: 'setIndividualRates',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link malstakingS2ABI}__ and `functionName` set to `"setMUTANTContract"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x8d10861Cd2BddE665110eAF12Dd0490215F30eE6)
 */
export function useMalstakingS2SetMutantContract<
  TMode extends WriteContractMode = undefined,
  TChainId extends number = keyof typeof malstakingS2Address,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof malstakingS2ABI,
          'setMUTANTContract'
        >['request']['abi'],
        'setMUTANTContract',
        TMode
      > & {
        address?: Address
        chainId?: TChainId
        functionName?: 'setMUTANTContract'
      }
    : UseContractWriteConfig<
        typeof malstakingS2ABI,
        'setMUTANTContract',
        TMode
      > & {
        abi?: never
        address?: never
        chainId?: TChainId
        functionName?: 'setMUTANTContract'
      } = {} as any,
) {
  return useContractWrite<typeof malstakingS2ABI, 'setMUTANTContract', TMode>({
    abi: malstakingS2ABI,
    address: malstakingS2Address[11155111],
    functionName: 'setMUTANTContract',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link malstakingS2ABI}__ and `functionName` set to `"stake721"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x8d10861Cd2BddE665110eAF12Dd0490215F30eE6)
 */
export function useMalstakingS2Stake721<
  TMode extends WriteContractMode = undefined,
  TChainId extends number = keyof typeof malstakingS2Address,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof malstakingS2ABI,
          'stake721'
        >['request']['abi'],
        'stake721',
        TMode
      > & { address?: Address; chainId?: TChainId; functionName?: 'stake721' }
    : UseContractWriteConfig<typeof malstakingS2ABI, 'stake721', TMode> & {
        abi?: never
        address?: never
        chainId?: TChainId
        functionName?: 'stake721'
      } = {} as any,
) {
  return useContractWrite<typeof malstakingS2ABI, 'stake721', TMode>({
    abi: malstakingS2ABI,
    address: malstakingS2Address[11155111],
    functionName: 'stake721',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link malstakingS2ABI}__ and `functionName` set to `"transferOwnership"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x8d10861Cd2BddE665110eAF12Dd0490215F30eE6)
 */
export function useMalstakingS2TransferOwnership<
  TMode extends WriteContractMode = undefined,
  TChainId extends number = keyof typeof malstakingS2Address,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof malstakingS2ABI,
          'transferOwnership'
        >['request']['abi'],
        'transferOwnership',
        TMode
      > & {
        address?: Address
        chainId?: TChainId
        functionName?: 'transferOwnership'
      }
    : UseContractWriteConfig<
        typeof malstakingS2ABI,
        'transferOwnership',
        TMode
      > & {
        abi?: never
        address?: never
        chainId?: TChainId
        functionName?: 'transferOwnership'
      } = {} as any,
) {
  return useContractWrite<typeof malstakingS2ABI, 'transferOwnership', TMode>({
    abi: malstakingS2ABI,
    address: malstakingS2Address[11155111],
    functionName: 'transferOwnership',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link malstakingS2ABI}__ and `functionName` set to `"unauthorise"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x8d10861Cd2BddE665110eAF12Dd0490215F30eE6)
 */
export function useMalstakingS2Unauthorise<
  TMode extends WriteContractMode = undefined,
  TChainId extends number = keyof typeof malstakingS2Address,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof malstakingS2ABI,
          'unauthorise'
        >['request']['abi'],
        'unauthorise',
        TMode
      > & {
        address?: Address
        chainId?: TChainId
        functionName?: 'unauthorise'
      }
    : UseContractWriteConfig<typeof malstakingS2ABI, 'unauthorise', TMode> & {
        abi?: never
        address?: never
        chainId?: TChainId
        functionName?: 'unauthorise'
      } = {} as any,
) {
  return useContractWrite<typeof malstakingS2ABI, 'unauthorise', TMode>({
    abi: malstakingS2ABI,
    address: malstakingS2Address[11155111],
    functionName: 'unauthorise',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link malstakingS2ABI}__ and `functionName` set to `"unstake721"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x8d10861Cd2BddE665110eAF12Dd0490215F30eE6)
 */
export function useMalstakingS2Unstake721<
  TMode extends WriteContractMode = undefined,
  TChainId extends number = keyof typeof malstakingS2Address,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof malstakingS2ABI,
          'unstake721'
        >['request']['abi'],
        'unstake721',
        TMode
      > & { address?: Address; chainId?: TChainId; functionName?: 'unstake721' }
    : UseContractWriteConfig<typeof malstakingS2ABI, 'unstake721', TMode> & {
        abi?: never
        address?: never
        chainId?: TChainId
        functionName?: 'unstake721'
      } = {} as any,
) {
  return useContractWrite<typeof malstakingS2ABI, 'unstake721', TMode>({
    abi: malstakingS2ABI,
    address: malstakingS2Address[11155111],
    functionName: 'unstake721',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link malstakingS2ABI}__ and `functionName` set to `"updateAccumulatedAmount"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x8d10861Cd2BddE665110eAF12Dd0490215F30eE6)
 */
export function useMalstakingS2UpdateAccumulatedAmount<
  TMode extends WriteContractMode = undefined,
  TChainId extends number = keyof typeof malstakingS2Address,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof malstakingS2ABI,
          'updateAccumulatedAmount'
        >['request']['abi'],
        'updateAccumulatedAmount',
        TMode
      > & {
        address?: Address
        chainId?: TChainId
        functionName?: 'updateAccumulatedAmount'
      }
    : UseContractWriteConfig<
        typeof malstakingS2ABI,
        'updateAccumulatedAmount',
        TMode
      > & {
        abi?: never
        address?: never
        chainId?: TChainId
        functionName?: 'updateAccumulatedAmount'
      } = {} as any,
) {
  return useContractWrite<
    typeof malstakingS2ABI,
    'updateAccumulatedAmount',
    TMode
  >({
    abi: malstakingS2ABI,
    address: malstakingS2Address[11155111],
    functionName: 'updateAccumulatedAmount',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link malstakingS2ABI}__ and `functionName` set to `"updateBaseYield"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x8d10861Cd2BddE665110eAF12Dd0490215F30eE6)
 */
export function useMalstakingS2UpdateBaseYield<
  TMode extends WriteContractMode = undefined,
  TChainId extends number = keyof typeof malstakingS2Address,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof malstakingS2ABI,
          'updateBaseYield'
        >['request']['abi'],
        'updateBaseYield',
        TMode
      > & {
        address?: Address
        chainId?: TChainId
        functionName?: 'updateBaseYield'
      }
    : UseContractWriteConfig<
        typeof malstakingS2ABI,
        'updateBaseYield',
        TMode
      > & {
        abi?: never
        address?: never
        chainId?: TChainId
        functionName?: 'updateBaseYield'
      } = {} as any,
) {
  return useContractWrite<typeof malstakingS2ABI, 'updateBaseYield', TMode>({
    abi: malstakingS2ABI,
    address: malstakingS2Address[11155111],
    functionName: 'updateBaseYield',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link malstakingS2ABI}__ and `functionName` set to `"withdrawETH"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x8d10861Cd2BddE665110eAF12Dd0490215F30eE6)
 */
export function useMalstakingS2WithdrawEth<
  TMode extends WriteContractMode = undefined,
  TChainId extends number = keyof typeof malstakingS2Address,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof malstakingS2ABI,
          'withdrawETH'
        >['request']['abi'],
        'withdrawETH',
        TMode
      > & {
        address?: Address
        chainId?: TChainId
        functionName?: 'withdrawETH'
      }
    : UseContractWriteConfig<typeof malstakingS2ABI, 'withdrawETH', TMode> & {
        abi?: never
        address?: never
        chainId?: TChainId
        functionName?: 'withdrawETH'
      } = {} as any,
) {
  return useContractWrite<typeof malstakingS2ABI, 'withdrawETH', TMode>({
    abi: malstakingS2ABI,
    address: malstakingS2Address[11155111],
    functionName: 'withdrawETH',
    ...config,
  } as any)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link malstakingS2ABI}__.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x8d10861Cd2BddE665110eAF12Dd0490215F30eE6)
 */
export function usePrepareMalstakingS2Write<TFunctionName extends string>(
  config: Omit<
    UsePrepareContractWriteConfig<typeof malstakingS2ABI, TFunctionName>,
    'abi' | 'address'
  > & { chainId?: keyof typeof malstakingS2Address } = {} as any,
) {
  return usePrepareContractWrite({
    abi: malstakingS2ABI,
    address: malstakingS2Address[11155111],
    ...config,
  } as UsePrepareContractWriteConfig<typeof malstakingS2ABI, TFunctionName>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link malstakingS2ABI}__ and `functionName` set to `"authorise"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x8d10861Cd2BddE665110eAF12Dd0490215F30eE6)
 */
export function usePrepareMalstakingS2Authorise(
  config: Omit<
    UsePrepareContractWriteConfig<typeof malstakingS2ABI, 'authorise'>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof malstakingS2Address } = {} as any,
) {
  return usePrepareContractWrite({
    abi: malstakingS2ABI,
    address: malstakingS2Address[11155111],
    functionName: 'authorise',
    ...config,
  } as UsePrepareContractWriteConfig<typeof malstakingS2ABI, 'authorise'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link malstakingS2ABI}__ and `functionName` set to `"forceWithdraw721"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x8d10861Cd2BddE665110eAF12Dd0490215F30eE6)
 */
export function usePrepareMalstakingS2ForceWithdraw721(
  config: Omit<
    UsePrepareContractWriteConfig<typeof malstakingS2ABI, 'forceWithdraw721'>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof malstakingS2Address } = {} as any,
) {
  return usePrepareContractWrite({
    abi: malstakingS2ABI,
    address: malstakingS2Address[11155111],
    functionName: 'forceWithdraw721',
    ...config,
  } as UsePrepareContractWriteConfig<
    typeof malstakingS2ABI,
    'forceWithdraw721'
  >)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link malstakingS2ABI}__ and `functionName` set to `"launchStaking"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x8d10861Cd2BddE665110eAF12Dd0490215F30eE6)
 */
export function usePrepareMalstakingS2LaunchStaking(
  config: Omit<
    UsePrepareContractWriteConfig<typeof malstakingS2ABI, 'launchStaking'>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof malstakingS2Address } = {} as any,
) {
  return usePrepareContractWrite({
    abi: malstakingS2ABI,
    address: malstakingS2Address[11155111],
    functionName: 'launchStaking',
    ...config,
  } as UsePrepareContractWriteConfig<typeof malstakingS2ABI, 'launchStaking'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link malstakingS2ABI}__ and `functionName` set to `"onERC721Received"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x8d10861Cd2BddE665110eAF12Dd0490215F30eE6)
 */
export function usePrepareMalstakingS2OnErc721Received(
  config: Omit<
    UsePrepareContractWriteConfig<typeof malstakingS2ABI, 'onERC721Received'>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof malstakingS2Address } = {} as any,
) {
  return usePrepareContractWrite({
    abi: malstakingS2ABI,
    address: malstakingS2Address[11155111],
    functionName: 'onERC721Received',
    ...config,
  } as UsePrepareContractWriteConfig<
    typeof malstakingS2ABI,
    'onERC721Received'
  >)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link malstakingS2ABI}__ and `functionName` set to `"pauseDeposit"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x8d10861Cd2BddE665110eAF12Dd0490215F30eE6)
 */
export function usePrepareMalstakingS2PauseDeposit(
  config: Omit<
    UsePrepareContractWriteConfig<typeof malstakingS2ABI, 'pauseDeposit'>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof malstakingS2Address } = {} as any,
) {
  return usePrepareContractWrite({
    abi: malstakingS2ABI,
    address: malstakingS2Address[11155111],
    functionName: 'pauseDeposit',
    ...config,
  } as UsePrepareContractWriteConfig<typeof malstakingS2ABI, 'pauseDeposit'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link malstakingS2ABI}__ and `functionName` set to `"renounceOwnership"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x8d10861Cd2BddE665110eAF12Dd0490215F30eE6)
 */
export function usePrepareMalstakingS2RenounceOwnership(
  config: Omit<
    UsePrepareContractWriteConfig<typeof malstakingS2ABI, 'renounceOwnership'>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof malstakingS2Address } = {} as any,
) {
  return usePrepareContractWrite({
    abi: malstakingS2ABI,
    address: malstakingS2Address[11155111],
    functionName: 'renounceOwnership',
    ...config,
  } as UsePrepareContractWriteConfig<
    typeof malstakingS2ABI,
    'renounceOwnership'
  >)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link malstakingS2ABI}__ and `functionName` set to `"setDEKUContract"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x8d10861Cd2BddE665110eAF12Dd0490215F30eE6)
 */
export function usePrepareMalstakingS2SetDekuContract(
  config: Omit<
    UsePrepareContractWriteConfig<typeof malstakingS2ABI, 'setDEKUContract'>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof malstakingS2Address } = {} as any,
) {
  return usePrepareContractWrite({
    abi: malstakingS2ABI,
    address: malstakingS2Address[11155111],
    functionName: 'setDEKUContract',
    ...config,
  } as UsePrepareContractWriteConfig<typeof malstakingS2ABI, 'setDEKUContract'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link malstakingS2ABI}__ and `functionName` set to `"setGenesisOwnershipRequired"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x8d10861Cd2BddE665110eAF12Dd0490215F30eE6)
 */
export function usePrepareMalstakingS2SetGenesisOwnershipRequired(
  config: Omit<
    UsePrepareContractWriteConfig<
      typeof malstakingS2ABI,
      'setGenesisOwnershipRequired'
    >,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof malstakingS2Address } = {} as any,
) {
  return usePrepareContractWrite({
    abi: malstakingS2ABI,
    address: malstakingS2Address[11155111],
    functionName: 'setGenesisOwnershipRequired',
    ...config,
  } as UsePrepareContractWriteConfig<
    typeof malstakingS2ABI,
    'setGenesisOwnershipRequired'
  >)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link malstakingS2ABI}__ and `functionName` set to `"setIndividualRates"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x8d10861Cd2BddE665110eAF12Dd0490215F30eE6)
 */
export function usePrepareMalstakingS2SetIndividualRates(
  config: Omit<
    UsePrepareContractWriteConfig<typeof malstakingS2ABI, 'setIndividualRates'>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof malstakingS2Address } = {} as any,
) {
  return usePrepareContractWrite({
    abi: malstakingS2ABI,
    address: malstakingS2Address[11155111],
    functionName: 'setIndividualRates',
    ...config,
  } as UsePrepareContractWriteConfig<
    typeof malstakingS2ABI,
    'setIndividualRates'
  >)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link malstakingS2ABI}__ and `functionName` set to `"setMUTANTContract"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x8d10861Cd2BddE665110eAF12Dd0490215F30eE6)
 */
export function usePrepareMalstakingS2SetMutantContract(
  config: Omit<
    UsePrepareContractWriteConfig<typeof malstakingS2ABI, 'setMUTANTContract'>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof malstakingS2Address } = {} as any,
) {
  return usePrepareContractWrite({
    abi: malstakingS2ABI,
    address: malstakingS2Address[11155111],
    functionName: 'setMUTANTContract',
    ...config,
  } as UsePrepareContractWriteConfig<
    typeof malstakingS2ABI,
    'setMUTANTContract'
  >)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link malstakingS2ABI}__ and `functionName` set to `"stake721"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x8d10861Cd2BddE665110eAF12Dd0490215F30eE6)
 */
export function usePrepareMalstakingS2Stake721(
  config: Omit<
    UsePrepareContractWriteConfig<typeof malstakingS2ABI, 'stake721'>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof malstakingS2Address } = {} as any,
) {
  return usePrepareContractWrite({
    abi: malstakingS2ABI,
    address: malstakingS2Address[11155111],
    functionName: 'stake721',
    ...config,
  } as UsePrepareContractWriteConfig<typeof malstakingS2ABI, 'stake721'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link malstakingS2ABI}__ and `functionName` set to `"transferOwnership"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x8d10861Cd2BddE665110eAF12Dd0490215F30eE6)
 */
export function usePrepareMalstakingS2TransferOwnership(
  config: Omit<
    UsePrepareContractWriteConfig<typeof malstakingS2ABI, 'transferOwnership'>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof malstakingS2Address } = {} as any,
) {
  return usePrepareContractWrite({
    abi: malstakingS2ABI,
    address: malstakingS2Address[11155111],
    functionName: 'transferOwnership',
    ...config,
  } as UsePrepareContractWriteConfig<
    typeof malstakingS2ABI,
    'transferOwnership'
  >)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link malstakingS2ABI}__ and `functionName` set to `"unauthorise"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x8d10861Cd2BddE665110eAF12Dd0490215F30eE6)
 */
export function usePrepareMalstakingS2Unauthorise(
  config: Omit<
    UsePrepareContractWriteConfig<typeof malstakingS2ABI, 'unauthorise'>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof malstakingS2Address } = {} as any,
) {
  return usePrepareContractWrite({
    abi: malstakingS2ABI,
    address: malstakingS2Address[11155111],
    functionName: 'unauthorise',
    ...config,
  } as UsePrepareContractWriteConfig<typeof malstakingS2ABI, 'unauthorise'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link malstakingS2ABI}__ and `functionName` set to `"unstake721"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x8d10861Cd2BddE665110eAF12Dd0490215F30eE6)
 */
export function usePrepareMalstakingS2Unstake721(
  config: Omit<
    UsePrepareContractWriteConfig<typeof malstakingS2ABI, 'unstake721'>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof malstakingS2Address } = {} as any,
) {
  return usePrepareContractWrite({
    abi: malstakingS2ABI,
    address: malstakingS2Address[11155111],
    functionName: 'unstake721',
    ...config,
  } as UsePrepareContractWriteConfig<typeof malstakingS2ABI, 'unstake721'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link malstakingS2ABI}__ and `functionName` set to `"updateAccumulatedAmount"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x8d10861Cd2BddE665110eAF12Dd0490215F30eE6)
 */
export function usePrepareMalstakingS2UpdateAccumulatedAmount(
  config: Omit<
    UsePrepareContractWriteConfig<
      typeof malstakingS2ABI,
      'updateAccumulatedAmount'
    >,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof malstakingS2Address } = {} as any,
) {
  return usePrepareContractWrite({
    abi: malstakingS2ABI,
    address: malstakingS2Address[11155111],
    functionName: 'updateAccumulatedAmount',
    ...config,
  } as UsePrepareContractWriteConfig<
    typeof malstakingS2ABI,
    'updateAccumulatedAmount'
  >)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link malstakingS2ABI}__ and `functionName` set to `"updateBaseYield"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x8d10861Cd2BddE665110eAF12Dd0490215F30eE6)
 */
export function usePrepareMalstakingS2UpdateBaseYield(
  config: Omit<
    UsePrepareContractWriteConfig<typeof malstakingS2ABI, 'updateBaseYield'>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof malstakingS2Address } = {} as any,
) {
  return usePrepareContractWrite({
    abi: malstakingS2ABI,
    address: malstakingS2Address[11155111],
    functionName: 'updateBaseYield',
    ...config,
  } as UsePrepareContractWriteConfig<typeof malstakingS2ABI, 'updateBaseYield'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link malstakingS2ABI}__ and `functionName` set to `"withdrawETH"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x8d10861Cd2BddE665110eAF12Dd0490215F30eE6)
 */
export function usePrepareMalstakingS2WithdrawEth(
  config: Omit<
    UsePrepareContractWriteConfig<typeof malstakingS2ABI, 'withdrawETH'>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof malstakingS2Address } = {} as any,
) {
  return usePrepareContractWrite({
    abi: malstakingS2ABI,
    address: malstakingS2Address[11155111],
    functionName: 'withdrawETH',
    ...config,
  } as UsePrepareContractWriteConfig<typeof malstakingS2ABI, 'withdrawETH'>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link malstakingS2ABI}__.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x8d10861Cd2BddE665110eAF12Dd0490215F30eE6)
 */
export function useMalstakingS2Event<TEventName extends string>(
  config: Omit<
    UseContractEventConfig<typeof malstakingS2ABI, TEventName>,
    'abi' | 'address'
  > & { chainId?: keyof typeof malstakingS2Address } = {} as any,
) {
  return useContractEvent({
    abi: malstakingS2ABI,
    address: malstakingS2Address[11155111],
    ...config,
  } as UseContractEventConfig<typeof malstakingS2ABI, TEventName>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link malstakingS2ABI}__ and `eventName` set to `"ForceWithdraw721"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x8d10861Cd2BddE665110eAF12Dd0490215F30eE6)
 */
export function useMalstakingS2ForceWithdraw721Event(
  config: Omit<
    UseContractEventConfig<typeof malstakingS2ABI, 'ForceWithdraw721'>,
    'abi' | 'address' | 'eventName'
  > & { chainId?: keyof typeof malstakingS2Address } = {} as any,
) {
  return useContractEvent({
    abi: malstakingS2ABI,
    address: malstakingS2Address[11155111],
    eventName: 'ForceWithdraw721',
    ...config,
  } as UseContractEventConfig<typeof malstakingS2ABI, 'ForceWithdraw721'>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link malstakingS2ABI}__ and `eventName` set to `"OwnershipTransferred"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x8d10861Cd2BddE665110eAF12Dd0490215F30eE6)
 */
export function useMalstakingS2OwnershipTransferredEvent(
  config: Omit<
    UseContractEventConfig<typeof malstakingS2ABI, 'OwnershipTransferred'>,
    'abi' | 'address' | 'eventName'
  > & { chainId?: keyof typeof malstakingS2Address } = {} as any,
) {
  return useContractEvent({
    abi: malstakingS2ABI,
    address: malstakingS2Address[11155111],
    eventName: 'OwnershipTransferred',
    ...config,
  } as UseContractEventConfig<typeof malstakingS2ABI, 'OwnershipTransferred'>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link malstakingS2ABI}__ and `eventName` set to `"Stake721"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x8d10861Cd2BddE665110eAF12Dd0490215F30eE6)
 */
export function useMalstakingS2Stake721Event(
  config: Omit<
    UseContractEventConfig<typeof malstakingS2ABI, 'Stake721'>,
    'abi' | 'address' | 'eventName'
  > & { chainId?: keyof typeof malstakingS2Address } = {} as any,
) {
  return useContractEvent({
    abi: malstakingS2ABI,
    address: malstakingS2Address[11155111],
    eventName: 'Stake721',
    ...config,
  } as UseContractEventConfig<typeof malstakingS2ABI, 'Stake721'>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link malstakingS2ABI}__ and `eventName` set to `"Unstake721"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x8d10861Cd2BddE665110eAF12Dd0490215F30eE6)
 */
export function useMalstakingS2Unstake721Event(
  config: Omit<
    UseContractEventConfig<typeof malstakingS2ABI, 'Unstake721'>,
    'abi' | 'address' | 'eventName'
  > & { chainId?: keyof typeof malstakingS2Address } = {} as any,
) {
  return useContractEvent({
    abi: malstakingS2ABI,
    address: malstakingS2Address[11155111],
    eventName: 'Unstake721',
    ...config,
  } as UseContractEventConfig<typeof malstakingS2ABI, 'Unstake721'>)
}
