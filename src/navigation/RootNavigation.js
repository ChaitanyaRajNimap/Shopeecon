import React, {useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import auth from '@react-native-firebase/auth';
import AuthNavigation from './AuthNavigation';
import AppNavigation from './AppNavigation';
import SplashScreen from '../screens/public/Splash/SplashScreen';

const Stack = createNativeStackNavigator();

const RootNavigation = () => {
  const [isSplashScreen, setIsSplashScreen] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleSignIn = () => setIsAuthenticated(true);

  const handleSignOut = () => setIsAuthenticated(false);

  const handleSignUp = () => setIsAuthenticated(true);

  const handleSplashScreen = value => setIsSplashScreen(value);

  return (
    <NavigationContainer>
      {isSplashScreen ? (
        <Stack.Navigator>
          <Stack.Screen name="SplashScreen" options={{headerShown: false}}>
            {props => (
              <SplashScreen
                {...props}
                handleSplashScreen={handleSplashScreen}
                onSignIn={handleSignIn}
                onSignOut={handleSignOut}
              />
            )}
          </Stack.Screen>
        </Stack.Navigator>
      ) : (
        <>
          {isAuthenticated ? (
            <AppNavigation onSignOut={handleSignOut} />
          ) : (
            <AuthNavigation onSignIn={handleSignIn} onSignUp={handleSignUp} />
          )}
        </>
      )}
    </NavigationContainer>
  );
};

export default RootNavigation;
