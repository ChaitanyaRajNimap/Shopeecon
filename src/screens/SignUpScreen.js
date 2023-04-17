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
  Button,
} from 'react-native';
import {GLOBAL_STYLES, COLORS, FONTS} from '../constants/Theme';
import validate from '../constants/Validation';
import AppTextInput from '../components/AppTextInput';
import PasswordTextInput from '../components/PasswordTextInput';
import AppButton from '../components/AppButton';

const SignUpScreen = ({navigation, onSignUp}) => {
  const [inputs, setInputs] = useState({
    fNameInput: null,
    lNameInput: null,
    emailInput: null,
    phoneNoInput: null,
    passwordInput: null,
    confirmPasswordInput: null,
  });
  const [error, setError] = useState({
    fNameError: '',
    lNameError: '',
    emailError: '',
    phoneNoError: '',
    passwordError: '',
    confirmPasswordError: '',
  });

  const [isPasswordVisible, setIsPasswordVisible] = useState(true);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] =
    useState(true);

  const fNameInputRef = createRef();
  const lNameInputRef = createRef();
  const emailInputRef = createRef();
  const phoneNoInputRef = createRef();
  const passwordInputRef = createRef();
  const confirmPasswordInputRef = createRef();

  const handleSubmit = () => {
    let fNameErr = validate.validateName(inputs.fNameInput);
    let lNameErr = validate.validateName(inputs.lNameInput);
    let emailErr = validate.validateEmail(inputs.emailInput);
    let phoneNoErr = validate.validatePhoneNo(inputs.phoneNoInput);
    let passwordErr = validate.validatePassword(inputs.passwordInput);
    let confirmPasswordErr = validate.validateConfirmPassword(
      inputs.confirmPasswordInput,
      inputs.passwordInput,
    );

    if (
      !fNameErr &&
      !lNameErr &&
      !emailErr &&
      !phoneNoErr &&
      !passwordErr &&
      !confirmPasswordErr
    ) {
      setInputs({
        ...inputs,
        fNameInput: null,
        lNameInput: null,
        emailInput: null,
        phoneNoInput: null,
        passwordInput: null,
        confirmPasswordInput: null,
      });
      setError({
        ...error,
        fNameError: '',
        lNameError: '',
        emailError: '',
        phoneNoError: '',
        passwordError: '',
        confirmPasswordError: '',
      });
      console.log('DATA TO SUBMIT DATA ====> ', inputs);
      console.log('DATA TO SUBMIT ERROR ====> ', error);
      // onSignUp();
    } else {
      setError({
        ...error,
        fNameError: fNameErr,
        lNameError: lNameErr,
        emailError: emailErr,
        phoneNoError: phoneNoErr,
        passwordError: passwordErr,
        confirmPasswordError: confirmPasswordErr,
      });
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
            {padding: 10, marginTop: '15%'},
          ]}>
          <Text style={GLOBAL_STYLES.headingStyle}>Hello New User!</Text>
          <Text style={GLOBAL_STYLES.subHeadingStyle}>
            Welcome To {'\n'}Shopeefy
          </Text>
          <KeyboardAvoidingView style={{marginTop: '10%'}} enabled>
            <View style={styles.textInputContainerStyle}>
              <AppTextInput
                value={inputs.fNameInput}
                onChange={text => {
                  setInputs({...inputs, fNameInput: text});
                  setError({
                    ...error,
                    fNameError: validate.validateName(text),
                  });
                }}
                ref={fNameInputRef}
                placeholder="Enter your first name"
                onSubmitEditing={() =>
                  lNameInputRef.current && lNameInputRef.current.focus()
                }
              />
              <Text style={styles.errorTextStyle}>{error.fNameError}</Text>
            </View>
            <View style={styles.textInputContainerStyle}>
              <AppTextInput
                value={inputs.lNameInput}
                onChange={text => {
                  setInputs({...inputs, lNameInput: text});
                  setError({
                    ...error,
                    lNameError: validate.validateName(text),
                  });
                }}
                ref={lNameInputRef}
                placeholder="Enter your last name"
                onSubmitEditing={() =>
                  emailInputRef.current && emailInputRef.current.focus()
                }
              />
              <Text style={styles.errorTextStyle}>{error.lNameError}</Text>
            </View>
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
                  phoneNoInputRef.current && phoneNoInputRef.current.focus()
                }
              />
              <Text style={styles.errorTextStyle}>{error.emailError}</Text>
            </View>
            <View style={styles.textInputContainerStyle}>
              <AppTextInput
                value={inputs.phoneNoInput}
                onChange={text => {
                  setInputs({...inputs, phoneNoInput: text});
                  setError({
                    ...error,
                    phoneNoError: validate.validatePhoneNo(text),
                  });
                }}
                ref={phoneNoInputRef}
                placeholder="Enter your phone number"
                keyboardType="numeric"
                maxLength={10}
                onSubmitEditing={() =>
                  passwordInputRef.current && passwordInputRef.current.focus()
                }
              />
              <Text style={styles.errorTextStyle}>{error.phoneNoError}</Text>
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
                ref={passwordInputRef}
                placeholder="Enter your password"
                onSubmitEditing={() =>
                  confirmPasswordInputRef.current &&
                  confirmPasswordInputRef.current.focus()
                }
                passwordVisible={isPasswordVisible}
                onVisibilityChange={() =>
                  setIsPasswordVisible(!isPasswordVisible)
                }
              />
              <Text style={styles.errorTextStyle}>{error.passwordError}</Text>
            </View>
            <View style={styles.textInputContainerStyle}>
              <PasswordTextInput
                value={inputs.confirmPasswordInput}
                onChange={text => {
                  setInputs({...inputs, confirmPasswordInput: text});
                  setError({
                    ...error,
                    confirmPasswordError: validate.validateConfirmPassword(
                      text,
                      inputs.passwordInput,
                    ),
                  });
                }}
                ref={confirmPasswordInputRef}
                placeholder="Enter your confirm password"
                onSubmitEditing={() => Keyboard.dismiss}
                passwordVisible={isConfirmPasswordVisible}
                onVisibilityChange={() =>
                  setIsConfirmPasswordVisible(!isConfirmPasswordVisible)
                }
              />
              <Text style={styles.errorTextStyle}>
                {error.confirmPasswordError}
              </Text>
            </View>
            <AppButton title="Sign Up" onPress={handleSubmit} />
          </KeyboardAvoidingView>
          <View style={styles.textContainerStyle}>
            <Text>Already a member? </Text>
            <TouchableOpacity onPress={() => navigation.navigate('SignIn')}>
              <Text style={{color: COLORS.green200, marginLeft: 5}}>
                Sign In
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignUpScreen;

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
    marginBottom: '15%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
