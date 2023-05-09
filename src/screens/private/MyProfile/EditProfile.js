import React, {useEffect, useState, createRef} from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  KeyboardAvoidingView,
  Keyboard,
  Alert,
} from 'react-native';
import {GLOBAL_STYLES, COLORS, FONTS} from '../../../constants/Theme';
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
import AppHeader from '../../../components/AppHeader';
import validate from '../../../constants/Validation';
import AppTextInput from '../../../components/AppTextInput';
import PasswordTextInput from '../../../components/PasswordTextInput';
import AppButton from '../../../components/AppButton';
import AppOverlayLoader from '../../../components/AppOverlayLoader';
import Toast from 'react-native-simple-toast';

const EditProfile = ({navigation}) => {
  const currUser = auth().currentUser;
  const [userDetails, setUserDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const [inputs, setInputs] = useState({
    fNameInput: null,
    lNameInput: null,
    emailInput: null,
    phoneNoInput: null,
    currPasswordInput: null,
    newPasswordInput: null,
  });
  const [error, setError] = useState({
    fNameError: null,
    lNameError: null,
    emailError: null,
    phoneNoError: null,
    currPasswordError: null,
    newPasswordError: null,
  });
  const [isCurrPasswordVisible, setIsCurrPasswordVisible] = useState(false);
  const [isNewPasswordVisible, setIsNewPasswordVisible] = useState(false);

  const fNameInputRef = createRef();
  const lNameInputRef = createRef();
  const emailInputRef = createRef();
  const phoneNoInputRef = createRef();
  const currPasswordInputRef = createRef();
  const newPasswordInputRef = createRef();

  useEffect(() => {
    setIsLoading(true);
    if (currUser?.uid) {
      getUserDetails(currUser?.uid);
    }
  }, []);

  const getUserDetails = async uid => {
    try {
      const res = await database().ref(`users/${uid}`).once('value');
      if (res.val()) {
        setUserDetails(res.val()?.data);
        setInputs({
          ...inputs,
          fNameInput: res.val()?.data?.fName,
          lNameInput: res.val()?.data?.lName,
          emailInput: currUser?.email,
          phoneNoInput: res.val()?.data?.phoneNo,
        });
      }
    } catch (err) {
      console.log('Error in getting user data ====> ', err.message);
    }
    setIsLoading(false);
  };

  const updateUserData = data => {
    try {
      let idx = currUser?.uid;
      database()
        .ref(`users/${idx}/data`)
        .update(data)
        .then(() => console.log('Data updated.'));
    } catch (err) {
      console.log('Error while updating user data ', err);
    }
  };

  const handleUpdateEmailAndPassword = () => {
    const creds = auth.EmailAuthProvider.credential(
      currUser.email,
      inputs.currPasswordInput,
    );

    currUser
      .reauthenticateWithCredential(creds)
      .then(() => {
        // //Update email
        // currUser
        //   .updateEmail(inputs.email)
        //   .then(() => {
        //     console.log('Email updated successfully!');
        //   })
        //   .catch(err => {
        //     console.log('Error updating email', err);
        //   });

        //Update password
        currUser
          .updatePassword(inputs.newPasswordInput)
          .then(() => {
            console.log('Password updated successfully!');
          })
          .catch(err => {
            console.log('Error updating email', err);
          });
      })
      .catch(err => {
        console.log('Error reauthenticating user', err);
      });
  };

  const handleUpdate = async () => {
    setIsLoading(true);
    let fNameErr = validate.validateName(inputs.fNameInput);
    let lNameErr = validate.validateName(inputs.lNameInput);
    let emailErr = validate.validateEmail(inputs.emailInput);
    let phoneNoErr = validate.validatePhoneNo(inputs.phoneNoInput);
    let currPasswordErr = validate.validatePassword(inputs.currPasswordInput);
    let newPasswordErr = validate.validateNewPassword(
      inputs.newPasswordInput,
      inputs.currPasswordInput,
    );

    try {
      if (
        !fNameErr &&
        !lNameErr &&
        !emailErr &&
        !phoneNoErr &&
        !currPasswordErr &&
        !newPasswordErr
      ) {
        const userData = {
          uid: currUser?.uid,
          fName: inputs?.fNameInput,
          lName: inputs?.lNameInput,
          email: inputs?.emailInput,
          phoneNo: inputs?.phoneNoInput,
        };
        updateUserData(userData);
        handleUpdateEmailAndPassword();
        setIsLoading(false);
        navigation.navigate('MyProfile');
        Toast.show('User details updated successfully!', Toast.LONG);
        setInputs({
          ...inputs,
          fNameInput: null,
          lNameInput: null,
          emailInput: null,
          phoneNoInput: null,
          currPasswordInput: null,
          newPasswordInput: null,
        });
        setError({
          ...error,
          fNameError: '',
          lNameError: '',
          emailError: '',
          phoneNoError: '',
          currPasswordError: '',
          newPasswordError: '',
        });
      } else {
        setIsLoading(false);
        setError({
          ...error,
          fNameError: fNameErr,
          lNameError: lNameErr,
          emailError: emailErr,
          phoneNoError: phoneNoErr,
          currPasswordError: currPasswordErr,
          newPasswordError: newPasswordErr,
        });
      }
    } catch (err) {
      setIsLoading(false);
      console.log('Error in Updating Details : ', err.message);
      Alert.alert('', 'Error in Updating Details : ', err.message);
    }
  };

  return (
    <SafeAreaView style={GLOBAL_STYLES.containerStyle}>
      <View style={GLOBAL_STYLES.containerStyle}>
        <AppHeader back={true} title="Edit Profile" />
        <ScrollView
          style={GLOBAL_STYLES.containerStyle}
          keyboardShouldPersistTaps="handled">
          <View
            style={[
              GLOBAL_STYLES.containerStyle,
              {padding: 10, marginTop: '0%'},
            ]}>
            <KeyboardAvoidingView style={{marginTop: '5%'}} enabled>
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
                  editable={false}
                  customStyle={{backgroundColor: COLORS.gray300}}
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
                    currPasswordInputRef.current &&
                    currPasswordInputRef.current.focus()
                  }
                />
                <Text style={styles.errorTextStyle}>{error.phoneNoError}</Text>
              </View>
              <View style={styles.textInputContainerStyle}>
                <PasswordTextInput
                  value={inputs.currPasswordInput}
                  onChange={text => {
                    setInputs({...inputs, currPasswordInput: text});
                    setError({
                      ...error,
                      currPasswordError: validate.validatePassword(text),
                    });
                  }}
                  ref={currPasswordInputRef}
                  placeholder="Enter your current password"
                  onSubmitEditing={() =>
                    newPasswordInputRef.current &&
                    newPasswordInputRef.current.focus()
                  }
                  // onSubmitEditing={() => Keyboard.dismiss}
                  passwordVisible={isCurrPasswordVisible}
                  onVisibilityChange={() =>
                    setIsCurrPasswordVisible(!isCurrPasswordVisible)
                  }
                />
                <Text style={styles.errorTextStyle}>
                  {error.currPasswordError}
                </Text>
              </View>
              <View style={styles.textInputContainerStyle}>
                <PasswordTextInput
                  value={inputs.newPasswordInput}
                  onChange={text => {
                    setInputs({...inputs, newPasswordInput: text});
                    setError({
                      ...error,
                      newPasswordError: validate.validateNewPassword(
                        text,
                        inputs.currPasswordInput,
                      ),
                    });
                  }}
                  ref={newPasswordInputRef}
                  placeholder="Enter your new password"
                  onSubmitEditing={() => Keyboard.dismiss}
                  passwordVisible={isNewPasswordVisible}
                  onVisibilityChange={() =>
                    setIsNewPasswordVisible(!isNewPasswordVisible)
                  }
                />
                <Text style={styles.errorTextStyle}>
                  {error.newPasswordError}
                </Text>
              </View>
              <AppButton title="Sign Up" onPress={handleUpdate} />
            </KeyboardAvoidingView>
          </View>
        </ScrollView>
        <AppOverlayLoader
          isLoading={isLoading}
          isZindex={true}
          isBgWhite={true}
        />
      </View>
    </SafeAreaView>
  );
};

export default EditProfile;

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
