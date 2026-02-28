// // import { useEffect } from "react";
// // import { useLocation } from "react-router-dom";

// // export const getMoneySymbol = () => {
// //   return "$";
// // };

// // export const MIN_INVESTMENT_AMOUNT = 20;

// // export const maskMemberId = (memberId) => {
// //   if (!memberId || memberId.length <= 2) {
// //     return memberId;
// //   }

// //   const firstChar = memberId[0];
// //   const lastChar = memberId[memberId.length - 1];
// //   const maskedChars = "*".repeat(memberId.length - 2);

// //   return `${firstChar}${maskedChars}${lastChar}`;
// // };

// // export const maskWalletAddress = (walletAddress) => {
// //   if (!walletAddress || walletAddress.length < 10) {
// //     return walletAddress;
// //   }

// //   const firstFourChars = walletAddress.slice(0, 4);
// //   const lastFourChars = walletAddress.slice(-4);
// //   const maskedChars = " **** ".repeat(1);

// //   return `${firstFourChars}${maskedChars}${lastFourChars}`;
// // };
// // export const maskEmailAddress = (email) => {
// //   if (!email) return "";

// //   const [username, domain] = email.split("@");
// //   if (!domain) return email;

// //   if (username.length <= 2) {
// //     return `${username[0]}*@${domain}`;
// //   }

// //   const maskedUsername = username.slice(0, 2) + "*".repeat(2);
// //   return `${maskedUsername}@${domain}`;
// // };

// // export const ScrollToTop = () => {
// //   const location = useLocation();

// //   useEffect(() => {
// //     window.scrollTo(0, 0);
// //   }, [location]);

// //   return null;
// // };

// // export const shareReferralCode = async (referralCode) => {
// //   const baseUrl = window.location.origin;
// //   const shareUrl = `${baseUrl}/register?referralCode=${encodeURIComponent(
// //     referralCode
// //   )}`;

// //   const shareData = {
// //     title: "Invite to Our App",
// //     text: `Join ${MainContent.appName} with my referral code!`,
// //     url: shareUrl,
// //   };

// //   const isSecure =
// //     window.isSecureContext || window.location.hostname === "localhost";

// //   if (!isSecure) {
// //     alert(
// //       `Sharing is only supported on secure websites. Please copy manually: ${shareUrl}`
// //     );
// //     return;
// //   }

// //   if (navigator.share) {
// //     try {
// //       await navigator.share(shareData);
// //       console.log("Shared successfully");
// //     } catch (error) {
// //       if (error.name !== "AbortError") {
// //         alert(`Failed to share: ${error.message}`);
// //       }
// //     }
// //   } else if (navigator.clipboard) {
// //     try {
// //       await navigator.clipboard.writeText(shareUrl);
// //       alert("Link copied to clipboard! Paste it to share.");
// //     } catch {
// //       alert(`Failed to copy link. Please copy manually: ${shareUrl}`);
// //     }
// //   } else {
// //     alert(`Sharing not supported. Please copy this link: ${shareUrl}`);
// //   }
// // };

// // export const calculateProfitOrLoss = ({
// //   purchaseValue,
// //   currentValue,
// //   holdingToken,
// // }) => {
// //   const totalPurchaseCost = purchaseValue * holdingToken;
// //   const currentValueOfHolding = currentValue * holdingToken;
// //   const profitOrLoss = currentValueOfHolding - totalPurchaseCost;
// //   return profitOrLoss;
// // };

// // import axios from "axios";
// // import { ethers } from "ethers";
// // import { MainContent } from "../constants/mainContent";
// // export const fetchDataWithCache = async () => {
// //   const cacheKey = "cryptoData";
// //   const cacheTimeKey = "cryptoDataTimestamp";
// //   const cacheExpiry = 60 * 1000; // Cache for 1 minute

// //   const cachedData = localStorage.getItem(cacheKey);
// //   const cachedTime = localStorage.getItem(cacheTimeKey);

