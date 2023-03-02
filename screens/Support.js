import { View, Text, Dimensions, Linking, Image } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import GlobalHeader from "../components/GlobalHeader";
import { ColorTheme, FontTheme } from "../components/ThemeFile";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

const { height, width } = Dimensions.get("window");

const Support = () => {
  return (
    <SafeAreaView style={{ backgroundColor: "white", flex: 1, display: "flex", alignItems: "flex-start" }}>
      <GlobalHeader title="Home" />
      <View style={{ paddingHorizontal: "5%", overflow: "scroll" }}>
        <View style={{ padding: 15, backgroundColor: "#F8F8F8", marginBottom: 30, borderRadius: 10 }}>
          {/* <Text style={{ marginBottom: 15, color: ColorTheme.grey, fontSize: 16, lineHeight: 20 }}>KYC Africa verifies your ID Number & Addresses in the background. </Text>
                    <Text style={{ marginBottom: 15, color: ColorTheme.grey, fontSize: 16, lineHeight: 20 }}>Please make sure that you set location permissions to <Text style={{ fontWeight: 'bold', fontSize: 16, lineHeight: 20 }}>Always Allow</Text>. For better and accurate resuts keep your data on during the verification process</Text> */}
          <Text
            style={{
              marginBottom: 15,
              color: ColorTheme.grey,
              fontSize: 14,
              lineHeight: 18,
              fontFamily: "Poppins-Regular",
            }}
          >
            If you are having any problems with the application, our team is available to assist you.{" "}
          </Text>
          <View style={{ display: "flex", flexDirection: "row", alignItems: "center", alignContent: "center" }}>
            {/* <View style={{ display: 'flex', alignItems: '' }}>
                            <WhatsApp />
                        </View> */}

            <Text
              onPress={() => Linking.openURL("https://wa.me/263773384668")}
              style={{
                color: ColorTheme.main,
                fontFamily: "Poppins-SemiBold",
                display: "flex",
                alignContent: "center",
                fontSize: 14,
              }}
            >
              Click Here for Assistance Via WhatsApp.
            </Text>
          </View>
        </View>

        <Text style={{ marginBottom: 15, fontSize: 16, lineHeight: 18, fontFamily: "Poppins-SemiBold" }}>
          Frequently Asked Questions (FAQs){" "}
        </Text>
        <KeyboardAwareScrollView>
          <View>
            <View
              style={{ borderColor: ColorTheme.grey2, borderWidth: 2, padding: 10, borderRadius: 10, marginBottom: 10 }}
            >
              <Text
                style={{
                  marginBottom: 5,
                  color: ColorTheme.grey,
                  fontSize: 13,
                  lineHeight: 20,
                  fontFamily: "Poppins-SemiBold",
                }}
              >
                How Long does it take to Verify an Address?{" "}
              </Text>
              <Text style={{ color: ColorTheme.grey, fontSize: 13, lineHeight: 20, fontFamily: "Poppins-Regular" }}>
                KYC Africa verifies your address over a period of three consecutive days. If the address location
                retains a positive result you will get a Verification Successful notification, but if the location fails
                our verification criteria it will return a Verification Failed result{" "}
              </Text>
            </View>
            <View
              style={{ borderColor: ColorTheme.grey2, borderWidth: 2, padding: 10, borderRadius: 10, marginBottom: 10 }}
            >
              <Text
                style={{
                  marginBottom: 5,
                  color: ColorTheme.grey,
                  fontSize: 13,
                  lineHeight: 20,
                  fontFamily: "Poppins-SemiBold",
                }}
              >
                How do I share my verifcation Certificates?{" "}
              </Text>
              <Text style={{ color: ColorTheme.grey, fontSize: 13, lineHeight: 20, fontFamily: "Poppins-Regular" }}>
                KYC Africa verifies your address over a period of three consecutive days. If the address location
                retains a positive result you will get a Verification Successful notification, but if the location fails
                our verification criteria it will return a Verification Failed result{" "}
              </Text>
            </View>
            <View
              style={{ borderColor: ColorTheme.grey2, borderWidth: 2, padding: 10, borderRadius: 10, marginBottom: 10 }}
            >
              <Text
                style={{
                  marginBottom: 5,
                  color: ColorTheme.grey,
                  fontSize: 13,
                  lineHeight: 20,
                  fontFamily: "Poppins-SemiBold",
                }}
              >
                How much data does it take to verify?{" "}
              </Text>
              <Text style={{ color: ColorTheme.grey, fontSize: 13, lineHeight: 20, fontFamily: "Poppins-Regular" }}>
                KYC Africa verifies your address over a period of three consecutive days. If the address location
                retains a positive result you will get a Verification Successful notification, but if the location fails
                our verification criteria it will return a Verification Failed result{" "}
              </Text>
            </View>
            <View
              style={{ borderColor: ColorTheme.grey2, borderWidth: 2, padding: 10, borderRadius: 10, marginBottom: 10 }}
            >
              <Text
                style={{
                  marginBottom: 5,
                  color: ColorTheme.grey,
                  fontSize: 13,
                  lineHeight: 20,
                  fontFamily: "Poppins-SemiBold",
                }}
              >
                Who has access to my location data?{" "}
              </Text>
              <Text style={{ color: ColorTheme.grey, fontSize: 13, lineHeight: 20, fontFamily: "Poppins-Regular" }}>
                KYC Africa verifies your address over a period of three consecutive days. If the address location
                retains a positive result you will get a Verification Successful notification, but if the location fails
                our verification criteria it will return a Verification Failed result{" "}
              </Text>
            </View>
            <View style={{ height: height * 0.18 }}></View>
          </View>
        </KeyboardAwareScrollView>
      </View>
    </SafeAreaView>
  );
};

export default Support;
