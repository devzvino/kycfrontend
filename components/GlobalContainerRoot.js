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

  const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.cos(toRadians(lat1)) * Math.cos(toRadians(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  const distance = R * c;
  // console.log("distance", distance);
  // console.log("radius", radius);
  // console.log("radius", radius, "<=", "distance", distance);

  // if (distance <= radius) {
  //* verify process begins
  fetch(`https://kycbackendapp.herokuapp.com/api/home/${coord1.id}`)
    .then((response) => response.text())
    .then((result) => {
      // console.log(result);
      databaseSingleAddress = JSON.parse(result);
      // once data is fetch
      let totalHomeCount = databaseSingleAddress.homeTotalCount + 1;
      let updatedCount = databaseSingleAddress.homeVerificationCount + 1;

      if (databaseSingleAddress.homeVerificationCount <= 9 && distance <= radius) {
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
            !!!!!!console.log(result);
          })
          .catch((error) => console.log("error", error));
        // *
      }

      // changing state of verification
      if (databaseSingleAddress.homeVerificationCount === 10 && databaseSingleAddress.homeVerified !== "success") {
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
      if (databaseSingleAddress.homeVerificationCount < 10) {
        // adding total counts to verification
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
      }
      //
    })
    .catch((error) => console.log("error", error));
  // !

  //* verify process begins
  // }
  // else if (distance > radius) {
  //   // console.log("out of range");
  //   // ***** // add total count within database
  // }

  // return distance <= radius;
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
    let latLngHome = { ...latLngHomeAry, id: i._id };
    let latLngWork = { ...latLngWorkAry, id: i._id };

    // console.log(latLngHome);
    // console.log(latLngWork);
    // console.log("cc", currentCoords);

    if (currentCoords === "undefined") {
      registerLocation();
    }

    if (currentCoords && latLngHome) {
      checkCoordinatesInRadius(latLngHome, currentCoords, 0.02);
    }

    // if (currentCoords && latLngWork) {
    //   checkCoordinatesInRadius(latLngHome, currentCoords, 5);
    // }
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
    } catch (error) { }
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
