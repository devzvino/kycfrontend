import React from 'react';
import { Text, View,TextInput, Image, Keyboard} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useEffect, useState } from 'react';

import mainLogo from '../assets/images/kyc-logo.png';


import { Dimensions,ScrollView } from "react-native";
import IdUpload from '../components/IdUpload';
import UserDetails from '../components/UserDetails';
import OTPConfirm from '../components/OTPConfirm';
import SignUpNavigationButton from '../components/SignUpNavigationButton';
import RegConfirm from '../components/Regconfirm';

import { LogoTheme } from '../components/ThemeFile';

//Device Dimenstions
const {width, height} = Dimensions.get('screen');


const SignUp = () => {
  // state randering

  const [userView, setuserView] = useState(false)
  const [idUploadView, setidUploadView] = useState(false)
  const [otpConfrimView, setOtpConfrimView] = useState(false)
  const [regConfrimView, setRegConfrimView] = useState(true)


  return (
    <ScrollView  contentContainerStyle={{width:width, height:height  }}>
        <View style={{width:'100%', height:'20%', marginLeft:'8%', paddingTop: '10%',}}>
      <Image source={mainLogo} style={LogoTheme.miniLogo}/>
      </View>
      {/* Render Form elements here */}

      {userView && <UserDetails />}
      {idUploadView && <IdUpload />}
      {otpConfrimView &&  <OTPConfirm />}
      {regConfrimView &&  <RegConfirm />}
    
      </ScrollView>
  )
};

export default SignUp;

   {/* 
      <OTPConfirm setOtpConfirm={setOtpConfirm}/>
   */}