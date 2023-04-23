import React, {useState, createRef} from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  KeyboardAvoidingView,
  Keyboard,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {GLOBAL_STYLES, COLORS, FONTS} from '../constants/Theme';
import validate from '../constants/Validation';
import AppTextInput from '../components/AppTextInput';
import PasswordTextInput from '../components/PasswordTextInput';
import AppButton from '../components/AppButton';
import auth from '@react-native-firebase/auth';
import * as Keychain from 'react-native-keychain';
import AppOverlayLoader from '../components/AppOverlayLoader';

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
  const [isLoading, setIsLoading] = useState(false);

  const emailInputRef = createRef();
  const passwordRef = createRef();

  const handleSignIn = async () => {
    setIsLoading(true);
    let emailErr = validate.validateEmail(inputs.emailInput);
    let passwordErr = validate.validatePassword(inputs.passwordInput);

    try {
      if (!emailErr && !passwordErr) {
        const isUserSignIn = await auth().signInWithEmailAndPassword(
          inputs.emailInput,
          inputs.passwordInput,
        );
        if (isUserSignIn) {
          // console.log('isUserSignIn : ', isUserSignIn);
          // console.log('UID : ', isUserSignIn?.user?.uid);
          setIsLoading(false);
          await Keychain.resetGenericPassword();
          await Keychain.setGenericPassword('Token', isUserSignIn?.user?.uid)
            .then(() => console.log('User Details Stored Successfully!'))
            .catch(err =>
              console.log('Error in storing user details : ', err.message),
            );
          onSignIn();
          setInputs({...inputs, emailInput: null, passwordInput: null});
          setError({...error, emailError: '', passwordError: ''});
        }
      } else {
        setIsLoading(false);
        setError({...error, emailError: emailErr, passwordError: passwordErr});
      }
    } catch (err) {
      setIsLoading(false);
      console.log('Error in Sign IN : ', err.message);
      Alert.alert('Alert!', err.message);
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
            <AppButton title="Sign In" onPress={handleSignIn} />
          </KeyboardAvoidingView>
          <View style={styles.textContainerStyle}>
            <Text>Not a member? </Text>
            <TouchableOpacity
              onPress={() => navigation.navigate('SignUpScreen')}>
              <Text style={{color: COLORS.green200, marginLeft: 5}}>
                Sign Up Now
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
      <AppOverlayLoader isLoading={isLoading} isZindex={true} />
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
