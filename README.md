# Moon Ape Lab 3D

This project contains the code for the Moon Ape Lab 3D collection contract and minting dapp.

The project is cloned from the HashlipsLabs repo with some additional input from datboi-1337

## Solidity smart contract

The smart contract for this collections is a bot more complex that your standard NFT collection
The collections has a 2d conterpart and the two collections need to be linked in a way. We will achive this by adding metadata to the collection.

### Minting rules

Also the minting rules are a bit different.

The team will be able to mint their current 2d versions for free.
Then raffle winner etc can mint up to 3 of their current 2d version for free.

This is followed by 2 whitelists rounds for different fees.

Then a mint for partner project holders

And at last a public mint.

For the first 4 phases the reveal should be instant, but for the last two on a set date, and if not sold-out, the remaining should be hidden.

Staff phase - free - no limit - Must Hold
Maltar phase - free - max 3 - Must Hold
Snapshot 1 - 0.05 - no limit - Must Hold
Snapshot 2 - 0.06 - no limit - Must Hold

This is all insta-reveal and 2d-3d match

Partner collection whitelist - 0.07 - tx limit? - random - No Need Hold
Public - 0.075 - tx limit? - random - No Need Hold

delay reveal - and safe metadata after reveal.

either meta data api or contract need to know what nft to show metadata for when some are reveals and others are not.

// questions
max per transaction?
can we mint over mutiple transactions?

MatchedMint function - price, whitelist
Staff, WL1, WL2

MaltarMint function - no price, whitelist, max pr wallet

PartnerMint function - price, collection whitelist, max pr wallet

PublicMint function - price, no whitelist, max pr wallet
