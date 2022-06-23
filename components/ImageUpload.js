import React from 'react'
import { View,Text,Image,TouchableOpacity } from 'react-native'
import CamSvg from './CamSvg';
import { Dimensions } from "react-native";

import { FontTheme,ButtonTheme,ImageBackgroundTheme,LogoTheme,InputTheme,ImageTheme } from '../components/ThemeFile';

const {width, height} = Dimensions.get('screen');

function ImageUpload({title, buttontext}) {
  return (
   <View>
    <Text style={FontTheme.inputTitle}>
    {title}
    </Text>
    <TouchableOpacity style={{ width:'100%', backgroundColor:'#EFF0F6',padding:30,alignItems:'center', borderRadius:5,marginTop:10,marginBottom:10,}}>
        <CamSvg/>
        <Text style={FontTheme.footerLink}>
            {buttontext}
        </Text>
    </TouchableOpacity>
    
   </View>
  )
}

export default ImageUpload;