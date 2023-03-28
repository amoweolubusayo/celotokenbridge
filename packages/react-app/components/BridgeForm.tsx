import React, { useState } from "react";
import { ethers } from "ethers";
import { start } from "../../hardhat/scripts/wrapper";

const currencies = [
  { name: "Matic", symbol: "MATIC" },
  { name: "Celo", symbol: "CELO" },
];

const BridgeForm = () => {
  const [amount, setAmount] = useState("");
  const [swapSuccess, setSwapSuccess] = useState(false);
  const [swapError, setSwapError] = useState("");

  const [fromCurrency, setFromCurrency] = useState(currencies[0]);
  const [toCurrency, setToCurrency] = useState(currencies[1]);

  const handleSwap = async () => {
    try {
      try {
        await start(amount);
      } catch (error) {
        console.error(error);
      }
      // Update the UI to show the donation was successful
      setSwapSuccess(true);
    } catch (error) {
      console.log(error);
      setSwapError("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-8 max-w-3xl mx-auto">
      <h2 className="text-3xl font-bold mb-8">Bridge</h2>
      <div className="grid grid-cols-1 gap-6 mb-8 sm:grid-cols-2">
        <div>
          <label htmlFor="fromCurrency" className="text-sm font-medium">
            From
          </label>
          <div className="relative">
            <select
              id="fromCurrency"
              name="fromCurrency"
              className="block w-full mt-1 border-gray-300 focus:border-blue-500 focus:ring-blue-500 rounded-md shadow-sm text-gray-700 text-sm"
              value={fromCurrency.symbol}
              //   onChange={(e) =>
              //     setFromCurrency(
              //       currencies.find((c) => c.symbol === e.target.value)
              //     )
              //   }
            >
              {currencies.map((currency) => (
                <option key={currency.symbol} value={currency.symbol}>
                  {currency.name} ({currency.symbol})
                </option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
              <svg
                className="w-4 h-4 fill-current"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M6.293 6.293a1 1 0 011.414 0L10 8.586l2.293-2.293a1 1 0 011.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
                />
              </svg>
            </div>
          </div>
        </div>
        <div>
          <label htmlFor="toCurrency" className="text-sm font-medium">
            To
          </label>
          <div className="relative">
            <select
              id="toCurrency"
              name="toCurrency"
              className="block w-full mt-1 border-gray-300 focus:border-blue-500 focus:ring-blue-500 rounded-md shadow-sm text-gray-700 text-sm"
              value={toCurrency.symbol}
              //   onChange={(e) =>
              //     setToCurrency(
              //       currencies.find((c) => c.symbol === e.target.value)
              //     )
              //   }
            >
              {currencies.map((currency) => (
                <option key={currency.symbol} value={currency.symbol}>
                  {currency.name} ({currency.symbol})
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
      <div className="mb-8">
        <label htmlFor="amount" className="text-sm font-medium">
          You send
        </label>
        <div className="mt-1 relative rounded-md shadow-sm">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <span className="text-gray-500 sm:text-sm"></span>
          </div>
          <input
            type="text"
            name="amount"
            id="amount"
            className="focus:ring-blue-500 focus:border-blue-500 block w-full pl-7 pr-12 sm:text-sm border-gray-300 rounded-md"
            placeholder="0.00"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
          <div className="absolute inset-y-0 right-0 flex items-center">
            <label htmlFor="currency" className="sr-only">
              Currency
            </label>
            <select
              id="currency"
              name="currency"
              className="focus:ring-blue-500 focus:border-blue-500 h-full py-0 pl-2 pr-7 border-transparent bg-transparent text-gray-500 sm:text-sm rounded-md"
              defaultValue="MATIC"
            >
              <option>MATIC</option>
            </select>
          </div>
        </div>
      </div>

      <div className="mb-8">
        <label htmlFor="amount" className="text-sm font-medium">
          You receive
        </label>
        <div className="mt-1 relative rounded-md shadow-sm">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <span className="text-gray-500 sm:text-sm"></span>
          </div>
          <input
            type="text"
            name="amount"
            id="amount"
            className="focus:ring-blue-500 focus:border-blue-500 block w-full pl-7 pr-12 sm:text-sm border-gray-300 rounded-md"
            placeholder="0.00"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
          <div className="absolute inset-y-0 right-0 flex items-center">
            <label htmlFor="currency" className="sr-only">
              Currency
            </label>
            <select
              id="currency"
              name="currency"
              className="focus:ring-blue-500 focus:border-blue-500 h-full py-0 pl-2 pr-7 border-transparent bg-transparent text-gray-500 sm:text-sm rounded-md"
              defaultValue="CELO"
            >
              <option>CELO</option>
            </select>
          </div>
        </div>
      </div>

      <button
        type="button"
        className="w-full py-3 px-6 rounded-md text-base font-medium text-white bg-gradient-to-br from-blue-500 to-purple-500 hover:bg-gradient-to-br hover:from-blue-600 hover:to-purple-600"
        onClick={handleSwap}
      >
        Proceed
      </button>
      {swapSuccess && (
        <p className="text-green-500 mt-4 text-sm">Bridging successful!</p>
      )}
      {swapError && <p className="text-red-500 mt-4 text-sm">{swapError}</p>}
    </div>
  );
};

export default BridgeForm;
