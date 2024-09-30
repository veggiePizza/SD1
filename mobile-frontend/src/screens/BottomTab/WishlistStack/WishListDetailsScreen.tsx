// WishListDetailsScreen.tsx
import React from "react";
import { View, Text } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import {WishListStackParamList} from "../../../navigation/types";


type WishListDetailsProp = NativeStackScreenProps<WishListStackParamList, 'WishlistDetails'>;

const WishListDetailsScreen: React.FC<WishListDetailsProp> = ({route}) => {
    return (
        <View>
            <Text>Hi, you are on the WishList Details screen!</Text>
        </View>
    );
};

export default WishListDetailsScreen;

