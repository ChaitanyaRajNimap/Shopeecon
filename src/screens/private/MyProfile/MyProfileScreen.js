import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Image,
  TouchableOpacity,
  Button,
} from 'react-native';
import {GLOBAL_STYLES, COLORS, FONTS} from '../../../constants/Theme';
import * as Keychain from 'react-native-keychain';
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
import AppHeader from '../../../components/AppHeader';
import AppButton from '../../../components/AppButton';

const MyProfileScreen = ({navigation, onSignOut}) => {
  const uid = auth()?.currentUser?.uid;
  const [userDetails, setUserDetails] = useState(null);

  useEffect(() => {
    if (uid) {
      getUserDetails(uid);
    }
  }, []);

  const getUserDetails = async uid => {
    try {
      const res = await database().ref(`users/${uid}`).once('value');
      if (res.val()) {
        setUserDetails(res.val()?.data);
      }
    } catch (err) {
      console.log('Error in getting user data ====> ', err.message);
    }
  };

  console.log('UDATA : ', userDetails);

  return (
    <SafeAreaView style={GLOBAL_STYLES.containerStyle}>
      <ScrollView
        style={GLOBAL_STYLES.containerStyle}
        nestedScrollEnabled={true}>
        <View style={GLOBAL_STYLES.containerStyle}>
          <AppHeader back={false} title="My Profile" />
          <View style={styles.nameCardStyle}>
            <View
              style={{
                width: '32.5%',
                backgroundColor: COLORS.white100,
                borderRadius: 55,
                padding: 5,
              }}>
              <Image source={require('../../../assets/images/person.png')} />
            </View>
            <View style={{width: '70%', alignItems: 'center'}}>
              <Text style={styles.headingStyle}>
                {userDetails?.fName + ` ` + userDetails?.lName}
              </Text>
            </View>
          </View>
          <View style={styles.cardContainerStyle}>
            <TouchableOpacity
              style={[styles.actionContainerStyle, {borderBottomWidth: 1}]}
              onPress={() => navigation.navigate('EditProfile')}>
              <Image
                source={require('../../../assets/images/edit.png')}
                style={styles.actionIconStyle}
              />
              <Text style={styles.actionTextStyle}>Edit Profile</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.actionContainerStyle}
              onPress={() => navigation.navigate('OrdersScreen')}>
              <Image
                source={require('../../../assets/images/shoppingbag.png')}
                style={styles.actionIconStyle}
              />
              <Text style={styles.actionTextStyle}>Your Orders</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.cardContainerStyle}>
            <TouchableOpacity
              style={styles.actionContainerStyle}
              onPress={async () => {
                await Keychain.resetGenericPassword();
                await auth().signOut();
                onSignOut();
              }}>
              <Image
                source={require('../../../assets/images/logout.png')}
                style={styles.actionIconStyle}
              />
              <Text style={styles.actionTextStyle}>Sign Out</Text>
            </TouchableOpacity>
          </View>
          {/* <Text style={GLOBAL_STYLES.headingStyle}>{userDetails?.email}</Text>
          <Text style={GLOBAL_STYLES.headingStyle}>{userDetails?.phoneNo}</Text> */}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default MyProfileScreen;

const styles = StyleSheet.create({
  cardContainerStyle: {
    padding: 10,
    borderRadius: 10,
    borderWidth: 0.5,
    borderColor: COLORS.gray300,
    marginVertical: 5,
    marginHorizontal: 20,
    backgroundColor: COLORS.white300,
  },
  nameCardStyle: {
    flex: 1,
    padding: 15,
    borderRadius: 10,
    borderWidth: 0.5,
    borderColor: COLORS.gray300,
    marginVertical: 5,
    marginHorizontal: 20,
    backgroundColor: COLORS.white300,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  headingStyle: {
    color: COLORS.black100,
    fontSize: FONTS.xxxlargeFontSize,
    fontWeight: 'bold',
  },
  actionContainerStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 15,
    borderBottomColor: COLORS.gray300,
  },
  actionIconStyle: {width: 25, height: 25, marginRight: '5%'},
  actionTextStyle: {fontSize: FONTS.xlargeFontSize, fontWeight: '600'},
});
