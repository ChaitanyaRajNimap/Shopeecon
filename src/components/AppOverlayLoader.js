import React from 'react';
import {View, Text, StyleSheet, ActivityIndicator} from 'react-native';
import {COLORS} from '../constants/Theme';

const AppOverlayLoader = ({isLoading = false, isZindex = false}) => {
  return (
    <>
      {isLoading ? (
        <View style={[styles.loadinContainer, {zIndex: isZindex ? 90 : 0}]}>
          <ActivityIndicator size="large" color={COLORS.green200} />
        </View>
      ) : null}
    </>
  );
};

export default AppOverlayLoader;

const styles = StyleSheet.create({
  loadinContainer: {
    flex: 1,
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
