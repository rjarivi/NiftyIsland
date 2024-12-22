import React from 'react';
import { PlayIntensity } from '../../types/calculator';

interface ResultsTableProps {
  intensity: PlayIntensity;
  stakingAmount: number;
  islandPrice: number;
}

export default function ResultsTable({ intensity, stakingAmount, islandPrice }: ResultsTableProps) {
  const calculateGains = () => {
    const dailyGains = intensity.bloomsPerDay * (stakingAmount > 0 ? 1.2 : 1);
    const cycleGains = intensity.bloomsPerCycle * (stakingAmount > 0 ? 1.2 : 1);
    const yearlyGains = cycleGains * (365 / 10); // 10-day cycles in a year

    return {
      daily: dailyGains,
      cycle: cycleGains,
      yearly: yearlyGains,
      dailyUSD: dailyGains * islandPrice,
      cycleUSD: cycleGains * islandPrice,
      yearlyUSD: yearlyGains * islandPrice,
    };
  };

  const gains = calculateGains();

  return (
    <div className="bg-[#20232C] p-4 rounded-lg overflow-x-auto">
      <h3 className="text-lg font-semibold text-white mb-4">Earnings Projection</h3>
      
      <table className="w-full text-left">
        <thead>
          <tr className="text-gray-400">
            <th className="py-2 px-4">Period</th>
            <th className="py-2 px-4">ISLAND</th>
            <th className="py-2 px-4">USD</th>
          </tr>
        </thead>
        <tbody>
          <tr className="border-t border-gray-700">
            <td className="py-3 px-4">Daily</td>
            <td className="py-3 px-4">{gains.daily.toFixed(2)}</td>
            <td className="py-3 px-4">${gains.dailyUSD.toFixed(2)}</td>
          </tr>
          <tr className="border-t border-gray-700">
            <td className="py-3 px-4">Per Cycle (10 days)</td>
            <td className="py-3 px-4">{gains.cycle.toFixed(2)}</td>
            <td className="py-3 px-4">${gains.cycleUSD.toFixed(2)}</td>
          </tr>
          <tr className="border-t border-gray-700">
            <td className="py-3 px-4">Yearly</td>
            <td className="py-3 px-4">{gains.yearly.toFixed(2)}</td>
            <td className="py-3 px-4">${gains.yearlyUSD.toFixed(2)}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}