// //   const currentTime = new Date().getTime();

// //   // If cached data exists and is still valid, use it
// //   if (cachedData && cachedTime && currentTime - cachedTime < cacheExpiry) {
// //     console.log("Using cached data");
// //     return JSON.parse(cachedData);
// //   }

// //   try {
// //     // Fetch live data from API if cache is expired or not present
// //     const response = await axios.get(
// //       "https://api.coingecko.com/api/v3/coins/markets",
// //       {
// //         params: {
// //           vs_currency: "usd",
// //           // ids: 'bitcoin,binancecoin,ethereum',
// //           ids: "bitcoin,binancecoin,ethereum,dogecoin,ripple,litecoin",
// //           order: "market_cap_desc",
// //         },
// //       }
// //     );

// //     // Cache the response data and timestamp
// //     localStorage.setItem(cacheKey, JSON.stringify(response.data));
// //     localStorage.setItem(cacheTimeKey, currentTime.toString());

// //     console.log("Fetched live data");
// //     return response.data;
// //   } catch (error) {
// //     console.error("Error fetching live data:", error);
// //     // Return cached data in case of error (fallback)
// //     if (cachedData) {
// //       return JSON.parse(cachedData);
// //     }
// //     throw error;
// //   }
// // };

// // // export const getWalletAddress = async (walletType = "metamask") => {
// // //   const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
// // //   const walletDisplayNames = {
// // //     metamask: "MetaMask",
// // //     safepal: "SafePal",
// // //     trustwallet: "Trust Wallet",
// // //   };

// // //   const displayName = walletDisplayNames[walletType.toLowerCase()] || "Wallet";

// // //   if (typeof window.ethereum === "undefined") {
// // //     if (isMobile) {
// // //       throw new Error(
// // //         `Please open the ${displayName} app and visit this site using the in-app browser.`
// // //       );
// // //     } else {
// // //       throw new Error(`${displayName} is not installed in your browser.`);
// // //     }
// // //   }

// // //   if (walletType.toLowerCase() === "safepal") {
// // //     const isSafePal =
// // //       window.ethereum.isSafePal ||
// // //       navigator.userAgent.toLowerCase().includes("safepal");
// // //     if (!isSafePal) {
// // //       throw new Error("Please use the SafePal wallet.");
// // //     }
// // //   }

// // //   if (walletType.toLowerCase() === "metamask") {
// // //     const isMetaMask = window.ethereum.isMetaMask;
// // //     if (!isMetaMask) {
// // //       throw new Error("Please use the MetaMask wallet.");
// // //     }
// // //   }

// // //   if (walletType.toLowerCase() === "trustwallet") {
// // //     const isTrustWallet = window.ethereum.isTrust;
// // //     if (!isTrustWallet) {
// // //       throw new Error("Please use the Trust Wallet.");
// // //     }
// // //   }

// // //   try {
// // //     await window.ethereum.request({ method: "eth_requestAccounts" });
// // //     try {
// // //       await window.ethereum.request({
// // //         method: "wallet_switchEthereumChain",
// // //         params: [{ chainId: "0x38" }],
// // //       });
// // //     } catch (switchError) {
// // //       if (switchError.code === 4902) {
// // //         try {
// // //           await window.ethereum.request({
// // //             method: "wallet_addEthereumChain",
// // //             params: [
// // //               {
// // //                 chainId: "0x38",
// // //                 chainName: "Binance Smart Chain",
// // //                 nativeCurrency: {
// // //                   name: "BNB",
// // //                   symbol: "BNB",
// // //                   decimals: 18,
// // //                 },
// // //                 rpcUrls: ["https://bsc-dataseed1.binance.org/"],
// // //                 blockExplorerUrls: ["https://bscscan.com/"],
// // //               },
// // //             ],
// // //           });
// // //         } catch (addError) {
// // //           console.error("Error adding BSC network:", addError);
// // //           throw new Error("Failed to add BSC network");
// // //         }
// // //       } else {
// // //         throw switchError;
// // //       }
// // //     }

