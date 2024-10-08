import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";

type HowItWorkModalProps = {
  isOpen: boolean;
  setOpen: (value: boolean) => void;
};
const HowItWorkModal = ({ isOpen, setOpen }: HowItWorkModalProps) => {
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={() => setOpen(false)}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full border  text-white max-w-md transform overflow-hidden bg-black p-6 text-left align-middle shadow-xl transition-all">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 font-acarde "
                >
                  How It Work
                </Dialog.Title>
                <div className="mt-2">
                  <div className="flex flex-row justify-center p-3 w-full">
                    <div className="h-[100px] w-[120px]">
                      <img
                        src="/images/logo.png"
                        alt="logo"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                  <div className="text-sm text-gray-500 flex flex-col gap-2 ">
                    Every token that comes out of the eBakery is renounced
                    /ownerless right on launch. <br /> No rugs, LP automatically
                    and permanently locked. The great thing about eBakery is
                    that you don't need to provide any ETH for liquidity. <br />{" "}
                    We recommend 1 ETH. Earn long-term LP trading fees while LPs
                    are permanently locked, supporting community growth. <br />{" "}
                    <div className="flex md:flex-row flex-col gap-1 whitespace-nowrap">
                      Read full on our Gitbook:
                      <a
                        href="https://gitbook.ebakery.fun/"
                        target="_blank"
                        className="text-white"
                      >
                        https://gitbook.ebakery.fun/
                      </a>
                    </div>
                  </div>
                </div>

                <div className="mt-4">
                  <button
                    type="button"
                    className=" whitespace-normal animate-color-change font-acarde border-2 border-white text-white px-4 py-2"
                    onClick={() => setOpen(false)}
                  >
                    Got it, thanks!
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default HowItWorkModal;
