import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import GlobalHeader from "../components/GlobalHeader";
import { ButtonTheme } from "../components/ThemeFile";
import { BriefcaseIcon, HomeIcon } from "react-native-heroicons/outline";
import { useNavigation } from "@react-navigation/native";

const AddAddress = () => {
  // navigation process
  const navigation = useNavigation();

  const handleMoveToAddLocation = () => {
    navigation.navigate("AddNewLocation");
  };

  return (
    <SafeAreaView>
      <GlobalHeader title="Add New Address" />
      <View style={{ padding: 15 }}>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("AddNewLocation", { title: "home" })
          }
          style={[ButtonTheme.signUpNavigation, styles.btnExt]}
        >
          <HomeIcon size={24} color="white" />
          <Text style={styles.btnTitle}>Home Address</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("AddNewLocation", { title: "work" })
          }
          style={[ButtonTheme.signUpNavigation, styles.btnExt]}
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
