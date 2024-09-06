import { defaultWagmiConfig } from "@web3modal/wagmi/react/config";

import { cookieStorage, createStorage } from "wagmi";
import { mainnet, sepolia } from "wagmi/chains";

export const projectId = "5dfe6b82a1607c16e497388fe32881c2";

if (!projectId) throw new Error("Project ID is not defined");

export const metadata = {
  name: "eBakery",
  description: "Launch your favorite meme",
  url: "https://web3modal.com", // origin must match your domain & subdomain
  icons: ["https://avatars.githubusercontent.com/u/37784886"],
};

// Create wagmiConfig
const chains = [mainnet, sepolia] as const;
export const web3_config = defaultWagmiConfig({
  chains,
  projectId,
  metadata,
  ssr: true,

  storage: createStorage({
    storage: cookieStorage,
  }),
});
