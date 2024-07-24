 export type RootStackParamList = {
  HomeScreen: undefined; // No parameters for HomeScreen
  ChartScreen: { symbol: string }; // ChartScreen expects a 'symbol' parameter
};

export type DatasetType = 'open' | 'high' | 'low' | 'close';

interface WeeklyAdjustedEntry {
  "1. open": string;
  "2. high": string;
  "3. low": string;
  "4. close": string;
  "5. adjusted close": string;
  "6. volume": string;
  "7. dividend amount": string;
}

interface WeeklyAdjustedTimeSeries {
  [date: string]: WeeklyAdjustedEntry;
}


interface MetaData {
  "1. Information": string;
  "2. Symbol": string;
  "3. Last Refreshed": string;
  "4. Time Zone": string;
}

interface StockData {
  "Meta Data": MetaData;
  "Weekly Adjusted Time Series": WeeklyAdjustedTimeSeries;
}


