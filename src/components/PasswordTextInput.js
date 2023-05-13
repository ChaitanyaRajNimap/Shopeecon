import React, {useState, forwardRef} from 'react';
import {
  View,
  StyleSheet,
  TextInput,
  Image,
  TouchableOpacity,
} from 'react-native';
import {COLORS, FONTS} from '../constants/Theme';

const PasswordTextInput = forwardRef((props, ref) => {
  const handleChange = text => {
    props.onChange(text);
  };

  return (
    <View style={styles.textInputContainerStyle}>
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
        maxLength={8}
        secureTextEntry={!props.passwordVisible}
      />
      <TouchableOpacity onPress={props.onVisibilityChange}>
        {props.passwordVisible ? (
          <Image
            source={require('../assets/images/view.png')}
            style={styles.iconStyle}
          />
        ) : (
          <Image
            source={require('../assets/images/hide.png')}
            style={styles.iconStyle}
          />
        )}
      </TouchableOpacity>
    </View>
  );
});

export default PasswordTextInput;

const styles = StyleSheet.create({
  textInputContainerStyle: {
    padding: 10,
    borderWidth: 0.5,
    borderColor: COLORS.gray200,
    borderRadius: 10,
    marginVertical: 5,
    marginHorizontal: 10,
    marginBottom: 0,
    alignItems: 'center',
    backgroundColor: COLORS.white200,
    flexDirection: 'row',
  },
  textInputStyle: {
    padding: 0,
    margin: 0,
    flex: 1,
    color: COLORS.black200,
    fontSize: FONTS.largeFontSize,
  },
  iconStyle: {
    height: 20,
    width: 20,
    marginRight: 5,
  },
});
