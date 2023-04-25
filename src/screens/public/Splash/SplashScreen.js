import React, {useEffect} from 'react';
import {View, Text, SafeAreaView} from 'react-native';
import {GLOBAL_STYLES, COLORS, FONTS} from '../../../constants/Theme';
import auth from '@react-native-firebase/auth';

const SplashScreen = ({
  navigation,
  handleSplashScreen,
  onSignIn,
  onSignOut,
}) => {
  useEffect(() => {
    setTimeout(() => {
      auth().onAuthStateChanged(user => {
        if (user !== null) {
          handleSplashScreen(false);
          onSignIn();
        } else {
          handleSplashScreen(false);
          onSignOut();
        }
      });
    }, 3000);
  }, []);

  return (
    <SafeAreaView style={GLOBAL_STYLES.rootContainerStyle}>
      <View style={GLOBAL_STYLES.rootContainerStyle}>
        <Text style={GLOBAL_STYLES.headingStyle}>Splash Screen!</Text>
      </View>
    </SafeAreaView>
  );
};

export default SplashScreen;
