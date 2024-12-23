import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { PlayIntensity } from '../../types/calculator';

interface IntensitySelectorProps {
  intensities: PlayIntensity[];
  selected: PlayIntensity;
  onSelect: (intensity: PlayIntensity) => void;
}

export default function IntensitySelector({ intensities, selected, onSelect }: IntensitySelectorProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="bg-[#20232C] p-4 rounded-lg">
      <h3 className="text-lg font-semibold text-white mb-2">Play Intensity</h3>
      <p className="text-sm text-gray-400 mb-4">Set your desired daily play intensity. More play means more gains!</p>
      
      <div className="relative">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full flex items-center justify-between p-3 rounded-lg bg-[#191B23] text-white hover:bg-[#20232C] transition-colors"
        >
          <div>
            <div className="font-medium">{selected.name}</div>
            <div className="text-sm text-gray-400">
              {selected.bloomsPerDay.toLocaleString()} Blooms/Day
            </div>
          </div>
          <ChevronDown className={`w-5 h-5 transition-transform ${isOpen ? 'transform rotate-180' : ''}`} />
        </button>

        {isOpen && (
          <div className="absolute z-10 w-full mt-2 bg-[#191B23] rounded-lg shadow-xl">
            {intensities.map((intensity) => (
              <button
                key={intensity.name}
                onClick={() => {
                  onSelect(intensity);
                  setIsOpen(false);
                }}
                className="w-full text-left p-3 hover:bg-[#20232C] transition-colors first:rounded-t-lg last:rounded-b-lg"
              >
                <div className="font-medium text-white">{intensity.name}</div>
                <div className="text-sm text-gray-400">
                  <div>Blooms per Day: {intensity.bloomsPerDay.toLocaleString()}</div>
                  <div>Blooms per Cycle: {intensity.bloomsPerCycle.toLocaleString()}</div>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}