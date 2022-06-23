import React, { useEffect, useState } from 'react'
import { View, Text, TextInput } from 'react-native';
import { Dimensions } from 'react-native';
import {Picker} from '@react-native-picker/picker';


//Device Dimenstions
const {width, height} = Dimensions.get('screen');

import { FontTheme,ButtonTheme,ImageBackgroundTheme,LogoTheme,InputTheme } from './ThemeFile';
const dataFile = require('../assets/phonePicker.json')

function PhoneInput({ onChange,onFocus,onBlur,placeholder, title, info }) {


const [selectedCode, setSelectedCode] = useState();
const [newData, setNewData] =useState();

useEffect(()=>{
  // dataFile.map((items)=>{
  const tempData = []
  dataFile.map((item)=>{
    tempData.push({key:item.name, value:item.dial_code})
  })
    setNewData(tempData)
  // })
  
},[])

  return (
    <View>
       <Text style={FontTheme.inputTitle}>{title}</Text>

       <View style={{flexDirection:'row'}}>
    <Picker
          selectedValue={selectedCode}
          style= {InputTheme.phoneDropDown}
          onValueChange={(itemValue, itemIndex) =>
            selectedCode(itemValue)
          }>
          
             <Picker.Item label={dataFile.code} value={dataFile} />
         
        </Picker>
        <TextInput
        onChange={onChange}
        style={InputTheme.phoneInput}
        placeholder={placeholder}
        ></TextInput>
       </View>

      
        <Text style={{width:width/1.15, marginTop:0, fontFamily:'Poppins-Medium', color:'#7D7D7D'}}>{info}</Text>

    </View>
  )
}

export default PhoneInput;