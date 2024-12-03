import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";
import { StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/Ionicons"; // Import your icon library

// Import stack navigators for each tab
import { RootBottomTabParamList } from "../types";
import SearchStackNavigator from "./SearchStackNavigator";
import ProfileStackNavigator from "./ProfileStackNavigator";
import WishListStackNavigator from "./WishListStackNavigator";
import BookingsStackNavigator from "./BookingsStackNavigator";
import MessagesStackNavigator from "./MessagesStackNavigator";

const Tab = createBottomTabNavigator<RootBottomTabParamList>();

const BottomTabNavigator = () => {
    return (
        <Tab.Navigator
            screenOptions={{
                tabBarStyle: styles.tabBarStyle,
                tabBarLabelStyle: styles.tabBarLabelStyle,
            }}
        >
            <Tab.Screen
                name="SearchStack"
                component={SearchStackNavigator}
                options={{
                    title: "Search",
                    headerShown: false,
                    tabBarIcon: ({ color, size }) => (
                        <Icon name="search" color={color} size={size} />
                    ),
                }}
            />
            <Tab.Screen
                name="Wishlist"
                component={WishListStackNavigator}
                options={{
                    title: "Wishlist",
                    headerShown: false,
                    tabBarIcon: ({ color, size }) => (
                        <Icon name="heart" color={color} size={size} />
                    ),
                }}
            />
            <Tab.Screen
                name="Bookings"
                component={BookingsStackNavigator}
                options={{
                    title: "Bookings",
                    headerShown: false,
                    tabBarIcon: ({ color, size }) => (
                        <Icon name="calendar" color={color} size={size} />
                    ),
                }}
            />
            <Tab.Screen
                name="Messages"
                component={MessagesStackNavigator}
                options={{
                    title: "Messages",
                    headerShown: false,
                    tabBarIcon: ({ color, size }) => (
                        <Icon name="chatbubble" color={color} size={size} />
                    ),
                }}
            />
            <Tab.Screen
                name="Profile"
                component={ProfileStackNavigator}
                options={{
                    title: "Profile",
                    headerShown: false,
                    tabBarIcon: ({ color, size }) => (
                        <Icon name="person" color={color} size={size} />
                    ),
                }}
            />
        </Tab.Navigator>
    );
};

const styles = StyleSheet.create({
    tabBarStyle: {
        height: 80,
        paddingBottom: 10,
        paddingTop: 10,
        backgroundColor: "#f8f8f8",
        borderTopWidth: 1,
        borderTopColor: "#e0e0e0",
    },
    tabBarLabelStyle: {
        fontSize: 14,
        fontWeight: "600",
    },
});

export default BottomTabNavigator;
