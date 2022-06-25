import React from 'react'
import { View,Text,Image } from 'react-native';
import MapView, {PROVIDER_GOOGLE }  from 'react-native-maps';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Dimensions } from "react-native";
import { Marker } from 'react-native-maps';



//Device Dimenstions
const {width, height} = Dimensions.get('screen');


const AddLocation = () => {
  return (
    <SafeAreaView>

        <View>
        <View>
             <Text> Hi map 1</Text> 
        </View>
        <View>
           <MapView
         style={{ height:height/1.5, width:width }}
         provider={PROVIDER_GOOGLE}
         showsUserLocation
         initialRegion={{
         latitude: -17.830675105928798,
         longitude: 31.04908875542284,
         latitudeDelta: 0.0922,
         longitudeDelta: 0.0421}}>

        <Marker draggable
        coordinate={{   latitude: -17.830675105928798,
            longitude: 31.04908875542284,}}/>
         </MapView> 
        </View>
        <View>
            
        </View>
      
        
    
   </View>
    </SafeAreaView>
   
  )
}

export default AddLocation;