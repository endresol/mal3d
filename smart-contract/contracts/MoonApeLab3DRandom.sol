// SPDX-License-Identifier: MIT

pragma solidity >=0.8.9 <0.9.0;

import "erc721a/contracts/extensions/ERC721AQueryable.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/cryptography/MerkleProof.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/token/common/ERC2981.sol";

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

contract MoonApeLab3D is ERC721AQueryable, Ownable, ReentrancyGuard, ERC2981 {
    using Strings for uint256;
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIdCounter;

    address public constant GENESIS =
        0x0082F3387365e414512f06c4a587BbdC553c5049;
    address public constant MOONSTAKING =
        0xD78466a0F030Dd8D95CfFe33F867e436Ef5DC167;
    address public constant MOONSTAKING2 =
        0x8d10861Cd2BddE665110eAF12Dd0490215F30eE6;
    address public constant MOONPASS =
        0x8344BE53FB250dd76E65B6721B6553C21053Ee8d;

    mapping(uint256 => uint256) public match2dTo3d; // 2d token id to 3d token id
    mapping(uint256 => bool) public mintedGenesis;
    uint256 private matchedCounter; // TODO: need this?

    mapping(address => bool) public partnerCollections; // partner collections

    uint256 public royalties;

    bytes32 public merkleRoot;
    mapping(address => bool) public ambassadorClaimed; // TODO Remove?
    mapping(address => uint256) public staffClaimed;

    mapping(uint256 => bool) public matchminted;

    string public uriPrefix =
        "https://storage.moonapelab.io/static/moonapes3d/metadata/";
    string public uriSuffix = ".json";
    string public hiddenMetadataUri =
        "https://storage.moonapelab.io/static/moonapes3d/metadata/hidden.json";

    uint256 public cost;
    uint256 public maxSupply;
    uint256 public maxMintAmountPerTx = 10;
    uint256 public maxMintAmountPerWallet = 30;

    bool public paused = true;
    bool public matchedMintEnabled = false;
    bool public partnerMintEnabled = false;
    bool public revealed = false;

    uint256 public mintPhase = 0;

    mapping(uint256 => uint256) private discountLadder;

    constructor() ERC721A("Moon Ape Lab 3D - S3", "MAL3D-S3") {
        maxSupply = 106; // TODO: 8000
        setCost(5000000000000000);
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
            totalSupply() + _mintAmount <= maxSupply,
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

        matchedCounter = _tokenIdCounter.current(); // TODO need this?
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

        bytes32 leaf = keccak256(abi.encodePacked(_msgSender()));
        require(
            MerkleProof.verify(_merkleProof, merkleRoot, leaf),
            "Invalid proof!"
        );

        for (uint256 i = 0; i < _tokens.length; i++) {
            match2dTo3d[_tokenIdCounter.current() + 1] = _tokens[i];
            mintedGenesis[_tokens[i]] = true;
            _safeMint(_msgSender(), 1);
            _tokenIdCounter.increment();
        }
        matchedCounter = _tokenIdCounter.current();
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
            match2dTo3d[_tokenIdCounter.current() + 1] = _tokens[i];
            mintedGenesis[_tokens[i]] = true;
            _safeMint(_msgSender(), 1);
            _tokenIdCounter.increment();
            matchminted[_tokens[i]] = true; // TODO need this?
        }
    }

    // phase 3 - free, no need for discount
    // TODO remove transaction if mint together...
    function transactionLimitedMatchedMint(
        uint256[] memory _tokens,
        bytes32[] calldata _merkleProof
    ) public {
        require(mintPhase == 3, "The Abassador mint is not enabled!");
        require(!ambassadorClaimed[_msgSender()], "Address already claimed!");
        _matchedMint(_tokens, _merkleProof);
        ambassadorClaimed[_msgSender()] = true;
    }

    function walletLimitedMatchedMint(
        uint256[] memory _tokens,
        bytes32[] calldata _merkleProof
    ) public {
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
        require(
            !partnerCollections[_collection],
            "Collection not whitelisted!"
        );

        require(
            IERC721(_collection).balanceOf(_msgSender()) > 0,
            "Address does not hold any partner NFTs!"
        );

        _safeMint(_msgSender(), _mintAmount);
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

        _safeMint(_msgSender(), _mintAmount);
    }

    // PUBLIC MINT
    function mint(
        uint256 _mintAmount
    )
        public
        payable
        mintCompliance(_mintAmount)
        mintPriceCompliance(_mintAmount)
    {
        require(!paused, "The contract is paused!");
        require(mintPhase == 7, "Public mint not started");
        _safeMint(_msgSender(), _mintAmount);
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

        _safeMint(_msgSender(), _mintAmount);
    }

    function mintForAddress(
        uint256 _mintAmount,
        address _receiver
    ) public mintCompliance(_mintAmount) onlyOwner {
        _safeMint(_receiver, _mintAmount);
    }

    function getMintPhase() public view returns (uint256) {
        return mintPhase;
    }

    function is2dMinted(uint256 _2dTokenId) public view returns (bool) {
        return mintedGenesis[_2dTokenId];
    }

    // ----- Admin Functions ------
    function _startTokenId() internal view virtual override returns (uint256) {
        return 1;
    }

    function tokenURI(
        uint256 _tokenId
    )
        public
        view
        virtual
        override(ERC721A, IERC721Metadata)
        returns (string memory)
    {
        require(
            _exists(_tokenId),
            "ERC721Metadata: URI query for nonexistent token"
        );

        if (_tokenId > matchedCounter || revealed == false) {
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

    function setMatchedMintEnabled(bool _state) public onlyOwner {
        matchedMintEnabled = _state;
    }

    function setPartnerMintEnabled(bool _state) public onlyOwner {
        partnerMintEnabled = _state;
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
    ) public view virtual override(ERC2981, ERC721A, IERC165) returns (bool) {
        return
            ERC721A.supportsInterface(interfaceId) ||
            ERC2981.supportsInterface(interfaceId);
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
