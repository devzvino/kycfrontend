import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import { Dimensions } from "react-native";
import { Marker } from "react-native-maps";
import { SafeAreaView } from "react-native-safe-area-context";
import GlobalHeader from "../components/GlobalHeader";
import { useNavigation, useRoute } from "@react-navigation/native";
import BottomSheet from "@gorhom/bottom-sheet";
import FormInputWithLabel from "../components/FormInputWithLabel";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { ColorTheme } from "../components/ThemeFile";
import { LocationMarkerIcon } from "react-native-heroicons/outline";
import * as Location from "expo-location";
import { mapLocationLoading } from "../components/appMessages";
import { GOOGLE_API_KEY } from "../environmentVariables";
import axios from "axios";

//Device Dimenstions
const { width, height } = Dimensions.get("screen");

const AddLocation = () => {
  // getting passed title from add address screen
  const route = useRoute();
  const navigation = useNavigation();
  const title = route.params.title;

  // inputs
  const [loading, setloading] = useState(false);
  const [confrimSnapPoint, setConfrimSnapPoint] = useState();
  const [address, setAddress] = useState();
  const [surburb, setSurburb] = useState();
  const [coroodinates, setCoroodinates] = useState(null);
  const [currentLocation, setCurrentLocation] = useState(null);
  const [errMsg, setErrMsg] = useState(null);
  const [city, setCity] = useState();

  // distance section
  const [feedback, setFeedback] = useState();

  // getting current user location
  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrMsg("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setCurrentLocation(location);
      // console.log(currentLocation);
    })();
  }, []);

  // handleAddAddress
  const handleAddAddress = () => {
    setloading(true);
    setTimeout(() => {
      setConfrimSnapPoint(true);
      setloading(false);
    }, 2000);
  };

  const handleConfirm = async () => {
    setloading(true);
    if (feedback.rows[0].elements[0].distance.value < 30) {
      if (title === "home") {
        axios
          .post("http://192.168.100.5:4000/api/location/", {
            userInfo: "62cfecbaa948e3505d483f40",
            homeAddress: address,
            homeSurburb: surburb,
            homeCity: city,
            homeLocation: JSON.stringify({
              lat: currentLocation.coords.latitude,
              lng: currentLocation.coords.longitude,
            }),
            workLocation: [""],
          })
          .then((res) => {
            if (res.status === 200) {
              navigation.navigate("Home");
            } else {
              alert("Sorry could not verify you, please try again later");
            }
          })
          .catch((error) => {
            console.log(error);
          });
      } else {
        axios
          .post("http://192.168.100.5:4000/api/location/", {
            userInfo: "62cfecbaa948e3505d483f40",
            workAddress: address,
            workSurburb: surburb,
            workCity: city,
            workLocation: JSON.stringify({
              lat: currentLocation.coords.latitude,
              lng: currentLocation.coords.longitude,
            }),
            homeLocation: [""],
          })
          .then((res) => {
            if (res.status === 200) {
              navigation.navigate("Home");
            } else {
              alert("Sorry could not verify you, please try again later");
            }
          })
          .catch((error) => {
            console.log(error);
          });
      }

      setloading(false);
    } else {
      alert(`you are not ${title}`);
      setloading(false);
    }
  };

  // handling the bottom sheet to appear
  // ref
  const bottomSheetRef = useRef(<BottomSheet />, null);

  // variables
  const snapPoints = useMemo(() => ["10%", "60%"], []);
  const singleSnap = useMemo(() => ["10%", "25%"], []);

  // callbacks
  const handleSheetChanges = useCallback((index) => {
    // console.log("handleSheetChanges", index);
  }, []);

  const updateRegionCenter = async () => {
    const url = `https://maps.googleapis.com/maps/api/distancematrix/json?units=metric&origins=${currentLocation.coords.latitude},${currentLocation.coords.longitude}&destinations=${coroodinates?.latitude},${coroodinates?.longitude}&key=${GOOGLE_API_KEY}`;
    axios
      .get(url)
      .then((response) => {
        console.log(response.data);
        setFeedback(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <GlobalHeader
        title={confrimSnapPoint ? "Select Location " : `Add ${title} Address`}
        backable={true}
      />

      <View style={{ position: "relative" }}>
        {confrimSnapPoint && (
          <TouchableOpacity style={styles.locateBtn}>
            <LocationMarkerIcon color={ColorTheme.main} />
          </TouchableOpacity>
        )}

        {currentLocation ? (
          <MapView
            onReady
            style={{ height: height * 1, width: width }}
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
            {currentLocation ? (
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
            )}
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
        )}
      </View>
      <BottomSheet
        animateOnMount={true}
        // enablePanDownToClose={true}
        ref={bottomSheetRef}
        index={1}
        snapPoints={confrimSnapPoint ? singleSnap : snapPoints}
        onChange={handleSheetChanges}
      >
        <KeyboardAwareScrollView>
          <View style={{ flex: 1, paddingVertical: 10, paddingHorizontal: 25 }}>
            {!confrimSnapPoint ? (
              <>
                <FormInputWithLabel
                  title={title}
                  keyboardType="default"
                  value={address}
                  onTextChange={setAddress}
                />
                <FormInputWithLabel
                  label="Surburb / Area"
                  keyboardType="default"
                  value={surburb}
                  onTextChange={setSurburb}
                />
                <FormInputWithLabel
                  label="City"
                  keyboardType="default"
                  value={city}
                  onTextChange={setCity}
                />
                <TouchableOpacity
                  onPress={handleAddAddress}
                  style={{
                    backgroundColor: ColorTheme.main,
                    padding: 15,
                    borderRadius: 5,
                  }}
                >
                  <Text
                    style={{
                      textAlign: "center",
                      color: "white",
                      fontWeight: "bold",
                      textTransform: "uppercase",
                      fontSize: 18,
                    }}
                  >
                    {loading ? "Please wait..." : "Continue"}
                  </Text>
                </TouchableOpacity>
              </>
            ) : (
              <View style={{ alignItems: "center" }}>
                <Text style={{ color: "#7D7D7D", paddingVertical: 20 }}>
                  Drag the pin to your location and tap proceed
                </Text>
                {feedback && (
                  <>
                    <Text>Time Left : </Text>
                    <Text>distance : </Text>
                  </>
                )}
                <TouchableOpacity
                  onPress={handleConfirm}
                  style={{
                    backgroundColor: ColorTheme.main,
                    padding: 15,
                    borderRadius: 5,
                    width: "100%",
                  }}
                >
                  <Text
                    style={{
                      textAlign: "center",
                      color: "white",
                      fontWeight: "bold",
                      textTransform: "uppercase",
                      fontSize: 18,
                    }}
                  >
                    {loading ? "Please wait..." : "Confirm"}
                  </Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        </KeyboardAwareScrollView>
      </BottomSheet>
    </SafeAreaView>
  );
};

export default AddLocation;

const styles = StyleSheet.create({
  locateBtn: {
    position: "absolute",
    top: 10,
    zIndex: 2,
    right: 15,
    borderRadius: 5,
    backgroundColor: "white",
    padding: 10,
  },
});
