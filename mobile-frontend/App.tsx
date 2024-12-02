import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { TamaguiProvider, createTamagui } from '@tamagui/core';
import { config } from '@tamagui/config/v3';
import Navigation from './src/navigation';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StripeProvider } from '@stripe/stripe-react-native'; // Import StripeProvider

const tamaguiConfig = createTamagui(config);

type Conf = typeof tamaguiConfig;

const Stack = createStackNavigator();

// Your Stripe public key (replace with your actual key in production)
const STRIPE_PUBLISHABLE_KEY = "pk_test_51QPpCDJIgBnAqYt98eiynW1XabvY49KQxFq479lCSsNLvj1ZtZuYatVtdz74s6mNrKuJTLCQ0DxgPnMKZ1xDiNgc00OKMek2Fa"; // Make sure to replace with your own test publishable key

export default function App() {
    return (
        // Wrap the app in StripeProvider to provide context for Stripe operations
        <StripeProvider publishableKey={STRIPE_PUBLISHABLE_KEY}>
            <TamaguiProvider config={tamaguiConfig}>
                <SafeAreaProvider>
                    <Navigation />
                </SafeAreaProvider>
            </TamaguiProvider>
        </StripeProvider>
    );
}
