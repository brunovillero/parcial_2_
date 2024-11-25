import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { API_URL, Destination } from '../context/ctx';
import DestinationList from '../DestinationList/DestinationList';
export default function Home() {

  const [destinations, setDestinations] = useState<Destination[]>([]);
  
  useEffect(() => {
    fetch(API_URL)
      .then(response => response.json())
      .then(responseJson => {
        if (responseJson.length > 0) {
          setDestinations(responseJson);
        }
      })
      .catch(error => console.error(error));
  }, []);

  return (
    <View style={styles.container}>
      <DestinationList destinations={destinations}></DestinationList>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
});