import React, { useState } from 'react';
import { Calculator, Coins } from 'lucide-react';
import PlayToEarnCalculator from './components/Calculator/PlayToEarnCalculator';
import StakeToEarnCalculator from './components/Calculator/StakeToEarnCalculator';

function App() {
  const [activeTab, setActiveTab] = useState<'p2e' | 'stake'>('p2e');

  return (
    <div className="min-h-screen bg-[#13141A] text-white">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-center mb-8">Nifty Island Calculator</h1>
        
        <div className="flex justify-center space-x-4 mb-8">
          <button
            onClick={() => setActiveTab('p2e')}
            className={`flex items-center gap-2 px-6 py-3 rounded-lg transition-colors ${
              activeTab === 'p2e'
                ? 'bg-blue-600 text-white'
                : 'bg-[#191B23] text-gray-400 hover:bg-[#20232C]'
            }`}
          >
            <Calculator className="w-5 h-5" />
            Play to Earn
          </button>
          <button
            onClick={() => setActiveTab('stake')}
            className={`flex items-center gap-2 px-6 py-3 rounded-lg transition-colors ${
              activeTab === 'stake'
                ? 'bg-green-600 text-white'
                : 'bg-[#191B23] text-gray-400 hover:bg-[#20232C]'
            }`}
          >
            <Coins className="w-5 h-5" />
            Stake to Earn
          </button>
        </div>

        <div className="max-w-4xl mx-auto">
          {activeTab === 'p2e' ? <PlayToEarnCalculator /> : <StakeToEarnCalculator />}
        </div>
      </div>
    </div>
  );
}

export default App;