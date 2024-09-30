// Import necessary modules from React and React Navigation libraries
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import React from "react"

// Import the type definitions for the Home stack navigator's parameter list
import {BookingsStackParamList} from "../types"

// Import the Home screen component, which will be used in multiple screens within this stack
import CurrentBookingsScreen from "../../screens/BottomTab/BookingsStack/CurrentBookingsScreen";
import PastBookingsScreen from "../../screens/BottomTab/BookingsStack/PastBookingsScreen";
import BookingDetailsScreen from "../../screens/BottomTab/BookingsStack/BookingDetailsScreen";

// Create a native stack navigator with type safety using the HomeStackParamList type
const Stack = createNativeStackNavigator<BookingsStackParamList>()

// Define the stack navigator component for the Home section of the app
const BookingsStackNavigator = () => {
    return (
        // Initialize the stack navigator
        <Stack.Navigator>
            {/* Define the 'Home' screen in the stack, using the HomeScreen component */}
            <Stack.Screen
                name="CurrentBookings"
                component={CurrentBookingsScreen}
                options={{
                    // Disable the header for this screen
                    headerShown: false,
                }}
            />
            <Stack.Screen
                name="PastBookings"
                component={PastBookingsScreen}
                options={{
                    // Disable the header for this screen
                    headerShown: false,
                }}
            />
            <Stack.Screen
                name="BookingDetails"
                component={BookingDetailsScreen}
                options={{
                    // Disable the header for this screen
                    headerShown: false,
                }}
            />
        </Stack.Navigator>
    )
}

// Export the HomeStackNavigator component as the default export
export default BookingsStackNavigator
