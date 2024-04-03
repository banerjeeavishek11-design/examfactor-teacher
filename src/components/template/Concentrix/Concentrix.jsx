import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Svg, Path, Circle } from "react-native-svg";
import { useTheme } from "@/theme";

const Concentrix = (props) => {
  const {
    colors,
    variant,
    changeTheme,
    layout,
    gutters,
    fonts,
    components,
    backgrounds,
  } = useTheme();
  const { scorePercentage } = props;
  const strokeWidth = 5;
  const radius = 100;
  const targetRadius = 5;
  const lastCircleStrokeWidth = 8;
  const buffer = 4;
  const canvasSize = radius * 2 + strokeWidth + 28 + targetRadius + buffer;

  const centerX = canvasSize / 2;
  const centerY = canvasSize / 2;

  const targetAngle = (100 - scorePercentage) * 1.8;
  const targetX = centerX + radius * Math.cos((targetAngle * Math.PI) / 180);
  const targetY = centerY - radius * Math.sin((targetAngle * Math.PI) / 180);

  const getPathData = (_startAngle, _endAngle) => {
    const startAngleRad = (_startAngle * Math.PI) / 180;
    const endAngleRad = (_endAngle * Math.PI) / 180;
    const startX = centerX + radius * Math.cos(startAngleRad);
    const startY = centerY + radius * Math.sin(startAngleRad);
    const endX = centerX + radius * Math.cos(endAngleRad);
    const endY = centerY + radius * Math.sin(endAngleRad);
    const largeArcFlag = _endAngle - _startAngle <= 180 ? 0 : 1;

    return `M ${startX} ${startY} 
            A ${radius} ${radius} 0 ${largeArcFlag} 1 ${endX} ${endY}
          `;
  };

  const showCircles = true;
  return (
    <View>
      <Svg width={canvasSize} height={canvasSize}>
        <Path
          d={getPathData(-180, -125)}
          fill="none"
          stroke="#F26D0C"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
        />
        <Path
          d={getPathData(-115, -65)}
          fill="none"
          stroke="#FDD649"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
        />
        <Path
          d={getPathData(-55, 0)}
          fill="none"
          stroke="#3DD598"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
        />
        {showCircles && (
          <>
            <Circle
              cx={targetX}
              cy={targetY}
              r={targetRadius}
              fill="none"
              stroke="gray"
              strokeWidth={28}
            />
            <Circle
              cx={targetX}
              cy={targetY}
              r={targetRadius}
              fill="none"
              stroke="#fff"
              strokeWidth={18}
            />

            <Circle
              cx={targetX}
              cy={targetY}
              r={targetRadius}
              fill="none"
              stroke={
                scorePercentage >= 0 && scorePercentage <= 33.5
                  ? "#F26D0C"
                  : scorePercentage > 33.5 && scorePercentage <= 66.5
                  ? "#FDD649"
                  : "#3DD598"
              }
              strokeWidth={
                scorePercentage >= 0 && scorePercentage <= 33.5
                  ? 8
                  : scorePercentage > 33.5 && scorePercentage <= 66.5
                  ? 8
                  : 8
              }
            />
          </>
        )}
        <View style={[layout.itemsCenter, layout.justifyCenter]}>
          {scorePercentage ? (
            <Text
              style={[
                fonts.alignCenter,
                fonts.size_20,
                fonts.bold,
                {
                  color: colors.white,
                  marginTop: "20%",
                  fontFamily: "Poppins-Bold",
                },
              ]}
            >
              {scorePercentage}
              <Text style={[fonts.size_12,fonts.fontWeight_small,{color: colors.gray200}]}>/100</Text>
            </Text>
          ) : (
            <Text
              style={[
                fonts.alignCenter,
                fonts.size_20,
                fonts.bold,
                {
                  color: colors.white,
                  marginTop: "20%",
                  fontFamily: "Poppins-Bold",
                },
              ]}
            >
              0
            </Text>
          )}
          <Text
            style={[
              fonts.size_14,
              fonts.fontWeight_small,
              fonts.alignCenter,
              {
                color: colors.white,
                marginTop: "2%",
                fontFamily: "Poppins-Regular",
              },
            ]}
          >
            Average
          </Text>

          <Text
            style={[
              fonts.size_14,
              fonts.fontWeight_small,
              fonts.alignCenter,
              {
                color: colors.white,
                fontFamily: "Poppins-Regular",
              },
            ]}
          >
            Achievable Score
          </Text>

          <Text
            style={[
              fonts.size_12,
              fonts.fontWeight_small,
              fonts.alignCenter,
              {
                color: colors.white,
                width: "55%",
                fontFamily: "Poppins-Regular",
                opacity: 0.5,
              },
            ]}
          >
            based on concepts covered till date
          </Text>
        </View>
      </Svg>
    </View>
  );
};

export default Concentrix;

const styles = StyleSheet.create({});
