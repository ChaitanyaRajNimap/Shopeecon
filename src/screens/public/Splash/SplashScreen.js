import React, {useEffect} from 'react';
import {View, Text, SafeAreaView, Image} from 'react-native';
import {GLOBAL_STYLES, COLORS, FONTS} from '../../../constants/Theme';
import auth from '@react-native-firebase/auth';
import Lottie from 'lottie-react-native';

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
        <View
          style={{
            width: 200,
            height: 200,
            borderRadius: 100,
            overflow: 'hidden',
          }}>
          <Lottie
            source={require('../../../assets/animations/splash.json')}
            autoPlay
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default SplashScreen;
