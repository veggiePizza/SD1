// Import necessary modules from React and React Navigation libraries
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import React from "react"

// Import the BottomTabNavigator component which will be used as a screen in the stack
import BottomTabNavigator from "./BottomTabNavigator"

// Import the type definitions for the stack navigator's parameter list
import { AppStackParamList } from "./types"

// Create a native stack navigator with type safety using the AppStackParamList type
const Stack = createNativeStackNavigator<AppStackParamList>()

// Define the main stack navigator component for the app
const AppStackNavigator = () => {
    return (
        // Initialize the stack navigator
        <Stack.Navigator>
            {/* Define the 'Root' screen in the stack, which uses the BottomTabNavigator component */}
            <Stack.Screen
                name="Root"
                component={BottomTabNavigator}
                options={{
                    // Disable the header for this screen
                    headerShown: false,
                }}
            />
        </Stack.Navigator>
    )
}

// Export the AppStackNavigator component as the default export
export default AppStackNavigator
