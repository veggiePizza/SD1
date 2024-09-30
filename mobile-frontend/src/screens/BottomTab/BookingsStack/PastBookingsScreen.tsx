// PastBookingsScreen.tsx
import React from "react";
import { View, Text } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import {BookingsStackParamList} from "../../../navigation/types";


type PastBookingsProps = NativeStackScreenProps<BookingsStackParamList, 'PastBookings'>;

const PastBookingsScreen: React.FC<PastBookingsProps> = ({route}) => {
    return (
        <View>
            <Text>Hi, you are on the Past Bookings screen!</Text>
        </View>
    );
};

export default PastBookingsScreen;



