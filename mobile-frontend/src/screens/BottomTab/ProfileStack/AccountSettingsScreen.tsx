import React from "react";
import { View, Text, Button, Alert } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { authInstance } from "../../../services/firebase"; // Import authInstance from your firebase.ts
import { ProfileStackParamList } from "../../../navigation/types";

type AccountSettingsProp = NativeStackScreenProps<ProfileStackParamList, 'AccountSettings'>;

const AccountSettingsScreen: React.FC<AccountSettingsProp> = ({ navigation }) => {
    // Function to handle sign out
    const handleSignOut = async () => {
        try {
            await authInstance.signOut(); // Sign out the current user using authInstance
            Alert.alert("Signed out successfully", "You have been signed out.");
            // Navigate to the Welcome screen in the Auth stack
            }
            catch (error) {
            console.error('Sign out error:', error);
            Alert.alert("Error", "An error occurred while signing out.");
        }
    };

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>Hi, you are on the Account Settings screen!</Text>
            {/* Sign out button */}
            <Button title="Sign Out" onPress={handleSignOut} />
        </View>
    );
};

export default AccountSettingsScreen;
