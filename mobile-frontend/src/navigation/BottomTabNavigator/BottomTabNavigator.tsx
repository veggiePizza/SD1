// Import necessary modules from React Navigation libraries
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";

// Import the type definitions for the bottom tab navigator's parameter list
import { RootBottomTabParamList } from "../types";

// Import stack navigators for each tab
import SearchStackNavigator from "./SearchStackNavigator";
import ProfileStackNavigator from "./ProfileStackNavigator";
import WishListStackNavigator from "./WishListStackNavigator";
import BookingsStackNavigator from "./BookingsStackNavigator";
import MessagesStackNavigator from "./MessagesStackNavigator";

// Create a bottom tab navigator with type safety using the RootBottomTabParamList type
const Tab = createBottomTabNavigator<RootBottomTabParamList>();

// Define the main bottom tab navigator component for the app
const BottomTabNavigator = () => {
    return (
        // Initialize the bottom tab navigator
        <Tab.Navigator>
            {/* Define the 'SearchStack' tab, which uses the SearchStackNavigator component */}
            <Tab.Screen
                name="SearchStack"
                component={SearchStackNavigator}
                options={{
                    title: "Search",
                    headerShown: false,
                }}
            />
            {/* Define the 'WishList' tab, which uses the WishListStackNavigator component */}
            <Tab.Screen
                name="Wishlist"
                component={WishListStackNavigator}
                options={{
                    title: "WishList",
                    headerShown: false,
                }}
            />
            {/* Define the 'Bookings' tab, which uses the BookingsStackNavigator component */}
            <Tab.Screen
                name="Bookings"
                component={BookingsStackNavigator}
                options={{
                    title: "Bookings",
                    headerShown: false,
                }}
            />
            {/* Define the 'Messages' tab, which uses the MessagesStackNavigator component */}
            <Tab.Screen
                name="Messages"
                component={MessagesStackNavigator}
                options={{
                    title: "Messages",
                    headerShown: false,
                }}
            />
            {/* Define the 'Profile' tab, which uses the ProfileStackNavigator component */}
            <Tab.Screen
                name="Profile"
                component={ProfileStackNavigator}
                options={{
                    title: "Profile",
                    headerShown: false,
                }}
            />
        </Tab.Navigator>
    );
};

// Export the BottomTabNavigator component as the default export
export default BottomTabNavigator;
