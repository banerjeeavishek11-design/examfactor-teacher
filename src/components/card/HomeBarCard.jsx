/* eslint-disable indent */
import React from 'react';
import { View, Text } from 'react-native';
// import { LinearGradient } from 'expo-linear-gradient';
import Svg, { Rect, Defs, Stop, Line, LinearGradient } from 'react-native-svg';

const HomeBarCard = ({
  data,
  colors,
  width,
  height,
  otherStyles,
  barBorderRadius,
  xAxisTitle,
  yAxisTitle,
  labels,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  legends,
}) => {
  if (!data || !data[0] || data[0].length === 0) {
    return <Text>No data</Text>;
  }

  const actLAb = xAxisTitle === 'Achievable Score %' ? labels[0] : labels[1];

  const innerHeight = height - 30;
  const innerWidth = width - 30;

  const maxValue = (Math.max(...data.flat()) || 1) * 1.05;
  const xAxisHeight = 40;
  const yAxisWidth = 35;
  const barWidth = (innerWidth - yAxisWidth) / data[0].length;
  const tickSize = 5;
  const singleBarWidth = 11;
  const spacing = 2;
  const axisLabelFontSize = 10;
  const axisTitleFontSize = 10;
  const fontFamily = 'Monospace';

  // Calculate y-axis labels
  const yAxisLabels = Array.from({ length: 5 }, (_, i) => (maxValue / 4) * (4 - i));

  return (
    <View
      style={{
        backgroundColor: '#22222D',
        justifyContent: 'center',
        alignItems: 'center',
        width,
        height,
        ...otherStyles,
      }}
    >
      <View
        style={{
          width: innerWidth,
          height: innerHeight,
          position: 'relative',
        }}
      >
        {!data || !data[0] || data[0].length === 0 ? (
          <View
            style={{
              width: innerWidth,
              height: innerHeight,
              justifyContent: 'center',
              alignItems: 'center',
              position: 'absolute',
              backgroundColor: 'transparent',
            }}
          >
            <Text>No data</Text>
          </View>
        ) : (
          <>
            <View
              style={{
                width: innerWidth,
                height: innerHeight,
                justifyContent: 'center',
                alignItems: 'center',
                position: 'absolute',
                backgroundColor: 'transparent',
              }}
            >
              {/* Draw x-axis title */}
              <View
                style={{
                  position: 'absolute',
                  left: yAxisWidth,
                  bottom: 5,
                  width: innerWidth - yAxisWidth,
                  alignItems: 'center',
                }}
              >
                <Text
                  style={{
                    color: '#BBBBBB',
                    fontFamily: fontFamily,
                    fontSize: axisTitleFontSize,
                    fontWeight: 700,
                  }}
                >
                  {xAxisTitle}
                </Text>
              </View>

              {/* Draw y-axis title */}
              <View
                style={{
                  position: 'absolute',
                  left: -(innerHeight - xAxisHeight) / 2,
                  top: innerHeight - xAxisHeight - innerHeight / 2 + 16,
                  transform: [{ rotate: '-90deg' }],
                  width: innerHeight - xAxisHeight,
                  alignItems: 'center',
                }}
              >
                <Text
                  style={{
                    color: '#BBBBBB',
                    fontFamily: fontFamily,
                    fontWeight: 700,
                    fontSize: axisTitleFontSize,
                  }}
                >
                  {yAxisTitle}
                </Text>
              </View>

              {/* Draw y-axis labels */}
              {yAxisLabels.reverse().map((label, index) => {
                const h = (innerHeight / yAxisLabels.length) * 0.7;
                return (
                  <View
                    key={index}
                    style={{
                      position: 'absolute',
                      left: yAxisWidth - 30,
                      width: 20,
                      bottom:
                        xAxisHeight / 2 +
                        (index / (yAxisLabels.length - 1)) * (innerHeight - xAxisHeight) +
                        5,
                      height: h,
                      justifyContent: 'center',
                      alignItems: 'flex-end',
                    }}
                  >
                    <Text
                      style={{
                        color: '#BBBBBB',
                        fontFamily: fontFamily,
                        fontSize: axisLabelFontSize,
                      }}
                    >
                      {maxValue < 2 ? label.toFixed(1) : label.toFixed(0)}
                    </Text>
                  </View>
                );
              })}

              {/* Draw x-axis labels */}
              {actLAb?.length
                ? actLAb.map((label, index) => {
                    const w = barWidth / 1.1;
                    return (
                      <View
                        style={{
                          position: 'absolute',
                          bottom: 20,
                          left: index * barWidth + yAxisWidth + barWidth / 2 - w / 2,
                          width: w,
                          alignItems: 'center',
                        }}
                        key={index}
                      >
                        <Text
                          style={{
                            color: '#BBBBBB',
                            fontFamily: fontFamily,
                            fontSize: axisLabelFontSize,
                          }}
                        >
                          {label}
                        </Text>
                      </View>
                    );
                  })
                : null}

              {data.map((series, oIndex) => {
                return (
                  <View
                    style={{ position: 'absolute', height: innerHeight, width: innerWidth }}
                    key={oIndex}
                  >
                    {series.map((value, index) => {
                      const _x =
                        index * barWidth +
                        yAxisWidth +
                        barWidth / 2 +
                        oIndex * singleBarWidth +
                        oIndex * spacing -
                        (singleBarWidth * data.length) / 2 -
                        (data.length - 1) * spacing;
                      const _y =
                        innerHeight -
                        (value / maxValue) * (innerHeight - xAxisHeight) -
                        xAxisHeight -
                        10 -
                        (value == 0 ? 5 : 0);

                      return (
                        <View
                          key={index}
                          style={{
                            position: 'absolute',
                            left: _x,
                            top: _y,
                            width: singleBarWidth,
                            alignItems: 'center',
                          }}
                        >
                          <Text
                            style={{
                              color: 'white',
                              fontSize: singleBarWidth * 0.6,
                              fontFamily,
                            }}
                          >
                            {value}
                          </Text>
                        </View>
                      );
                    })}
                  </View>
                );
              })}
            </View>
            <Svg width={innerWidth} height={innerHeight}>
              {/* Define gradient */}
              <Defs>
                {colors.map((_colors, idx) => (
                  <LinearGradient
                    id={`gradient-${idx}`}
                    x1="0%"
                    y1="0%"
                    x2="0%"
                    y2="100%"
                    key={idx}
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
                return series.map((value, index) => {
                  let _value = value;
                  if (_value === 0) {
                    _value = 0.03;
                  }
                  return (
                    <Rect
                      key={index}
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
                        innerHeight -
                        (_value / maxValue) * (innerHeight - xAxisHeight) -
                        xAxisHeight -
                        1
                      }
                      width={singleBarWidth}
                      height={(_value / maxValue) * (innerHeight - xAxisHeight)}
                      fill={`url(#gradient-${oIndex})`}
                      rx={barBorderRadius}
                      ry={barBorderRadius}
                    />
                  );
                });
              })}

              {/* Draw x-axis */}
              <Line
                x1={yAxisWidth}
                y1={innerHeight - xAxisHeight}
                x2={innerWidth}
                y2={innerHeight - xAxisHeight}
                stroke="white"
                strokeWidth={1}
              />

              {/* Draw y-axis */}
              <Line
                x1={yAxisWidth}
                y1={0}
                x2={yAxisWidth}
                y2={innerHeight - xAxisHeight}
                stroke="white"
                strokeWidth={1}
              />

              {/* Draw x-axis tick marks */}
              {data[0].map((_, index) => (
                <Line
                  key={index}
                  x1={index * barWidth + yAxisWidth + barWidth / 2}
                  y1={innerHeight - xAxisHeight}
                  x2={index * barWidth + yAxisWidth + barWidth / 2}
                  y2={innerHeight - xAxisHeight + tickSize}
                  stroke="#CCCCCC"
                  strokeWidth={1}
                />
              ))}

              {/* Draw y-axis tick marks */}
              {yAxisLabels.map((_, index) => (
                <Line
                  key={index}
                  x1={yAxisWidth - tickSize}
                  y1={(index / (yAxisLabels.length - 1)) * (innerHeight - xAxisHeight)}
                  x2={yAxisWidth}
                  y2={(index / (yAxisLabels.length - 1)) * (innerHeight - xAxisHeight)}
                  stroke="#CCCCCC"
                  strokeWidth={1}
                />
              ))}
            </Svg>
          </>
        )}
      </View>
    </View>
  );
};

export default HomeBarCard;
