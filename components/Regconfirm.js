import React from 'react'
import{View,Image, Text, Dimensions} from 'react-native';
import success from '../assets/icons/Union.svg'
import SvgComponent from './SuccessSvg'

//App theme styles
import { FontTheme,ButtonTheme,ImageBackgroundTheme,LogoTheme,InputTheme } from '../components/ThemeFile';

//Device Dimensions
const {width, height} = Dimensions.get('screen');

function RegConfirm() {
  return (
   <View style={{width:width/1.15, alignSelf:'center', alignItems:'center'}}>
    <SvgComponent/>
    <Text style={FontTheme.footText}>
    You have successfully verified your national identity</Text> 
    <Text style={FontTheme.footText}>
    Please Proceed to add your addresses to start the address verification prosess 
    </Text>
   </View>
  )
}

export default RegConfirm;