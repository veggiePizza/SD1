import React, { useState, useEffect } from "react";
import { View, Text, TextInput, Button, Alert, StyleSheet } from "react-native";
import { useRoute } from '@react-navigation/native'; // To get the route params
import { getAuth } from "firebase/auth";
import {NativeStackScreenProps} from "@react-navigation/native-stack";
import {ProfileStackParamList} from "../../../navigation/types";
import Config from "react-native-config";
const apiBaseUrl = Config.REACT_APP_API_BASE_URL;
console.log(apiBaseUrl);

type ProfileOverviewProp = NativeStackScreenProps<ProfileStackParamList, "EditTools">;

const EditToolScreen: React.FC<ProfileOverviewProp> = ({ navigation })  => {
    const route = useRoute();
    // @ts-ignore
    const { toolId } = route.params; // Access the toolId passed from MyToolsScreen
    const [tool, setTool] = useState<any>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [updatedTool, setUpdatedTool] = useState<any>({});

    useEffect(() => {
        fetchToolData();
    }, []);

    // Fetch tool data by toolId
    const fetchToolData = async () => {
        try {
            const user = getAuth().currentUser;
            if (!user) {
                Alert.alert('Error', 'User not authenticated');
                return;
            }

            const idToken = await user.getIdToken(); // Get the Firebase ID Token

            const response = await fetch(`IPADDRESS:8000/api/tools/${toolId}`, { // Replace with your backend URL
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${idToken}`, // Attach the Bearer token
                },
            });

            const result = await response.json();
            if (response.ok) {
                setTool(result); // Set tool data to state
                setUpdatedTool(result); // Set updated tool data to pre-fill inputs
            } else {
                Alert.alert('Error', result.message || 'Failed to fetch tool');
            }
        } catch (error) {
            console.error('Error fetching tool:', error);
            Alert.alert('Error', 'An error occurred while fetching the tool');
        }
    };

    // Handle updating the tool
    const handleUpdateTool = async () => {
        try {
            const user = getAuth().currentUser;
            if (!user) {
                Alert.alert('Error', 'User not authenticated');
                return;
            }

            const idToken = await user.getIdToken(); // Get the Firebase ID Token

            const response = await fetch(`IPADDRESS:8000/api/tools/${toolId}`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${idToken}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedTool), // Send the updated tool data
            });

            const result = await response.json();
            if (response.ok) {
                Alert.alert('Success', 'Tool updated successfully');
            } else {
                Alert.alert('Error', result.message || 'Failed to update tool');
            }
        } catch (error) {
            console.error('Error updating tool:', error);
            Alert.alert('Error', 'An error occurred while updating the tool');
        }
    };

    if (loading) {
        return <Text>Loading...</Text>;
    }

    if (!tool) {
        return <Text>Tool not found</Text>;
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Edit Tool</Text>
            <TextInput
                style={styles.input}
                value={updatedTool.name}
                onChangeText={(text) => setUpdatedTool({ ...updatedTool, name: text })}
                placeholder="Tool Name"
            />
            <TextInput
                style={styles.input}
                value={updatedTool.description}
                onChangeText={(text) => setUpdatedTool({ ...updatedTool, description: text })}
                placeholder="Description"
            />
            <TextInput
                style={styles.input}
                value={updatedTool.price}
                onChangeText={(text) => setUpdatedTool({ ...updatedTool, price: text })}
                placeholder="Price"
                keyboardType="numeric"
            />
            <TextInput
                style={styles.input}
                value={updatedTool.address}
                onChangeText={(text) => setUpdatedTool({ ...updatedTool, address: text })}
                placeholder="Address"
            />
            <TextInput
                style={styles.input}
                value={updatedTool.city}
                onChangeText={(text) => setUpdatedTool({ ...updatedTool, city: text })}
                placeholder="City"
            />
            <TextInput
                style={styles.input}
                value={updatedTool.state}
                onChangeText={(text) => setUpdatedTool({ ...updatedTool, state: text })}
                placeholder="State"
            />
            <TextInput
                style={styles.input}
                value={updatedTool.country}
                onChangeText={(text) => setUpdatedTool({ ...updatedTool, country: text })}
                placeholder="Country"
            />
            <Button title="Update Tool" onPress={handleUpdateTool} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    input: {
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 5,
        marginBottom: 15,
        paddingLeft: 10,
    },
});

export default EditToolScreen;
