import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/private/Home/HomeScreen';
import ProductDetailsScreen from '../screens/private/ProductDetails/ProductDetailsScreen';
import MyCartScreen from '../screens/private/Cart/MyCartScreen';
import SettingsScreen from '../screens/private/Settings/SettingsScreen';
import {Image} from 'react-native';
import {COLORS} from '../constants/Theme';

const Stack = createNativeStackNavigator();

const Tab = createBottomTabNavigator();
const HomeTabs = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{
          headerShown: false,
          title: 'Home',
          tabBarActiveTintColor: COLORS.green200,
          tabBarInactiveTintColor: COLORS.gray300,
          tabBarIcon: ({focused}) => (
            <Image
              source={
                focused
                  ? require('../assets/images/home-green.png')
                  : require('../assets/images/home-gray.png')
              }
              style={{width: 25, height: 25}}
            />
          ),
        }}
      />
      <Tab.Screen
        name="MyCart"
        component={MyCartScreen}
        options={{
          headerShown: false,
          title: 'My Cart',
          tabBarActiveTintColor: COLORS.green200,
          tabBarInactiveTintColor: COLORS.gray300,
          tabBarIcon: ({focused}) => (
            <Image
              source={
                focused
                  ? require('../assets/images/cart-green.png')
                  : require('../assets/images/cart-gray.png')
              }
              style={{width: 25, height: 25}}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          headerShown: false,
          tabBarActiveTintColor: COLORS.green200,
          tabBarInactiveTintColor: COLORS.gray300,
          tabBarIcon: ({focused}) => (
            <Image
              source={
                focused
                  ? require('../assets/images/settings-green.png')
                  : require('../assets/images/settings-gray.png')
              }
              style={{width: 25, height: 25}}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const AppNavigation = ({onSignOut}) => {
  return (
    <Stack.Navigator>
      {/* <Stack.Screen
        name="Home"
        options={{headerShown: false, animationTypeForReplace: 'pop'}}>
        {props => <HomeScreen {...props} onSignOut={onSignOut} />}
      </Stack.Screen> */}
      <Stack.Screen
        name="Home"
        component={HomeTabs}
        options={{headerShown: false, animationTypeForReplace: 'pop'}}
      />
      <Stack.Screen
        name="ProductDetails"
        component={ProductDetailsScreen}
        options={{headerShown: false}}
      />
      {/* <Stack.Screen
        name="MyCart"
        component={MyCartScreen}
        options={{headerShown: false}}
      /> */}
    </Stack.Navigator>
  );
};

export default AppNavigation;
