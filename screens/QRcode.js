import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useState, useEffect } from "react";
import { Dimensions, StyleSheet, Text, TouchableOpacity, View, Button, ActivityIndicator } from "react-native";
import { QRCode } from "react-native-custom-qr-codes";
import { SafeAreaView } from "react-native-safe-area-context";
import { Touchable } from "react-native-web";
import GlobalHeader from "../components/GlobalHeader";
import MainButton from "../components/MainButton";
import { ColorTheme } from "../components/ThemeFile";
import kycLogo from "../assets/icon.png";
import { useNavigation } from "@react-navigation/native";
import { printToFileAsync } from "expo-print";
import * as Sharing from "expo-sharing";
import moment from "moment";
import { render } from "react-dom";

const QRcode = () => {
  // navigation process
  const navigation = useNavigation();
  const { width, height } = Dimensions.get("window");
  const [loading, setLoading] = useState(false);
  const [clientHomeLocations, setClientHomeLocations] = useState([]);
  const [clientWorkLocations, setClientWorkLocations] = useState([]);
  const [userId, setUserId] = useState();

  const [PdfData, setPdfData] = useState("");

  const QRCodeDisplay = (name) => {
    return (
      <View>
        <QRCode size={270} codeStyle="circle" logo={kycLogo} logoSize={40} content={name} />;
      </View>
    );
  };

  const html = `
     <html style="margin:0 !important">
     <head>
     <style>
     p,h4,h1,h2,h3,h5,h6 {margin:0;}
   </style>
      </head>
       <body style="margin:0">
        <div>
            <p style="color:green;">Personal details</p>
            <div style="display:flex; justify-content: space-between; width:100%; ">
              <div style="flex: 1;">
                <div style="display:flex; gap:10px;">
                  <div style="margin:0">
                    <p>Name(S):</p>
                    <h4>${PdfData[0].details.firstname}</h4>
                  </div>
                  <div style="margin:0">
                    <p>Surname:</p>
                    <h4>${PdfData[0].details.surname}</h4>
                  </div>
                </div>
                <div style="display:flex; gap:10px;">
                  <div style="margin:0">
                    <p>National ID No:</p>
                    <h4>${PdfData[0].details.idNumber}</h4>
                  </div>
                  <div style="margin:0">
                    <p>Phone Number:</p>
                    <h4>${PdfData[0].details.phone}</h4>
                  </div>
                </div>
                <p>Registered on: ${moment(PdfData[0].details.createdAt).format("lll")}</p>
                <p style="font-size: 0.875rem;">
                  This is the date when ${PdfData[0].details.firstname} ${PdfData[0].details.surname} 
                  registered on the KYC Africa National Identity & Address Verification Platform / System.
                </p>
              </div>
              <div style="flex: 1;">
                ${() => (render) =>
                  <QRCode size={270} codeStyle="circle" logo={kycLogo} logoSize={40} content={"hey"} />}
              </div>
            </div>
        </div>

        <div style="border-top: 1px dotted green; padding-top:10px; margin-top:10px">
          <p style="color:green;">${PdfData[0].details.firstname}'s Home Locations</p>
          <div style="background-color: #f6f6f6;  border-radius: 5px; padding:10px;  box-shadow:inset 5px 0px 0px 0px green;>
          ${
            PdfData[0].home.length > 0
              ? PdfData[0].home
                  .map(
                    (home) => `<div> 
            <p style="font-size: 0.875rem;">Address : ${home.streetName}</p> 
            <p style="font-size: 0.875rem;">Surburb : ${home.suburb}</p> 
            <p style="font-size: 0.875rem;">City : ${home.city}</p> 
            <p style="font-size: 0.875rem;">Added On : ${moment(home.createdAt).format("lll")}</p> 
            <p style="font-size: 0.875rem;">Verification State : ${home.homeVerified}</p> 
            <p style="font-size: 0.875rem;">Positive Verification Checks : ${home.homeTotalCount}</p> 
            <p style="font-size: 0.875rem;">Total Verification Checks: : ${home.homeVerificationCount}</p> 
          </div>`
                  )
                  .join("")
              : `<p>${PdfData[0].details.firstname} ${PdfData[0].details.surname} has not set any home locations.</p>`
          } 
          </div>
        </div>

        <div style="border-top: 1px dotted green; padding-top:10px; margin-top:10px">
          <p style="color:green;">${PdfData[0].details.firstname}'s Work Locations</p>
          <div>
          ${
            PdfData[0].work.length > 0
              ? PdfData[0].work
                  .map(
                    (work) => `<div> 
            <p>Address : ${work.streetName}</p> 
            <p>Surburb : ${work.suburb}</p> 
            <p>City : ${work.city}</p> 
            <p>Added On : ${moment(work.createdAt).format("lll")}</p> 
            <p>Verification State : ${work.workVerified}</p> 
            <p>Positive Verification Checks : ${work.workTotalCount}</p> 
            <p>Total Verification Checks: : ${work.workVerificationCount}</p> 
          </div>`
                  )
                  .join("")
              : `<p>${PdfData[0].details.firstname} ${PdfData[0].details.surname} has not set any work locations.</p>`
          } 
          </div>
        </div>
      </body>
     </html>
  `;

  console.log(PdfData);

  const gatheringAllUserLocations = () => {
    setLoading(true);
    let fetchOk = (...args) =>
      fetch(...args).then((res) =>
        res.ok
          ? res
          : res.json().then((data) => {
              throw Object.assign(new Error(data.error_message), { name: res.statusText });
            })
      );
    Promise.all(
      [
        `https://kycbackendapp.herokuapp.com/api/home/my/${userId._id}`,
        `https://kycbackendapp.herokuapp.com/api/work/my/${userId._id}`,
      ].map((url) => fetchOk(url).then((r) => r.json()))
    )
      .then(([d1, d2]) => {
        setClientHomeLocations(d1);
        setClientWorkLocations(d2);

        // logging print info into the context
        setPdfData([
          {
            details: userId,
            home: d1,
            work: d2,
          },
        ]);

        setLoading(false);
      })
      .catch((e) => console.error(e));
  };

  const generateKycPdf = async () => {
    // generating
    await gatheringAllUserLocations();
    const file = await printToFileAsync({
      html: html,
      base64: false,
    });

    await Sharing.shareAsync(file.uri);
  };

  const handleLogout = async () => {
    setLoading(true);
    // await AsyncStorage.removeItem("@user");
    // AsyncStorage.clear();
    // navigation.
    setLoading(false);
  };

  useEffect(() => {
    (async () => {
      const storedUser = await AsyncStorage.getItem("@user");
      const user = JSON.parse(storedUser);
      setUserId(user);
    })();
  }, []);

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: "#ffffff", flex: 1 }]}>
      <GlobalHeader title="Share Certificate" />
      <View
        style={{
          flexDirection: "column",
          alignItems: "center",
          backgroundColor: "#FFFFFF",
          marginTop: 20,
          display: "flex",
        }}
      >
        <QRCode size={270} codeStyle="circle" logo={kycLogo} logoSize={40} content="https://kycafrica.com" />
      </View>
      <View style={{ alignItems: "center", marginTop: 20 }}>
        <TouchableOpacity
          disabled={loading}
          onPress={generateKycPdf}
          style={{
            borderColor: ColorTheme.grey2,
            borderRightWidth: 3,
            borderBottomWidth: 3,
            borderLeftWidth: 1,
            borderTopWidth: 1,
            borderRadius: 5,
            marginBottom: 15,
            display: "flex",
            alignItems: "center",
            paddingBottom: "3%",
            paddingTop: "3%",

            width: width * 0.8,
          }}
        >
          <Text style={{ fontSize: 18, color: ColorTheme.main, fontFamily: "Poppins-SemiBold" }}>
            {loading ? <ActivityIndicator /> : "Full KYC Certificate"}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            borderColor: ColorTheme.grey2,
            borderRightWidth: 3,
            borderBottomWidth: 3,
            borderLeftWidth: 1,
            borderTopWidth: 1,
            borderRadius: 5,
            marginBottom: 15,
            display: "flex",
            alignItems: "center",
            paddingBottom: "3%",
            paddingTop: "3%",
            width: width * 0.8,
          }}
        >
          <Text style={{ fontSize: 18, color: ColorTheme.main, fontFamily: "Poppins-SemiBold" }}>
            Verified National ID
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            borderColor: ColorTheme.grey2,
            borderRightWidth: 3,
            borderBottomWidth: 3,
            borderLeftWidth: 1,
            borderTopWidth: 1,
            borderRadius: 5,
            marginBottom: 15,
            display: "flex",
            alignItems: "center",
            paddingBottom: "3%",
            paddingTop: "3%",
            width: width * 0.8,
          }}
        >
          <Text
            style={{
              fontSize: 18,
              color: ColorTheme.main,
              fontFamily: "Poppins-SemiBold",
              textTransform: "capitalize",
            }}
          >
            Verified Proof of Residence
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            display: "flex",
            backgroundColor: ColorTheme.main,
            flexDirection: "row",
            width: "80%",
            borderRadius: 5,
            alignItems: "center",
            paddingVertical: "3%",
            marginTop: "1%",
            alignContent: "center",
            justifyContent: "center",
            paddingRight: "5%",
          }}
          onPress={handleLogout}
        >
          {loading ? (
            <Text> Logging Out...</Text>
          ) : (
            <Text style={{ fontSize: 18, color: "#fff", textTransform: "capitalize", fontFamily: "Poppins-SemiBold" }}>
              Log Out
            </Text>
          )}
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default QRcode;

const styles = StyleSheet.create({
  flex: 1,
});
