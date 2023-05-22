import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/private/Home/HomeScreen';
import ProductDetailsScreen from '../screens/private/ProductDetails/ProductDetailsScreen';
import MyCartScreen from '../screens/private/Cart/MyCartScreen';
import MyProfileScreen from '../screens/private/MyProfile/MyProfileScreen';
import OrdersScreen from '../screens/private/MyProfile/OrdersScreen';
import EditProfile from '../screens/private/MyProfile/EditProfile';
import OrdersSummary from '../screens/private/Orders/OrdersSummary';
import {Image} from 'react-native';
import {COLORS} from '../constants/Theme';

const Stack = createNativeStackNavigator();

const Tab = createBottomTabNavigator();
const HomeTabs = ({onSignOut}) => {
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
          title: 'Cart',
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
        name="MyProfile"
        options={{
          headerShown: false,
          title: 'Profile',
          tabBarActiveTintColor: COLORS.green200,
          tabBarInactiveTintColor: COLORS.gray300,
          tabBarIcon: ({focused}) => (
            <Image
              source={
                focused
                  ? require('../assets/images/profile-green.png')
                  : require('../assets/images/profile-gray.png')
              }
              style={{width: 25, height: 25}}
            />
          ),
        }}>
        {props => <MyProfileScreen {...props} onSignOut={onSignOut} />}
      </Tab.Screen>
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
      {/* <Stack.Screen
        name="Home"
        component={HomeTabs}
        options={{headerShown: false, animationTypeForReplace: 'pop'}}
      /> */}
      <Stack.Screen
        name="Home"
        options={{headerShown: false, animationTypeForReplace: 'pop'}}>
        {props => <HomeTabs {...props} onSignOut={onSignOut} />}
      </Stack.Screen>
      <Stack.Screen
        name="ProductDetails"
        component={ProductDetailsScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="OrdersScreen"
        component={OrdersScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="EditProfile"
        component={EditProfile}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="OrdersSummary"
        component={OrdersSummary}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

export default AppNavigation;
