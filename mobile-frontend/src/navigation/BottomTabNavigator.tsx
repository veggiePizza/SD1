// Import necessary modules from React Navigation libraries
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"

// Import stack navigator for the Home screen
import HomeStackNavigator from "./HomeStackNavigator"

// Import the type definitions for the bottom tab navigator's parameter list
import { RootBottomTabParamList } from "./types"

// Import the Home screen component, which will be reused for different tabs
import homeScreen from "../screens/Home/HomeScreen"

// Create a bottom tab navigator with type safety using the RootBottomTabParamList type
const Tab = createBottomTabNavigator<RootBottomTabParamList>()

// Define the main bottom tab navigator component for the app
const BottomTabNavigator = () => {

    return (
        // Initialize the bottom tab navigator
        <Tab.Navigator>
            {/* Define the 'HomeStack' tab, which uses the HomeStackNavigator component */}
            <Tab.Screen
                name="HomeStack"
                component={HomeStackNavigator}
                options={() => ({
                    // Set the title for this tab and hide the header
                    title: "Home",
                    headerShown: false,
                })}
            />
            {/* Define the 'Completed' tab, reusing the HomeScreen component */}
            <Tab.Screen
                name="Completed"
                component={homeScreen}
                options={() => ({
                    // Set the title for this tab and hide the header
                    title: "Completed",
                    headerShown: false,
                })}
            />
            {/* Define the 'Today' tab, also reusing the HomeScreen component */}
            <Tab.Screen
                name="Today"
                component={homeScreen}
                options={() => ({
                    // Set the title for this tab and hide the header
                    title: "Today",
                    headerShown: false,
                })}
            />
        </Tab.Navigator>
    )
}

// Export the BottomTabNavigator component as the default export
export default BottomTabNavigator
