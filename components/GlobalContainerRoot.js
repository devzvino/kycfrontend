import { View, Text } from "react-native";
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

// checking latlng function
const checkCoordinatesInRadius = (coord1, coord2, radius) => {
  const toRadians = (degree) => (degree * Math.PI) / 180;
  const R = 6371; // Earth's radius in kilometers

  const lat1 = coord1.latitude;
  const lon1 = coord1.longitude;
  const lat2 = coord2.latitude;
  const lon2 = coord2.longitude;

  const dLat = toRadians(lat2 - lat1);
  const dLon = toRadians(lon2 - lon1);

  const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.cos(toRadians(lat1)) * Math.cos(toRadians(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  const distance = R * c;

  return distance <= radius;
};

// end of checking

// ===================== BACKGROUND FETCH
import * as BackgroundFetch from "expo-background-fetch";
import * as TaskManager from "expo-task-manager";

const BACKGROUND_FETCH_TASK = "background-fetch";
let myLocation;
TaskManager.defineTask(BACKGROUND_FETCH_TASK, async () => {
  // TaskManager.defineTask(LOCATION_TASK_NAME, ({ data, error }) => {
  //   if (error) {
  //     // Error occurred - check `error.message` for more details.
  //     return;
  //   }
  //   if (data) {
  //     const { locations } = data;
  //     // do something with the locations captured in the background
  //   }
  // });
  // ?
  const now = Date.now();
  let asyncData = await AsyncStorage.getItem("@mergedAddresses");
  let addressList = JSON.parse(asyncData);
  // mapping address list
  // let { coords } = await Location.getCurrentPositionAsync({});
  // setCurrentLocation(location);

  addressList.map((i) => {
    let latLngHome = i.homeLatLng ? JSON.parse(i.homeLatLng) : null;
    let latLngWork = i.workLatLng ? JSON.parse(i.workLatLng) : null;
    console.log(latLngHome);
    console.log(latLngWork);
    // console.log("Location current ", coords);

    // checkCoordinatesInRadius(coord1, coord2, radius);
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

requestPermissions();

const GlobalContainerRoot = ({ children }) => {
  const [expoPushToken, setExpoPushToken] = useState("");
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();
  const [appStateVisible, setAppStateVisible] = useState();
  const [currentLocation, setCurrentLocation] = useState();

  const [isRegistered, setIsRegistered] = useState(false);
  const [status, setStatus] = useState(null);

  const appState = useRef(AppState.currentState);

  // useEffect(() => {
  //   registerBackgroundFetchAsync();
  // }, []);

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
    // checkStatusAsync();
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
      // ! added code here
      // ! added code here
      if (addressData.length > 0) {
        // ! added code here
        // ! added code here
        registerBackgroundFetchAsync();
        // ! added code here
        // ! added code here
      }
    } catch (error) {}
  };

  useEffect(() => {
    checkIfAddressIsStored();
  }, []);

  return <>{children}</>;
};

async function schedulePushNotification() {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: "You've got mail! 📬",
      body: "Here is the notification body",
      data: { data: "goes here" },
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
  } else {
    alert("Must use physical device for Push Notifications");
  }

  return token;
}
export default GlobalContainerRoot;
