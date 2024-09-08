"use client";

import React, { useState } from "react";
import InputField from "../field/input";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { resolve } from "path";

interface LaunchFormProps {
  tokenName: string;
  tokenSymbol: string;
  totalSupply: number;
  initialMarketCap: number;
  upperMarketCap: number;
  creatorFeePercent: number;
  instantBuyAmount: number;
  transferLimit: number;
  transferLimitTime: number;
}

const schema = yup.object().shape({
  tokenName: yup.string().required(),
  tokenSymbol: yup.string().required(),
  totalSupply: yup.number().required(),
  initialMarketCap: yup
    .number()
    .min(0.5, "Initial Market cap must be between 0.5 ETH - 20 ETH")
    .max(20, "Initial Market cap must be between 0.5 ETH - 20 ETH")
    .required(),
  upperMarketCap: yup.number().min(1).required(),
  creatorFeePercent: yup.number().required(),
  instantBuyAmount: yup.number().required(),
  transferLimit: yup.number().required(),
  transferLimitTime: yup.number().required(),
});
const LaunchForm = () => {
  const { register, handleSubmit } = useForm<LaunchFormProps>({
    resolver: yupResolver(schema),
  });
  const [tokenSymbol, setTokenSymbol] = useState();

  const onSubmit = (data: LaunchFormProps) => {
    console.log(data);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-3 lg:px-12 px-3"
    >
      <div className="flex flex-row gap-6">
        <div className="flex-[2]">
          <InputField
            register={register}
            name="tokenName"
            label="Token Name"
            description="The full name of your new token (e.g. Ethereum)"
            placeholder="Enter name"
            required={true}
          />
        </div>
        <div className="flex-1">
          <InputField
            register={register}
            name="tokenSymbol"
            label="Token Symbol"
            description="The shorthand symbol (e.g. ETH)"
            placeholder="Enter symbol"
            required={true}
            onChange={(e) => setTokenSymbol(e)}
          />
        </div>
      </div>
      <InputField
        register={register}
        name="totalSupply"
        label="Total Supply"
        description="Min 0.01 Max 1 quadrillion"
        inputType="number"
        required={true}
        suffix={tokenSymbol}
      />

      <div className="flex lg:flex-row flex-col gap-2 lg:gap-6">
        <InputField
          register={register}
          name="initialMarketCap"
          label="Initial Market Cap"
          description="The Starting Market Cap for token (no need to provide ETH with this because it's on Uniswap V3)"
          inputType="number"
          required={true}
          suffix={"ETH"}
        />
        <InputField
          register={register}
          name="upperMarketCap"
          label="Upper Market Cap"
          defaultValue="100000000"
          description="The upper limit of the liquidity position, having smaller numbers means the liquidity will be denser meaning more ETH will be required to move the price, larger number spread out the liquidity more and it starts to behave like a V2 Uniswap position"
          inputType="number"
          required={true}
          suffix={"ETH"}
        />
      </div>
      <div className="flex flex-row gap-6">
        <InputField
          register={register}
          name="creatorFeePercent"
          label="Creator Fee Percent"
          description="Have a portion of the LP sent directly to your wallet instead of being locked in the contract permanently (you can still collects fees from the locked LP though)"
          inputType="number"
          required={true}
          suffix={tokenSymbol}
        />
        <InputField
          register={register}
          name="instantBuyAmount"
          label="Instant Buy Amount"
          description="ETH to be sent with the deployment which is used to instantly buy the token before sniper/bots get a chance"
          inputType="number"
          required={true}
          suffix={tokenSymbol}
        />
      </div>
      <div className="flex flex-row gap-6">
        <InputField
          register={register}
          name="transferLimit"
          label="Transfer Limit"
          description="Enforce a maximum transfer limit per transaction for a period of time at launch (leaving this blank or setting this to 0 means no limit)"
          inputType="number"
          required={true}
          suffix={tokenSymbol}
        />
        <InputField
          register={register}
          name="transferLimitTime"
          label="Transfer Limit Time (Minutes)"
          description="Min 0.01 Max 1 quadrillion"
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
