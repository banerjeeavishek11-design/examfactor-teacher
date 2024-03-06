import {
  Modal,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  TextInput,
} from "react-native";
import React from "react";
import { useTheme } from "@/theme";
// import AntDesign from 'react-native-vector-icons/AntDesign'
import {Formik} from 'formik'

const EditPersonalDetailBottomSheet = ({
  personalDetailBottomSheetVisible,
  closeModal,
}) => {
  const { fonts, colors, layout } = useTheme();

  return (
    <Modal
      visible={personalDetailBottomSheetVisible}
      animationType="slide"
      transparent={true}
    >
      <View style={[styles.modalContainer,]}>
        <View
          style={[
            styles.bottomSheetContent,
            { padding: "4%", backgroundColor: colors.bottomTabBackground , height: '90%'},
          ]}
        >
            <TouchableOpacity
              onPress={closeModal}
              style={{ position: "absolute", top: -35, left: "98%" }}
            >
              {/* <AntDesign name="close" size={24} color="gray" /> */}
              <Text style={[fonts.size_18,{color: 'white'}]} >X</Text>
            </TouchableOpacity>
          <ScrollView>


            <Text style={[fonts.size_18,fonts.fontWeignt_600,{ color: "white" }]}>
              Edit personal details
            </Text>
            <Formik
            initialValues={{
                fullname: '',
                dob: '',
                gender: '',
                city: '',
                email: '',
                mobile: '',
                emergerncyContact: '',
                address: ''
            }}
            onSubmit={(values)=>{
                console.log(values);
            }}
            >
            {
                (formikProps)=>{(
                    <View style={{flex:1, borderColor: 'red', borderWidth: 1}}>
                        <Text style={{color: 'white'}}>Full Name</Text>
                        <TextInput
                        onChangeText={formikProps.handleChange('fullname')}
                        value={formikProps.values.fullname}
                        />
                        <TouchableOpacity onPress={formikProps.handleSubmit}>
                            <Text>Submit</Text>
                        </TouchableOpacity>
                    </View>
                )}
            }
            </Formik>


          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};

export default EditPersonalDetailBottomSheet;

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
    height: 320,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderTopWidth: 2,
    borderColor: "#8F8F94",
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
  },
  line: {
    position: "absolute",
    top: "70%",
    left: 18,
    right: 18,
    borderBottomWidth: 1,
    borderBottomColor: "white",
  },

  buttonContainer: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    padding: 10,
    paddingTop: 11,
    width: "100%",
    borderRadius: 9,
    alignItems: "center",
    justifyContent: "center",
    marginTop: "5%",
  },
  radioButtonContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 20,
    backgroundColor: "#22222F",
    borderRadius: 12,
    height: 52,
    marginTop: 5,
    width: "100%",
  },
  radioButtonContainer1: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 20,
    backgroundColor: "#22222F",
    borderRadius: 12,
    height: 52,
    marginTop: 8,
    width: "100%",
  },
  radioButtonContainer2: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 20,
    backgroundColor: "#22222F",
    borderRadius: 12,
    height: 52,
    marginTop: 8,
  },
  radioButtonText: {
    marginLeft: 8,
    color: "white",
  },
});
