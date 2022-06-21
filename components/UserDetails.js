import React from 'react';
import { Text, View,TextInput, Image, Keyboard} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useEffect, useState,useRef, } from 'react';

import mainLogo from '../assets/images/kyc-logo.png';

import MainInput from './MainInput';
import { InputTheme, LogoTheme } from './ThemeFile';
import SignUpNavigationButton from './SignUpNavigationButton';
import { Dimensions } from "react-native";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import PhoneInput from './PhoneInput';

//Device Dimenstions
const {width, height} = Dimensions.get('screen');




const handleChange =(e)=>{
  const userValue =e.target.value;
  console.log(userValue);
}


const UserDetails = () => {

// Ability  to set phone number
const [phone, setPhone ] = useState();
const phoneRef = useRef();

  return (
    <View>
    
      <KeyboardAwareScrollView>
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
          <PhoneInput
          title= {'Phone Number'}
          placeholder={'e.g. 771234567'}
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
      </KeyboardAwareScrollView>
    </View>
  )
};

export default UserDetails;