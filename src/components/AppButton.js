import React from 'react';
import {Text, StyleSheet, TouchableOpacity} from 'react-native';
import {COLORS, FONTS} from '../constants/Theme';

const AppButton = ({
  title,
  onPress,
  customButtonStyle,
  customButtonTextStyle,
}) => {
  return (
    <TouchableOpacity
      style={[styles.buttonContainerStyle, customButtonStyle]}
      onPress={onPress}>
      <Text style={[styles.buttonTextStyle, customButtonTextStyle]}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default AppButton;

const styles = StyleSheet.create({
  buttonContainerStyle: {
    padding: 13,
    borderRadius: 10,
    marginHorizontal: 10,
    backgroundColor: COLORS.green200,
  },
  buttonTextStyle: {
    alignSelf: 'center',
    color: COLORS.white100,
    fontSize: FONTS.largeFontSize,
    fontWeight: 'bold',
  },
});
