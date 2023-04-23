import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, Button, ActivityIndicator} from 'react-native';
import {GLOBAL_STYLES, COLORS, FONTS} from '../constants/Theme';
import auth from '@react-native-firebase/auth';
import * as Keychain from 'react-native-keychain';
import database from '@react-native-firebase/database';
import AppOverlayLoader from '../components/AppOverlayLoader';

const HomeScreen = ({navigation, onSignOut}) => {
  const [userDetails, setUserDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    setTimeout(() => {
      getUserToken();
    }, 1000);
  }, []);

  const getUserToken = async () => {
    try {
      const userDetails = await Keychain.getGenericPassword();
      if (userDetails) {
        console.log('userDetails Token => ', userDetails?.username);
        console.log('userDetails Uid => ', userDetails?.password);
        if (userDetails?.password) {
          getUserDetails(userDetails?.password);
        }
      } else {
        console.log('User Details Not Found');
      }
    } catch (err) {
      console.log("Keychain couldn't be accessed!", err);
    }
  };

  const getUserDetails = async uid => {
    try {
      const res = await database().ref(`users/${uid}`).once('value');
      console.log('User Details Data ON Home =====> ', res.val());
      if (res.val()) {
        setIsLoading(false);
        setUserDetails(res.val());
      }
    } catch (err) {
      console.log('Error in getting user data ====> ', err.message);
    }
  };

  return (
    <View style={GLOBAL_STYLES.rootContainerStyle}>
      <>
        <Text style={GLOBAL_STYLES.headingStyle}>Home Screen!</Text>
        <Text style={GLOBAL_STYLES.headingStyle}>
          {userDetails?.data?.fName + ' ' + userDetails?.data?.lName}
        </Text>
        <Text style={GLOBAL_STYLES.headingStyle}>
          {userDetails?.data?.email}
        </Text>
        <Button
          title="Sign Out"
          onPress={async () => {
            await Keychain.resetGenericPassword();
            await auth().signOut();
            onSignOut();
          }}
        />
      </>
      <AppOverlayLoader isLoading={isLoading} isZindex={true} />
    </View>
  );
};

export default HomeScreen;
