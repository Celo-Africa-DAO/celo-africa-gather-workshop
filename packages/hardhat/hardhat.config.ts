import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import * as dotenv from "dotenv";

dotenv.config();


const CELO_RPC_URL = process.env.CELO_RPC_URL || "https://forno.celo.org"; // Public Celo RPC URL
const PRIVATE_KEY = process.env.PRIVATE_KEY || "your-private-key"; // Replace with your actual private key


const config: HardhatUserConfig = {
  solidity: "0.8.24",
  networks: {
    celo: {
      url: CELO_RPC_URL,
      accounts: [PRIVATE_KEY],
      chainId: 42220, // Celo Mainnet Chain ID
    },
    alfajores: {
      url: "https://alfajores-forno.celo-testnet.org", // Celo Testnet RPC URL
      accounts: [PRIVATE_KEY],
      chainId: 44787, // Celo Testnet Chain ID
    },
  },
  etherscan: {
    apiKey: {
      // Etherscan-like block explorer API keys
      celo: process.env.CELOSCAN_API_KEY || "your-celoscan-api-key", // Replace with your actual CeloScan API key
      alfajores: process.env.CELOSCAN_API_KEY || "your-celoscan-api-key",
    },
  },
};

export default config;
