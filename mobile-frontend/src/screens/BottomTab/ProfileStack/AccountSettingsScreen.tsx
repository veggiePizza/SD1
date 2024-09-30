// AccountSettingsScreen.tsx
import React from "react";
import { View, Text } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import {ProfileStackParamList} from "../../../navigation/types";


type AccountSettingsProp = NativeStackScreenProps<ProfileStackParamList, 'AccountSettings'>;

const AccountSettingsScreen: React.FC<AccountSettingsProp> = ({route}) => {
    return (
        <View>
            <Text>Hi, you are on the Account Settings screen!</Text>
        </View>
    );
};

export default AccountSettingsScreen;
