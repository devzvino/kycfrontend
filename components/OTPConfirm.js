import React, { useEffect, useState } from "react";
import { Text, View, Keyboard, Linking } from "react-native";

import MainInput from "./MainInput";
import SignUpNavigationButton from "./SignUpNavigationButton";
import { Dimensions } from "react-native";
import { errorMsg1 } from "./appMessages";

import { FontTheme, ColorTheme } from "../components/ThemeFile";
import { keys } from "../environmentVariables";
import moment from "moment";

//Device Dimenstions
const { width } = Dimensions.get("screen");

const otpMessage = () => {
  return (
    <View style={{ width: width / 1.15, marginTop: 10 }}>
      <Text style={{}}>
        Check your SMS for your security code. If you don't receive your
        security code, please{" "}
        <Text
          onPress={() => Linking.openURL("https://wa.me/263773384668")}
          style={FontTheme.footerLink}
        >
          contact support for further assistance.
        </Text>
      </Text>
    </View>
  );
};

const resendOTP = (data) => {
  const handleOTPRequest = async () => {
    const response = await fetch(`${keys.apiURL}api/user/confirm-otp`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        phone: data.phone,
        otp: data.otp,
      }),
    });
    const json = await response.json();
    console.log(json);
    if (!response.ok) {
      alert("something when wrong please try again");
    }
    if (response.ok) {
      // save user to local storage
      console.log(json);
    }
  };

  return (
    <View style={{ width: width, paddingLeft: "7%", marginTop: "2%" }}>
      <Text style={{ color: "#000", alignSelf: "flex-start", width: "80%" }}>
        Didn't receive an OTP code?{" "}
        <Text onPress={handleOTPRequest} style={FontTheme.footerLink}>
          Resend OTP.
        </Text>
      </Text>
    </View>
  );
};

const OTPConfirm = ({
  data,
  setUserView,
  setIdUploadView,
  setOtpConfrimView,
  setRegConfrimView,
}) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();
  const [otpErrMessage, setOtpErrMessage] = useState();
  const [otpCon, setOtpCon] = useState();
  const [timer, setTimer] = useState(0);
  const [timerView, setTimerView] = useState(false);
  const [countDown, setCountDown] = useState();
  let theTime;

  // submit function to api
  const handleSubmit = () => {
    setLoading(true);
    if (!otpCon) {
      setLoading(false);
      return setOtpErrMessage(errorMsg1);
    }
    if (Number(otpCon) !== Number(data.otp)) {
      setLoading(false);
      return setOtpErrMessage("Your OTP does not match");
    }
    if (Number(otpCon) === Number(data.otp)) {
      setTimeout(() => {
        setUserView(false);
        setIdUploadView(false);
        setOtpConfrimView(false);
        setRegConfrimView(true);
        setLoading(false);
      }, 50);
      //
      setLoading(false);
    } else {
      setError(errorMsg1);
      setLoading(false);
      console.log(error);
      //
    }
  };

  // function for timer count down message
  const startTimer = (duration, theTime) => {
    let timer = duration,
      minutes,
      seconds;
    setInterval(function () {
      minutes = parseInt(timer / 60, 10);
      seconds = parseInt(timer % 60, 10);

      minutes = minutes < 10 ? "0" + minutes : minutes;
      seconds = seconds < 10 ? "0" + seconds : seconds;

      theTime = minutes + ":" + seconds;

      setCountDown(theTime);

      if (--timer < 0) {
        timer = duration;
        setTimerView(true);
      }
    }, 1000);
  };

  useEffect(() => {
    let fiveMinutes = 60 * 2;
    startTimer(fiveMinutes, theTime);
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <View style={{ width: width, height: "65%", alignItems: "center" }}>
        <MainInput
          title={"OTP Confirmation Code"}
          textStyles={FontTheme.errortxt}
          required
          info={otpCon ? null : error}
          onBlur={Keyboard.dismiss}
          onChange={(value) => {
            setOtpCon(value);
          }}
        />
        {otpCon === data.otp ? null : (
          <Text
            style={{ color: "red", alignSelf: "flex-start", paddingLeft: 25 }}
          >
            {otpErrMessage}
          </Text>
        )}

        {!timerView ? (
          <Text>Your OTP expires in {countDown}</Text>
        ) : (
          resendOTP(data)
        )}

        {otpMessage()}
      </View>

      <View
        style={{
          width: width,
          height: "15%",
          alignItems: "center",
          position: "absolute",
          bottom: 0,
        }}
      >
        <SignUpNavigationButton
          title={"Verify"}
          loading={loading}
          onPress={handleSubmit}
        />
      </View>
    </View>
  );
};

export default OTPConfirm;
