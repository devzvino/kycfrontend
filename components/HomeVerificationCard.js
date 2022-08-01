import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { ColorTheme } from "./ThemeFile";
import { style } from "deprecated-react-native-prop-types/DeprecatedImagePropType";

const HomeVerificationCard = ({ item }) => {
  let home;
  let work;
  if (item.item.homeLocation[0] === "") {
    work = JSON.parse(item.item.workLocation);
  }

  if (item.item.workLocation[0] === "") {
    home = JSON.parse(item.item.homeLocation);
  }

  // console.log(item);

  return (
    <View style={styles.homeCard} key={item._id}>
      <Text style={{ color: ColorTheme.main, fontSize: 24, fontWeight: "600" }}>
        {home ? item.item.homeAddress : item.item.workAddress}
      </Text>
      {/* coordinates */}
      <View style={{ flexDirection: "row", marginTop: 10 }}>
        {home ? (
          <>
            <Text style={styles.textCoordinate}>{home?.lat} , </Text>
            <Text style={styles.textCoordinate}>{home?.lng}</Text>
          </>
        ) : (
          <>
            <Text style={styles.textCoordinate}>{work?.lat} , </Text>
            <Text style={styles.textCoordinate}>{work?.lng}</Text>
          </>
        )}
      </View>
      {/* category */}
      <Text style={styles.textCoordinate}>
        Category: {home ? "Home" : "Work"}
      </Text>

      {/* verification */}
      {home ? (
        <>
          {item.item.verifiedHome === "pending" && (
            <View style={styles.v_container}>
              <Image
                style={styles.verificationIcon}
                source={require("../assets/icons/verification_pending.png")}
              />
              <Text style={{ fontWeight: "600", color: ColorTheme.orange }}>
                Pending Verification
              </Text>
            </View>
          )}
          {item.item.verifiedHome === "failed" && (
            <View style={styles.v_container}>
              <Image
                style={styles.verificationIcon}
                source={require("../assets/icons/verification_failed.png")}
              />
              <Text style={{ fontWeight: "600", color: ColorTheme.red }}>
                Verification Failed
              </Text>
            </View>
          )}
          {item.item.verifiedHome === "success" && (
            <View style={styles.v_container}>
              <Image
                style={styles.verificationIcon}
                source={require("../assets/icons/verification_success.png")}
              />
              <Text style={{ fontWeight: "600", color: ColorTheme.main }}>
                Verified
              </Text>
            </View>
          )}
        </>
      ) : (
        <>
          {item.item.verifiedWork === "pending" && (
            <View style={styles.v_container}>
              <Image
                style={styles.verificationIcon}
                source={require("../assets/icons/verification_pending.png")}
              />
              <Text style={{ fontWeight: "600", color: ColorTheme.orange }}>
                Pending Verification
              </Text>
            </View>
          )}
          {item.item.verifiedWork === "failed" && (
            <View style={styles.v_container}>
              <Image
                style={styles.verificationIcon}
                source={require("../assets/icons/verification_failed.png")}
              />
              <Text style={{ fontWeight: "600", color: ColorTheme.red }}>
                Verification Failed
              </Text>
            </View>
          )}
          {item.item.verifiedWork === "success" && (
            <View style={styles.v_container}>
              <Image
                style={styles.verificationIcon}
                source={require("../assets/icons/verification_success.png")}
              />
              <Text style={{ fontWeight: "600", color: ColorTheme.main }}>
                Verified
              </Text>
            </View>
          )}
        </>
      )}
    </View>
  );
};

export default HomeVerificationCard;

const styles = StyleSheet.create({
  v_container: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 8,
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
    paddingHorizontal: 15,
    paddingTop: 20,
    paddingBottom: 10,
    marginBottom: 15,
    height: 142,
  },
  textCoordinate: {
    color: ColorTheme.grey,
    fontWeight: "600",
  },
});
