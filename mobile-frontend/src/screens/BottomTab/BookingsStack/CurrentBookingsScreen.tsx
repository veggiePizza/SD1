// CurrentBookingsScreen.tsx
import React from "react";
import { View, Text } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import {BookingsStackParamList} from "../../../navigation/types";


type CurrentBookingsProps = NativeStackScreenProps<BookingsStackParamList, 'CurrentBookings'>;

const CurrentBookingsScreen: React.FC<CurrentBookingsProps> = ({route}) => {
    return (
        <View>
            <Text>Hi, you are on the Current Bookings screen!</Text>
        </View>
    );
};

export default CurrentBookingsScreen;


