import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { Image, ImageBackground, Linking, Text, View } from "react-native";
import MainLogo from "../components/MainLogo";
import welcomeBg from "../assets/images/splash-bg.jpg";
import * as Localization from "expo-localization";

//import components
import MainButton from "../components/MainButton";

//import styles
import { ButtonTheme, FontTheme, InputTheme, LogoTheme, SectionTheme } from "../components/ThemeFile";
import { keys } from "../environmentVariables";
// import ButtonWithText from "../components/ButtonWithText";
import { Dimensions } from "react-native";

const { width, height } = Dimensions.get("screen");
//Usable variables
const footerMessage = "By continuing you agree to our";
const footerLink = "terms and privacy policy";
const appMotto = "Smart Know Your Customer Solutions in one Place";
const appDescription = "This app enables you to verify your Address & National Identity in just a few taps.";

const WelcomeScreen = () => {
  const navigation = useNavigation();
  const [cc, setCC] = useState(null);
  const [loading, setLoading] = useState(false);
  let token;
  // const [token, setToken] = useState();
  //Handling buttonPress
  const handlePress = () => {
    navigation.navigate("Login")
  };

  useEffect(() => {
    const getCountryCode = async () => {
      const lang = await Localization.region;
      setCC(lang);
    };
    getCountryCode();
  });

  return (
    <View style={{ width: width, height: "100%", backgroundColor: "#ffffff" }}>
      <ImageBackground style={[SectionTheme.welcomeSection1, { borderBottomRightRadius: 75, overflow: 'hidden', width: width }]} source={welcomeBg}>
        <View style={SectionTheme.welcomeSection1_inner}>
          <MainLogo style={LogoTheme.mainLogo} />
          <Text style={FontTheme.motto}>{appMotto}</Text>
          <Text style={FontTheme.description}>{appDescription}</Text>
        </View>
      </ImageBackground>
      <View style={SectionTheme.welcomeSection2}>
        <View style={SectionTheme.welcomeSection3}>
          <MainButton title={"Get Started"} onPress={handlePress} />
          {/* <ButtonWithText title="Getting Started" onPress={handlePress} loading={loading} /> */}
          <Text style={FontTheme.footerText}>
            {footerMessage}{" "}
            {
              <Text onPress={() => Linking.openURL("http://kycafrica.com")} style={FontTheme.footerLink}>
                {footerLink}
              </Text>
            }
          </Text>
        </View>
      </View>
    </View>
  );
};

export default WelcomeScreen;
