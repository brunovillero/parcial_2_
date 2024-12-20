import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { API_URL, Destination } from '../context/ctx';

export default function DestinationCard({ destination, handleDeleteList, handleFavouriteList } : { destination: Destination, handleDeleteList: (id: string) => void, handleFavouriteList: (id: string, value: boolean) => void }) {
    const [favourite, setFavourite] = useState(false);

    useEffect(() => {
        if (destination.favourite) {
            setFavourite(true);
        }
    }, [destination]);

    const handleFavourite = () => {
        fetch(API_URL + '/' + destination.id, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({...destination, favourite: favourite})
        })
            .then(response => response.json())
            .then(responseJson => {
                setFavourite(responseJson.favourite);
            })
            .catch(error => console.error(error)); 
    }

    const handleDelete = () => {
        handleDeleteList(destination.id);
        fetch(API_URL + '/' + destination.id, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(destination)
        })
            .then(response => response.json())
            .then(responseJson => {
                console.log(responseJson);
            })
            .catch(error => console.error(error)); 
    }
    
    const getDifficultyColor = (difficulty: string) => {
        switch (difficulty) {
            case 'easy':
                return styles.easy;
            case 'medium':
                return styles.medium;
            case 'hard':
                return styles.hard;
            default:
                return styles.easy;
        }
    }
    return (
        <View style={styles.container}>
            <Text style={styles.text}>Destino: {destination.name}</Text>
            <Text style={styles.text}>Dificultad: <View style={getDifficultyColor(destination.difficulty)}></View></Text>
            <TouchableOpacity onPress={handleFavourite}>
                <View style={styles.favourite}>
                    {favourite ? <Text style={styles.favouriteText}>Favorito</Text> : <Text style={styles.notFavouriteText}>No Favorito</Text>}
                </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleDelete}>
                <View style={styles.delete}>
                    <Text>Eliminar</Text>
                </View>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    text : {
        fontSize: 20,
        fontWeight: 'bold',
        margin: 10,
    },
    container: {
        padding: 10,
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    hard: {
        width: 20,
        height: 20,
        borderRadius: 20,
        backgroundColor: 'purple'
    },
    medium: {
        width: 20,
        height: 20,
        borderRadius: 20,
        backgroundColor: 'yellow'
    },
    easy: {
        width: 20,
        height: 20,
        borderRadius: 20,
        backgroundColor: 'green'
    },
    favourite: {
        width: 100,
        height: 40,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 5,
        margin: 10,
    },
    delete: {
        width: 100,
        height: 40,
        borderRadius: 20,
        backgroundColor: 'blue',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 5,
    },
    favouriteText: {
        height: 20,
        color: 'white',
        backgroundColor: 'green',
        margin: 10,
        borderRadius: 20,
    },
    notFavouriteText: {
        height: 20,
        color: 'white',
        margin: 10,
        backgroundColor: 'red',
        borderRadius: 20,
    }
});