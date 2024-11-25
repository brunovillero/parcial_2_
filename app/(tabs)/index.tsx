import { Text, View } from "react-native";
import React from "react";
import Home from "../components/home/Home";

export default function Root() {
  return (
    <View style={{
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      width: '100%',
    }}>
      <Home />
    </View>
  );
}
