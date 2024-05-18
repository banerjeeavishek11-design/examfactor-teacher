import React, { useState, useRef } from 'react';
import { View, ScrollView, Dimensions, StyleSheet, TouchableOpacity } from 'react-native';
import { PanGestureHandler, State } from 'react-native-gesture-handler';
import { BarChart } from '@/components/template';

const { width } = Dimensions.get('window');

const barchartColor = ['#7AF4FC', '#27D4FA'];
const chartwidth = 300;
const chartheight = 250;
const borderRadius = 5;
const yAxisTitle = 'No. of students';
const labelsForStudyTime = ['0-10', '11-30', '31-60', '60+'];
const labelsForScore = ['<60', '60-80', '81-90', '90+'];

const Caraosal = ({ scoreChartData, studyTimeChartData }) => {
  const scrollViewRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const DATA = [
    {
      actualData: scoreChartData,
      xAxisTitle: 'Achievable Score (%)',
      labels: labelsForScore,
    },
    {
      actualData: studyTimeChartData,
      xAxisTitle: 'Study Time (Min)',
      labels: labelsForStudyTime,
    },
  ];

  const handleSwipe = (event) => {
    if (event.nativeEvent.state === State.END) {
      const { translationX } = event.nativeEvent;
      if (translationX > 50 && activeIndex > 0) {
        scrollViewRef.current.scrollTo({ x: (activeIndex - 1) * width, animated: true });
        setActiveIndex(activeIndex - 1);
      } else if (translationX < -50 && activeIndex < DATA.length - 1) {
        scrollViewRef.current.scrollTo({ x: (activeIndex + 1) * width, animated: true });
        setActiveIndex(activeIndex + 1);
      }
    }
  };

  const handlePaginationPress = (index) => {
    scrollViewRef.current.scrollTo({ x: index * width, animated: true });
    setActiveIndex(index);
  };

  return (
    <PanGestureHandler onGestureEvent={handleSwipe}>
      <View style={styles.container}>
        <ScrollView
          ref={scrollViewRef}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          style={(styles.scrollView, { marginBottom: '3%' })}
          nestedScrollEnabled={true} // Ensure ScrollView can handle touches
        >
          {DATA.map((chartData, index) => (
            <View key={index} style={styles.chartContainer}>
              <BarChart
                actualData={chartData.actualData}
                colors={barchartColor}
                borderRadius={borderRadius}
                xAxisTitle={chartData.xAxisTitle}
                yAxisTitle={yAxisTitle}
                labels={chartData.labels}
                width={chartwidth}
                height={chartheight}
              />
            </View>
          ))}
        </ScrollView>
        <View style={styles.paginationContainer}>
          {DATA.map((_, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.paginationIndicator,
                activeIndex === index && styles.activePaginationIndicator,
              ]}
              onPress={() => handlePaginationPress(index)}
            />
          ))}
        </View>
      </View>
    </PanGestureHandler>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    width: '100%',
  },
  chartContainer: {
    width,
    flex: 1,
  },
  paginationContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 10,
  },
  paginationIndicator: {
    width: 9,
    height: 9,
    borderRadius: 5,
    backgroundColor: 'gray',
    marginHorizontal: 5,
  },
  activePaginationIndicator: {
    width: 18,
    height: 9,
    backgroundColor: 'white',
  },
});

export default Caraosal;
