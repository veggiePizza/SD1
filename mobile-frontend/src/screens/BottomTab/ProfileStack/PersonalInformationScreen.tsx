// PersonalInformationScreen.tsx
import React from "react";
import { View, Text } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import {ProfileStackParamList} from "../../../navigation/types";


type PersonalInformationProp = NativeStackScreenProps<ProfileStackParamList, 'PersonalInformation'>;

const PersonalInformationScreen: React.FC<PersonalInformationProp> = ({route}) => {
    return (
        <View>
            <Text>Hi, you are on the Personal information screen!</Text>
        </View>
    );
};

export default PersonalInformationScreen;
