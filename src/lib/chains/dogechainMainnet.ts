import { Chain } from "wagmi";

export const dogechainMainnet: Chain = {
  id: 2000,
  name: "Dogechain",
  network: "dogechain mainnet",
  nativeCurrency: {
    decimals: 18,
    name: "Dogecoin",
    symbol: "DOGE",
  },
  rpcUrls: {
    default: "https://rpc.dogechain.dog",
    "rpc-us.dogechain": "https://rpc-us.dogechain.dog",
    "dogechain.ankr": "https://dogechain.ankr.com",
  },
  blockExplorers: {
    default: {
      name: "dogechain explorer",
      url: "https://explorer.dogechain.dog",
    },
  },
  testnet: false,
};
