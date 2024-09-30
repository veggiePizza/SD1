// Import necessary modules from React and React Navigation libraries
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import React from "react"

// Import the type definitions for the Home stack navigator's parameter list
import { SearchStackParamList } from "../types"

// Import the Home screen component, which will be used in multiple screens within this stack
import HomeScreen from "../../screens/Home/HomeScreen"
import SearchScreen from "../../screens/BottomTab/SearchStack/SearchScreen";
import SearchResultScreen from "../../screens/BottomTab/SearchStack/SearchResultScreen";
import ToolDetailsScreen from "../../screens/BottomTab/SearchStack/ToolDetailsScreen";


// Create a native stack navigator with type safety using the HomeStackParamList type
const Stack = createNativeStackNavigator<SearchStackParamList>()

// Define the stack navigator component for the Home section of the app
const SearchStackNavigator = () => {
    return (
        // Initialize the stack navigator
        <Stack.Navigator>
            {/* Define the 'Home' screen in the stack, using the HomeScreen component */}
            <Stack.Screen
                name="Search"
                component={SearchScreen}
                options={{
                    // Disable the header for this screen
                    headerShown: false,
                }}
            />
            {/* Define the 'Profile' screen in the stack, reusing the HomeScreen component */}
            <Stack.Screen
                name="SearchResult"
                component={SearchResultScreen}
                options={{
                    // Disable the header for this screen
                    headerShown: false,
                }}
            />
            <Stack.Screen
                name="ToolDetails"
                component={ToolDetailsScreen}
                options={{
                    // Disable the header for this screen
                    headerShown: false,
                }}
            />
        </Stack.Navigator>
    )
}

// Export the HomeStackNavigator component as the default export
export default SearchStackNavigator
