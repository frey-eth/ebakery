"use client";

import React, { useEffect, useState } from "react";
import InputField from "../field/input";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useWriteContract } from "wagmi";
import contract_abi from "@/contract/bakery_abi.json";
import { Address, parseEther, parseUnits } from "viem";
import toast from "react-hot-toast";
import { useEstimateGas } from "wagmi";

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
  tokenName: yup.string().required("Token Name is required"),
  tokenSymbol: yup.string().required("Token Symbol is required"),
  totalSupply: yup
    .number()
    .min(0.01, "Total Supply must be at least 0.01")
    .max(1e15, "Total Supply is too large")
    .required("Total Supply is required"),
  initialMarketCap: yup
    .number()
    .min(0.5, "Initial Market Cap must be between 0.5 ETH and 20 ETH")
    .max(20, "Initial Market Cap must be between 0.5 ETH and 20 ETH")
    .required("Initial Market Cap is required"),
  upperMarketCap: yup
    .number()
    .min(1, "Upper Market Cap must be at least 1 ETH")
    .required("Upper Market Cap is required"),
  creatorFeePercent: yup
    .number()
    .min(0, "Creator Fee Percent cannot be negative")
    .max(100, "Creator Fee Percent cannot be more than 100")
    .required("Creator Fee Percent is required"),
  instantBuyAmount: yup
    .number()
    .min(0, "Instant Buy Amount cannot be negative")
    .required("Instant Buy Amount is required"),
  transferLimit: yup
    .number()
    .min(0, "Transfer Limit cannot be negative")
    .required("Transfer Limit is required"),
  transferLimitTime: yup
    .number()
    .min(0, "Transfer Limit Time cannot be negative")
    .required("Transfer Limit Time is required"),
});
const LaunchForm = () => {
  const { register, handleSubmit } = useForm<LaunchFormProps>({
    resolver: yupResolver(schema),
  });
  const [tokenSymbol, setTokenSymbol] = useState();
  const { writeContract, writeContractAsync, isSuccess } = useWriteContract();

  useEffect(() => {
    if (isSuccess) {
      toast.success("Token Created Successfully!");
    }
  }, [isSuccess]);
  const onSubmit = async (data: LaunchFormProps) => {
    writeContract({
      chainId: 1,
      abi: contract_abi,
      address: "0xb9c810bfe625e121fa0377d5aff959980e05c2da" as Address,
      functionName: "launch",
      args: [
        false,
        data.tokenName,
        data.tokenSymbol,
        parseUnits(data.totalSupply.toString(), 18),
        parseUnits(data.initialMarketCap.toString(), 18),
        parseUnits(data.upperMarketCap.toString(), 18),
        data.creatorFeePercent * 10,
        parseUnits(data.transferLimit.toString(), 18),
        data.transferLimitTime * 60,
      ],
      maxFeePerGas: parseUnits("100", 9),
      value: parseEther(data.instantBuyAmount.toString()),
    });
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
