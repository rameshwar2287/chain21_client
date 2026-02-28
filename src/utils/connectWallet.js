import { ethers } from "ethers";

export const connectWallet = async () => {
  try {
    let provider;
    let walletName = "Unknown Wallet";
    let ethersProvider;

    // Token Pocket Detection (Special handling)
    if (window.tokenpocket?.ethereum) {
      console.log("🔗 Token Pocket detected");
      
      // Token Pocket requires direct ethereum object usage
      const tpProvider = window.tokenpocket.ethereum;
      
      // Request accounts first (Token Pocket specific)
      await tpProvider.request({ method: 'eth_requestAccounts' });
      
      // Then create ethers provider
      ethersProvider = new ethers.BrowserProvider(tpProvider);
      walletName = "Token Pocket";
    } 
    // Other wallets
    else if (window.ethereum) {
      ethersProvider = new ethers.BrowserProvider(window.ethereum);
      
      if (window.ethereum.isMetaMask) walletName = "MetaMask";
      else if (window.ethereum.isTrust) walletName = "Trust Wallet";
      else if (window.ethereum.isSafePal) walletName = "SafePal";
      else walletName = "Web3 Wallet";
    } 
    else {
      throw new Error("No wallet detected. Please install MetaMask, Trust Wallet, or Token Pocket.");
    }

    console.log(`🔗 Connecting to ${walletName}...`);

    // Get signer and address
    const signer = await ethersProvider.getSigner();
    const address = await signer.getAddress();

    console.log(`✅ Connected: ${address}`);

    return {
      provider: ethersProvider,
      signer,
      address,
      walletName,
      success: true
    };

  } catch (error) {
    console.error("❌ Wallet connection error:", error);

    if (error.code === 4001) {
      throw new Error("Connection rejected. Please approve the connection in your wallet.");
    } else if (error.code === -32002) {
      throw new Error("Connection request already pending. Please check your wallet.");
    } else if (error.code === -32603) {
      throw new Error("Internal wallet error. Please try again.");
    } else if (error.message) {
      throw new Error(error.message);
    } else {
      throw new Error("Could not connect wallet. Please try again.");
    }
  }
};

// Helper function to check if wallet is available
export const isWalletAvailable = () => {
  return !!(window.ethereum || window.tokenpocket?.ethereum);
};

// Helper function to get wallet name
export const getWalletName = () => {
  if (window.tokenpocket?.ethereum) return "Token Pocket";
  if (window.ethereum?.isMetaMask) return "MetaMask";
  if (window.ethereum?.isTrust) return "Trust Wallet";
  if (window.ethereum?.isSafePal) return "SafePal";
  if (window.ethereum) return "Web3 Wallet";
  return null;
};
