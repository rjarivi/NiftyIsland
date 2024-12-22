import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

interface PalmTier {
  name: string;
  value: number;
  count: number;
}

const PALM_TIERS: PalmTier[] = [
  { name: 'Iron Palm', value: 100, count: 973 },
  { name: 'Bronze Palm', value: 300, count: 271 },
  { name: 'Silver Palm', value: 500, count: 143 },
  { name: 'Gold Palm', value: 900, count: 106 },
  { name: 'Neon Palm', value: 1700, count: 9 },
  { name: 'Ultra Palm', value: 3300, count: 4 }
];

export default function PalmSelector() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedPalm, setSelectedPalm] = useState<PalmTier>(PALM_TIERS[0]);
  const [palmCount, setPalmCount] = useState<number>(0);

  return (
    <div className="bg-[#20232C] p-4 rounded-lg">
      <h3 className="text-lg font-semibold text-white mb-2">Palm NFTs</h3>
      <p className="text-sm text-gray-400 mb-4">
        Each Palm NFT increases your maximum ISLAND gains per cycle.
      </p>

      <div className="grid grid-cols-2 gap-4">
        <div className="relative">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="w-full flex items-center justify-between p-3 rounded-lg bg-[#191B23] text-white hover:bg-[#20232C] transition-colors"
          >
            <div>
              <div className="font-medium">{selectedPalm.name}</div>
              <div className="text-sm text-gray-400">Value: {selectedPalm.value}</div>
            </div>
            <ChevronDown className={`w-5 h-5 transition-transform ${isOpen ? 'transform rotate-180' : ''}`} />
          </button>

          {isOpen && (
            <div className="absolute z-10 w-full mt-2 bg-[#191B23] rounded-lg shadow-xl">
              {PALM_TIERS.map((palm) => (
                <button
                  key={palm.name}
                  onClick={() => {
                    setSelectedPalm(palm);
                    setIsOpen(false);
                  }}
                  className="w-full text-left p-3 hover:bg-[#20232C] transition-colors first:rounded-t-lg last:rounded-b-lg"
                >
                  <div className="font-medium text-white">{palm.name}</div>
                  <div className="text-sm text-gray-400">
                    <div>Value: {palm.value}</div>
                    <div>Total: {palm.count}</div>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Quantity
          </label>
          <input
            type="number"
            value={palmCount}
            onChange={(e) => setPalmCount(Math.max(0, parseInt(e.target.value) || 0))}
            className="bg-[#191B23] text-white px-3 py-2 rounded-md w-full"
            min="0"
          />
        </div>
      </div>
    </div>
  );
}