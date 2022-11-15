import React from 'react';
import Home from './screens/Home';
import Maps from './Maps';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const Weather_App = () => {
  const Stack = createStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Home'>
        <Stack.Screen name=" " component={Home} />
        <Stack.Screen name="Maps" component={Maps} /> 
      </Stack.Navigator>
    </NavigationContainer>

  );
};

export default Weather_App;
