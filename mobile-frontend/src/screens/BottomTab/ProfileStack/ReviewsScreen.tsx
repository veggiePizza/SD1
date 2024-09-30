// ReviewsScreen.tsx
import React from "react";
import { View, Text } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import {ProfileStackParamList} from "../../../navigation/types";


type ReviewsProp = NativeStackScreenProps<ProfileStackParamList, 'Reviews'>;

const ReviewsScreen: React.FC<ReviewsProp> = ({route}) => {
    return (
        <View>
            <Text>Hi, you are on the Reviews screen!</Text>
        </View>
    );
};

export default ReviewsScreen;
