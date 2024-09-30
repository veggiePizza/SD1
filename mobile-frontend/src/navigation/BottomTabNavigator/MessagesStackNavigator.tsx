// Import necessary modules from React and React Navigation libraries
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import React from "react"

// Import the type definitions for the Home stack navigator's parameter list
import {MessagesStackParamList} from "../types"

// Import the Home screen component, which will be used in multiple screens within this stack
import InboxScreen from "../../screens/BottomTab/MessageStack/InboxScreen";
import ChatScreen from "../../screens/BottomTab/MessageStack/ChatScreen";

// Create a native stack navigator with type safety using the HomeStackParamList type
const Stack = createNativeStackNavigator<MessagesStackParamList>()

// Define the stack navigator component for the Home section of the app
const MessageStackNavigator = () => {
    return (
        // Initialize the stack navigator
        <Stack.Navigator>
            {/* Define the 'Home' screen in the stack, using the HomeScreen component */}
            <Stack.Screen
                name="Inbox"
                component={InboxScreen}
                options={{
                    // Disable the header for this screen
                    headerShown: false,
                }}
            />
            <Stack.Screen
                name="Chat"
                component={ChatScreen}
                options={{
                    // Disable the header for this screen
                    headerShown: false,
                }}
            />

        </Stack.Navigator>
    )
}

// Export the HomeStackNavigator component as the default export
export default MessageStackNavigator
