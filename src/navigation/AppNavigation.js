import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from '../screens/private/Home/HomeScreen';
import ProductDetailsScreen from '../screens/private/ProductDetails/ProductDetailsScreen';
import MyCartScreen from '../screens/private/Cart/MyCartScreen';

const Stack = createNativeStackNavigator();

const AppNavigation = ({onSignOut}) => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        options={{headerShown: false, animationTypeForReplace: 'pop'}}>
        {props => <HomeScreen {...props} onSignOut={onSignOut} />}
      </Stack.Screen>
      <Stack.Screen
        name="ProductDetails"
        component={ProductDetailsScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="MyCart"
        component={MyCartScreen}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

export default AppNavigation;
