// PersonalInformationScreen.tsx
import React, { useState, useEffect } from "react";
import { View, Text, TextInput, Button, Image, StyleSheet, ScrollView, KeyboardAvoidingView } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { ProfileStackParamList } from "../../../navigation/types";
import { updateProfile } from "firebase/auth";
import * as ImagePicker from "expo-image-picker";
import { Ionicons } from "@expo/vector-icons"; // Import Ionicons for the back button icon
import { TouchableOpacity } from "react-native";
import {authInstance as auth} from "../../../services/firebase";
import FigmaPersonalInformationScreen from "./FigmaAccountSettingsScreen";
import { FontFamily, FontSize, Color } from "./GlobalStyles";

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
       
        <ScrollView>
        <View style={styles.lenditProfilePage}>
      			<Image style={styles.backgroundIcon} resizeMode="cover" source={require("../../../../assets/Background.png")} />
      			 
                 {/* Back button */}
                <TouchableOpacity style={[styles.backButton, styles.backLayout]} activeOpacity={0.8} onPress={()=> navigation.navigate("ProfileOverview")}>
          			<Image resizeMode="cover" source={require("../../../../assets/BackButton.png")} />
        		</TouchableOpacity>

      			<Text style={styles.editPersonalInformation}>Edit Personal Information</Text>
                <Text style={[styles.changeProfilePicture, styles.profileTypo]} onPress={handleChoosePhoto}>
                    Change Profile Picture
                </Text>


      			<Text style={[styles.updateProfile, styles.profileTypo]} 
                      onPress={handleUpdateProfile}
                      disabled={loading}
                      >Update Profile
                </Text>


      			<View style={[styles.fullNameContainer, styles.emailShadowBox]} />
                  <TextInput
                style={[styles.fullNameTemp, styles.tempTypo]}
                value={name}
                placeholder="Name"
                onChangeText={setName}
            />
                
      			<View style={[styles.email, styles.emailShadowBox]} />
                <TextInput
                style={[styles.emailTemp, styles.tempTypo]}
                value={email}
                placeholder="Email"
                onChangeText={setEmail}
                keyboardType="email-address"
                />

      			{photo && <Image source={{ uri: photo }} style={styles.profileImage} />}
    	</View>
        </ScrollView>

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
        top: 70,
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
        width: 200,
        height: 200,
        borderRadius: 100,
        marginBottom: 20,
        position: 'absolute',  // Add absolute positioning
        top: 225,              // Adjust top to move it down
        left: '50%',           // Center horizontally
        marginLeft: -100,       // Half the width of the image to ensure perfect centering
        resizeMode: 'cover'
    }
    ,
    input: {
        width: "80%",
        padding: 10,
        marginVertical: 10,
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 5,
    },
    ///////////////////////////
    backLayout: {
        height: 38,
        width: 108,
        position: "absolute"
    },

  	profileTypo: {
    		height: 19,
    		color: Color.colorBlack,
    		fontFamily: FontFamily.quicksandRegular,
    		//textDecoration: "underline",
    		fontSize: FontSize.size_mid,
    		textAlign: "left",
    		position: "absolute"
  	},
  	tempTypo: {
    		opacity: 100,
    		height: 30,
    		color: Color.colorDarkslategray,
    		fontFamily: FontFamily.quicksandBold,
    		fontWeight: "700",
    		fontSize: FontSize.size_5xl,
    		left: 50,
    		textAlign: "left",
    		position: "absolute"
  	},
  	emailShadowBox: {
    		height: 58,
    		width: 354,
    		shadowOpacity: 1,
    		elevation: 4,
            borderRadius: 30,
    		shadowRadius: 4,
    		shadowOffset: {
      			width: 0,
      			height: 4
    		},
    		shadowColor: "rgba(0, 0, 0, 0.25)",
    		left: 38,
    		borderWidth: 1,
    		borderColor: Color.colorDarkslategray,
    		borderStyle: "solid",
    		//borderRadius: Border.br_11xl,
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
    		borderWidth: 1,
    		borderColor: Color.colorDarkslategray,
    		borderStyle: "solid",
    		//borderRadius: Border.br_11xl,
    		height: 38,
    		width: 108,
    		left: 0,
    		top: 0,
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
    		fontWeight: "500",
    		fontFamily: FontFamily.quicksandMedium,
    		color: Color.colorWhite,
    		width: 54,
    		height: 29,
    		textAlign: "left",
    		left: 39,
    		position: "absolute"
  	},
  	// backButton: {
    // 		top: 77,
    // 		height: 38,
    // 		width: 108,
    // 		left: 39,
    // 		position: "absolute"
  	// },
  	editPersonalInformation: {
    		top: 156,
    		width: 321,
    		height: 40,
    		color: Color.colorDarkslategray,
    		fontFamily: FontFamily.quicksandBold,
    		fontWeight: "700",
    		fontSize: FontSize.size_5xl,
    		left: 62,
            textAlign: "center",
    		position: "absolute"
  	},
  	changeProfilePicture: {
    		top: 445,
    		left: 123,
    		width: 180,
            textAlign: "center",
            textDecorationLine: 'underline',
  	},
  	updateProfile: {
    		top: 683,
    		left: 154,
    		width: 117,
            textAlign: "center",
            textDecorationLine: 'underline',

  	},
  	fullNameTemp: {
    		top: 544,
    		width: 235
  	},
  	fullNameContainer: {
    		top: 530
  	},
  	email: {
    		top: 606
  	},
  	emailTemp: {
    		top: 620,
    		width: 292
  	},
  	profileiconRemovebgPreview1: {
    		top: 200,
    		left: 86,
    		width: 254,
    		height: 264,
    		position: "absolute"
  	},
  	lenditProfilePage: {
    		backgroundColor: Color.colorWhite,
    		flex: 1,
    		width: "100%",
    		overflow: "hidden",
    		height: 932
  	}
});

export default PersonalInformationScreen;
