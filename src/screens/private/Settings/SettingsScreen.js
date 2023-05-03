import React from 'react';
import {View, Text, StyleSheet, Button} from 'react-native';
import {GLOBAL_STYLES, COLORS, FONTS} from '../../../constants/Theme';
import auth from '@react-native-firebase/auth';
import * as Keychain from 'react-native-keychain';

const SettingsScreen = ({onSignOut}) => {
  return (
    <View style={GLOBAL_STYLES.rootContainerStyle}>
      <Text style={GLOBAL_STYLES.headingStyle}>Settings</Text>
      <Button
        title="Sign Out"
        onPress={async () => {
          await Keychain.resetGenericPassword();
          await auth().signOut();
          onSignOut();
        }}
      />
    </View>
  );
};

export default SettingsScreen;
