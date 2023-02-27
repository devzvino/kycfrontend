import BottomSheet, { BottomSheetScrollView } from "@gorhom/bottom-sheet";
import { useNavigation, useRoute } from "@react-navigation/native";
import axios from "axios";
import * as Location from "expo-location";
import DateTimePicker from "@react-native-community/datetimepicker";
import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Dimensions, Image, Platform, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import { mapLocationLoading } from "../components/appMessages";
import FormInputWithLabel from "../components/FormInputWithLabel";
import GlobalHeader from "../components/GlobalHeader";
//import components
import MainButton from "../components/MainButton";
import { keys } from "../environmentVariables";
import { ColorTheme } from "../components/ThemeFile";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as BackgroundFetch from 'expo-background-fetch';
import * as TaskManager from 'expo-task-manager';
// import * as Location from 'expo-location';


const { height, width } = Dimensions.get("window");


const BACKGROUND_FETCH_TASK = 'background-fetch';

TaskManager.defineTask(BACKGROUND_FETCH_TASK, async () => {
  const now = Date.now();

  console.log(`Got background fetch call at date: ${new Date(now).toISOString()}`);

  // Be sure to return the successful result type!
  return BackgroundFetch.BackgroundFetchResult.NewData;
});

const LocationSelect = () => {
  //GET PERMITION TO LOCATION

  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    requestPermissions();
    (async () => {

      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, []);

  const LOCATION_TASK_NAME = "background-location-task";

  const requestPermissions = async () => {
    const { status: foregroundStatus } = await Location.requestForegroundPermissionsAsync();
    if (foregroundStatus === "granted") {
      const { status: backgroundStatus } = await Location.requestBackgroundPermissionsAsync();
      if (backgroundStatus === "granted") {
        await Location.startLocationUpdatesAsync(LOCATION_TASK_NAME, {
          accuracy: Location.Accuracy.Balanced,
        });
      }
    }
  };




  //===============================================


  async function registerBackgroundFetchAsync() {
    return BackgroundFetch.registerTaskAsync(BACKGROUND_FETCH_TASK, {
      minimumInterval: 60, // 15 minutes
      stopOnTerminate: false, // android only,
      startOnBoot: true, // android only
    });
  }

  const [isRegistered, setIsRegistered] = React.useState(false);
  const [status, setStatus] = React.useState(null);





  const route = useRoute();
  const { title } = route.params;
  const navigation = useNavigation();
  c

  const [loading, setloading] = useState(false);
  const [loading2, setLoading2] = useState(false);
  const [confrimSnapPoint, setConfrimSnapPoint] = useState();
  const [coordinates, setCoordinates] = useState(null);
  const [currentLocation, setCurrentLocation] = useState();

  const [houseNo, setHouseNo] = useState();
  const [suburb, setSuburb] = useState();
  const [companyName, setCompanyName] = useState();
  const [building, setBuilding] = useState();
  const [streetName, setStreetName] = useState();
  const [city, setCity] = useState();
  const [workingHours, setWorkingHours] = useState();
  const [errMsg, setErrMsg] = useState(null);

  //date and time
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState("date");
  const [showStart, setShowStart] = useState(false);
  const [showEnd, setShowEnd] = useState(false);
  const [endTime, setEndTime] = useState();
  const [startTime, setStartTime] = useState();

  // handling date
  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowStart(Platform.OS === "ios");

    let tempDate = new Date(currentDate);

    var minutes = tempDate.getMinutes();
    minutes = minutes > 9 ? minutes : "0" + minutes;

    // if(thehours.)
    let fTime = tempDate.getHours() + ":" + minutes;

    if (event.type == "set") {
      setStartTime(fTime);
    } else {
      setStartTime(null);
    }
  };
  const onChangeEnd = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowEnd(Platform.OS === "ios");

    let tempDate = new Date(currentDate);
    var minutes = tempDate.getMinutes();
    minutes = minutes > 9 ? minutes : "0" + minutes;
    let fTime = tempDate.getHours() + ":" + minutes;
    if (event.type == "set") {
      setEndTime(fTime);
    } else {
      setEndTime(null);
    }
  };

  const showModeStartTime = (currentMode) => {
    setShowStart(true);
    setMode(currentMode);
  };
  const showModeEndTime = (currentMode) => {
    setShowEnd(true);
    setMode(currentMode);
  };

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
    })();

    return () => {
      setCurrentLocation(null);
    };
  }, []);

  // getting new location when map movies
  const updateRegionCenter = async () => {
    const url = `https://maps.googleapis.com/maps/api/distancematrix/json?units=metric&origins=${currentLocation.coords.latitude
      },${currentLocation.coords.longitude}&destinations=${coordinates?.latitude ? coordinates.latitude : currentLocation.coords.latitude
      },${coordinates?.longitude ? coordinates.longitude : currentLocation.coords.longitude}&key=${keys.GOOGLE_API}`;
    axios
      .get(url)
      .then((response) => {
        // console.log(response.data);
        setFeedback(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // handling the bottom sheet to appear
  const bottomSheetRef = useRef(<BottomSheet />, null);

  // variables
  const snapPoints = useMemo(() => ["5%", "90%"], []);
  const singleSnap = useMemo(() => ["10%", "25%"], []);

  const handleSheetChanges = useCallback((index) => {
    // console.log("handleSheetChanges", index);
  }, []);

  // handleAddAddress
  const handleAddAddress = () => {
    if (title === "home") {
      if (!streetName || !houseNo || !suburb || !city) {
        alert("Please fill in the form");
        return;
      }
    }
    if (title === "work") {
      if (!companyName || !streetName || !suburb || !city || !building || !startTime || !endTime) {
        alert("Please fill in the form");
        return;
      }
    }

    setloading(true);
    setTimeout(() => {
      setConfrimSnapPoint(true);
      setloading(false);
    }, 2000);
  };

  const handleConfirm = async () => {
    setLoading2(true);
    // validation is all distance are available
    if (!feedback.rows[0].elements[0].status === "OK") {
      alert("Please drag the pin to your location");
      setLoading2(false);
    }

    if (feedback.rows[0].elements[0].distance.value < 80) {
      if (title === "home") {
        axios
          .post(`${keys.apiURL}api/home/create`, {
            title: title,
            user_id: myId,
            userInfo: myId,
            houseNo: houseNo,
            streetName: streetName,
            suburb: suburb,
            city: city,
            homeLatLng: JSON.stringify({
              lat: currentLocation.coords.latitude,
              lng: currentLocation.coords.longitude,
            }),
          })
          .then((res) => {
            if (res.status === 200) {
              navigation.navigate("Addreses");
            } else {
              alert("Sorry could not verify you, please try again later");
            }
          })
          .catch((error) => {
            console.log(error);
          });
        setloading(false);
      } else {
        axios
          .post(`${keys.apiURL}api/work/create`, {
            title: title,
            user_id: myId,
            userInfo: myId,
            companyName: companyName,
            streetName: streetName,
            suburb: suburb,
            city: city,
            building: building,
            workingHours: JSON.stringify({
              startTime: startTime,
              endTime: endTime,
            }),
            workLatLng: JSON.stringify({
              lat: currentLocation.coords.latitude,
              lng: currentLocation.coords.longitude,
            }),
          })
          .then((res) => {
            if (res.status === 200) {
              navigation.navigate("Addreses");
            } else {
              alert("Sorry could not verify you, please try again later");
            }
          })
          .catch((error) => {
            console.log(error);
          });
        setloading(false);
      }

      setloading(false);
    } else {
      alert(`you are not ${title}`);
      setloading(false);
    }
  };

  const checkStatusAsync = async () => {
    const status = await BackgroundFetch.getStatusAsync();
    const isRegistered = await TaskManager.isTaskRegisteredAsync(BACKGROUND_FETCH_TASK);
    setStatus(status);
    setIsRegistered(isRegistered);
  };

  const toggleFetchTask = async () => {

    await registerBackgroundFetchAsync();
    checkStatusAsync();
  };

  useEffect(() => {
    toggleFetchTask();
    checkStatusAsync();

    return () => {

    }
  }, [])


  // end of functions
  // start of render

  return (
    <KeyboardAwareScrollView
      enableOnAndroid
      enableAutomaticScroll
      extraHeight={100}
      contentContainerStyle={{
        flex: 1,
      }}
    >
      <View style={styles.container}>
        {/* navigation section */}
        <View
          style={{
            position: "absolute",
            zIndex: 10,
            paddingTop: 20,
            backgroundColor: "white",
          }}
        >
          <GlobalHeader
            title={confrimSnapPoint ? "Select Location " : `Add ${title[0].toUpperCase() + title.substring(1)} Address`}
            backable={true}
          />
        </View>

        {/* map section */}
        <View
          style={{
            height: height,
            justifyContent: "center",
            alignItems: "center",
            position: "absolute",
            bottom: 0,
            marginBottom: 150,
          }}
        >
          {currentLocation ? (
            <>
              <MapView
                scrollEnabled={false}
                showsUserLocation
                onReady
                maxZoomLevel={20}
                minZoomLevel={19}
                style={{ height: height, width: width }}
                provider={PROVIDER_GOOGLE}
                initialRegion={{
                  latitude: currentLocation.coords.latitude,
                  longitude: currentLocation.coords.longitude,
                  latitudeDelta: 0.0922,
                  longitudeDelta: 0.0421,
                }}
                onRegionChange={(x) => {
                  setCoordinates({
                    latitude: x.latitude,
                    longitude: x.longitude,
                  });
                }}
                onRegionChangeComplete={() => updateRegionCenter()}
              />
              <Image style={styles.imageMarker} source={require("../assets/icons/map-marker-01.png")} />
            </>
          ) : (
            <Text>{mapLocationLoading}</Text>
          )}
        </View>

        {/* bottomsheet section */}

        <BottomSheet
          animateOnMount={true}
          // enablePanDownToClose={true}
          ref={bottomSheetRef}
          index={1}
          snapPoints={confrimSnapPoint ? singleSnap : snapPoints}
          onChange={handleSheetChanges}
        >
          <BottomSheetScrollView>
            <View
              style={{
                flex: 1,

                paddingVertical: 10,
                paddingHorizontal: 25,
                alignItems: "center",
              }}
            >
              {!confrimSnapPoint ? (
                <>
                  {title === "work" && (
                    <>
                      <FormInputWithLabel
                        label="Company Name"
                        keyboardType="default"
                        value={companyName}
                        onTextChange={setCompanyName}
                      // placeholder={"KYC Africa (Pvt) Ltd "}
                      />
                      <FormInputWithLabel
                        label="Building"
                        keyboardType="default"
                        value={building}
                        onTextChange={setBuilding}
                      // placeholder={"Joina City"}
                      />
                      <FormInputWithLabel
                        label="Street Address"
                        keyboardType="default"
                        value={streetName}
                        onTextChange={setStreetName}
                      // placeholder={"54 Jason Moyo Ave"}
                      />
                      <FormInputWithLabel
                        label="Area / Suburb"
                        keyboardType="default"
                        value={suburb}
                        onTextChange={setSuburb}
                      // placeholder={"CBD"}
                      />
                      <FormInputWithLabel
                        label="City"
                        keyboardType="default"
                        value={city}
                        onTextChange={setCity}
                      // placeholder={"Harare"}
                      />
                      <Text style={[{ textAlign: "left", width: "100%" }, styles.title]}>
                        Time you start and end work in 24Hrs?
                      </Text>
                      <View
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          width: "100%",
                          borderRadius: 5,
                          justifyContent: "space-between",
                          backgroundColor: "#EFF0F6",
                        }}
                      >
                        <TouchableOpacity onPress={() => showModeStartTime("time")} style={[styles.inputContainer]}>
                          <Text style={{ color: ColorTheme.main, fontWeight: "bold" }}>
                            {startTime ? startTime : "Start Time"}
                          </Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => showModeEndTime("time")} style={[styles.inputContainer]}>
                          <Text style={{ color: ColorTheme.main, fontWeight: "bold" }}>
                            {endTime ? endTime : "End Time"}
                          </Text>
                        </TouchableOpacity>
                      </View>
                      {showStart && (
                        <DateTimePicker
                          testID="dateTimePicker"
                          value={date}
                          format={"hh:mm a"}
                          mode={mode}
                          is24Hour={true}
                          display={Platform.OS === "ios" ? "default" : "default"}
                          style={{ width: "100%" }}
                          onChange={onChange}
                        />
                      )}
                      {showEnd && (
                        <DateTimePicker
                          testID="dateTimePicker"
                          value={date}
                          mode={mode}
                          is24Hour={true}
                          display={Platform.OS === "ios" ? "default" : "default"}
                          style={{ width: "100%" }}
                          onChange={onChangeEnd}
                        />
                      )}
                    </>
                  )}

                  {title === "home" && (
                    <>
                      <FormInputWithLabel
                        label="House Number"
                        keyboardType="default"
                        value={houseNo}
                        onTextChange={setHouseNo}
                      // placeholder={"7878"}
                      />

                      <FormInputWithLabel
                        label="Street Name"
                        keyboardType="default"
                        value={streetName}
                        onTextChange={setStreetName}
                      // placeholder={"Mangwende Drive"}
                      />

                      <FormInputWithLabel
                        label="Suburb / Area"
                        keyboardType="default"
                        value={suburb}
                        onTextChange={setSuburb}
                      // placeholder={"Kuwadzana"}
                      />
                      <FormInputWithLabel
                        label="City"
                        keyboardType="default"
                        value={city}
                        onTextChange={setCity}
                      // placeholder={"Harare"}
                      />
                    </>
                  )}

                  <MainButton onPress={handleAddAddress} title={loading ? "Please wait..." : "Continue"}></MainButton>
                </>
              ) : (
                <View style={{ width: "100%", alignItems: "center" }}>
                  <Text style={{ color: "#7D7D7D", textAlign: "center" }}>
                    Please Confirm you are at your {title} location.
                  </Text>

                  <MainButton
                    disabled={loading2}
                    onPress={handleConfirm}
                    title={loading2 ? "Please wait..." : "Confirm"}
                  ></MainButton>
                </View>
              )}
            </View>
          </BottomSheetScrollView>
        </BottomSheet>
      </View>
    </KeyboardAwareScrollView>
  );
};

export default LocationSelect;

const styles = StyleSheet.create({
  container: { flex: 1 },
  imageMarker: {
    position: "absolute",
    width: 35,
    resizeMode: "contain",
  },
  ccontainer: {
    flex: 1,
    padding: 10,
    paddingTop: 10,
    backgroundColor: "#ecf0f1",
  },
  inputContainer: {
    flex: 1,
    padding: 15,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontWeight: "bold",
    fontSize: 16,
    marginHorizontal: 10,
    marginBottom: 8,
    textTransform: "capitalize",
  },
});
