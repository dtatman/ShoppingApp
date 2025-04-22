import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Màn hình
import ProductScreen from '../screens/ProductScreen';
import DrawerNavigator from './DrawerNavigator';

const Stack = createNativeStackNavigator();

const StackNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="Main"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Main" component={DrawerNavigator} />
      <Stack.Screen name="Product" component={ProductScreen} />
    </Stack.Navigator>
  );
};

export default StackNavigator;