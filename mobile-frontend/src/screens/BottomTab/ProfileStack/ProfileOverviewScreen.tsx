// ProfileOverviewScreen.tsx
import React from "react";
import { View, Text } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import {ProfileStackParamList} from "../../../navigation/types";


type ProfileOverviewProp = NativeStackScreenProps<ProfileStackParamList, 'ProfileOverview'>;

const ProfileOverViewScreen: React.FC<ProfileOverviewProp> = ({route}) => {
    return (
        <View>
            <Text>Hi, you are on the Profile Overview screen!</Text>
        </View>
    );
};

export default ProfileOverViewScreen;
