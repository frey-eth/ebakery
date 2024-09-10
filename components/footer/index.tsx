"use client";
import { FaSquareXTwitter } from "react-icons/fa6";
import { ImTelegram } from "react-icons/im";
import CommingSoon from "../home/coming_soon";
import { useState } from "react";

const Footer = () => {
  const [isMevBot, setIsMevBot] = useState(false);

  return (
    <div className="w-full p-5 flex items-center justify-between flex-row gap-10 md:px-10 ">
      <div className="flex flex-row gap-3">
        <a
          href="https://x.com/eBakeryfunX"
          target="_blank"
          className="text-white"
        >
          <FaSquareXTwitter size={32} />
        </a>
        <a
          href="https://t.me/eBakeryFun"
          target="_blank"
          className="text-white"
        >
          <ImTelegram size={32} />
        </a>
      </div>

      <div
        onClick={() => {
          setIsMevBot(true);
        }}
        className="text-white cursor-pointer py-1 font-acarde font-bold"
      >
        MEV Bot
      </div>

      {isMevBot && <CommingSoon isOpen={isMevBot} setOpen={setIsMevBot} />}
    </div>
  );
};

export default Footer;
