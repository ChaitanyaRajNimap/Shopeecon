import React from 'react';
import {View, Text, StyleSheet, FlatList, Image} from 'react-native';
import {GLOBAL_STYLES, COLORS, FONTS} from '../../../constants/Theme';
import ProductHorizontalCard from '../../../components/ProductHorizontalCard';

const AllProductList = ({data, stopLoading}) => {
  const renderItem = ({item}) => {
    return <ProductHorizontalCard data={item} />;
  };
  // stopLoading();
  return (
    <View>
      {data.length > 0 ? (
        <FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={item => item?.id.toString()}
          initialNumToRender={10}
        />
      ) : (
        <View style={styles.cardContainerStyle}>
          <Text style={styles.errorTextStyle}>Given product not found!</Text>
        </View>
      )}
    </View>
  );
};

export default AllProductList;

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
  errorTextStyle: {
    color: COLORS.red200,
    fontSize: FONTS.largeBoldx,
    fontWeight: 'bold',
  },
});
