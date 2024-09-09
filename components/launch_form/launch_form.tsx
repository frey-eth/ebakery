"use client";

import React, { useEffect, useState } from "react";
import InputField from "../field/input";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useAccount, useBalance, useConnect, useWriteContract } from "wagmi";
import contract_abi from "@/contract/bakery_abi.json";
import { Address, parseEther, parseUnits } from "viem";
import toast from "react-hot-toast";
import { injected } from "wagmi/connectors";

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
    .min(0, "Upper Market Cap must be at least 1 ETH")
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
    .max(1440, "Transfer Limit Time cannot be more than 1440")
    .required("Transfer Limit Time is required"),
});
const LaunchForm = () => {
  const { register, handleSubmit } = useForm<LaunchFormProps>({
    resolver: yupResolver(schema),
  });
  const [tokenSymbol, setTokenSymbol] = useState();
  const { writeContract, isSuccess } = useWriteContract();
  const { connect } = useConnect();
  const { address } = useAccount();
  const balance = useBalance({
    address: address,
  });

  useEffect(() => {
    if (isSuccess) {
      toast.success("Token Created Successfully!");
    }
  }, [isSuccess]);
  const onSubmit = async (data: LaunchFormProps) => {
    if (!address) {
      connect({ connector: injected() });
      return;
    }
    if (Number(balance.data?.formatted) < data.instantBuyAmount) {
      toast.error("Insufficient balance to create token");
      return;
    }

    writeContract({
      chainId: 1,
      abi: contract_abi,
      address: "0x1d47861f94fa61061ce2025d51d1ae4c8e00775b" as Address,
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
            inputType="text"
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
            inputType="text"
            required={true}
            onChange={(e) => setTokenSymbol(e)}
          />
        </div>
      </div>
      <InputField
        register={register}
        name="totalSupply"
        label="Total Supply"
        placeholder="Enter total supply"
        description="Min 0.01 Max 1 quadrillion"
        inputType="number"
        required={true}
        suffix={tokenSymbol}
      />

      <div className="flex lg:flex-row flex-col gap-2 lg:gap-6">
        <InputField
          register={register}
          name="initialMarketCap"
          placeholder="Min 0.5 ETH Max 20 ETH, We recommend 1 ETH"
          label="Initial Market Cap"
          description="The Starting Market Cap for token (no need to provide ETH with this because it's on Uniswap V3)."
          inputType="number"
          required={true}
          suffix={"ETH"}
        />
        <InputField
          register={register}
          name="upperMarketCap"
          placeholder="Enter upper market cap"
          label="Upper Market Cap"
          defaultValue="100000000"
          description="The upper limit of the liquidity position, having smaller numbers means the liquidity will be denser meaning more ETH will be required to move the price, larger number spread out the liquidity more and it starts to behave like a V2 Uniswap position."
          inputType="number"
          required={true}
          suffix={"ETH"}
          extention="Default: 100000000"
        />
      </div>
      <div className="flex flex-row gap-6">
        <InputField
          register={register}
          name="creatorFeePercent"
          placeholder="Recommended: 0% - 5% Max: 10%"
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
          description="How many minutes to apply the transfer limit for( leaving this blank or setting it to 0 means the limit is disabled)."
          inputType="number"
          required={true}
          suffix={tokenSymbol}
          extention="Max: 24 hours (1,440 minutes)"
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
