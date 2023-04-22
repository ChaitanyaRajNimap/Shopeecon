import React, {useEffect} from 'react';
import {View, Text, StyleSheet, Button} from 'react-native';
import {GLOBAL_STYLES, COLORS, FONTS} from '../constants/Theme';
import auth from '@react-native-firebase/auth';
import * as Keychain from 'react-native-keychain';

const HomeScreen = ({navigation, onSignOut}) => {
  useEffect(() => {
    const getUserData = async () => {
      try {
        const userData = await Keychain.getGenericPassword();
        if (userData) {
          console.log(userData);
          const temp = JSON.parse(userData?.password);
          console.log(temp);
        } else {
          console.log('No userdata stored');
        }
      } catch (err) {
        console.log("Keychain couldn't be accessed!", err);
      }
      await Keychain.resetGenericPassword();
    };
    getUserData();
  }, []);

  // useEffect(() => {
  //   const unSubscribe = navigation.addListener('focus', () => {
  //     const getUserData = async () => {
  //       try {
  //         const userData = await Keychain.getGenericPassword();
  //         if (userData) {
  //           console.log(JSON.parse(userData));
  //         } else {
  //           console.log('No userdata stored');
  //         }
  //       } catch (err) {
  //         console.log("Keychain couldn't be accessed!", err);
  //       }
  //       await Keychain.resetGenericPassword();
  //     };
  //     getUserData();
  //   });
  //   return unSubscribe;
  // }, [navigation]);

  return (
    <View style={GLOBAL_STYLES.rootContainerStyle}>
      <Text style={GLOBAL_STYLES.headingStyle}>Home Screen!</Text>
      <Text style={GLOBAL_STYLES.headingStyle}>{auth().currentUser.email}</Text>
      <Text style={GLOBAL_STYLES.headingStyle}>{auth().currentUser.uid}</Text>
      {/* <Button title="Sign Out" onPress={onSignOut} /> */}
      <Button
        title="Sign Out"
        onPress={async () => {
          await auth().signOut();
          onSignOut();
        }}
      />
    </View>
  );
};

export default HomeScreen;
