import React from 'react'
import {View, Text, TextInput} from 'react-native';

//import styles
import { FontTheme,ButtonTheme,ImageBackgroundTheme,LogoTheme,InputTheme } from '../components/ThemeFile';


const MainInput=({ onChange,onFocus,onBlur,placeholder, title }) =>  {
  return (
    <View style = {{marginBottom:10}}>
        <Text style={FontTheme.inputTitle}>{title}</Text>
        <TextInput
        onChange={onChange}
        onFocus={onFocus}
        onBlur={onBlur}
        style={InputTheme.signUpInput}
        placeholder={placeholder}
        ></TextInput>
    </View>
  )
}

export default MainInput;