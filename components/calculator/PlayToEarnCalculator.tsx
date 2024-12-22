import React, { useState, useEffect } from 'react';
import { Calculator, DollarSign } from 'lucide-react';
import { PlayIntensity } from '../../types/calculator';
import { fetchIslandPrice } from '../../utils/api';
import IntensitySelector from './IntensitySelector';
import PalmSelector from './PalmSelector';
import ResultsTable from './ResultsTable';

const PLAY_INTENSITIES: PlayIntensity[] = [
  { name: 'Casual', bloomsPerDay: 1500, bloomsPerCycle: 15000 },
  { name: 'Medium', bloomsPerDay: 3000, bloomsPerCycle: 30000 },
  { name: 'High', bloomsPerDay: 6000, bloomsPerCycle: 60000 },
  { name: 'Super User', bloomsPerDay: 14000, bloomsPerCycle: 140000 },
];

export default function PlayToEarnCalculator() {
  const [islandPrice, setIslandPrice] = useState<number>(0);
  const [manualPrice, setManualPrice] = useState<string>('');
  const [selectedIntensity, setSelectedIntensity] = useState<PlayIntensity>(PLAY_INTENSITIES[0]);
  const [stakingAmount, setStakingAmount] = useState<number>(0);
  const [compoundRate, setCompoundRate] = useState<number>(100);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const loadPrice = async () => {
      try {
        const price = await fetchIslandPrice();
        setIslandPrice(price);
      } finally {
        setIsLoading(false);
      }
    };
    loadPrice();
  }, []);

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setManualPrice(value);
    const price = parseFloat(value);
    if (!isNaN(price)) {
      setIslandPrice(price);
    }
  };

  return (
    <div className="bg-[#191B23] p-6 rounded-lg shadow-xl">
      <div className="flex items-center gap-2 mb-6">
        <Calculator className="w-6 h-6 text-blue-400" />
        <h2 className="text-2xl font-bold text-white">Play to Earn Calculator</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-6">
          <div className="bg-[#20232C] p-4 rounded-lg">
            <label className="block text-sm font-medium text-gray-300 mb-2">
              $ISLAND Price (USD)
            </label>
            <div className="flex items-center gap-2">
              <DollarSign className="w-5 h-5 text-gray-400" />
              <input
                type="number"
                value={manualPrice || (isLoading ? '' : islandPrice)}
                onChange={handlePriceChange}
                placeholder={isLoading ? 'Loading...' : 'Enter price'}
                className="bg-[#191B23] text-white px-3 py-2 rounded-md w-full"
                disabled={isLoading}
              />
            </div>
          </div>

          <IntensitySelector
            intensities={PLAY_INTENSITIES}
            selected={selectedIntensity}
            onSelect={setSelectedIntensity}
          />

          <div className="bg-[#20232C] p-4 rounded-lg space-y-4">
            <h3 className="text-lg font-semibold text-white">Staking</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Initial Stake
                </label>
                <input
                  type="number"
                  value={stakingAmount}
                  onChange={(e) => setStakingAmount(Number(e.target.value))}
                  className="bg-[#191B23] text-white px-3 py-2 rounded-md w-full"
                  min="0"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Compound Rate (%)
                </label>
                <input
                  type="number"
                  value={compoundRate}
                  onChange={(e) => setCompoundRate(Number(e.target.value))}
                  className="bg-[#191B23] text-white px-3 py-2 rounded-md w-full"
                  min="0"
                  max="100"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <PalmSelector />
          <ResultsTable
            intensity={selectedIntensity}
            stakingAmount={stakingAmount}
            islandPrice={islandPrice}
          />
        </div>
      </div>

      <div className="text-sm text-gray-400 mt-6">
        <p>This calculator is for approximation purposes only. Some error due to the exact time of staking 
           and fluctuation of token price should be expected. The P2E system earning rate and structure 
           may change over time.</p>
      </div>
    </div>
  );
}