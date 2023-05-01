import React, {useState} from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import {GLOBAL_STYLES, COLORS, FONTS} from '../constants/Theme';

const ProductCounter = ({
  customStyle,
  productCount,
  incrementProductCount,
  decrementProductCount,
}) => {
  return (
    <View
      style={{
        marginTop: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        ...customStyle,
      }}>
      <TouchableOpacity
        onPress={() => decrementProductCount()}
        disabled={productCount === 0 ? true : false}>
        <Image
          source={
            productCount === 0
              ? require('../assets/images/minus-border.png')
              : require('../assets/images/minus-filled.png')
          }
          style={{width: 35, height: 35}}
        />
      </TouchableOpacity>
      <Text style={{fontSize: FONTS.largeBoldx}}>{productCount}</Text>
      <TouchableOpacity
        onPress={() => incrementProductCount()}
        disabled={productCount >= 5 ? true : false}>
        <Image
          source={
            productCount >= 5
              ? require('../assets/images/plus-border.png')
              : require('../assets/images/plus-filled.png')
          }
          style={{width: 35, height: 35}}
        />
      </TouchableOpacity>
    </View>
  );
};

export default ProductCounter;

const styles = StyleSheet.create({});
