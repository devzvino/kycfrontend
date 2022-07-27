import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";

const HomeVerificationCard = ({ item }) => {
  let home;
  let work;
  if (item.homeLocation[0] === "") {
    work = JSON.parse(item.workLocation);
  }

  if (item.workLocation[0] === "") {
    home = JSON.parse(item.homeLocation);
  }

  console.log(work);
  return (
    <TouchableOpacity key={item._id}>
      <Text>{home ? item.homeAddress : item.workAddress}</Text>
      <View style={{ flexDirection: "row" }}>
        {home ? (
          <>
            <Text>{home?.lat}</Text>
            <Text>{home?.lng}</Text>
          </>
        ) : (
          <>
            <Text>{work?.lat}</Text>
            <Text>{work?.lng}</Text>
          </>
        )}
      </View>
    </TouchableOpacity>
  );
};

export default HomeVerificationCard;

const styles = StyleSheet.create({});
