// src/navigation/MainStackNavigator.tsx
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import HomeScreen from '@/screens/HomeScreen';
import Filed from '@/screens/Filed';
import NonFiled from '@/screens/NonFiled';
import TotalClients from '@/screens/TotalClients';

const Stack = createStackNavigator();

const MainStackNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Filed" component={Filed} />
        <Stack.Screen name="NonFiled" component={NonFiled} />
        <Stack.Screen name="TotalClients" component={TotalClients} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MainStackNavigator;
