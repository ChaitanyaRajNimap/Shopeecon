import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  FlatList,
  Image,
} from 'react-native';
import {GLOBAL_STYLES, COLORS, FONTS} from '../../../constants/Theme';
import AppHeader from '../../../components/AppHeader';
import AppOverlayLoader from '../../../components/AppOverlayLoader';
import auth from '@react-native-firebase/auth';
import {fetchMyOrders} from '../../../redux/features/myOrders/myOrdersSlice';
import {useSelector, useDispatch} from 'react-redux';

const OrdersScreen = () => {
  const uid = auth()?.currentUser?.uid;
  const dispatch = useDispatch();
  const reducerData = useSelector(state => state?.myOrders?.myOrders);

  const [myOrders, setMyOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    dispatch(fetchMyOrders(uid));
  }, []);

  useEffect(() => {
    if (reducerData) {
      setMyOrders(Object.values(reducerData));
    }
    setIsLoading(false);
  }, [reducerData]);

  const renderItem = ({item}) => {
    return (
      <View style={styles.orderCardContainer}>
        <View style={{width: '35%'}}>
          {item?.order?.images?.[1] ? (
            <Image
              source={{uri: `${item?.order?.images?.[1]}`}}
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
        <View style={{width: '65%', justifyContent: 'space-between'}}>
          <View>
            <Text style={styles.titleStyle}>
              {item?.order?.title ? item?.order?.title : '--'}
            </Text>
            <Text style={styles.brandNameStyle}>
              {item?.order?.brand ? item?.order?.brand : '--'}
            </Text>
          </View>
          <View
            style={{
              width: '43%',
              padding: 5,
              borderRadius: 10,
              alignItems: 'center',
              backgroundColor: COLORS.green200,
            }}>
            <Text
              style={{
                color: COLORS.white100,
                fontSize: FONTS.normalFontSize,
                fontWeight: '600',
              }}>
              ORDERED
            </Text>
          </View>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={GLOBAL_STYLES.containerStyle}>
      <ScrollView
        style={GLOBAL_STYLES.containerStyle}
        nestedScrollEnabled={true}>
        <View style={GLOBAL_STYLES.containerStyle}>
          <AppHeader back={true} title="My Orders" />
          {myOrders.length > 0 ? (
            <FlatList
              data={myOrders}
              renderItem={renderItem}
              keyExtractor={(item, idx) => idx.toString()}
            />
          ) : (
            <View style={styles.cardContainerStyle}>
              <Text style={styles.errorTextStyle}>No orders made.</Text>
            </View>
          )}
        </View>
      </ScrollView>
      <AppOverlayLoader
        isLoading={isLoading}
        isZindex={true}
        isBgWhite={true}
      />
    </SafeAreaView>
  );
};

export default OrdersScreen;

const styles = StyleSheet.create({
  cardContainerStyle: {
    padding: 10,
    borderRadius: 10,
    borderWidth: 0.5,
    borderColor: COLORS.gray300,
    marginVertical: 5,
    marginHorizontal: 20,
    backgroundColor: COLORS.white300,
  },
  orderCardContainer: {
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
  imageStyle: {
    width: 80,
    height: 80,
    borderRadius: 10,
  },
  errorTextStyle: {
    color: COLORS.red200,
    fontSize: FONTS.largeFontSize,
    fontWeight: 'bold',
  },
  titleStyle: {
    color: COLORS.black200,
    fontSize: FONTS.largeBold,
    fontWeight: 'bold',
  },
  brandNameStyle: {
    marginBottom: '3%',
    color: COLORS.black200,
    fontSize: FONTS.largeFontSize,
  },
});
