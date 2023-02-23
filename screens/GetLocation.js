import { View, Text, Dimensions, Touchable, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'
import { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import GlobalHeader from '../components/GlobalHeader'
import { ColorTheme } from '../components/ThemeFile'
import * as Location from 'expo-location';
import { useNavigation, useRoute } from "@react-navigation/native";
import MainButton from '../components/MainButton';
import FormInputWithLabel from '../components/FormInputWithLabel';
import DateTimePicker from "@react-native-community/datetimepicker";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { keys } from '../environmentVariables'
import { useContext } from 'react'
import { UserContext } from '../context/UserContext'
import { useEffect } from 'react'
import { HasLocationContext } from '../context/HasLocationContext'
import axios from 'axios'

let locationCords = null

const { height, width } = Dimensions.get("window");


export const GetLocationCords = () => {
    const { hasLocation, sethasLocation } = useContext(HasLocationContext)
    const route = useRoute();
    const { title } = route.params;

    const navigation = useNavigation();



    const [location, setLocation] = useState(null);
    // const [hasLocation, sethasLocation] = useState(false)
    locationCords = location




    const handleGetLocation = async () => {
        let location = await Location.getCurrentPositionAsync({});
        setLocation(location);
        // sethasLocation(true)
        // userHasLocation = true
        if (location) {
            setInterval(() => {
                sethasLocation(true)
            }, 2000)
        }


    }

    return (
        <View style={{ backgroundColor: "white", display: 'flex', alignItems: 'center' }} >
            <GlobalHeader
            />

            {location ? <Text style={{ backgroundColor: 'rgba(47, 191, 0, 0.2)', paddingHorizontal: 20, paddingVertical: 5, borderRadius: 5, fontFamily: 'Poppins-SemiBold', color: ColorTheme.main }}>We have saved your location</Text> : null}
            <Text style={{ marginBottom: 15, marginTop: 30, color: ColorTheme.grey, textAlign: 'center', width: width * 0.90, fontSize: 16, lineHeight: 23, fontFamily: 'Poppins-Regular' }}>
                Please note that you have to be at your {title} location to add an address.  {" "}
            </Text>
            <Text style={{ marginBottom: 30, color: ColorTheme.grey, textAlign: 'center', width: width * 0.90, fontSize: 16, lineHeight: 23, fontFamily: 'Poppins-SemiBold' }}>
                Are you currently at your {title} location?
            </Text>
            <View style={{ display: 'flex', justifyContent: 'space-between', flexDirection: 'row', width: '80%' }}>
                <TouchableOpacity
                    style={{
                        display: "flex",
                        backgroundColor: ColorTheme.main,
                        flexDirection: "row",
                        width: "45%",
                        borderRadius: 5,
                        alignItems: "center",
                        paddingVertical: "3%",
                        marginTop: "1%",
                        alignContent: "center",
                        justifyContent: "center",

                    }}
                    onPress={handleGetLocation}
                >
                    <Text style={{ fontSize: 18, color: "#FFF", textAlign: 'center', textTransform: "capitalize", fontFamily: "Poppins-SemiBold" }}>
                        Yes
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={{
                        display: "flex",
                        backgroundColor: ColorTheme.grey4,
                        flexDirection: "row",
                        width: "45%",
                        borderRadius: 5,
                        alignItems: "center",
                        paddingVertical: "3%",
                        marginTop: "1%",
                        alignContent: "center",
                        justifyContent: "center",

                    }}
                    onPress={() => {
                        navigation.goBack();
                    }}
                >
                    <Text style={{ fontSize: 18, color: "#FFF", textAlign: 'center', textTransform: "capitalize", fontFamily: "Poppins-SemiBold" }}>
                        No
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export const GetLocationDetails = () => {
    const navigation = useNavigation();

    const { hasLocation, sethasLocation } = useContext(HasLocationContext)
    const route = useRoute();
    const { title } = route.params;
    const { user } = useContext(UserContext)
    const [loading, setloading] = useState(false);
    const [loading2, setLoading2] = useState(false);


    const [houseNo, setHouseNo] = useState();
    const [suburb, setSuburb] = useState();
    const [companyName, setCompanyName] = useState();
    const [building, setBuilding] = useState();
    const [streetName, setStreetName] = useState();
    const [city, setCity] = useState();
    const [workingHours, setWorkingHours] = useState();
    const [errMsg, setErrMsg] = useState(null);

    //date and time
    const [date, setDate] = useState(new Date());
    const [mode, setMode] = useState("date");
    const [showStart, setShowStart] = useState(false);
    const [showEnd, setShowEnd] = useState(false);
    const [endTime, setEndTime] = useState();
    const [startTime, setStartTime] = useState();


    // handling date
    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShowStart(Platform.OS === "ios");

        let tempDate = new Date(currentDate);

        var minutes = tempDate.getMinutes();
        minutes = minutes > 9 ? minutes : "0" + minutes;

        // if(thehours.)
        let fTime = tempDate.getHours() + ":" + minutes;

        if (event.type == "set") {
            setStartTime(fTime);
        } else {
            setStartTime(null);
        }
    };
    const onChangeEnd = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShowEnd(Platform.OS === "ios");

        let tempDate = new Date(currentDate);
        var minutes = tempDate.getMinutes();
        minutes = minutes > 9 ? minutes : "0" + minutes;
        let fTime = tempDate.getHours() + ":" + minutes;
        if (event.type == "set") {
            setEndTime(fTime);
        } else {
            setEndTime(null);
        }
    };

    const showModeStartTime = (currentMode) => {
        setShowStart(true);
        setMode(currentMode);
    };
    const showModeEndTime = (currentMode) => {
        setShowEnd(true);
        setMode(currentMode);
    };

    // handleAddAddress confirmation
    const handleConfirm = async () => {
        if (title === "home") {
            if (!streetName || !houseNo || !suburb || !city) {
                alert("Please fill in the form");
                return;
            }
        }
        if (title === "work") {
            if (!companyName || !streetName || !suburb || !city || !building || !startTime || !endTime) {
                alert("Please fill in the form");
                return;
            }
        }

        setLoading2(true);

        // // validation is all distance are available
        // if (!feedback.rows[0].elements[0].status === "OK") {
        //     alert("Please drag the pin to your location");
        //     setLoading2(false);
        // }

        // if (feedback.rows[0].elements[0].distance.value < 80) {
        if (title === "home") {
            axios
                .post(`${keys.apiURL}api/home/create`, {
                    title: title,
                    user_id: user._id,
                    userInfo: user._id,
                    houseNo: houseNo,
                    streetName: streetName,
                    suburb: suburb,
                    city: city,
                    homeLatLng: JSON.stringify({
                        lat: locationCords.coords.latitude,
                        lng: locationCords.coords.longitude,
                    }),
                })
                .then((res) => {
                    if (res.status === 200) {
                        locationCords = null
                        sethasLocation(true)
                        navigation.navigate("Addreses");

                    } else {
                        alert("Sorry could not verify you, please try again later");
                    }
                })
                .catch((error) => {
                    console.log(error);
                });
            setloading(false);
        }

        else {
            axios
                .post(`${keys.apiURL}api/work/create`, {
                    title: title,
                    user_id: user._id,
                    userInfo: user._id,
                    companyName: companyName,
                    streetName: streetName,
                    suburb: suburb,
                    city: city,
                    building: building,
                    workingHours: JSON.stringify({
                        startTime: startTime,
                        endTime: endTime,
                    }),
                    workLatLng: JSON.stringify({
                        lat: locationCords.coords.latitude,
                        lng: locationCords.coords.longitude,
                    }),
                })
                .then((res) => {
                    if (res.status === 200) {

                        sethasLocation(true)
                        navigation.navigate("Addreses");



                    } else {
                        alert("Sorry could not verify you, please try again later");
                    }
                })
                .catch((error) => {
                    console.log(error);
                });
            setloading(false);
        }

        setloading(false);
        // } else {
        //     alert(`you are not ${title}`);
        //     setloading(false);
        // }
    };





    return (
        <View style={{ backgroundColor: "white", display: 'flex', alignItems: 'center', height: height }} >
            <GlobalHeader
            // backable
            />
            <KeyboardAwareScrollView
                enableOnAndroid
                enableAutomaticScroll
                extraHeight={100}

                contentContainerStyle={{ paddingHorizontal: '5%', width, display: 'flex', alignItems: 'center' }}>
                <>
                    {title === "work" && (
                        <>
                            <FormInputWithLabel
                                label="Company Name"
                                keyboardType="default"
                                value={companyName}
                                onTextChange={setCompanyName}
                            // placeholder={"KYC Africa (Pvt) Ltd "}
                            />
                            <FormInputWithLabel
                                label="Building"
                                keyboardType="default"
                                value={building}
                                onTextChange={setBuilding}
                            // placeholder={"Joina City"}
                            />
                            <FormInputWithLabel
                                label="Street Address"
                                keyboardType="default"
                                value={streetName}
                                onTextChange={setStreetName}
                            // placeholder={"54 Jason Moyo Ave"}
                            />
                            <FormInputWithLabel
                                label="Area / Suburb"
                                keyboardType="default"
                                value={suburb}
                                onTextChange={setSuburb}
                            // placeholder={"CBD"}
                            />
                            <FormInputWithLabel
                                label="City"
                                keyboardType="default"
                                value={city}
                                onTextChange={setCity}
                            // placeholder={"Harare"}
                            />
                            <Text style={[{ textAlign: "left", width: "100%" }, styles.title]}>
                                Time you start and end work in 24Hrs?
                            </Text>
                            <View
                                style={{
                                    display: "flex",
                                    flexDirection: "row",
                                    width: "100%",
                                    borderRadius: 5,
                                    justifyContent: "space-between",
                                    backgroundColor: "#EFF0F6",
                                }}
                            >
                                <TouchableOpacity onPress={() => showModeStartTime("time")} style={[styles.inputContainer]}>
                                    <Text style={{ color: ColorTheme.main, fontWeight: "bold" }}>
                                        {startTime ? startTime : "Start Time"}
                                    </Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => showModeEndTime("time")} style={[styles.inputContainer]}>
                                    <Text style={{ color: ColorTheme.main, fontWeight: "bold" }}>
                                        {endTime ? endTime : "End Time"}
                                    </Text>
                                </TouchableOpacity>
                            </View>
                            {showStart && (
                                <DateTimePicker
                                    testID="dateTimePicker"
                                    value={date}
                                    format={"hh:mm a"}
                                    mode={mode}
                                    is24Hour={true}
                                    display={Platform.OS === "ios" ? "default" : "default"}
                                    style={{ width: "100%" }}
                                    onChange={onChange}
                                />
                            )}
                            {showEnd && (
                                <DateTimePicker
                                    testID="dateTimePicker"
                                    value={date}
                                    mode={mode}
                                    is24Hour={true}
                                    display={Platform.OS === "ios" ? "default" : "default"}
                                    style={{ width: "100%" }}
                                    onChange={onChangeEnd}
                                />
                            )}
                        </>
                    )}

                    {title === "home" && (
                        <>
                            <FormInputWithLabel
                                label="House Number"
                                keyboardType="default"
                                value={houseNo}
                                onTextChange={setHouseNo}
                            // placeholder={"7878"}
                            />

                            <FormInputWithLabel
                                label="Street Name"
                                keyboardType="default"
                                value={streetName}
                                onTextChange={setStreetName}
                            // placeholder={"Mangwende Drive"}
                            />

                            <FormInputWithLabel
                                label="Suburb / Area"
                                keyboardType="default"
                                value={suburb}
                                onTextChange={setSuburb}
                            // placeholder={"Kuwadzana"}
                            />
                            <FormInputWithLabel
                                label="City"
                                keyboardType="default"
                                value={city}
                                onTextChange={setCity}
                            // placeholder={"Harare"}
                            />
                        </>
                    )}

                    <MainButton onPress={handleConfirm} title={loading ? "Please wait..." : "Confirm"}></MainButton>
                </>
            </KeyboardAwareScrollView>
        </View>
    )
}


const GetLocation = () => {
    const { hasLocation, sethasLocation } = useContext(HasLocationContext)
    return (
        <SafeAreaView>
            {hasLocation ? <GetLocationDetails /> : <GetLocationCords />}
        </SafeAreaView>

    )

}

export default GetLocation

const styles = StyleSheet.create({
    container: { flex: 1 },
    imageMarker: {
        position: "absolute",
        width: 35,
        resizeMode: "contain",
    },
    ccontainer: {
        flex: 1,
        padding: 10,
        paddingTop: 10,
        backgroundColor: "#ecf0f1",
    },
    inputContainer: {
        flex: 1,
        padding: 15,
        justifyContent: "center",
        alignItems: "center",
    },
    title: {
        fontWeight: "bold",
        fontSize: 16,
        marginHorizontal: 10,
        marginBottom: 8,
        textTransform: "capitalize",
    },
});