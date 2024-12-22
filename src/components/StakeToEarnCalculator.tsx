import React, { useState } from 'react';
import { STAKING_BOOSTS, STAKING_TIERS } from '../constants';
import { Lock, Unlock } from 'lucide-react';

interface Props {
  islandPrice: number;
}

export function StakeToEarnCalculator({ islandPrice }: Props) {
  const [stakedAmount, setStakedAmount] = useState(0);

  const getUnlockedBoosts = () => {
    return STAKING_BOOSTS.filter(boost => stakedAmount >= boost.requiredStake);
  };

  const getCurrentTier = () => {
    return STAKING_TIERS.reduce((prev, curr) => {
      if (stakedAmount >= curr.requiredStake) {
        return curr;
      }
      return prev;
    });
  };

  const unlockedBoosts = getUnlockedBoosts();
  const currentTier = getCurrentTier();

  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Staking Amount</h3>
        <input
          type="number"
          value={stakedAmount}
          onChange={(e) => setStakedAmount(Math.max(0, Number(e.target.value)))}
          className="w-full p-3 border rounded-lg"
          min="0"
          placeholder="Enter ISLAND amount to stake"
        />
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Unlocked Boosts</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {STAKING_BOOSTS.map((boost) => (
            <div
              key={boost.name}
              className={`p-4 rounded-lg border ${
                stakedAmount >= boost.requiredStake
                  ? 'bg-green-50 border-green-200'
                  : 'bg-gray-50 border-gray-200'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="font-medium">{boost.name}</span>
                {stakedAmount >= boost.requiredStake ? (
                  <Unlock className="w-5 h-5 text-green-500" />
                ) : (
                  <Lock className="w-5 h-5 text-gray-400" />
                )}
              </div>
              <p className="text-sm text-gray-600">{boost.description}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Island Upgrades</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Feature</th>
                <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Current Value</th>
                <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Next Tier</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              <tr>
                <td className="px-6 py-4 whitespace-nowrap">Bloom Cost</td>
                <td className="px-6 py-4 whitespace-nowrap">{currentTier.bloomCost}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {STAKING_TIERS.find(tier => tier.requiredStake > stakedAmount)?.bloomCost || 'Max'}
                </td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap">Placeable Blooms</td>
                <td className="px-6 py-4 whitespace-nowrap">{currentTier.placeableBlooms}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {STAKING_TIERS.find(tier => tier.requiredStake > stakedAmount)?.placeableBlooms || 'Max'}
                </td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap">Island Size</td>
                <td className="px-6 py-4 whitespace-nowrap">{currentTier.islandSize}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {STAKING_TIERS.find(tier => tier.requiredStake > stakedAmount)?.islandSize || 'Max'}
                </td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap">Build Weight</td>
                <td className="px-6 py-4 whitespace-nowrap">{currentTier.buildWeight}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {STAKING_TIERS.find(tier => tier.requiredStake > stakedAmount)?.buildWeight || 'Max'}
                </td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap">Number of Games</td>
                <td className="px-6 py-4 whitespace-nowrap">{currentTier.numberOfGames}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {STAKING_TIERS.find(tier => tier.requiredStake > stakedAmount)?.numberOfGames || 'Max'}
                </td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap">Customization</td>
                <td className="px-6 py-4 whitespace-nowrap">{currentTier.customization}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {STAKING_TIERS.find(tier => tier.requiredStake > stakedAmount)?.customization || 'Max'}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}