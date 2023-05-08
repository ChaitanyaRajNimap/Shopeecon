import React, {useState, useEffect, useCallback} from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  FlatList,
} from 'react-native';
import {GLOBAL_STYLES, COLORS, FONTS} from '../../../constants/Theme';
import {useSelector, useDispatch} from 'react-redux';
import {useFocusEffect} from '@react-navigation/native';
import auth from '@react-native-firebase/auth';
import {fetchMyCart} from '../../../redux/features/addToCart/addToCartSlice';
import AppHeader from '../../../components/AppHeader';
import AppOverlayLoader from '../../../components/AppOverlayLoader';
import MyCartCard from './MyCartCard';
import database from '@react-native-firebase/database';

const MyCartScreen = ({route, navigation}) => {
  const uid = auth()?.currentUser?.uid;
  const dispatch = useDispatch();
  const reducerData = useSelector(state => state?.addToCart?.myCart);

  const [myCart, setMyCart] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    dispatch(fetchMyCart(uid));
  }, []);

  useEffect(() => {
    if (reducerData) {
      setMyCart(Object.values(reducerData));
    }
    setIsLoading(false);
    refreshCart();
  }, [reducerData]);

  // useFocusEffect(
  //   useCallback(() => {
  //     setIsLoading(true);
  //     dispatch(fetchMyCart(uid));
  //   }, []),
  // );

  // useFocusEffect(
  //   useCallback(() => {
  //     if (reducerData) {
  //       setMyCart(Object.values(reducerData));
  //     }
  //     setIsLoading(false);
  //     refreshCart();
  //   }, [reducerData]),
  // );

  const refreshCart = () => {
    database()
      .ref(`mycart/${uid}`)
      .on('value', snapshot => {
        if (snapshot.val()) {
          setMyCart(Object.values(snapshot.val()));
        }
      });
  };

  return (
    <SafeAreaView style={GLOBAL_STYLES.containerStyle}>
      <ScrollView
        style={GLOBAL_STYLES.containerStyle}
        nestedScrollEnabled={true}>
        <View style={GLOBAL_STYLES.containerStyle}>
          <AppHeader back={false} title="My Cart" />
          {myCart.length > 0 ? (
            <FlatList
              data={myCart}
              renderItem={({item}) => <MyCartCard item={item} />}
              keyExtractor={(item, idx) => idx.toString()}
            />
          ) : (
            <View style={styles.cardContainerStyle}>
              <Text style={styles.errorTextStyle}>
                Cart is empty add some items to cart.
              </Text>
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

export default MyCartScreen;

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
  errorTextStyle: {
    color: COLORS.red200,
    fontSize: FONTS.largeBoldx,
    fontWeight: 'bold',
  },
});
