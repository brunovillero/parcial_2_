import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, Button } from 'react-native';
import { API_URL, Destination } from '../context/ctx';
import { DifficultyDropdown } from './DifficultyDropdown';

export default function EditForm({ destination } : { destination: Destination }) {

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [difficulty, setDifficulty] = useState('');
    const [favourite, setFavourite] = useState(false);

    useEffect(() => {
        setName(destination.name);
        setDescription(destination.description);
        setDifficulty(destination.difficulty);
        setFavourite(destination.favourite);
    }, [destination]);

    const handleSubmit = () => {
        const destination = {
            name,
            description,
            difficulty,
            favourite
        }
        fetch(API_URL, {
            method: 'PUT',
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

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Edit Destination</Text>
            <TextInput
                style={styles.input}
                placeholder="Name"
                onChangeText={text => setName(text)}
                value={name}
            />
            <TextInput
                style={styles.input}
                placeholder="Description"
                onChangeText={text => setDescription(text)}
                value={description}
            />
            <DifficultyDropdown onValueChange={value => setDifficulty(value)} valueSet={difficulty}></DifficultyDropdown>
            <Button title="Submit" onPress={handleSubmit}></Button>
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
    input: {
        height: 40,
        width: 200,
        borderColor: 'gray',
        borderWidth: 1,
        margin: 10,
        padding: 5,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        margin: 10,
    }
});