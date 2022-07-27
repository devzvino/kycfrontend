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
import HomeVerificationCard from "../components/HomeVerificationCard";

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
        "http://192.168.100.5:4000/api/location/"
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

  if (loading) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text style={{ color: "black", paddingBottom: 30 }}>
          Loading please wait...
        </Text>
        <ActivityIndicator />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <GlobalHeader title="Home" />
      {myVerifications ? (
        myVerifications.map((item) => (
          <HomeVerificationCard key={item._id} item={item} />
        ))
      ) : (
        <View
          style={{
            paddingTop: 150,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text>No Verification done yet</Text>
        </View>
      )}
    </SafeAreaView>
  );
};

export default Home;
const styles = StyleSheet.create({
  flex: 1,
});
