// Import necessary modules from React and React Navigation libraries
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import React from "react"

// Import the type definitions for the Home stack navigator's parameter list
import { HomeStackParamList } from "./types"

// Import the Home screen component, which will be used in multiple screens within this stack
import HomeScreen from "../screens/Home/HomeScreen"

// Create a native stack navigator with type safety using the HomeStackParamList type
const Stack = createNativeStackNavigator<HomeStackParamList>()

// Define the stack navigator component for the Home section of the app
const HomeStackNavigator = () => {
    return (
        // Initialize the stack navigator
        <Stack.Navigator>
            {/* Define the 'Home' screen in the stack, using the HomeScreen component */}
            <Stack.Screen
                name="Home"
                component={HomeScreen}
                options={{
                    // Disable the header for this screen
                    headerShown: false,
                }}
            />
            {/* Define the 'Profile' screen in the stack, reusing the HomeScreen component */}
            <Stack.Screen
                name="Profile"
                component={HomeScreen}
                options={{
                    // Disable the header for this screen
                    headerShown: false,
                }}
            />
        </Stack.Navigator>
    )
}

// Export the HomeStackNavigator component as the default export
export default HomeStackNavigator
