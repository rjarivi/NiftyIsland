export interface PlayIntensity {
  name: string;
  bloomsPerDay: number;
  bloomsPerCycle: number;
}

export interface Palm {
  tier: string;
  baseValue: number;
}

export interface StakingTier {
  name: string;
  requiredAmount: number;
  benefits: string[];
}

export interface CalculatorState {
  islandPrice: number;
  playIntensity: PlayIntensity;
  stakingAmount: number;
  compoundRate: number;
  palms: Record<string, number>;
}