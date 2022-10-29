import React from 'react';
import detail from './detail';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const Location_App = () => {
  const Stack = createStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='detail'>
        <Stack.Screen name="detail" component={detail} />
      </Stack.Navigator>
    </NavigationContainer>

  );
};

export default Location_App;
