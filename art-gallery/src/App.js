import "./App.css";
import { Header } from "./components/Header/Header";
import { Toaster } from "react-hot-toast";
import { NavRoutes } from "./routes/NavRoutes";
import { useData } from "./contexts/DataProvider.js";
import { ScrollToTop } from "./components/ScrollToTop/ScrollToTop";
import { Loader } from "./components/Loader/Loader";
import { useState, useEffect } from "react";
import { ethers } from "ethers";


function App() {
  const [loading, setLoading] = useState(false);

  const [account, setAccount] = useState(null);

  const [correctNetwork, setCorrectNetwork] = useState(false);

  // Function to connect wallet
  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        setLoading(true);
        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        const address = await signer.getAddress();
        setAccount(address);

        // Check the network after connecting
        const network = await provider.getNetwork();/*  */
        if (network.chainId === 421614) {
          // Arbitrum Sepolia Chain ID
          setCorrectNetwork(true);
        } else {
          alert("Please switch to Arbitrum Sepolia Network!");
          setCorrectNetwork(false);
        }
      } catch (error) {
        console.error("Wallet connection failed:", error);
      } finally {
        setLoading(false);
      }
    } else {
      alert("Please install MetaMask!");
    }
  };

  // Check if wallet is already connected (on refresh)
  useEffect(() => {
    const checkWalletConnection = async () => {
      if (window.ethereum) {
        try {
          const provider = new ethers.BrowserProvider(window.ethereum);
          const accounts = await provider.send("eth_accounts", []);
          if (accounts.length > 0) {
            setAccount(accounts[0]);

            // Check the network
            const network = await provider.getNetwork();
            if (network.chainId === 421614) {
              setCorrectNetwork(true);
            } else {
              setCorrectNetwork(false);
            }
          }
        } catch (error) {
          console.error("Error checking wallet connection:", error);
        }
      }
    };

    checkWalletConnection();
  }, []);

  return (
    <div className="App">
      {/* Show Connect Wallet Button if not connected */}
      {!account ? (
        <div style={{ textAlign: "center", marginTop: "100px" }}>
          <h1>Welcome to the Digital Asset Marketplace</h1>
          <br />
          <p>You must connect your wallet to the **Arbitrum Sepolia** Network to continue.</p>
          <br />
          <button
            onClick={connectWallet}
            className="connect-wallet-btn"
            disabled={loading}
          >
            {loading ? "Connecting..." : "Connect Wallet"}
          </button>
        </div>
      ) : (
        // Show the app after wallet connection
        <>
          <Header />
          {loading && <Loader />}
          <NavRoutes />
          <ScrollToTop />
          <Toaster
            position="top-right"
            reverseOrder={false}
            toastOptions={{
              success: { duration: 1500 },
              error: { duration: 1500 },
            }}
            containerStyle={{
              top: "6rem",
            }}
          />
        </>
      )}
    </div>
  );
}

export default App;