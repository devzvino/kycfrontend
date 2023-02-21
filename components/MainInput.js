import React from "react";
import { View, Text, TextInput } from "react-native";
import { Dimensions } from "react-native";

//import styles
import {
  FontTheme,
  ButtonTheme,
  ImageBackgroundTheme,
  LogoTheme,
  InputTheme,
  ColorTheme,
} from "../components/ThemeFile";

//Device Dimenstions
const { width, height } = Dimensions.get("screen");

const MainInput = ({ onChange, onFocus, onBlur, placeholder, title, info, textStyles, keyboardType }) => {
  return (
    <View style={{ marginBottom: 0 }}>
      <Text style={FontTheme.inputTitle}>{title}</Text>
      <TextInput
        keyboardType={keyboardType}
        onChangeText={onChange}
        onFocus={onFocus}
        onBlur={onBlur}
        style={InputTheme.signUpInput}
        placeholder={placeholder}
        underlineColorAndroid="transparent"
        blurOnSubmit={false}
        autoFocus={false}
        autoCorrect={false}
        placeholderTextColor='#9f9f9f'
      ></TextInput>
      <Text style={textStyles}>{info}</Text>
    </View>
  );
};

export default MainInput;
