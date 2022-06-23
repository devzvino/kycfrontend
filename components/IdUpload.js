import React from "react";
import  *  as ImagePicker from 'expo-image-picker';
import { Dimensions } from "react-native";

import IconText from "./iconText";
import { View,Text,Image } from "react-native";


import { FontTheme,ButtonTheme,ImageBackgroundTheme,LogoTheme,InputTheme } from '../components/ThemeFile';

//Device Dimenstions
const {width, height} = Dimensions.get('screen');

const uploadWarning = "To avoid delays when verifying account, Please make sure that:";

const IdUpload =()=>{

    return(

        <View style={{width:width/1.15, alignSelf:'center'}}>
            <Text style={FontTheme.description}>
            {uploadWarning}
            </Text>
            <View style={{marginTop:10}}>
            <IconText
            paraText={'Document should be good condition and clearly visible.'}/>
            <IconText
            paraText={'Make sure that there is no light glare on the card.'}/>  
            </View>
            
        </View>
    )
}

export default IdUpload;