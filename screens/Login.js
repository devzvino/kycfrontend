import { View, Text, TouchableOpacity, ActivityIndicator } from 'react-native'
import React from 'react'
import { Dimensions } from 'react-native'
import { ButtonTheme, FontTheme, LogoTheme } from "../components/ThemeFile";
import MainLogo from "../components/MainLogo";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import MainInput from '../components/MainInput';
import SignUpNavigationButton from '../components/SignUpNavigationButton';
import { useState } from 'react';
import { errorMsg1 } from "../components/appMessages";
import { useNavigation } from "@react-navigation/native";
import { keys } from "../environmentVariables";
import AsyncStorage from '@react-native-async-storage/async-storage';


const { width, height } = Dimensions.get("window");

const Login = () => {
    const [firstName, setFirstName] = useState();
    const [id, setId] = useState();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState();
    const navigation = useNavigation();
    const [cc, setCC] = useState(null);
    let token;

    const handleSignup = () => {
        setLoading(true);
        // getting the auth token for id verification
        var requestOptions = {
            method: "POST",
            redirect: "follow",
        };

        fetch(`https://verify.kycafrica.com/api/auth/token?username=${keys.kycUser}&password=${keys.kycPassword}`, requestOptions)
            .then((response) => response.text())
            .then((result) => {
                token = JSON.parse(result);

                if (token !== null) {
                    setLoading(false);
                    navigation.navigate("SignUp", {
                        cc,
                        token,
                    });
                }
                setLoading(false);
            })
            .catch((error) => {
                console.log("error", error);
                setLoading(false);
            });

    }

    const onPress = () => {
        setLoading(true)
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
            "idNumber": id.toUpperCase(),
            "firstname": firstName,
        });

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        fetch(`${keys.apiURL}api/user/login`, requestOptions)
            .then(response => response.text())
            .then(result => {
                console.log(result)
                AsyncStorage.setItem("@user", JSON.stringify(result));
                setLoading(false)
            })
            .catch(error => {
                console.log('error', error)
                setLoading(false)
            });


    };
    //

    return (
        <View style={{ width: width, height: height }}>
            <View
                style={{
                    width: "100%",
                    height: "20%",
                    marginLeft: "8%",
                    paddingTop: "10%",
                }}
            >
                <View style={LogoTheme.miniLogo}>
                    <MainLogo />
                </View>
            </View>
            <View style={{ flex: 1 }}>
                <View style={{ flex: 1, }} >
                    <View style={{ width: width, height: "40%", marginTop: "9%", alignItems: "center", }}>
                        <MainInput
                            title={"First Name(s)"}
                            placeholder={"e.g. Phill Tinashe"}
                            required
                            // onBlur={Keyboard.dismiss}
                            onChange={(value) => {
                                setFirstName(value);
                            }}
                            info={id ? null : error}
                            textStyles={FontTheme.errortxt}
                        />
                        <MainInput
                            title={"ID Number"}
                            placeholder={"e.g. 63111111X07"}
                            required
                            // onBlur={Keyboard.dismiss}
                            onChange={(value) => {
                                setId(value);
                            }}
                            info={id ? null : error}
                            textStyles={FontTheme.errortxt}
                        />
                    </View>
                </View>
                <View style={{ width: width, height: "57%", alignItems: "center" }}>
                    <TouchableOpacity onPress={() => onPress()} disabled={loading} style={ButtonTheme.LoginNavigation}>
                        {loading ? <ActivityIndicator /> : <Text style={FontTheme.mainButtonFont}>Login</Text>}
                    </TouchableOpacity>
                    <View style={{ width: "80%", height: 2, backgroundColor: "#CBCBCB", marginTop: "8%", }}>
                    </View>
                    <Text style={{ fontFamily: "Poppins-Regular", marginTop: '5%', fontSize: 16, color: "#7D7D7D" }}>
                        Don't have an account?{" "}
                        {
                            <Text onPress={() => handleSignup()} style={{ fontFamily: "Poppins-Bold", marginTop: '5%', fontSize: 16, color: "#00BB56" }}>
                                Sign up
                            </Text>
                        }
                    </Text>

                </View>




            </View>
            {/* log in element */}
        </View>
    )
}

export default Login