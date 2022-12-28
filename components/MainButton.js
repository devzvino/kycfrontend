import { TouchableOpacity, Text } from "react-native";

//import styles
import { FontTheme, ButtonTheme, ImageBackgroundTheme, LogoTheme, InputTheme } from "../components/ThemeFile";

const MainButton = ({ onPress, title, disabled, loading }) => (
  <TouchableOpacity disabled={disabled} onPress={() => onPress()} style={ButtonTheme.mainButton}>
    <Text style={FontTheme.mainButtonFont}>{!loading ? title : "Please wait..."}</Text>
  </TouchableOpacity>
);

export default MainButton;
