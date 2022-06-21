import React, { useEffect, useState } from 'react'
import { View, Text, TextInput } from 'react-native';
import { Dimensions } from 'react-native';
import SelectDropdown from 'react-native-select-dropdown';


//Device Dimenstions
const {width, height} = Dimensions.get('screen');

import { FontTheme,ButtonTheme,ImageBackgroundTheme,LogoTheme,InputTheme } from './ThemeFile';
const dataFile = require('../assets/phonePicker.json')

function PhoneInput({ onChange,onFocus,onBlur,placeholder, title, info }) {


const [code, setCode] = useState();
const [newData, setNewData] =useState();

useEffect(()=>{
  // dataFile.map((items)=>{
  const tempData = []
  dataFile.map((item)=>{
    tempData.push({key:item.name, value:item.dial_code})
  })
    setNewData(tempData)
  // })
  console.log(tempData);
},[])

  return (
    <View>
       <Text style={FontTheme.inputTitle}>{title}</Text>

       <View style={{flexDirection:'row'}}>
        <SelectDropdown
          data={newData}
          buttonStyle={InputTheme.phoneDropDown}
          defaultButtonText={'+263'}
          onSelect={(selectedItem, index) => {
            console.log(selectedItem, index)
          }}
          buttonTextAfterSelection={(selectedItem, index) => {
            // text represented after item is selected
            // if data array is an array of objects then return selectedItem.property to render after item is selected
            return selectedItem
          }}
          rowTextForSelection={(item, index) => {
            // text represented for each item in dropdown
            // if data array is an array of objects then return item.property to represent item in dropdown
            return newData
          }}
        />
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