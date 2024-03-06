import { Modal, StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";

const EditPersonalDetailBottomSheet = ({
  personalDetailBottomSheetVisible,
  closeModal
}) => {
  return (
    <Modal
      visible={personalDetailBottomSheetVisible}
      animationType="slide"
      transparent={true}
    >
      <View>
        <Text>EditPersonalDetailBottomSheet</Text>
        <TouchableOpacity onPress={closeModal}>
            <Text style={{color: 'white'}}>close modal</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

export default EditPersonalDetailBottomSheet;

const styles = StyleSheet.create({});
