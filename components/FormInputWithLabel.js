import { StyleSheet, Text, TextInput, View } from "react-native";
import React from "react";

const FormInputWithLabel = ({
  title,
  label,
  keyboardType,
  value,
  onTextChange,
}) => {
  return (
    <View style={styles.imputContainer}>
      <Text style={styles.title}>
        {title ? title : label} {title ? "Address" : null}
      </Text>
      <TextInput keyboardType={keyboardType} style={styles.input} />
    </View>
  );
};

export default FormInputWithLabel;

const styles = StyleSheet.create({
  title: {
    fontWeight: "bold",
    fontSize: 16,
    marginHorizontal: 10,
    marginBottom: 8,
    textTransform: "capitalize",
  },
  input: {
    backgroundColor: "#EFF0F6",
    marginBottom: 15,
    borderRadius: 5,
    padding: 10,
    paddingVertical: 15,
  },
});
