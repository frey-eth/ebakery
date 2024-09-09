"use client";

import React, { ReactNode } from "react";

import { createWeb3Modal } from "@web3modal/wagmi/react";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { State, WagmiProvider } from "wagmi";
import { web3_config, projectId } from "./config";

// Setup queryClient
const queryClient = new QueryClient();

if (!projectId) throw new Error("Project ID is not defined");

// Create modal
createWeb3Modal({
  wagmiConfig: web3_config,
  projectId,
  enableAnalytics: true,
});

export default function AppKitProvider({
  children,
  initialState,
}: {
  children: ReactNode;
  initialState?: State;
}) {
  return (
    <WagmiProvider config={web3_config} initialState={initialState} >
      <QueryClientProvider  client={queryClient}>{children}</QueryClientProvider>
    </WagmiProvider>
  );
}
