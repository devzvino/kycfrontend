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
    grey2: '#EFF0F6',
    grey3: '#CCCCCC',
    lightBlue:'#EEF9FF'
};

const { primary,main, orange, green, red, blue, grey, grey2,grey3, lightBlue } = ColorTheme;

// componets styles
export const FontTheme = {
    inputTitle:{
        fontFamily: 'Poppins-Medium',
        color: 'black',
        fontSize: 17,
        lineHeight: 32,
        paddingTop:10,
        paddingBottom:10,

    },
    icontext:{
        width:'90%',
        fontFamily: 'Poppins-Medium',
        color: grey,
        fontStyle: 'normal',
        fontSize: 14,
    },
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
        fontFamily: 'Poppins-Bold',
        color: primary,
        fontSize: 22,
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
    
    },
    signUpNavigation:{
        position: 'reletive',
        bottom:0,
        margin: 'auto',
        width: '80%',
        alignItems: 'center',
        borderRadius: 10,
        backgroundColor: main,
        paddingVertical: 15,
        elevation: 3,
        marginTop: 10,
        color: primary,
    },

}

export const InputTheme = {
    signUpInput:{
        width:width/1.15,
        backgroundColor: grey2,
        borderRadius:5,
        height: 55, 
        paddingLeft:10,
        fontFamily: 'Poppins-Regular', 
        fontSize: 18,
        color: 'black'
    },
    phoneInput:{
    flex:1,
        backgroundColor: grey2,
        borderRadius:5,
        height: 55, 
        paddingLeft:10,
        fontFamily: 'Poppins-Regular', 
        fontSize: 18,
        color: 'black',
        marginLeft: 15,
    },
    phoneDropDown:{
        width:width/4,
        backgroundColor: grey2,
        borderRadius:5,
        height: 55, 
        fontFamily: 'Poppins-Regular', 
        color: 'black',
        justifyContent: 'center',
        fontFamily: 'Poppins-Regular',
        alignItems:'center',
        borderWidth: 0,
        fontSize:18,
    }


}

export const LogoTheme = {
    mainLogo: {
    marginBottom:50,        
    },
    miniLogo:{
    width:width/1.15,
    height:45,
    resizeMode:'contain',
    width:136,
    marginTop:50,
    marginBottom:20,
    alignItems:'flex-start',
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
    },

    

}

export const ImageTheme ={

    iconInText:{
        marginRight:10,
        alignSelf:'center'
    }
}