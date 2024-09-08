import StarAnimation from "@/components/background";
import LaunchForm from "@/components/launch_form/launch_form";
import { RiContractLine } from "react-icons/ri";

export default function Home() {
  return (
    <div className="min-h-screen overflow-hidden relative flex flex-col pb-6">
      <div className=" flex-col gap-2 text-lg tracking-widest lg:hidden font-pixel mx-4 w-full text-white">
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
      <div className="flex-1 flex flex-col gap-6">
        <div className="text-decoration-none">
          <h1 className="connect-footer font-pixel my-5 text-white text-center p-5 font-bold text-[60px] md:text-[200px] font-sanctuary uppercase relative ">
            Launch your favorite token
          </h1>
        </div>
        <div className="flex flex-col gap-2 w-full items-center">
          <h1 className="font-acarde text-purple-400 text-3xl">
            Launch V3 Token
          </h1>
          <p className=" font-pixel text-white text-xl lg:text-[24px] px-2 text-center">
            Create your own ERC-20 Token with balanced and fair Uniswap V3 curve
          </p>

          <a
            href=""
            target="_blank"
            className="flex flex-row items-center gap-3 text-white font-pixel text-lg p-2 border border-purple-400 hover:bg-purple-400 hover:text-white"
          >
            <RiContractLine size={28} className="" /> Contract
          </a>
        </div>

        <LaunchForm />
      </div>
      <StarAnimation />
    </div>
  );
}
