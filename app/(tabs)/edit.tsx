import { Text, View } from "react-native";
import React, { useState, useEffect } from "react";
import EditForm from "../components/crud/EditForm";
import { useLocalSearchParams, useGlobalSearchParams } from 'expo-router';
import { API_URL, Destination } from "../components/context/ctx";

export default function Edit() {
    const { id } = useLocalSearchParams();

    const [destination, setDestination] = useState<Destination>({
        id: '',
        name: '',
        description: '',
        difficulty: '',
        favourite: false
    });

    useEffect(() => {
        if (!id) {
            return;
        }
        
        fetch(API_URL + '/' + id, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
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