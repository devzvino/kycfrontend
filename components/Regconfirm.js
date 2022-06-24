import React from 'react'
import{View,Image, Text, Dimensions} from 'react-native';
import SvgComponent from './SuccessSvg'
import SignUpNavigationButton from './SignUpNavigationButton';

//App theme styles
import { FontTheme,ButtonTheme,ImageBackgroundTheme,LogoTheme,InputTheme } from '../components/ThemeFile';

//Device Dimensions
const {width, height} = Dimensions.get('screen');

function RegConfirm() {
  return (
   <View style={{width:width/1.15, alignSelf:'center', alignItems:'center' ,flex:1}}>
    <SvgComponent/>
    <Text style={FontTheme.footText}>
    You have successfully verified your national identity</Text> 
    <Text style={FontTheme.footText}>
    Please Proceed to add your addresses to start the address verification prosess 
    </Text>
    <View style= {{width:width, height:'15%', alignItems: "center", position:'absolute', bottom:0,}}>
      <SignUpNavigationButton title={'Get Started'} />
     </View>
   </View>
   
  )
}

export default RegConfirm;