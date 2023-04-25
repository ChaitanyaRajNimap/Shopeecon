import React from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import {GLOBAL_STYLES, COLORS, FONTS} from '../constants/Theme';

const ProductHorizontalCard = ({data}) => {
  return (
    <TouchableOpacity
      style={styles.cardContainerStyle}
      onPress={() => console.log(`${data?.title} Pressed!`)}>
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
    marginVertical: 5,
    marginHorizontal: 20,
    backgroundColor: COLORS.white300,
    flexDirection: 'row',
    justifyContent: 'space-between',
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
});
