import {
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useRef, useState } from 'react';
import { useTheme } from '@/theme';
import { Concentrix, Header, SafeScreen, BarChart } from '@/components/template';
import Arrow from '@/theme/assets/images/arrow.png';
import { ImageVariant } from '@/components/atoms';
import { Divider } from 'react-native-paper';
import DownArrow from '@/theme/assets/images/Downarrow.png';
import Line from '@/theme/assets/images/line.png';
import Info from '@/theme/assets/images/info.png';
import UpArrow from '@/theme/assets/images/uparrow.png';
import Progressbar from '@/components/template/Progressbar/Progressbar';
import { useNavigation } from '@react-navigation/native';
import SortbyBottomSheet from '@/components/BottomSheet/Home/SortbyBottomSheet';
import PracticeDurationBottomSheet from '@/components/BottomSheet/Home/PracticeDurationBottomSheet';

const data = ['03', '06', '09', '12'];
const barchartColor = ['#7AF4FC', '#27D4FA'];
const width = 300;
const height = 250;
const borderRadius = 5;
const xAxisTitle = 'Achievable Score (%)';
const yAxisTitle = 'No. of students';

const HomeScreen = () => {
  const { colors, layout, fonts } = useTheme();
  const navigation = useNavigation();
  const screenWidth = Dimensions.get('window').width;
  const isTablet = screenWidth >= 600;
  const homeworkProgress = 60 / 100;
  const diagnosticProgress = 50 / 100;
  const productScrollRef = useRef(null);
  const scrollViewRef = useRef(null);
  const [showContent, setShowContent] = useState(false);

  const [subjects, setSubjects] = useState([
    { id: 1, subjectName: 'Physics', isChecked: true },
    { id: 2, subjectName: 'Chemistry', isChecked: false },
    { id: 3, subjectName: 'Mathematics', isChecked: false },
    { id: 4, subjectName: 'Bengali', isChecked: false },
    { id: 5, subjectName: 'English', isChecked: false },
  ]);

  //Sort By Modal handling
  const [sortByValue, setSortbyValue] = useState(null);
  const [sortbyModalVisible, setSortbyModalVisible] = useState(false);
  const closeSortbyModal = () => {
    setSortbyModalVisible(false);
  };

  //Practice Duration Modal Handling
  const [practiceDurationValue, setPracticeDurationValue] = useState(null);
  const [practiceDurationModalVisible, setPracticeDurationModalVisible] = useState(false);
  const closePracticeDurationModal = () => {
    setPracticeDurationModalVisible(false);
  };

  const toggleContent = () => {
    setShowContent(!showContent);
  };

  const handleButtonPress = (index) => {
    const updatedSubjects = subjects.map((subject, i) => {
      if (i === index) {
        return { ...subject, isChecked: true };
      } else {
        return { ...subject, isChecked: false };
      }
    });
    setSubjects(updatedSubjects);
    const buttonWidth = 100;
    const scrollX = index * buttonWidth;
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollTo({ x: scrollX, y: 0, animated: true });
    }
    if (productScrollRef.current) {
      productScrollRef.current?.scrollTo({ x: 0, animated: true });
    }
  };

  return (
    <SafeScreen>
      <View style={{ backgroundColor: isTablet ? '' : colors.headerBackgroundColor }}>
        <Header />
        <ScrollView
          ref={scrollViewRef}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={[
            layout.paddingForFullScreen,
            { paddingTop: '0%', paddingBottom: '2%', marginTop: '2%' },
          ]}
        >
          <View style={[layout.display, layout.rowHCenter]}>
            {subjects.map((ele, i) => (
              <TouchableOpacity
                key={i}
                style={[
                  styles.button,
                  {
                    borderColor: ele.isChecked ? '#27D4FA' : '#22222F',
                    borderWidth: ele.isChecked ? 2 : 0,
                  },
                ]}
                onPress={() => {
                  handleButtonPress(i, ele);
                }}
              >
                <Text
                  style={[
                    ele.isChecked == true ? styles.activeButton : styles.buttonText,
                    fonts.size_14,
                    fonts.bold,
                  ]}
                >
                  {ele.subjectName}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      </View>
      <ScrollView contentContainerStyle={[layout.paddingForFullScreen, { paddingTop: '2%' }]}>
        <View style={[layout.display, layout.rowHCenter, layout.justifyBetween]}>
          <Text style={[fonts.size_14, fonts.bold, { color: colors.white, opacity: 0.4 }]}>
            CLASS PREPAREDNESS
          </Text>
          <TouchableOpacity
            style={[layout.display, layout.rowHCenter]}
            onPress={() => navigation.navigate('SubjectDetailsScreen')}
          >
            <Text style={[fonts.size_14, fonts.bold, { color: colors.termsLinkColor }]}>
              SEE DETAILS
            </Text>
            <ImageVariant
              testID="brand-img"
              style={{
                width: 11,
                height: 11,
                left: 2,
                tintColor: colors.termsLinkColor,
              }}
              source={Arrow}
              resizeMode="contain"
            />
          </TouchableOpacity>
        </View>
        <View
          style={[
            layout.fullWidth,
            layout.paddingForCard,
            {
              backgroundColor: colors.cardBackgroundColor,
              height: 'auto',
              borderRadius: 12,
              marginTop: '4%',
            },
          ]}
        >
          <Text
            style={[
              fonts.size_20,
              fonts.fontWeight_small,
              fonts.alignCenter,
              { color: colors.white, marginTop: '3%' },
            ]}
          >
            Physics
          </Text>
          <View style={{ marginTop: '1%', alignItems: 'center' }}>
            <Concentrix scorePercentage={20} />
          </View>
          <View style={[layout.itemsCenter, { marginTop: '-20%' }]}>
            <Divider
              style={{
                width: '100%',
                backgroundColor: colors.lineBackgroundColor,
              }}
            />
          </View>
          <Text
            style={[
              fonts.size_14,
              fonts.fontWeignt_600,
              { color: colors.white, opacity: 0.3, top: 10 },
            ]}
          >
            PRACTICE
          </Text>
          <View
            style={[layout.display, layout.rowHCenter, layout.justifyBetween, { marginTop: '5%' }]}
          >
            <Text style={[fonts.size_12, fonts.fontWeight_small, { color: colors.white }]}>
              Home work
            </Text>
            <Text style={[fonts.size_12, fonts.fontWeight_small, { color: colors.white }]}>
              {`${homeworkProgress * 100}% Complete`}
            </Text>
          </View>
          <View style={{ marginTop: '3%' }}>
            <Progressbar progress={homeworkProgress} color={'#3DD598'} />
          </View>
          <View
            style={[layout.display, layout.rowHCenter, layout.justifyBetween, { marginTop: '5%' }]}
          >
            <Text style={[fonts.size_12, fonts.fontWeight_small, { color: colors.white }]}>
              Diagnostic
            </Text>
            <Text style={[fonts.size_12, fonts.fontWeight_small, { color: colors.white }]}>
              {`${diagnosticProgress * 100}% Complete`}
            </Text>
          </View>
          <View style={{ marginTop: '3%' }}>
            <Progressbar progress={diagnosticProgress} color={'#BBA041'} />
          </View>
        </View>
        {/* <View
          style={[
            layout.fullWidth,
            layout.paddingForCard,
            {
              backgroundColor: colors.cardBackgroundColor,
              height: 350,
              borderRadius: 12,
              marginTop: '4%',
            },
          ]}
        ></View> */}
        <BarChart
          data={data}
          colors={barchartColor}
          width={width}
          height={height}
          borderRadius={borderRadius}
          xAxisTitle={xAxisTitle}
          yAxisTitle={yAxisTitle}
        />
        {/* <BarChartsCarousel /> */}
        <View
          style={[layout.display, layout.rowHCenter, layout.justifyBetween, { marginTop: '10%' }]}
        >
          <Text style={[fonts.size_14, fonts.bold, { color: colors.white, opacity: 0.4 }]}>
            STUDENT PROGRESS
          </Text>
        </View>
        <ScrollView
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={[
            layout.display,
            layout.rowHCenter,
            { marginRight: 5, marginTop: '3%' },
          ]}
        >
          <TouchableOpacity
            onPress={() => {
              setSortbyModalVisible(true);
            }}
            style={[
              layout.justifyCenter,
              layout.display,
              layout.rowHCenter,
              layout.justifyBetween,
              {
                backgroundColor: colors.bottomTabBackground,
                borderWidth: 1,
                borderColor: sortByValue !== null ? colors.termsLinkColor : null,
                width: 72,
                height: 28,
                borderRadius: 4,
                paddingHorizontal: 6,
                marginRight: 5,
              },
            ]}
          >
            <Text
              style={[
                fonts.size_12,
                fonts.fontWeight_extraSmall,
                fonts.alignCenter,
                {
                  color: sortByValue !== null ? colors.termsLinkColor : colors.white,
                  opacity: sortByValue !== null ? 1 : 0.3,
                },
              ]}
            >
              Sort By
            </Text>
            <ImageVariant
              testID="brand-img"
              style={{
                width: 10,
                height: 10,
                tintColor: sortByValue !== null ? colors.termsLinkColor : colors.white,
                opacity: sortByValue !== null ? 1 : 0.4,
              }}
              source={DownArrow}
              resizeMode="contain"
            />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => setPracticeDurationModalVisible(true)}
            style={[
              layout.justifyCenter,
              layout.display,
              layout.rowHCenter,
              layout.justifyBetween,
              {
                backgroundColor: colors.bottomTabBackground,
                borderWidth: 1,
                borderColor: practiceDurationValue !== null ? colors.termsLinkColor : null,
                width: 169,
                height: 28,
                borderRadius: 4,
                paddingHorizontal: 6,
                marginRight: 5,
              },
            ]}
          >
            <Text
              style={[
                fonts.size_12,
                fonts.fontWeight_small,
                {
                  color: practiceDurationValue !== null ? colors.termsLinkColor : colors.white,
                  opacity: practiceDurationValue !== null ? 1 : 0.3,
                },
                fonts.alignCenter,
              ]}
            >
              Not Practiced in 7 Days
            </Text>
            <ImageVariant
              testID="brand-img"
              style={{
                width: 10,
                height: 10,
                tintColor: practiceDurationValue !== null ? colors.termsLinkColor : colors.white,
                opacity: practiceDurationValue !== null ? 1 : 0.4,
              }}
              source={DownArrow}
              resizeMode="contain"
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              layout.justifyCenter,
              layout.display,
              layout.rowHCenter,
              layout.justifyBetween,
              {
                backgroundColor: colors.bottomTabBackground,
                width: 149,
                height: 28,
                borderRadius: 4,
                paddingHorizontal: 6,
              },
            ]}
          >
            <Text
              style={[
                fonts.size_12,
                fonts.fontWeight_extraSmall,
                fonts.alignCenter,
                { color: colors.white, opacity: 0.3 },
              ]}
            >
              Achievable Score 90+
            </Text>
            <ImageVariant
              testID="brand-img"
              style={{
                width: 10,
                height: 10,
                tintColor: colors.white,
                opacity: 0.4,
              }}
              source={DownArrow}
              resizeMode="contain"
            />
          </TouchableOpacity>
        </ScrollView>

        {/* <View
          style={[
            layout.fullWidth,
            {
              backgroundColor: colors.cardBackgroundColor,
              height: 200,
              marginTop: "3%",
              borderRadius: 13,
              justifyContent: "center",
            },
          ]}
        >
          <Text
            style={[
              fonts.size_20,
              fonts.fontWeignt_600,
               fonts.alignCenter,
              { color: colors.white,},
            ]}
          >
            Students data not available
          </Text>
        </View> */}

        <TouchableOpacity
          onPress={toggleContent}
          style={[
            layout.fullWidth,
            layout.paddingForCard,

            {
              backgroundColor: colors.cardBackgroundColor,
              height: 'auto',
              marginTop: '4%',
              borderRadius: 14,
            },
          ]}
        >
          <View style={[layout.display, layout.rowHCenter]}>
            <View style={{ width: '30%' }}>
              <Text style={[fonts.size_14, fonts.bold, { color: colors.white }]}>75%</Text>
              <Text style={[fonts.size_10, fonts.fontWeight_small, { color: colors.gray200 }]}>
                Achievable Score
              </Text>
            </View>
            <ImageVariant
              testID="brand-img"
              style={{
                // width: 60,
                height: 70,
                tintColor: colors.lineBackgroundColor,
                right: 6,
              }}
              source={Line}
              resizeMode="contain"
            />
            <View style={{ width: '65%' }}>
              <Text style={[fonts.size_14, fonts.bold, { color: colors.white }]}>
                Shashank Kumar
              </Text>
              <View style={[layout.display, layout.rowHCenter]}>
                <View style={{ width: '30%' }}>
                  <Text
                    style={[
                      fonts.size_10,
                      fonts.fontWeight_small,
                      { color: colors.backButtonColor },
                    ]}
                  >
                    Home Work
                  </Text>
                </View>
                <View style={{ width: '50%' }}>
                  <Progressbar progress={0.5} color={'#3DD598'} />
                </View>
                <View style={{ width: '20%' }}>
                  <Text style={[fonts.size_10, fonts.bold, { color: colors.white, left: 5 }]}>
                    60%
                  </Text>
                </View>
              </View>

              <View style={[layout.display, layout.rowHCenter]}>
                <View style={{ width: '30%' }}>
                  <Text
                    style={[
                      fonts.size_10,
                      fonts.fontWeight_small,
                      { color: colors.backButtonColor },
                    ]}
                  >
                    Diagnostic
                  </Text>
                </View>
                <View style={{ width: '50%' }}>
                  <Progressbar progress={0.3} color={'#FF575F'} />
                </View>
                <View style={{ width: '20%' }}>
                  <Text style={[fonts.size_10, fonts.bold, { color: colors.white, left: 5 }]}>
                    27%
                  </Text>
                </View>
              </View>
            </View>
            <View style={{ width: '10%' }}>
              <TouchableOpacity>
                {showContent ? (
                  <Image style={{ width: 12, height: 8 }} source={UpArrow} resizeMode="contain" />
                ) : (
                  <Image style={{ width: 12, height: 8 }} source={DownArrow} resizeMode="contain" />
                )}
              </TouchableOpacity>
            </View>
          </View>
          {showContent && (
            <>
              <Divider
                style={{
                  marginTop: '2%',
                  width: '100%',
                  backgroundColor: colors.lineBackgroundColor,
                }}
              />
              <View
                style={[
                  layout.display,
                  layout.rowHCenter,
                  layout.justifyBetween,
                  { marginTop: '2%' },
                ]}
              >
                <View style={{ width: '35%' }}>
                  <Text style={[fonts.size_14, fonts.fontWeignt_600, { color: colors.white }]}>
                    8 days ago
                  </Text>
                  <Text style={[fonts.size_10, fonts.fontWeight_small, { color: colors.gray200 }]}>
                    Last practice
                  </Text>
                </View>
                <View style={{ width: '45%' }}>
                  <Text style={[fonts.size_14, fonts.fontWeignt_600, { color: colors.white }]}>
                    55 Min
                  </Text>
                  <View style={[layout.display, layout.rowHCenter]}>
                    <Text
                      style={[fonts.size_10, fonts.fontWeight_small, { color: colors.gray200 }]}
                    >
                      Avg. Study Time
                    </Text>
                    <ImageVariant
                      testID="brand-img"
                      style={{
                        width: 10,
                        height: 10,
                        tintColor: '#A9A9AD',
                        left: 6,
                      }}
                      source={Info}
                      resizeMode="contain"
                    />
                  </View>
                </View>
                <View style={{ width: '25%' }}>
                  <Text style={[fonts.size_14, fonts.fontWeignt_600, { color: colors.white }]}>
                    75%
                  </Text>
                  <Text style={[fonts.size_10, fonts.fontWeight_small, { color: colors.gray200 }]}>
                    Last test score
                  </Text>
                </View>
              </View>
            </>
          )}
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            layout.fullWidth,
            layout.paddingForCard,
            layout.display,
            layout.rowHCenter,
            {
              backgroundColor: colors.cardBackgroundColor,
              height: 92,
              marginTop: '4%',
              borderRadius: 14,
            },
          ]}
        >
          <View style={{ width: '30%' }}>
            <Text style={[fonts.size_14, fonts.bold, { color: colors.white, left: 5 }]}>0%</Text>
            <Text style={[fonts.size_10, fonts.fontWeight_small, { color: colors.gray200 }]}>
              Achievable Score
            </Text>
          </View>
          <ImageVariant
            testID="brand-img"
            style={{
              // width: 60,
              height: 70,
              tintColor: colors.lineBackgroundColor,
              right: 6,
            }}
            source={Line}
            resizeMode="contain"
          />
          <View style={{ width: '65%' }}>
            <Text style={[fonts.size_14, fonts.bold, { color: colors.white }]}>Rahul Gupta</Text>
            <View style={[layout.display, layout.rowHCenter]}>
              <View style={{ width: '30%' }}>
                <Text
                  style={[fonts.size_10, fonts.fontWeight_small, { color: colors.backButtonColor }]}
                >
                  Home Work
                </Text>
              </View>
              <View style={{ width: '50%' }}>
                <Progressbar progress={0} color={'#3DD598'} />
              </View>
              <View style={{ width: '20%' }}>
                <Text style={[fonts.size_10, fonts.bold, { color: colors.white, left: 5 }]}>
                  0%
                </Text>
              </View>
            </View>

            <View style={[layout.display, layout.rowHCenter]}>
              <View style={{ width: '30%' }}>
                <Text
                  style={[fonts.size_10, fonts.fontWeight_small, { color: colors.backButtonColor }]}
                >
                  Diagnostic
                </Text>
              </View>
              <View style={{ width: '50%' }}>
                <Progressbar progress={0} color={'#3DD598'} />
              </View>
              <View style={{ width: '20%' }}>
                <Text style={[fonts.size_10, fonts.bold, { color: colors.white, left: 5 }]}>
                  0%
                </Text>
              </View>
            </View>
          </View>
          <View style={{ width: '10%' }}>
            <TouchableOpacity>
              <ImageVariant
                testID="brand-img"
                style={{
                  width: 12,
                  height: 8,
                  tintColor: colors.white,
                }}
                source={DownArrow}
                resizeMode="contain"
              />
            </TouchableOpacity>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            layout.fullWidth,
            layout.paddingForCard,
            layout.display,
            layout.rowHCenter,
            {
              backgroundColor: colors.cardBackgroundColor,
              height: 92,
              marginTop: '4%',
              borderRadius: 14,
            },
          ]}
        >
          <View style={{ width: '30%' }}>
            <Text style={[fonts.size_14, fonts.bold, { color: colors.white }]}>52%</Text>
            <Text style={[fonts.size_10, fonts.fontWeight_small, { color: colors.gray200 }]}>
              Achievable Score
            </Text>
          </View>
          <ImageVariant
            testID="brand-img"
            style={{
              // width: 60,
              height: 70,
              tintColor: colors.lineBackgroundColor,
              right: 6,
            }}
            source={Line}
            resizeMode="contain"
          />
          <View style={{ width: '65%' }}>
            <Text style={[fonts.size_14, fonts.bold, { color: colors.white }]}>Utkarsh Sharma</Text>
            <View style={[layout.display, layout.rowHCenter]}>
              <View style={{ width: '30%' }}>
                <Text
                  style={[fonts.size_10, fonts.fontWeight_small, { color: colors.backButtonColor }]}
                >
                  Home Work
                </Text>
              </View>
              <View style={{ width: '50%' }}>
                <Progressbar progress={0.7} color={'#FFAB48'} />
              </View>
              <View style={{ width: '20%' }}>
                <Text style={[fonts.size_10, fonts.bold, { color: colors.white, left: 5 }]}>
                  45%
                </Text>
              </View>
            </View>

            <View style={[layout.display, layout.rowHCenter]}>
              <View style={{ width: '30%' }}>
                <Text
                  style={[fonts.size_10, fonts.fontWeight_small, { color: colors.backButtonColor }]}
                >
                  Diagnostic
                </Text>
              </View>
              <View style={{ width: '50%' }}>
                <Progressbar progress={0.6} color={'#3DD598'} />
              </View>
              <View style={{ width: '20%' }}>
                <Text style={[fonts.size_10, fonts.bold, { color: colors.white, left: 5 }]}>
                  60%
                </Text>
              </View>
            </View>
          </View>
          <View style={{ width: '10%' }}>
            <TouchableOpacity>
              <ImageVariant
                testID="brand-img"
                style={{
                  width: 12,
                  height: 8,
                  tintColor: colors.white,
                }}
                source={DownArrow}
                resizeMode="contain"
              />
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </ScrollView>
      <SortbyBottomSheet
        visible={sortbyModalVisible}
        closeModal={closeSortbyModal}
        setSortbyValue={setSortbyValue}
      />
      <PracticeDurationBottomSheet
        visible={practiceDurationModalVisible}
        closeModal={closePracticeDurationModal}
        setPracticeDurationValue={setPracticeDurationValue}
      />
    </SafeScreen>
  );
};

const styles = StyleSheet.create({
  button: {
    height: 45,
    borderRadius: 12,
    backgroundColor: '#22222F',
    paddingLeft: 20,
    paddingRight: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
  },
  activeButton: {
    color: '#27D4FA',
  },
  buttonText: {
    color: '#7A7A82',
  },
});

export default HomeScreen;
