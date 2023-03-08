import { ActivityIndicator, Dimensions, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import GlobalHeader from "../components/GlobalHeader";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SwipeListView } from "react-native-swipe-list-view";
import HomeVerificationCard from "../components/HomeVerificationCard";
import { keys } from "../environmentVariables";
import { useNavigation } from "@react-navigation/native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useFetchAddresses } from "../hooks/useFetchAddresses";
import { ColorTheme } from "../components/ThemeFile";
import { BriefcaseIcon, HomeIcon } from "react-native-heroicons/solid";
// ===================== BACKGROUND FETCH
import * as BackgroundFetch from "expo-background-fetch";
import * as TaskManager from "expo-task-manager";
import { UserContext } from "../context/UserContext";
import { HasLocationContext } from "../context/HasLocationContext";

import { locationCords } from "./GetLocation";
import { TempContext } from "../context/TempContext";
import HomeSwiperListDisplay from "../components/HomeSwiperListDisplay";

//Verify location

const checkCoordinatesInRadius = (coord1, coord2, radius) => {
  const toRadians = (degree) => (degree * Math.PI) / 180;
  const R = 6371; // Earth's radius in kilometers

  const lat1 = coord1.lat;
  const lon1 = coord1.lng;
  const lat2 = coord2.latitude;
  const lon2 = coord2.longitude;
  let databaseSingleAddress;

  const dLat = toRadians(lat2 - lat1);
  const dLon = toRadians(lon2 - lon1);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRadians(lat1)) * Math.cos(toRadians(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  const distance = R * c;

  if (coord1.title === "home") {
    // ? home verifications
    fetch(`https://kycbackendapp.herokuapp.com/api/home/${coord1.id}`)
      .then((response) => response.text())
      .then((result) => {
        databaseSingleAddress = JSON.parse(result);
        // once data is fetch

        // handle count for all ends
        let totalHomeCount = databaseSingleAddress.homeTotalCount + 1;
        let totalWorkCount = databaseSingleAddress.workTotalCount + 1;

        let updatedWorkCount = databaseSingleAddress.workVerificationCount + 1;
        let updatedCount = databaseSingleAddress.homeVerificationCount + 1;

        let { userInfo } = databaseSingleAddress;

        // console.log(totalHomeCount);
        // console.log(updatedCount);

        if (databaseSingleAddress.homeVerificationCount <= 19 && distance <= radius) {
          // * adding second step below
          var myHeaders = new Headers();
          myHeaders.append("Content-Type", "application/json");

          var raw = JSON.stringify({
            homeVerificationCount: updatedCount,
          });

          var requestOptions = {
            method: "PATCH",
            headers: myHeaders,
            body: raw,
            redirect: "follow",
          };

          fetch(`https://kycbackendapp.herokuapp.com/api/home/${coord1.id}`, requestOptions)
            .then((response) => response.text())
            .then((result) => {
              // !!!!!!console.log(result);
            })
            .catch((error) => console.log("error", error));
          // *
        }

        // changing state of verification
        if (databaseSingleAddress.homeVerificationCount === 20 && databaseSingleAddress.homeVerified !== "success") {
          // if (databaseSingleAddress.homeVerificationCount) {
          // * adding second step below
          var myHeaders = new Headers();
          myHeaders.append("Content-Type", "application/json");

          var raw = JSON.stringify({
            homeVerified: "success",
          });

          var requestOptions = {
            method: "PATCH",
            headers: myHeaders,
            body: raw,
            redirect: "follow",
          };

          fetch(`https://kycbackendapp.herokuapp.com/api/home/${coord1.id}`, requestOptions)
            .then((response) => response.text())
            .then((result) => {
              // console.log(result);
              schedulePushNotification();
            })
            .catch((error) => console.log("error", error));
          // *
        } else if (databaseSingleAddress.homeTotalCount === 20 && databaseSingleAddress.homeVerified !== "success") {
          //! setting the rejected state
          var myHeaders = new Headers();
          myHeaders.append("Content-Type", "application/json");

          var raw = JSON.stringify({
            homeVerified: "failed",
          });

          var requestOptions = {
            method: "PATCH",
            headers: myHeaders,
            body: raw,
            redirect: "follow",
          };

          fetch(`https://kycbackendapp.herokuapp.com/api/home/${coord1.id}`, requestOptions)
            .then((response) => response.text())
            .then((result) => {
              // console.log(result);
              // schedulePushNotification();
            })
            .catch((error) => console.log("error", error));
        }

        // * updating total count
        if (databaseSingleAddress.homeVerificationCount < 20 && databaseSingleAddress.homeTotalCount < 20) {
          // adding total counts to verification
          // console.log("====", databaseSingleAddress);
          // console.log("coords2====", coord2);

          var myHeaders = new Headers();
          myHeaders.append("Content-Type", "application/json");

          var raw = JSON.stringify({
            homeTotalCount: totalHomeCount,
          });

          var requestOptions = {
            method: "PATCH",
            headers: myHeaders,
            body: raw,
            redirect: "follow",
          };

          fetch(`https://kycbackendapp.herokuapp.com/api/home/${coord1.id}`, requestOptions)
            .then((response) => response.text())
            .then((result) => {
              //!!!!!! console.log(result);
            })
            .catch((error) => console.log("error", error));

          // todo implement logging report state
          var myHeaders = new Headers();
          myHeaders.append("Content-Type", "application/json");

          const stringedCoords = JSON.stringify(coord2);

          var reportRaw = JSON.stringify({
            user: databaseSingleAddress.user_id,
            homeid: databaseSingleAddress._id,
            username: userInfo.firstname + " " + userInfo.surname,
            workid: null,
            currentLocation: stringedCoords,
          });

          var requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: reportRaw,
            redirect: "follow",
          };

          fetch("https://kycbackendapp.herokuapp.com/api/report/create", requestOptions)
            .then((response) => response.text())
            .then((result) => console.log(result))
            .catch((error) => console.log("error", error));
          //todo implement logging report state
        }
        //
      })
      .catch((error) => console.log("error", error));
  } else if (coord1.title === "work") {
    // ? work verifications
    fetch(`https://kycbackendapp.herokuapp.com/api/work/${coord1.id}`)
      .then((response) => response.text())
      .then((result) => {
        databaseSingleAddress = JSON.parse(result);
        // once data is fetch

        // handle count for all ends

        let totalWorkCount = databaseSingleAddress.workTotalCount + 1;
        let updatedCount = databaseSingleAddress.workVerificationCount + 1;

        // console.log(totalHomeCount);
        // console.log(updatedCount);

        if (databaseSingleAddress.workVerificationCount <= 19 && distance <= radius) {
          // * adding second step below
          var myHeaders = new Headers();
          myHeaders.append("Content-Type", "application/json");

          var raw = JSON.stringify({
            workVerificationCount: updatedCount,
          });

          var requestOptions = {
            method: "PATCH",
            headers: myHeaders,
            body: raw,
            redirect: "follow",
          };

          fetch(`https://kycbackendapp.herokuapp.com/api/work/${coord1.id}`, requestOptions)
            .then((response) => response.text())
            .then((result) => {
              // !!!!!!console.log(result);
            })
            .catch((error) => console.log("error", error));
          // *
        }

        // changing state of verification
        if (databaseSingleAddress.workVerificationCount === 20 && databaseSingleAddress.workVerified !== "success") {
          // if (databaseSingleAddress.homeVerificationCount) {
          // * adding second step below
          var myHeaders = new Headers();
          myHeaders.append("Content-Type", "application/json");

          var raw = JSON.stringify({
            workVerified: "success",
          });

          var requestOptions = {
            method: "PATCH",
            headers: myHeaders,
            body: raw,
            redirect: "follow",
          };

          fetch(`https://kycbackendapp.herokuapp.com/api/work/${coord1.id}`, requestOptions)
            .then((response) => response.text())
            .then((result) => {
              // console.log(result);
              schedulePushNotification();
            })
            .catch((error) => console.log("error", error));
          // *
        } else if (databaseSingleAddress.workTotalCount === 20 && databaseSingleAddress.workVerified !== "success") {
          //! setting the rejected state
          var myHeaders = new Headers();
          myHeaders.append("Content-Type", "application/json");

          var raw = JSON.stringify({
            workVerified: "failed",
          });

          var requestOptions = {
            method: "PATCH",
            headers: myHeaders,
            body: raw,
            redirect: "follow",
          };

          fetch(`https://kycbackendapp.herokuapp.com/api/work/${coord1.id}`, requestOptions)
            .then((response) => response.text())
            .then((result) => {
              // console.log(result);
              // schedulePushNotification();
            })
            .catch((error) => console.log("error", error));
        }

        // * updating total count
        if (databaseSingleAddress.workVerificationCount < 20 && databaseSingleAddress.workTotalCount < 20) {
          // adding total counts to verification
          // console.log("====", databaseSingleAddress);
          // console.log("coords2====", coord2);

          var myHeaders = new Headers();
          myHeaders.append("Content-Type", "application/json");

          var raw = JSON.stringify({
            workTotalCount: totalWorkCount,
          });

          var requestOptions = {
            method: "PATCH",
            headers: myHeaders,
            body: raw,
            redirect: "follow",
          };

          fetch(`https://kycbackendapp.herokuapp.com/api/work/${coord1.id}`, requestOptions)
            .then((response) => response.text())
            .then((result) => {
              //!!!!!! console.log(result);
            })
            .catch((error) => console.log("error", error));

          // todo implement logging report state
          var myHeaders = new Headers();
          myHeaders.append("Content-Type", "application/json");

          const stringedCoords = JSON.stringify(coord2);

          var reportRaw = JSON.stringify({
            user: databaseSingleAddress.user_id,
            username: userInfo.firstname + " " + userInfo.surname,
            homeid: null,
            workid: databaseSingleAddress._id,
            currentLocation: stringedCoords,
          });

          var requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: reportRaw,
            redirect: "follow",
          };

          fetch("https://kycbackendapp.herokuapp.com/api/report/create", requestOptions)
            .then((response) => response.text())
            .then((result) => console.log(result))
            .catch((error) => console.log("error", error));
          //todo implement logging report state
        }
        //
      })
      .catch((error) => console.log("error", error));
  } else {
    console.log("coords not available");
  }
};

