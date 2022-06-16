import React from 'react';
import { Text, View,TextInput, Image, Keyboard} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useEffect, useState } from 'react';

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


const UserDetails = () => {
  return (
    <View>
      <View style={{width:'87%', height:'20%', marginLeft:'8%', paddingTop: '10%',}}>
      <Image source={mainLogo} style={LogoTheme.miniLogo}/>
      </View>
    <View  style= {{width:width, height:'65%', alignItems: "center",}}>
          <MainInput 
          title= {'Firstname(s) (as on your ID)'}
          placeholder={'e.g. Benard Tafara'}
          required
          onBlur={Keyboard.dismiss}
          onChange={handleChange}
          />
          <MainInput 
          title= {'Surname (as on your ID)'}
          placeholder={'e.g. Zvinokwazvo'}
          required
          onBlur={Keyboard.dismiss}
          />
          <MainInput 
          title= {'Phone Number'}
          placeholder={'e.g. 263 77 123 4567'}
          required
          onBlur={Keyboard.dismiss}
          />
          <MainInput 
          title= {'ID Number'}
          placeholder={'e.g. 42 251109 S 07'}
          required
          onBlur={Keyboard.dismiss}
          />
     </View>
     <View style= {{width:width, height:'15%', alignItems: "center",}}>
      <SignUpNavigationButton title={'Continue'} onPress={handlePress}/>
     </View>
    </View>
      

     


  
  )
};

export default UserDetails;