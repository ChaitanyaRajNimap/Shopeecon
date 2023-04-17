import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';

const Stack = createNativeStackNavigator();

const AppNavigation = ({onSignOut}) => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        options={{headerShown: false, animationTypeForReplace: 'pop'}}>
        {props => <HomeScreen {...props} onSignOut={onSignOut} />}
      </Stack.Screen>
    </Stack.Navigator>
  );
};

export default AppNavigation;
