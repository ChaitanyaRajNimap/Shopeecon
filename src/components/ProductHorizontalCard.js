import React from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import {GLOBAL_STYLES, COLORS, FONTS} from '../constants/Theme';
import {useNavigation} from '@react-navigation/native';

const ProductHorizontalCard = ({data}) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      style={styles.cardContainerStyle}
      onPress={() =>
        navigation.navigate('ProductDetails', {
          productData: data,
        })
      }>
      <View style={{width: '35%'}}>
        {data?.images?.[1] ? (
          <Image
            source={{uri: `${data?.images?.[1]}`}}
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
      <View style={{width: '63%'}}>
        <Text style={styles.titleStyle}>
          {data?.title ? data?.title : '--'}
        </Text>
        <Text style={styles.brandNameStyle}>
          {data?.brand ? data?.brand : '--'}
        </Text>
        <Text style={styles.priceTextStyle}>
          ${data?.price ? data?.price : '--'}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default ProductHorizontalCard;

const styles = StyleSheet.create({
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
  imageStyle: {
    width: 80,
    height: 80,
    borderRadius: 10,
  },
  titleStyle: {
    // marginBottom: 3,
    color: COLORS.black200,
    fontSize: FONTS.largeBold,
    fontWeight: 'bold',
  },
  brandNameStyle: {
    marginBottom: '3%',
    color: COLORS.black200,
    fontSize: FONTS.normalFontSize,
  },
  priceTextStyle: {
    marginBottom: 5,
    color: COLORS.black200,
    fontSize: FONTS.largeBold,
    fontWeight: 'bold',
  },
});