// // //     const provider = new ethers.BrowserProvider(window.ethereum);
// // //     const signer = await provider.getSigner();
// // //     const userAddress = await signer.getAddress();

// // //     console.log("Connected wallet address:", userAddress);

// // //     return userAddress;
// // //   } catch (error) {
// // //     console.error("Wallet connection failed:", error);
// // //     throw error;
// // //   }
// // // };



// // export const getWalletAddress = async (walletType = "metamask") => {
// //   const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

// //   // 1. Added TokenPocket to display names
// //   const walletDisplayNames = {
// //     metamask: "MetaMask",
// //     safepal: "SafePal",
// //     trustwallet: "Trust Wallet",
// //     tokenpocket: "TokenPocket",
// //   };

// //   const displayName = walletDisplayNames[walletType.toLowerCase()] || "Wallet";

// //   if (typeof window.ethereum === "undefined") {
// //     if (isMobile) {
// //       throw new Error(
// //         `Please open the ${displayName} app and visit this site using the in-app browser.`
// //       );
// //     } else {
// //       throw new Error(`${displayName} is not installed in your browser.`);
// //     }
// //   }

// //   // 2. Added specific check for TokenPocket
// //   if (walletType.toLowerCase() === "tokenpocket") {
// //     const isTokenPocket = window.ethereum.isTokenPocket;
// //     if (!isTokenPocket) {
// //       throw new Error("Please use the TokenPocket wallet.");
// //     }
// //   }

// //   if (walletType.toLowerCase() === "safepal") {
// //     const isSafePal =
// //       window.ethereum.isSafePal ||
// //       navigator.userAgent.toLowerCase().includes("safepal");
// //     if (!isSafePal) {
// //       throw new Error("Please use the SafePal wallet.");
// //     }
// //   }

// //   if (walletType.toLowerCase() === "metamask") {
// //     const isMetaMask = window.ethereum.isMetaMask;
// //     if (!isMetaMask) {
// //       throw new Error("Please use the MetaMask wallet.");
// //     }
// //   }

// //   if (walletType.toLowerCase() === "trustwallet") {
// //     const isTrustWallet = window.ethereum.isTrust;
// //     if (!isTrustWallet) {
// //       throw new Error("Please use the Trust Wallet.");
// //     }
// //   }

// //   try {
// //     await window.ethereum.request({ method: "eth_requestAccounts" });
// //     try {
// //       await window.ethereum.request({
// //         method: "wallet_switchEthereumChain",
// //         params: [{ chainId: "0x38" }],
// //       });
// //     } catch (switchError) {
// //       if (switchError.code === 4902) {
// //         try {
// //           await window.ethereum.request({
// //             method: "wallet_addEthereumChain",
// //             params: [
// //               {
// //                 chainId: "0x38",
// //                 chainName: "Binance Smart Chain",
// //                 nativeCurrency: {
// //                   name: "BNB",
// //                   symbol: "BNB",
// //                   decimals: 18,
// //                 },
// //                 rpcUrls: ["https://bsc-dataseed1.binance.org/"],
// //                 blockExplorerUrls: ["https://bscscan.com/"],
// //               },
// //             ],
// //           });
// //         } catch (addError) {
// //           console.error("Error adding BSC network:", addError);
// //           throw new Error("Failed to add BSC network");
// //         }
// //       } else {
// //         throw switchError;
// //       }
// //     }

// //     const provider = new ethers.BrowserProvider(window.ethereum);
// //     const signer = await provider.getSigner();
// //     const userAddress = await signer.getAddress();

// //     console.log("Connected wallet address:", userAddress);

// //     return userAddress;
// //   } catch (error) {
// //     console.error("Wallet connection failed:", error);
// //     throw error;
// //   }
// // };


// import axios from "axios";
// import { ethers } from "ethers";
// import { useEffect } from "react";
// import { useLocation } from "react-router-dom";
// import { MainContent } from "../constants/mainContent";

