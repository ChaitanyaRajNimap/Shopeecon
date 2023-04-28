import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  FlatList,
} from 'react-native';
import {GLOBAL_STYLES, COLORS, FONTS} from '../../../constants/Theme';
import AppHeader from '../../../components/AppHeader';

const ProductDetailsScreen = ({route}) => {
  const {productData} = route.params;

  console.log('Product Data : ===> ', productData);

  return (
    <SafeAreaView style={GLOBAL_STYLES.containerStyle}>
      <ScrollView
        style={GLOBAL_STYLES.containerStyle}
        nestedScrollEnabled={true}>
        <View style={styles.containerStyle}>
          <AppHeader back={true} title="Product Details" />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ProductDetailsScreen;

const styles = StyleSheet.create({
  containerStyle: {
    flex: 1,
    padding: 10,
    overflow: 'hidden',
  },
});
