import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import {authInstance} from "../../services/firebase";

const HomeScreen: React.FC = () => {
    const [userId, setUserId] = useState<string | null>(null);

    useEffect(() => {
        // Check if the user is logged in and get their UID
        const user = authInstance.currentUser;
        if (user) {
            setUserId(user.uid);  // Set the UID to the state
            console.log("Firebase UID:", user.uid);  // Log the UID
        }
    }, []);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Welcome to the Home Screen!</Text>
            {userId && <Text style={styles.uidText}>Firebase UID: {userId}</Text>}
            <Button
                title="Go to Details"
                onPress={() => {}} // Placeholder for button action
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f5f5f5',
    },
    title: {
        fontSize: 24,
        marginBottom: 20,
    },
    uidText: {
        fontSize: 16,
        color: 'gray',
        marginTop: 10,
    },
});

export default HomeScreen;
