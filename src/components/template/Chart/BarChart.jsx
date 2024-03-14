import React from "react";
import { View, StyleSheet } from "react-native";
import { Svg, Rect, Text } from "react-native-svg";

const BarChart = ({ data, colors }) => {
  const barWidth = 30;
  const chartHeight = 200;
  const chartWidth = (barWidth + 10) * data.length;

  return (
    <View style={styles.container}>
      <Svg width={chartWidth} height={chartHeight}>
        {data.map((value, index) => {
          const barHeight = (value / 100) * chartHeight;
          return (
            <React.Fragment key={index} >
              <Rect
                x={index * (barWidth + 10)}
                y={chartHeight - barHeight}
                width={barWidth}
                height={barHeight}
                fill={colors[index]}
                rx={10}
                ry={10}
              />
              <Text
                x={index * (barWidth + 10) + barWidth / 2}
                y={chartHeight - barHeight - 10}
                fill="white"
                fontSize="14"
                textAnchor="middle"
              >
                {value}
              </Text>
            </React.Fragment>
          );
        })}
      </Svg>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    backgroundColor: "#22222E",
    paddingBottom:'4%',
    borderRadius:12
  },
});

const data = [80, 40, 60, 80,]; // Example data for bar heights
const colors = Array(data.length).fill("#7AF4FC");  // Example colors for bars

export default function App() {
  return <BarChart data={data} colors={colors} />;
}


// import React, { useState } from 'react';
// import { Button, StyleSheet, View } from 'react-native';
// import { Canvas, Path, Text } from '@shopify/react-native-skia';
// // import * as d3 from 'd3';

// const BarChart = () => {
//   const [animationState, setAnimationState] = useState(0);

//   // const font = require("../../../Roboto-Bold.ttf");

//   const data = [
//     { label: "Jan", value: 50 },
//     { label: "Feb", value: 100 },
//     { label: "Mar", value: 350 },
//     { label: "Apr", value: 200 },
//     { label: "May", value: 550 },
//     { label: "Jun", value: 300 },
//     { label: "Jul", value: 150 },
//     { label: "Aug", value: 400 },
//     { label: "Sep", value: 450 },
//     { label: "Oct", value: 500 },
//     { label: "Nov", value: 250 },
//     { label: "Dec", value: 600 },
//   ];

//   const GRAPH_MARGIN = 20;
//   const GRAPH_BAR_WIDTH = 8;

//   const CanvasHeight = 350;
//   const CanvasWidth = 350;
//   const graphHeight = CanvasHeight - 2 * GRAPH_MARGIN;
//   const graphWidth = CanvasWidth - 2;

//   const xDomain = data.map((dataPoint) => dataPoint.label);
//   const xRange = [0, graphWidth];
//   // const x = d3.scalePoint().domain(xDomain).range(xRange).padding(1);

//   // const yDomain = [0, d3.max(data, (yDataPoint) => yDataPoint.value)];
//   const yRange = [0, graphHeight];
//   // const y = d3.scaleLinear().domain(yDomain).range(yRange);

//   const animate = () => {
//     setAnimationState(0);
//     // Code for animation goes here
//   };

//   const path = () => {
//     const newPath = new Path();

//     data.forEach((dataPoint) => {
//       const rect = { x: x(dataPoint.label) - GRAPH_BAR_WIDTH / 2, y: graphHeight, width: GRAPH_BAR_WIDTH, height: y(dataPoint.value * animationState) * -1 };

//       newPath.addRect(rect.x, rect.y, rect.width, rect.height);
//     });

//     return newPath;
//   };

//   return (
//     <View style={styles.container}>
//       <Canvas style={styles.canvas}>
//         <Path path={path()} color="purple" />
//         {data.map((dataPoint) => (
//           <Text
//             key={dataPoint.label}
//             x={x(dataPoint.label) - 10}
//             y={CanvasHeight - 25}
//             text={dataPoint.label}
//           />
//         ))}
//       </Canvas>
//       <Button title="Animate!" onPress={animate} />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     justifyContent: "center",
//     alignItems: "center",
//     flex: 1,
//     backgroundColor: "white",
//   },
//   canvas: {
//     height: 350,
//     width: 350,
//   },
// });

// export default BarChart;
