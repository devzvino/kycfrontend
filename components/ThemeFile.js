import { Dimensions } from "react-native";

//Device Dimenstions
const {width, height} = Dimensions.get('screen');


//colors
export const ColorTheme = {
    primary: '#FFFFFF',
    main: '#2FBF00',
    orange: '#FF8115',
    green: '#00BB56',
    red: '#FF0000',
    blue: '#3190FF', 
    grey: '#7D7D7D',
    lightBlue:'#EEF9FF'
};

const { primary,main, orange, green, red, blue, grey, grey2, lightBlue } = ColorTheme;

// componets styles
export const FontTheme = {
    motto:{
        fontFamily: 'Poppins-Medium',
        color: main,
        fontSize: 32,
        lineHeight: 32,
        paddingTop:10,
        paddingBottom:10,
    },

    description:{
        width:'90%',
        fontFamily: 'Poppins-Medium',
        color: grey,
        fontStyle: 'normal',
        fontSize: 18,

    },

    mainButtonFont:{
        fontFamily: 'Poppins-SemiBold',
        color: primary,
        fontSize: 24,
        textTransform: 'uppercase'
    },

    footerText: {

        fontFamily: 'Poppins-Regular',
        width:'70%',
        color: grey,
        fontStyle: 'normal',
        fontSize: 14,
        fontWeight: '400',
        textAlign: 'center',
        paddingTop:10,
    },
    footerLink: {
        width:'70%',
        color: main,
        fontStyle: 'normal',
        fontSize: 14,
        fontWeight: '400',
        textAlign: 'center',
        paddingTop:10,
        textDecorationLine: 'underline',
    },
   
   


}
export const ButtonTheme = {
    mainButton: {
        margin: 'auto',
        width: '80%',
        alignItems: 'center',
        borderRadius: 10,
        backgroundColor: main,
        paddingVertical: 15,
        elevation: 3,
        marginTop: 40,
        color: primary,
        textTransform: 'uppercase',
        elevation: 0,
        justifyContent: 'center'
    },

}

export const InputTheme = {


}

export const LogoTheme = {
    mainLogo: {
    marginBottom:50,        
    }


}

export const SectionTheme = {
    welcomeSection1:{
        width:width, 
        height:height/1.5,  
        borderBottomRightRadius: 75,
        overflow: 'hidden',
        elevation: 0,
        borderWidth: 0,
        resizeMode: 'contain',
        alignItems: 'center'
    },

    welcomeSection1_inner:{
        width:'80%',
        paddingTop:200,

    },
    welcomeSection2:{
        width:width, 
        height:height/0.5,  
        backgroundColor:lightBlue,

    },

    welcomeSection3:{
        width:width, 
        height:'100%', 
        alignItems:'center',
        backgroundColor: primary,
        borderTopLeftRadius: 75,
        paddingTop: '20%',
    }


}
