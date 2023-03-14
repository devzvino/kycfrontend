import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useState, useEffect, useContext, useRef } from "react";
import { Dimensions, StyleSheet, Text, TouchableOpacity, View, ActivityIndicator, Alert, Image } from "react-native";
// import { QRCode as QRCODE } from "react-native-custom-qr-codes";
import GlobalHeader from "../components/GlobalHeader";
import MainButton from "../components/MainButton";
import { ColorTheme } from "../components/ThemeFile";
import kycLogo from "../assets/icon.png";
import { useNavigation } from "@react-navigation/native";
import * as FileSystem from "expo-file-system";
import * as Print from "expo-print";
import { printToFileAsync } from "expo-print";
import { shareAsync } from "expo-sharing";
import moment from "moment";
import { UserContext } from "../context/UserContext";
import { Asset, useAssets } from "expo-asset";
import { manipulateAsync } from "expo-image-manipulator";
import { TempContext } from "../context/TempContext";
import QRCode from "react-native-qrcode-svg";
import ViewShot from "react-native-view-shot";
// import QRCode from "qrcode";

export const kyc_logo = require("./kyc-logo.png");

const { width } = Dimensions.get("window");

fetchImageData = async (uri) => {
  // fetch Base64 string of image data
  const data = await FileSystem.readAsStringAsync("file://" + uri, {
    encoding: FileSystem.EncodingType.Base64,
  });
  return (imageData = "data:image/png;base64," + data);
};

