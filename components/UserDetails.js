import React, { useEffect, useRef, useState, ScrollView } from "react";
import { Alert, Image, Keyboard, ScrollViewComponent, Text, TextInput, View } from "react-native";

// import PhoneInput from "react-native-phone-input";
import PhoneInput from "react-native-phone-number-input";

import { Dimensions } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { ColorTheme, FontTheme, InputTheme } from "../components/ThemeFile";
import { errorMsg1 } from "./appMessages";
import MainInput from "./MainInput";
import SignUpNavigationButton from "./SignUpNavigationButton";
import { keys } from "../environmentVariables";

//Device Dimenstions
const { width, height } = Dimensions.get("screen");

//Form validation Messages
const fillFieldError = "This field cannot be empty";

const UserDetails = ({ cc, data, token, setData, setUserView, setIdUploadView, setOtpConfrimView, setRegConfrimView }) => {
  const [displayNumber, setDisplayNumber] = useState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();
  const [phone, setPhone] = useState();
  const [firstName, setFirstName] = useState();
  const [surname, setSurname] = useState();
  const [otp, setOtp] = useState();
  const [compareDate, setCompareDate] = useState();
  const [id, setId] = useState();
  const phoneRef = useRef(undefined);
  let fetcheddata;

  const handleOTPRequest = async () => {
    await fetch(`${keys.apiURL}api/user/confirm-otp`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        phone: phoneRef.current?.getNumberAfterPossiblyEliminatingZero().formattedNumber,
        otp,
      }),
    });
  };

  // console.log(phone);
  // console.log(phoneRef.current?.state);
  // console.log(phoneRef.current?.getNumberAfterPossiblyEliminatingZero().formattedNumber);
  // console.log(otp);

  const handleSubmit = () => {
    setLoading(true);

    if (!firstName || !surname || !phone || !id) {
      setError(errorMsg1);
      setLoading(false);
    } else {
      // validation
      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      var raw = JSON.stringify({
        idNumber: id,
      });

      var requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      };

      fetch("https://kycbackendapp.herokuapp.com/api/user/check/", requestOptions)
        .then((response) => response.text())
        .then((result) => {
          // console.log(result);
          let message = JSON.parse(result);
          if (message.message === "true") {
            Alert.alert("PLEASE NOTE!", "This account already exist, Please login");
            setLoading(false);
            return;
          } else {
            //! other code
            // verify submission details
            var myHeaders = new Headers();
            myHeaders.append("Authorization", `Bearer ${token}`);

            var requestOptions = {
              method: "GET",
              headers: myHeaders,
              redirect: "follow",
            };

            fetch(`https://verify.kycafrica.com/api/verifyid/${id}`, requestOptions)
              .then((response) => response.text())
              .then((result) => {
                let feedback = JSON.parse(result);

                if (typeof feedback === "string") {
                  alert("Sorry something when wrong, please contact Kyc Africa");
                  setLoading(false);
                } else if (typeof feedback === "object") {
                  if (feedback.firstName === firstName.toUpperCase() && feedback.surname === surname.toUpperCase()) {
                    //  confirmation complete moving to next page

                    setTimeout(() => {
                      setData({
                        firstName,
                        surname,
                        phone: phoneRef.current?.getNumberAfterPossiblyEliminatingZero().formattedNumber,
                        id,
                        otp,
                      });
                      handleOTPRequest();
                      setUserView(false);
                      setIdUploadView(false);
                      setOtpConfrimView(true);
                      setRegConfrimView(false);
                      setLoading(false);
                    }, 50);
                  } else if (feedback.message) {
                    Alert.alert("PLEASE NOTE!", "Please try again in a few minutes, something went wrong");
                    setLoading(false);
                  } else {
                    Alert.alert("PLEASE NOTE!", "You have to provide your Full Name(s) and ID Number EXACTLY as provided on your National ID.");
                    setLoading(false);
                  }
                }
              })
              .catch((error) => {
                console.log("error", error);
                setLoading(false);
              });

            //! other code
          }
        })
        .catch((error) => {
          console.log("error", error);
          setLoading(false);
        });
      // validation
    }
  };

  useEffect(() => {
    if (otp !== null || otp !== undefined) {
      setOtp(Math.floor(1000 + Math.random() * 9000));
    }

    return () => {
      setOtp();
    };
  }, []);

  return (
    <View style={{ flex: 1 }}>
      {/* <ScrollView > */}
      <KeyboardAwareScrollView viewIsInsideTabBar={false} extraHeight={40} enableOnAndroid={true} keyboardShouldPersistTaps={"always"} keyboardOpeningTime={0} enableAutomaticScroll={true}>
        <View style={{ width: width, height: "65%", alignItems: "center" }}>
          <MainInput
            title={"First Name(s) (as on your ID)"}
            placeholder={"e.g. Phillip Joe"}
            required
            // onBlur={Keyboard.dismiss}
            onChange={(value) => {
              setFirstName(value.trim());
            }}
            info={firstName ? null : error}
            textStyles={FontTheme.errortxt}
          />
          <MainInput
            title={"Surname (as on your ID)"}
            placeholder={"e.g. Jones"}
            required
            // onBlur={Keyboard.dismiss}
            onChange={(value) => {
              setSurname(value.trim());
            }}
            info={surname ? null : error}
            textStyles={FontTheme.errortxt}
          />

          {/*  */}
          {/* {cc ? (
            <View style={{ marginBottom: 0 }}>
              <Text style={FontTheme.inputTitle}>Phone Number</Text>
              <PhoneInput
                style={InputTheme.signUpInput}
                ref={phoneRef}
                onSelectCountry={(e) => {
                  console.log(e);
                }}
                onChangePhoneNumber={(value) => {
                  setPhone(value);
                }}
                initialCountry={cc.toLowerCase()}
              />
              <Text style={FontTheme.errortxt}>{phone ? null : error}</Text>
            </View>
          ) : null} */}

          {/* ?======== */}
          <View style={{ marginBottom: 0 }}>
            <Text style={FontTheme.inputTitle}>Phone Number</Text>
            <PhoneInput
              containerStyle={[InputTheme.signUpInput, { paddingLeft: 0 }]}
              textContainerStyle={[InputTheme.signUpInput, { paddingLeft: 0 }]}
              codeTextStyle={{
                fontFamily: "Poppins-Regular",
                fontSize: 18,
                color: "black",
                height: 50,
                textAlignVertical: "center",
              }}
              textInputStyle={{
                fontFamily: "Poppins-Regular",
                fontSize: 18,
                color: "black",
                height: 55,
                textAlignVertical: "center",
              }}
              placeholder={"e.g. 772852852 "}
              disableArrowIcon={true}
              ref={phoneRef}
              value={phone}
              defaultValue={phone}
              defaultCode={"ZW"}
              layout="first"
              onChangeFormattedText={(val) => {
                setDisplayNumber(val);
                let noZero = phoneRef.current?.getNumberAfterPossiblyEliminatingZero();
                setPhone(noZero.formattedNumber);
              }}
            />
            <Text style={FontTheme.errortxt}>{phone ? null : error}</Text>
          </View>

          {/* ?======== */}

          {/*  */}
          <MainInput
            title={"ID Number"}
            placeholder={"e.g. 63111111X07"}
            required
            // onBlur={Keyboard.dismiss}
            onChange={(value) => {
              setId(value.trim());
            }}
            info={id ? null : error}
            textStyles={FontTheme.errortxt}
          />
          <View style={{ paddingVertical: 80 }}></View>
        </View>
      </KeyboardAwareScrollView>
      {/* </ScrollView> */}
      <View
        style={{
          width: width,
          height: "15%",
          alignItems: "center",
          position: "absolute",
          bottom: 0,
        }}
      >
        <SignUpNavigationButton title={"Continue"} loading={loading} onPress={handleSubmit} />
      </View>
    </View>
  );
};

export default UserDetails;
