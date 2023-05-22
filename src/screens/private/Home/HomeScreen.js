import React, {useEffect, useState, useCallback} from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  LogBox,
  Image,
  Modal,
} from 'react-native';
import auth from '@react-native-firebase/auth';
import * as Keychain from 'react-native-keychain';
import database from '@react-native-firebase/database';
import {useSelector, useDispatch} from 'react-redux';
import {useFocusEffect} from '@react-navigation/native';
import {fetchAllProducts} from '../../../redux/features/allProducts/allProductsSlice';
import {fetchProductCategories} from '../../../redux/features/productCategory/productCategorySlice';
import {fetchProductByCategory} from '../../../redux/features/productByCategory/productByCategorySlice';
import {GLOBAL_STYLES, COLORS, FONTS} from '../../../constants/Theme';
import AppOverlayLoader from '../../../components/AppOverlayLoader';
import SearchBox from '../../../components/SearchBox';
import AllProductList from './AllProductList';
import AppButton from '../../../components/AppButton';

LogBox.ignoreLogs([
  'VirtualizedLists should never be nested inside plain ScrollViews with the same orientation because it can break windowing and other functionality - use another VirtualizedList-backed container instead.',
]);

const HomeScreen = ({navigation, onSignOut}) => {
  const dispatch = useDispatch();
  const reducerData = useSelector(state => state);
  const [userDetails, setUserDetails] = useState(null);
  const [productData, setProductData] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const [productCategory, setProductCategory] = useState([]);
  const [productByCategory, setProductByCategory] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [search, setSearch] = useState('');
  const [isCategorySelected, setIsCategorySelected] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [sortBy, setSortBy] = useState(null);

  useFocusEffect(
    useCallback(() => {
      setIsLoading(true);
      setTimeout(() => {
        getUserToken();
      }, 1000);
      dispatch(fetchAllProducts());
      dispatch(fetchProductCategories());
    }, []),
  );

  useFocusEffect(
    useCallback(() => {
      if (reducerData?.allProducts?.allProducts?.products) {
        setAllProducts(reducerData?.allProducts?.allProducts?.products);
        setProductData(reducerData?.allProducts?.allProducts?.products);
      }
      if (reducerData?.productCategory?.category) {
        setProductCategory(reducerData?.productCategory?.category);
      }
      setIsLoading(false);
    }, [reducerData]),
  );

  useFocusEffect(
    useCallback(() => {
      if (reducerData?.productByCategory?.productByCategory) {
        setProductByCategory(reducerData?.productByCategory?.productByCategory);
        if (isCategorySelected) {
          setProductData(reducerData?.productByCategory?.productByCategory);
        } else {
          setProductData(reducerData?.allProducts?.allProducts?.products);
        }
      }
    }, [reducerData?.productByCategory]),
  );

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
        // setIsLoading(false);
        setUserDetails(res.val());
      }
    } catch (err) {
      console.log('Error in getting user data ====> ', err.message);
    }
  };

  const getProductByCategory = item => {
    // setIsLoading(true);
    dispatch(fetchProductByCategory(item));
    setIsCategorySelected(!isCategorySelected);
    setSelectedCategory(item);
  };

  const setSearchValue = value => {
    setSearch(value);
    filterSearchData(value);
  };

  const filterSearchData = text => {
    setIsLoading(true);
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
    setIsLoading(false);
  };

  const sortDataBy = pref => {
    let results = [];
    let data = isCategorySelected ? productByCategory : allProducts;
    setIsLoading(true);
    if (pref == 'asc') {
      results = [...data].sort((a, b) => a.price - b.price);
    } else {
      results = [...data].sort((a, b) => b.price - a.price);
    }
    setProductData(results);
    setIsLoading(false);
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
        <TouchableWithoutFeedback
          onPress={() => {
            Keyboard.dismiss();
            setIsModalVisible(false);
          }}>
          <>
            <View style={styles.toolbarStyles}>
              <TouchableOpacity onPress={() => setIsModalVisible(true)}>
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
              {productData ? <AllProductList data={productData} /> : null}
            </View>
          </>
        </TouchableWithoutFeedback>
      </View>
      <Modal
        animationType="slide"
        visible={isModalVisible}
        onRequestClose={() => setIsModalVisible(false)}
        transparent>
        <View style={GLOBAL_STYLES.rootContainerStyle}>
          <View style={styles.cardContainerStyle}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginHorizontal: '6%',
              }}>
              <Text
                style={[
                  GLOBAL_STYLES.headingStyle,
                  {
                    marginBottom: 0,
                    alignSelf: 'flex-start',
                    fontSize: FONTS.largeBold,
                  },
                ]}>
                Sort By
              </Text>
              <TouchableOpacity onPress={() => setIsModalVisible(false)}>
                <Image
                  source={require('../../../assets/images/close-black.png')}
                  style={{width: 20, height: 20}}
                />
              </TouchableOpacity>
            </View>
            <AppButton
              title="Price : low to high"
              onPress={() => {
                setIsModalVisible(false);
                sortDataBy('asc');
              }}
              customButtonStyle={styles.sortButtonStyle}
              customButtonTextStyle={styles.sortButtomTextStyle}
            />
            <AppButton
              title="Price : high to low"
              onPress={() => {
                setIsModalVisible(false);
                sortDataBy('desc');
              }}
              customButtonStyle={styles.sortButtonStyle}
              customButtonTextStyle={styles.sortButtomTextStyle}
            />
          </View>
        </View>
      </Modal>
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
    overflow: 'hidden',
  },
  toolbarStyles: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: '4%',
  },
  categoryBadgeContainerStyle: {
    padding: 7,
    backgroundColor: COLORS.white300,
    margin: 5,
    borderWidth: 0.5,
    borderColor: COLORS.gray300,
    borderRadius: 10,
  },
  categoryBadgeTextStyle: {
    color: COLORS.black200,
    fontSize: FONTS.normalFontSize,
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
  cardContainerStyle: {
    width: '70%',
    height: '24%',
    padding: 10,
    borderRadius: 10,
    borderWidth: 0.5,
    borderColor: COLORS.gray300,
    marginVertical: 5,
    marginHorizontal: 20,
    justifyContent: 'center',
    backgroundColor: COLORS.white300,
  },
  sortButtonStyle: {
    padding: 10,
    marginVertical: 5,
    backgroundColor: COLORS.white300,
    borderWidth: 0.5,
    borderColor: COLORS.gray300,
  },
  sortButtomTextStyle: {
    color: COLORS.black200,
    fontWeight: '600',
    fontSize: FONTS.normalFontSize,
  },
});
