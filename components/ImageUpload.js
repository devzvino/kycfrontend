import React from 'react'
import { View,Text,Image,TouchableOpacity } from 'react-native'
import cam from '../assets/icons/cam.png'

import { FontTheme,ButtonTheme,ImageBackgroundTheme,LogoTheme,InputTheme,ImageTheme } from '../components/ThemeFile';

function ImageUpload() {
  return (
   <View>
    <Text>

    </Text>
    <TouchableOpacity style={{}}>
        <Image source={cam}/>
        <Text>
        Upload ID
        </Text>
    </TouchableOpacity>
    
   </View>
  )
}

export default ImageUpload