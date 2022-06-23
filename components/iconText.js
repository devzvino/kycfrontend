import { View,Text, Image } from "react-native";
import React from "react";
import check_icon from '../assets/icons/check_grey.png'

import { FontTheme,ButtonTheme,ImageBackgroundTheme,LogoTheme,InputTheme,ImageTheme } from '../components/ThemeFile';

const IconText = ({paraText})=>{
 
        return(
            <View style={{flexDirection:'row'}}>
                <Image style={ImageTheme.iconInText} source={check_icon}/>
                <Text style={FontTheme.icontext}>{paraText}</Text>
            </View>
);
}

export default IconText;
