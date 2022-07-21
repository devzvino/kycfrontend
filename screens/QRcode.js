import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import GlobalHeader from "../components/GlobalHeader";

const QRcode = () => {
  return (
    <SafeAreaView style={styles.container}>
      <GlobalHeader title="QR code" />
    </SafeAreaView>
  );
};

export default QRcode;

const styles = StyleSheet.create({
  flex: 1,
});
