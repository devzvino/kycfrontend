import React from 'react'
import { Text, View,TextInput, Image, Keyboard} from 'react-native';

import mainLogo from '../assets/images/kyc-logo.png';

import MainInput from './MainInput';
import SignUpNavigationButton from './SignUpNavigationButton';
import { Dimensions } from "react-native";

import { FontTheme,ButtonTheme,ImageBackgroundTheme,LogoTheme,InputTheme } from '../components/ThemeFile';


//Device Dimenstions
const {width, height} = Dimensions.get('screen');

//Handling buttonPress

const handlePress=()=>{
  
};
const handleChange =(e)=>{
  const userValue =e.target.value;
  console.log(userValue);
}


const OTPConfirm=()=> {
  return (
    <View style={{flex:1}}>
      
    <View  style= {{width:width, height:'65%', alignItems: "center",}}>
          <MainInput 
          title= {'OTP Confirmation Code'}
        
          required
          onBlur={Keyboard.dismiss}
          onChange={handleChange}
          textStyles={FontTheme.messagetxt}
          info={"Check your SMS for your security code. If you don't receive your security code, please contact support for further assistance."}
          />
          
     </View>
     <View style= {{width:width, height:'15%', alignItems: "center", position:'absolute', bottom:0,}}>
      <SignUpNavigationButton title={'Continue'} />
     </View>
  
    </View>
  )
}

export default OTPConfirm;