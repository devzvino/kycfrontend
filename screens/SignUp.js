import React from 'react';
import { Text, View,TextInput, Image, Keyboard} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useEffect, useState } from 'react';


import { Dimensions } from "react-native";
import UserDetails from '../components/userDetails';
import OTPConfirm from '../components/OTPConfirm';

//Device Dimenstions
const {width, height} = Dimensions.get('screen');


//Handling buttonPress


const SignUp = () => {
  return (
    <View style={{width:width, height:height}}>
      <OTPConfirm/>
    </View>
  )
};

export default SignUp;