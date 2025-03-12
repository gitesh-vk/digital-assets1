// SPDX-License-Identifier: MIT
pragma solidity ^0.8.26;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract DigitalAssetMarketplace is ERC721URIStorage, Ownable {
    uint256 public nextTokenId;
    uint256 public nftPrice = 0.001 ether; // Default NFT price

    event NFTPurchased(address indexed buyer, uint256 tokenId, string tokenURI);

    // ✅ Pass name and symbol to ERC721 constructor
    constructor() ERC721("DigitalArt", "DART") Ownable(msg.sender) {}

    function buyNFT(string memory tokenURI) external payable {
        require(msg.value >= nftPrice, "Insufficient ETH sent");

        uint256 tokenId = nextTokenId;
        nextTokenId++;

        _safeMint(msg.sender, tokenId);  // Mint NFT directly to buyer
        _setTokenURI(tokenId, tokenURI); // Set NFT metadata

        emit NFTPurchased(msg.sender, tokenId, tokenURI);
    }

    function setNFTPrice(uint256 newPrice) external onlyOwner {
        nftPrice = newPrice;
    }

    function withdraw() external onlyOwner {
        payable(owner()).transfer(address(this).balance);
    }
}
