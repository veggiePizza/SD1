// Import necessary modules and components from React, Tamagui, and React Navigation libraries
import * as React from 'react';
import { Button, Input, Stack, YStack } from 'tamagui';
import { useNavigation } from '@react-navigation/native';
import { Alert } from 'react-native';
import { AuthScreenNavigationType } from "../../../navigation/types";
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { useForm, Controller } from 'react-hook-form';
import { authInstance } from "../../../services/firebase"
import {Image, StyleSheet, Text, View, TouchableOpacity, Pressable, TextInput} from "react-native";
import FigmaSignUpScreen from './FigmaSignUpScreen';

// Define an interface to type the form data for user sign-up
interface IUser {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
}

// Define the SignupScreen component
const SignupScreen = () => {
    // Use the useNavigation hook to get access to the navigation prop with typed routes
    const navigation = useNavigation<AuthScreenNavigationType<"SignUp">>();

    // Initialize react-hook-form with default values for the form fields
    const { control, handleSubmit, formState: { errors } } = useForm<IUser>({
        defaultValues: {
            name: "",
            email: "",
            password: "",
            confirmPassword: "",
        },
    });

    // Define the function to handle form submission
    const onSubmit = async (data: IUser) => {
        try {
            const { email, name, password, confirmPassword } = data;

            // Check if the password and confirm password fields match
            if (password !== confirmPassword) {
                Alert.alert("Passwords do not match", "Please make sure both passwords are the same.");
                return;
            }

            // Register the user with email and password using Firebase
            await signUpWithEmailAndPassword(email, password, name);
        } catch (error) {
            // Handle any errors that occur during submission
            Alert.alert("Submission Failed", "Please check your input and try again.");
        }
    }

    // Function to handle user registration and profile update
    const signUpWithEmailAndPassword = async (email: string, password: string, name: string) => {
        try {
            // Create a new user with the provided email and password using Firebase
            const userCredential = await createUserWithEmailAndPassword(authInstance, email, password);
            const user = userCredential.user;
            console.log('User created:', user);

            // Update the user's profile with their display name
            await updateProfile(user, { displayName: name });
            console.log("User's display name updated:", name);

            // Navigate to the next screen after successful signup (e.g., Home screen)
            // navigation.navigate("Home"); // Uncomment and replace with the actual route
        } catch (error) {
            console.log("Error registering user", error);
            // Alert the user in case of an error during registration
            Alert.alert("Registration Error", "There was an issue creating your account. Please try again.");
        }
    }

    // Render the signup form
    return (
       <FigmaSignUpScreen/>

        // <YStack f={1} ai="center" jc="center" p="$4" bg="$background">
        //     {/* Title for the signup screen */}
        //     <Text
        //         fontFamily="$heading"
        //         fontSize="$6"
        //         color="$color"
        //         mb="$4"
        //     >
        //         Create Account
        //     </Text>
        //     {/* Form stack to contain input fields */}
        //     <Stack width="100%">
        //         {/* Full Name Input */}
        //         <Controller
        //             control={control}
        //             name="name"
        //             render={({ field: { onChange, onBlur, value } }) => (
        //                 <Input
        //                     placeholder="Full Name"
        //                     p="$3"
        //                     bg="$background"
        //                     borderColor="$borderColor"
        //                     onChangeText={onChange}
        //                     onBlur={onBlur}
        //                     value={value}
        //                 />
        //             )}
        //         />
        //         {/* Display validation error if the name field is empty */}
        //         {errors.name && <Text color="$red">Name is required</Text>}

        //         {/* Email Input */}
        //         <Controller
        //             control={control}
        //             name="email"
        //             render={({ field: { onChange, onBlur, value } }) => (
        //                 <Input
        //                     placeholder="Email"
        //                     p="$3"
        //                     bg="$background"
        //                     borderColor="$borderColor"
        //                     onChangeText={onChange}
        //                     onBlur={onBlur}
        //                     value={value}
        //                 />
        //             )}
        //         />
        //         {/* Display validation error if the email field is empty */}
        //         {errors.email && <Text color="$red">Email is required</Text>}

        //         {/* Password Input */}
        //         <Controller
        //             control={control}
        //             name="password"
        //             render={({ field: { onChange, onBlur, value } }) => (
        //                 <Input
        //                     placeholder="Password"
        //                     p="$3"
        //                     bg="$background"
        //                     borderColor="$borderColor"
        //                     secureTextEntry // Masks the password input
        //                     onChangeText={onChange}
        //                     onBlur={onBlur}
        //                     value={value}
        //                 />
        //             )}
        //         />
        //         {/* Display validation error if the password field is empty */}
        //         {errors.password && <Text color="$red">Password is required</Text>}

        //         {/* Confirm Password Input */}
        //         <Controller
        //             control={control}
        //             name="confirmPassword"
        //             render={({ field: { onChange, onBlur, value } }) => (
        //                 <Input
        //                     placeholder="Confirm Password"
        //                     p="$3"
        //                     bg="$background"
        //                     borderColor="$borderColor"
        //                     secureTextEntry // Masks the confirm password input
        //                     onChangeText={onChange}
        //                     onBlur={onBlur}
        //                     value={value}
        //                 />
        //             )}
        //         />
        //         {/* Display validation error if the confirm password field is empty */}
        //         {errors.confirmPassword && <Text color="$red">Confirm Password is required</Text>}
        //     </Stack>

        //     {/* Submit Button */}
        //     <Button
        //         size="$4"
        //         width="100%"
        //         mt="$4"
        //         onPress={handleSubmit(onSubmit)} // Handle form submission
        //     >
        //         Sign Up
        //     </Button>

        //     {/* Link to navigate to the Sign In screen */}
        //     <Text mt="$3" color="$colorLight">
        //         Already have an account?{' '}
        //         <Text
        //             onPress={() => navigation.navigate("SignIn")}
        //         >
        //             Sign In
        //         </Text>
        //     </Text>

        //     {/* Link to navigate back to the Welcome screen */}
        //     <Text mt="$3" color="$colorLight">
        //         <Text
        //             onPress={() => navigation.navigate("Welcome")}
        //         >
        //             Back to Welcome
        //         </Text>
        //     </Text>
        // </YStack>
     );
};


