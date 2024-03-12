import {
    View,
    Modal,
    StyleSheet,
    TouchableOpacity,
    Text,
    Image,
    ScrollView,
  } from "react-native";
import React, {useState} from 'react'
import Cross from "@/theme/assets/images/cross.png";
import { ImageVariant } from "../atoms";
import RadioButton from "../RadioButton/RadioButton";
import { useTheme } from '@/theme'

const practiceDuration = [
    {id:1, practiceDuration: "All Students in class"},
    {id:2, practiceDuration: "Not Practiced yesterday"},
    {id:3, practiceDuration: "Not Practiced in 3 Days"},
    {id:3, practiceDuration: "Not Practiced in 7 Days"},
    {id:3, practiceDuration: "Not Practiced in 15 Days"},
    {id:3, practiceDuration: "Not Practiced in 30 Days"}
  ];

const PracticeDurationBottomSheet = ({visible, closeModal, setPracticeDurationValue}) => {
    const {fonts, layout, colors}=useTheme();
    const [option, setOption] = useState("first");
    const handleOptionChange = (op) => {
        setOption(op);
        console.log("selected practice duration: ", op);
      };

      const handleApply = () => {
        setPracticeDurationValue(option);
        closeModal()
      };
  return (
    <View style={styles.container}>
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
    >
      <View style={styles.modalContainer}>
        <View
          style={[
            styles.bottomSheetContent,

            { backgroundColor: colors.bottomSheetBackgroundColor },
          ]}
        >
          <TouchableOpacity
            onPress={closeModal}
            style={[{ position: "absolute", top: -35, left: "92%" }]}
          >
            <ImageVariant
              testID="brand-img"
              style={{ width: 16, height: 16, tintColor: "white" }}
              source={Cross}
              resizeMode="contain"
            />
          </TouchableOpacity>
          <View style={styles.center}>
            <TouchableOpacity
              style={styles.slideIndicator}
              onPress={closeModal}
            ></TouchableOpacity>
          </View>
          <View style={[layout.paddingForCard, styles.scrollContainer]}>
            <Text
              style={[
                fonts.size_20,
                fonts.bold,
                { color: colors.white, paddingBottom: "2%" },
              ]}
            >
             Practice Duration
            </Text>
            <ScrollView
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{ paddingBottom: "5%" }}
            >
              {practiceDuration?.map((ele) => (
                <TouchableOpacity
                  key={ele.practiceDuration}
                  style={styles.radioButtonContainer}
                  onPress={() => handleOptionChange(ele.practiceDuration)}
                  activeOpacity={1}
                >
                  <View style={{ marginLeft: 10 }}>
                    <RadioButton isActive={option === ele.practiceDuration} />
                  </View>
                  <Text
                    style={[
                      styles.radioButtonText,
                      fonts.size_14,
                      fonts.fontWeignt_600,
                    ]}
                  >
                    {ele.practiceDuration}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
          <View style={styles.footer}>
            <TouchableOpacity
              onPress={closeModal}
              style={[
                layout.justifyCenter,
                styles.footerButton,
                {
                  backgroundColor: colors.cardBackgroundColor,
                },
              ]}
            >
              <Text
                style={[
                  fonts.size_14,
                  fonts.fontWeignt_600,
                  { color: colors.termsLinkColor, textAlign: "center" },
                ]}
              >
                Cancel
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                layout.justifyCenter,
                styles.footerButton,
                {
                  backgroundColor: colors.termsLinkColor,
                },
              ]}
              onPress={handleApply}
            >
              <Text
                style={[
                  fonts.size_14,
                  fonts.fontWeignt_600,
                  { color: colors.loginBtnTextColor, textAlign: "center" },
                ]}
              >
                Apply
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  </View>
  )
}

export default PracticeDurationBottomSheet

const styles = StyleSheet.create({
    
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      },
      modalContainer: {
        flex: 1,
        justifyContent: "flex-end",
        backgroundColor: "rgba(0, 0, 0, 0.9)",
      },
      bottomSheetContent: {
        height: 550,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        borderTopWidth: 2,
        borderColor: "gray",
      },
      center: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      },
      slideIndicator: {
        width: 88,
        height: 8,
        backgroundColor: "#2F2B3A",
        borderRadius: 20,
        alignSelf: "center",
        marginTop: "4%",
      },
      line: {
        position: "absolute",
        top: "65%",
        left: 18,
        right: 18,
        borderBottomWidth: 1,
        // borderBottomColor: Colors.textGray,
      },
      button: {
        // backgroundColor: Colors.buttonBackgroundColor,
        padding: 10,
        paddingTop: 11,
        borderRadius: 9,
        alignItems: "center",
      },
      smallBtn: {
        height: 32,
        borderRadius: 9,
        paddingLeft: 20,
        paddingRight: 20,
        alignItems: "center",
        justifyContent: "center",
      },
      radioButtonContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginRight: 20,
        backgroundColor: "#22222F",
        borderRadius: 12,
        height: 52,
        marginTop: 8,
        width: "100%",
      },
      radioButtonText: {
        marginLeft: 8,
        color: "#fff",
      },
      scrollContainer: {
        flex: 1,
      },
      footer: {
        flexDirection: "row",
        justifyContent: "space-between",
        padding: 20,
        backgroundColor: "transparent", // Change if needed
      },
      footerButton: {
        width: "48%",
        height: 48,
        borderRadius: 8,
      },
})