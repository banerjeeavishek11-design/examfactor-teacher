import { StyleSheet, Text, View, Modal } from "react-native";
import React from "react";

const ChangeRoleBottomSheet = (props) => {
  const { setChangeRoleBottomSheetVisible, changeRoleBottomSheetVisible } =
    props;
  return (
    <Modal
      visible={changeRoleBottomSheetVisible}
      animationType="slide"
      transparent={true}
    >
      <Text>ChangeRoleBottomSheet</Text>
    </Modal>
  );
};

export default ChangeRoleBottomSheet;

const styles = StyleSheet.create({});
