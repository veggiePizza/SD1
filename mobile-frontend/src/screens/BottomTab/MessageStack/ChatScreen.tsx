// ChatScreen.tsx
import React from "react";
import { View, Text } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import {MessagesStackParamList} from "../../../navigation/types";


type ChatScreenProps = NativeStackScreenProps<MessagesStackParamList, 'Chat'>;

const ChatScreen: React.FC<ChatScreenProps> = ({route}) => {
    return (
        <View>
            <Text>Hi, you are on the Chat screen!</Text>
        </View>
    );
};

export default ChatScreen;

