import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  FlatList,
  TouchableOpacity,
  Button,
  LogBox,
  Image,
} from 'react-native';
import auth from '@react-native-firebase/auth';
import * as Keychain from 'react-native-keychain';
import database from '@react-native-firebase/database';
import {useSelector, useDispatch} from 'react-redux';
import {fetchAllProducts} from '../../../redux/features/allProducts/allProductsSlice';
import {fetchProductCategories} from '../../../redux/features/productCategory/productCategorySlice';
import {GLOBAL_STYLES, COLORS, FONTS} from '../../../constants/Theme';
import AppOverlayLoader from '../../../components/AppOverlayLoader';
import SearchBox from '../../../components/SearchBox';
import AllProductList from './AllProductList';

LogBox.ignoreLogs([
  'VirtualizedLists should never be nested inside plain ScrollViews with the same orientation because it can break windowing and other functionality - use another VirtualizedList-backed container instead.',
]);

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
  const [search, setSearch] = useState('');

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

  const setSearchValue = value => {
    setSearch(value);
  };

  const renderCategoryItem = ({item}) => {
    return (
      <View style={styles.categoryBadgeContainerStyle}>
        <TouchableOpacity onPress={() => console.log(item)}>
          <Text style={styles.categoryBadgeTextStyle}>{item}</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <SafeAreaView style={GLOBAL_STYLES.containerStyle}>
      <ScrollView
        style={GLOBAL_STYLES.containerStyle}
        nestedScrollEnabled={true}>
        <View style={styles.containerStyle}>
          <SearchBox setSearchValue={setSearchValue} />
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <TouchableOpacity>
              <Image
                source={require('../../../assets/images/filter-black.png')}
                style={styles.filterIconStyle}
              />
            </TouchableOpacity>
            <FlatList
              data={productCategory}
              renderItem={renderCategoryItem}
              keyExtractor={(item, idx) => idx.toString()}
              horizontal={true}
            />
          </View>

          <AllProductList data={allProducts} />

          {/* <Button
            title="Sign Out"
            onPress={async () => {
              await Keychain.resetGenericPassword();
              await auth().signOut();
              onSignOut();
            }}
          /> */}
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
        </View>
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

const styles = StyleSheet.create({
  containerStyle: {
    flex: 1,
    padding: 10,
    overflow: 'hidden',
  },
  categoryBadgeContainerStyle: {
    padding: 10,
    backgroundColor: COLORS.white300,
    margin: 5,
    borderRadius: 10,
  },
  categoryBadgeTextStyle: {
    color: COLORS.black200,
    fontSize: FONTS.largeFontSize,
    fontWeight: 'bold',
    textTransform: 'capitalize',
  },
  filterIconStyle: {
    width: 25,
    height: 25,
    padding: 10,
    backgroundColor: COLORS.white300,
    margin: 5,
    borderRadius: 10,
  },
});
