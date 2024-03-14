// AppNavigator.js
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import CalenderScreen from '../screens/CalenderScreen';
import HomeScreen from '../HomeScreen';
import Chart from './Chart';
import TestScreen from '../screens/TestScreen';
import Splash from '../screens/Splash';

const Stack = createStackNavigator();
const Tab = createMaterialBottomTabNavigator();

const MainNavigator = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Calender" component={CalenderScreen} />
      <Tab.Screen name="HomeScreen" component={HomeScreen} />
      {/* <Tab.Screen name="TestScreen" component={TestScreen} /> */}
    </Tab.Navigator>
  );
};

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Splash"
          component={Splash}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Main"
          component={MainNavigator}
          options={{
            headerShown: false,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
