import React from 'react';
import { Text, View,TextInput, Image, Keyboard} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useEffect, useState } from 'react';

import mainLogo from '../assets/images/kyc-logo.png';


import { Dimensions } from "react-native";
import IdUpload from '../components/IdUpload';
import UserDetails from '../components/UserDetails';
import OTPConfirm from '../components/OTPConfirm';
import SignUpNavigationButton from '../components/SignUpNavigationButton';
import PhoneInput from 'react-native-phone-input';
import RegConfirm from '../components/RegConfirm';

import { FontTheme,ButtonTheme,ImageBackgroundTheme,LogoTheme,InputTheme } from '../components/ThemeFile';

//Device Dimenstions
const {width, height} = Dimensions.get('screen');

//Handling buttonPress

const handlePress=()=>{

  
  
};


const SignUp = () => {
  // state randering

const [userDetails, setUserDetails] = useState(true)
const [idUpload, setIdUpload] = useState(false)
const [otpConfirm, setOtpConfirm] = useState(false)
const [regConfirm, setRegConfirm] = useState(false)

  return (
    <View style={{width:width, height:height, }}>
        <View style={{width:'100%', height:'20%', marginLeft:'8%', paddingTop: '10%',}}>
      <Image source={mainLogo} style={LogoTheme.miniLogo}/>
      </View>
      {/* Render Form elements here */}
      {userDetails && <UserDetails setUserDetails={setUserDetails}/>}
      {idUpload && <IdUpload setIdUpload={setIdUpload}/>}
      {otpConfirm && <OTPConfirm setOtpConfirm={setOtpConfirm}/>}
      {regConfirm && <RegConfirm setRegConfirm={setRegConfirm}/>}
      </View>
  )
};

export default SignUp;