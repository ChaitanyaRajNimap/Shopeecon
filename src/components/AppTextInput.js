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
      style={styles.textInputStyle}
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
    backgroundColor: COLORS.white200,
    marginVertical: 10,
    marginBottom: 5,
    marginHorizontal: 15,
    padding: 20,
    borderColor: COLORS.gray200,
    borderRadius: 10,
    color: COLORS.black200,
    fontSize: FONTS.xlargeFontSize,
  },
});
