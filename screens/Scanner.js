import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Button, Dimensions, TouchableOpacity, Alert } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';

import { ColorTheme } from '../components/ThemeFile';
const { height, width } = Dimensions.get("window");

const Scanner = () => {
    const navigation = useNavigation();
    const [hasPermission, setHasPermission] = useState(null);
    const [scanned, setScanned] = useState(false);


    const getBarCodeScannerPermissions = async () => {
        const { status } = await BarCodeScanner.requestPermissionsAsync();
        setHasPermission(status === 'granted');
    };

    useEffect(() => {
        getBarCodeScannerPermissions();
    }, []);

    const handleBarCodeScanned = ({ data }) => {
        setScanned(true);
        Alert.alert('Scan Result', `VERIFIED KYC USER ID: \n${data}`, [
            {
                text: 'Cancel',
                onPress: () => console.log('Cancel Pressed'),
                style: 'cancel',
            },
            { text: 'Print', onPress: () => console.log('OK Pressed') },
        ]);

    };
    if (hasPermission === null) {
        getBarCodeScannerPermissions();
    }
    if (hasPermission === false) {
        getBarCodeScannerPermissions();
    }
    //generrate pdf after scan

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
                // logging print info into the context
                setPdfData([d1, d2]);
            })
            .catch((e) => console.error(e));
    };

    const generateKycPdf = async () => {
        setLoading(true);
        let html = `
    <html style="margin:0 !important">
    <head>
    <style>
    p,h4,h1,h2,h3,h5,h6 {margin:0;}
  </style>
     </head>
      <body style="margin:0">
       <div>
           <p style="color:green;">Personal details</p>
           <div style="display:flex; justify-content: space-between; width:100%; ">
             <div style="flex: 1;">
               <div style="display:flex; gap:10px;">
                 <div style="margin:0">
                   <p>Name(S):</p>
                   <h4>${user.firstname}</h4>
                 </div>
                 <div style="margin:0">
                   <p>Surname:</p>
                   <h4>${user.surname}</h4>
                 </div>
               </div>
               <div style="display:flex; gap:10px;">
                 <div style="margin:0">
                   <p>National ID No:</p>
                   <h4>${user.idNumber}</h4>
                 </div>
                 <div style="margin:0">
                   <p>Phone Number:</p>
                   <h4>${user.phone}</h4>
                 </div>
               </div>
               <p>Registered on: ${moment(user.createdAt).format("lll")}</p>
               <p style="font-size: 0.875rem;">
                 This is the date when ${user.firstname} ${user.surname}
                 registered on the KYC Africa National Identity & Address Verification Platform / System.
               </p>
             </div>
             <div style="flex: 1;">
             <p>Qr code here</p>
             </div>
           </div>
       </div>

       <div style="border-top: 1px dotted green; padding-top:10px; margin-top:10px">
         <p style="color:green;">${user.firstname}'s Home Locations</p>
         <div>
         ${PdfData[0].length > 0
                ? PdfData[0]
                    .map(
                        (
                            home
                        ) => `<div style="background-color: #f6f6f6;  border-radius: 5px; padding:10px;  box-shadow:inset 5px 0px 0px 0px green; margin-bottom:10px;>
           <p style="font-size: 0.875rem;">Address : ${home.streetName}</p>
           <p style="font-size: 0.875rem;">Surburb : ${home.suburb}</p>
           <p style="font-size: 0.875rem;">City : ${home.city}</p>
           <p style="font-size: 0.875rem;">Added On : ${moment(home.createdAt).format("lll")}</p>
           <p style="font-size: 0.875rem;">Verification State : ${home.homeVerified}</p>
           <p style="font-size: 0.875rem;">Positive Verification Checks : ${home.homeTotalCount}</p>
           <p style="font-size: 0.875rem;">Total Verification Checks: : ${home.homeVerificationCount}</p>
         </div>`
                    )
                    .join("")
                : `<p>${user.firstname} ${user.surname} has not set any home locations.</p>`
            }
         </div>
       </div>

       <div style="border-top: 1px dotted green; padding-top:10px; margin-top:10px">
         <p style="color:green;">${user.firstname}'s Work Locations</p>
         <div>
         ${PdfData[1].length > 0
                ? PdfData[1]?.work
                    .map(
                        (
                            work
                        ) => `<div style="background-color: #f6f6f6;  border-radius: 5px; padding:10px;  box-shadow:inset 5px 0px 0px 0px green; margin-bottom:10px;>
           <p>Address : ${work.streetName}</p>
           <p>Surburb : ${work.suburb}</p>
           <p>City : ${work.city}</p>
           <p>Added On : ${moment(work.createdAt).format("lll")}</p>
           <p>Verification State : ${work.workVerified}</p>
           <p>Positive Verification Checks : ${work.workTotalCount}</p>
           <p>Total Verification Checks: : ${work.workVerificationCount}</p>
         </div>`
                    )
                    .join("")
                : `<p>${user.firstname} ${user.surname} has not set any work locations.</p>`
            }
         </div>
       </div>
       </div>
     </body>
    </html>
  `;

        const file = await Print.printToFileAsync({
            html: html,
            base64: false,
        });

        await Sharing.shareAsync(file.uri);
        setLoading(false);
    };


    return (
        <SafeAreaView style={{ width: width, height: height, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <View
                style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: height * 0.8,
                    width: width,
                    overflow: 'hidden',
                    // borderRadius: 5,
                    // backgroundColor: 'tomato'
                }}

            >
                <BarCodeScanner
                    onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
                    barCodeTypes={[BarCodeScanner.Constants.BarCodeType.qr]}

                    style={{ height: 1000, width: 900, }}

                />

            </View>
            <View style={{ display: 'flex', justifyContent: 'space-around', flexDirection: 'row', width: '80%', marginTop: '5%', alignItems: 'center' }}>
                {scanned ? <TouchableOpacity
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
                    onPress={() => setScanned(false)}
                >
                    <Text style={{ fontSize: 18, color: "#FFF", textAlign: 'center', textTransform: "capitalize", fontFamily: "Poppins-SemiBold" }}>
                        Scan Again
                    </Text>
                </TouchableOpacity> : <></>}
                <TouchableOpacity
                    style={{
                        display: "flex",
                        backgroundColor: '#9f9f9f',
                        flexDirection: "row",
                        width: "45%",
                        borderRadius: 5,
                        alignItems: "center",
                        paddingVertical: "3%",
                        marginTop: "1%",
                        alignSelf: 'center',
                        alignContent: "center",
                        justifyContent: "center",

                    }}
                    onPress={() => {
                        navigation.goBack();
                    }}
                >
                    <Text style={{ fontSize: 18, color: "#FFF", textAlign: 'center', textTransform: "capitalize", fontFamily: "Poppins-SemiBold" }}>
                        Cancel
                    </Text>
                </TouchableOpacity>
            </View>
            {/* 
            {scanned && <Button title={'Tap to Scan Again'} onPress={} />}
            {scanned && <Button title={'Cancel'} onPress={() => { navigation.goBack() }} />} */}
        </SafeAreaView>
    )
}

export default Scanner