import React, { useCallback, useMemo, useRef, useState } from "react";
import { View, Text, Image } from "react-native";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import { Dimensions } from "react-native";
import { Marker } from "react-native-maps";
import { SafeAreaView } from "react-native-safe-area-context";
import GlobalHeader from "../components/GlobalHeader";
import { useRoute } from "@react-navigation/native";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";

//Device Dimenstions
const { width, height } = Dimensions.get("screen");

const AddLocation = () => {
  // getting passed title from add address screen
  const route = useRoute();
  const title = route.params.title;

  // handling the bottom sheet to appear
  // ref
  const bottomSheetRef = useRef(<BottomSheet />, null);

  // variables
  const snapPoints = useMemo(() => ["10%", "40%"], []);

  // callbacks
  const handleSheetChanges = useCallback((index) => {
    // console.log("handleSheetChanges", index);
  }, []);

  // console.log(title);
  const [center, setCenter] = useState([
    -17.830675105928798, 31.04908875542284,
  ]);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <GlobalHeader title={`Add ${title} Address`} backable={true} />

      <View>
        <MapView
          style={{ height: height * 1, width: width }}
          provider={PROVIDER_GOOGLE}
          showsUserLocation
          initialRegion={{
            latitude: center[0],
            longitude: center[1],
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
          onRegionChange={(x) => {
            // console.log(x);
          }}
          onMarkerDragEnd={() => {
            const newCenter = [x.latitude, x.longitude];
            setCenter([...newCenter]);
          }}
        >
          <Marker
            image={require("../assets/icons/map-marker-01.png")}
            position={"center"}
            draggable={false}
            tracksViewChanges={false}
            centerOffset={{ x: 0, y: 0 }}
            coordinate={{ latitude: center[0], longitude: center[1] }}
          />
        </MapView>
      </View>
      <BottomSheet
        animateOnMount={true}
        // enablePanDownToClose={true}
        ref={bottomSheetRef}
        index={1}
        snapPoints={snapPoints}
        onChange={handleSheetChanges}
      >
        <View>
          <Text>hey this ia a text</Text>
        </View>
      </BottomSheet>
    </SafeAreaView>
  );
};

export default AddLocation;
