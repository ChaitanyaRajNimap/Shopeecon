import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Image,
  TouchableWithoutFeedback,
} from 'react-native';
import {GLOBAL_STYLES, COLORS, FONTS} from '../../../constants/Theme';
import AppHeader from '../../../components/AppHeader';
import AppButton from '../../../components/AppButton';
import ProductCounter from '../../../components/ProductCounter';
import ProductHorizontalCard from '../../../components/ProductHorizontalCard';

const MyCartScreen = ({route, navigation}) => {
  const {item, count} = route.params;
  const [productCount, setProductCount] = useState(count);
  const [isItemActive, setIsItemActive] = useState(false);
  const incrementProductCount = () =>
    setProductCount(prevCount => prevCount + 1);

  const decrementProductCount = () =>
    setProductCount(prevCount => prevCount - 1);

  const totalPrice = () => {
    let price = item?.price - item?.price * (item?.discountPercentage / 100);
    let total = price * productCount + 5;
    return total.toFixed(2);
  };

  return (
    <SafeAreaView style={GLOBAL_STYLES.containerStyle}>
      <ScrollView
        style={GLOBAL_STYLES.containerStyle}
        nestedScrollEnabled={true}>
        <View style={GLOBAL_STYLES.containerStyle}>
          <AppHeader back={true} title="My Cart" />
          <View style={isItemActive ? styles.itemContainerStyle : null}>
            <TouchableWithoutFeedback
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
                <View style={{width: '32%'}}>
                  <Text style={styles.titleStyle}>
                    {item?.title ? item?.title : '--'}
                  </Text>
                  <Text style={styles.brandNameStyle}>
                    {item?.brand ? item?.brand : '--'}
                  </Text>
                  {/* <Text style={styles.priceTextStyle}>
                  ${item?.price ? item?.price : '--'}
                </Text> */}
                </View>
                <View
                  style={{
                    marginBottom: '1%',
                    width: '31%',
                    alignSelf: 'flex-end',
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
              </>
            </TouchableWithoutFeedback>

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
                    <Text style={styles.billNumberStyle}>${totalPrice()}</Text>
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
          {/* <View style={[styles.cardContainerStyle, {flexDirection: 'column'}]}>
            <View
              style={[
                GLOBAL_STYLES.containerStyle,
                {
                  borderBottomWidth: 0.5,
                  borderBottomColor: COLORS.gray200,
                  paddingBottom: 10,
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
            <View style={styles.billContainerStyle}>
              <Text style={styles.billLableStyle}>Total : </Text>
              <Text style={styles.billNumberStyle}>${totalPrice()}</Text>
            </View>
          </View> */}
          {/* <View
            style={[
              styles.cardContainerStyle,
              {justifyContent: 'space-around'},
            ]}>
            <AppButton
              title="Remove"
              onPress={() => {}}
              customButtonStyle={{
                width: '45%',
                marginTop: 0,
                marginHorizontal: 0,
                backgroundColor: COLORS.red200,
              }}
            />
            <AppButton
              title="Add"
              onPress={() => {}}
              customButtonStyle={{
                width: '45%',
                marginTop: 0,
                marginHorizontal: 0,
              }}
            />
          </View> */}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default MyCartScreen;

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
