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
        navigation.navigate("More");
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
              <View style={{ width: 10, height: "100%", backgroundColor: ColorTheme.orange }}></View>
            )}
            {info.homeVerified === "failed" && (
              <View style={{ width: 10, height: "100%", backgroundColor: ColorTheme.red }}></View>
            )}
            {info.homeVerified === "success" && (
              <View style={{ width: 10, height: "100%", backgroundColor: ColorTheme.main }}></View>
            )}
          </>
        ) : (
          <>
            {info.workVerified === "pending" && (
              <View style={{ width: 10, height: "100%", backgroundColor: ColorTheme.orange }}></View>
            )}
            {info.workVerified === "failed" && (
              <View style={{ width: 10, height: "100%", backgroundColor: ColorTheme.red }}></View>
            )}
            {info.workVerified === "success" && (
              <View style={{ width: 10, height: "100%", backgroundColor: ColorTheme.main }}></View>
            )}
          </>
        )}
        {/*  */}
      </View>
      <View>
        <Text style={{ color: 'black', fontSize: 18, fontFamily: 'Poppins-SemiBold', color: ColorTheme.grey }}>
          {home ? info.houseNo + ',' + ' ' + info.streetName : info.building + ',' + ' ' + info.streetName}
        </Text>
        {/* <Text style={{ color: 'black', fontSize: 18, fontWeight: "800", color: ColorTheme.grey }}>
          {home ? info.streetName : info.streetName}
        </Text> */}
        {/* coordinates */}
        <View style={{ flexDirection: "row", }}>
          {home ? (
            <View>
              <Text style={[styles.textCoordinate, { textTransform: 'uppercase', fontFamily: 'Poppins-Regular', }]}>
                {info.suburb},{' '} {info.city}
              </Text>

            </View>
          ) : (
            <View>
              <Text style={[styles.textCoordinate, { textTransform: 'uppercase' }]}>
                {info.companyName},{" "} {info.city}
              </Text>


            </View>
          )}
        </View>
        {/* category */}
        {/* <Text style={styles.textCoordinate}>{info.title} Address</Text> */}

        {/* verification */}
        {home ? (
          <>
            {info.homeVerified === "pending" && (
              <View style={styles.v_container}>
                <Text style={{ fontFamily: 'Poppins-SemiBold', color: ColorTheme.orange }}><Text style={{ fontFamily: 'Poppins-Regular', color: ColorTheme.grey, textTransform: "capitalize" }} >{info.title} Address:</Text> Verification Pending</Text>
              </View>
            )}
            {info.homeVerified === "failed" && (
              <View style={styles.v_container}>
                <Text style={{ fontFamily: 'Poppins-SemiBold', color: ColorTheme.red }}><Text style={{ fontFamily: 'Poppins-Regular', color: ColorTheme.grey, textTransform: "capitalize" }} >{info.title} Address:</Text> Verification Failed</Text>
              </View>
            )}
            {info.homeVerified === "success" && (
              <View style={styles.v_container}>
                <Text style={{ fontFamily: 'Poppins-SemiBold', color: ColorTheme.main }}><Text style={{ fontFamily: 'Poppins-Regular', color: ColorTheme.grey, textTransform: "capitalize" }} >{info.title} Address:</Text> Verification Successful</Text>
              </View>
            )}
          </>
        ) : (
          <>
            {info.workVerified === "pending" && (
              <View style={styles.v_container}>
                <Text style={{ fontFamily: 'Poppins-SemiBold', color: ColorTheme.orange }}><Text style={{ fontFamily: 'Poppins-Regular', color: ColorTheme.grey, textTransform: "capitalize" }} >{info.title} Address:</Text> Verification Pending</Text>
              </View>
            )}
            {info.workVerified === "failed" && (
              <View style={styles.v_container}>
                <Text style={{ fontFamily: 'Poppins-SemiBold', color: ColorTheme.red }}><Text style={{ fontFamily: 'Poppins-Regular', color: ColorTheme.grey, textTransform: "capitalize" }} >{info.title} Address:</Text> Verification Failed</Text>
              </View>
            )}
            {info.workVerified === "success" && (
              <View style={styles.v_container}>
                <Text style={{ fontFamily: 'Poppins-SemiBold', color: ColorTheme.main }}><Text style={{ fontFamily: 'Poppins-Regular', color: ColorTheme.grey, textTransform: "capitalize" }} >{info.title} Address:</Text> Verification Successful</Text>
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

  },
  // verificationIcon: {
  //   width: 18,
  //   height: 18,
  //   resizeMode: "contain",
  //   marginRight: 5,
  // },
  homeCard: {
    backgroundColor: "#F8F8F8",
    borderRadius: 10,
    marginBottom: 15,
    display: "flex",
    alignItems: "center",
    overflow: "hidden",
    flexDirection: "row",
    height: 100,
  },
  // textCoordinate: {
  //   color: ColorTheme.grey,
  //   fontWeight: "600",
  //   textTransform: "capitalize",
  // },
});