// // --- Utility Functions ---

// export const getMoneySymbol = () => "$";
// export const MIN_INVESTMENT_AMOUNT = 20;

// export const maskMemberId = (memberId) => {
//   if (!memberId || memberId.length <= 2) return memberId;
//   return `${memberId[0]}${"*".repeat(memberId.length - 2)}${memberId.slice(-1)}`;
// };

// export const maskWalletAddress = (walletAddress) => {
//   if (!walletAddress || walletAddress.length < 10) return walletAddress;
//   return `${walletAddress.slice(0, 4)} **** ${walletAddress.slice(-4)}`;
// };

// export const maskEmailAddress = (email) => {
//   if (!email) return "";
//   const [username, domain] = email.split("@");
//   if (!domain) return email;
//   if (username.length <= 2) return `${username[0]}*@${domain}`;
//   return `${username.slice(0, 2)}**@${domain}`;
// };

// export const ScrollToTop = () => {
//   const location = useLocation();
//   useEffect(() => { window.scrollTo(0, 0); }, [location]);
//   return null;
// };

// // --- Business Logic ---

// export const shareReferralCode = async (referralCode) => {
//   const shareUrl = `${window.location.origin}/register?referralCode=${encodeURIComponent(referralCode)}`;
//   const shareData = { title: "Invite to Our App", text: `Join ${MainContent.appName}!`, url: shareUrl };

//   if (navigator.share && (window.isSecureContext || window.location.hostname === "localhost")) {
//     try {
//       await navigator.share(shareData);
//     } catch (error) {
//       if (error.name !== "AbortError") alert(`Failed to share: ${error.message}`);
//     }
//   } else {
//     await navigator.clipboard.writeText(shareUrl);
//     alert("Link copied to clipboard!");
//   }
// };

// export const calculateProfitOrLoss = ({ purchaseValue, currentValue, holdingToken }) => {
//   return (currentValue * holdingToken) - (purchaseValue * holdingToken);
// };

// export const fetchDataWithCache = async () => {
//   const cacheKey = "cryptoData";
//   const cacheExpiry = 60 * 1000;
//   const cachedData = localStorage.getItem(cacheKey);
//   const cachedTime = localStorage.getItem("cryptoDataTimestamp");
//   const currentTime = Date.now();

//   if (cachedData && cachedTime && currentTime - cachedTime < cacheExpiry) {
//     return JSON.parse(cachedData);
//   }

//   try {
//     const response = await axios.get("https://api.coingecko.com/api/v3/coins/markets", {
//       params: { vs_currency: "usd", ids: "bitcoin,binancecoin,ethereum,dogecoin,ripple,litecoin", order: "market_cap_desc" },
//     });
//     localStorage.setItem(cacheKey, JSON.stringify(response.data));
//     localStorage.setItem("cryptoDataTimestamp", currentTime.toString());
//     return response.data;
//   } catch (error) {
//     if (cachedData) return JSON.parse(cachedData);
//     throw error;
//   }
// };

// // --- Wallet Connection Logic (FIXED) ---

// export const getWalletAddress = async (walletType = "metamask") => {
//   const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
//   const type = walletType.toLowerCase();

//   // 1. Identify the correct provider
//   // SafePal often injects 'window.safepal' or 'window.safepalProvider' to avoid conflicts
//   let provider = window.ethereum;

//   if (type === "safepal" && window.safepalProvider) {
//     provider = window.safepalProvider;
//   } else if (type === "tokenpocket" && window.tokenpocket) {
//     provider = window.tokenpocket;
//   }

//   if (!provider) {
//     const name = type === "safepal" ? "SafePal" : type === "metamask" ? "MetaMask" : "Wallet";
//     throw new Error(isMobile ? `Open ${name} app and use the in-app browser.` : `${name} is not installed.`);
//   }

