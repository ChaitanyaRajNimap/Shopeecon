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
import AppOverlayLoader from '../../../components/AppOverlayLoader';
import database from '@react-native-firebase/database';
import AppButton from '../../../components/AppButton';
import {removeProduct} from '../../../redux/features/addToCart/addToCartSlice';
import Toast from 'react-native-simple-toast';

const OrdersSummary = ({navigation, route}) => {
  const uid = auth()?.currentUser?.uid;
  const dispatch = useDispatch();
  const {item} = route.params;

  const [isLoading, setIsLoading] = useState(false);

  const storeOrder = async order => {
    try {
      let idx1 = order?.uid;
      let idx2 = order?.orderId;
      const res = await database()
        .ref(`orders/${idx1}/${idx2}`)
        .set({order})
        .then(() => {
          console.log('Order added to database!');
          dispatch(removeProduct(item));
          navigation.navigate('HomeScreen');
          Toast.show('Order placed successfully!', Toast.LONG);
        });
    } catch (err) {
      console.log('Error in storing order : ', err?.message);
      Alert.alert('Error', 'Something went wrong while storing order!');
    }
  };

  return (
    <SafeAreaView style={GLOBAL_STYLES.containerStyle}>
      <ScrollView
        style={GLOBAL_STYLES.containerStyle}
        nestedScrollEnabled={true}>
        <View style={GLOBAL_STYLES.containerStyle}>
          <AppHeader back={true} title="Order Summary" />
          <View style={styles.itemContainerStyle}>
            <View style={styles.activeCardContainerStyle}>
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
              </View>
            </View>
            <View>
              <View
                style={[
                  GLOBAL_STYLES.containerStyle,
                  {
                    paddingVertical: '4%',
                    borderBottomWidth: 0.5,
                    borderBottomColor: COLORS.gray200,
                  },
                ]}>
                <View style={styles.billContainerStyle}>
                  <Text style={styles.billLableStyle}>Quantity : </Text>
                  <Text style={styles.billNumberStyle}>{item?.quantity}</Text>
                </View>
                <View style={styles.billContainerStyle}>
                  <Text style={styles.billLableStyle}>Price : </Text>
                  <Text style={styles.billNumberStyle}>${item?.price}</Text>
                </View>
                <View style={styles.billContainerStyle}>
                  <Text style={styles.billLableStyle}>Subtotal : </Text>
                  <Text style={styles.billNumberStyle}>
                    ${item?.price * item?.quantity}
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
                <Text style={styles.billNumberStyle}>${item?.totalAmount}</Text>
              </View>
            </View>
            <AppButton
              title="Place Order"
              onPress={() => {
                storeOrder(item);
              }}
            />
          </View>
        </View>
      </ScrollView>
      <AppOverlayLoader
        isLoading={isLoading}
        isZindex={true}
        isBgWhite={false}
      />
    </SafeAreaView>
  );
};

export default OrdersSummary;

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
