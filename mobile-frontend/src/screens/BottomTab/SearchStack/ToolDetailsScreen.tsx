// ToolDetailsScreen.tsx
import React from "react";
import { View, Text } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import {SearchStackParamList} from "../../../navigation/types";


type ToolDetailsProp = NativeStackScreenProps<SearchStackParamList, 'ToolDetails'>;

const ToolDetailsScreen: React.FC<ToolDetailsProp> = ({route}) => {
    return (
        <View>
            <Text>Hi, you are on the Tool Details screen!</Text>
        </View>
    );
};

export default ToolDetailsScreen;