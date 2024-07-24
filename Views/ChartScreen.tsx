import React, {useCallback, useEffect, useState} from 'react';
import {View, Text, StyleSheet, Image, ScrollView} from 'react-native';
import {RouteProp, useRoute} from '@react-navigation/native';
import {SafeAreaView} from 'react-native-safe-area-context';
import ChartTable from '../component/ChartTable';
import DropDownPicker from 'react-native-dropdown-picker';
import {getStockData} from '../component/utilis';
import {color} from '../component/utilis/color';

// Define interfaces for the API response
interface WeeklyAdjustedEntry {
  '1. open': string;
  '2. high': string;
  '3. low': string;
  '4. close': string;
  '5. adjusted close': string;
  '6. volume': string;
  '7. dividend amount': string;
}

interface WeeklyAdjustedTimeSeries {
  [date: string]: WeeklyAdjustedEntry;
}

interface MetaData {
  '1. Information': string;
  '2. Symbol': string;
  '3. Last Refreshed': string;
  '4. Time Zone': string;
}

interface StockData {
  'Meta Data': MetaData;
  'Time Series (5min)': WeeklyAdjustedTimeSeries;
}

type ChartScreenRouteParams = {
  ChartScreen: {
    symbol: string;
  };
};

type DatasetType = 'open' | 'high' | 'low' | 'close';
type SymbolSetValue = 'IBM' | 'MSFT';

const ChartScreen = () => {
  const route = useRoute<RouteProp<ChartScreenRouteParams, 'ChartScreen'>>();
  const initialSymbol = route.params.symbol;

  const [data, setData] = useState<WeeklyAdjustedTimeSeries | null>(null); 
  const [metaData, setMetaData] = useState<MetaData | null>(null); 
  const [loading, setLoading] = useState<boolean>(true); 
  const [error, setError] = useState<string | null>(null); 

  const [value, setValue] = useState(initialSymbol); 
  const [datasetType, setDatasetType] = useState<DatasetType>('close'); 

  const fetchStockData = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const fetchedData: StockData = await getStockData(value);
      setData(fetchedData['Time Series (5min)']);
      setMetaData(fetchedData['Meta Data']);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [value]);

  useEffect(() => {
    fetchStockData();
  }, [value]);

  const [openCompany, setOpenCompany] = useState(false);
  const [itemsCompany, setItemsCompany] = useState([
    {label: 'IBM', value: 'IBM'},
    {label: 'MSFT', value: 'MSFT'},
  ]);

  const [openDataset, setOpenDataset] = useState(false);
  const [itemsDataset, setItemsDataset] = useState([
    {label: 'Open', value: 'open'},
    {label: 'High', value: 'high'},
    {label: 'Low', value: 'low'},
    {label: 'Close', value: 'close'},
  ]);

  const sortedData = data
    ? Object.entries(data)
        .sort(
          ([dateA], [dateB]) =>
            new Date(dateB).getTime() - new Date(dateA).getTime(),
        )
        .map(([date, values]) => ({
          date,
          open: parseFloat(values['1. open']),
          high: parseFloat(values['2. high']),
          low: parseFloat(values['3. low']),
          close: parseFloat(values['4. close']),
        }))
    : [];

  const labels = sortedData.map(item => item.date);
  const dataset = sortedData.map(item => item[datasetType]);

  const percentageChange =
    sortedData.length > 1
      ? (
          ((sortedData[0].close - sortedData[sortedData.length - 1].close) /
            sortedData[sortedData.length - 1].close) *
          100
        ).toFixed(2)
      : '0';

  const changeColor = parseFloat(percentageChange) >= 0 ? 'green' : 'red';
  const symbolImageMap: Record<string, string> = {
    IBM: 'https://logo.clearbit.com/ibm.com',
    MSFT: 'https://logo.clearbit.com/msft.com',
  };

  const imageUrl = symbolImageMap[value];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.scrollView}>
        <View style={styles.header}>
          <Image source={{uri: imageUrl}} style={styles.image} />
          <Text style={styles.symbolText}>Company: {value}</Text>
        </View>

        {loading && <Text style={styles.loadingText}>Loading data...</Text>}
        {error && <Text style={styles.errorText}>{error}</Text>}
        {!loading && !error && (
          <>
            <Text style={styles.infoText}>
              Last Refreshed: {metaData?.['3. Last Refreshed']}
            </Text>
            <Text style={styles.infoText}>
              Time Zone: {metaData?.['4. Time Zone']}
            </Text>

            <Text style={[styles.changeText, {color: changeColor}]}>
              {parseFloat(percentageChange) >= 0 ? '+' : ''}
              {percentageChange}%
            </Text>
          </>
        )}

        <View style={styles.dropdownsContainer}>
          <DropDownPicker
            open={openCompany}
            value={value}
            items={itemsCompany}
            setOpen={setOpenCompany}
            setValue={setValue}
            setItems={setItemsCompany}
            placeholder={'Select a company'}
            style={styles.dropdown}
            containerStyle={styles.dropdownContainer}
          />

          <DropDownPicker
            open={openDataset}
            value={datasetType}
            items={itemsDataset}
            setOpen={setOpenDataset}
            setValue={setDatasetType}
            setItems={setItemsDataset}
            placeholder={'Select a data type'}
            style={styles.dropdown}
            containerStyle={styles.dropdownContainer}
            dropDownDirection="DEFAULT"
          />
        </View>
        {/* Chart Table */}
        {!loading && !error && <ChartTable labels={labels} dataset={dataset} />}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.contrast,
  },
  scrollView: {
    flexGrow: 1,
    padding: 20,
  },
  header: {
    marginBottom: 20,
    alignItems: 'center',
  },
  dropdownsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 10,
    zIndex: 1,
  },
  dropdownContainer: {
    flex: 1,
    height: 40,
    marginHorizontal: 5,
  },
  dropdown: {
    backgroundColor: '#fff',
    borderColor: '#ddd',
    borderRadius: 4,
  },
  symbolText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  infoText: {
    fontSize: 16,
    marginBottom: 5,
  },
  changeText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  loadingText: {
    fontSize: 16,
    color: 'blue',
    marginBottom: 5,
  },
  errorText: {
    fontSize: 16,
    color: 'red',
    marginBottom: 5,
  },
  image: {
    width: 100,
    height: 100,
    marginBottom: 10,
  },
});

export default ChartScreen;
