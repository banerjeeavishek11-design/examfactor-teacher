// import React from 'react';
// import { View, StyleSheet } from 'react-native';
// import { Svg, Rect, Text } from 'react-native-svg';

// const BarChart = ({ data, colors }) => {
//   const barWidth = 30;
//   const chartHeight = 200;
//   const chartWidth = (barWidth + 10) * data.length;

//   return (
//     <View style={styles.container}>
//       <Svg width={chartWidth} height={chartHeight}>
//         {data.map((value, index) => {
//           const barHeight = (value / 100) * chartHeight;
//           return (
//             <React.Fragment key={index}>
//               <Rect
//                 x={index * (barWidth + 10)}
//                 y={chartHeight - barHeight}
//                 width={barWidth}
//                 height={barHeight}
//                 fill={colors[index]}
//               />
//               <Text
//                 x={index * (barWidth + 10) + barWidth / 2}
//                 y={chartHeight - barHeight - 10}
//                 fill="black"
//                 fontSize="14"
//                 textAnchor="middle"
//               >
//                 {value}
//               </Text>
//             </React.Fragment>
//           );
//         })}
//       </Svg>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     alignItems: 'center',
//     justifyContent: 'center',
//     marginTop: 50,
//   },
// });

// const data = [20, 40, 60, 80, 100]; // Example data for bar heights
// const colors = ['#FF5733', '#FFBD33', '#F1FF33', '#33FF57', '#336BFF']; // Example colors for bars

// export default function App() {
//   return <BarChart data={data} colors={colors} />;
// }



import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Svg, Text, Line } from 'react-native-svg';

const BarChart = ({ data }) => {
  const chartWidth = 300;
  const chartHeight = 200;
  const margin = 20;
  const barWidth = (chartWidth - margin * 2) / data.length;

  // Calculate maximum score
  const maxScore = Math.max(...data.map(item => item.score));

  // Calculate y-coordinate for each data point
  const calculateY = score => {
    return chartHeight - (score / maxScore) * (chartHeight - margin * 2) + margin;
  };

  return (
    <View style={styles.container}>
      <Svg width={chartWidth} height={chartHeight}>
        {/* Y-axis */}
        <Line x1={margin} y1={margin} x2={margin} y2={chartHeight - margin} stroke="black" strokeWidth="2" />
        <Text x={margin - 15} y={margin} fontSize="12" textAnchor="end">
          {maxScore}%
        </Text>
        <Text x={margin - 15} y={chartHeight - margin} fontSize="12" textAnchor="end">
          0%
        </Text>

        {/* X-axis */}
        <Line x1={margin} y1={chartHeight - margin} x2={chartWidth - margin} y2={chartHeight - margin} stroke="black" strokeWidth="2" />
        {data.map((item, index) => (
          <React.Fragment key={index}>
            {/* Bars */}
            <Line
              x1={margin + index * barWidth}
              y1={calculateY(item.score)}
              x2={margin + (index + 1) * barWidth}
              y2={calculateY(item.score)}
              stroke="blue"
              strokeWidth={barWidth}
            />
            {/* X-axis labels */}
            <Text x={margin + index * barWidth + barWidth / 2} y={chartHeight - margin + 15} fontSize="12" textAnchor="middle">
              {item.label}
            </Text>
          </React.Fragment>
        ))}
      </Svg>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
});

const data = [
  { label: '<60', score: 50 },
  { label: '60-80', score: 70 },
  { label: '80-90', score: 85 },
  { label: '90+', score: 95 },
];

export default function App() {
  return <BarChart data={data} />;
}

