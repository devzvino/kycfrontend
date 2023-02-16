import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { BriefcaseIcon, HomeIcon, IdentificationIcon, BookOpenIcon, PlusIcon } from "react-native-heroicons/solid";
import { SafeAreaView } from "react-native-safe-area-context";
import GlobalHeader from "../components/GlobalHeader";
import { ButtonTheme, ColorTheme } from "../components/ThemeFile";
import { useFetchAddresses } from "../hooks/useFetchAddresses";



const AddAddress = () => {

  const { height, width } = Dimensions.get("window");


  // navigation process
  const navigation = useNavigation();

  const [user, setUser] = useState();

  const checkingIfUserIsStored = async () => {
    try {
      const storedUser = await AsyncStorage.getItem("@user");
      if (storedUser !== null) {
        setUser(JSON.parse(storedUser));
      }
    } catch (error) { }
  };
  // console.log(user);

  useEffect(() => {
    checkingIfUserIsStored();
  }, []);

  useFetchAddresses();

  return (
    <SafeAreaView style={{ backgroundColor: "white", flex: 1, height: height, display: 'flex', alignItems: 'center' }}>
      <GlobalHeader title="Home" />
      <View style={{ padding: 15, width: width * 0.95 }}>
        <Text style={{ marginBottom: 20, fontWeight: 'bold', fontSize: 18, color: '#4E4E4E' }}>+ New Address</Text>
        <View style={{ backgroundColor: "white", display: 'flex', flexDirection: 'row', justifyContent: 'flex-start' }}>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("AddNewLocation", {
                title: "home",
                myId: user._id,
              })
            }
            style={{ borderColor: ColorTheme.grey2, borderWidth: 2, width: '40%', padding: 30, borderRadius: 10, alignItems: 'center', marginRight: 20, justifyContent: 'center' }}
          >
            <HomeIcon size={30} color={ColorTheme.main} />
            <Text style={styles.btnTitle}>Home</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("AddNewLocation", {
                title: "work",
                myId: user._id,
              })
            }
            style={{ borderColor: ColorTheme.grey2, borderWidth: 2, width: '40%', padding: 30, borderRadius: 10, alignItems: 'center', justifyContent: 'center' }}
          >
            <BriefcaseIcon size={30} color={ColorTheme.main} />
            <Text style={styles.btnTitle}>Work</Text>
          </TouchableOpacity>
        </View>
        {/* <View style={{ backgroundColor: ColorTheme.grey3, width: width * 0.85, height: 1, marginTop: 20 }}></View> */}
      </View>
      <View style={{ padding: 15, width: width * 0.95 }}>
        <Text style={{ marginBottom: 20, fontWeight: 'bold', fontSize: 18, color: '#4E4E4E' }}>+ Identification Document</Text>
        <View style={{ backgroundColor: "white", display: 'flex', flexDirection: 'row', justifyContent: 'flex-start' }}>
          <TouchableOpacity
            // onPress={() =>
            //   navigation.navigate("AddNewLocation", {
            //     title: "home",
            //     myId: user._id,
            //   })
            // }
            style={{ borderColor: ColorTheme.grey2, borderWidth: 2, width: '40%', padding: 20, borderRadius: 10, alignItems: 'center', marginRight: 20, justifyContent: 'center' }}
          >
            <BookOpenIcon size={30} color={ColorTheme.main} />
            <Text style={{ color: ColorTheme.main, fontSize: 12, fontWeight: 'bold' }}>Passport</Text>
          </TouchableOpacity>
          <TouchableOpacity
            // onPress={() =>
            //   navigation.navigate("AddNewLocation", {
            //     title: "work",
            //     myId: user._id,
            //   })
            // }
            style={{ borderColor: ColorTheme.grey2, borderWidth: 2, width: '40%', padding: 10, borderRadius: 10, alignItems: 'center', justifyContent: 'center' }}
          >
            <IdentificationIcon size={30} color={ColorTheme.main} />
            <Text style={{ color: ColorTheme.main, fontSize: 12, fontWeight: 'bold' }}>Driver's Licence</Text>
          </TouchableOpacity>
        </View>
        {/* <View style={{ backgroundColor: ColorTheme.grey3, width: width * 0.85, height: 1, marginTop: 20 }}></View> */}
      </View>
      <View style={{ padding: 15, width: width * 0.95 }}>
        <Text style={{ marginBottom: 20, fontWeight: 'bold', fontSize: 18, color: '#4E4E4E', }}>+ Educational Certificates</Text>
        <View style={{ backgroundColor: "white", display: 'flex', flexDirection: 'row', justifyContent: 'flex-start' }}>
          <TouchableOpacity
            // onPress={() =>
            //   navigation.navigate("AddNewLocation", {
            //     title: "home",
            //     myId: user._id,
            //   })
            // }
            style={{ borderColor: ColorTheme.grey2, borderWidth: 2, width: '40%', padding: 20, borderRadius: 10, alignItems: 'center', marginRight: 20, justifyContent: 'center' }}
          >
            <PlusIcon size={30} color={ColorTheme.main} />
            <Text style={{ color: ColorTheme.main, fontSize: 12, fontWeight: 'bold' }}>Add</Text>
          </TouchableOpacity>

        </View>
        {/* <View style={{ backgroundColor: ColorTheme.grey3, width: width * 0.85, height: 1, marginTop: 20 }}></View> */}

      </View>

    </SafeAreaView >
  );
};

export default AddAddress;

const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
  btnTitle: {
    color: ColorTheme.main,
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: 5,
  },
  btnExt: {
    width: "100%",
    alignItems: "flex-start",
    paddingHorizontal: 15,
    flexDirection: "row",
  },
});
