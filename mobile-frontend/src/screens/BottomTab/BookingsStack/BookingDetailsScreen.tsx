// BookingDetailsScreen.tsx
import React from "react";
import { View, Text } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import {BookingsStackParamList} from "../../../navigation/types";


type BookingDetailsProps = NativeStackScreenProps<BookingsStackParamList, 'BookingDetails'>;

const BookingDetailsScreen: React.FC<BookingDetailsProps> = ({ route }) => {
    return (
        <View>
            <Text>Hi, you are on the Booking Details screen!</Text>
        </View>
    );
};

export default BookingDetailsScreen;
