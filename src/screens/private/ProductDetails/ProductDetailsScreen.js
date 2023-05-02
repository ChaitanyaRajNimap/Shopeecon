import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Image,
  Alert,
} from 'react-native';
import {GLOBAL_STYLES, COLORS, FONTS} from '../../../constants/Theme';
import {useSelector, useDispatch} from 'react-redux';
import auth from '@react-native-firebase/auth';
import AppHeader from '../../../components/AppHeader';
import AppCarousel from '../../../components/AppCarousel';
import AppButton from '../../../components/AppButton';
import ProductCounter from '../../../components/ProductCounter';
import {addProduct} from '../../../redux/features/addToCart/addToCartSlice';

const ProductDetailsScreen = ({route, navigation}) => {
  const {productData} = route.params;
  const dispatch = useDispatch();
  const myCart = useSelector(state => state?.addToCart?.myCart);
  const uid = auth()?.currentUser?.uid;

  const [isAddToCart, setIsAddToCart] = useState(false);
  const [productCount, setProductCount] = useState(1);

  const incrementProductCount = () =>
    setProductCount(prevCount => prevCount + 1);

  const decrementProductCount = () =>
    setProductCount(prevCount => prevCount - 1);

  const addToCart = product => {
    let orderId = myCart.length + 1;
    let productToAdd = {
      ...product,
      uid: uid,
      orderId: orderId,
    };
    console.log('ADD TO CART PRODUCT : ', productToAdd);
    dispatch(addProduct(productToAdd));
    console.log('Product added to cart successfully!');
    // Alert.alert('', 'Product added to cart successfully!');
    navigation.navigate('Home');
  };

  return (
    <SafeAreaView style={GLOBAL_STYLES.containerStyle}>
      <ScrollView
        style={GLOBAL_STYLES.containerStyle}
        nestedScrollEnabled={true}>
        <View style={styles.containerStyle}>
          <AppHeader back={true} title="Product Details" />
          <AppCarousel data={productData?.images} />
          <Text style={styles.headingStyle}>{productData?.title}</Text>
          <Text style={styles.subHeading}>{productData?.brand}</Text>
          <Text style={styles.description}>{productData?.description}</Text>
          <View style={styles.priceAndRatingViewStyle}>
            <Text style={styles.priceStyle}>${productData?.price}</Text>
            <View style={styles.ratingContainerStyle}>
              <Text style={{fontSize: FONTS.largeBold, marginRight: 5}}>
                {productData?.rating}
              </Text>
              <Image
                source={require('../../../assets/images/star-green.png')}
                style={styles.ratingIconStyle}
              />
            </View>
          </View>

          {!isAddToCart ? (
            <AppButton
              title="ADD TO CART"
              onPress={() => {
                // setIsAddToCart(true);
                addToCart(productData);
              }}
              customButtonStyle={{marginHorizontal: 0}}
            />
          ) : (
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}>
              <ProductCounter
                customStyle={{width: '30%'}}
                productCount={productCount}
                incrementProductCount={incrementProductCount}
                decrementProductCount={decrementProductCount}
              />
              <View style={{width: '60%'}}>
                <AppButton
                  title="Continue"
                  onPress={() => {
                    // navigation.navigate('MyCart', {
                    //   item: productData,
                    //   count: productCount,
                    // })
                  }}
                  customButtonStyle={{marginHorizontal: 0}}
                />
              </View>
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ProductDetailsScreen;

const styles = StyleSheet.create({
  containerStyle: {
    flex: 1,
    padding: 10,
    paddingHorizontal: 20,
    overflow: 'hidden',
  },
  headingStyle: {
    ...GLOBAL_STYLES.headingStyle,
    marginBottom: 5,
    alignSelf: 'flex-start',
  },
  subHeading: {
    marginBottom: 10,
    color: COLORS.black100,
    fontSize: FONTS.xlargeFontSize,
    fontWeight: 'bold',
  },
  description: {
    marginBottom: 20,
    textAlign: 'left',
    color: COLORS.gray300,
    fontSize: FONTS.largeBoldx,
  },
  priceStyle: {
    color: COLORS.black100,
    fontSize: FONTS.xxlargeFontSize,
    fontWeight: 'bold',
  },
  ratingIconStyle: {
    width: 20,
    height: 20,
  },
  priceAndRatingViewStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  ratingContainerStyle: {
    padding: 5,
    paddingHorizontal: 10,
    borderRadius: 25,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.gray200,
  },
});
