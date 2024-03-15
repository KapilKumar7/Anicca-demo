// Splash.js
import {View, Text, StyleSheet} from 'react-native';
import React, {useEffect} from 'react';

const Splash = ({navigation}) => {
  useEffect(() => {
    setTimeout(() => {
      navigation.navigate('Main', {screen: 'HomeScreen'});
    }, 8000);
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.logo}>स्थितप्रज्ञ</Text>
    </View>
  );
};

export default Splash;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#B26C49',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    fontSize: 50,
    fontWeight: '700',
    color: 'white',
    fontFamily: 'monospace',
  },
});
