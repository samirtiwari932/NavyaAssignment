import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import HomeScreen from '../Views/Home';
import { color } from '../component/utilis/color';

import {
  LucideChartArea,
  LucideList
} from 'lucide-react-native';
import ChartScreen from '../Views/ChartScreen';

const Tab = createBottomTabNavigator();

function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: color.primary,
          paddingBottom:10,
          paddingTop:5
        },
      }}>
      <Tab.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{
          tabBarIcon: props => {
            return <LucideList size={24} color={props.color} />;
          },
          tabBarLabel: 'Home',
        }}
      />
      <Tab.Screen
        name="ChartScreen"
        component={ChartScreen}
        initialParams={{symbol: 'IBM'}}
        options={{
          tabBarIcon: props => {
            return <LucideChartArea size={24} color={props.color} />;
          },
          tabBarLabel: 'ChartScreen',
        }}
      />
    </Tab.Navigator>
  );
}

export default TabNavigator;
