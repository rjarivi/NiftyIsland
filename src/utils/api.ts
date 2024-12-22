import axios from 'axios';

interface CoinGeckoResponse {
  'island-token': {
    usd: number;
  };
}

export async function fetchIslandPrice(): Promise<number> {
  try {
    const response = await axios.get<CoinGeckoResponse>(
      'https://api.coingecko.com/api/v3/simple/price',
      {
        params: {
          ids: 'island-token',
          vs_currencies: 'usd'
        },
        timeout: 5000
      }
    );

    if (!response.data || !response.data['island-token']) {
      console.warn('Invalid response format from CoinGecko API');
      return 0;
    }

    return response.data['island-token'].usd;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.warn('Failed to fetch ISLAND price:', error.message);
    } else {
      console.warn('Unexpected error while fetching ISLAND price');
    }
    return 0;
  }
}