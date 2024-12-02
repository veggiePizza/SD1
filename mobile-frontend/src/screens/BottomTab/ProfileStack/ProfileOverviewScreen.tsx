// ProfileOverviewScreen.tsx
import React, { useState, useEffect } from "react";
import { View, Text, Button, Image, StyleSheet } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { ProfileStackParamList } from "../../../navigation/types";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import firebase from "firebase/compat";
import {authInstance} from "../../../services/firebase";

// Type definition for the props
type ProfileOverviewProp = NativeStackScreenProps<ProfileStackParamList, "ProfileOverview">;

const ProfileOverViewScreen: React.FC<ProfileOverviewProp> = ({ navigation }) => {
    const [user, setUser] = useState<any>(null);

    // Fetch user data when the component mounts
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(authInstance, (user) => {
            if (user) {
                setUser(user); // Set user data if logged in
            } else {
                setUser(null); // Handle case if no user is logged in
            }
        });

        return () => unsubscribe(); // Clean up listener on unmount
    }, []);

    if (!user) {
        return <Text>Loading...</Text>; // Optionally show loading while fetching user data
    }

    return (
        <View style={styles.container}>
            <Image source={{ uri: user.photoURL || "default-image-url" }} style={styles.profileImage} />
            <Text style={styles.name}>{user.displayName || "User Name"}</Text>
            <Text style={styles.email}>{user.email}</Text>

            <Button
                title="Edit Personal Information"
                onPress={() => navigation.navigate("PersonalInformation")}
            />
            <Button
                title="Manage Payment Methods"
                onPress={() => navigation.navigate("PaymentMethods")}
            />
            <Button
                title="Account Settings"
                onPress={() => navigation.navigate("AccountSettings")}
            />
            <Button title="Reviews" onPress={() => navigation.navigate("Reviews")} />
        </View>
    );
};

// Styles for the profile screen
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        padding: 20,
    },
    profileImage: {
        width: 100,
        height: 100,
        borderRadius: 50,
        marginBottom: 20,
    },
    name: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 5,
    },
    email: {
        fontSize: 16,
        marginBottom: 20,
    },
});

export default ProfileOverViewScreen;
