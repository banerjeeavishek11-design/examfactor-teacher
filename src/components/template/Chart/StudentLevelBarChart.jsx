import React from "react";
import { View, Text } from "react-native";
import Svg, { Rect, Defs, Stop, Line, LinearGradient } from "react-native-svg";

const StudentLevelBarChart = ({
  data,
  colors,
  width,
  height,
  borderRadius,
  xAxisTitle,
  yAxisTitle,
}) => {
  const maxValue = Math.max(...data.flat()) * 1.05;
  const xAxisHeight = 20; // Height of the x-axis
  const yAxisWidth = 35; // Width of the y-axis
  const barWidth = (width - yAxisWidth) / data[0].length;
  const tickSize = 5;
  const singleBarWidth = 10;
  const spacing = 6;

  // Calculate y-axis labels
  const yAxisLabels = Array.from(
    { length: 5 },
    (_, i) => (maxValue / 4) * (4 - i)
  );

  return (
    <View
      style={{
        width: "100%",
        height: height + 30,
        backgroundColor: "#22222E",
        justifyContent: "center",
        alignItems: "center",
        padding: 0,
        position: "relative",
        borderRadius: 12,
        marginTop: "5%",
      }}
    >
      <View
        style={{
          width: "40%",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <View
            style={{
              width: 6,
              height: 6,
              borderRadius: 2,
              backgroundColor: "#27D4FA",
              right: 9,
            }}
          />
          <Text
            style={{
              position: "absolute",
              color: "#96A7AF",
            }}
          >
            Achievable Score
          </Text>
        </View>
        <View style={{ flexDirection: "row", alignItems: "center", right: 5 }}>
          <View
            style={{
              width: 6,
              height: 6,
              borderRadius: 2,
              backgroundColor: "#FF575F",
              right: 9,
            }}
          />
          <Text
            style={{
              position: "absolute",
              //   top: 20,
              //   left: 200,
              color: "#96A7AF",
            }}
          >
            Total Study Time
          </Text>
        </View>
      </View>

      {/* <Text
        style={{
          position: "absolute",
          bottom: 320,
          //   left: 200,
          color: "#96A7AF",
        }}
      >
        {yAxisTitle}
      </Text> */}

      <View
        style={{
          width,
          height,
          justifyContent: "center",
          alignItems: "center",
          position: "absolute",
          backgroundColor: "transparent",
        }}
      >
        {/* Draw x-axis title */}
        <Text
          style={{
            position: "absolute",
            left: width / 2 - 20,
            bottom: -10,
            color: "#96A7AF",
          }}
        >
          {xAxisTitle}
        </Text>

        {/* Draw y-axis title */}
        <Text
          style={{
            position: "absolute",
            left: -yAxisWidth - 30,
            bottom: height / 2 - 20,
            transform: [{ rotate: "-90deg" }],
            color: "#96A7AF",
          }}
        >
          {yAxisTitle}
        </Text>

        {/* Draw y-axis labels */}
        {/* {yAxisLabels.reverse().map((label, index) => (
          <Text
            key={label}
            style={{
              position: 'absolute',
              left: 5,
              bottom: (index / (yAxisLabels.length - 1)) * (height - xAxisHeight)+10,
              color: "#BBBBBB"
            }}
          >
            {label.toFixed(0)}
          </Text>
        ))} */}
      </View>

      <View
        style={{
          width,
          height,
          justifyContent: "center",
          alignItems: "center",
          position: "absolute",
          backgroundColor: "transparent",
        }}
      >
        {/* data.map((series, oIndex) => {
          // if(oIndex == 0 ) return null;
          return series.map((value, index) => {
            const _x =
              index * barWidth +
              yAxisWidth +
              barWidth / 2 +
              oIndex * singleBarWidth +
              oIndex * spacing -
              (singleBarWidth * data.length) / 2 -
              (data.length - 1) * spacing;
            _y =
              height -
              (value / maxValue) * (height - xAxisHeight) -
              xAxisHeight -
              1;
            height = (value / maxValue) * (height - xAxisHeight);

            return (
              <Text
                key={index + 'text-' + oIndex}
                style={{ position: "absolute" ,left: _x, top: _y, color: "white" }}>
                {value}
              </Text>
            );
          });
        }) */}
      </View>
      <Svg width={width} height={height} style={{ right: 20 }}>
        {/* Define gradient */}
        <Defs>
          {colors.map((_colors, idx) => (
            <LinearGradient
              id={`gradient-${idx}`}
              x1="0%"
              y1="0%"
              x2="0%"
              y2="100%"
            >
              {_colors.map((color, index) => (
                <Stop
                  key={index}
                  offset={`${(index / (_colors.length - 1)) * 100}%`}
                  stopColor={color}
                />
              ))}
            </LinearGradient>
          ))}
        </Defs>

        {/* Draw bars */}
        {data.map((series, oIndex) => {
          // if(oIndex == 0 ) return null;
          return series.map((value, index) => (
            <Rect
              key={value}
              x={
                index * barWidth +
                yAxisWidth +
                barWidth / 2 +
                oIndex * singleBarWidth +
                oIndex * spacing -
                (singleBarWidth * data.length) / 2 -
                (data.length - 1) * spacing
              }
              y={
                height -
                (value / maxValue) * (height - xAxisHeight) -
                xAxisHeight -
                1
              }
              width={singleBarWidth}
              height={(value / maxValue) * (height - xAxisHeight)}
              fill={`url(#gradient-${oIndex})`}
              rx={borderRadius}
              ry={borderRadius}
            />
          ));
        })}
        {/* data.map((_value, index) => {
          const value = _value * .56
          return <Rect
            key={index}
            x={index * barWidth + yAxisWidth + barWidth/2 +1}
            y={height - (value / maxValue) * (height - xAxisHeight) - xAxisHeight-1}
            width={singleBarWidth}
            height={(value / maxValue) * (height - xAxisHeight)}
            fill="url(#gradient)"
            rx={borderRadius}
            ry={borderRadius}
          />
        })  */}

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

        {/* <View
          style={{
            position: "absolute",
            right: 0,
            top: 0,
            bottom: 0,
          }}
        >
          <Line
            x1={width - yAxisWidth}
            y1={0}
            x2={width - yAxisWidth}
            y2={height - xAxisHeight}
            stroke="#474752"
            strokeWidth={1}
          />
        </View> */}

        {/* Draw x-axis tick marks */}
        {/* {data[0].map((_, index) => (
          <Line
            key={index}
            x1={index * barWidth + yAxisWidth + barWidth / 2}
            y1={height - xAxisHeight}
            x2={index * barWidth + yAxisWidth + barWidth / 2}
            y2={height - xAxisHeight + tickSize}
            stroke="#CCCCCC"
            strokeWidth={1}
          />
        ))} */}

        {/* Draw y-axis tick marks */}
        {/* {yAxisLabels.map((_, index) => (
          <Line
            key={index}
            x1={yAxisWidth - tickSize}
            y1={(index / (yAxisLabels.length - 1)) * (height - xAxisHeight)}
            x2={yAxisWidth}
            y2={(index / (yAxisLabels.length - 1)) * (height - xAxisHeight)}
            stroke="#CCCCCC"
            strokeWidth={1}
          />
        ))} */}
      </Svg>
    </View>
  );
};

export default StudentLevelBarChart;
