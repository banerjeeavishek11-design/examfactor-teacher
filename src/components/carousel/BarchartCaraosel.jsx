/* eslint-disable @typescript-eslint/no-unused-vars */
import { View, Dimensions, StyleSheet, FlatList } from 'react-native';
import React from 'react';
import HomeBarCard from '../card/HomeBarCard';
import { useTheme } from '../../theme';

// const storage = new MMKV();

// const SLIDER_WIDTH = Dimensions.get("window").width;
// const ITEM_WIDTH = Math.round(SLIDER_WIDTH);
const { width } = Dimensions.get('window');
const ITEM_LENGTH = width * 0.92;

const BarchartCaraosel = ({
  data,
  colors,
  width,
  height,
  barBorderRadius,
  otherStyles,
  xAxisTitle,
  yAxisTitle,
  labels,
}) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const { layout } = useTheme();

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        renderItem={({ item, index }) => {
          const dynamicYAxisTitle = index === 0 ? 'Achievable Score %' : 'Achievable Time Spent %';
          return (
            <View
              key={index}
              style={{
                width: ITEM_LENGTH,
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <HomeBarCard
                data={[item]}
                colors={colors}
                width={width}
                height={height}
                otherStyles={otherStyles}
                barBorderRadius={barBorderRadius}
                xAxisTitle={xAxisTitle}
                yAxisTitle={dynamicYAxisTitle}
                labels={labels}
              />
            </View>
          );
        }}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item, i) => `${i}`}
        pagingEnabled
        onMomentumScrollEnd={(event) => {
          const newIndex = Math.round(event.nativeEvent.contentOffset.x / ITEM_LENGTH);
          setSelectedIndex(newIndex);
        }}
      />
      <View style={[layout.row, layout.itemsCenter, layout.justifyCenter, styles.pagination]}>
        {data.map((item, index) => {
          return (
            <View
              key={index}
              style={{
                marginTop: 5,
                width: selectedIndex === index ? 20 : 8,
                height: selectedIndex === index ? 10 : 8,
                borderRadius: selectedIndex === index ? 5 : 4,
                backgroundColor: selectedIndex === index ? '#FFFFFF' : 'gray',
                marginLeft: 5,
              }}
            ></View>
          );
        })}
      </View>
    </View>
  );
};

export default BarchartCaraosel;

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '5%',
    marginBottom: '2%',
  },
});
