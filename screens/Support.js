import { View, Text, Dimensions, Linking } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import GlobalHeader from '../components/GlobalHeader';
import { ColorTheme, FontTheme } from '../components/ThemeFile';
import WhatsApp from '../components/WhatsApp';
import { ScrollView } from 'react-native-gesture-handler';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

const Support = () => {
    const { height, width } = Dimensions.get("window");
    return (
        <SafeAreaView style={{ backgroundColor: "white", flex: 1, height: height, display: 'flex', alignItems: 'flex-start' }}>
            <GlobalHeader title="Home" />
            <View style={{ paddingHorizontal: '5%', overflow: 'scroll' }}>
                <View style={{ padding: 15, backgroundColor: ColorTheme.grey2, marginBottom: 30, borderRadius: 10 }}>
                    <Text style={{ marginBottom: 15, color: ColorTheme.grey, fontSize: 16, lineHeight: 20 }}>KYC Africa verifies your ID Number & Addresses in the background. </Text>
                    <Text style={{ marginBottom: 15, color: ColorTheme.grey, fontSize: 16, lineHeight: 20 }}>Please make sure that you set location permissions to <Text style={{ fontWeight: 'bold', fontSize: 16, lineHeight: 20 }}>Always Allow</Text>. For better and accurate resuts keep your data on during the verification process</Text>
                    <Text style={{ marginBottom: 15, color: ColorTheme.grey, fontSize: 16, lineHeight: 20 }}>
                        If you are having any problems with the application, our team is available to assist you. {" "}

                    </Text>
                    <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', alignContent: 'center' }}>
                        <View style={{ display: 'flex', alignItems: '' }}>
                            <WhatsApp />
                        </View>


                        <Text onPress={() => Linking.openURL("https://wa.me/263773384668")} style={{ color: ColorTheme.main, marginLeft: 10, fontWeight: 'bold', display: 'flex', alignContent: 'center', fontSize: 15, }}>
                            Please contact support via WhatsApp for further assistance.
                        </Text>
                    </View>

                </View>

                <Text style={{ marginBottom: 15, color: ColorTheme.main, fontSize: 17, lineHeight: 20, fontWeight: 'bold' }}>Frequently Asked Questions (FAQs) </Text>
                <KeyboardAwareScrollView


                >
                    <View>
                        <View style={{ borderColor: ColorTheme.grey2, borderWidth: 2, padding: 10, borderRadius: 10, marginBottom: 10 }}>
                            <Text style={{ marginBottom: 5, color: ColorTheme.grey, fontSize: 15, lineHeight: 20, fontWeight: 'bold' }}>How Long does it take to Verify an Address? </Text>
                            <Text style={{ color: ColorTheme.grey, fontSize: 15, lineHeight: 20 }}>KYC Africa verifies your address over a period of three consecutive days. If the address location retains a positive result you will get a Verification Successful notification, but if the location fails our verification criteria it will return a Verification Failed result  </Text>
                        </View>
                        <View style={{ borderColor: ColorTheme.grey2, borderWidth: 2, padding: 10, borderRadius: 10, marginBottom: 10 }}>
                            <Text style={{ marginBottom: 5, color: ColorTheme.grey, fontSize: 15, lineHeight: 20, fontWeight: 'bold' }}>How do I share my verifcation Certificates? </Text>
                            <Text style={{ color: ColorTheme.grey, fontSize: 15, lineHeight: 20 }}>KYC Africa verifies your address over a period of three consecutive days. If the address location retains a positive result you will get a Verification Successful notification, but if the location fails our verification criteria it will return a Verification Failed result  </Text>
                        </View>
                        <View style={{ borderColor: ColorTheme.grey2, borderWidth: 2, padding: 10, borderRadius: 10, marginBottom: 10 }}>
                            <Text style={{ marginBottom: 5, color: ColorTheme.grey, fontSize: 15, lineHeight: 20, fontWeight: 'bold' }}>How much data does it take to verify? </Text>
                            <Text style={{ color: ColorTheme.grey, fontSize: 15, lineHeight: 20 }}>KYC Africa verifies your address over a period of three consecutive days. If the address location retains a positive result you will get a Verification Successful notification, but if the location fails our verification criteria it will return a Verification Failed result  </Text>
                        </View>
                        <View style={{ borderColor: ColorTheme.grey2, borderWidth: 2, padding: 10, borderRadius: 10, marginBottom: 10 }}>
                            <Text style={{ marginBottom: 5, color: ColorTheme.grey, fontSize: 15, lineHeight: 20, fontWeight: 'bold' }}>Who has access to my location data? </Text>
                            <Text style={{ color: ColorTheme.grey, fontSize: 15, lineHeight: 20 }}>KYC Africa verifies your address over a period of three consecutive days. If the address location retains a positive result you will get a Verification Successful notification, but if the location fails our verification criteria it will return a Verification Failed result  </Text>
                        </View>
                        <View style={{ height: height * 0.18 }}>

                        </View>
                    </View>


                </KeyboardAwareScrollView>


            </View>
        </SafeAreaView>
    )
}

export default Support