//   // 2. Strict Validation Check
//   if (type === "safepal" && !provider.isSafePal) {
//     // If window.ethereum exists but isn't SafePal, we check if the user has multiple providers
//     if (window.ethereum.providers) {
//         const sf = window.ethereum.providers.find(p => p.isSafePal);
//         if (sf) provider = sf; else throw new Error("Please use the SafePal wallet.");
//     } else {
//         throw new Error("Please use the SafePal wallet.");
//     }
//   }

//   if (type === "metamask" && !provider.isMetaMask) throw new Error("Please use MetaMask.");
//   if (type === "trustwallet" && !provider.isTrust) throw new Error("Please use Trust Wallet.");

//   try {
//     // 3. Request Accounts (Fixes 4001 error by ensuring we call request on the CORRECT provider)
//     const accounts = await provider.request({ method: "eth_requestAccounts" });

//     if (!accounts || accounts.length === 0) {
//         throw new Error("wallet must has at least one account");
//     }

//     // 4. Switch to BSC (0x38)
//     try {
//       await provider.request({
//         method: "wallet_switchEthereumChain",
//         params: [{ chainId: "0x38" }],
//       });
//     } catch (switchError) {
//       if (switchError.code === 4902) {
//         await provider.request({
//           method: "wallet_addEthereumChain",
//           params: [{
//             chainId: "0x38",
//             chainName: "Binance Smart Chain",
//             nativeCurrency: { name: "BNB", symbol: "BNB", decimals: 18 },
//             rpcUrls: ["https://bsc-dataseed1.binance.org/"],
//             blockExplorerUrls: ["https://bscscan.com/"],
//           }],
//         });
//       } else {
//         throw switchError;
//       }
//     }

//     // 5. Finalize connection with Ethers
//     const ethersProvider = new ethers.BrowserProvider(provider);
//     const signer = await ethersProvider.getSigner();
//     return await signer.getAddress();

//   } catch (error) {
//     console.error("Connection failed:", error);
//     // Friendly error for the 4001 code
//     if (error.code === 4001) {
//         throw new Error("Connection rejected. Please unlock your wallet and try again.");
//     }
//     throw error;
//   }
// };


import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export const getMoneySymbol = () => {
  return "$";
};

export const MIN_INVESTMENT_AMOUNT = 20;

export const maskMemberId = (memberId) => {
  if (!memberId || memberId.length <= 2) {
    return memberId;
  }

  const firstChar = memberId[0];
  const lastChar = memberId[memberId.length - 1];
  const maskedChars = "*".repeat(memberId.length - 2);

  return `${firstChar}${maskedChars}${lastChar}`;
};

export const maskWalletAddress = (walletAddress) => {
  if (!walletAddress || walletAddress.length < 10) {
    return walletAddress;
  }

  const firstFourChars = walletAddress.slice(0, 4);
  const lastFourChars = walletAddress.slice(-4);
  const maskedChars = " **** ".repeat(1);

  return `${firstFourChars}${maskedChars}${lastFourChars}`;
};
export const maskEmailAddress = (email) => {
  if (!email) return "";

  const [username, domain] = email.split("@");
  if (!domain) return email;

  if (username.length <= 2) {
    return `${username[0]}*@${domain}`;
  }

  const maskedUsername = username.slice(0, 2) + "*".repeat(2);
  return `${maskedUsername}@${domain}`;
};

export const ScrollToTop = () => {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return null;
};

export const shareReferralCode = async (referralCode) => {
  const baseUrl = window.location.origin;
  const shareUrl = `${baseUrl}/register?referralCode=${encodeURIComponent(
    referralCode
  )}`;

  const shareData = {
    title: "Invite to Our App",
    text: `Join ${MainContent.appName} with my referral code!`,
    url: shareUrl,
  };

  const isSecure =
    window.isSecureContext || window.location.hostname === "localhost";

  if (!isSecure) {
    alert(
      `Sharing is only supported on secure websites. Please copy manually: ${shareUrl}`
    );
    return;
  }

  if (navigator.share) {
    try {
      await navigator.share(shareData);
      console.log("Shared successfully");
    } catch (error) {
      if (error.name !== "AbortError") {
        alert(`Failed to share: ${error.message}`);
      }
    }
  } else if (navigator.clipboard) {
    try {
      await navigator.clipboard.writeText(shareUrl);
      alert("Link copied to clipboard! Paste it to share.");
    } catch {
      alert(`Failed to copy link. Please copy manually: ${shareUrl}`);
    }
  } else {
    alert(`Sharing not supported. Please copy this link: ${shareUrl}`);
  }
};

