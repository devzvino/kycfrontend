import { TouchableOpacity, Text } from "react-native";
import { ActivityIndicator } from "react-native";

//import styles
import { FontTheme, ButtonTheme, ImageBackgroundTheme, LogoTheme, InputTheme } from "../components/ThemeFile";

const SignUpNavigationButton = ({ onPress, title, loading }) => {
  return (
    <>
      <TouchableOpacity onPress={() => onPress()} disabled={loading} style={ButtonTheme.signUpNavigation}>
        {loading ? <ActivityIndicator /> : <Text style={FontTheme.mainButtonFont}>{title}</Text>}
      </TouchableOpacity>
    </>
  );
};

export default SignUpNavigationButton;
