// Import necessary types from React Navigation libraries
import { BottomTabScreenProps } from "@react-navigation/bottom-tabs"
import {
    CompositeNavigationProp,
    CompositeScreenProps,
    NavigatorScreenParams,
} from "@react-navigation/native"
import {
    NativeStackNavigationProp,
    NativeStackScreenProps,
} from "@react-navigation/native-stack"

// Define the parameter list for the authentication stack navigator
export type AuthStackParamList = {
    Welcome: undefined // Screen with no parameters
    SignIn: undefined  // Screen with no parameters
    SignUp: undefined  // Screen with no parameters
}

// Define the parameter list for the bottom tab navigator in the root stack
export type RootBottomTabParamList = {
    HomeStack: NavigatorScreenParams<HomeStackParamList> // Navigates to the Home stack
    Today: undefined                                    // Screen with no parameters
    Completed: undefined                                // Screen with no parameters
}

// Define the parameter list for the Home stack navigator
export type HomeStackParamList = {
    Home: undefined   // Screen with no parameters
    Profile: undefined // Screen with no parameters
}

// Define the parameter list for the main application stack navigator
export type AppStackParamList = {
    Root: NavigatorScreenParams<RootBottomTabParamList> // Navigates to the root bottom tab navigator
    Settings: undefined                                // Screen with no parameters
}

// Define the parameter list for the root stack navigator
export type RootStackParamList = {
    AppStack: NavigatorScreenParams<AppStackParamList> // Navigates to the app stack
    AuthStack: NavigatorScreenParams<AuthStackParamList> // Navigates to the authentication stack
}

// Extend the global ReactNavigation namespace to include the RootStackParamList
declare global {
    namespace ReactNavigation {
        interface RootParamList extends RootStackParamList {}
    }
}

// Define a composite navigation type for authentication screens
export type AuthScreenNavigationType<
    RouteName extends keyof AuthStackParamList
> = CompositeNavigationProp<
    NativeStackNavigationProp<AuthStackParamList, RouteName>, // Primary navigator
    NativeStackNavigationProp<AppStackParamList, "Root">      // Secondary navigator for the app stack
>

// Define a composite screen props type for the bottom tab screens
export type RootTabScreenProps<Screen extends keyof RootBottomTabParamList> =
    CompositeScreenProps<
        BottomTabScreenProps<RootBottomTabParamList, Screen>, // Primary props for bottom tab screens
        NativeStackScreenProps<RootBottomTabParamList>        // Secondary props for stack screens
    >

// Define a navigation type for screens in the Home stack
export type HomeScreenNavigationType =
    NativeStackNavigationProp<HomeStackParamList>