export const calculateProfitOrLoss = ({
  purchaseValue,
  currentValue,
  holdingToken,
}) => {
  const totalPurchaseCost = purchaseValue * holdingToken;
  const currentValueOfHolding = currentValue * holdingToken;
  const profitOrLoss = currentValueOfHolding - totalPurchaseCost;
  return profitOrLoss;
};

import axios from "axios";
import { ethers } from "ethers";
import { MainContent } from "../constants/mainContent";
export const fetchDataWithCache = async () => {
  const cacheKey = "cryptoData";
  const cacheTimeKey = "cryptoDataTimestamp";
  const cacheExpiry = 60 * 1000; // Cache for 1 minute

  const cachedData = localStorage.getItem(cacheKey);
  const cachedTime = localStorage.getItem(cacheTimeKey);

  const currentTime = new Date().getTime();

  // If cached data exists and is still valid, use it
  if (cachedData && cachedTime && currentTime - cachedTime < cacheExpiry) {
    console.log("Using cached data");
    return JSON.parse(cachedData);
  }

  try {
    // Fetch live data from API if cache is expired or not present
    const response = await axios.get(
      "https://api.coingecko.com/api/v3/coins/markets",
      {
        params: {
          vs_currency: "usd",
          // ids: 'bitcoin,binancecoin,ethereum',
          ids: "bitcoin,binancecoin,ethereum,dogecoin,ripple,litecoin",
          order: "market_cap_desc",
        },
      }
    );

    // Cache the response data and timestamp
    localStorage.setItem(cacheKey, JSON.stringify(response.data));
    localStorage.setItem(cacheTimeKey, currentTime.toString());

    console.log("Fetched live data");
    return response.data;
  } catch (error) {
    console.error("Error fetching live data:", error);
    // Return cached data in case of error (fallback)
    if (cachedData) {
      return JSON.parse(cachedData);
    }
    throw error;
  }
};

// export const getWalletAddress = async (walletType = "metamask") => {
//   const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
//   const walletDisplayNames = {
//     metamask: "MetaMask",
//     safepal: "SafePal",
//     trustwallet: "Trust Wallet",
//   };

//   const displayName = walletDisplayNames[walletType.toLowerCase()] || "Wallet";

//   if (typeof window.ethereum === "undefined") {
//     if (isMobile) {
//       throw new Error(
//         `Please open the ${displayName} app and visit this site using the in-app browser.`
//       );
//     } else {
//       throw new Error(`${displayName} is not installed in your browser.`);
//     }
//   }

//   if (walletType.toLowerCase() === "safepal") {
//     const isSafePal =
//       window.ethereum.isSafePal ||
//       navigator.userAgent.toLowerCase().includes("safepal");
//     if (!isSafePal) {
//       throw new Error("Please use the SafePal wallet.");
//     }
//   }

//   if (walletType.toLowerCase() === "metamask") {
//     const isMetaMask = window.ethereum.isMetaMask;
//     if (!isMetaMask) {
//       throw new Error("Please use the MetaMask wallet.");
//     }
//   }

//   if (walletType.toLowerCase() === "trustwallet") {
//     const isTrustWallet = window.ethereum.isTrust;
//     if (!isTrustWallet) {
//       throw new Error("Please use the Trust Wallet.");
//     }
//   }

