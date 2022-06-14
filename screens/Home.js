import React from 'react'
import { View,Text,Image,Linking} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ImageBackground } from 'react-native';
import mainLogo from '../assets/images/kyc-logo.png';
import welcomeBg from '../assets/images/splash-bg.jpg'; 

//import components
import MainButton from '../components/MainButton';

//import styles
import { FontTheme,ButtonTheme,SectionTheme,LogoTheme,InputTheme } from '../components/ThemeFile';

//Usable variables
const footerMessage = 'By continuing you agree to our';
const footerLink = 'terms and privacy policy'
const appMotto = 'Smart Know Your Customer Solutions in one Place'
const appDescription = 'This app enables you to verify your Address & National Identity in just a few taps.'

//Handling buttonPress

const handlePress=()=>{
    return console.log('Button Pressed')
};


const Home= () =>{
  return (
    <View>
        <ImageBackground style={SectionTheme.welcomeSection1}  source={welcomeBg}>
            <View style={SectionTheme.welcomeSection1_inner}>
            <Image source={mainLogo} style={LogoTheme.mainLogo}/>
            <Text style={FontTheme.motto}>{appMotto}</Text>
            <Text style={FontTheme.description} >{appDescription}</Text>
            </View>
           

        </ImageBackground>
        <View style= {SectionTheme.welcomeSection2}>
            <View style={SectionTheme.welcomeSection3}>
                <MainButton title={'Get Started'} onPress={handlePress}/>
                <Text style={FontTheme.footerText}>
                    {footerMessage} {<Text 
                    onPress={() => Linking.openURL('http://google.com')} 
                    style={FontTheme.footerLink}>
                        {footerLink}
                    </Text>}
                </Text>
            </View>  
        </View>
       
    </View>
    
  )
}

export default Home;