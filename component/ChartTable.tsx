import {Dimensions, View} from 'react-native';
import {LineChart} from 'react-native-chart-kit';
import {color} from './utilis/color';

interface ChartTableProps {
  labels: string[];
  dataset: number[];
}

const formatDateLabel = (dateTime: string) => {
  const [date, time] = dateTime.split(' '); // Split into date and time
  const [hour, minute] = time.split(':'); // Split time into hour and minute
  return `${minute}`; // Return formatted time as "HH:MM"
};

const ChartTable = ({labels, dataset}: ChartTableProps) => {
  const recentLabels = labels.slice(0, 8).map(formatDateLabel);
  const recentDataset = dataset.slice(0, 8);

  return (
    <View>
      <LineChart
        data={{
          labels: recentLabels,
          datasets: [
            {
              data: recentDataset,
            },
          ],
        }}
        width={Dimensions.get('window').width - 40} 
        height={350}
        yAxisLabel="$"
      xAxisLabel='min'
        yAxisInterval={1}
        chartConfig={{
          backgroundColor: color.contrast, 
          backgroundGradientFrom: color.primary, 
          backgroundGradientTo: color.inactiveContrast,
          decimalPlaces: 2, 
          color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          style: {
            borderRadius: 16,
          },
          propsForDots: {
            r: '6',
            strokeWidth: '2', 
            stroke: '#ffa726', 
          },
        }}
        bezier
        style={{
          marginVertical: 8, 
        }}
      />
    </View>
  );
};

export default ChartTable;
