import React from 'react';
import {View, StyleSheet, TextInput, Image} from 'react-native';
import {GLOBAL_STYLES, COLORS, FONTS} from '../constants/Theme';

const SearchBox = props => {
  const handleTextChange = value => {
    props.setSearchValue(value);
  };
  return (
    <View style={[styles.searchBoxStyle, props.customStyle]}>
      <TextInput
        placeholder="Search"
        value={props.search}
        onChangeText={handleTextChange}
        style={styles.searchBoxTextInputStyle}
      />
      <Image
        source={require('../assets/images/search-gray.png')}
        style={styles.searchImageStyle}
      />
    </View>
  );
};

export default SearchBox;

const styles = StyleSheet.create({
  searchBoxStyle: {
    padding: 10,
    borderWidth: 0.5,
    borderColor: COLORS.gray300,
    borderRadius: 10,
    margin: 10,
    marginHorizontal: 15,
    flexDirection: 'row',
    backgroundColor: COLORS.white300,
  },
  searchBoxTextInputStyle: {
    flex: 1,
    marginTop: 1,
    marginLeft: '2%',
    color: COLORS.gray200,
    fontSize: FONTS.largeFontSize,
  },
  searchImageStyle: {
    width: 25,
    height: 25,
    marginLeft: 10,
    alignSelf: 'center',
  },
});
