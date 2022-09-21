import {TouchableOpacity, Text } from "react-native";

//import styles
import { FontTheme,ButtonTheme,ImageBackgroundTheme,LogoTheme,InputTheme } from '../components/ThemeFile';


const MainButton = ({ onPress, title, disabled }) => (
    <TouchableOpacity disabled={disabled} onPress={onPress} style={ButtonTheme.mainButton}>
      <Text style={FontTheme.mainButtonFont}>{title}</Text>
    </TouchableOpacity>
  );

 export default MainButton;