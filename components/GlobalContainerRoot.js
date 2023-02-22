
// ===================== BACKGROUND FETCH
import { StatusBar } from "expo-status-bar";
import { Dimensions, View } from "react-native";


const GlobalContainerRoot = ({ children }) => {

  return (
    <View style={{ flex: 1, height: height }}>
      <StatusBar style="dark" backgroundColor="transparent" />
      {children}
    </View>
  );
};



const { height, width } = Dimensions.get("window");
export default GlobalContainerRoot;
