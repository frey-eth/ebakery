import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";

type CollectFeeModalProps = {
  isOpen: boolean;
  setOpen: (value: boolean) => void;
};
const CollectFeeModal = ({ isOpen, setOpen }: CollectFeeModalProps) => {
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
                  How To Collect Trading Fees
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
                    1. Go to Smart Contract <br /> 2. Select Write Contract as
                    Proxy <br /> 3. Connect to Web3 with Etherscan <br /> 4.
                    Select item number "2. collectTradingFees" <br /> 5. Click
                    "Write" and Confirm
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

export default CollectFeeModal;
