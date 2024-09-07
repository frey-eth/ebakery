"use client";

import React, { useState } from "react";
import InputField from "../field/input";

const LaunchForm = () => {
  const [tokenSymbol, setTokenSymbol] = useState();
  return (
    <form action="" className="flex flex-col gap-3 px-12">
      <div className="flex flex-row gap-6">
        <div className="flex-[2]">
          <InputField
            label="Token Name"
            description="The full name of your new token (e.g. Ethereum)"
            placeholder="Enter name"
            required={true}
          />
        </div>
        <div className="flex-1">
          <InputField
            label="Token Symbol"
            description="The shorthand symbol (e.g. ETH)"
            placeholder="Enter symbol"
            required={true}
            onChange={(e) => setTokenSymbol(e.target.value)}
          />
        </div>
      </div>
      <InputField
        label="Total Supply"
        description="Min 0.01 Max 1 quadrillion"
        placeholder="Enter symbol"
        inputType="number"
        required={true}
        suffix={tokenSymbol}
      />

      <div className="flex flex-row gap-6">
        <InputField
          label="Initial Market Cap"
          description="The Starting Market Cap for token (no need to provide ETH with this because it's on Uniswap V3)"
          placeholder="Enter symbol"
          inputType="number"
          required={true}
          suffix={tokenSymbol}
        />
        <InputField
          label="Upper Market Cap"
          description="The upper limit of the liquidity position, having smaller numbers means the liquidity will be denser meaning more ETH will be required to move the price, larger number spread out the liquidity more and it starts to behave like a V2 Uniswap position"
          placeholder="Enter symbol"
          inputType="number"
          required={true}
          suffix={tokenSymbol}
        />
      </div>
      <div className="flex flex-row gap-6">
        <InputField
          label="Creator Fee Percent"
          description="Have a portion of the LP sent directly to your wallet instead of being locked in the contract permanently (you can still collects fees from the locked LP though)"
          placeholder="Enter symbol"
          inputType="number"
          required={true}
          suffix={tokenSymbol}
        />
        <InputField
          label="Instant Buy Amount"
          description="ETH to be sent with the deployment which is used to instantly buy the token before sniper/bots get a chance"
          placeholder="Enter symbol"
          inputType="number"
          required={true}
          suffix={tokenSymbol}
        />
      </div>
      <div className="flex flex-row gap-6">
        <InputField
          label="Transfer Limit"
          description="Enforce a maximum transfer limit per transaction for a period of time at launch (leaving this blank or setting this to 0 means no limit)"
          placeholder="Enter symbol"
          inputType="number"
          required={true}
          suffix={tokenSymbol}
        />
        <InputField
          label="Transfer Limit Time (Minutes)"
          description="Min 0.01 Max 1 quadrillion"
          placeholder="Enter symbol"
          inputType="number"
          required={true}
          suffix={tokenSymbol}
        />
      </div>

      <div className="flex flex-row justify-end">
        <button
          type="submit"
          className="text-black px-3 py-1 bg-white font-acarde font-bold"
        >
          Create
        </button>
      </div>
    </form>
  );
};

export default LaunchForm;
