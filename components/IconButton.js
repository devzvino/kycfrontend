import React from 'react'
import { View,Image,Text, Dimensions, Pressable } from 'react-native';


import HomeSvg from "./HomeSvg";
import QRSvg from "./QRSvg";
import AddSvg from "./AddSvg";


const { width, height } = Dimensions.get("screen");

import { FontTheme,ButtonTheme,ImageBackgroundTheme,LogoTheme,InputTheme,ImageTheme } from '../components/ThemeFile';

export const IconButtonHome=({iconButtonTitle})=> {
  return (
    <Pressable style={{flexDirection:'row', alignItems:'center', }}>
       <HomeSvg/>
       <Text style={FontTheme.iconButton}>{iconButtonTitle}</Text>
    </Pressable>
  );
}


export const IconButtonAdd=()=> {
    return (
      <Pressable style={{flexDirection:'row',alignItems:'center', alignSelf:'center',}}>
         <AddSvg/>
      </Pressable>
    );
  }


  export const IconButtonQR=({iconButtonTitle})=> {
    return (
      <Pressable style={{flexDirection:'row', alignItems:'center', alignSelf:'center', }}>
         <QRSvg/>
         <Text style={FontTheme.iconButton}>{iconButtonTitle}</Text>
      </Pressable>
    );
  }