const LOCATION_TASK_NAME = "background-location-task";

let currentCoords;

TaskManager.defineTask(LOCATION_TASK_NAME, ({ data, error }) => {
  if (error) {
    // Error occurred - check `error.message` for more details.
    return;
  }
  if (data) {
    const { locations } = data;
    currentCoords = { latitude: locations[0].coords?.latitude, longitude: locations[0].coords?.longitude };
    // console.log(currentCoords);
    // do something with the locations captured in the background
  }
});

//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

async function registerLocation() {
  return BackgroundFetch.registerTaskAsync(LOCATION_TASK_NAME, {});
}

const BACKGROUND_FETCH_TASK = "background-fetch";

TaskManager.defineTask(BACKGROUND_FETCH_TASK, async () => {
  const now = Date.now();

  let asyncData = await AsyncStorage.getItem("@mergedAddresses");
  // console.log(asyncData);
  let addressList = JSON.parse(asyncData);

  // mapping address list
  // let location = await Location.getCurrentPositionAsync({});
  // registerLocation();

  addressList.map((i) => {
    // console.log(i);
    let latLngHomeAry = i.homeLatLng ? JSON.parse(i.homeLatLng) : "";
    let latLngWorkAry = i.workLatLng ? JSON.parse(i.workLatLng) : "";
    let latLngHome = { ...latLngHomeAry, id: i._id, title: "home" };
    let latLngWork = { ...latLngWorkAry, id: i._id, title: "work" };

    // console.log(latLngHome);
    // console.log(latLngWork);
    // console.log("cc", currentCoords);

    if (currentCoords === "undefined") {
      registerLocation();
    }

    if (currentCoords && latLngHome) {
      checkCoordinatesInRadius(latLngHome, currentCoords, 0.02);
    }

    if (currentCoords && latLngWork) {
      checkCoordinatesInRadius(latLngWork, currentCoords, 0.02);
    }
  });

  let processedData;

  // await schedulePushNotification();
  // console.log(`Got background fetch call at date: ${new Date(now).toISOString()}`);
  // ! here comes the location verification

  // ! here comes the location verification
  return BackgroundFetch.BackgroundFetchResult.NewData;
});

