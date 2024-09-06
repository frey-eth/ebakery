"use client";

import { useWeb3Modal } from "@web3modal/wagmi/react";
import { useAccount } from "wagmi";

const Header = () => {
  const { open } = useWeb3Modal();
  const { address, isConnected } = useAccount();
  return (
    <div className="w-full p-5 flex items-center justify-center text-white">
      <div className="flex flex-row w-full border-2 border-white/20 rounded-md p-4 font-pixel justify-between">
        <div className="flex flex-row items-center gap-2">
          <div className="h-10 w-10 border flex items-center justify-center hover:animate-spin">
            Logo
          </div>

          <p className=" font-acarde text-2xl hover:animate-bounce">eBakery</p>
        </div>

        <button className="px-3 text-[20px] py-2 border tracking-wider whitespace-nowrap" onClick={() => open()}>
          {isConnected
            ? `${address?.slice(0, 6)}...${address?.slice(-6)}`
            : "Connect Wallet"}
        </button>
      </div>
    </div>
  );
};

export default Header;