const QRcode = () => {
  // navigation process
  const { user, setUser } = useContext(UserContext);
  const { setTempDisplay } = useContext(TempContext);
  const [asset, setAsset] = useState();

  let assetLogo;
  let assetApple;
  let assetGoogle;

  const [assets, error] = useAssets([require("./kyc-logo.png"), require("./apple.png"), require("./google.png")]);

  const navigation = useNavigation();

  const [loading, setLoading] = useState(false);
  const [outLoading, setOutLoading] = useState(false);

  const [svgImg, setSvgImg] = useState();

  const ref = useRef();

  const [PdfData, setPdfData] = useState(null);

  const gatheringAllUserLocations = () => {
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
        `https://kycbackendapp.herokuapp.com/api/home/my/${user._id}`,
        `https://kycbackendapp.herokuapp.com/api/work/my/${user._id}`,
      ].map((url) => fetchOk(url).then((r) => r.json()))
    )
      .then(([d1, d2]) => {
        // logging print info into the contexttttt
        setPdfData([d1, d2]);
      })
      .catch((e) => console.error(e));
  };

  const generateKycPdf = async () => {
    setLoading(true);
    // assetLogo = Asset.fromModule(require("./kyc-logo.png"));
    // const imageLogo = await manipulateAsync(assetLogo.localUri ?? assetLogo.uri, [], { base64: true });

    // assetApple = Asset.fromModule(require("./apple.png"));
    // const imageApple = await manipulateAsync(assetApple.localUri ?? assetApple.uri, [], { base64: true });

    // assetGoogle = Asset.fromModule(require("./google.png"));
    // const imageGoogle = await manipulateAsync(assetGoogle.localUri ?? assetGoogle.uri, [], { base64: true });

    const assetQrImg = Asset.fromModule(svgImg);
    const imageQRCode = await manipulateAsync(assetQrImg.localUri ?? assetQrImg.uri, [], { base64: true });

    let html = `<html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta http-equiv="X-UA-Compatible" content="IE=edge" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <link
        href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,500;1,600;1,700&display=swap"
        rel="stylesheet"
      />
      <title>Document</title>
    </head>
    <body style="font-family: Poppins; width: 90%; margin: auto; margin-top: 20px; display: block">
      <section
        id="header"
        style="
          display: flex;
          justify-content: space-between;
          margin-bottom: 30px;
          background-color: #eaeaea;
          padding: 3px;
          align-items: center;
          border-radius: 2px;
          width: 100%;
        "
      >
        <div style="display: flex; align-items: center; width: 30%">
          <a style="display: flex; align-items: center">
          <img src="data:image/jpeg;base64,${"imageLogo.base64"}" alt="kyc_logo" style="height: 20px" />
          </a>
        </div>
        <div style="display: flex; justify-content: end; width: 60%">
          <div
            style="
              width: 50%;
              font-size: 7px;
              text-align: right;
              margin-right: 2%;
              display: flex;
              align-items: center;
              color: #4e4e4e;
            "
          >
            To verify your identity & address please download the KYC AFRICA app from:
          </div>
          <div style="width: 32%; text-align: right; justify-content: space-between; display: flex">
           <img src="data:image/jpeg;base64,${"imageApple.base64"}" alt="apple_link" style="height: 20px" />
           <img src="data:image/jpeg;base64,${"imageGoogle.base64"}" alt="google_link" style="height: 20px" />
          </div>
        </div>
      </section>
      <section id="personal_details" style="width: 100%">
        <div style="display: block; color: #2fbf00; font-weight: 500; font-size: 14px">Personal Details</div>
        <div style="display: flex; width: 100%">
          <div style="width: 60%">
            <div style="display: flex; margin-top: 2%; margin-bottom: 2%">
            
              <div style="width: 50%">
                <h6 style="margin: 0px; font-weight: 300">Name(s):</h6>
                <h5 style="margin: 0px; font-weight: 500">${user.firstname}</h5>
              </div>
              <div style="width: 50%">
                <h6 style="margin: 0px; font-weight: 300">Surname:</h6>
                <h5 style="margin: 0px; font-weight: 500">${user.surname}</h5>
              </div>
            </div>
            <div style="display: flex; margin-top: 2%; margin-bottom: 2%">
              <div style="width: 50%">
                <h6 style="margin: 0px; font-weight: 300">National ID:</h6>
                <h5 style="margin: 0px; font-weight: 500">${user.idNumber}</h5>
              </div>
              <div style="width: 50%">
                <h6 style="margin: 0px; font-weight: 300">Phone:</h6>
                <h5 style="margin: 0px; font-weight: 500">${user.phone}</h5>
              </div>
            </div>
            <div>
              <div>
                <h6 style="margin: 0px; font-weight: 500">Registered on: ${moment(user.createdAt).format("lll")}</h6>
                <p style="font-size: 8px; font-style: italic; margin: 0px">
                This is the date when ${user.firstname} ${
      user.surname
    }'s National ID was verified on the KYC Africa National ID & Address Verification System.
                </p>
              </div>
            </div>
          </div>
          <div style="display: flex; justify-content: end; align-items: center; width: 40%">      
          <img src="data:image/jpeg;base64,${imageQRCode.base64}" alt="google_link" style="height: 120px" />
          </div>
        </div>
      </section>
      <section
        id="verified_home_addresses"
        style="border-top: dotted 1px #4e4e4e; padding-top: 2%; margin-top: 2%; margin-bottom: 3%"
      >
        <div style="display: block; color: #2fbf00; font-weight: 500; font-size: 14px; margin-bottom: 2%">
          Verified Home Addresses
        </div>
        <div>
         ${
           PdfData[0].length > 0
             ? PdfData[0]
                 .map(
                   (home) =>
                     `<div style="display: flex; background-color: #f6f6f6; margin-bottom: 3%; border-radius: 5px; overflow: hidden">
          <div style="background-color: #2fbf00; width: 15px"></div>
          <div style="margin-left: 10px; padding-top: 1%; padding-bottom: 1%">
            <div style="display: flex; margin-top: 2%; margin-bottom: 2%">
              <h5 style="margin: 0px; font-weight: 300; font-size: 11px">Address:</h5>
              <h5 style="margin: 0px; font-weight: 500; font-size: 11px">${home.streetName}</h5>
            </div>
            <div style="display: flex; margin-top: 2%; margin-bottom: 2%">
              <h5 style="margin: 0px; font-weight: 300; font-size: 11px">Surburb:</h5>
              <h5 style="margin: 0px; font-weight: 500; font-size: 11px">${home.suburb}</h5>
            </div>
            <div style="display: flex; margin-top: 2%; margin-bottom: 2%">
              <h5 style="margin: 0px; font-weight: 300; font-size: 11px">City:</h5>
              <h5 style="margin: 0px; font-weight: 500; font-size: 11px">${home.city}</h5>
            </div>
            <div style="display: flex; margin-top: 2%; margin-bottom: 2%">
              <h5 style="margin: 0px; font-weight: 300; font-size: 11px">Registered On:</h5>
              <h5 style="margin: 0px; font-weight: 500; font-size: 11px">${moment(home.createdAt).format("lll")}</h5>
            </div>
          </div>
        </div>`
                 )
                 .join("")
             : `<p>${user.firstname} ${user.surname} has not set any home addresses.</p>`
         }
      </section>
      <section id="verified_home_addresses" style="border-top: dotted 1px #4e4e4e; padding-top: 2%; margin-top: 2%">
        <div style="display: block; color: #2fbf00; font-weight: 500; font-size: 14px; margin-bottom: 2%">
          Verified Work Addresses
        </div>
        <div>
         ${
           PdfData[1].length > 0
             ? PdfData[1]
                 .map(
                   (work) =>
                     `<div style="display: flex; background-color: #f6f6f6;margin-bottom: 3%; border-radius: 5px; overflow: hidden">
          <div style="background-color: #2fbf00; width: 15px"></div>
          <div style="margin-left: 10px; padding-top: 1%; padding-bottom: 1%">
            <div style="display: flex; margin-top: 2%; margin-bottom: 2%">
              <h5 style="margin: 0px; font-weight: 300; font-size: 11px">Address:</h5>
              <h5 style="margin: 0px; font-weight: 500; font-size: 11px">${work.streetName}</h5>
            </div>
            <div style="display: flex; margin-top: 2%; margin-bottom: 2%">
              <h5 style="margin: 0px; font-weight: 300; font-size: 11px">Area:</h5>
              <h5 style="margin: 0px; font-weight: 500; font-size: 11px">${work.suburb}</h5>
            </div>
            <div style="display: flex; margin-top: 2%; margin-bottom: 2%">
              <h5 style="margin: 0px; font-weight: 300; font-size: 11px">City:</h5>
              <h5 style="margin: 0px; font-weight: 500; font-size: 11px">${work.city}</h5>
            </div>
            <div style="display: flex; margin-top: 2%; margin-bottom: 2%">
              <h5 style="margin: 0px; font-weight: 300; font-size: 11px">Registered On:</h5>
              <h5 style="margin: 0px; font-weight: 500; font-size: 11px">${moment(work.createdAt).format("lll")}</h5>
            </div>
          </div>
        </div>`
                 )
                 .join("")
             : `<p>${user.firstname} ${user.surname} has not set any work addresses.</p>`
         }
      </section>
      
    </body>
  </html>`;

    try {
      // await Print.printAsync({
      //   html,
      //   base64: false,
      // });
      const file = await printToFileAsync({
        html: html,
        base64: false,
      });

      await shareAsync(file.uri);

      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    setOutLoading(true);
    setUser(null);
    await AsyncStorage.removeItem("@user");
    setOutLoading(false);
  };

  useEffect(() => {
    if (user) {
      gatheringAllUserLocations();

      ref.current.capture().then((uri) => {
        // console.log(uri);
        setSvgImg(uri);
      });
    }
  }, []);

  // console.log(asset);

  return (
    <View style={{ backgroundColor: "white", flex: 1 }}>
      <GlobalHeader title="Share Certificate" />
      <View
        style={{
          flexDirection: "column",
          alignItems: "center",
          backgroundColor: "#FFFFFF",
          marginTop: 0,
          display: "flex",
        }}
      >
        <Text style={{ fontFamily: "Poppins-SemiBold", fontSize: 16, color: ColorTheme.grey4, marginBottom: 20 }}>
          Share Your KYC Details{" "}
        </Text>

        {user && (
          <ViewShot ref={ref} options={{ format: "jpg", quality: 1 }}>
            <QRCode size={270} value={`KYCAID_${user._id}`} />
          </ViewShot>
        )}
      </View>
      <View style={{ alignItems: "center", marginTop: 20 }}>
        {/* <TouchableOpacity

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
        </TouchableOpacity> */}

        <TouchableOpacity
          disabled={loading}
          onPress={async () => {
            PdfData && generateKycPdf();
          }}
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
              // textTransform: "capitalize",
            }}
          >
            {loading ? <ActivityIndicator /> : "Verified Proof of Residence"}
          </Text>
        </TouchableOpacity>
        {/* <TouchableOpacity
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
        </TouchableOpacity> */}
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
            // paddingRight: "5%",
          }}
          onPress={handleLogout}
        >
          {outLoading ? (
            <Text
              style={{
                fontSize: 18,
                color: "#fff",
                textTransform: "capitalize",
                fontFamily: "Poppins-SemiBold",
                textAlign: "center",
              }}
            >
              {" "}
              Logging Out...
            </Text>
          ) : (
            <Text
              style={{
                fontSize: 18,
                color: "#fff",
                textTransform: "capitalize",
                fontFamily: "Poppins-SemiBold",
                textAlign: "center",
              }}
            >
              Log Out
            </Text>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default QRcode;

const styles = StyleSheet.create({
  flex: 1,
});

// const file = await printToFileAsync({
//   html: html,
//   base64: false,
// });

// await Sharing.shareAsync(file.uri);
