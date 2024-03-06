import { StyleSheet, Text, View, Modal, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import AntDesign from "react-native-vector-icons"
import RadioButton from "@/components/RadioButton/RadioButton";

//FLAG

const ChangeRoleBottomSheet = ({closeModal, changeRoleBottomSheetVisible, teacher, toggleTeacher}) => {

const handleOptionChange = ()=>{
 toggleTeacher()
}

  return (
    <Modal
      visible={changeRoleBottomSheetVisible}
      animationType="slide"
      transparent={true}
    >
      <View style={styles.modalContainer}>
          {/* <View
            style={[
              styles.bottomSheetContent,
              { backgroundColor: "#1C1827", padding: "4%" },
            ]}
          >
            <TouchableOpacity
              onPress={closeModal}
              style={{ position: 'absolute', top: -35, left: '98%' }}
            >
              <AntDesign name='close' size={24} color='gray' />
            </TouchableOpacity>
            <View style={styles.center}>
              <TouchableOpacity
                style={styles.slideIndicator}
                onPress={closeModal}
              >
                <AntDesign name='minus' size={24} color='#2F2B3A' />
              </TouchableOpacity>
            </View>
            <View style={[{ marginTop: '5%' }]}>
              <Text
                style={[
                  // Fonts.fontSizeExtraSmall,
                  // Fonts.fontWeightLarge,
                  { color: "White" },
                ]}
              >
                Coin History
              </Text>
              <Text
                style={[
                  // Fonts.fontSizeTiny,
                  // Fonts.fontWeightSmall,
                  { color: '#E2E2E2', top: 2 },
                ]}
              >
                Set your Priority
              </Text>
            </View>
            <View
              style={{
                flex: 1,
                justifyContent: 'flex-end',
                paddingBottom: '3%',
                marginTop: '5%',
              }}
            >
              <View>
                <TouchableOpacity
                  style={styles.radioButtonContainer}
                  onPress={() => handleOptionChange()}
                  activeOpacity={1}
                >
                  <View style={{ marginLeft: 10 }}>
                    <RadioButton isActive={teacher === true} />
                  </View>
                  <Text style={styles.radioButtonText}>Teacher</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.radioButtonContainer1}
                  onPress={() => handleOptionChange()}
                  activeOpacity={1}
                >
                  <View style={{ marginLeft: 10 }}>
                    <RadioButton isActive={teacher === false} />
                  </View>
                  <Text style={styles.radioButtonText}>Class Teacher</Text>
                </TouchableOpacity>
              </View>

              <TouchableOpacity
                style={styles.buttonContainer}
                onPress={closeModal}
              >
                <Text style={{color: "#31313F"}}>APPLY</Text>
              </TouchableOpacity>
            </View>
          </View> */}
          <View style={{justifyContent: 'center', alignItems: 'center'}}>
            <TouchableOpacity onPress={closeModal}>

            <Text style={{color: 'white'}}>Close modal</Text>
            </TouchableOpacity>
          </View>
        </View>

    </Modal>
  );
};

export default ChangeRoleBottomSheet;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.9)',
  },
  bottomSheetContent: {
    height: 320,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderTopWidth: 2,
    borderColor: "#8F8F94",
  },
  center: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  slideIndicator: {
    width: 88,
    height: 8,
    backgroundColor: '#2F2B3A',
    borderRadius: 20,
    alignSelf: 'center',
  },
  line: {
    position: 'absolute',
    top: '70%',
    left: 18,
    right: 18,
    borderBottomWidth: 1,
    borderBottomColor: 'white',
  },

  buttonContainer: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    padding: 10,
    paddingTop: 11,
    width: '100%',
    borderRadius: 9,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '5%',
  },
  radioButtonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 20,
    backgroundColor: '#22222F',
    borderRadius: 12,
    height: 52,
    marginTop: 5,
    width:'100%'
  },
  radioButtonContainer1: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 20,
    backgroundColor: '#22222F',
    borderRadius: 12,
    height: 52,
    marginTop: 8,
    width:'100%'
  },
  radioButtonContainer2: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 20,
    backgroundColor: '#22222F',
    borderRadius: 12,
    height: 52,
    marginTop: 8,
  },
  radioButtonText: {
    marginLeft: 8,
    color: "white"
  },
});
