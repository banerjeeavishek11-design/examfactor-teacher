import React from 'react';
import { View, Text } from 'react-native';
// import { LinearGradient } from 'expo-linear-gradient';
import Svg, { Rect, Defs, Stop, Line, LinearGradient } from 'react-native-svg';
import { useTheme } from '@/theme';

const GradientBarChart = ({
  data,
  colors,
  width,
  height,
  borderRadius,
  xAxisTitle,
  yAxisTitle,
  labels,
}) => {
  const { fonts } = useTheme();
  const maxValue = Math.max(...data) * 1.1;
  const xAxisHeight = 20; // Height of the x-axis
  const yAxisWidth = 30; // Width of the y-axis
  const barWidth = (width - yAxisWidth) / data.length;
  const tickSize = 5;
  const singleBarWidth = 16;

  // Calculate y-axis labels
  const yAxisLabels = Array.from({ length: 4 }, (_, i) => (maxValue / 5) * (4 - i));

  return (
    <View
      style={{
        width: '100%',
        height: height + 80,
        backgroundColor: '#22222E',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 12,
        marginTop: 20,
      }}
    >
      <Text
        style={{
          position: 'absolute',
          color: '#96A7AF',
          left: 270,
          bottom: 290,
        }}
      >
        Last 7 Days
      </Text>
      <View
        style={{
          width,
          height,
          justifyContent: 'center',
          alignItems: 'center',
          position: 'absolute',
        }}
      >
        {/* Draw x-axis title */}
        <Text
          style={{
            position: 'absolute',
            left: width / 2 - 50,
            bottom: -28,
            color: '#96A7AF',
          }}
        >
          {xAxisTitle}
        </Text>

        {/* Draw y-axis title */}
        <Text
          style={{
            position: 'absolute',
            right: 265,
            bottom: 110,
            transform: [{ rotate: '-90deg' }],
            color: '#96A7AF',
          }}
        >
          {yAxisTitle}
        </Text>

        {/* Draw y-axis labels */}
        {yAxisLabels.map((label, index) => (
          <Text
            key={index}
            style={{
              position: 'absolute',
              left: 5,
              bottom: (index / (yAxisLabels.length - 1)) * (height - xAxisHeight) + 10,
              color: '#96A7AF',
            }}
          >
            {(55 - label).toFixed(0)}
          </Text>
        ))}
      </View>
      <Svg width={width} height={height}>
        {/* Define gradient */}
        <Defs>
          <LinearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
            {colors.map((color, index) => (
              <Stop
                key={index}
                offset={`${(index / (colors.length - 1)) * 100}%`}
                stopColor={color}
              />
            ))}
          </LinearGradient>
        </Defs>

        {labels?.map((label, index) => {
          const w = barWidth / 1.1;
          return (
            <View
              style={{
                position: 'absolute',
                // bottom: 10,
                top: 235,
                left: index * barWidth + yAxisWidth + barWidth / 2 - w / 2 - 8,
                width: w,
                alignItems: 'center',
              }}
              key={index}
            >
              <Text
                style={[
                  fonts.size_12,
                  {
                    color: '#96A7AF',
                  },
                ]}
              >
                {label}
              </Text>
            </View>
          );
        })}

        {/* Draw bars */}
        {data.map((value, index) => (
          <Rect
            key={index}
            x={index * barWidth + yAxisWidth + barWidth / 2 - singleBarWidth - 1}
            y={height - (value / maxValue) * (height - xAxisHeight) - xAxisHeight - 1}
            width={singleBarWidth}
            height={(value / maxValue) * (height - xAxisHeight)}
            fill="url(#gradient)"
            rx={borderRadius}
            ry={borderRadius}
          />
        ))}

        {/* Draw x-axis */}
        <Line
          x1={yAxisWidth}
          y1={height - xAxisHeight}
          x2={width}
          y2={height - xAxisHeight}
          stroke="#474752"
          strokeWidth={1}
        />

        {/* Draw y-axis */}
        <Line
          x1={yAxisWidth}
          y1={0}
          x2={yAxisWidth}
          y2={height - xAxisHeight}
          stroke="#474752"
          strokeWidth={1}
        />

        {/* Draw y-axis tick marks */}
        {yAxisLabels.map((_, index) => (
          <Line
            key={index}
            x1={yAxisWidth - tickSize}
            y1={(index / (yAxisLabels.length - 1)) * (height - xAxisHeight)}
            x2={yAxisWidth}
            y2={(index / (yAxisLabels.length - 1)) * (height - xAxisHeight)}
            stroke="#474752"
            strokeWidth={1}
          />
        ))}
      </Svg>
    </View>
  );
};

export default GradientBarChart;
