import React from 'react';
import {Text, StyleSheet, TouchableOpacity} from 'react-native';
import {COLORS, FONTS} from '../constants/Theme';

const AppButton = ({title, onPress, customButtonStyle}) => {
  return (
    <TouchableOpacity
      style={[styles.buttonContainerStyle, customButtonStyle]}
      onPress={onPress}>
      <Text style={styles.buttonTextStyle}>{title}</Text>
    </TouchableOpacity>
  );
};

export default AppButton;

const styles = StyleSheet.create({
  buttonContainerStyle: {
    marginTop: '10%',
    marginHorizontal: 15,
    padding: 20,
    borderColor: COLORS.gray200,
    borderRadius: 10,
    backgroundColor: COLORS.green200,
  },
  buttonTextStyle: {
    color: COLORS.white100,
    alignSelf: 'center',
    fontSize: FONTS.xlargeFontSize,
    fontWeight: 'bold',
  },
});
