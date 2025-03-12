require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

module.exports = {
  solidity: "0.8.26",
  networks: {
    sepolia: {
      url: process.env.ALCHEMY_API_URL, // Alchemy URL
      accounts: [process.env.PRIVATE_KEY], // wallet's private key
    },
  },
};
