import {
  ActivityIndicator,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { Searchbar } from 'react-native-paper';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { useTheme } from '@/theme';
import { useSelector } from 'react-redux';
import { SafeScreen } from '@/components/template';
import Search from '@/theme/assets/images/search.png';
import Arrow from '@/theme/assets/images/arrow.png';
import { getStudentDetails } from '../../services/ReportsServices/reportsServices';
import { MMKV } from 'react-native-mmkv';
import { notifyMessage } from '../../utils/error-toast-API';

const storage = new MMKV();
const StudentLevelScreen = () => {
  const { colors, layout, fonts } = useTheme();
  const navigation = useNavigation();
  const selectedSubjectId = useSelector((state) => state.selectedSubject.subject);
  const sectionName = useSelector((state) => state.selectedSubject.sectionName);
  const resFromMMKV = storage.getString('teacherDetails');
  const teacherDetails = resFromMMKV ? JSON.parse(resFromMMKV) : null;
  const isTablet = useSelector((state) => state.screenDimensions.isTablet);
  const [studentName, setSearchStudentName] = useState([]);
  const [sectionId, setSectionId] = useState(null);
  const [studentDetails, setStudentDetails] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    studentDetails.sort((a, b) => a.firstName.localeCompare(b.firstName));
    setSearchStudentName(studentDetails);
  }, [studentDetails]);

  useEffect(() => {
    if (teacherDetails && teacherDetails.length > 0) {
      for (let item of teacherDetails) {
        if (item.sectionName === sectionName) {
          setSectionId(item.id);
          return;
        }
      }
    }
  }, [sectionName, teacherDetails]);

  useFocusEffect(
    React.useCallback(() => {
      if (sectionId) {
        getStudentList();
      }
    }, [selectedSubjectId, sectionId])
  );

  const getStudentList = () => {
    setIsLoading(true);
    let params = {
      sectionId: sectionId,
      subjectId: selectedSubjectId,
    };
    getStudentDetails(params)
      .then((res) => {
        setStudentDetails(res.data.content);
        setIsLoading(false);
      })
      .catch((error) => {
        if (error?.response?.status === 400 || error.code === 'ERR-10') {
          notifyMessage('unabled to fetch chapter details');
        }
        setIsLoading(false);
      });
  };

  const onSearchChapters = (search) => {
    setIsLoading(true);
    setTimeout(() => {
      const searchItem = studentDetails.filter((ele) =>
        ele.firstName.toLowerCase().includes(search.toLowerCase())
      );
      setSearchStudentName(searchItem);
      setIsLoading(false);
    }, 500);
  };

  const goToStudentWiseReportScreen = (studentDetails) => {
    navigation.navigate('StudentWiseReportScreen', { studentDetails: studentDetails });
  };

  return (
    <SafeScreen>
      <View style={[layout.paddingForFullScreen, { paddingTop: '0%' }]}>
        <View
          style={{
            width: '100%',
            marginTop: isTablet ? '3%' : '4%',
            paddingBottom: isTablet ? '1%' : '3%',
          }}
        >
          <Searchbar
            placeholder="Search Students"
            placeholderTextColor="rgba(275, 275, 275, 0.5)"
            iconColor="rgba(275, 275, 275, 0.5)"
            inputStyle={[fonts.size_14, fonts.fontWeignt_600, { color: colors.white, right: 10 }]}
            icon={() => (
              <Image source={Search} resizeMode="contain" style={{ width: 14, height: 14 }} />
            )}
            onChangeText={onSearchChapters}
            style={{
              backgroundColor: '#09070E',
              borderColor: 'rgba(275, 275, 275, 0.5)',
              borderWidth: 1,
              borderRadius: 8,
              // fontSize: 20,
            }}
            clearButtonMode="while-editing"
            selectionColor={colors.buttonTextColor}
          />
        </View>
        <ScrollView contentContainerStyle={{ paddingBottom: '50%' }}>
          {isLoading ? (
            <View style={styles.loader}>
              <ActivityIndicator size="large" color={colors.termsLinkColor} />
            </View>
          ) : (
            <>
              {studentName?.map((ele) => {
                return (
                  <Pressable
                    key={ele?.firstName}
                    style={[
                      layout.fullWidth,
                      isTablet ? { padding: '3%' } : layout.paddingForCard,
                      {
                        backgroundColor: colors.cardBackgroundColor,
                        borderRadius: 8,
                        marginTop: '3%',
                      },
                    ]}
                    onPress={() => goToStudentWiseReportScreen(ele)}
                  >
                    <View style={[layout.display, layout.rowHCenter, layout.justifyBetween]}>
                      <Text
                        style={[fonts.size_14, fonts.fontWeignt_600, { color: colors.white }]}
                        numberOfLines={1}
                      >
                        {ele?.firstName} {ele?.middleName} {ele?.lastName}
                      </Text>
                      <TouchableOpacity>
                        <Image
                          source={Arrow}
                          resizeMode="contain"
                          style={{
                            width: 10,
                            height: 10,
                            tintColor: colors.termsLinkColor,
                          }}
                        />
                      </TouchableOpacity>
                    </View>
                  </Pressable>
                );
              })}
            </>
          )}
        </ScrollView>
      </View>
    </SafeScreen>
  );
};

const styles = StyleSheet.create({
  loader: {
    marginTop: '50%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default StudentLevelScreen;
