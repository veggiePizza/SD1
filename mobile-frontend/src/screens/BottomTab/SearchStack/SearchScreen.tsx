// SearchScreen.tsx
import React from "react";
import { View, Text } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import {SearchStackParamList} from "../../../navigation/types";


type SearchProps = NativeStackScreenProps<SearchStackParamList, 'Search'>;

const SearchScreen: React.FC<SearchProps> = ({route}) => {
    return (
        <View>
            <Text>Hi, you are on the Search screen!</Text>
        </View>
    );
};

export default SearchScreen;


