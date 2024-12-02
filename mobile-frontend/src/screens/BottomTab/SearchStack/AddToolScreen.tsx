import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Text, Alert } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { SearchStackParamList } from '../../../navigation/types';
import { getAuth } from 'firebase/auth';  // Import Firebase Authentication

type SearchProps = NativeStackScreenProps<SearchStackParamList, 'AddTool'>;

const AddToolScreen = ({ navigation }: SearchProps) => {
    const [toolDetails, setToolDetails] = useState({
        name: '',
        description: '',
        price: '',
        address: '',
        city: '',
        state: '',
        country: '',
        lat: '',
        lng: '',
    });

    // Function to handle input changes
    const handleInputChange = (field: keyof typeof toolDetails, value: string) => {
        setToolDetails({ ...toolDetails, [field]: value });
    };

    // Handle form submission
    const handleSubmit = async () => {
        if (!toolDetails.name || !toolDetails.price || !toolDetails.description) {
            Alert.alert('Error', 'Please fill in all required fields');
            return;
        }

        try {
            // Get the current Firebase user and their token
            const user = getAuth().currentUser;
            if (!user) {
                Alert.alert('Error', 'User not authenticated');
                return;
            }

            const idToken = await user.getIdToken(); // Get the Firebase ID Token for authorization

            // Send POST request to the backend
            const response = await fetch('http://192.168.1.249:8000/api/tools', {
                method: 'POST',
                body: JSON.stringify(toolDetails),
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${idToken}`,  // Attach the Bearer token
                },
            });

            const result = await response.json();

            if (response.ok) {
                Alert.alert('Success', 'Tool added successfully');
                navigation.goBack(); // Return to the previous screen on success
            } else {
                Alert.alert('Error', result.message || 'Something went wrong');
            }
        } catch (error) {
            console.error('Error creating tool:', error);
            Alert.alert('Error', 'An error occurred while creating the tool');
        }
    };

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                placeholder="Tool Name"
                value={toolDetails.name}
                onChangeText={(text) => handleInputChange('name', text)}
            />
            <TextInput
                style={styles.input}
                placeholder="Description"
                value={toolDetails.description}
                onChangeText={(text) => handleInputChange('description', text)}
            />
            <TextInput
                style={styles.input}
                placeholder="Price"
                keyboardType="numeric"
                value={toolDetails.price}
                onChangeText={(text) => handleInputChange('price', text)}
            />
            <TextInput
                style={styles.input}
                placeholder="Address"
                value={toolDetails.address}
                onChangeText={(text) => handleInputChange('address', text)}
            />
            <TextInput
                style={styles.input}
                placeholder="City"
                value={toolDetails.city}
                onChangeText={(text) => handleInputChange('city', text)}
            />
            <TextInput
                style={styles.input}
                placeholder="State"
                value={toolDetails.state}
                onChangeText={(text) => handleInputChange('state', text)}
            />
            <TextInput
                style={styles.input}
                placeholder="Country"
                value={toolDetails.country}
                onChangeText={(text) => handleInputChange('country', text)}
            />
            <TextInput
                style={styles.input}
                placeholder="Latitude"
                value={toolDetails.lat}
                onChangeText={(text) => handleInputChange('lat', text)}
            />
            <TextInput
                style={styles.input}
                placeholder="Longitude"
                value={toolDetails.lng}
                onChangeText={(text) => handleInputChange('lng', text)}
            />
            <Button title="Add Tool" onPress={handleSubmit} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    input: {
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        marginBottom: 10,
        paddingLeft: 10,
    },
});

export default AddToolScreen;
