# Digital Asset Marketplace (Web3 Integration)

🚀 Project Overview

This project is a digital asset marketplace where users can purchase digital art using ETH instead of traditional currency. The existing project had a React.js frontend and dollar-based pricing. I integrated Web3 functionality to enable Ethereum transactions.:

## 🛠️ Features Added

Web3 Wallet Authentication: Users must connect their wallets to access the marketplace.

Ethereum-Based Purchase System: Replaced dollar-based transactions with ETH payments.

Smart Contract for NFT Purchases: Users can purchase NFTs, which get minted and transferred to their wallets.

## 📜 Smart Contract Implementation

I created and deployed an ERC-721 smart contract to facilitate NFT purchases. The contract:

Mints NFTs upon purchase

Transfers ownership to the buyer

## SmartContract

File Location  root\contracts\DigitalAssetMarketplace.sol


## 🏗️ Deployment Guide


1️⃣ Install Dependencies and Compile and Deploy Smart Contract (Hardhat) -- in root folder

```shell
npm install
npx hardhat compile
npx hardhat run scripts/deploy.js --network sepolia
```

Save the deployed contract address for frontend integration.

Replace this contract address with the one present in the .env file.

2️⃣  Install Dependencies -- in art-gallery folder

```shell
npm install
npm run start 
```



## 💳 Web3 Wallet Integration

Connect Wallet

The app requires users to connect their wallet before accessing the marketplace:

```shell
const connectWallet = async () => {
  if (window.ethereum) {
    const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
    setAccount(accounts[0]);
  } else {
    alert("Please install MetaMask!");
  }
};
```

Purchase NFT (Frontend Interaction)

```shell
const purchaseNFT = async (tokenId, price) => {
  const contract = new ethers.Contract(contractAddress, abi, signer);
  const transaction = await contract.purchaseNFT(tokenId, { value: price });
  await transaction.wait();
  alert("NFT Purchased Successfully!");
};
```

## 🎥 Demo Guide

Connect Wallet: Click "Connect Wallet" on the homepage.

Buy NFT: Select an NFT and click "Buy Now".

Transaction Confirmation: Approve the transaction in MetaMask.

Ownership Transfer: NFT will be transferred to your wallet.

## Live Link
https://digital-assets-1.netlify.app/







