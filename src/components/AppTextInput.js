import React, {forwardRef} from 'react';
import {StyleSheet, TextInput} from 'react-native';
import {COLORS, FONTS} from '../constants/Theme';

const AppTextInput = forwardRef((props, ref) => {
  const handleChange = text => {
    props.onChange(text);
  };
  return (
    <TextInput
      {...props}
      onChangeText={handleChange}
      style={[styles.textInputStyle, {...props.customStyle}]}
      placeholderTextColor={COLORS.gray200}
      underlineColorAndroid={COLORS.white100}
      ref={ref}
      returnKeyType="next"
      autoCapitalize="none"
      blurOnSubmit={false}
    />
  );
});

export default AppTextInput;

const styles = StyleSheet.create({
  textInputStyle: {
    padding: 10,
    paddingHorizontal: 15,
    borderWidth: 0.5,
    borderColor: COLORS.gray200,
    borderRadius: 10,
    marginVertical: 5,
    marginHorizontal: 10,
    marginBottom: 0,
    backgroundColor: COLORS.white200,
    color: COLORS.black200,
    fontSize: FONTS.largeFontSize,
  },
});
