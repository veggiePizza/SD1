// Import necessary modules and components from React, Tamagui, and React Navigation libraries
import React from 'react';
import { Button, Input, Stack, Text, YStack } from 'tamagui';
import { useNavigation } from '@react-navigation/native';
import { Alert } from 'react-native';
import { AuthScreenNavigationType } from "../../navigation/types";
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { useForm, Controller } from 'react-hook-form';
import { authInstance } from "../../services/firebase"

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
        <YStack f={1} ai="center" jc="center" p="$4" bg="$background">
            {/* Title for the signup screen */}
            <Text
                fontFamily="$heading"
                fontSize="$6"
                color="$color"
                mb="$4"
            >
                Create Account
            </Text>
            {/* Form stack to contain input fields */}
            <Stack width="100%">
                {/* Full Name Input */}
                <Controller
                    control={control}
                    name="name"
                    render={({ field: { onChange, onBlur, value } }) => (
                        <Input
                            placeholder="Full Name"
                            p="$3"
                            bg="$background"
                            borderColor="$borderColor"
                            onChangeText={onChange}
                            onBlur={onBlur}
                            value={value}
                        />
                    )}
                />
                {/* Display validation error if the name field is empty */}
                {errors.name && <Text color="$red">Name is required</Text>}

                {/* Email Input */}
                <Controller
                    control={control}
                    name="email"
                    render={({ field: { onChange, onBlur, value } }) => (
                        <Input
                            placeholder="Email"
                            p="$3"
                            bg="$background"
                            borderColor="$borderColor"
                            onChangeText={onChange}
                            onBlur={onBlur}
                            value={value}
                        />
                    )}
                />
                {/* Display validation error if the email field is empty */}
                {errors.email && <Text color="$red">Email is required</Text>}

                {/* Password Input */}
                <Controller
                    control={control}
                    name="password"
                    render={({ field: { onChange, onBlur, value } }) => (
                        <Input
                            placeholder="Password"
                            p="$3"
                            bg="$background"
                            borderColor="$borderColor"
                            secureTextEntry // Masks the password input
                            onChangeText={onChange}
                            onBlur={onBlur}
                            value={value}
                        />
                    )}
                />
                {/* Display validation error if the password field is empty */}
                {errors.password && <Text color="$red">Password is required</Text>}

                {/* Confirm Password Input */}
                <Controller
                    control={control}
                    name="confirmPassword"
                    render={({ field: { onChange, onBlur, value } }) => (
                        <Input
                            placeholder="Confirm Password"
                            p="$3"
                            bg="$background"
                            borderColor="$borderColor"
                            secureTextEntry // Masks the confirm password input
                            onChangeText={onChange}
                            onBlur={onBlur}
                            value={value}
                        />
                    )}
                />
                {/* Display validation error if the confirm password field is empty */}
                {errors.confirmPassword && <Text color="$red">Confirm Password is required</Text>}
            </Stack>

            {/* Submit Button */}
            <Button
                size="$4"
                width="100%"
                mt="$4"
                onPress={handleSubmit(onSubmit)} // Handle form submission
            >
                Sign Up
            </Button>

            {/* Link to navigate to the Sign In screen */}
            <Text mt="$3" color="$colorLight">
                Already have an account?{' '}
                <Text
                    onPress={() => navigation.navigate("SignIn")}
                >
                    Sign In
                </Text>
            </Text>

            {/* Link to navigate back to the Welcome screen */}
            <Text mt="$3" color="$colorLight">
                <Text
                    onPress={() => navigation.navigate("Welcome")}
                >
                    Back to Welcome
                </Text>
            </Text>
        </YStack>
    );
};

// Export the SignupScreen component as the default export
export default SignupScreen;
