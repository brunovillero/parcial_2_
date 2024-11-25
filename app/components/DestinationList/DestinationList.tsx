import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Destination } from '../context/ctx';
import DestinationCard from './DestinationCard';

export default function DestinationList({ destinations } : { destinations: Destination[] }) {

    const reorderLikedAndAlphabetically = (destinations: Destination[]) => {
        const likedDestinations = destinations.filter(destination => destination.favourite);
        const otherDestinations = destinations.filter(destination => !destination.favourite);
        otherDestinations.sort((a, b) => a.name.localeCompare(b.name));
        return [...likedDestinations, ...otherDestinations];
    }

    const [destinationsArray, setDestinationsArray] = useState<Destination[]>([]);

    useEffect(() => {
        setDestinationsArray(reorderLikedAndAlphabetically(destinations));
    }, [destinations]);

    const handleDeleteList = (id: string) => {
        setDestinationsArray(destinationsArray.filter(destination => destination.id !== id));
        reorderLikedAndAlphabetically(destinations);
    }

    const handleFavouriteList = (id: string, value: boolean) => {
        setDestinationsArray(destinationsArray.map(destination => {
            if (destination.id === id) {
                return {...destination, favourite: value};
            }
            return destination;
        }));
        reorderLikedAndAlphabetically(destinations);
    }

    return (
        <ScrollView contentContainerStyle={styles.contentContainer}>
            {destinationsArray.map(destination => <DestinationCard handleDeleteList={handleDeleteList} handleFavouriteList={handleFavouriteList} destination={destination} key={destination.id}></DestinationCard>)}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    contentContainer: {
        margin: 10,
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center',
    }
});