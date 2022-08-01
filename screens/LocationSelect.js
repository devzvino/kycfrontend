import React, {
    useCallback,
    useEffect,
    useMemo,
    useRef,
    useState,
  } from "react";
  import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
  import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
  import { Dimensions } from "react-native";
  import { Marker } from "react-native-maps";
  import { SafeAreaView } from "react-native-safe-area-context";
  import GlobalHeader from "../components/GlobalHeader";
  import { useNavigation, useRoute } from "@react-navigation/native";
  import BottomSheet from "@gorhom/bottom-sheet";
  import FormInputWithLabel from "../components/FormInputWithLabel";
  import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
  import { ColorTheme } from "../components/ThemeFile";
  import { LocationMarkerIcon } from "react-native-heroicons/outline";
  import * as Location from "expo-location";
  import { mapLocationLoading } from "../components/appMessages";
  // import { GOOGLE_API_KEY } from "../environmentVariables";
  import axios from "axios";
//back icon
import BackArrow from '../assets/icons/back_button.png'


const title='Select Location'

//import components
import MainButton from '../components/MainButton';
import { back } from "react-native/Libraries/Animated/Easing";

//Device Dimenstions
const { width, height } = Dimensions.get("screen");

const AddLocation = () => {
  // getting passed title from add address screen
  const route = useRoute();
  const navigation = useNavigation();
  const title = route.params.title;

  // inputs
  const [loading, setloading] = useState(false);
  const [confrimSnapPoint, setConfrimSnapPoint] = useState();
  const [address, setAddress] = useState();
  const [surburb, setSurburb] = useState();
  const [coroodinates, setCoroodinates] = useState(null);
  const [currentLocation, setCurrentLocation] = useState(null);
  const [errMsg, setErrMsg] = useState(null);
  const [city, setCity] = useState();

  // distance section
  const [feedback, setFeedback] = useState();

  // getting current user location
  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrMsg("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setCurrentLocation(location);
      // console.log(currentLocation);
    })();
  }, []);

  // handleAddAddress
  const handleAddAddress = () => {
    setloading(true);
    setTimeout(() => {
      setConfrimSnapPoint(true);
      setloading(false);
    }, 2000);
  };

  const handleConfirm = async () => {
    setloading(true);
    if (feedback.rows[0].elements[0].distance.value < 30) {
      if (title === "home") {
        axios
          .post("http://10.70.14.108:4000/api/location/", {
            userInfo: "62cfecbaa948e3505d483f40",
            homeAddress: address,
            homeSurburb: surburb,
            homeCity: city,
            homeLocation: JSON.stringify({
              lat: currentLocation.coords.latitude,
              lng: currentLocation.coords.longitude,
            }),
            workLocation: [""],
          })
          .then((res) => {
            if (res.status === 200) {
              navigation.navigate("Home");
            } else {
              alert("Sorry could not verify you, please try again later");
            }
          })
          .catch((error) => {
            console.log(error);
          });
      } else {
        axios
          .post("http://10.70.14.108:4000/api/location/", {
            userInfo: "62cfecbaa948e3505d483f40",
            workAddress: address,
            workSurburb: surburb,
            workCity: city,
            workLocation: JSON.stringify({
              lat: currentLocation.coords.latitude,
              lng: currentLocation.coords.longitude,
            }),
            homeLocation: [""],
          })
          .then((res) => {
            if (res.status === 200) {
              navigation.navigate("Home");
            } else {
              alert("Sorry could not verify you, please try again later");
            }
          })
          .catch((error) => {
            console.log(error);
          });
      }

      setloading(false);
    } else {
      alert(`you are not ${title}`);
      setloading(false);
    }
  };

  // handling the bottom sheet to appear
  // ref
  const bottomSheetRef = useRef(<BottomSheet />, null);

  // variables
  const snapPoints = useMemo(() => ["10%", "60%"], []);
  const singleSnap = useMemo(() => ["10%", "25%"], []);

  // callbacks
  const handleSheetChanges = useCallback((index) => {
    // console.log("handleSheetChanges", index);
  }, []);

  const updateRegionCenter = async () => {
    const url = `https://maps.googleapis.com/maps/api/distancematrix/json?units=metric&origins=${currentLocation.coords.latitude},${currentLocation.coords.longitude}&destinations=${coroodinates?.latitude},${coroodinates?.longitude}&key=${GOOGLE_API_KEY}`;
    axios
      .get(url)
      .then((response) => {
        console.log(response.data);
        setFeedback(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };


const {height,width}=Dimensions.get('screen')
function LocationSelect() {
  return (
   <View style={{flex:1, backgroundColor:'red'}}>
    <View style={{backgroundColor:'white',position:'absolute' ,height:height, width:width, zIndex:1}}> 
        <Text>Hi</Text>
    </View>
    <View style={{backgroundColor:'blue',position:'absolute', height:height,width:width, zIndex:20 }}>
        <View style={{ flexDirection: "row", alignItems: "center",height:height*0.15,paddingHorizontal: 15, paddingTop:10, paddingBottom:0, backgroundColor:"#ffffff" }}>
        <StatusBar StatusBarStyle="dark-content" />
        
            <TouchableOpacity onPress={() => navigation.goBack()}>
            <Image source={BackArrow} />
            </TouchableOpacity>
            <View
            style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            }}
            >
                <Text
                style={{
                    marginLeft: -34,
                    color: "#14142A",
                    fontWeight: "bold",
                    fontSize: 18,
                }}
                >
                {title}
                </Text>
            </View>
        </View>
        
    </View>
</View>

   



export default LocationSelect