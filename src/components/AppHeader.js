import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  Image,
} from 'react-native';
import {GLOBAL_STYLES, COLORS, FONTS} from '../constants/Theme';
import {useNavigation} from '@react-navigation/native';

const AppHeader = ({back, title, customStyle}) => {
  const navigation = useNavigation();

  return (
    <View style={{...customStyle}}>
      <StatusBar backgroundColor={COLORS.white100} barStyle="dark-content" />
      <View style={styles.headerViewStyle}>
        {back ? (
          <>
            <TouchableOpacity
              style={styles.leftBtnStyle}
              onPress={() => navigation.goBack()}>
              <Image
                source={require('../assets/images/left-arrow.png')}
                style={{height: 20, width: 20}}
              />
            </TouchableOpacity>
            <View style={[styles.headerContentStyle, {paddingRight: '10%'}]}>
              <Text style={styles.headerTextStyle}>{title}</Text>
            </View>
          </>
        ) : (
          <View style={styles.headerContentStyle}>
            <Text style={styles.headerTextStyle}>{title}</Text>
          </View>
        )}
      </View>
    </View>
  );
};

export default AppHeader;

const styles = StyleSheet.create({
  headerViewStyle: {
    height: 60,
    width: '100%',
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 8,
    alignItems: 'center',
    backgroundColor: COLORS.white200,
  },
  leftBtnStyle: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    width: 40,
  },
  headerContentStyle: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTextStyle: {
    fontSize: FONTS.xlargeFontSize,
    fontWeight: '700',
    color: COLORS.black200,
  },
});
