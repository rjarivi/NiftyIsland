import React, { useState } from 'react';
import { Calculator, DollarSign } from 'lucide-react';
import { PlayToEarnCalculator } from './PlayToEarnCalculator';
import { StakeToEarnCalculator } from './StakeToEarnCalculator';

export function NiftyCalculator() {
  const [activeTab, setActiveTab] = useState<'p2e' | 'stake'>('p2e');
  const [islandPrice, setIslandPrice] = useState<number>(0);

  return (
    <div className="min-h-screen bg-[#0F1014] px-4 py-8">
      <div className="container mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#4fffbc] via-[#cf68fb] to-[#ffe500] mb-2">
            Nifty Island Calculator
          </h1>
          <p className="text-gray-400">Estimate your earnings and benefits</p>
        </div>

        <div className="flex justify-center space-x-4 mb-8">
          <button
            onClick={() => setActiveTab('p2e')}
            className={`gradient-button ${
              activeTab !== 'p2e' && 'opacity-80 hover:opacity-100'
            }`}
          >
            <Calculator className="w-5 h-5 mr-2 inline-block" />
            Play to Earn
          </button>
          <button
            onClick={() => setActiveTab('stake')}
            className={`gradient-button ${
              activeTab !== 'stake' && 'opacity-80 hover:opacity-100'
            }`}
          >
            <DollarSign className="w-5 h-5 mr-2 inline-block" />
            Stake to Earn
          </button>
        </div>

        <div className="card p-6 mb-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center">
              <DollarSign className="w-6 h-6 text-[#4fffbc] mr-2" />
              <h2 className="text-xl font-semibold">ISLAND Token Price</h2>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-gray-400">Current Price: ${islandPrice.toFixed(4)}</span>
              <input
                type="number"
                value={islandPrice}
                onChange={(e) => setIslandPrice(Number(e.target.value))}
                className="input"
                placeholder="Enter custom price"
                step="0.0001"
                min="0"
              />
            </div>
          </div>

          {activeTab === 'p2e' ? (
            <PlayToEarnCalculator islandPrice={islandPrice} />
          ) : (
            <StakeToEarnCalculator islandPrice={islandPrice} />
          )}
        </div>

        <div className="card p-4 text-sm text-gray-400">
          <h3 className="font-semibold mb-2">Disclaimers:</h3>
          <ul className="list-disc list-inside space-y-1">
            <li>This calculator is for approximation purposes only and some error due to the exact time of staking and fluctuation of token price should be expected.</li>
            <li>The P2E system earning rate and structure may change over time, so this version of the calculator may be outdated. The most recent info will be available on the Rewards Dashboard.</li>
          </ul>
        </div>
      </div>
    </div>
  );
}