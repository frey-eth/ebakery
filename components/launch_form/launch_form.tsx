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
