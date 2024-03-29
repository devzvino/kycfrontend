import { View, Text, ImageBackground, Dimensions, TouchableOpacity, Image } from "react-native";
import React from "react";
import MainButton from "../components/MainButton";
import { ButtonTheme, ColorTheme, FontTheme, LogoTheme, SectionTheme } from "../components/ThemeFile";
import welcomeBg from "../assets/images/splash-bg.jpg";
import MainLogo from "../components/MainLogo";
import { useNavigation } from "@react-navigation/native";

const Onboarding3 = () => {
    const { width, height } = Dimensions.get("window");
    const navigation = useNavigation();

    return (
        <View style={{ width: width, height: "100%", backgroundColor: "#ffffff" }}>
            <ImageBackground
                style={[
                    SectionTheme.welcomeSection1,
                    {
                        borderBottomRightRadius: 40,
                        borderBottomLeftRadius: 40,
                        alignItems: "center",
                        overflow: "hidden",
                        width: width,
                        height: height * 0.8,
                    },
                ]}
                source={welcomeBg}
            >
                <View style={[SectionTheme.welcomeSection1_inner, { alignItems: "center" }]}>
                    <MainLogo style={LogoTheme.mainLogoOnboard} />
                    {/* <Text style={FontTheme.motto}>{appMotto}</Text> */}
                    <Image
                        source={require("../assets/images/IDVerified.png")}
                        style={{ height: "35%", width: "60%", marginBottom: "5%" }}
                    />
                    <Text style={{ color: ColorTheme.grey, fontSize: 16, lineHeight: 25, fontFamily: "Poppins-Regular" }}>
                        KYC AFRICA verifies your Addresses in the background, make sure that you set location permissions to{" "}
                        <Text style={{ fontFamily: "Poppins-SemiBold" }}>Allow all the Time</Text>.
                    </Text>
                </View>
            </ImageBackground>
            <View style={[SectionTheme.welcomeSection2, { backgroundColor: "white", height: height * 0.20, marginHorizontal: "10%", }]}>
                {/* <View style={[SectionTheme.welcomeSection3, { height: "100%" }]}> */}
                {/* <TouchableOpacity onPress={
                    () => {
                        console.log('====================================');
                        console.log('clicked Onboarding1');
                        console.log('====================================');
                        navigation.navigate('Onboarding2')
                    }
                } style={ButtonTheme.mainButton}>
                    <Text style={FontTheme.mainButtonFont}>Next</Text>
                </TouchableOpacity> */}
                <View
                    style={{
                        backgroundColor: "#fff",
                        width: width,
                        // marginTop: "20%",
                        position: 'absolute',
                        bottom: "10%",
                        width: width * 0.8,
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignItems: "center",
                    }}
                >
                    <Text
                        style={{ fontFamily: "Poppins-SemiBold" }}
                        onPress={() => {
                            navigation.navigate("Login");
                        }}
                    >
                        Skip
                    </Text>
                    <View
                        style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", width: width * 0.35 }}
                    >
                        {/* <Transition appear='right' disappear='left'> */}
                        <TouchableOpacity
                            style={{ backgroundColor: ColorTheme.main, height: 10, width: 30, borderRadius: 10, opacity: 0.3 }}
                            onPress={() => {
                                navigation.navigate("Onboarding1");
                            }}
                        ></TouchableOpacity>
                        <TouchableOpacity
                            style={{ backgroundColor: ColorTheme.main, height: 10, width: 30, borderRadius: 10, opacity: 0.3 }}
                            onPress={() => {
                                navigation.navigate("Onboarding2");
                            }}
                        ></TouchableOpacity>
                        <TouchableOpacity
                            style={{ backgroundColor: ColorTheme.main, height: 10, width: 45, borderRadius: 10, opacity: 1 }}
                            onPress={() => {
                                navigation.navigate("Onboarding3");
                            }}
                        ></TouchableOpacity>
                        {/* </Transition> */}
                    </View>
                    <Text
                        onPress={() => {
                            navigation.navigate("Login");
                        }}
                        style={{ fontFamily: "Poppins-SemiBold" }}
                    >
                        Done
                    </Text>
                </View>
                {/* </View> */}
            </View>
        </View>
    );
};

export default Onboarding3;
