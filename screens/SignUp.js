import React from 'react';
import { Text, View,TextInput, Image, Keyboard} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import mainLogo from '../assets/images/kyc-logo.png';

import MainInput from '../components/MainInput';
import { LogoTheme } from '../components/ThemeFile';
import SignUpNavigationButton from '../components/SignUpNavigationButton';
import { Dimensions } from "react-native";

//Device Dimenstions
const {width, height} = Dimensions.get('screen');

//Handling buttonPress

const handlePress=()=>{
  return console.log('Button Pressed')
};


const SignUp = () => {
  return (
    <SafeAreaView style={{alignItems:'center',height:height }}>
      <View>
        <Image source={mainLogo} style={LogoTheme.miniLogo}/>
        <MainInput 
        title= {'Firstname(s) (as on your ID)'}
        placeholder={'e.g. Benard Tafara'}
        required
        onBlur={Keyboard.dismiss}
        />
        <MainInput 
        title= {'Surname (as on your ID)'}
        placeholder={'e.g. Zvinokwazvo'}
        required
        onBlur={Keyboard.dismiss}
        />
        <MainInput 
        title= {'Phone Number'}
        placeholder={'e.g. +263 77 123 4567'}
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

     <SignUpNavigationButton title={'Continue'} onPress={handlePress}/>

    </SafeAreaView>
  
  )
};

export default SignUp;