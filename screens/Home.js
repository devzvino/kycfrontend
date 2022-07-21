import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import GlobalHeader from "../components/GlobalHeader";

const Home = () => {
  return (
    <SafeAreaView style={styles.container}>
      <GlobalHeader title="Home" />
    </SafeAreaView>
  );
};

export default Home;
const styles = StyleSheet.create({
  flex: 1,
});
