import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SignInScreen from '../screens/SignInScreen';
import SignUpScreen from '../screens/SignUpScreen';

const Stack = createNativeStackNavigator();

const AuthNavigation = ({onSignIn, onSignUp}) => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="SignIn" options={{headerShown: false}}>
        {props => <SignInScreen {...props} onSignIn={onSignIn} />}
      </Stack.Screen>

      <Stack.Screen name="SignUp" options={{headerShown: false}}>
        {props => <SignUpScreen {...props} onSignUp={onSignUp} />}
      </Stack.Screen>
    </Stack.Navigator>
  );
};

export default AuthNavigation;
