import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { TamaguiProvider, createTamagui } from '@tamagui/core';
import { config } from '@tamagui/config/v3';
import { SafeAreaView } from "react-native";
import Demo from "./button";
import Navigation from "./src/navigation";
import {SafeAreaProvider} from "react-native-safe-area-context";

const tamaguiConfig = createTamagui(config);

type Conf = typeof tamaguiConfig;
declare module '@tamagui/core' {
    interface TamaguiCustomConfig extends Conf {}
}

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
