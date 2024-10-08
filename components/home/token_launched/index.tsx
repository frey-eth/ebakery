"use client";

import { Address } from "viem";
import { useReadContract } from "wagmi";
import abi from "@/contract/bakery_abi.json";
import { useEffect, useState } from "react";
import { getTokenInfo } from "@/services/getTokenInfo";
import { TokenInfo } from "@/types/token";

const TokenLaunched = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [listTokenInfo, setListTokenInfo] = useState<TokenInfo[]>([]);
  const [isFetching, setIsFetching] = useState(false);
  const tokensPerPage = 6;

  const { data: listAddress, isLoading } = useReadContract({
    abi,
    address: "0x1d47861f94fa61061ce2025d51d1ae4c8e00775b" as Address,
    functionName: "allTokens",
    args: [],
  }) as any;

  useEffect(() => {
    if (listAddress && listAddress.length > 0) {
      getListTokenInfo();
    }
  }, [listAddress, currentPage]);

  const getListTokenInfo = async () => {
    if (!listAddress || isLoading) return;

    const startIndex = (currentPage - 1) * tokensPerPage;
    const endIndex = startIndex + tokensPerPage;
    
    const paginatedTokens = listAddress.reverse().slice(startIndex, endIndex);

    setIsFetching(true);
    const res = await getTokenInfo(paginatedTokens);
    setListTokenInfo(res);
    setIsFetching(false);
  };

  const totalPages = listAddress
    ? Math.ceil(listAddress.length / tokensPerPage)
    : 1;

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  return (
    <div className="p-6 text-white h-full flex flex-col">
      <h1 className="animate-color-change font-acarde text-center text-3xl mb-6">
        Token Launched
      </h1>

      {/* Display token info in a 2-column layout */}
      {!isFetching ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {listTokenInfo.map((token: TokenInfo, index) => (
            <a
              target="_blank"
              href={`https://dexscreener.com/ethereum/${token.address}`}
              key={index}
              className="bg-black/60 p-4 rounded-lg shadow-md text-ellipsis overflow-hidden font-pixel tracking-wider"
            >
              <div
                className="flex flex-col"
                style={{ color: getRandomColor() }}
              >
                <h2 className="text-xl font-bold">{token.name}</h2>
                <p className="text-gray-400 font-mono font-bold">
                  ${token.symbol}
                </p>
              </div>
              <p className="text-gray-300">{token.address}</p>
              <p className="mt-2">
                Total Supply: {token.total_supply_formatted}
              </p>
              
            </a>
          ))}
        </div>
      ) : (
        <p className="text-center text-2xl text-white font-pixel font-bold flex-1 h-full">
          Loading...
        </p>
      )}

      {/* Pagination controls */}
      {totalPages > 0 && (
        <div className="flex flex-row items-center justify-center gap-4 mt-6">
          <button
            onClick={handlePreviousPage}
            disabled={currentPage === 1}
            className="bg-cyan-500 text-white px-4 py-2 rounded-lg hover:bg-cyan-600 disabled:bg-gray-600"
          >
            Previous
          </button>
          <span className="text-lg">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
            className="bg-cyan-500 text-white px-4 py-2 rounded-lg hover:bg-cyan-600 disabled:bg-gray-600"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default TokenLaunched;

const getRandomColor = () => {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};
