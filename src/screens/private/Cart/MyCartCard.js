import React, {useState} from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import {GLOBAL_STYLES, COLORS, FONTS} from '../../../constants/Theme';
import {useSelector, useDispatch} from 'react-redux';
import AppButton from '../../../components/AppButton';
import ProductCounter from '../../../components/ProductCounter';
import {removeProduct} from '../../../redux/features/addToCart/addToCartSlice';
import database from '@react-native-firebase/database';

const MyCartCard = ({item}) => {
  const dispatch = useDispatch();
  const [productCount, setProductCount] = useState(1);
  const [isItemActive, setIsItemActive] = useState(false);

  const incrementProductCount = () =>
    setProductCount(prevCount => prevCount + 1);
  const decrementProductCount = () =>
    setProductCount(prevCount => prevCount - 1);

  const totalPrice = item => {
    let price = item?.price - item?.price * (item?.discountPercentage / 100);
    let total = price * productCount + 5;
    return total.toFixed(2);
  };

  const storeOrder = async data => {
    try {
      let idx1 = data?.uid;
      let idx2 = data?.orderId;
      const res = await database().ref(`orders/${idx1}/${idx2}`).set({data});
      console.log('res of storing order : ', res);
    } catch (err) {
      console.log('Error in storing order : ', err?.message);
    }
  };

  const createOrder = item => {
    let order = {
      uid: item?.uid,
      orderId: item?.orderId,
      product: item?.title,
      brand: item?.brand,
      quantity: productCount,
      totalAmount: totalPrice(item),
    };
    console.log('ORDERRRR : ', order);
  };

  return (
    <View style={isItemActive ? styles.itemContainerStyle : {flex: 1}}>
      <TouchableOpacity
        style={
          !isItemActive
            ? styles.cardContainerStyle
            : styles.activeCardContainerStyle
        }
        onPress={() => setIsItemActive(!isItemActive)}>
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
              {isItemActive ? (
                <ProductCounter
                  customStyle={{width: '100%'}}
                  productCount={productCount}
                  incrementProductCount={incrementProductCount}
                  decrementProductCount={decrementProductCount}
                />
              ) : null}
            </View>
          </View>
        </>
      </TouchableOpacity>

      {isItemActive ? (
        <>
          <View>
            <View
              style={[
                GLOBAL_STYLES.containerStyle,
                {
                  borderBottomWidth: 0.5,
                  borderBottomColor: COLORS.gray200,
                  paddingVertical: '4%',
                },
              ]}>
              <View style={styles.billContainerStyle}>
                <Text style={styles.billLableStyle}>Subtotal : </Text>
                <Text style={styles.billNumberStyle}>
                  ${item?.price * productCount}
                </Text>
              </View>
              <View style={styles.billContainerStyle}>
                <Text style={styles.billLableStyle}>Delivery Fee : </Text>
                <Text style={styles.billNumberStyle}>$5</Text>
              </View>
              <View style={styles.billContainerStyle}>
                <Text style={styles.billLableStyle}>Discount : </Text>
                <Text style={styles.billNumberStyle}>
                  {item?.discountPercentage}%
                </Text>
              </View>
            </View>
            <View
              style={[
                styles.billContainerStyle,
                {
                  paddingVertical: '2%',
                  borderBottomWidth: 0.5,
                  borderBottomColor: COLORS.gray300,
                },
              ]}>
              <Text style={styles.billLableStyle}>Total : </Text>
              <Text style={styles.billNumberStyle}>${totalPrice(item)}</Text>
            </View>
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
                setIsItemActive(false);
                dispatch(removeProduct(item));
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
                setIsItemActive(false);
                createOrder(item);
              }}
              customButtonStyle={{
                width: '45%',
                marginTop: 0,
                marginHorizontal: 0,
              }}
            />
          </View>
        </>
      ) : null}
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 0.5,
    borderBottomColor: COLORS.gray300,
  },
  imageStyle: {
    width: 100,
    height: 100,
    borderRadius: 10,
  },
  titleStyle: {
    marginBottom: 5,
    fontSize: FONTS.xxlargeFontSize,
    fontWeight: 'bold',
  },
  brandNameStyle: {
    marginBottom: 5,
    fontSize: FONTS.largeFontSize,
  },
  priceTextStyle: {
    marginBottom: 5,
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
    fontSize: FONTS.largeBold,
    fontWeight: '600',
    color: COLORS.gray200,
  },
  billNumberStyle: {
    fontSize: FONTS.largeBold,
    fontWeight: 'bold',
    color: COLORS.black200,
  },
});
