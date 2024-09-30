// WishListScreen.tsx
import React from "react";
import { View, Text } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import {WishListStackParamList} from "../../../navigation/types";


type WishListProps = NativeStackScreenProps<WishListStackParamList, 'Wishlist'>;

const WishListScreen: React.FC<WishListProps> = ({route}) => {
    return (
        <View>
            <Text>Hi, you are on the WishList screen!</Text>
        </View>
    );
};

export default WishListScreen;