const Home = () => {
  const { user } = useContext(UserContext);
  const navigation = useNavigation();
  const { sethasLocation } = useContext(HasLocationContext);
  const { tempDisplay, setTempDisplay } = useContext(TempContext);
  const { addListener } = useNavigation();

  const [loading, setLoading] = useState(true);
  const [removing, setRemoving] = useState(false);
  const [errorMessage, setErrorMessage] = useState();

  const packedData = [];

  // getting  savedUser Details
  const getUserSavedLocations = async () => {
    // setLoading(true)
    let fetchOk = (...args) =>
      fetch(...args).then((res) =>
        res.ok
          ? res
          : res.json().then((data) => {
              throw Object.assign(new Error(data.error_message), { name: res.statusText });
            })
      );
    Promise.all(
      [`${keys.apiURL}api/home/my/${user._id}`, `${keys.apiURL}api/work/my/${user._id}`].map((url) =>
        fetchOk(url).then((r) => r.json())
      )
    )
      .then(([d1, d2]) => {
        setTempDisplay(d1, d2);
        setLoading(false);
      })
      .catch((e) => console.error(e));
  };

  const mergingArrays = (home, work) => {
    let packagedData;
    packagedData = [...home, ...work];
    setTempDisplay(packagedData);
    const jsonValue = JSON.stringify(packagedData);
    try {
      AsyncStorage.setItem("@mergedAddresses", jsonValue);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  const handleDeleteProcess = async (id, title) => {
    setRemoving(true);
    let newArray;
    await axios.delete(title === "home" ? `${keys.apiURL}api/home/${id}` : `${keys.apiURL}api/work/${id}`);

    newArray = tempDisplay.filter((i) => i._id !== id);
    setTempDisplay(newArray);
    // checkuserIfstoredandfetchdata();
    setRemoving(false);
  };

  //* used for location verifications
  // useFetchAddresses();

  useEffect(() => {
    getUserSavedLocations();
  }, []);

  console.log(tempDisplay);

  return (
    <View style={{ backgroundColor: "white", flex: 1 }}>
      <GlobalHeader title=" Registered Addresses" />

      <>
        <View style={{ marginHorizontal: "5%", paddingBottom: 20, paddingHorizontal: 0, width: width * 0.95 }}>
          <Text style={{ marginBottom: 20, fontSize: 18, color: "#4E4E4E", fontFamily: "Poppins-SemiBold" }}>
            Add Address
          </Text>
          <View
            style={{ backgroundColor: "white", display: "flex", flexDirection: "row", justifyContent: "flex-start" }}
          >
            <TouchableOpacity
              onPress={() => {
                sethasLocation();
                navigation.navigate("GetLocation", {
                  title: "home",
                });
              }}
              style={{
                borderColor: ColorTheme.grey2,
                borderRightWidth: 3,
                borderBottomWidth: 3,
                borderLeftWidth: 1,
                borderTopWidth: 1,
                width: "40%",
                padding: 30,
                borderRadius: 5,
                alignItems: "center",
                marginRight: 20,
                justifyContent: "center",
              }}
            >
              <HomeIcon size={30} color={ColorTheme.main} />
              <Text style={[styles.btnTitle, { fontFamily: "Poppins-SemiBold" }]}>Home</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                sethasLocation();
                navigation.navigate("GetLocation", {
                  title: "work",
                });
              }}
              style={{
                borderColor: ColorTheme.grey2,
                borderRightWidth: 3,
                borderBottomWidth: 3,
                borderLeftWidth: 1,
                borderTopWidth: 1,
                width: "40%",
                padding: 30,
                borderRadius: 5,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <BriefcaseIcon size={30} color={ColorTheme.main} />
              <Text style={[styles.btnTitle, { fontFamily: "Poppins-SemiBold" }]}>Work</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View
          style={{
            marginHorizontal: "5%",
            padding: 15,
            backgroundColor: "#F8F8F8",
            width: width * 0.9,
            marginBottom: 5,
            borderRadius: 10,
          }}
        >
          <Text style={{ color: ColorTheme.grey, fontSize: 14, lineHeight: 20, fontFamily: "Poppins-Regular" }}>
            <Text style={{ fontFamily: "Poppins-SemiBold", lineHeight: 20 }}>INSTRUCTION: </Text>When adding an address,
            make sure that you select{" "}
            <Text style={{ fontFamily: "Poppins-SemiBold", lineHeight: 20 }}>While Using the app</Text> followed by{" "}
            <Text style={{ fontFamily: "Poppins-SemiBold", lineHeight: 20 }}>Allow All The Time</Text>.
          </Text>
        </View>

        <View style={styles.barLine}></View>
        {/*  */}
        {tempDisplay?.length > 0 ? (
          <SwipeListView
            contentContainerStyle={{
              paddingHorizontal: 15,
              height: height * 0.6,
              backgroundColor: "#FFF",
              paddingTop: 20,
            }}
            data={tempDisplay}
            keyExtractor={(item, index) => item._id}
            renderItem={(item, rowMap) => <HomeVerificationCard item={item} />}
            disableRightSwipe={true}
            previewOpenDelay={3000}
            friction={1000}
            tension={40}
            leftOpenValue={95}
            stopLeftSwipe={95}
            rightOpenValue={-95}
            renderHiddenItem={(item, rowMap) => (
              <TouchableOpacity
                Vi
                onPress={() => {
                  handleDeleteProcess(item.item._id, item.item.title);
                }}
                style={[styles.hiddenButton]}
              >
                <View
                  style={{
                    color: "#ffffff",
                    backgroundColor: "red",
                    height: 100,
                    width: 85,
                    borderRadius: 10,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  {removing ? (
                    <ActivityIndicator color={"#FFFFFF"} />
                  ) : (
                    <Text style={{ color: "#ffffff", fontFamily: "Poppins-Regular" }}>Delete</Text>
                  )}
                </View>
              </TouchableOpacity>
            )}
          />
        ) : (
          <>
            {tempDisplay?.length < 0 ? (
              <View style={{ justifyContent: "center", alignItems: "center", flex: 1 }}>
                <Text style={{ fontFamily: "Poppins-Regular" }}>You have not added your home or work address. </Text>
              </View>
            ) : (
              <View
                style={{
                  paddingTop: 150,
                  justifyContent: "center",
                  alignItems: "center",
                  // fontFamily: 'Poppins-SemiBold',
                }}
              >
                <Text style={{ fontFamily: "Poppins-Regular" }}>Loading please wait...</Text>

                <ActivityIndicator style={{ marginTop: 20 }} />
              </View>
            )}
          </>
        )}
        {/*  */}
      </>
      <View style={{ justifyContent: "center", alignItems: "center", height: "5%" }}></View>
    </View>
  );
};

export default Home;

const { width, height } = Dimensions.get("screen");

const styles = StyleSheet.create({
  barLine: {
    backgroundColor: ColorTheme.grey3,
    width: width * 0.9,
    height: 0.5,
    marginTop: 10,
    marginLeft: "5%",
    marginRight: "5%",
  },
  hiddenContainer: {
    flex: 1,
    paddingTop: 1,
    overflow: "hidden",
  },
  hiddenButton: {
    backgroundColor: "transparent",
    justifyContent: "center",
    alignItems: "flex-end",

    borderRadius: 10,
    marginRight: 1,
    height: 100,
  },
  btnTitle: {
    color: ColorTheme.main,
    fontSize: 18,
    marginLeft: 5,
  },
});
