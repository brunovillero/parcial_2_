import { Text, View } from "react-native";
import React, { useState, useEffect } from "react";
import EditForm from "../components/crud/EditForm";
import { useLocalSearchParams, useGlobalSearchParams } from 'expo-router';
import { API_URL, Destination } from "../components/context/ctx";

export default function Edit() {
    const { id } = useLocalSearchParams();
    const { id: globalId } = useGlobalSearchParams();
    console.log(id);

    const [destination, setDestination] = useState<Destination>({
        id: '',
        name: '',
        description: '',
        difficulty: '',
        favourite: false
    });

    useEffect(() => {
        fetch(API_URL, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(id)
        })
            .then(response => response.json())
            .then(responseJson => {
                setDestination(responseJson);
            })
            .catch(error => console.error(error));
    }, [id]);
  
    return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <EditForm destination={destination}></EditForm>

    </View>
  );
}