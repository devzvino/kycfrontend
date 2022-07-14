import React,{useState} from 'react'
import { View,Text,Image } from 'react-native';
import MapView, {PROVIDER_GOOGLE }  from 'react-native-maps';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Dimensions } from "react-native";
import { Marker } from 'react-native-maps';



//Device Dimenstions
const {width, height} = Dimensions.get('screen');


const AddLocation = () => {
  const [center,setCenter]  = useState([-17.830675105928798,31.04908875542284]);

  return (
  

        <View>
  
        <View>
           <MapView
         style={{ height:height*1, width:width }}
         provider={PROVIDER_GOOGLE}
         showsUserLocation
         initialRegion={{
         latitude: center[0],
         longitude: center[1],
         latitudeDelta: 0.0922,
         longitudeDelta: 0.0421}}
         onRegionChange={(x)=>{
          console.log(x);
        
         }}
         onMarkerDragEnd={()=>{
          const newCenter =[x.latitude,x.longitude];
          setCenter([...newCenter]);
         }}
         
         >

        <Marker 
        image={require('../assets/icons/map-marker-01.png')}
        position={'center'}
        draggable={false}
        tracksViewChanges={false}
        centerOffset={{x:0, y:0}}
        coordinate={{   latitude: center[0],
            longitude: center[1],}}/>
         </MapView> 
        </View>
        <View>
            
        </View>
      
        
    
   </View>
 
   
  )
}

export default AddLocation;