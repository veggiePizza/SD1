// Import necessary modules from React and React Navigation libraries
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import React from "react"

// Import the type definitions for the Home stack navigator's parameter list
import {ProfileStackParamList} from "../types"

// Import the Home screen component, which will be used in multiple screens within this stack
import HomeScreen from "../../screens/Home/HomeScreen"
import AccountSettingsScreen from "../../screens/BottomTab/ProfileStack/AccountSettingsScreen";
import PaymentMethodsScreen from "../../screens/BottomTab/ProfileStack/PaymentMethodsScreen";
import PersonalInformationScreen from "../../screens/BottomTab/ProfileStack/PersonalInformationScreen";
import ReviewsScreen from "../../screens/BottomTab/ProfileStack/ReviewsScreen";
import ProfileOverViewScreen from "../../screens/BottomTab/ProfileStack/ProfileOverviewScreen";
import firebase from "firebase/compat";

// Create a native stack navigator with type safety using the HomeStackParamList type
const Stack = createNativeStackNavigator<ProfileStackParamList>()


// Define the stack navigator component for the Home section of the app
const ProfileStackNavigator = () => {
    return (
        // Initialize the stack navigator
        <Stack.Navigator>
            {/* Define the 'Home' screen in the stack, using the HomeScreen component */}
            <Stack.Screen
                name="ProfileOverview"
                component={ProfileOverViewScreen}
                options={{
                    // Disable the header for this screen
                    headerShown: false,
                }}
            />
            {/* Define the 'Profile' screen in the stack, reusing the HomeScreen component */}
            <Stack.Screen
                name="PersonalInformation"
                component={PersonalInformationScreen}
                options={{
                    // Disable the header for this screen
                    headerShown: false,
                }}
            />
            <Stack.Screen
                name="PaymentMethods"
                component={PaymentMethodsScreen}
                options={{
                    // Disable the header for this screen
                    headerShown: false,
                }}
            />
            <Stack.Screen
                name="AccountSettings"
                component={AccountSettingsScreen}
                options={{
                    // Disable the header for this screen
                    headerShown: false,
                }}
            />
            <Stack.Screen
                name="Reviews"
                component={ReviewsScreen}
                options={{
                    // Disable the header for this screen
                    headerShown: false,
                }}
            />
        </Stack.Navigator>
    )
}

export default ProfileStackNavigator
