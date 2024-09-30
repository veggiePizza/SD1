// Import necessary modules and components from React, Tamagui, React Navigation, Firebase, and React Native
import React from 'react';
import { Button, Input, Stack, Text, YStack } from 'tamagui';
import { useNavigation } from '@react-navigation/native';
import { AuthScreenNavigationType } from "../../../navigation/types";
import { useForm, Controller } from 'react-hook-form';
import { Alert } from 'react-native';
import { signInWithEmailAndPassword } from 'firebase/auth'; // Import the signIn function from Firebase
import { authInstance } from "../../../services/firebase"; // Import Firebase authentication instance
import FigmaSignInScreen from './FigmaSignInScreen';

// Define an interface to type the form data for user sign-in
interface IUser {
    email: string;
    password: string;
}

// Define the SignInScreen component
const SignInScreen = () => {
    // Use the useNavigation hook to get access to the navigation prop with typed routes
    const navigation = useNavigation<AuthScreenNavigationType<"SignIn">>();

    // Initialize react-hook-form with default values for the form fields
    const { control, handleSubmit, formState: { errors } } = useForm<IUser>({
        defaultValues: {
            email: "",
            password: "",
        },
    });

    // Error handling function to display an alert if the form submission fails
    const onError = (errors: any, e: any) => {
        console.log(errors, e);
        Alert.alert("Submission Failed", "Please check your input and try again.");
    };

    // Function to handle form submission
    const onSubmit = async (data: IUser) => {
        try {
            const { email, password } = data;
            await loginWithEmailAndPassword(email, password); // Attempt to log in the user
            // Navigate to the next screen after successful login in loginWithEmailAndPassword
        } catch (error) {
            console.log("Error submitting form:", error);
        }
    };

    // Function to handle user login with email and password
    const loginWithEmailAndPassword = async (email: string, password: string) => {
        try {
            const userCredential = await signInWithEmailAndPassword(authInstance, email, password);
            const user = userCredential.user;
            console.log('User logged in:', user);
            // Navigate to the next screen after successful login
            // Example: navigation.navigate("Home"); // Uncomment and replace with the actual route
        } catch (error) {
            console.log('Error signing in:', error);
            Alert.alert("Login Failed", "An error occurred during login. Please check your credentials and try again.");
            throw error; // Re-throw the error so that it can be caught in the onSubmit function
        }
    };

    // Render the sign-in form
    return (
        <FigmaSignInScreen/>
        // <YStack f={1} ai="center" jc="center" p="$4" bg="$background">
        //     {/* Title for the sign-in screen */}
        //     <Text
        //         fontFamily="$heading"
        //         fontSize="$6"
        //         color="$color"
        //         mb="$4"
        //     >
        //         Sign In
        //     </Text>
        //     {/* Form stack to contain input fields */}
        //     <Stack space="$3" width="100%">
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
        //     </Stack>

        //     {/* Sign-In Button */}
        //     <Button
        //         size="$4"
        //         width="100%"
        //         mt="$4"
        //         onPress={handleSubmit(onSubmit, onError)} // Handle form submission
        //     >
        //         Sign In
        //     </Button>

        //     {/* Link to navigate to the Sign Up screen */}
        //     <Text mt="$3" color="$colorLight">
        //         Don’t have an account?{' '}
        //         <Text
        //             onPress={() => navigation.navigate("SignUp")}
        //         >
        //             Sign Up
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

// Export the SignInScreen component as the default export
export default SignInScreen;
