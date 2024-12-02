// PersonalInformationScreen.tsx
import React, { useState, useEffect } from "react";
import { View, Text, TextInput, Button, Image, StyleSheet } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { ProfileStackParamList } from "../../../navigation/types";
import { updateProfile } from "firebase/auth";
import * as ImagePicker from "expo-image-picker";
import { Ionicons } from "@expo/vector-icons"; // Import Ionicons for the back button icon
import { TouchableOpacity } from "react-native";
import {authInstance as auth} from "../../../services/firebase";

// Type definition for the props
type PersonalInformationProp = NativeStackScreenProps<
    ProfileStackParamList,
    "PersonalInformation"
>;

const PersonalInformationScreen: React.FC<PersonalInformationProp> = ({ navigation }) => {
    const [name, setName] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [photo, setPhoto] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    // Fetch user data when the component mounts
    useEffect(() => {
        const currentUser = auth.currentUser;
        if (currentUser) {
            setName(currentUser.displayName || "");
            setEmail(currentUser.email || "");
            setPhoto(currentUser.photoURL || null);
        }
    }, []);

    // Handle photo selection from gallery
    const handleChoosePhoto = async () => {
        let permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (permission.granted) {
            let result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images, // Here it's safe to use ImageTypeOptions.Images
                allowsEditing: true,
                aspect: [4, 3],
                quality: 1,
            });

            if (!result.canceled) {
                setPhoto(result.assets[0].uri); // Set selected image
            }
        }
    };

    // Handle profile update
    const handleUpdateProfile = async () => {
        setLoading(true);
        const currentUser = auth.currentUser;
        if (currentUser) {
            try {
                await updateProfile(currentUser, {
                    displayName: name,
                    photoURL: photo || currentUser.photoURL,
                });
                setLoading(false);
                navigation.goBack(); // Go back after successful update
            } catch (error) {
                console.error("Error updating profile:", error);
                setLoading(false);
            }
        }
    };

    return (
        <View style={styles.container}>
            {/* Back Button */}
            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                <Ionicons name="arrow-back" size={24} color="black" />
            </TouchableOpacity>

            <Text style={styles.header}>Edit Personal Information</Text>

            {photo && <Image source={{ uri: photo }} style={styles.profileImage} />}
            <Button title="Change Profile Picture" onPress={handleChoosePhoto} />

            <TextInput
                style={styles.input}
                value={name}
                placeholder="Name"
                onChangeText={setName}
            />
            <TextInput
                style={styles.input}
                value={email}
                placeholder="Email"
                onChangeText={setEmail}
                keyboardType="email-address"
            />

            <Button
                title={loading ? "Updating..." : "Update Profile"}
                onPress={handleUpdateProfile}
                disabled={loading}
            />
        </View>
    );
};

// Styles for the profile edit screen
const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        alignItems: "center",
        justifyContent: "center",
    },
    backButton: {
        position: "absolute",
        top: 40,
        left: 10,
        padding: 10,
        zIndex: 1,
    },
    header: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 20,
    },
    profileImage: {
        width: 100,
        height: 100,
        borderRadius: 50,
        marginBottom: 20,
    },
    input: {
        width: "80%",
        padding: 10,
        marginVertical: 10,
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 5,
    },
});

export default PersonalInformationScreen;
