import React from 'react';
import { Button, Text, YStack, Stack } from 'tamagui';
import { useNavigation } from '@react-navigation/native';
import { AuthScreenNavigationType } from "../../navigation/types";

const WelcomeScreen = () => {
    const navigation = useNavigation<AuthScreenNavigationType<"Welcome">>(); // Navigation setup

    return (
        <YStack f={1} ai="center" jc="center" p="$4" bg="$background">
            <Text
                fontFamily="$heading"
                fontSize="$7"
                color="$color"
                mb="$4"
                textAlign="center"
            >
                Welcome to Our App!
            </Text>
            <Text
                fontFamily="$body"
                fontSize="$4"
                color="$colorLight"
                mb="$6"
                textAlign="center"
            >
                Your one-stop solution for renting tools and finding renters!
            </Text>
            <Stack space="$4" width="100%" maxWidth={400}>
                <Button
                    size="$5"
                    width="100%"
                    onPress={() => navigation.navigate("SignUp")}
                >
                    Sign Up
                </Button>
                <Button
                    size="$5"
                    width="100%"
                    onPress={() => navigation.navigate("SignIn")}
                >
                    Sign In
                </Button>
            </Stack>
        </YStack>
    );
};

export default WelcomeScreen;

