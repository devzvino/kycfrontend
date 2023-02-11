import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { ColorTheme } from "./ThemeFile";
import { useNavigation } from "@react-navigation/native";

const HomeVerificationCard = ({ item }) => {
  const navigation = useNavigation();
  const info = item.item;

  let home;
  let work;

  if (info.title === "home") {
    home = JSON.parse(info.homeLatLng);
  }

  if (info.title === "work") {
    work = JSON.parse(info.workLatLng);
  }

  return (
    <TouchableOpacity
      activeOpacity={1}
      onPress={() => {
        navigation.navigate("QRcode");
        console.log("adrr pressed");
      }}
      style={styles.homeCard}
      key={item._id}
    >
      <View style={{ height: "100%", marginRight: 10 }}>
        {/*  */}
        {home ? (
          <>
            {info.homeVerified === "pending" && (
              <View style={{ width: 20, height: "100%", backgroundColor: ColorTheme.orange }}></View>
            )}
            {info.homeVerified === "failed" && (
              <View style={{ width: 20, height: "100%", backgroundColor: ColorTheme.red }}></View>
            )}
            {info.homeVerified === "success" && (
              <View style={{ width: 20, height: "100%", backgroundColor: ColorTheme.main }}></View>
            )}
          </>
        ) : (
          <>
            {info.workVerified === "pending" && (
              <View style={{ width: 20, height: "100%", backgroundColor: ColorTheme.orange }}></View>
            )}
            {info.workVerified === "failed" && (
              <View style={{ width: 20, height: "100%", backgroundColor: ColorTheme.red }}></View>
            )}
            {info.workVerified === "success" && (
              <View style={{ width: 20, height: "100%", backgroundColor: ColorTheme.main }}></View>
            )}
          </>
        )}
        {/*  */}
      </View>
      <View>
        <Text style={{ color: ColorTheme.main, fontSize: 24, fontWeight: "600" }}>
          {home ? info.houseNo + " " + info.streetName : info.building}
        </Text>
        {/* coordinates */}
        <View style={{ flexDirection: "row", marginTop: 10 }}>
          {home ? (
            <>
              <Text style={styles.textCoordinate}>
                {info.suburb}, {info.city}{" "}
              </Text>
            </>
          ) : (
            <>
              <Text style={styles.textCoordinate}>
                {info.companyName}, {info.building}{" "}
              </Text>
            </>
          )}
        </View>
        {/* category */}
        <Text style={styles.textCoordinate}>{info.title} Address</Text>

        {/* verification */}
        {home ? (
          <>
            {info.homeVerified === "pending" && (
              <View style={styles.v_container}>
                <Text style={{ fontWeight: "600", color: ColorTheme.orange }}>Pending Verification</Text>
              </View>
            )}
            {info.homeVerified === "failed" && (
              <View style={styles.v_container}>
                <Text style={{ fontWeight: "600", color: ColorTheme.red }}>Verification Failed</Text>
              </View>
            )}
            {info.homeVerified === "success" && (
              <View style={styles.v_container}>
                <Text style={{ fontWeight: "600", color: ColorTheme.main }}>Verified</Text>
              </View>
            )}
          </>
        ) : (
          <>
            {info.workVerified === "pending" && (
              <View style={styles.v_container}>
                <Text style={{ fontWeight: "600", color: ColorTheme.orange }}>Pending Verification</Text>
              </View>
            )}
            {info.workVerified === "failed" && (
              <View style={styles.v_container}>
                <Text style={{ fontWeight: "600", color: ColorTheme.red }}>Verification Failed</Text>
              </View>
            )}
            {info.workVerified === "success" && (
              <View style={styles.v_container}>
                <Text style={{ fontWeight: "600", color: ColorTheme.main }}>Verified</Text>
              </View>
            )}
          </>
        )}
      </View>
    </TouchableOpacity>
  );
};

export default HomeVerificationCard;

const styles = StyleSheet.create({
  v_container: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 5,
  },
  verificationIcon: {
    width: 18,
    height: 18,
    resizeMode: "contain",
    marginRight: 5,
  },
  homeCard: {
    backgroundColor: "#F8F8F8",
    borderRadius: 10,
    marginBottom: 15,
    display: "flex",
    alignItems: "center",
    overflow: "hidden",
    flexDirection: "row",
    height: 110,
  },
  textCoordinate: {
    color: ColorTheme.grey,
    fontWeight: "600",
    textTransform: "capitalize",
  },
});
