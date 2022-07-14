import React from 'react'
import { View, Dimensions, StyleSheet, Text,Image, TouchableOpacity } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';


//import Screens
import Home from '../screens/Home';
import QRcode from '../screens/QRcode';
import AddLocation from '../screens/AddLocation';

import HomeSvg from '../components/HomeSvg'

//import Svgs


//use Device Dimensions
const {width, height} = Dimensions.get('screen');

const Tab = createBottomTabNavigator();


const TabsNav = () => {
  return (
    <Tab.Navigator 
    screenOptions={
      
      {
        tabBarStyle:{
          position:'absolute',
          flex:1,
          backgroundColor: '#F8f8f8', 
          elevation:0, 
          bottom: 25,
          height:90,
          right: 20,
          left:20,
          borderRadius:15,
          alignItems: 'center',
          justifyContent: 'center',
          ...styles.shadow, 
        },
        tabBarShowLabel:false,
      headerShown:false,
      }}
      >
    <Tab.Screen name={'Home'} 
    component={Home}  
    options={{
        tabBarIcon:({focused})=>{
          <View style={{alignItems:'center', justifyContent: 'center', top:10,}}>
           <Image
           source={require('../assets/icons/success.png')}
           resizeMode= 'contain'
           style={{
            width:25,
            height:25,
            tintColor: focused? '#2FBF00': '#808080',
           }}
           />
            <Text 
            style={{
              color:focused? '#2FBF00': '#808080', 
              fontSize:12, 
              }}>Home</Text>
          </View>
        },
      }
    }  />
    <Tab.Screen name={'AddLocation'} component={AddLocation} />
    <Tab.Screen name={'QRcode'} component={QRcode} />
  </Tab.Navigator>
  
  )
}

const styles = StyleSheet.create({
      shadow:{
        shadowColor: '#808080',
        shadowOpacity: 0.25,
        shadowRadius:3.5,
        shadowOffset:{
          width:0,
          height:10
        },
        elevation:5
      }
});

export default TabsNav;