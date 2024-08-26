import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { TamaguiProvider, createTamagui } from '@tamagui/core';
import { config } from '@tamagui/config/v3';
import Navigation from "./src/navigation";
import {SafeAreaProvider} from "react-native-safe-area-context";

const tamaguiConfig = createTamagui(config);

type Conf = typeof tamaguiConfig;

const Stack = createStackNavigator();


export default function App() {
    return (
        <TamaguiProvider config={tamaguiConfig}>
            <SafeAreaProvider>
                <Navigation/>
            </SafeAreaProvider>
        </TamaguiProvider>
    );
}
