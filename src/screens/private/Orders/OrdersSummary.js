import React from 'react';
import {View, Text, StyleSheet, SafeAreaView, ScrollView} from 'react-native';
import {GLOBAL_STYLES, COLORS, FONTS} from '../../../constants/Theme';
import {useSelector, useDispatch} from 'react-redux';
import auth from '@react-native-firebase/auth';
import AppHeader from '../../../components/AppHeader';
import AppOverlayLoader from '../../../components/AppOverlayLoader';
import database from '@react-native-firebase/database';

const OrdersSummary = () => {
  const uid = auth()?.currentUser?.uid;
  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState(false);

  return (
    <SafeAreaView style={GLOBAL_STYLES.containerStyle}>
      <ScrollView
        style={GLOBAL_STYLES.containerStyle}
        nestedScrollEnabled={true}>
        <View style={GLOBAL_STYLES.containerStyle}>
          <AppHeader back={false} title="Order Summary" />
        </View>
      </ScrollView>
      <AppOverlayLoader
        isLoading={isLoading}
        isZindex={true}
        isBgWhite={false}
      />
    </SafeAreaView>
  );
};

export default OrdersSummary;
