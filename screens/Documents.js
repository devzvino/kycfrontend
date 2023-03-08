import { View, Text, Dimensions, Linking, TouchableOpacity, Image } from "react-native";
import React, { useContext, useEffect } from "react";
import GlobalHeader from "../components/GlobalHeader";
import { ColorTheme, FontTheme } from "../components/ThemeFile";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { BookOpenIcon, IdentificationIcon, PlusIcon, HandIcon, PencilIcon } from "react-native-heroicons/solid";
import { UserContext } from "../context/UserContext";
import { TempContext } from "../context/TempContext";

const { height, width } = Dimensions.get("window");

const Documents = () => {
  const { setTempDisplay } = useContext(TempContext);
  const { user } = useContext(UserContext);

  useEffect(() => {
    // setTempDisplay([]);
  }, []);

  return (
    <View style={{ backgroundColor: "white", flex: 1, alignItems: "flex-start" }}>
      <GlobalHeader title="Home" />
      <View
        style={{
          paddingHorizontal: "5%",
          overflow: "scroll",
        }}
      >
        {/* <View style={{ padding: 15, backgroundColor: '#F8F8F8', width: width * 0.9, borderRadius: 10 }}>
                    <Text style={{ color: ColorTheme.grey, fontSize: 16, lineHeight: 20, textAlign: 'center' }}>KYC Africa verifies the authenticity of your documents in the background</Text>
                </View> */}
        <View style={{ padding: 10, paddingHorizontal: 0, width: width * 0.95 }}>
          <Text style={{ marginBottom: 20, fontFamily: "Poppins-SemiBold", fontSize: 18, color: "#4E4E4E" }}>
            Add Identification Document
          </Text>
          <View
            style={{ backgroundColor: "white", display: "flex", flexDirection: "row", justifyContent: "flex-start" }}
          >
            <TouchableOpacity
              // onPress={() =>
              //   navigation.navigate("AddNewLocation", {
              //     title: "home",
              //     myId: user._id,
              //   })
              // }
              style={{
                borderColor: ColorTheme.grey2,
                borderRightWidth: 3,
                borderBottomWidth: 3,
                borderLeftWidth: 1,
                borderTopWidth: 1,
                width: "40%",
                padding: 30,
                borderRadius: 5,
                alignItems: "center",
                marginRight: 20,
                justifyContent: "center",
              }}
            >
              <BookOpenIcon size={30} color={ColorTheme.main} />
              <Text style={{ color: ColorTheme.main, fontSize: 12, fontFamily: "Poppins-SemiBold" }}>Passport</Text>
            </TouchableOpacity>
            <TouchableOpacity
              // onPress={() =>
              //   navigation.navigate("AddNewLocation", {
              //     title: "work",
              //     myId: user._id,
              //   })
              // }
              style={{
                borderColor: ColorTheme.grey2,
                borderRightWidth: 3,
                borderBottomWidth: 3,
                borderLeftWidth: 1,
                borderTopWidth: 1,
                width: "40%",
                padding: 10,
                borderRadius: 5,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <IdentificationIcon size={30} color={ColorTheme.main} />
              <Text style={{ color: ColorTheme.main, fontSize: 12, fontFamily: "Poppins-SemiBold" }}>
                Driver's Licence
              </Text>
            </TouchableOpacity>
          </View>
          {/* <View style={{ backgroundColor: ColorTheme.grey3, width: width * 0.85, height: 1, marginTop: 20 }}></View> */}
        </View>
        <View style={{ padding: 10, paddingHorizontal: 0, width: width * 0.95 }}>
          <Text style={{ marginBottom: 20, fontFamily: "Poppins-SemiBold", fontSize: 18, color: "#4E4E4E" }}>
            Add Certificates
          </Text>
          <View
            style={{ backgroundColor: "white", display: "flex", flexDirection: "row", justifyContent: "flex-start" }}
          >
            <TouchableOpacity
              // onPress={() =>
              //   navigation.navigate("AddNewLocation", {
              //     title: "home",
              //     myId: user._id,
              //   })
              // }
              style={{
                borderColor: ColorTheme.grey2,
                borderRightWidth: 3,
                borderBottomWidth: 3,
                borderLeftWidth: 1,
                borderTopWidth: 1,
                width: "40%",
                padding: 30,
                borderRadius: 5,
                alignItems: "center",
                marginRight: 20,
                justifyContent: "center",
              }}
            >
              <PlusIcon size={30} color={ColorTheme.main} />
              <Text style={{ color: ColorTheme.main, fontSize: 12, fontFamily: "Poppins-SemiBold" }}>Add</Text>
            </TouchableOpacity>
            <TouchableOpacity
              // onPress={() =>
              //   navigation.navigate("AddNewLocation", {
              //     title: "home",
              //     myId: user._id,
              //   })
              // }
              style={{
                borderColor: ColorTheme.grey2,
                borderRightWidth: 3,
                borderBottomWidth: 3,
                borderLeftWidth: 1,
                borderTopWidth: 1,
                width: "40%",
                padding: 20,
                borderRadius: 5,
                alignItems: "center",
                marginRight: 20,
                justifyContent: "center",
              }}
            >
              <PencilIcon size={30} color={ColorTheme.main} />
              <Text style={{ color: ColorTheme.main, fontSize: 12, fontFamily: "Poppins-SemiBold" }}>
                Sign Documents
              </Text>
            </TouchableOpacity>
          </View>
          {/* <View style={{ backgroundColor: ColorTheme.grey3, width: width * 0.85, height: 1, marginTop: 20 }}></View> */}
        </View>
        <View
          style={{
            backgroundColor: ColorTheme.grey,
            width: width * 0.9,
            height: 0.5,
            marginTop: 10,
            marginRight: "5%",
          }}
        ></View>
        <View style={{ width: width * 0.9, marginTop: 10, marginRight: "5%" }}>
          <Text
            style={{
              marginBottom: 15,
              paddingHorizontal: "10%",
              paddingTop: "30%",
              color: ColorTheme.grey,
              fontSize: 14,
              color: "#000000",
              fontFamily: "Poppins-Regular",
              lineHeight: 20,
              textAlign: "center",
            }}
          >
            Your have not added any documents.
          </Text>
        </View>

        {/* 
                <Text style={{ marginBottom: 15, color: ColorTheme.main, fontSize: 17, lineHeight: 20, fontWeight: 'bold' }}>Frequently Asked Questions (FAQs) </Text>
                <KeyboardAwareScrollView


                >
                    <View>
                        <View style={{ borderColor: ColorTheme.grey2, borderWidth: 2, padding: 10, borderRadius: 10, marginBottom: 10 }}>
                            <Text style={{ marginBottom: 5, color: ColorTheme.grey, fontSize: 15, lineHeight: 20, fontWeight: 'bold' }}>How Long does it take to Verify an Address? </Text>
                            <Text style={{ color: ColorTheme.grey, fontSize: 15, lineHeight: 20 }}>KYC Africa verifies your address over a period of three consecutive days. If the address location retains a positive result you will get a Verification Successful notification, but if the location fails our verification criteria it will return a Verification Failed result  </Text>
                        </View>
                        <View style={{ borderColor: ColorTheme.grey2, borderWidth: 2, padding: 10, borderRadius: 10, marginBottom: 10 }}>
                            <Text style={{ marginBottom: 5, color: ColorTheme.grey, fontSize: 15, lineHeight: 20, fontWeight: 'bold' }}>How do I share my verifcation Certificates? </Text>
                            <Text style={{ color: ColorTheme.grey, fontSize: 15, lineHeight: 20 }}>KYC Africa verifies your address over a period of three consecutive days. If the address location retains a positive result you will get a Verification Successful notification, but if the location fails our verification criteria it will return a Verification Failed result  </Text>
                        </View>
                        <View style={{ borderColor: ColorTheme.grey2, borderWidth: 2, padding: 10, borderRadius: 10, marginBottom: 10 }}>
                            <Text style={{ marginBottom: 5, color: ColorTheme.grey, fontSize: 15, lineHeight: 20, fontWeight: 'bold' }}>How much data does it take to verify? </Text>
                            <Text style={{ color: ColorTheme.grey, fontSize: 15, lineHeight: 20 }}>KYC Africa verifies your address over a period of three consecutive days. If the address location retains a positive result you will get a Verification Successful notification, but if the location fails our verification criteria it will return a Verification Failed result  </Text>
                        </View>
                        <View style={{ borderColor: ColorTheme.grey2, borderWidth: 2, padding: 10, borderRadius: 10, marginBottom: 10 }}>
                            <Text style={{ marginBottom: 5, color: ColorTheme.grey, fontSize: 15, lineHeight: 20, fontWeight: 'bold' }}>Who has access to my location data? </Text>
                            <Text style={{ color: ColorTheme.grey, fontSize: 15, lineHeight: 20 }}>KYC Africa verifies your address over a period of three consecutive days. If the address location retains a positive result you will get a Verification Successful notification, but if the location fails our verification criteria it will return a Verification Failed result  </Text>
                        </View>
                        <View style={{ height: height * 0.18 }}>

                        </View>
                    </View>


                </KeyboardAwareScrollView> */}
      </View>
    </View>
  );
};

export default Documents;
