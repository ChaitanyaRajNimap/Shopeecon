import React, {useState} from 'react';
import {View, Text, StyleSheet, Image, Alert} from 'react-native';
import {GLOBAL_STYLES, COLORS, FONTS} from '../../../constants/Theme';
import {useSelector, useDispatch} from 'react-redux';
import AppButton from '../../../components/AppButton';
import ProductCounter from '../../../components/ProductCounter';
import {removeProduct} from '../../../redux/features/addToCart/addToCartSlice';
import {addOrder} from '../../../redux/features/myOrders/myOrdersSlice';
import database from '@react-native-firebase/database';
import {useNavigation} from '@react-navigation/native';
import Toast from 'react-native-simple-toast';

const MyCartCard = ({item}) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [productCount, setProductCount] = useState(1);

  const incrementProductCount = () =>
    setProductCount(prevCount => prevCount + 1);
  const decrementProductCount = () =>
    setProductCount(prevCount => prevCount - 1);

  const totalPrice = item => {
    let price = item?.price - item?.price * (item?.discountPercentage / 100);
    let total = price * productCount + 5;
    return total.toFixed(2);
  };

  const createOrder = item => {
    const options = {
      day: '2-digit',
      month: '2-digit',
      year: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    };
    const orderPlacedDate = new Intl.DateTimeFormat('en-GB', options).format(
      new Date(),
    );
    let order = {
      ...item,
      quantity: productCount,
      totalAmount: totalPrice(item),
      orderPlacedDate: orderPlacedDate,
    };
    console.log('ORDERRRR : ', order);
    navigation.navigate('OrdersSummary', {
      item: order,
    });
  };

  return (
    <View style={styles.itemContainerStyle}>
      <View style={styles.activeCardContainerStyle}>
        <>
          <View style={{width: '35%'}}>
            {item?.images?.[1] ? (
              <Image
                source={{uri: `${item?.images?.[1]}`}}
                style={styles.imageStyle}
              />
            ) : (
              <View
                style={[
                  styles.imageStyle,
                  {backgroundColor: COLORS.pink200},
                ]}></View>
            )}
          </View>
          <View style={{width: '65%'}}>
            <View>
              <Text style={styles.titleStyle}>
                {item?.title ? item?.title : '--'}
              </Text>
              <Text style={styles.brandNameStyle}>
                {item?.brand ? item?.brand : '--'}
              </Text>
            </View>
            <View
              style={{
                width: '60%',
              }}>
              <ProductCounter
                customStyle={{width: '100%'}}
                productCount={productCount}
                incrementProductCount={incrementProductCount}
                decrementProductCount={decrementProductCount}
              />
            </View>
          </View>
        </>
      </View>

      <View
        style={{
          paddingVertical: '3%',
          flexDirection: 'row',
          justifyContent: 'space-around',
        }}>
        <AppButton
          title="Remove"
          onPress={() => {
            dispatch(removeProduct(item));
            navigation.navigate('HomeScreen');
            console.log('Cart item removed!');
            Toast.show('Product removed from cart successfully!', Toast.LONG);
          }}
          customButtonStyle={{
            width: '45%',
            marginTop: 0,
            marginHorizontal: 0,
            backgroundColor: COLORS.red200,
          }}
        />
        <AppButton
          title="Buy"
          onPress={() => {
            createOrder(item);
          }}
          customButtonStyle={{
            width: '45%',
            marginTop: 0,
            marginHorizontal: 0,
          }}
        />
      </View>
    </View>
  );
};

export default MyCartCard;

const styles = StyleSheet.create({
  itemContainerStyle: {
    padding: 10,
    borderRadius: 10,
    borderWidth: 0.5,
    borderColor: COLORS.gray300,
    marginVertical: 5,
    marginHorizontal: 20,
    backgroundColor: COLORS.white300,
  },
  cardContainerStyle: {
    flex: 1,
    padding: 10,
    borderRadius: 10,
    borderWidth: 0.5,
    borderColor: COLORS.gray300,
    marginVertical: 5,
    marginHorizontal: 20,
    backgroundColor: COLORS.white300,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  activeCardContainerStyle: {
    paddingBottom: '5%',
    borderBottomWidth: 0.5,
    borderBottomColor: COLORS.gray300,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  imageStyle: {
    width: 80,
    height: 80,
    borderRadius: 10,
  },
  titleStyle: {
    marginBottom: 5,
    color: COLORS.black200,
    fontSize: FONTS.largeBold,
    fontWeight: 'bold',
  },
  brandNameStyle: {
    marginBottom: 5,
    color: COLORS.black200,
    fontSize: FONTS.normalFontSize,
  },
  priceTextStyle: {
    marginBottom: 10,
    fontSize: FONTS.xlargeFontSize,
    fontWeight: 'bold',
  },
  billContainerStyle: {
    margin: 5,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  billLableStyle: {
    color: COLORS.gray200,
    fontSize: FONTS.largeFontSize,
    fontWeight: '600',
  },
  billNumberStyle: {
    color: COLORS.black200,
    fontSize: FONTS.largeFontSize,
    fontWeight: 'bold',
  },
});
