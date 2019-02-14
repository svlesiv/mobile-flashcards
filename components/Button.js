import React from "react";
import { Text, TouchableOpacity, StyleSheet } from "react-native";
import { baseColorSecondary, textColorSecondary } from "../utils/colors"

export default function Button({ children, onPress, style={} }) {
  return (
    <TouchableOpacity style={[styles.button, style]} onPress={onPress}>
      <Text style={styles.buttonText}>{children}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    padding: 15,
    paddingLeft: 30,
    paddingRight: 30,
    borderRadius: 4,
    margin: 10,
    alignSelf: "center",
    shadowRadius: 3,
    shadowOpacity: 0.8,
    shadowColor: textColorSecondary,
    shadowOffset: {
      width: 0,
      height: 3
    }
  },
  buttonText: {
    color: baseColorSecondary,
    fontSize: 25
  }
})