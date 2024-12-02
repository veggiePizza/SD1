import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { SearchStackParamList } from "../../../navigation/types";

type ToolDetailsProp = NativeStackScreenProps<SearchStackParamList, 'ToolDetails'>;

const ToolDetailsScreen: React.FC<ToolDetailsProp> = ({ route }) => {
    // Extracting tool details from the route params
    const { tool } = route.params;

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.title}>{tool.name}</Text>
            <Text style={styles.subtitle}>Description</Text>
            <Text style={styles.text}>{tool.description}</Text>

            <Text style={styles.subtitle}>Price</Text>
            <Text style={styles.text}>${tool.price}</Text>

            <Text style={styles.subtitle}>Location</Text>
            <Text style={styles.text}>{tool.address}</Text>
            <Text style={styles.text}>{tool.city}, {tool.state}, {tool.country}</Text>

            <Text style={styles.subtitle}>Coordinates</Text>
            <Text style={styles.text}>Latitude: {tool.lat}</Text>
            <Text style={styles.text}>Longitude: {tool.lng}</Text>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    subtitle: {
        fontSize: 18,
        fontWeight: '600',
        marginTop: 20,
    },
    text: {
        fontSize: 16,
        marginVertical: 5,
    },
});

export default ToolDetailsScreen;
