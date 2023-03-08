import { View, Text } from "react-native";
import React, { useContext } from "react";
import { TempContext } from "../context/TempContext";

export default function HomeSwiperListDisplay() {
  const { tempDisplay, setTempDisplay } = useContext(TempContext);
  console.log("temp", tempDisplay);
  console.log("hey");
  return <></>;
}

// {tempDisplay?.length > 0 ? (
//     <SwipeListView
//       contentContainerStyle={{
//         paddingHorizontal: 15,
//         height: height * 0.6,
//         backgroundColor: "#FFF",
//         paddingTop: 20,
//       }}
//       data={tempDisplay}
//       keyExtractor={(item, index) => item._id}
//       renderItem={(item, rowMap) => <HomeVerificationCard item={item} />}
//       disableRightSwipe={true}
//       previewOpenDelay={3000}
//       friction={1000}
//       tension={40}
//       leftOpenValue={95}
//       stopLeftSwipe={95}
//       rightOpenValue={-95}
//       renderHiddenItem={(item, rowMap) => (
//         <TouchableOpacity
//           Vi
//           onPress={() => {
//             handleDeleteProcess(item.item._id, item.item.title);
//           }}
//           style={[styles.hiddenButton]}
//         >
//           <View
//             style={{
//               color: "#ffffff",
//               backgroundColor: "red",
//               height: 100,
//               width: 85,
//               borderRadius: 10,
//               display: "flex",
//               justifyContent: "center",
//               alignItems: "center",
//             }}
//           >
//             {removing ? (
//               <ActivityIndicator color={"#FFFFFF"} />
//             ) : (
//               <Text style={{ color: "#ffffff", fontFamily: "Poppins-Regular" }}>Delete</Text>
//             )}
//           </View>
//         </TouchableOpacity>
//       )}
//     />
//   ) : (
//     <>
//       {tempDisplay?.length < 0 ? (
//         <View style={{ justifyContent: "center", alignItems: "center", flex: 1 }}>
//           <Text style={{ fontFamily: "Poppins-Regular" }}>You have not added your home or work address. </Text>
//         </View>
//       ) : (
//         <View
//           style={{
//             paddingTop: 150,
//             justifyContent: "center",
//             alignItems: "center",
//             // fontFamily: 'Poppins-SemiBold',
//           }}
//         >
//           <Text style={{ fontFamily: "Poppins-Regular" }}>Loading please wait...</Text>

//           <ActivityIndicator style={{ marginTop: 20 }} />
//         </View>
//       )}
//     </>
//   )}
