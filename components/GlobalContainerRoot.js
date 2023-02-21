// verfication count is 10 for home and work
// time for work is between 8 - 5 pm
// verfication for home is between 12 to 5 and

import { View, Text, Dimensions, SafeAreaView } from "react-native";
import React, { useRef, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect } from "react";
import * as Notifications from "expo-notifications";
import * as Location from "expo-location";
import * as Device from "expo-device";

// setting the notification
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

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

// checking latLng function
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

// ===================== BACKGROUND FETCH
import * as BackgroundFetch from "expo-background-fetch";
import * as TaskManager from "expo-task-manager";

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

async function registerBackgroundFetchAsync() {
  return BackgroundFetch.registerTaskAsync(BACKGROUND_FETCH_TASK, {
    minimumInterval: 60 * 1, // 1 minutes
    stopOnTerminate: false, // android only,
    startOnBoot: true, // android only
  });
}

async function unregisterBackgroundFetchAsync() {
  return BackgroundFetch.unregisterTaskAsync(BACKGROUND_FETCH_TASK);
}

// ===================== BACKGROUND FETCH

import { AppState } from "react-native";
import { StatusBar } from "expo-status-bar";
import { log } from "react-native-reanimated";

requestPermissions();

const GlobalContainerRoot = ({ children }) => {
  const [expoPushToken, setExpoPushToken] = useState("");
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();
  const [appStateVisible, setAppStateVisible] = useState();
  const [isRegistered, setIsRegistered] = useState(false);
  const [status, setStatus] = useState(null);

  const appState = useRef(AppState.currentState);

  useEffect(() => {
    const subscription = AppState.addEventListener("change", (nextAppState) => {
      // AppState.addEventListener("change", (nextAppState) => {

      if (nextAppState.match(/inactive|background/)) {
        setAppStateVisible(false);

        appState.current = nextAppState;
      }

      if (appState.current.match(/background/) && nextAppState === "active") {
        setAppStateVisible(true);
        appState.current = nextAppState;
      }

      if (appState.current.match(/inactive|background/) && nextAppState === "active") {
        // console.log("App has come to the foreground!");

        setAppStateVisible(true);

        appState.current = nextAppState;
      } else {
        setAppStateVisible(false);

        appState.current = nextAppState;
      }

      console.log("AppState Before", appState.current);

      console.log("nextAppState", nextAppState);

      setAppStateVisible(appState.current);

      setAppStateVisible(appState.current);

      console.log("AppState After", appState.current);
    });

    return () => {
      subscription?.remove();
    };
  }, []);

  useEffect(() => {
    checkStatusAsync();
    BackgroundFetch.getStatusAsync();
  }, []);

  // seEffect notification
  useEffect(() => {
    registerForPushNotificationsAsync().then((token) => setExpoPushToken(token));

    notificationListener.current = Notifications.addNotificationReceivedListener((notification) => {
      setNotification(notification);
    });

    responseListener.current = Notifications.addNotificationResponseReceivedListener((response) => {
      console.log(response);
    });

    return () => {
      Notifications.removeNotificationSubscription(notificationListener.current);
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  // getting current user location
  // useEffect(() => {
  //   (async () => {
  //     let { status } = await Location.requestForegroundPermissionsAsync();
  //     if (status !== "granted") {
  //       setErrMsg("Permission to access location was denied");
  //       return;
  //     }

  //     let location = await Location.getCurrentPositionAsync({});
  //     setCurrentLocation(location);
  //   })();

  //   return () => {
  //     setCurrentLocation(null);
  //   };
  // }, []);

  // console.log(currentLocation);

  const checkStatusAsync = async () => {
    const status = await BackgroundFetch.getStatusAsync();
    const isRegistered = await TaskManager.isTaskRegisteredAsync(BACKGROUND_FETCH_TASK);
    setStatus(status);
    setIsRegistered(isRegistered);
  };

  const checkIfAddressIsStored = async () => {
    try {
      const addressData = await AsyncStorage.getItem("@mergedAddresses");

      if (addressData.length > 0) {
        // starting the background por
        registerBackgroundFetchAsync();
      }
    } catch (error) {}
  };

  useEffect(() => {
    checkIfAddressIsStored();
  }, []);

  return (
    <View style={{ flex: 1, height: height }}>
      <StatusBar style="dark" backgroundColor="transparent" />
      {children}
    </View>
  );
};

async function schedulePushNotification() {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: "Verification from KYC",
      body: "You have been verified on KYC App",
      data: { data: "" },
    },
    trigger: { seconds: 2 },
  });
}

async function registerForPushNotificationsAsync() {
  let token;

  if (Platform.OS === "android") {
    await Notifications.setNotificationChannelAsync("default", {
      name: "default",
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#FF231F7C",
    });
  }

  if (Device.isDevice) {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== "granted") {
      alert("Failed to get push token for push notification!");
      return;
    }
    token = (await Notifications.getExpoPushTokenAsync()).data;
    console.log(token);
    console.log(finalStatus);
  } else {
    alert("Must use physical device for Push Notifications");
  }

  return token;
}

const { height, width } = Dimensions.get("window");
export default GlobalContainerRoot;
