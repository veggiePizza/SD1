// InboxScreen.tsx
import React from "react";
import { View, Text } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import {MessagesStackParamList} from "../../../navigation/types";


type InboxScreenProps = NativeStackScreenProps<MessagesStackParamList, 'Inbox'>;

const InboxScreen: React.FC<InboxScreenProps> = ({route}) => {
    return (
        <View>
            <Text>Hi, you are on the Inbox screen!</Text>
        </View>
    );
};

export default InboxScreen;
