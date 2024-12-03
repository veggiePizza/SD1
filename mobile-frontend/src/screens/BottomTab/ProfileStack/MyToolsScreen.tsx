import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, Image, Alert, Button } from 'react-native';
import { getAuth } from 'firebase/auth';  // Import Firebase Authentication
import { useNavigation } from '@react-navigation/native';
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { ProfileStackParamList } from "../../../navigation/types";
import Config from "react-native-config"; // Import useNavigation hook


interface Tool {
    id: string;
    name: string;
    description: string;
    price: string;
    avgRating: number;
    previewImage: string;
}

type ProfileOverviewProp = NativeStackScreenProps<ProfileStackParamList, "MyTools">;

const MyToolsScreen: React.FC<ProfileOverviewProp> = ({ navigation }) => {
    const [tools, setTools] = useState<Tool[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        fetchTools();
    }, []);

    const fetchTools = async () => {
        try {
            const user = getAuth().currentUser;
            if (!user) {
                Alert.alert('Error', 'User not authenticated');
                return;
            }

            const idToken = await user.getIdToken(); // Get the Firebase ID Token for authorization

            const response = await fetch(`IPADDRESS:8000/api/tools/current`, { // Replace with your backend URL
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${idToken}`, // Attach the Bearer token for authentication
                },
            });

            const result = await response.json();

            if (response.ok) {
                setTools(result);  // Set the tools data to state
            } else {
                Alert.alert('Error', result.message || 'Failed to fetch tools');
            }
        } catch (error) {
            console.error('Error fetching tools:', error);
            Alert.alert('Error', 'An error occurred while fetching tools');
        } finally {
            setLoading(false); // Set loading to false when request is done
        }
    };

    const deleteTool = (toolId: string, toolName: string) => {
        Alert.alert(
            'Are you sure?',
            `This tool will be gone forever. Are you sure you want to delete ${toolName}?`,
            [
                {
                    text: 'Cancel',
                    onPress: () => console.log('Delete cancelled'),
                    style: 'cancel',
                },
                {
                    text: 'Delete',
                    onPress: async () => {
                        try {
                            const user = getAuth().currentUser;
                            if (!user) {
                                Alert.alert('Error', 'User not authenticated');
                                return;
                            }

                            const idToken = await user.getIdToken(); // Get the Firebase ID Token for authorization

                            const response = await fetch(`IPADDRESS:8000/api/tools/${toolId}`, { // Replace with your backend URL
                                method: 'DELETE',
                                headers: {
                                    'Authorization': `Bearer ${idToken}`, // Attach the Bearer token for authentication
                                },
                            });

                            const result = await response.json();

                            if (response.ok) {
                                Alert.alert('Success', 'Tool deleted successfully');
                                setTools(tools.filter(tool => tool.id !== toolId)); // Remove the deleted tool from state
                            } else {
                                Alert.alert('Error', result.message || 'Failed to delete tool');
                            }
                        } catch (error) {
                            console.error('Error deleting tool:', error);
                            Alert.alert('Error', 'An error occurred while deleting the tool');
                        }
                    },
                },
            ],
            { cancelable: true }
        );
    };

    const renderTool = ({ item }: { item: Tool }) => (
        <View style={styles.toolContainer}>
            {item.previewImage ? (
                <Image source={{ uri: item.previewImage }} style={styles.toolImage} />
            ) : (
                <Text>No Image Available</Text>
            )}
            <Text style={styles.toolName}>{item.name}</Text>
            <Text>{item.description}</Text>
            <Text>Price: ${item.price}</Text>
            <Text>Avg Rating: {item.avgRating}</Text>
            <Button title="Edit" onPress={() => handleEditTool(item.id)} />
            <Button title="Delete" onPress={() => deleteTool(item.id, item.name)} color="red" />
        </View>
    );

    const handleEditTool = (toolId: string) => {
        navigation.navigate('EditTools', { toolId }); // Ensure 'EditTools' is correctly registered in the ProfileStackParamList
    };

    return (
        <View style={styles.container}>
            {loading ? (
                <Text>Loading your tools...</Text>
            ) : (
                <FlatList
                    data={tools}
                    renderItem={renderTool}
                    keyExtractor={(item) => item.id}
                />
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    toolContainer: {
        marginBottom: 20,
        borderBottomWidth: 1,
        borderColor: '#ddd',
        paddingBottom: 10,
    },
    toolImage: {
        width: 100,
        height: 100,
        resizeMode: 'cover',
        marginBottom: 10,
    },
    toolName: {
        fontWeight: 'bold',
        fontSize: 18,
    },
});

export default MyToolsScreen;
