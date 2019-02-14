import React from "react";
import {Text, TouchableOpacity, StyleSheet} from "react-native";

export default function Button({children, onPress, style={}}) {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={[styles.buttonText, style]}>{children}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    padding: 13,
    borderRadius: 4,
    margin: 10,
    alignSelf: "center",
  },
  buttonText: {
    fontSize: 25,
  }
});