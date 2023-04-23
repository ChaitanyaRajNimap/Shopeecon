import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Button,
} from 'react-native';
import auth from '@react-native-firebase/auth';
import * as Keychain from 'react-native-keychain';
import database from '@react-native-firebase/database';
import {useSelector, useDispatch} from 'react-redux';
import {fetchAllProducts} from '../redux/features/allProducts/allProductsSlice';
import {fetchProductCategories} from '../redux/features/productCategory/productCategorySlice';
import {GLOBAL_STYLES, COLORS, FONTS} from '../constants/Theme';
import AppOverlayLoader from '../components/AppOverlayLoader';

const HomeScreen = ({navigation, onSignOut}) => {
  const dispatch = useDispatch();
  const allProducts = useSelector(
    state => state?.allProducts?.allProducts?.products,
  );
  const productCategory = useSelector(
    state => state?.productCategory?.category,
  );
  const [userDetails, setUserDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    setTimeout(() => {
      getUserToken();
    }, 1000);
    dispatch(fetchAllProducts());
    dispatch(fetchProductCategories());
  }, []);

  const getUserToken = async () => {
    try {
      const userDetails = await Keychain.getGenericPassword();
      if (userDetails) {
        if (userDetails?.password) {
          getUserDetails(userDetails?.password);
        }
      } else {
        console.log('User Details Not Found');
      }
    } catch (err) {
      console.log("Keychain couldn't be accessed!", err);
    }
  };

  const getUserDetails = async uid => {
    try {
      const res = await database().ref(`users/${uid}`).once('value');
      if (res.val()) {
        setIsLoading(false);
        setUserDetails(res.val());
      }
    } catch (err) {
      console.log('Error in getting user data ====> ', err.message);
    }
  };

  return (
    <SafeAreaView style={GLOBAL_STYLES.containerStyle}>
      <ScrollView style={GLOBAL_STYLES.containerStyle}>
        <Text style={GLOBAL_STYLES.headingStyle}>Home Screen!</Text>
        <Text style={GLOBAL_STYLES.headingStyle}>
          {userDetails?.data?.fName + ' ' + userDetails?.data?.lName}
        </Text>
        <Text style={GLOBAL_STYLES.headingStyle}>
          {userDetails?.data?.email}
        </Text>
        <Button
          title="Sign Out"
          onPress={async () => {
            await Keychain.resetGenericPassword();
            await auth().signOut();
            onSignOut();
          }}
        />
        {/* {productCategory
          ? productCategory.map((item, index) => (
              <Text key={index.toString()}>{item}</Text>
            ))
          : null} */}

        {/* {allProducts
          ? allProducts.map(item => (
              <Text key={item?.id}>{item?.id + ', ' + item?.title}</Text>
            ))
          : null} */}
      </ScrollView>
      <AppOverlayLoader
        isLoading={isLoading}
        isZindex={true}
        isBgWhite={true}
      />
    </SafeAreaView>
  );
};

export default HomeScreen;
