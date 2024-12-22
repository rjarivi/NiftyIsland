import React from 'react';

interface StakingInputProps {
  stakingAmount: number;
  compoundRate: number;
  onStakingChange: (amount: number) => void;
  onCompoundChange: (rate: number) => void;
}

export default function StakingInput({
  stakingAmount,
  compoundRate,
  onStakingChange,
  onCompoundChange,
}: StakingInputProps) {
  return (
    <div className="bg-[#20232C] p-4 rounded-lg">
      <h3 className="text-lg font-semibold text-white mb-4">Staking</h3>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Initial Stake
          </label>
          <input
            type="number"
            value={stakingAmount}
            onChange={(e) => onStakingChange(Number(e.target.value))}
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
            onChange={(e) => onCompoundChange(Number(e.target.value))}
            className="bg-[#191B23] text-white px-3 py-2 rounded-md w-full"
            min="0"
            max="100"
          />
        </div>

        <div className="text-sm text-gray-400">
          <p>Staking ISLAND increases your conversion rate from Blooms to ISLAND. Set your initial staked amount and how much of your ISLAND gains you wish to stake after each cycle.</p>
        </div>
      </div>
    </div>
  );
}