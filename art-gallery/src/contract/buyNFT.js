import { ethers } from "ethers";
import contractABI from "../contractABI.json"; // Ensure correct path

const CONTRACT_ADDRESS = "0x7E93F7cdD3F562D667E5B1e6505894B03C906D07"; // Replace with your deployed contract address

export const buyNFT = async (tokenURI, price) => {
  try {
    if (!window.ethereum) {
      alert("🦊 MetaMask is required!");
      return;
    }

    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    const contract = new ethers.Contract(CONTRACT_ADDRESS, contractABI, signer);

    // Check if the user is on Arbitrum Sepolia
    const network = await provider.getNetwork();
    if (network.chainId !== 421614) {
      alert("🔁 Please switch to Arbitrum Sepolia network!");
      return;
    }

    // Convert ETH price to Wei
    const priceInWei = ethers.parseEther(price.toString());

    // Call the contract function
    const tx = await contract.buyNFT(tokenURI, { value: priceInWei });
    await tx.wait(); // Wait for transaction confirmation

    alert("🎉 NFT Purchased Successfully!");
  } catch (error) {
    console.error("Transaction Failed:", error);
    alert("⚠️ Transaction Failed! Check console for details.");
  }
};
