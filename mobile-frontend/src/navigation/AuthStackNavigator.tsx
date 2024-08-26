// Importing necessary modules and components from React and React Navigation
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";

// Importing the type definitions for the navigation stack parameters
import { AuthStackParamList } from "./types";

// Importing the screens used in the authentication flow
import WelcomeScreen from "../screens/Welcome/WelcomeScreen";
import SignInScreen from "../screens/SignIn/SignInScreen";
import SignUpScreen from "../screens/SignUp/SignUpScreen";

// Creating a stack navigator instance with type safety for the authentication stack
const Stack = createNativeStackNavigator<AuthStackParamList>();

/**
 * AuthStackNavigator Component:
 *
 * This component defines the navigation structure for the authentication-related screens.
 * It utilizes a native stack navigator to manage screen transitions.
 *
 * The stack navigator includes three screens:
 * 1. WelcomeScreen - The initial screen that welcomes the user.
 * 2. SignInScreen - The screen where users can log in.
 * 3. SignUpScreen - The screen where users can register.
 *
 * All screens have their headers hidden for a fullscreen experience.
 */
const AuthStackNavigator = () => {
    return (
        <Stack.Navigator>
            {/* Welcome Screen: This is the first screen users see. The header is hidden. */}
            <Stack.Screen
                name="Welcome"
                options={{
                    headerShown: false,
                }}
                component={WelcomeScreen}
            />

            {/* SignIn Screen: This screen allows users to log in. The header is hidden. */}
            <Stack.Screen
                name="SignIn"
                options={{
                    headerShown: false,
                }}
                component={SignInScreen}
            />

            {/* SignUp Screen: This screen allows users to sign up. The header is hidden. */}
            <Stack.Screen
                name="SignUp"
                options={{
                    headerShown: false,
                }}
                component={SignUpScreen}
            />
        </Stack.Navigator>
    );
};

// Exporting the AuthStackNavigator component as the default export
export default AuthStackNavigator;
