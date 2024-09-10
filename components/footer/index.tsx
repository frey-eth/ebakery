import { FaSquareXTwitter } from "react-icons/fa6";
import { ImTelegram } from "react-icons/im";

const Footer = () => {
  return (
    <div className="w-full p-5 flex items-center justify-center flex-row gap-10 ">
      <a href="https://x.com/eBakeryfunX" target="_blank" className="text-white">
        <FaSquareXTwitter size={48} />
      </a>
      <a href="https://t.me/eBakeryFun" target="_blank" className="text-white">
        <ImTelegram size={48} />
      </a>
    </div>
  );
};

export default Footer;
