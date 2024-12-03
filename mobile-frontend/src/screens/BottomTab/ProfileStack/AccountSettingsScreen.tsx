import React from "react";
import { View, Text, Button, Alert, Image, StyleSheet, TouchableOpacity } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { authInstance } from "../../../services/firebase"; // Import authInstance from your firebase.ts
import { ProfileStackParamList } from "../../../navigation/types";
import { Border, Color, FontFamily } from "./GlobalStylesAccountSettings"

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
      		<Image style={styles.backgroundIcon} resizeMode="cover" source={require("../../../../assets/Background.png")}/>


                 {/* Back button */}
            <TouchableOpacity style={[styles.backButton, styles.backLayout]} activeOpacity={0.8} onPress={()=> navigation.navigate("ProfileOverview")}>
          			<Image resizeMode="cover" source={require("../../../../assets/BackButton.png")} />
        	</TouchableOpacity>
            
            <Text style={[styles.seeYouNext, styles.backFlexBox]}>See you next time!</Text>
      			<Image style={styles.newlenditlogoProcessed1Icon} resizeMode="cover" source={require("../../../../assets/NewLenditLogo.png")} />
      			<TouchableOpacity style={[styles.signOutButton, styles.signLayout]} onPress={handleSignOut}>
        				<Image style={[styles.signOutContainer, styles.signLayout]} resizeMode="cover" source={require("../../../../assets/SignUpContainer.png")}/>
        				<Text style={[styles.signOut, styles.backFlexBox]}>Sign out</Text>
      			</TouchableOpacity>

            
        </View>
    );
};
const styles = StyleSheet.create({
    backLayout: {
          height: 38,
          width: 108,
          position: "absolute"
    },
    backButtonChildPosition: {
          borderRadius: Border.br_11xl,
          left: 0,
          top: 0
    },
    backFlexBox: {
          textAlign: "left",
          position: "absolute"
    },
    signLayout: {
          height: 56,
          width: 352,
          position: "absolute"
    },
    backgroundIcon: {
          width: 430,
          left: 0,
          top: 0,
          position: "absolute",
          height: 932
    },
    backButtonChild: {
          backgroundColor: Color.colorDarkslategray,
          borderStyle: "solid",
          borderColor: Color.colorDarkslategray,
          borderWidth: 1,
          height: 38,
          width: 108,
          position: "absolute"
    },
    backButtonItem: {
          top: 19,
          left: 12,
          maxHeight: "100%",
          width: 23,
          position: "absolute"
    },
    back: {
          top: 5,
          fontSize: 23,
          width: 54,
          height: 29,
          color: Color.colorWhite,
          fontFamily: FontFamily.quicksandMedium,
          fontWeight: "500",
          textAlign: "left",
          left: 39
    },
    backButton: {
          top: 77,
          left: 39
    },
    seeYouNext: {
          top: 328,
          left: 105,
          fontSize: 24,
          fontWeight: "700",
          fontFamily: FontFamily.quicksandBold,
          color: Color.colorDarkslategray,
          width: 235,
          height: 40
    },
    newlenditlogoProcessed1Icon: {
          top: 625,
          left: 61,
          width: 308,
          height: 269,
          position: "absolute"
    },
    signOutContainer: {
          borderRadius: Border.br_11xl,
          left: 0,
          top: 0
    },
    signOut: {
          top: 7,
          left: 121,
          fontSize: 26,
          width: 110,
          height: 43,
          color: Color.colorWhite,
          fontFamily: FontFamily.quicksandMedium,
          fontWeight: "500",
          textAlign: "left"
    },
    signOutButton: {
          top: 410,
          left: 39
    },
    lenditProfilePage: {
          backgroundColor: Color.colorWhite,
          flex: 1,
          width: "100%",
          overflow: "hidden",
          height: 932
    }
});

export default AccountSettingsScreen;
