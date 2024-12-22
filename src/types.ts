export interface PlayIntensity {
  name: string;
  bloomsPerDay: number;
  bloomsPerCycle: number;
}

export interface Palm {
  name: string;
  cap: number;
  count: number;
}

export interface StakingTier {
  requiredStake: number;
  bloomCost: number;
  placeableBlooms: number;
  islandSize: string;
  buildWeight: number;
  numberOfGames: number;
  customization: string;
}

export interface StakingBoost {
  name: string;
  requiredStake: number;
  description: string;
}