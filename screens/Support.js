import { View, Text, Dimensions, Linking } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import GlobalHeader from "../components/GlobalHeader";
import { ColorTheme } from "../components/ThemeFile";
import { FlatList } from "react-native-gesture-handler";
import { StyleSheet } from "react-native";
import { TempContext } from "../context/TempContext";

const { height } = Dimensions.get("window");

const Support = () => {
  const { setTempDisplay } = useContext(TempContext);
  const [fqaContent, setFqaContent] = useState([
    {
      id: 1,
      fqaTitle: "How Long does it take to Verify an Address?",
      fqaText:
        "KYC Africa verifies your address over a period of three consecutive days. If the address location retains a positive result you will get a Verification Successful notification, but if the location fails our verification criteria it will return a Verification Failed result",
    },
    {
      id: 2,
      fqaTitle: "How do I share my verification Certificates?",
      fqaText:
        "KYC Africa verifies your address over a period of three consecutive days. If the address location retains a positive result you will get a Verification Successful notification, but if the location fails our verification criteria it will return a Verification Failed result",
    },
    {
      id: 3,
      fqaTitle: "How much data does it take to verify?",
      fqaText:
        "KYC Africa verifies your address over a period of three consecutive days. If the address location retains a positive result you will get a Verification Successful notification, but if the location fails our verification criteria it will return a Verification Failed result",
    },
    {
      id: 4,
      fqaTitle: "Who has access to my location data?",
      fqaText:
        "KYC Africa verifies your address over a period of three consecutive days. If the address location retains a positive result you will get a Verification Successful notification, but if the location fails our verification criteria it will return a Verification Failed result",
    },
  ]);

  useEffect(() => {
    setTempDisplay([]);
  }, []);

  return (
    <View style={{ backgroundColor: "white", flex: 1, height: height, display: "flex", alignItems: "flex-start" }}>
      <GlobalHeader title="Home" />
      <View style={{ paddingHorizontal: "5%", overflow: "scroll" }}>
        <View style={{ padding: 15, backgroundColor: "#F8F8F8", marginBottom: 30, borderRadius: 10 }}>
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
        <FlatList
          data={fqaContent}
          ListFooterComponent={<View style={{ height: height * 0.18 }}></View>}
          renderItem={({ item }) => (
            <View style={styles.fqaContainer}>
              <Text style={styles.fqaTitle}>{item.fqaTitle}</Text>
              <Text style={styles.fqaText}>{item.fqaText}</Text>
            </View>
          )}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  fqaContainer: {
    borderColor: ColorTheme.grey2,
    borderWidth: 2,
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
  },
  fqaTitle: {
    marginBottom: 5,
    color: ColorTheme.grey,
    fontSize: 13,
    lineHeight: 20,
    fontFamily: "Poppins-SemiBold",
  },
  fqaText: { color: ColorTheme.grey, fontSize: 13, lineHeight: 20, fontFamily: "Poppins-Regular" },
});

export default Support;
