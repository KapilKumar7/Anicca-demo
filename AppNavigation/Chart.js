import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {LineChart} from 'react-native-chart-kit';
import {Dimensions} from 'react-native';

const screenWidth = Dimensions.get('window').width;

const Chart = ({logs, dataToShow}) => {
  // console.log(' in chart are ' + logs.length + ' ' + dataToShow);
  if (!logs || logs.length === 0) {
    return (
      <View style={styles.container}>
        <Text>No data available</Text>
      </View>
    );
  }

  const awarenessData = logs.map(log => log[dataToShow]);
  const labels = logs.map((log, index) => log.date.getDate());

  let filteredLabels = labels;
  if (logs.length > 20) {
    // Filter labels to show every 2nd label
    filteredLabels = labels.map((label, index) =>
      index % 2 === 0 ? label : '',
    );
  }

  const chartData = {
    labels: filteredLabels,
    datasets: [
      {
        data: awarenessData,
      },
    ],
  };

  return (
    <View style={styles.container}>
      <Text>Chart for {dataToShow}</Text>
      <LineChart
        data={chartData}
        width={screenWidth}
        height={220}
        yAxisLabel=""
        chartConfig={{
          backgroundColor: '#e9edc9',
          backgroundGradientFrom: '#fb8c00',
          backgroundGradientTo: '#ffa726',
          decimalPlaces: 0,
          color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          style: {
            borderRadius: 4,
          },
          propsForDots: {
            r: '2',
            strokeWidth: '1',
            stroke: '#ffa726',
          },
        }}
        style={{
          marginVertical: 1,
          borderRadius: 16,
        }}
      />
    </View>
  );
};

export default Chart;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
