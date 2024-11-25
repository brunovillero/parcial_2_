import { Text, View } from "react-native";
import React from "react";
import CreateForm from "../components/crud/CreateForm";

export default function Create() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <CreateForm />
    </View>
  );
}
