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
import {addProduct} from '../../../redux/features/addToCart/addToCartSlice';
import database from '@react-native-firebase/database';
import Toast from 'react-native-simple-toast';

const ProductDetailsScreen = ({route, navigation}) => {
  const {productData} = route.params;
  const dispatch = useDispatch();
  const myCart = useSelector(state => state?.addToCart?.myCart);
  const uid = auth()?.currentUser?.uid;

  const generateOrderId = () => {
    const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let orderId = '';
    for (let i = 0; i < 6; i++) {
      orderId += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return orderId;
  };

  const addCartToDatabase = async cartItem => {
    try {
      let idx1 = cartItem?.uid;
      let idx2 = cartItem?.orderId;
      const res = await database()
        .ref(`mycart/${idx1}/${idx2}`)
        .set({cartItem})
        .then(() => {
          console.log('Cart item added to database!');
          navigation.navigate('MyCart');
          Toast.show('Product added to cart successfully!', Toast.LONG);
        });
    } catch (err) {
      console.log('Error in storing cart item : ', err?.message);
      Alert.alert('Alert', 'Error in adding product to cart ', err?.message);
    }
  };

  const addToCart = product => {
    // let orderId = myCart.length + 1;
    let orderId = generateOrderId();
    let productToAdd = {
      ...product,
      uid: uid,
      orderId: orderId,
    };
    console.log('ADD TO CART PRODUCT : ', productToAdd);
    addCartToDatabase(productToAdd);
    // dispatch(addProduct(productToAdd));
    // console.log('Product added to cart successfully!');
    // Alert.alert('', 'Product added to cart successfully!');
    // navigation.navigate('Home');
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

          <AppButton
            title="ADD TO CART"
            onPress={() => {
              // setIsAddToCart(true);
              addToCart(productData);
            }}
            customButtonStyle={{marginHorizontal: 0}}
          />
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
