import React, {useState, useRef} from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  Image,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import {GLOBAL_STYLES, COLORS, FONTS} from '../constants/Theme';

const screenWidth = Dimensions.get('window').width;

const AppCarousel = ({data}) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const flatListRef = useRef(null);

  const scrollToIndex = index => {
    flatListRef.current.scrollToIndex({animated: true, index});
  };

  const renderItem = ({item}) => {
    return (
      <View style={[GLOBAL_STYLES.rootContainerStyle, {borderRadius: 10}]}>
        <Image source={{uri: `${item}`}} style={styles.imageStyle} />
      </View>
    );
  };

  const renderPointer = ({item, index}) => {
    return (
      <View style={GLOBAL_STYLES.rootContainerStyle}>
        <TouchableOpacity
          onPress={() => {
            scrollToIndex(index);
          }}>
          <View
            style={{
              width: activeIndex === index ? 30 : 15,
              height: 15,
              backgroundColor:
                activeIndex === index ? COLORS.green200 : COLORS.gray200,
              marginHorizontal: 10,
              borderRadius: 25,
            }}></View>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View
      style={[
        GLOBAL_STYLES.rootContainerStyle,
        {marginBottom: 10, borderRadius: 10, overflow: 'hidden'},
      ]}>
      <FlatList
        data={data}
        ref={flatListRef}
        renderItem={renderItem}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        pagingEnabled={true}
        onScroll={e => {
          const slideSize = e.nativeEvent.layoutMeasurement.width;
          const index = Math.round(e.nativeEvent.contentOffset.x / slideSize);
          setActiveIndex(index);
        }}
      />
      <FlatList
        data={data}
        renderItem={renderPointer}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        pagingEnabled={true}
      />
    </View>
  );
};

export default AppCarousel;

const styles = StyleSheet.create({
  imageStyle: {
    width: screenWidth - 40,
    height: 350,
    marginBottom: 15,
  },
});
