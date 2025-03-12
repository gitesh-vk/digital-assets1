import "./ProductDescription.css";
import React, { useState } from "react";
import { BsFillStarFill } from "react-icons/bs";
import { ethers } from "ethers";
import { useUserData } from "../../../../contexts/UserDataProvider.js";
import contractABI from "../../../../contract/contractABI.json"; // Import contract ABI

const CONTRACT_ADDRESS = process.env.REACT_APP_CONTRACT_ADDRESS; // contract address from env

export const ProductDescription = ({ selectedProduct }) => {
  const {
    wishlistHandler,
    isProductInWishlist,
    cartLoading,
  } = useUserData();

  const [loading, setLoading] = useState(false);

  const handlePurchase = async () => {
    if (!window.ethereum) {
      alert("Please install MetaMask to continue!");
      return;
    }

    try {
      setLoading(true);
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(CONTRACT_ADDRESS, contractABI, signer);

      // Convert product price to ETH equivalent (assuming discounted_price is in USD)
      const ethPrice = (selectedProduct.discounted_price / 3000).toFixed(5); // Example conversion (1 ETH = $3000)

      // Call the contract function to purchase the asset
      const tx = await contract.buyNFT(selectedProduct._id, { value: ethers.parseEther(ethPrice) });
      await tx.wait();

      alert("✅ NFT Purchased Successfully!");
    } catch (error) {
      console.error("❌ Transaction Failed:", error);
      alert("❌ Transaction Failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="product-details-description">
      <h1 className="product-name">{selectedProduct?.name}</h1>

      <div className="ratings-reviews">
        <span></span>
        <span>{selectedProduct?.rating}</span>{" "}
        <BsFillStarFill color={"orange"} />
        <span>
          <span className="review">({selectedProduct?.reviews}) reviews </span>
        </span>
      </div>

      <div className="product-price-container">
        <span className="product-original-price">
          ${selectedProduct?.original_price}{" "}
        </span>
        <span className="product-discount-price">
          {" "}
          {selectedProduct?.discounted_price} USD ≈ {(selectedProduct.discounted_price / 3000).toFixed(5)} ETH
        </span>
      </div>

      <p className="description-container">
        <span>Description</span>: {selectedProduct?.description}
      </p>

      <span className="gender-container">
        <span>Genre</span>: {selectedProduct?.category_name}
      </span>
      <p className="size-container">
        <span>Size</span>: {selectedProduct?.size}
      </p>

      <div className="tags">
        {!selectedProduct?.is_stock && (
          <span className="out-of-stock">
            {selectedProduct?.is_stock ? "In Stock" : "Out of stock"}
          </span>
        )}
        {selectedProduct?.trending && (
          <span className="trending">
            {selectedProduct?.trending ? "Trending" : ""}
          </span>
        )}
      </div>

      <div className="product-card-buttons-container">
        <button
          disabled={loading}
          onClick={handlePurchase}
          className="buy-now-btn"
        >
          {loading ? "Processing..." : "Buy with ETH"}
        </button>
        <button
          disabled={cartLoading}
          onClick={() => wishlistHandler(selectedProduct)}
          className="add-to-wishlist-btn"
        >
          {!isProductInWishlist(selectedProduct)
            ? "Add to wishlist"
            : "Remove from wishlist"}
        </button>
      </div>
    </div>
  );
};
