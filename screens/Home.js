import {
  ActivityIndicator,
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import axios from "axios";
import React, { useEffect, useState } from "react";
import GlobalHeader from "../components/GlobalHeader";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SafeAreaView } from "react-native-safe-area-context";
import { SwipeListView } from "react-native-swipe-list-view";
import HomeVerificationCard from "../components/HomeVerificationCard";
import { keys } from "../environmentVariables";
import { useNavigation } from "@react-navigation/native";

const Home = () => {
  const { addListener } = useNavigation();

  const [loading, setLoading] = useState(false);
  const [removing, setRemoving] = useState(false);
  const [errorMessage, setErrorMessage] = useState();
  const [homeLocation, setHomeLocation] = useState(null);
  const [workLocation, setWorkLocation] = useState(null);
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
    if (!userDetails) {
      const storedUser = await AsyncStorage.getItem("@user");
      userDetails = JSON.parse(storedUser);
    }
    //

    fetch(`${keys.apiURL}api/home/my/${userDetails._id}`)
      .then(function (response) {
        if (response.ok) {
          return response.json();
        } else {
          return Promise.reject(response);
        }
      })
      .then(function (data) {
        // Store the post data to a variable
        post = data;

        // Fetch another API
        return fetch(`${keys.apiURL}api/work/my/${userDetails._id}`);
      })
      .then(function (response) {
        if (response.ok) {
          return response.json();
        } else {
          return Promise.reject(response);
        }
      })
      .then(function (userData) {
        mergingArrays(post, userData);
      })
      .catch(function (error) {
        console.warn(error);
      });
    //
    setLoading(false);
  };

  const mergingArrays = (home, work) => {
    let packagedData;
    packagedData = [...home, ...work];
    setTempDisplay(packagedData);
    console.log(tempDisplay);
  };

  // delete home verification card
  const handleDeleteProcess = async (id, title) => {
    setRemoving(true);
    let newArray;
    await axios.delete(
      title === "home"
        ? `${keys.apiURL}api/home/${id}`
        : `${keys.apiURL}api/work/${id}`
    );

    newArray = tempDisplay.filter((i) => i._id !== id);
    setTempDisplay(newArray);
    refresherpage();
    setRemoving(false);
  };

  // force event to rerender page
  //   const refresherpage = addListener("focus", () => {
  //     checkingIfUserIsStored();
  //   });

  useEffect(() => {
    //  getting intomation locations
    // checkingIfUserIsStored();
    checkuserIfstoredandfetchdata();
    if (!tempDisplay) refresherpage();
    return () => {
      setTempDisplay([]);
    };
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <GlobalHeader title="Home" />
      {loading ? (
        <View
          style={{ justifyContent: "center", alignItems: "center", flex: 1 }}
        >
          <Text>Loading please wait...</Text>

          <ActivityIndicator style={{ marginTop: 20 }} />
        </View>
      ) : (
        <>
          {tempDisplay.length > 0 ? (
            <SwipeListView
              contentContainerStyle={{ paddingHorizontal: 15 }}
              data={tempDisplay}
              keyExtractor={(item, index) => item._id}
              renderItem={(item, rowMap) => (
                <HomeVerificationCard item={item} />
              )}
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
                  <Text style={{ color: "white", fontWeight: "bold" }}>
                    {removing ? "Deleteing" : "Delete"}
                  </Text>
                </TouchableOpacity>
              )}
            />
          ) : (
            <View
              style={{
                paddingTop: 150,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text>You have not added your home or work address.</Text>
            </View>
          )}
        </>
      )}
    </SafeAreaView>
  );
};

export default Home;

const { width, height } = Dimensions.get("screen");

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  hiddenContainer: {
    flex: 1,
    paddingTop: 1,
    overflow: "hidden",
  },
  hiddenButton: {
    backgroundColor: "red",
    justifyContent: "center",
    alignItems: "flex-end",
    paddingRight: 25,
    borderRadius: 10,
    marginRight: 1,
    height: "100%",
    height: 140,
  },
});

{
  /* <View style={styles.hiddenContainer}></View> */
}
