import React from 'react';
import {View, Text, StyleSheet, FlatList, Image} from 'react-native';
import {GLOBAL_STYLES, COLORS, FONTS} from '../../../constants/Theme';
import ProductHorizontalCard from '../../../components/ProductHorizontalCard';

const AllProductList = ({data}) => {
  const renderItem = ({item}) => {
    return <ProductHorizontalCard data={item} />;
  };
  return (
    <View>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={item => item?.id.toString()}
        initialNumToRender={10}
      />
    </View>
  );
};

export default AllProductList;

const styles = StyleSheet.create({});
