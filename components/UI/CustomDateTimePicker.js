import React, { useState } from "react";
import { View, Pressable, StyleSheet, Text } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import Modal from "react-native-modal";

const CustomDateTimePicker = ({ visible, date, onChange, onClose,dateOrTime }) => {
  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="slide"
      onRequestClose={onClose}
    >
      {/* <View style={styles.modalOverlay}> */}
        {/* <View style={styles.modalContainer}> */}
          <View style={styles.modalContent}>
            <DateTimePicker
              value={date}
              mode={dateOrTime}
              display="spinner"
              onChange={onChange}
            />
            <Pressable
              onPress={onClose}
              style={({ pressed }) => [
                styles.button,
                pressed ? styles.pressed : null,
              ]}
            >
              <Text style={styles.buttonText}>Done</Text>
            </Pressable>
          </View>
        {/* </View> */}
      {/* </View> */}
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    height: 300,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "yellow",
    borderRadius: 20,
    borderWidth: 5,
  },
  modalContent: {
          marginTop: 550,
    backgroundColor: "black",
//     padding: 20,
    borderRadius: 20,
    borderWidth: 5,
    width: "100%",
  },
  button: {
    backgroundColor: "#403535",
    padding: 10,
    borderRadius: 10,
    marginTop: 10,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  pressed: {
    opacity: 0.5,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  modalOverlay: {
    flex: 1,
    //     backgroundColor: "rgba(0, 0, 0, 0.5)",

    //     justifyContent: "center",
    backgroundColor: "yellow",
    marginTop: 550,
    alignItems: "center",
  },
});

export default CustomDateTimePicker;
