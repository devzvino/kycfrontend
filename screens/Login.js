import { View, Text, TouchableOpacity, ActivityIndicator } from "react-native";
import React, { useContext } from "react";
import { Dimensions } from "react-native";
import { ButtonTheme, FontTheme, LogoTheme } from "../components/ThemeFile";
import MainLogo from "../components/MainLogo";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import MainInput from "../components/MainInput";
import SignUpNavigationButton from "../components/SignUpNavigationButton";
import { useState } from "react";
import { errorMsg1 } from "../components/appMessages";
import { useNavigation, useRoute } from "@react-navigation/native";
import { keys } from "../environmentVariables";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { UserContext } from "../context/UserContext";

const { width, height } = Dimensions.get("window");

const Login = () => {
  const [firstname, setFirstname] = useState("");
  const [id, setId] = useState("");
  const [loading, setLoading] = useState(false);
  const [loadingLogin, setLoadingLogin] = useState(false);
  const [loadingSignUp, setLoadingSignUp] = useState(false);
  const [error, setError] = useState();
  const [message, setMessage] = useState();
  const navigation = useNavigation();
  const [cc, setCC] = useState(null);
  let token;

  const route = useRoute();
  const { setUser } = useContext(UserContext);

  const handleSignup = () => {
    setLoadingSignUp(true);
    // getting the auth token for id verification
    var requestOptions = {
      method: "POST",
      redirect: "follow",
    };

    fetch(
      `https://verify.kycafrica.com/api/auth/token?username=${keys.kycUser}&password=${keys.kycPassword}`,
      requestOptions
    )
      .then((response) => response.text())
      .then((result) => {
        token = JSON.parse(result);

        if (token !== null) {
          setLoadingSignUp(false);
          navigation.navigate("SignUp", {
            cc,
            token,
          });
        }
        setLoadingSignUp(false);
      })
      .catch((error) => {
        console.log("error", error);
        setLoadingSignUp(false);
      });
  };

  const onPress = () => {
    setMessage(null);
    setLoadingLogin(true);
    if (!id || !firstname) {
      setMessage("All fields are required");
    }
    axios
      .post(`${keys.apiURL}api/user/login`, {
        idNumber: id,
        firstname: firstname,
      })
      .then((res) => {
        setUser(res.data);
        AsyncStorage.setItem("@user", JSON.stringify(res.data));
        setLoadingLogin(false);
      })
      .catch((error) => {
        console.log(error);
        setMessage("You don't have an account. Please REGISTER below.");
        setLoadingLogin(false);
      });
  };

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
      <View style={{ flex: 1, alignItems: "center" }}>
        {message && (
          <View
            style={{
              marginTop: 10,
              width: "90%",
              justifyContent: "center",
              backgroundColor: "#f0000030",
              padding: 10,
              borderRadius: 5,
            }}
          >
            <Text>{message}</Text>
          </View>
        )}
        <View style={{ flex: 1 }}>
          <View style={{ width: width, height: "100%", marginTop: 10, alignItems: "center" }}>
            <MainInput
              title={"Surname (as on your ID)"}
              placeholder={""}
              required
              // onBlur={Keyboard.dismiss}
              onChange={(value) => {
                setFirstname(value.trim());
              }}
              info={id ? null : error}
              textStyles={FontTheme.errortxt}
            />
            <MainInput
              title={"National ID Number"}
              placeholder={""}
              required
              // onBlur={Keyboard.dismiss}
              onChange={(value) => {
                setId(value.replace(/[^a-zA-Z0-9]/g, "").toUpperCase());
              }}
              info={id ? null : error}
              textStyles={FontTheme.errortxt}
            />
            <TouchableOpacity onPress={() => onPress()} disabled={loadingLogin} style={ButtonTheme.LoginNavigation}>
              {loadingLogin ? <ActivityIndicator /> : <Text style={FontTheme.mainButtonFont}>Login</Text>}
            </TouchableOpacity>
            <View style={{ width: "80%", height: 2, backgroundColor: "#CBCBCB", marginTop: "8%" }}></View>
            <Text style={{ fontFamily: "Poppins-Regular", marginTop: "5%", fontSize: 16, color: "#7D7D7D" }}>
              Don't have an account?
            </Text>
            <TouchableOpacity onPress={() => handleSignup()} disabled={loading} style={ButtonTheme.SignUpNavigation}>
              {loadingSignUp ? (
                <ActivityIndicator />
              ) : (
                // <Puff
                //   height="80"
                //   width="80"
                //   radius={1}
                //   color="#4fa94d"
                //   ariaLabel="puff-loading"
                //   wrapperStyle={{}}
                //   wrapperClass=""
                //   visible={true}
                // />

                <Text style={FontTheme.mainButtonFont}>Register</Text>
              )}
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* log in element */}
    </View>
  );
};

export default Login;
