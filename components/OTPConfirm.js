import React from 'react'
import { Text, View,TextInput, Image, Keyboard} from 'react-native';

import mainLogo from '../assets/images/kyc-logo.png';

import MainInput from './MainInput';
import { LogoTheme } from './ThemeFile';
import SignUpNavigationButton from './SignUpNavigationButton';
import { Dimensions } from "react-native";


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
    <View>
        <View>
      <View style={{width:'87%', height:'20%', marginLeft:'8%', paddingTop: '10%',}}>
      <Image source={mainLogo} style={LogoTheme.miniLogo}/>
      </View>
    <View  style= {{width:width, height:'65%', alignItems: "center",}}>
          <MainInput 
          title= {'OTP Confirmation Code'}
        
          required
          onBlur={Keyboard.dismiss}
          onChange={handleChange}
          info={"Check your SMS for your security code. If you don't receive your security code, please contact support for further assistance."}
          />
          
     </View>
     <View style= {{width:width, height:'15%', alignItems: "center",}}>
      <SignUpNavigationButton title={'Continue'} onPress={handlePress}/>
     </View>
    </View>

    </View>
  )
}

export default OTPConfirm;