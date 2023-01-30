import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { BriefcaseIcon, HomeIcon } from "react-native-heroicons/outline";
import { SafeAreaView } from "react-native-safe-area-context";
import GlobalHeader from "../components/GlobalHeader";
import { ButtonTheme } from "../components/ThemeFile";
import { useFetchAddresses } from "../hooks/useFetchAddresses";

const AddAddress = () => {
  // navigation process
  const navigation = useNavigation();

  const [user, setUser] = useState();

  const checkingIfUserIsStored = async () => {
    try {
      const storedUser = await AsyncStorage.getItem("@user");
      if (storedUser !== null) {
        setUser(JSON.parse(storedUser));
      }
    } catch (error) {}
  };
  // console.log(user);

  useEffect(() => {
    checkingIfUserIsStored();
  }, []);

  useFetchAddresses();

  return (
    <SafeAreaView>
      <GlobalHeader title="Add New Address" />
      <View style={{ padding: 15 }}>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("AddNewLocation", {
              title: "home",
              myId: user._id,
            })
          }
          style={[ButtonTheme.signUpNavigationMain, styles.btnExt]}
        >
          <HomeIcon size={24} color="white" />
          <Text style={styles.btnTitle}>Home Address</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("AddNewLocation", {
              title: "work",
              myId: user._id,
            })
          }
          style={[ButtonTheme.signUpNavigationMain, styles.btnExt]}
        >
          <BriefcaseIcon size={24} color="white" />
          <Text style={styles.btnTitle}>Work Address</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default AddAddress;

const styles = StyleSheet.create({
  btnTitle: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: 5,
  },
  btnExt: {
    width: "100%",
    alignItems: "flex-start",
    paddingHorizontal: 15,
    flexDirection: "row",
  },
});
