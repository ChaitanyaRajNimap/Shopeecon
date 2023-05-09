import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Alert,
} from 'react-native';
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
  // const [isItemActive, setIsItemActive] = useState(false);
  const [isItemActive, setIsItemActive] = useState(true);

  const incrementProductCount = () =>
    setProductCount(prevCount => prevCount + 1);
  const decrementProductCount = () =>
    setProductCount(prevCount => prevCount - 1);

  const totalPrice = item => {
    let price = item?.price - item?.price * (item?.discountPercentage / 100);
    let total = price * productCount + 5;
    return total.toFixed(2);
  };

  const storeOrder = async order => {
    try {
      let idx1 = order?.uid;
      let idx2 = order?.orderId;
      const res = await database()
        .ref(`orders/${idx1}/${idx2}`)
        .set({order})
        .then(() => {
          console.log('Order added to database!');
          removeItemFromCart(item?.cartItem);
          dispatch(removeProduct(item?.cartItem));
          // dispatch(addOrder(order));
          Toast.show('Order placed successfully!', Toast.LONG);
        });
    } catch (err) {
      console.log('Error in storing order : ', err?.message);
    }
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
    storeOrder(order);
  };

  // console.log('ITEM : ', item?.cartItem);
  // console.log('ITEM : ', item);

  const removeItemFromCart = async cartItem => {
    try {
      let idx1 = cartItem?.uid;
      let idx2 = cartItem?.orderId;
      const res = await database()
        .ref(`mycart/${idx1}/${idx2}`)
        .remove()
        .then(() => {
          console.log('Cart item removed!');
          navigation.navigate('Home');
          Toast.show('Product removed from cart successfully!', Toast.LONG);
        });
    } catch (err) {
      console.log('Error in removing cart item ', err);
      Alert.alert(
        'Alert',
        'Error whie removing product from cart',
        err?.message,
      );
    }
  };

  return (
    <View style={isItemActive ? styles.itemContainerStyle : {flex: 1}}>
      <TouchableOpacity
        style={
          !isItemActive
            ? styles.cardContainerStyle
            : styles.activeCardContainerStyle
        }
        onPress={() => {
          // setIsItemActive(!isItemActive)
          setIsItemActive(true);
        }}>
        <>
          <View style={{width: '35%'}}>
            {item?.cartItem?.images?.[1] ? (
              <Image
                source={{uri: `${item?.cartItem?.images?.[1]}`}}
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
                {item?.cartItem?.title ? item?.cartItem?.title : '--'}
              </Text>
              <Text style={styles.brandNameStyle}>
                {item?.cartItem?.brand ? item?.cartItem?.brand : '--'}
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
                  ${item?.cartItem?.price * productCount}
                </Text>
              </View>
              <View style={styles.billContainerStyle}>
                <Text style={styles.billLableStyle}>Delivery Fee : </Text>
                <Text style={styles.billNumberStyle}>$5</Text>
              </View>
              <View style={styles.billContainerStyle}>
                <Text style={styles.billLableStyle}>Discount : </Text>
                <Text style={styles.billNumberStyle}>
                  {item?.cartItem?.discountPercentage}%
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
              <Text style={styles.billNumberStyle}>
                ${totalPrice(item?.cartItem)}
              </Text>
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
                // setIsItemActive(false);
                setIsItemActive(true);
                // dispatch(removeProduct(item?.cartItem));
                removeItemFromCart(item?.cartItem);
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
                // setIsItemActive(false);
                setIsItemActive(true);
                createOrder(item?.cartItem);
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
