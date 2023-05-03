import React from 'react';
import {View, Text, StyleSheet, SafeAreaView} from 'react-native';
import {GLOBAL_STYLES, COLORS, FONTS} from '../../../constants/Theme';
import AppHeader from '../../../components/AppHeader';

const EditProfile = () => {
  return (
    <SafeAreaView style={GLOBAL_STYLES.containerStyle}>
      <View style={GLOBAL_STYLES.containerStyle}>
        <AppHeader back={true} title="Edit Profile" />
        <Text style={GLOBAL_STYLES.headingStyle}>Edit Profile Screen</Text>
      </View>
    </SafeAreaView>
  );
};

export default EditProfile;

const styles = StyleSheet.create({});
