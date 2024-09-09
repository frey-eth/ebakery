"use client";

import { useAccount, useConnect, useDisconnect } from "wagmi";
import logo_image from "@/public/images/logo.png";
import Image from "next/image";
import { injected } from "wagmi/connectors";
import { useState } from "react";
import HowItWorkModal from "../home/how_it_work_modal";

const Header = () => {
  const { connect } = useConnect();
  const { disconnect } = useDisconnect();
  const { address, isConnected } = useAccount();
  const [isOpen, setOpen] = useState(false);

  return (
    <div className="w-full lg:p-5 p-2 flex items-center justify-center text-white">
      <div className="flex flex-row w-full border-2 border-white/20 rounded-md lg:p-4 p-2 font-pixel justify-between">
        <div className="flex flex-row items-center gap-2">
          <div className="h-12 w-12 flex items-center justify-center hover:animate-spin">
            <Image src={logo_image} alt="logo" objectFit="cover" />
          </div>

          <p className=" font-acarde lg:text-2xl text-lg animate-color-change">
            eBakery
          </p>

          <div className="lg:flex flex-col gap-2 text-lg hidden tracking-widest mx-4">
            <div className="flex flex-row gap-2">
              <a href="https://x.com/eBakeryfun" target="_blank">
                [twitter]
              </a>
              <a href="https://t.me/eBakeryFun" target="_blank">
                [support]
              </a>
            </div>

            <div className="flex flex-row gap-2">
              <a href="https://t.me/eBakeryFun" target="_blank">
                [telegram]
              </a>
              <button
                onClick={() => {
                  setOpen(!isOpen);
                }}
              >
                [how it works]
              </button>
            </div>
          </div>
        </div>

        <button
          className="lg:px-3 px-2 lg:text-[20px] lg:py-2 border tracking-wider whitespace-nowrap"
          onClick={() => {
            if (!isConnected) {
              connect({ connector: injected() });
            } else {
              disconnect();
            }
          }}
        >
          {isConnected
            ? `${address?.slice(0, 6)}...${address?.slice(-6)}`
            : "Connect Wallet"}
        </button>
      </div>
      {isOpen && <HowItWorkModal isOpen={isOpen} setOpen={setOpen} />}
    </div>
  );
};

export default Header;
