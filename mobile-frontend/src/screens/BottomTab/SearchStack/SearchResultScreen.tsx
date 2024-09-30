// SearchResultScreen.tsx
import React from "react";
import { View, Text } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import {SearchStackParamList} from "../../../navigation/types";


type SearchResultProp = NativeStackScreenProps<SearchStackParamList, 'SearchResult'>;

const SearchResultScreen: React.FC<SearchResultProp> = ({route}) => {
    return (
        <View>
            <Text>Hi, you are on the Search Result screen!</Text>
        </View>
    );
};

export default SearchResultScreen;