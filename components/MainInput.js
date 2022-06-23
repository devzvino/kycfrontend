import React from 'react'
import {View, Text, TextInput} from 'react-native';
import { Dimensions } from "react-native";

//import styles
import { FontTheme,ButtonTheme,ImageBackgroundTheme,LogoTheme,InputTheme,ColorTheme } from '../components/ThemeFile';


//Device Dimenstions
const {width, height} = Dimensions.get('screen');


const MainInput=({ onChange,onFocus,onBlur,placeholder, title, info }) =>  {
  return (
    <View style = {{marginBottom:0}}>
        <Text style={FontTheme.inputTitle}>{title}</Text>
        <TextInput
        onChange={onChange}
        onFocus={onFocus}
        onBlur={onBlur}
        style={InputTheme.signUpInput}
        placeholder={placeholder}
        ></TextInput>
        <Text style={{width:width/1.15, marginTop:10, fontFamily:'Poppins-Medium', color:'#7D7D7D'}}>{info}</Text>
    </View>
  )
}

export default MainInput;