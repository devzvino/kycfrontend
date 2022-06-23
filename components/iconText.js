import { View,Text, Image } from "react-native";
import React from "react";
import check_icon from '../assets/icons/check_grey.png'
import CheckSvg from "./CheckSvg";

import { FontTheme,ButtonTheme,ImageBackgroundTheme,LogoTheme,InputTheme,ImageTheme } from '../components/ThemeFile';

const IconText = ({paraText})=>{
 
        return(
            <View style={{flexDirection:'row'}}>
                <CheckSvg style={ImageTheme.iconInText}/>
                <Text style={FontTheme.icontext}>{paraText}</Text>
            </View>
);
}

export default IconText;
