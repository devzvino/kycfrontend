import { ActivityIndicator, Dimensions, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import axios from "axios";
import React, { useEffect, useState } from "react";
import GlobalHeader from "../components/GlobalHeader";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SafeAreaView } from "react-native-safe-area-context";
import { SwipeListView } from "react-native-swipe-list-view";
import HomeVerificationCard from "../components/HomeVerificationCard";
import { keys } from "../environmentVariables";
import { useNavigation } from "@react-navigation/native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useFetchAddresses } from "../hooks/useFetchAddresses";

const Home = () => {
  const { addListener } = useNavigation();

  const [loading, setLoading] = useState(false);
  const [removing, setRemoving] = useState(false);
  const [errorMessage, setErrorMessage] = useState();
  const [homeLocation, setHomeLocation] = useState(null);
  const [workLocation, setWorkLocation] = useState(null);
  const [mergedAddress, setMergedAddress] = useState();
  const [tempDisplay, setTempDisplay] = useState([]);
  let userDetails;
  let post;

  // aggregated locations
  let checkedUser = {};
  let id;

  //   const checkingIfUserIsStored = async () => {
  //     setLoading(true);
  //     const storedUser = await AsyncStorage.getItem("@user");
  //     const userDetails = JSON.parse(storedUser);
  //     if (userDetails) {
  //       checkedUser = userDetails;
  //       id = checkedUser._id;
  //     } else {
  //       setErrorMessage("Please logout and sign back in");
  //     }
  //     const responseh = await fetch(`${keys.apiURL}api/home/my/${id}`);
  //     const jsonh = await responseh.json();
  //     setHomeLocation(jsonh);

  //     const responsew = await fetch(`${keys.apiURL}api/work/my/${id}`);
  //     const jsonw = await responsew.json();
  //     setWorkLocation(jsonw);
  //     //
  //     mergingArrays(jsonh, jsonw);

  //     setLoading(false);
  //   };

  const checkuserIfstoredandfetchdata = async () => {
    setLoading(true);
    // if (!userDetails) {
    //   const storedUser = await AsyncStorage.getItem("@user");
    //   userDetails = JSON.parse(storedUser);
    // }
    const storedUser = await AsyncStorage.getItem("@user");
    userDetails = JSON.parse(storedUser);
    if (userDetails) {
      checkedUser = userDetails;
      id = checkedUser._id;
    } else {
      setErrorMessage("Please logout and sign back in");
    }
    //
    let [res1, res2] = await Promise.all([fetch(`${keys.apiURL}api/home/my/${id}`).then((response) => response.json()), fetch(`${keys.apiURL}api/work/my/${id}`).then((response) => response.json())]);
    mergingArrays(res1, res2);
    setMergedAddress(res1, res2);
    //
    setLoading(false);
  };

  // const setObjectValue = async (value) => {
  //   try {
  //     const jsonValue = JSON.stringify(value);
  //     await AsyncStorage.setItem("@mergedAddresses", jsonValue);
  //   } catch (e) {
  //     // save error
  //   }
  //   console.log("Done.");
  // };

  const mergingArrays = (home, work) => {
    let packagedData;
    packagedData = [...home, ...work];
    setTempDisplay(packagedData);
    // setObjectValue(packagedData);
    const jsonValue = JSON.stringify(packagedData);
    try {
      AsyncStorage.setItem("@mergedAddresses", jsonValue);
      console.log("slower");
    } catch (error) {
      console.log(error);
    }
  };

  // delete home verification card
  const handleDeleteProcess = async (id, title) => {
    setRemoving(true);
    let newArray;
    await axios.delete(title === "home" ? `${keys.apiURL}api/home/${id}` : `${keys.apiURL}api/work/${id}`);

    newArray = tempDisplay.filter((i) => i._id !== id);
    setTempDisplay(newArray);
    checkuserIfstoredandfetchdata();
    setRemoving(false);
  };

  // force event to rerender page
  const refresherpage = addListener("focus", () => {
    setLoading(true);
    checkuserIfstoredandfetchdata();
    setLoading(true);
  });

  useEffect(() => {
    //  getting information locations
    checkuserIfstoredandfetchdata();
    if (!tempDisplay) refresherpage();
    return () => {
      setTempDisplay([]);
    };
  }, []);

  // async () => await useFetchAddresses();

  if (loading) {
    return (
      <View
        style={{
          paddingTop: 150,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text>Loading please wait...</Text>

        <ActivityIndicator style={{ marginTop: 20 }} />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <GlobalHeader title="Your Registered Addresses" />

      <>
        {!tempDisplay.length ? (
          <View style={{ justifyContent: "center", alignItems: "center", flex: 1 }}>
            <Text>You have not added your home or work address.</Text>
          </View>
        ) : (
          <SwipeListView
            contentContainerStyle={{ paddingHorizontal: 15, backgroundColor: "#FFFFFF" }}
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
                onPress={() => {
                  handleDeleteProcess(item.item._id, item.item.title);
                }}
                style={styles.hiddenButton}
              >
                {removing ? (
                  <>
                    <MaterialCommunityIcons name="delete-clock" size={24} color="red" />
                  </>
                ) : (
                  <>
                    <MaterialCommunityIcons name="delete" size={24} color="red" />
                  </>
                )}
              </TouchableOpacity>
            )}
          />
        )}
      </>
      <View style={{ justifyContent: "center", alignItems: "center", height: "13.7%" }}>

      </View>
    </SafeAreaView>
  );
};

// tempDisplay.length === 0 &&

export default Home;

const { width, height } = Dimensions.get("screen");

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF"
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
    paddingRight: 25,
    borderRadius: 10,
    marginRight: 1,
    height: "100%",
    height: 140,
  },
});

// fetch(`${keys.apiURL}api/home/my/${userDetails._id}`)
//       .then(function (response) {
//         if (response.ok) {
//           return response.json();
//         } else {
//           return Promise.reject(response);
//         }
//       })
//       .then(function (data) {
//         // Store the post data to a variable
//         post = data;

//         // Fetch another API
//         return fetch(`${keys.apiURL}api/work/my/${userDetails._id}`);
//       })
//       .then(function (response) {
//         if (response.ok) {
//           return response.json();
//         } else {
//           return Promise.reject(response);
//         }
//       })
//       .then(function (userData) {
//         mergingArrays(post, userData);
//       })
//       .catch(function (error) {
//         console.warn(error);
//       });
// force event to rerender page
// const refresherpage = addListener("focus", () => {
//   setLoading(true);
//   // checkuserIfstoredandfetchdata();
//   const getUserAgain = async () => {
//     const storedUser = await AsyncStorage.getItem("@user");
//     userDetails = JSON.parse(storedUser);
//   };
//   const fetchData = async () => {
//     let [res1, res2] = await Promise.all([
//       fetch(`${keys.apiURL}api/home/my/${userDetails._id}`).then((response) =>
//         response.json()
//       ),
//       fetch(`${keys.apiURL}api/work/my/${userDetails._id}`).then((response) =>
//         response.json()
//       ),
//     ]);
//     mergingArrays(res1, res2);
//   };

//   if (userDetails) {
//     fetchData();
//   } else {
//     getUserAgain();
//   }

//   setLoading(true);
// });
