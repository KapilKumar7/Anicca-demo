// TestScreen.js
import React from 'react';
import {View, Button, StyleSheet} from 'react-native';

import Realm from 'realm';
import {AniccaLog} from '../schema/schema';

const TestScreen = () => {
  const realm = new Realm({schema: [AniccaLog]});

  // Function to populate data for previous months
  const populateTestData = () => {
    // Generate test data for previous months
    const currentDate = new Date();
    const numberOfMonths = 3; // Number of previous months to generate data for

    for (let i = 1; i <= numberOfMonths; i++) {
      const previousMonthDate = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth() - i,
        1,
      );

      // Generate sample data for the month
      const sampleData = [];
      for (let j = 1; j <= 20; j++) {
        // Assuming 20 entries per month
        sampleData.push({
          id: Math.floor(Math.random() * 10000000) + 1,
          awareness: Math.floor(Math.random() * 5) + 1, // Random awareness rating between 1 and 5
          anicca: Math.floor(Math.random() * 5) + 1, // Random anicca rating between 1 and 5
          comment: `Sample comment for entry ${j} of month ${
            previousMonthDate.getMonth() + 1
          }`, // Sample comment
          date: new Date(
            previousMonthDate.getFullYear(),
            previousMonthDate.getMonth(),
            j,
          ), // Date within the month
        });
      }

      // Write data to Realm
      realm.write(() => {
        sampleData.forEach(data => {
          realm.create('aniccaLog', data);
        });
      });
    }
  };
  const addTestData = () => {
    populateTestData(); // Call the function to populate test data
  };

  return (
    <View style={styles.container}>
      <Button title="Add Test Data" onPress={addTestData} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default TestScreen;
