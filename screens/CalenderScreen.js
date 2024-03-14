import {ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Calendar} from 'react-native-calendars';
import Chart from '../AppNavigation/Chart';
import {AniccaLog} from '../schema/schema';
import Realm from 'realm';

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
    return logsArray;
  };

  useEffect(() => {
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth() + 1;
    setSelectedMonth(currentMonth);
    setLogs(logsByMonth(currentMonth));

    // Mark dates based on logs
    markDatesInCalendar(logsByMonth(currentMonth));
  }, []);

  const markDatesInCalendar = logsArray => {
    const markedDatesObject = {};
    logsArray.forEach(log => {
      const date = log.date.toISOString().split('T')[0];
      markedDatesObject[date] = {
        // marked: true,
        // dotColor: 'orange',
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
