import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {GLOBAL_STYLES, COLORS, FONTS} from '../../../constants/Theme';

const SettingsScreen = () => {
  return (
    <View style={GLOBAL_STYLES.rootContainerStyle}>
      <Text style={GLOBAL_STYLES.headingStyle}>Settings</Text>
    </View>
  );
};

export default SettingsScreen;
