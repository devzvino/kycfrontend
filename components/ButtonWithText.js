import { View, Text, ActivityIndicator, TouchableOpacity } from "react-native";
import React from "react";
import { ButtonTheme, FontTheme } from "./ThemeFile";

export default function ButtonWithText({ title, loading, onPress }) {
  return (
    <TouchableOpacity disabled={loading} onPress={onPress} style={ButtonTheme.mainButton}>
      {loading ? (
        <Text style={[FontTheme.mainButtonFont, { paddingLeft: 5 }]}>
          <ActivityIndicator color="white" />
          Please wait...
        </Text>
      ) : (
        <Text style={FontTheme.mainButtonFont}>{title}</Text>
      )}
    </TouchableOpacity>
  );
}
