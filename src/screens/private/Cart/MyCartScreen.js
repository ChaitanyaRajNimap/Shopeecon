import React, {useState} from 'react';
import {
  View,
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
          <FlatList
            data={myCart}
            renderItem={({item}) => <MyCartCard item={item} />}
            keyExtractor={(item, idx) => idx.toString()}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default MyCartScreen;

const styles = StyleSheet.create({});
