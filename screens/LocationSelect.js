
import { View,Text, } from 'react-native';
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';

import { Dimensions } from 'react-native';
const {height,width}=Dimensions.get('screen');

const LocationSelect = () => {



  return (
    <View>
      <View>
 
          <MapView
            onReady
            style={{ height: height, width: width }}
            provider={PROVIDER_GOOGLE}
            showsUserLocation
            initialRegion={{
              latitude: currentLocation.coords.latitude,
              longitude: currentLocation.coords.longitude,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
            onRegionChange={(x) => {
              setCoroodinates({
                latitude: x.latitude,
                longitude: x.longitude,
              });
            }}
            onRegionChangeComplete={() => updateRegionCenter()}
          >
           
              <Marker
                position={"center"}
                draggable={false}
                centerOffset={{ x: 0, y: 0 }}
                coordinate={{
                  latitude: !coroodinates
                    ? currentLocation.coords.latitude
                    : coroodinates.latitude,
                  longitude: !coroodinates
                    ? currentLocation.coords.longitude
                    : coroodinates.longitude,
                }}
              >
                <Image
                  source={require("../assets/icons/map-marker-01.png")}
                  style={{ height: 50, width: 50, resizeMode: "contain" }}
                />
              </Marker>
            ) : (
              <View></View>
           
          </MapView>
        ) : (
          <View
            style={{
              alignItems: "center",
              height: "100%",
              backgroundColor: "white",
            }}
          >
            <Text style={{ marginTop: 40 }}>{mapLocationLoading}</Text>
          </View>
       
      </View>

    </View>
  )
}

export default LocationSelect;