const styles = StyleSheet.create({
    textInput: {
        paddingHorizontal: 30, // Adds padding to start text 15 pixels to the right of the previous start point
        fontSize: 35, // Makes the text larger for better readability
        height: "100%", // Ensures the input text fills the container properly
        color: "#343A40", // Sets the input text color
    },
  	letsGetStartedPosition: {
    		width: 350,
    		left: 39,
    		marginTop:0,
    		position: "absolute"
  	},
    inputPosition: {
        width: 350,
        left: 39,
        position: "absolute"
    },
  	containerShadowBox: {
    		height: 58,
    		width: 354,
    		shadowOpacity: 1,
    		elevation: 4,
    		shadowRadius: 4,
    		shadowOffset: {
      			width: 0,
      			height: 4
    		},
    		shadowColor: "rgba(0, 0, 0, 0.25)",
    		left: -1,
    		borderWidth: 1,
    		borderColor: "#343a40",
    		borderStyle: "solid",
    		borderRadius: 30,
    		position: "absolute"
  	},
  	tempTypo: {
    		left: 23,
    		opacity: 0.3,
    		height: 43,
    		color: "#463f3a",
    		fontFamily: "Quicksand-Regular",
    		fontSize: 30,
    		textAlign: "left",
    		position: "absolute"
  	},
  	signLayout: {
    		height: 56,
    		width: 352,
    		position: "absolute"
  	},
  	backTypo: {
    		fontFamily: "Quicksand-Medium",
    		fontWeight: "500",
    		position: "absolute"
  	},
  	signInTypo: {
    		height: 19,
    		fontSize: 17,
    		top: 830,
    		color: "#000",
    		textAlign: "left",
    		position: "absolute"
  	},
  	orTypo: {
    		fontSize: 25,
    		textAlign: "left"
  	},
  	orLayout: {
    		height: 36,
    		position: "absolute"
  	},
  	seperatorLayout: {
    		height: 1,
    		width: 146,
    		borderTopWidth: 1,
    		borderColor: "#32373d",
    		top: 20,
    		opacity: 0.3,
    		borderStyle: "solid",
    		position: "absolute"
  	},
  	backLayout: {
    		height: 38,
    		width: 108,
    		position: "absolute"
  	},
  	backgroundIcon: {
    		width: 430,
    		left: 0,
    		top: 0,
    		position: "absolute",
    		height: 932,
            opacity: 0.35
  	},
  	letsGetStarted: {
    		top: 160,
    		fontSize: 60,
    		fontWeight: "700",
    		fontFamily: "Quicksand-Bold",
    		height: 150,
    		textAlign: "left",
    		color: "#343a40"
  	},
  	fullNameContainer: {
    		top: -1
  	},
  	passwordContainer: {
    		top: 139
  	},
  	confirmPasswordContainer: {
    		top: 210
  	},
  	email: {
    		top: 69
  	},
  	fullNameTemp: {
    		top: 7,
    		left: 20,
    		opacity: 0.3,
    		color: "#463f3a",
    		height: 43,
    		width: 235,
    		fontFamily: "Quicksand-Regular",
    		fontSize: 30,
    		textAlign: "left",
    		position: "absolute"
  	},
  	emailTemp: {
    		top: 77,
    		width: 235,
    		left: 23
  	},
  	passwordTemp: {
    		top: 147,
    		width: 235,
    		left: 23
  	},
  	confirmPasswordTemp: {
    		top: 218,
    		width: 291
  	},
  	signUpUserInput: {
    		top: 312,
    		height: 267
  	},
  	signUpContainer: {
    		borderRadius: 30,
    		height: 56,
    		left: 0,
    		top: 0
  	},
  	confirmPasswordTemp1: {
    		top: 6,
    		left: 116,
    		color: "#fff",
    		width: 120,
    		height: 43,
    		fontWeight: "500",
    		fontSize: 30,
    		textAlign: "left"
  	},
  	signUpButton: {
    		top: 648,
    		left: 39
  	},
  	alreadyHaveAn: {
    		left: 84,
    		width: 212,
    		fontFamily: "Quicksand-Regular",
    		fontSize: 17,
    		top: 830
  	},
  	signIn: {
    		left: 280,
    	    textDecorationLine: "underline",
    		fontWeight: "600",
    		fontFamily: "Quicksand-SemiBold",
    		width: 71
  	},
  	continueWithGoogle: {
    		left: 63,
    		color: "#32373d",
    		width: 265,
    		top: 10,
    		fontFamily: "Quicksand-Medium",
    		fontWeight: "500",
    		position: "absolute",
    		height: 43
  	},
  	googleLogoIcon: {
    		left: 8,
    		width: 47,
    		top: 10
  	},
  	googleSignInButton: {
    		top: 758,
    		left: 39
  	},
  	or: {
    		left: 153,
    		width: 33,
    		fontSize: 25,
    		textAlign: "left",
    		color: "#000",
    		height: 36,
    		opacity: 0.3,
    		fontFamily: "Quicksand-Regular",
    		top: 0
  	},
  	orSeperatorChild: {
    		left: 0
  	},
  	orSeperatorItem: {
    		left: 190
  	},
  	orSeperator: {
    		top: 713,
    		left: 45,
    		width: 335
  	},
  	backButtonChild: {
    		top: 19,
    		left: 12,
    		maxHeight: "100%",
    		width: 23,
    		position: "absolute"
  	},
  	backButtonItem: {
    		backgroundColor: "rgba(189, 224, 254, 0.35)",
    		borderWidth: 1,
    		borderColor: "#343a40",
    		borderStyle: "solid",
    		height: 38,
    		width: 108,
    		borderRadius: 30,
    		left: 0,
    		top: 0
  	},
  	back: {
    		top: 5,
    		fontSize: 23,
    		width: 54,
    		height: 29,
    		textAlign: "left",
    		color: "#343a40",
    		left: 39
  	},
  	backButton: {
    		top: 77,
    		left: 39
  	},
  	lenditSignUpIphone: {
    		backgroundColor: "#fff",
    		flex: 1,
    		width: "100%",
    		overflow: "hidden",
    		height: 932
  	}
});

// Export the SignupScreen component as the default export
export default SignupScreen;
