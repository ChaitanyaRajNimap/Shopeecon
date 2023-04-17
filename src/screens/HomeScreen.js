import React from 'react';
import {View, Text, StyleSheet, Button} from 'react-native';
import {GLOBAL_STYLES, COLORS, FONTS} from '../constants/Theme';

const HomeScreen = ({navigation, onSignOut}) => {
  return (
    <View style={GLOBAL_STYLES.rootContainerStyle}>
      <Text style={GLOBAL_STYLES.headingStyle}>Home Screen!</Text>
      <Button title="Sign Out" onPress={onSignOut} />
    </View>
  );
};

export default HomeScreen;
