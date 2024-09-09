"use client";

import { useAccount, useConnect, useDisconnect } from "wagmi";
import logo_image from "@/public/images/logo.png";
import Image from "next/image";
import { injected } from "wagmi/connectors";
import { useState } from "react";
import HowItWorkModal from "../home/how_it_work_modal";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { GrWaypoint } from "react-icons/gr";
import CollectFeeModal from "../home/collect_fee_modal";
import { useWeb3Modal } from "@web3modal/wagmi/react";

const Header = () => {
  const { disconnect } = useDisconnect();
  const { open } = useWeb3Modal();
  const { address, isConnected } = useAccount();
  const [isOpen, setOpen] = useState(false);
  const [isOpenCollect, setOpenCollect] = useState(false);
  const currentPath = usePathname();

  return (
    <div className="w-full lg:p-5 p-1 flex items-center justify-center text-white">
      <div className="flex flex-row items-start w-full md:border-2 md:border-white/20 rounded-md lg:p-4 p-2 font-pixel justify-between md:items-center">
        <div className="flex flex-row items-center gap-2 w-full">
          <Link href={"/"} className="flex flex-col md:flex-row items-center">
            <div className="md:h-16 md:w-20 h-8 w-10 relative">
              <Image src={logo_image} alt="logo" objectFit="cover" fill />
            </div>
            <p className=" font-acarde lg:text-2xl text-sm animate-color-change">
              eBakery
            </p>
          </Link>
          <div className="lg:flex flex-col gap-2 text-lg hidden tracking-widest mx-4">
            <div className="flex flex-row gap-3">
              <a href="https://x.com/eBakeryfun" target="_blank">
                [twitter]
              </a>
              <a href="https://gitbook.ebakery.fun/" target="_blank">
                [support]
              </a>

              <button
                onClick={() => {
                  setOpenCollect(!isOpenCollect);
                }}
              >
                [collect trading fees]
              </button>
            </div>

            <div className="flex flex-row gap-3">
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

        <div className="flex flex-row md:gap-2 gap-1 items-center justify-center">
          {currentPath == "/token-launched" ? (
            <Link
              className="font-bold px-3 py-1 md:text-3xl whitespace-nowrap flex flex-row gap-2 items-center"
              href={"/"}
            >
              <div className=" text-orange-500 rotate-45 mx-2">
                <GrWaypoint />
              </div>
              Home
              <div className=" text-orange-500 rotate-[-135deg] mx-2">
                <GrWaypoint />
              </div>
            </Link>
          ) : (
            <Link
              className="font-bold px-3 py-1 md:text-3xl whitespace-nowrap flex flex-row gap-3 items-center"
              href={"/token-launched"}
            >
              <div className=" text-orange-500 rotate-45 ">
                <GrWaypoint />
              </div>
              Token launched
              <div className=" text-orange-500 rotate-[-135deg] ">
                <GrWaypoint />
              </div>
            </Link>
          )}
          <button
            className="lg:px-3 px-2 lg:text-[20px] lg:py-2 border tracking-wider whitespace-nowrap"
            onClick={() => {
              open();
            }}
          >
            {isConnected
              ? `${address?.slice(0, 6)}...${address?.slice(-6)}`
              : "Connect Wallet"}
          </button>
        </div>
      </div>
      {isOpen && <HowItWorkModal isOpen={isOpen} setOpen={setOpen} />}
      {isOpenCollect && (
        <CollectFeeModal isOpen={isOpenCollect} setOpen={setOpenCollect} />
      )}
    </div>
  );
};

export default Header;
