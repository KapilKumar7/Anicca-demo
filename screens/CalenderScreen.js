import {ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Calendar} from 'react-native-calendars';
import Chart from '../AppNavigation/Chart';
import {AniccaLog} from '../schema/schema';
import Realm from 'realm';
import {useFocusEffect} from '@react-navigation/native';

const CalenderScreen = () => {
  const [selectedMonth, setSelectedMonth] = useState('');
  const [logs, setLogs] = useState([]);
  const [markedDates, setMarkedDates] = useState({});
  const realm = new Realm({schema: [AniccaLog]});
  const year = new Date().getFullYear();

  const logsByMonth = month => {
    const startDate = new Date(year, month - 1, 1);
    const endDate = new Date(year, month, 1);

    const logs = realm
      .objects('aniccaLog')
      .filtered(`date >= $0 AND date < $1`, startDate, endDate);

    const logsArray = Array.from(logs);

    // Create a map to store the sum and count of records for each day
    const dailyRecordsMap = new Map();

    // Populate dailyRecordsMap with sum and count of records for each day
    logsArray.forEach(log => {
      const dateKey = log.date.toISOString().split('T')[0];
      if (!dailyRecordsMap.has(dateKey)) {
        dailyRecordsMap.set(dateKey, {sumAnicca: 0, sumAwareness: 0, count: 0});
      }
      dailyRecordsMap.get(dateKey).sumAnicca += log.anicca;
      dailyRecordsMap.get(dateKey).sumAwareness += log.awareness;
      dailyRecordsMap.get(dateKey).count++;
    });

    // Calculate the average for each day
    const averagedLogs = Array.from(dailyRecordsMap).map(
      ([date, {sumAnicca, sumAwareness, count}]) => ({
        date: new Date(date),
        anicca: sumAnicca / count,
        awareness: sumAwareness / count,
      }),
    );

    return averagedLogs;
  };

  useFocusEffect(
    React.useCallback(() => {
      // This will be called when the screen gains focus
      const currentDate = new Date();
      const currentMonth = currentDate.getMonth() + 1;
      setSelectedMonth(currentMonth);
      setLogs(logsByMonth(currentMonth));
      markDatesInCalendar(logsByMonth(currentMonth));

      return () => {
        // Cleanup function (optional)
      };
    }, []),
  );

  const markDatesInCalendar = logsArray => {
    const markedDatesObject = {};
    logsArray.forEach(log => {
      const date = log.date.toISOString().split('T')[0];
      markedDatesObject[date] = {
        activeOpacity: 1,
        selectedColor: 'green',
        selected: true,
      };
    });
    setMarkedDates(markedDatesObject);
  };

  return (
    <ScrollView>
      <Calendar
        onDayPress={day => {
          const selectedDate = new Date(day.dateString);
        }}
        onMonthChange={month => {
          setSelectedMonth(month.month);
          setLogs(logsByMonth(month.month));
          markDatesInCalendar(logsByMonth(month.month));
        }}
        markedDates={markedDates}
      />
      <View style={{marginTop: 50}}>
        <Chart logs={logs} dataToShow="anicca" />
      </View>
      <View style={{marginTop: 50}}>
        <Chart logs={logs} dataToShow="awareness" />
      </View>
    </ScrollView>
  );
};

export default CalenderScreen;

const styles = StyleSheet.create({});
