import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  FlatList,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
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
import {fetchProductByCategory} from '../../../redux/features/productByCategory/productByCategorySlice';
import {GLOBAL_STYLES, COLORS, FONTS} from '../../../constants/Theme';
import AppOverlayLoader from '../../../components/AppOverlayLoader';
import SearchBox from '../../../components/SearchBox';
import AllProductList from './AllProductList';

LogBox.ignoreLogs([
  'VirtualizedLists should never be nested inside plain ScrollViews with the same orientation because it can break windowing and other functionality - use another VirtualizedList-backed container instead.',
]);

const HomeScreen = ({navigation, onSignOut}) => {
  const dispatch = useDispatch();
  const reducerData = useSelector(state => state);
  // const allProducts = useSelector(
  //   state => state?.allProducts?.allProducts?.products,
  // );
  // const productCategory = useSelector(
  //   state => state?.productCategory?.category,
  // );
  // const productByCategory = useSelector(
  //   state => state?.productByCategory?.productByCategory,
  // );
  const [userDetails, setUserDetails] = useState(null);
  const [productData, setProductData] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const [productCategory, setProductCategory] = useState([]);
  const [productByCategory, setProductByCategory] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [search, setSearch] = useState('');
  const [isCategorySelected, setIsCategorySelected] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    setTimeout(() => {
      getUserToken();
    }, 1000);
    dispatch(fetchAllProducts());
    dispatch(fetchProductCategories());
    // setIsLoading(false);
  }, []);

  useEffect(() => {
    if (reducerData?.allProducts?.allProducts?.products) {
      setAllProducts(reducerData?.allProducts?.allProducts?.products);
      setProductData(reducerData?.allProducts?.allProducts?.products);
    }
    if (reducerData?.productCategory?.category) {
      setProductCategory(reducerData?.productCategory?.category);
    }
    setIsLoading(false);
  }, [reducerData]);

  useEffect(() => {
    if (reducerData?.productByCategory?.productByCategory) {
      setProductByCategory(reducerData?.productByCategory?.productByCategory);
      if (isCategorySelected) {
        setProductData(reducerData?.productByCategory?.productByCategory);
      } else {
        setProductData(reducerData?.allProducts?.allProducts?.products);
      }
    }
  }, [reducerData?.productByCategory]);

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

  const getProductByCategory = item => {
    setIsLoading(true);
    dispatch(fetchProductByCategory(item));
    setIsCategorySelected(!isCategorySelected);
    setSelectedCategory(item);
  };

  const setSearchValue = value => {
    setSearch(value);
    filterSearchData(value);
  };

  const filterSearchData = text => {
    let results = [];
    if (text) {
      let data = isCategorySelected ? productByCategory : allProducts;
      results = data.filter(item => {
        if (
          item?.title.toLowerCase().includes(text.toLowerCase()) ||
          item?.brand.toLowerCase().includes(text.toLowerCase()) ||
          item?.category.toLowerCase().includes(text.toLowerCase())
        ) {
          return item;
        }
      });
      if (results) {
        setProductData(results);
      } else {
        setProductData([]);
      }
    } else {
      setProductData(allProducts);
    }
    console.log('Filter reached!');
  };

  const renderCategoryItem = ({item}) => {
    return (
      <View
        style={[
          styles.categoryBadgeContainerStyle,
          {
            backgroundColor:
              isCategorySelected && selectedCategory == item
                ? COLORS.blue200
                : COLORS.white300,
          },
        ]}>
        <TouchableOpacity onPress={() => getProductByCategory(item)}>
          <Text style={styles.categoryBadgeTextStyle}>{item}</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <SafeAreaView style={GLOBAL_STYLES.containerStyle}>
      <View style={GLOBAL_STYLES.containerStyle}>
        <SearchBox setSearchValue={setSearchValue} />
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
          <>
            <View style={styles.toolbarStyles}>
              <TouchableOpacity>
                <View style={styles.filterIconContainerStyle}>
                  <Image
                    source={require('../../../assets/images/filter-black.png')}
                    style={styles.filterIconStyle}
                  />
                </View>
              </TouchableOpacity>
              <FlatList
                data={productCategory}
                renderItem={renderCategoryItem}
                keyExtractor={(item, idx) => idx.toString()}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
              />
            </View>
            <View style={styles.containerStyle}>
              <AllProductList
                // data={isCategorySelected ? productByCategory : allProducts}
                data={productData}
              />

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
          </>
        </TouchableWithoutFeedback>
      </View>
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
    // padding: 10,
    overflow: 'hidden',
  },
  toolbarStyles: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: '4%',
  },
  categoryBadgeContainerStyle: {
    padding: 10,
    backgroundColor: COLORS.white300,
    margin: 5,
    borderWidth: 0.5,
    borderColor: COLORS.gray300,
    borderRadius: 10,
  },
  categoryBadgeTextStyle: {
    color: COLORS.black200,
    fontSize: FONTS.largeFontSize,
    fontWeight: 'bold',
    textTransform: 'capitalize',
  },
  filterIconContainerStyle: {
    margin: 5,
    padding: 7,
    borderRadius: 10,
    borderWidth: 0.5,
    borderColor: COLORS.gray300,
  },
  filterIconStyle: {
    width: 20,
    height: 20,
  },
});
