import React, { useState, useEffect } from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { ProfileStackParamList } from "../../../navigation/types";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import firebase from "firebase/compat";
import { authInstance } from "../../../services/firebase";
import { Color, FontFamily, FontSize, Border } from "./GlobalStylesProfileOverview";

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
        <View style={styles.lenditProfilePage}>
            <Image
                style={styles.backgroundIcon}
                resizeMode="cover"
                source={require("../../../../assets/Background.png")}
            />
            <Image
                source={{ uri: user.photoURL || "default-image-url" }}
                style={styles.profileImage}
            />

            {/* User's Name */}
            <Text style={styles.name}>{user.displayName || "User Name"}</Text>

            {/* User's Email */}
            <Text style={styles.email}>{user.email}</Text>

            {/* Stack of Buttons */}
            <View style={styles.buttonsContainer}>
                <TouchableOpacity
                    style={[styles.signUpButton, styles.signLayout]}
                    activeOpacity={0.8}
                    onPress={() => navigation.navigate("PersonalInformation")}
                >
                    <Image
                        style={[styles.signUpContainer, styles.signUpButton]}
                        resizeMode="cover"
                        source={require("../../../../assets/SignUpContainer.png")}
                    />
                    <Text style={[styles.confirmPasswordTemp, styles.confirmTypo]}>
                        {"Edit Personal Information"}
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[styles.signUpButton, styles.signLayout]}
                    activeOpacity={0.8}
                    onPress={() => navigation.navigate("PaymentMethods")}
                >
                    <Image
                        style={[styles.signUpContainer, styles.signUpButton1]}
                        resizeMode="cover"
                        source={require("../../../../assets/SignUpContainer.png")}
                    />
                    <Text style={[styles.confirmPasswordTemp, styles.confirmTypo]}>
                        {"Manage Payment Methods"}
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[styles.signUpButton, styles.signLayout]}
                    activeOpacity={0.8}
                    onPress={() => navigation.navigate("AccountSettings")}
                >
                    <Image
                        style={[styles.signUpContainer]}
                        resizeMode="cover"
                        source={require("../../../../assets/SignUpContainer.png")}
                    />
                    <Text style={[styles.confirmPasswordTemp, styles.confirmTypo]}>
                        {"Sign Out"}
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[styles.signUpButton, styles.signLayout]}
                    activeOpacity={0.8}
                    onPress={() => navigation.navigate("Reviews")}
                >
                    <Image
                        style={[styles.signUpContainer]}
                        resizeMode="cover"
                        source={require("../../../../assets/SignUpContainer.png")}
                    />
                    <Text style={[styles.confirmPasswordTemp, styles.confirmTypo]}>
                        {"Reviews"}
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.signUpButton, styles.signLayout]}
                    activeOpacity={0.8}
                    onPress={() => navigation.navigate("Reviews")}
                >
                    <Image
                        style={[styles.signUpContainer]}
                        resizeMode="cover"
                        source={require("../../../../assets/SignUpContainer.png")}
                    />
                    <Text style={[styles.confirmPasswordTemp, styles.confirmTypo]}>
                        {"Your Listings"}
                    </Text>
                </TouchableOpacity>
                <Image style={styles.lenddittIcon} resizeMode="cover" source={require("../../../../assets/NewLenditLogo.png")} />

            </View>
        </View>
    );
};

// Styles for the profile screen
const styles = StyleSheet.create({
    lenddittIcon: {
        // top: 763,
        // left: 117,
        width: 250,
        height: 240,
        position: 'absolute', // Positioning at the bottom
        bottom: -180, // Add some space from the bottom
        alignSelf: 'center', // Center horizontally
    },
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        padding: 20,
    },
    profileImage: {
        width: 200,
        height: 200,
        borderRadius: 100,
        position: 'absolute',  // Add absolute positioning for the profile picture
        top: 80,              // Adjust top to move the profile image down
        left: '50%',          // Center horizontally
        marginLeft: -100,     // Half the width of the image to ensure perfect centering
        resizeMode: 'cover',
    },
    name: {
        fontSize: 24,
        fontWeight: "bold",
        marginTop: 300,         // 10px below the profile picture (adjusted for spacing)
        textAlign: 'center',    // Center the name
    },
    email: {
        fontSize: 16,
        marginTop: 15,           // 5px below the name
        textAlign: 'center',    // Center the email
    },
    buttonsContainer: {
        marginTop: 20,          // Adds space between email and buttons
        width: '100%',          // Make the container as wide as the screen
        alignItems: 'center',   // Align buttons in the center
    },
    signUpButton: {
        width: 352,
        height: 56,
        marginBottom: 12,       // 12px between buttons
    },
    signLayout: {
        position: "relative",
    },
    signUpContainer: {
        borderRadius: Border.br_11xl,
        width: 352,
        height: 56,
    },
    confirmPasswordTemp: {
        top: 9,
        left: 20,
        width: 325,
        height: 43,
        color: Color.colorWhite,
        fontFamily: FontFamily.quicksandMedium,
        fontWeight: "500",
        fontSize: FontSize.size_7xl,
        textAlign: "left",
        position: "absolute",
    },
    backgroundIcon: {
        width: 430,
        position: "absolute",
        height: 932,
    },
    lenditProfilePage: {
        backgroundColor: Color.colorWhite,
        flex: 1,
        width: "100%",
        overflow: "hidden",
        height: 932,
        alignItems: "center",
    },
});

export default ProfileOverViewScreen;
