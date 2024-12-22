import React, { useState } from 'react';
import { PLAY_INTENSITIES, PALM_TIERS } from '../constants';
import { ChevronDown, Palmtree } from 'lucide-react';

interface Props {
  islandPrice: number;
}

export function PlayToEarnCalculator({ islandPrice }: Props) {
  const [selectedIntensity, setSelectedIntensity] = useState(PLAY_INTENSITIES[0]);
  const [selectedPalm, setSelectedPalm] = useState('none');
  const [palmCount, setPalmCount] = useState(1);
  const [stakeAmount, setStakeAmount] = useState(0);
  const [compoundRate, setCompoundRate] = useState(100);

  const calculateEarnings = () => {
    const palmCap = PALM_TIERS[selectedPalm] * palmCount;
    const baseRate = 0.001; // Base conversion rate
    const earnRate = baseRate * (1 + (stakeAmount / 1000));
    
    const dailyBlooms = selectedIntensity.bloomsPerDay;
    const cycleBlooms = selectedIntensity.bloomsPerCycle;
    const yearlyBlooms = cycleBlooms * 36.5; // 365 days = 36.5 cycles
    
    const preCapDaily = dailyBlooms * earnRate;
    const preCapCycle = cycleBlooms * earnRate;
    const preCapYearly = yearlyBlooms * earnRate;
    
    const actualDaily = Math.min(preCapDaily, palmCap / 10);
    const actualCycle = Math.min(preCapCycle, palmCap);
    const actualYearly = actualCycle * 36.5; // 365 days = 36.5 cycles
    
    return {
      daily: {
        preCap: preCapDaily,
        actual: actualDaily,
        usd: actualDaily * islandPrice
      },
      cycle: {
        preCap: preCapCycle,
        actual: actualCycle,
        usd: actualCycle * islandPrice
      },
      yearly: {
        preCap: preCapYearly,
        actual: actualYearly,
        usd: actualYearly * islandPrice
      }
    };
  };

  const earnings = calculateEarnings();

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Play Intensity</h3>
          <div className="relative">
            <select
              value={selectedIntensity.name}
              onChange={(e) => setSelectedIntensity(
                PLAY_INTENSITIES.find(i => i.name === e.target.value) || PLAY_INTENSITIES[0]
              )}
              className="w-full p-3 bg-white border rounded-lg appearance-none pr-10"
            >
              {PLAY_INTENSITIES.map((intensity) => (
                <option key={intensity.name} value={intensity.name}>
                  {intensity.name} - {intensity.bloomsPerDay} Blooms/Day
                </option>
              ))}
            </select>
            <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Palm NFTs</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="relative">
              <select
                value={selectedPalm}
                onChange={(e) => setSelectedPalm(e.target.value)}
                className="w-full p-3 bg-white border rounded-lg appearance-none pr-10"
              >
                {Object.entries(PALM_TIERS).map(([name, cap]) => (
                  <option key={name} value={name}>
                    {name.charAt(0).toUpperCase() + name.slice(1)} ({cap})
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
            </div>
            <input
              type="number"
              value={palmCount}
              onChange={(e) => setPalmCount(Math.max(1, parseInt(e.target.value) || 1))}
              className="p-3 border rounded-lg"
              min="1"
              placeholder="Count"
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Staking</h3>
          <div className="grid grid-cols-2 gap-4">
            <input
              type="number"
              value={stakeAmount}
              onChange={(e) => setStakeAmount(Math.max(0, parseInt(e.target.value) || 0))}
              className="p-3 border rounded-lg"
              min="0"
              placeholder="Initial Stake"
            />
            <input
              type="number"
              value={compoundRate}
              onChange={(e) => setCompoundRate(Math.min(100, Math.max(0, parseInt(e.target.value) || 0)))}
              className="p-3 border rounded-lg"
              min="0"
              max="100"
              placeholder="Compound %"
            />
          </div>
        </div>
      </div>

      <div className="mt-8">
        <h3 className="text-xl font-semibold mb-4">Earnings Projection</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Period</th>
                <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Pre-Cap ISLAND</th>
                <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ISLAND</th>
                <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">USD</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              <tr>
                <td className="px-6 py-4 whitespace-nowrap">Daily</td>
                <td className="px-6 py-4 whitespace-nowrap">{earnings.daily.preCap.toFixed(2)}</td>
                <td className="px-6 py-4 whitespace-nowrap">{earnings.daily.actual.toFixed(2)}</td>
                <td className="px-6 py-4 whitespace-nowrap">${earnings.daily.usd.toFixed(2)}</td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap">Per Cycle (10 days)</td>
                <td className="px-6 py-4 whitespace-nowrap">{earnings.cycle.preCap.toFixed(2)}</td>
                <td className="px-6 py-4 whitespace-nowrap">{earnings.cycle.actual.toFixed(2)}</td>
                <td className="px-6 py-4 whitespace-nowrap">${earnings.cycle.usd.toFixed(2)}</td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap">Yearly (36.5 cycles)</td>
                <td className="px-6 py-4 whitespace-nowrap">{earnings.yearly.preCap.toFixed(2)}</td>
                <td className="px-6 py-4 whitespace-nowrap">{earnings.yearly.actual.toFixed(2)}</td>
                <td className="px-6 py-4 whitespace-nowrap">${earnings.yearly.usd.toFixed(2)}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}