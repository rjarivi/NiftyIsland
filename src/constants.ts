import { PlayIntensity, Palm, StakingTier, StakingBoost } from './types';

export const PLAY_INTENSITIES: PlayIntensity[] = [
  { name: 'Casual', bloomsPerDay: 1500, bloomsPerCycle: 15000 },
  { name: 'Medium', bloomsPerDay: 3000, bloomsPerCycle: 30000 },
  { name: 'High', bloomsPerDay: 6000, bloomsPerCycle: 60000 },
  { name: 'Super User', bloomsPerDay: 14000, bloomsPerCycle: 140000 },
];

export const PALM_TIERS: Record<string, number> = {
  none: 100,
  iron: 300,
  bronze: 500,
  silver: 900,
  gold: 1700,
  neon: 3300,
  ultra: 6400,
};

export const PALM_COUNTS = {
  iron: 973,
  bronze: 271,
  silver: 143,
  gold: 106,
  neon: 9,
  ultra: 4,
};

export const STAKING_BOOSTS: StakingBoost[] = [
  { name: 'Free Gacha Spin', requiredStake: 150, description: 'Unlocked at 150 ISLAND' },
  { name: 'Bloom Reward', requiredStake: 1000, description: 'Unlocked at 1000 ISLAND' },
  { name: 'Small Bloom Boost', requiredStake: 7500, description: '1.2x for 60min - Unlocked at 7500 ISLAND' },
  { name: 'Medium Bloom Boost', requiredStake: 15000, description: '1.5x for 30min - Unlocked at 15000 ISLAND' },
  { name: 'Large Bloom Boost', requiredStake: 30000, description: '2.0x for 15min - Unlocked at 30000 ISLAND' },
];

export const STAKING_TIERS: StakingTier[] = [
  {
    requiredStake: 0,
    bloomCost: 0,
    placeableBlooms: 10,
    islandSize: '62R 62H',
    buildWeight: 10000,
    numberOfGames: 2,
    customization: 'Ocean',
  },
  {
    requiredStake: 300,
    bloomCost: 2000,
    placeableBlooms: 20,
    islandSize: '74R 74H',
    buildWeight: 20000,
    numberOfGames: 6,
    customization: 'Sky',
  },
  {
    requiredStake: 1000,
    bloomCost: 4000,
    placeableBlooms: 30,
    islandSize: '88R 88H',
    buildWeight: 30000,
    numberOfGames: 10,
    customization: 'Weather',
  },
  {
    requiredStake: 5000,
    bloomCost: 6000,
    placeableBlooms: 40,
    islandSize: '110R 110H',
    buildWeight: 40000,
    numberOfGames: 15,
    customization: 'Island Skin',
  },
  {
    requiredStake: 8000,
    bloomCost: 8000,
    placeableBlooms: 50,
    islandSize: '140R 140H',
    buildWeight: 50000,
    numberOfGames: 20,
    customization: 'Soundtrack',
  },
];