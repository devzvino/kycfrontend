import React from "react";
import { View,Text, Touchable,Dimensions } from "react-native";


import IconButton from "./IconButton";

import { IconButtonHome,IconButtonAdd,IconButtonQR} from "./IconButton";


const {width, height} = Dimensions.get('screen');



const NavigationMenuBar = () => {
  return (
   <View 
   style={{
    width:width,
    height:height*0.2,
    flexDirection:'row', 
    backgroundColor: '#f8f8f8',
    paddingLeft: width*0.1,
    paddingRight: width*0.1
}}
    >
    <View style={{ width:width*0.3,
    height:height, alignItems:'center',justifyContent:"center"}}>
        <IconButtonHome
        iconButtonTitle={'Home'}
        />
    </View>
    <View style={{ width:width*0.20,
    height:height,}}>
    <IconButtonAdd
        />
    </View>
    <View style={{ width:width*0.3,
    height:height,}}>
    <IconButtonQR
        // iconSource={QRSvg}
        iconButtonTitle={'QR Code'}
        />
    </View>
   </View>
  )
}

export default NavigationMenuBar