//   try {
//     await window.ethereum.request({ method: "eth_requestAccounts" });
//     try {
//       await window.ethereum.request({
//         method: "wallet_switchEthereumChain",
//         params: [{ chainId: "0x38" }],
//       });
//     } catch (switchError) {
//       if (switchError.code === 4902) {
//         try {
//           await window.ethereum.request({
//             method: "wallet_addEthereumChain",
//             params: [
//               {
//                 chainId: "0x38",
//                 chainName: "Binance Smart Chain",
//                 nativeCurrency: {
//                   name: "BNB",
//                   symbol: "BNB",
//                   decimals: 18,
//                 },
//                 rpcUrls: ["https://bsc-dataseed1.binance.org/"],
//                 blockExplorerUrls: ["https://bscscan.com/"],
//               },
//             ],
//           });
//         } catch (addError) {
//           console.error("Error adding BSC network:", addError);
//           throw new Error("Failed to add BSC network");
//         }
//       } else {
//         throw switchError;
//       }
//     }

//     const provider = new ethers.BrowserProvider(window.ethereum);
//     const signer = await provider.getSigner();
//     const userAddress = await signer.getAddress();

//     console.log("Connected wallet address:", userAddress);

//     return userAddress;
//   } catch (error) {
//     console.error("Wallet connection failed:", error);
//     throw error;
//   }
// };



export const getWalletAddress = async (walletType = "metamask") => {
  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

  // 1. Added TokenPocket to display names
  const walletDisplayNames = {
    metamask: "MetaMask",
    safepal: "SafePal",
    trustwallet: "Trust Wallet",
    tokenpocket: "TokenPocket",
  };

  const displayName = walletDisplayNames[walletType.toLowerCase()] || "Wallet";

  if (typeof window.ethereum === "undefined") {
    if (isMobile) {
      throw new Error(
        `Please open the ${displayName} app and visit this site using the in-app browser.`
      );
    } else {
      throw new Error(`${displayName} is not installed in your browser.`);
    }
  }

  // 2. Added specific check for TokenPocket
  if (walletType.toLowerCase() === "tokenpocket") {
    const isTokenPocket = window.ethereum.isTokenPocket;
    if (!isTokenPocket) {
      throw new Error("Please use the TokenPocket wallet.");
    }
  }

  if (walletType.toLowerCase() === "safepal") {
    const isSafePal =
      window.ethereum.isSafePal ||
      navigator.userAgent.toLowerCase().includes("safepal");
    if (!isSafePal) {
      throw new Error("Please use the SafePal wallet.");
    }
  }

  if (walletType.toLowerCase() === "metamask") {
    const isMetaMask = window.ethereum.isMetaMask;
    if (!isMetaMask) {
      throw new Error("Please use the MetaMask wallet.");
    }
  }

  if (walletType.toLowerCase() === "trustwallet") {
    const isTrustWallet = window.ethereum.isTrust;
    if (!isTrustWallet) {
      throw new Error("Please use the Trust Wallet.");
    }
  }

  try {
    await window.ethereum.request({ method: "eth_requestAccounts" });
    try {
      await window.ethereum.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: "0x38" }],
      });
    } catch (switchError) {
      if (switchError.code === 4902) {
        try {
          await window.ethereum.request({
            method: "wallet_addEthereumChain",
            params: [
              {
                chainId: "0x38",
                chainName: "Binance Smart Chain",
                nativeCurrency: {
                  name: "BNB",
                  symbol: "BNB",
                  decimals: 18,
                },
                rpcUrls: ["https://bsc-dataseed1.binance.org/"],
                blockExplorerUrls: ["https://bscscan.com/"],
              },
            ],
          });
        } catch (addError) {
          console.error("Error adding BSC network:", addError);
          throw new Error("Failed to add BSC network");
        }
      } else {
        throw switchError;
      }
    }

    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    const userAddress = await signer.getAddress();

    console.log("Connected wallet address:", userAddress);

    return userAddress;
  } catch (error) {
    console.error("Wallet connection failed:", error);
    throw error;
  }
};