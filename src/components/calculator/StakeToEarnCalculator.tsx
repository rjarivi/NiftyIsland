import React, { useState, useEffect } from 'react';
import { Coins } from 'lucide-react';
import { fetchIslandPrice } from '../../utils/api';

const STAKING_TIERS = [
  { amount: 150, benefit: 'Free Gacha Spin' },
  { amount: 1000, benefit: 'Bloom Reward' },
  { amount: 7500, benefit: 'Small Bloom Boost (1.2x for 60min)' },
  { amount: 15000, benefit: 'Medium Bloom Boost (1.5x for 30min)' },
  { amount: 30000, benefit: 'Large Bloom Boost (2.0x for 15min)' },
];

const ISLAND_UPGRADES = [
  { stake: 0, blooms: 2000, placeables: 10, size: '62R 62H', weight: 10000, games: 2 },
  { stake: 300, blooms: 4000, placeables: 20, size: '74R 74H', weight: 20000, games: 6 },
  { stake: 1000, blooms: 6000, placeables: 30, size: '88R 88H', weight: 30000, games: 10 },
  { stake: 5000, blooms: 8000, placeables: 50, size: '140R 140H', weight: 50000, games: 20 },
];

export default function StakeToEarnCalculator() {
  const [islandPrice, setIslandPrice] = useState<number>(0);
  const [manualPrice, setManualPrice] = useState<string>('');
  const [stakingAmount, setStakingAmount] = useState<number>(0);

  useEffect(() => {
    fetchIslandPrice().then(price => setIslandPrice(price));
  }, []);

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setManualPrice(e.target.value);
    const price = parseFloat(e.target.value);
    if (!isNaN(price)) {
      setIslandPrice(price);
    }
  };

  const getUnlockedBenefits = () => {
    return STAKING_TIERS.filter(tier => stakingAmount >= tier.amount);
  };

  const getCurrentUpgradeTier = () => {
    return ISLAND_UPGRADES.reduce((prev, current) => {
      if (stakingAmount >= current.stake) return current;
      return prev;
    });
  };

  return (
    <div className="bg-[#191B23] p-6 rounded-lg shadow-xl">
      <div className="flex items-center gap-2 mb-6">
        <Coins className="w-6 h-6 text-green-400" />
        <h2 className="text-2xl font-bold text-white">Stake to Earn Calculator</h2>
      </div>

      <div className="space-y-6">
        <div className="bg-[#20232C] p-4 rounded-lg">
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Staking Amount
          </label>
          <input
            type="number"
            value={stakingAmount}
            onChange={(e) => setStakingAmount(Number(e.target.value))}
            className="bg-[#191B23] text-white px-3 py-2 rounded-md w-full"
          />
        </div>

        <div className="bg-[#20232C] p-4 rounded-lg">
          <h3 className="text-lg font-semibold text-white mb-4">Unlocked Benefits</h3>
          <div className="space-y-2">
            {getUnlockedBenefits().map((tier, index) => (
              <div key={index} className="flex items-center gap-2 text-green-400">
                <span>✓</span>
                <span>{tier.benefit}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-[#20232C] p-4 rounded-lg">
          <h3 className="text-lg font-semibold text-white mb-4">Island Upgrades</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <p className="text-gray-300">Bloom Cost: {getCurrentUpgradeTier().blooms}</p>
              <p className="text-gray-300">Placeable Blooms: {getCurrentUpgradeTier().placeables}</p>
              <p className="text-gray-300">Island Size: {getCurrentUpgradeTier().size}</p>
            </div>
            <div className="space-y-2">
              <p className="text-gray-300">Build Weight: {getCurrentUpgradeTier().weight}</p>
              <p className="text-gray-300">Number of Games: {getCurrentUpgradeTier().games}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}