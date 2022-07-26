import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import GlobalHeader from "../components/GlobalHeader";
import axios from "axios";

const Home = () => {
  const [loading, setLoading] = useState(false);
  const [myVerifications, setMyVerifications] = useState([]);

  const _id = "62cfecbaa948e3505d483f40";

  // get my verifications from backend
  const getMyVerifications = async () => {
    let myInfo;
    setLoading(true);
    try {
      const { data } = await axios.get(
        "http://10.70.14.108:4000/api/location/"
      );
      myInfo = data.filter((i) => i.userInfo._id === _id);

      setMyVerifications(myInfo);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    getMyVerifications();
    // clearing memory
    return () => {
      setMyVerifications();
    };
  }, []);

  console.log(myVerifications);

  return (
    <SafeAreaView style={styles.container}>
      <GlobalHeader title="Home" />
      {myVerifications ? (
        myVerifications.map((item) => {
          let home = JSON.parse(item.homeLocation);
          console.log(item);
          console.log(home);
          return (
            <TouchableOpacity key={item._id}>
              <Text>{item.userInfo.firstname}</Text>
              <View style={{ flexDirection: "row" }}>
                <Text>{home.lat}</Text>
                <Text>{home.lng}</Text>
              </View>
            </TouchableOpacity>
          );
        })
      ) : (
        <View
          style={{
            paddingTop: 100,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text style={{ color: "black" }}>Loading please wait...</Text>
          <ActivityIndicator />
        </View>
      )}
    </SafeAreaView>
  );
};

export default Home;
const styles = StyleSheet.create({
  flex: 1,
});
