import React, {useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import AuthNavigation from './AuthNavigation';
import AppNavigation from './AppNavigation';

const RootNavigation = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleSignIn = () => setIsAuthenticated(true);

  const handleSignOut = () => setIsAuthenticated(false);

  const handleSignUp = () => setIsAuthenticated(true);

  return (
    <NavigationContainer>
      {isAuthenticated ? (
        <AppNavigation onSignOut={handleSignOut} />
      ) : (
        <AuthNavigation onSignIn={handleSignIn} onSignUp={handleSignUp} />
      )}
    </NavigationContainer>
  );
};

export default RootNavigation;
