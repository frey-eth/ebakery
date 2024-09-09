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
    address: "0xb4fb5cc908e0cd59bc16a55960a8a116e21dc646" as Address,
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

    const paginatedTokens = listAddress.slice(startIndex, endIndex);

    setIsFetching(true);
    const res = await getTokenInfo(paginatedTokens);
    if (res) {
      setListTokenInfo(res);
    }
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
    <div className="p-6  text-white">
      <h1 className="animate-color-change font-acarde text-center text-3xl mb-6">
        Token Launched
      </h1>

      {/* Display token info in a 2-column layout */}
      {!isFetching ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {listTokenInfo.map((token: TokenInfo, index) => (
            <div key={index} className="bg-gray-800 p-4 rounded-lg shadow-md text-ellipsis overflow-hidden">
              <h2 className="text-xl font-semibold">{token.name}</h2>
              <p className="text-gray-400">{token.symbol}</p>
              <p className="text-gray-300">{token.address}</p>
              <p className="mt-2">
                Total Supply: {token.total_supply_formatted}
              </p>
              <p>
                Created At: {new Date(token.created_at).toLocaleDateString()}
              </p>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-2xl text-white font-pixel font-bold">Loading...</p>
      )}

      {/* Pagination controls */}
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
    </div>
  );
};

export default TokenLaunched;
