import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Image,
} from 'react-native';
import {GLOBAL_STYLES, COLORS, FONTS} from '../../../constants/Theme';
import AppHeader from '../../../components/AppHeader';
import AppCarousel from '../../../components/AppCarousel';
import AppButton from '../../../components/AppButton';
import ProductCounter from '../../../components/ProductCounter';

const ProductDetailsScreen = ({route}) => {
  const {productData} = route.params;

  const [isAddToCart, setIsAddToCart] = useState(false);
  const [productCount, setProductCount] = useState(0);

  console.log('Product Data : ===> ', productData);

  const incrementProductCount = () =>
    setProductCount(prevCount => prevCount + 1);

  const decrementProductCount = () =>
    setProductCount(prevCount => prevCount - 1);

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
                setIsAddToCart(true);
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
                  title="ADD"
                  onPress={() => {}}
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
