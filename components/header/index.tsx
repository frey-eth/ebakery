"use client";
import logo_image from "@/public/images/logo.png";
import Image from "next/image";
import { ConnectButton } from "thirdweb/react";
import { client } from "@/lib/thirdweb_client";

const Header = () => {
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
              <a href="" target="_blank">
                [twitter]
              </a>
              <a href="" target="_blank">
                [support]
              </a>
            </div>

            <div className="flex flex-row gap-2">
              <a href="" target="_blank">
                [telegram]
              </a>
              <a href="" target="_blank">
                [how it works]
              </a>
            </div>
          </div>
        </div>

        <ConnectButton client={client} />
      </div>
    </div>
  );
};

export default Header;
