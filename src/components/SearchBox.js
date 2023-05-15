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
        placeholderTextColor={{color: COLORS.gray400}}
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
    padding: 7,
    borderWidth: 0.5,
    borderColor: COLORS.gray300,
    borderRadius: 10,
    margin: 10,
    marginHorizontal: 15,
    marginTop: 15,
    backgroundColor: COLORS.white300,
    flexDirection: 'row',
  },
  searchBoxTextInputStyle: {
    flex: 1,
    padding: 0,
    margin: 0,
    marginLeft: '2%',
    color: COLORS.black200,
    fontSize: FONTS.normalFontSize,
  },
  searchImageStyle: {
    width: 20,
    height: 20,
    marginLeft: '7%',
    alignSelf: 'center',
  },
});
