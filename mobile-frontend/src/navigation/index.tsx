// Important configuration file that determines which navigation stack the user should be directed to

// Import necessary modules from React and React Navigation libraries
import { NavigationContainer } from "@react-navigation/native";
import React, { useEffect, useState } from "react";

// Import the stack navigators for authenticated and unauthenticated states
import AppStackNavigator from "./AppStackNavigator";
import AuthStackNavigator from "./AuthStackNavigator";

// Import Firebase authentication functions and types
import { onAuthStateChanged, User } from "firebase/auth";
import { authInstance } from "../services/firebase";

// Import NavigationContext to control which screen loads initially based on authentication status
import { NavigationContext } from './navigationContext';

const Navigation = () => {
    // State to track if the user is authenticated
    const [isAuthenticated, setIsAuthenticated] = useState(false); // Initial state set to false

    useEffect(() => {
        // Subscribe to authentication state changes using Firebase's onAuthStateChanged
        const unsubscribe = onAuthStateChanged(authInstance, (user) => {
            // Set authentication state based on whether the user object exists
            setIsAuthenticated(!!user);

            // Logic to set the initial screen of the home stack based on the user's authentication status
            // If the user is authenticated, they go to 'Home'; if not, they may go to 'Onboard1' or 'TermsOfUse'
            // setInitialScreen(user ? 'Home' : 'Onboard1');
            // setInitialScreen(user ? 'Home' : 'TermsOfUse');
        });

        // Cleanup the subscription when the component is unmounted
        return () => unsubscribe();
    }, []);

    return (
        // Wrap the app's navigation within a NavigationContainer
        <NavigationContainer>
            {/* Conditionally render the appropriate stack navigator based on authentication state */}
            {isAuthenticated ? <AppStackNavigator /> : <AuthStackNavigator />}
        </NavigationContainer>
    );
};

// Export the Navigation component as the default export
export default Navigation;
