import React, {useState} from 'react';
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
import AppHeader from '../../../components/AppHeader';
import MyCartCard from './MyCartCard';

const MyCartScreen = ({route, navigation}) => {
  const myCart = useSelector(state => state?.addToCart?.myCart);

  return (
    <SafeAreaView style={GLOBAL_STYLES.containerStyle}>
      <ScrollView
        style={GLOBAL_STYLES.containerStyle}
        nestedScrollEnabled={true}>
        <View style={GLOBAL_STYLES.containerStyle}>
          <AppHeader back={true} title="My Cart" />
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
