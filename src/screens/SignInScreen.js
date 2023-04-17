import React, {useState, useEffect, createRef} from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  KeyboardAvoidingView,
  Keyboard,
  TouchableOpacity,
} from 'react-native';
import {GLOBAL_STYLES, COLORS, FONTS} from '../constants/Theme';
import validate from '../constants/Validation';
import AppTextInput from '../components/AppTextInput';
import PasswordTextInput from '../components/PasswordTextInput';
import AppButton from '../components/AppButton';

const SignInScreen = ({navigation, onSignIn}) => {
  const [inputs, setInputs] = useState({
    emailInput: null,
    passwordInput: null,
  });
  const [error, setError] = useState({
    emailError: '',
    passwordError: '',
  });

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const emailInputRef = createRef();
  const passwordRef = createRef();

  const handleSubmit = () => {
    let emailErr = validate.validateEmail(inputs.emailInput);
    let passwordErr = validate.validatePassword(inputs.passwordInput);

    if (!emailErr && !passwordErr) {
      setInputs({...inputs, emailInput: null, passwordInput: null});
      setError({...error, emailError: '', passwordError: ''});
      console.log('DATA TO SUBMIT DATA ====> ', inputs);
      console.log('DATA TO SUBMIT ERROR ====> ', error);
      // onSignIn();
    } else {
      setError({...error, emailError: emailErr, passwordError: passwordErr});
    }
  };

  return (
    <SafeAreaView style={GLOBAL_STYLES.containerStyle}>
      <ScrollView
        style={GLOBAL_STYLES.containerStyle}
        keyboardShouldPersistTaps="handled">
        <View
          style={[
            GLOBAL_STYLES.containerStyle,
            {padding: 10, marginTop: '25%'},
          ]}>
          <Text style={GLOBAL_STYLES.headingStyle}>Hello Again!</Text>

          <Text style={GLOBAL_STYLES.subHeadingStyle}>
            Welcome back you've {'\n'}been missed!
          </Text>
          <KeyboardAvoidingView style={{marginTop: '10%'}} enabled>
            <View style={styles.textInputContainerStyle}>
              <AppTextInput
                value={inputs.emailInput}
                onChange={text => {
                  setInputs({...inputs, emailInput: text});
                  setError({
                    ...error,
                    emailError: validate.validateEmail(text),
                  });
                }}
                ref={emailInputRef}
                placeholder="Enter your email"
                onSubmitEditing={() =>
                  passwordRef.current && passwordRef.current.focus()
                }
              />
              <Text style={styles.errorTextStyle}>{error.emailError}</Text>
            </View>
            <View style={styles.textInputContainerStyle}>
              <PasswordTextInput
                value={inputs.passwordInput}
                onChange={text => {
                  setInputs({...inputs, passwordInput: text});
                  setError({
                    ...error,
                    passwordError: validate.validatePassword(text),
                  });
                }}
                ref={passwordRef}
                placeholder="Enter your password"
                onSubmitEditing={() => Keyboard.dismiss}
                passwordVisible={isPasswordVisible}
                onVisibilityChange={() =>
                  setIsPasswordVisible(!isPasswordVisible)
                }
              />
              <Text style={styles.errorTextStyle}>{error.passwordError}</Text>
            </View>
            <AppButton title="Sign In" onPress={handleSubmit} />
          </KeyboardAvoidingView>
          <View style={styles.textContainerStyle}>
            <Text>Not a member? </Text>
            <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
              <Text style={{color: COLORS.green200, marginLeft: 5}}>
                Sign Up Now
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignInScreen;

const styles = StyleSheet.create({
  textInputContainerStyle: {},
  errorTextStyle: {
    marginBottom: 5,
    marginHorizontal: 15,
    fontSize: FONTS.largeBold,
    color: COLORS.red200,
  },
  textContainerStyle: {
    margin: 15,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
