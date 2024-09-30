// Import necessary modules from React and React Navigation libraries
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import React from "react"

// Import the type definitions for the Home stack navigator's parameter list
import {SearchStackParamList, WishListStackParamList} from "../types"

// Import the Home screen component, which will be used in multiple screens within this stack
import WishListScreen from "../../screens/BottomTab/WishlistStack/WishListScreen";
import WishListDetailsScreen from "../../screens/BottomTab/WishlistStack/WishListDetailsScreen";

// Create a native stack navigator with type safety using the HomeStackParamList type
const Stack = createNativeStackNavigator<WishListStackParamList>()

// Define the stack navigator component for the Home section of the app
const WishListStackNavigator = () => {
    return (
        // Initialize the stack navigator
        <Stack.Navigator>
            {/* Define the 'Home' screen in the stack, using the HomeScreen component */}
            <Stack.Screen
                name="Wishlist"
                component={WishListScreen}
                options={{
                    // Disable the header for this screen
                    headerShown: false,
                }}
            />
            <Stack.Screen
                name="WishlistDetails"
                component={WishListDetailsScreen}
                options={{
                    // Disable the header for this screen
                    headerShown: false,
                }}
            />
            {/* Define the 'Profile' screen in the stack, reusing the HomeScreen component */}
        </Stack.Navigator>
    )
}

// Export the HomeStackNavigator component as the default export
export default WishListStackNavigator
