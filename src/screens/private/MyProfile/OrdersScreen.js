import React from 'react';
import {View, Text, StyleSheet, SafeAreaView} from 'react-native';
import {GLOBAL_STYLES, COLORS, FONTS} from '../../../constants/Theme';
import AppHeader from '../../../components/AppHeader';

const OrdersScreen = () => {
  return (
    <SafeAreaView style={GLOBAL_STYLES.containerStyle}>
      <View style={GLOBAL_STYLES.containerStyle}>
        <AppHeader back={true} title="My Orders" />
        <Text style={GLOBAL_STYLES.headingStyle}>Orders Screen</Text>
      </View>
    </SafeAreaView>
  );
};

export default OrdersScreen;

const styles = StyleSheet.create({});
