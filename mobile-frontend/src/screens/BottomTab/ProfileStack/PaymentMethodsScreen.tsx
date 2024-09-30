// PaymentMethodsScreen.tsx
import React from "react";
import { View, Text } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import {ProfileStackParamList} from "../../../navigation/types";


type PaymentMethodsProp = NativeStackScreenProps<ProfileStackParamList, 'PaymentMethods'>;

const PaymentMethodsScreen: React.FC<PaymentMethodsProp> = ({route}) => {
    return (
        <View>
            <Text>Hi, you are on the Payment Methods screen!</Text>
        </View>
    );
};

export default PaymentMethodsScreen;
