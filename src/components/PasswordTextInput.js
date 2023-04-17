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
            source={require('../assets/view.png')}
            style={{height: 25, width: 25}}
          />
        ) : (
          <Image
            source={require('../assets/hide.png')}
            style={{height: 25, width: 25}}
          />
        )}
      </TouchableOpacity>
    </View>
  );
});

export default PasswordTextInput;

const styles = StyleSheet.create({
  textInputContainerStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.white200,
    marginVertical: 10,
    marginBottom: 5,
    marginHorizontal: 15,
    borderColor: COLORS.gray200,
    borderRadius: 10,
    padding: 20,
  },
  textInputStyle: {
    flex: 1,
    color: COLORS.black200,
    fontSize: FONTS.xlargeFontSize,
  },
});
