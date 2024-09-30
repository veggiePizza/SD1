import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import {
    CompositeNavigationProp,
    CompositeScreenProps,
    NavigatorScreenParams,
} from "@react-navigation/native";
import {
    NativeStackNavigationProp,
    NativeStackScreenProps,
} from "@react-navigation/native-stack";

// Define the parameter lists for various stack navigators
export type AuthStackParamList = {
    Welcome: undefined;
    SignIn: undefined;
    SignUp: undefined;
};

export type RootBottomTabParamList = {
    SearchStack: NavigatorScreenParams<SearchStackParamList>;
    Wishlist: NavigatorScreenParams<WishListStackParamList>;
    Bookings: NavigatorScreenParams<BookingsStackParamList>;
    Messages: NavigatorScreenParams<MessagesStackParamList>;
    Profile: NavigatorScreenParams<ProfileStackParamList>;
};

// Search
export type SearchStackParamList = {
    Search: undefined;
    SearchResult: { query: string };
    ToolDetails: { toolID: string };
    MapView: undefined; // Optional map view for tools
};

// Wishlist
export type WishListStackParamList = {
    Wishlist: undefined;
    WishlistDetails: { propertyId: string };
};

// Bookings
export type BookingsStackParamList = {
    CurrentBookings: undefined;
    PastBookings: undefined;
    BookingDetails: { bookingId: string };
};

// Messages
export type MessagesStackParamList = {
    Inbox: undefined;
    Chat: undefined // Chat with specific host
};

// Profile
export type ProfileStackParamList = {
    ProfileOverview: undefined;
    PersonalInformation: undefined;
    PaymentMethods: undefined;
    AccountSettings: undefined;
    Reviews: undefined;
};

export type AppStackParamList = {
    Root: NavigatorScreenParams<RootBottomTabParamList>;
    Settings: undefined;
};

export type RootStackParamList = {
    AppStack: NavigatorScreenParams<AppStackParamList>;
    AuthStack: NavigatorScreenParams<AuthStackParamList>;
};

declare global {
    namespace ReactNavigation {
        interface RootParamList extends RootStackParamList {}
    }
}

// Define composite navigation and screen prop types
export type AuthScreenNavigationType<
    RouteName extends keyof AuthStackParamList
> = CompositeNavigationProp<
    NativeStackNavigationProp<AuthStackParamList, RouteName>,
    NativeStackNavigationProp<AppStackParamList, "Root">
>;

export type RootTabScreenProps<Screen extends keyof RootBottomTabParamList> =
    CompositeScreenProps<
        BottomTabScreenProps<RootBottomTabParamList, Screen>,
        NativeStackScreenProps<RootBottomTabParamList>
    >;

export type SearchScreenNavigationType = NativeStackNavigationProp<SearchStackParamList>;
export type ProfileScreenNavigationType = NativeStackNavigationProp<ProfileStackParamList>;
export type WishListNavigationType = NativeStackNavigationProp<WishListStackParamList>;
export type BookingsNavigationType = NativeStackNavigationProp<BookingsStackParamList>;
export type MessagesNavigationType = NativeStackNavigationProp<MessagesStackParamList>;

