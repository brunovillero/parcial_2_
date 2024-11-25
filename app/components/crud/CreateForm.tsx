import React, { useState, useEffect } from 'react';
import { router } from 'expo-router';
import { View, Text, StyleSheet, TextInput, Button } from 'react-native';
import { API_URL, Destination } from '../context/ctx';
import { DifficultyDropdown } from './DifficultyDropdown';

export default function CreateForm() {

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [difficulty, setDifficulty] = useState('');
    const [destination, setDestination] = useState<Destination>({
        id: '',
        name: '',
        description: '',
        difficulty: '',
        favourite: false
    });

    const handleSubmit = () => {
        const destination = {
            name,
            description,
            difficulty
        }
        fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(destination)
        })
        .then(response => response.json())
        .then(responseJson => {
            if (responseJson.id) {
                setDestination(responseJson);
            }
        })
        .catch(error => console.error(error));
    }

    const handleEdit = () => {
        router.setParams({
            id: destination.id
        });
        router.push('/edit')
    }


    return (
        <View style={styles.container}>
            <Text style={styles.title}>Create Destination</Text>
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
            <DifficultyDropdown onValueChange={value => setDifficulty(value)} valueSet=''></DifficultyDropdown>
            {  destination.id ? <Button title="Update Destination Created" onPress={handleEdit}></Button> : <Button title="Submit" onPress={handleSubmit} ></Button> }
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
    },
    button: {
        margin: 10,
        width: '100%',
    }
});