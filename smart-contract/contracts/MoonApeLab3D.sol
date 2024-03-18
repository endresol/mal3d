// SPDX-License-Identifier: MIT

pragma solidity >=0.8.13 <0.9.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/cryptography/MerkleProof.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/token/common/ERC2981.sol";
import "./RandomlyAssigned.sol";

interface IMoonStaking {
    function getTokenYield(
        address contractAddress,
        uint256 tokenId
    ) external view returns (uint256);

    function getStakerNFT(
        address staker
    )
        external
        view
        returns (
            uint256[] memory,
            uint256[] memory,
            uint256[] memory,
            uint256[] memory,
            uint256[] memory
        );

    function balanceOf(address owner) external view returns (uint256 balance);

    function ownerOf(
        address contractAddress,
        uint256 tokenId
    ) external view returns (address);
}

interface IMoonPass {
    function balanceOf(address owner) external view returns (uint256 balance);

    function tokenOfOwnerByIndex(
        address owner,
        uint256 index
    ) external view returns (uint256 tokenId);

    function ownerOf(uint256 tokenId) external view returns (address owner);

    function pass_value_in_apes(
        uint256 _tokenId
    ) external view returns (uint256);
}

contract MoonApeLab3D is
    ERC721,
    Ownable,
    ReentrancyGuard,
    ERC2981,
    RandomlyAssigned
{
    using Strings for uint256;

    address public constant GENESIS =
        0x34c4EBA1966B502dfCF0868b6f271d85CC8A2312;
    address public constant MOONSTAKING =
        0x00a103267A22971375C3C37d6E1f1BDfb548e946;
    address public constant MOONSTAKING2 =
        0x34E391FdAE0965e4b0F85EA702572A13F6B5eBa2;
    address public constant MOONPASS =
        0xbBCCBD7BD5601232334CD64846e0cC64dFE37b4E;

    mapping(address => bool) public partnerCollections; // partner collections

    uint256 public royalties;

    bytes32 public merkleRoot;
    mapping(address => bool) public ambassadorClaimed;
    mapping(address => uint256) public staffClaimed;

    mapping(uint256 => bool) public matchminted;
    string public uriPrefix =
        "https://storage.moonapelab.io/static/moonapes3d/metadata/";
    string public uriSuffix = ".json";
    string public hiddenMetadataUri;

    uint256 public cost;
    uint256 public maxMintAmountPerTx = 10;
    uint256 public maxMintAmountPerWallet = 30;

    bool public paused = true;
    bool public revealed = false;

    uint256 public mintPhase = 0;

    mapping(uint256 => uint256) private discountLadder;

    constructor()
        ERC721("Moon Ape Lab 3D", "MAL3D")
        // Ownable(_msgSender()) // with or without value... don't know
        Ownable()
        RandomlyAssigned(8000, 1)
    {
        setCost(50000000000000000);
        setMaxMintAmountPerTx(10);
        setHiddenMetadataUri(
            "https://storage.moonapelab.io/static/moonapes3d/metadata/hidden.json"
        );

        discountLadder[1] = 5;
        discountLadder[5] = 10;
        discountLadder[10] = 15;

        royalties = 500;
    }

    // ----- Modifiers ------

    modifier mintCompliance(uint256 _mintAmount) {
        require(
            _mintAmount > 0 && _mintAmount <= maxMintAmountPerTx,
            "Invalid mint amount!"
        );
        require(
            tokenCount() + _mintAmount <= totalSupply(),
            "Max supply exceeded!"
        );
        _;
    }

    modifier mintPriceDiscountCompliance(
        uint256 _mintAmount,
        uint256 _discountToken
    ) {
        require(
            verifyMoonPassOwnership(_discountToken),
            "You are not the owner of this pass!"
        );
        uint256 value = IMoonPass(MOONPASS).pass_value_in_apes(_discountToken);
        uint256 discount = discountLadder[value];
        require(
            msg.value >= ((cost * (100 - discount)) / 100) * _mintAmount,
            "Insufficient funds!"
        );
        _;
    }

    modifier mintPriceCompliance(uint256 _mintAmount) {
        require(msg.value >= cost * _mintAmount, "Insufficient funds!");
        _;
    }

    function verifyMALOwnership(uint256 _tokenId) private view returns (bool) {
        address _owner = IERC721(GENESIS).ownerOf(_tokenId);
        if (_owner == _msgSender()) return true;

        if (_owner == MOONSTAKING) {
            _owner = IMoonStaking(MOONSTAKING).ownerOf(GENESIS, _tokenId);
        } else if (_owner == MOONSTAKING2) {
            _owner = IMoonStaking(MOONSTAKING2).ownerOf(GENESIS, _tokenId);
        }

        if (_msgSender() == _owner) {
            return true;
        }
        return false;
    }

    function verifyMoonPassOwnership(
        uint256 _tokenId
    ) private view returns (bool) {
        address _owner = IERC721(MOONPASS).ownerOf(_tokenId);
        if (_msgSender() == _owner) {
            return true;
        }
        return false;
    }

    // ----- Mint Functions ------

    function matchedMint(
        uint256[] memory _tokens,
        bytes32[] calldata _merkleProof
    )
        public
        payable
        mintCompliance(_tokens.length)
        mintPriceCompliance(_tokens.length)
    {
        require(!paused, "The contract is paused!");
        require(
            (mintPhase == 1 || mintPhase == 2 || mintPhase == 5),
            "Snapshot mint is not enabled!"
        );
        _matchedMint(_tokens, _merkleProof);
    }

    function matchedMintDicounted(
        uint256[] memory _tokens,
        bytes32[] calldata _merkleProof,
        uint256 _discountToken
    )
        public
        payable
        mintCompliance(_tokens.length)
        mintPriceDiscountCompliance(_tokens.length, _discountToken)
    {
        require(!paused, "The contract is paused!");
        require(
            (mintPhase == 1 || mintPhase == 2),
            "Snapshot mint is not enabled!"
        );
        _matchedMint(_tokens, _merkleProof);
    }

    function _matchedMint(
        uint256[] memory _tokens,
        bytes32[] calldata _merkleProof
    ) private {
        bytes32 leaf = keccak256(abi.encodePacked(_msgSender()));
        require(
            MerkleProof.verify(_merkleProof, merkleRoot, leaf),
            "Invalid proof!"
        );
        for (uint256 i = 0; i < _tokens.length; i++) {
            require(
                verifyMALOwnership(_tokens[i]),
                "You are not the owner of this NFT!"
            );
            _safeMint(_msgSender(), fakeNextToken(_tokens[i]));
            matchminted[_tokens[i]] = true;
        }
    }

    // phase 3 - free, no need for discount
    function transactionLimitedMatchedMint(
        uint256[] memory _tokens,
        bytes32[] calldata _merkleProof
    ) public payable {
        require(mintPhase == 3, "The Abassador mint is not enabled!");
        require(!ambassadorClaimed[_msgSender()], "Address already claimed!");
        _matchedMint(_tokens, _merkleProof);
        ambassadorClaimed[_msgSender()] = true;
    }

    function walletLimitedMatchedMint(
        uint256[] memory _tokens,
        bytes32[] calldata _merkleProof
    ) public payable {
        require(mintPhase == 4, "The Abassador mint is not enabled!");
        require(
            staffClaimed[_msgSender()] + _tokens.length <=
                maxMintAmountPerWallet,
            "Limit reached!"
        );
        _matchedMint(_tokens, _merkleProof);
        staffClaimed[_msgSender()] =
            staffClaimed[_msgSender()] +
            _tokens.length;
    }

    // phase 6
    function partnerMint(
        uint256 _mintAmount,
        address _collection
    )
        public
        payable
        mintCompliance(_mintAmount)
        mintPriceCompliance(_mintAmount)
    {
        require(mintPhase == 6, "The partner mint is not enabled!");
        // require(!partnerClaimed[_msgSender()], "Address already claimed!"); // TODO Remove limit?
        require(partnerCollections[_collection], "Collection not whitelisted!");

        require(
            IERC721(_collection).balanceOf(_msgSender()) > 0,
            "Address does not hold any partner NFTs!"
        );

        for (uint256 index = 0; index < _mintAmount; index++) {
            _safeMint(_msgSender(), nextToken());
        }
    }

    function partnerMintDiscount(
        uint256 _mintAmount,
        address _collection,
        uint256 _discountToken
    )
        public
        payable
        mintCompliance(_mintAmount)
        mintPriceDiscountCompliance(_mintAmount, _discountToken)
    {
        require(mintPhase == 6, "The partner mint is not enabled!");
        require(partnerCollections[_collection], "Collection not whitelisted!");

        require(
            IERC721(_collection).balanceOf(_msgSender()) > 0,
            "Address does not hold any partner NFTs!"
        );

        for (uint256 index = 0; index < _mintAmount; index++) {
            _safeMint(_msgSender(), nextToken());
        }
    }

    // PUBLIC MINT
    function mint(
        uint256 _mintAmount
    )
        public
        payable
        mintCompliance(_mintAmount)
        mintPriceCompliance(_mintAmount)
        ensureAvailabilityFor(_mintAmount)
    {
        require(!paused, "The contract is paused!");
        require(mintPhase == 7, "Public mint not started");

        for (uint256 index = 0; index < _mintAmount; index++) {
            _safeMint(_msgSender(), nextToken());
        }
    }

    function mintDiscount(
        uint256 _mintAmount,
        uint256 _discountToken
    )
        public
        payable
        mintCompliance(_mintAmount)
        mintPriceDiscountCompliance(_mintAmount, _discountToken)
    {
        require(!paused, "The contract is paused!");
        require(mintPhase == 7, "Public mint not started");

        _safeMint(_msgSender(), nextToken());
    }

    // Only Owner for giveaway etc
    function mintForAddress(
        uint256 _mintAmount,
        address _receiver
    ) public mintCompliance(_mintAmount) onlyOwner {
        for (uint256 index = 0; index < _mintAmount; index++) {
            _safeMint(_receiver, nextToken());
        }
    }

    function mintMatchedForAddress(
        uint256[] memory _tokens,
        address _receiver
    ) public mintCompliance(_tokens.length) onlyOwner {
        for (uint256 i = 0; i < _tokens.length; i++) {
            _safeMint(_receiver, fakeNextToken(_tokens[i]));
            matchminted[_tokens[i]] = true;
        }
    }

    function getMintPhase() public view returns (uint256) {
        return mintPhase;
    }

    function isTokenMinted(uint256 _token) external view returns (bool) {
        if (_ownerOf(_token) != address(0)) return true;
        return false;
    }

    // ----- Admin Functions ------

    function tokenURI(
        uint256 _tokenId
    ) public view virtual override(ERC721) returns (string memory) {
        require(
            _ownerOf(_tokenId) != address(0),
            "URI query for nonexistent token"
        );

        if (!matchminted[_tokenId] && revealed == false) {
            return hiddenMetadataUri;
        }

        string memory currentBaseURI = _baseURI();
        return
            bytes(currentBaseURI).length > 0
                ? string(
                    abi.encodePacked(
                        currentBaseURI,
                        _tokenId.toString(),
                        uriSuffix
                    )
                )
                : "";
    }

    function _baseURI() internal view virtual override returns (string memory) {
        return uriPrefix;
    }

    // ----- Start mintphase function ------
    function setupPhase(
        uint256 _mintPhase,
        uint256 _cost,
        bytes32 _merkleRoot
    ) external onlyOwner {
        mintPhase = _mintPhase;
        setCost(_cost);
        merkleRoot = _merkleRoot;
    }

    // ----- Only Owner Functions ------
    function setRevealed(bool _state) public onlyOwner {
        revealed = _state;
    }

    function setCost(uint256 _cost) public onlyOwner {
        cost = _cost;
    }

    function setMaxMintAmountPerTx(
        uint256 _maxMintAmountPerTx
    ) public onlyOwner {
        maxMintAmountPerTx = _maxMintAmountPerTx;
    }

    function setMaxMintAmountPerWallet(
        uint256 _maxMintAmountPerWallet
    ) public onlyOwner {
        maxMintAmountPerWallet = _maxMintAmountPerWallet;
    }

    function setHiddenMetadataUri(
        string memory _hiddenMetadataUri
    ) public onlyOwner {
        hiddenMetadataUri = _hiddenMetadataUri;
    }

    function setUriPrefix(string memory _uriPrefix) public onlyOwner {
        uriPrefix = _uriPrefix;
    }

    function setUriSuffix(string memory _uriSuffix) public onlyOwner {
        uriSuffix = _uriSuffix;
    }

    function setPaused(bool _state) public onlyOwner {
        paused = _state;
    }

    function setMerkleRoot(bytes32 _merkleRoot) public onlyOwner {
        merkleRoot = _merkleRoot;
    }

    function addPartnerCollection(address _collection) public onlyOwner {
        partnerCollections[_collection] = true;
    }

    function removePartnerCollection(address _collection) public onlyOwner {
        partnerCollections[_collection] = false;
    }

    function royaltyInfo(
        uint256,
        uint256 _salePrice
    ) public view virtual override returns (address, uint256) {
        uint256 royaltyAmount = (_salePrice * royalties) / _feeDenominator();
        return (owner(), royaltyAmount);
    }

    function supportsInterface(
        bytes4 interfaceId
    ) public view virtual override(ERC721, ERC2981) returns (bool) {
        return
            ERC721.supportsInterface(interfaceId) ||
            ERC2981.supportsInterface(interfaceId);
        // TODO check if can use only super here...
    }

    function withdraw() public onlyOwner nonReentrant {
        // This will transfer the contract balance to the owner.
        // Do not remove this otherwise you will not be able to withdraw the funds.
        // =============================================================================
        (bool os, ) = payable(owner()).call{value: address(this).balance}("");
        require(os);
        // =============================================================================
    }
}
