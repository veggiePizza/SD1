// CurrentBookingsScreen.tsx
import React, { useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet, ActivityIndicator, Alert, TouchableOpacity } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { BookingsStackParamList } from "../../../navigation/types";
import { getAuth } from "firebase/auth";
import { useIsFocused } from "@react-navigation/native";
import Config from "react-native-config";

const apiBaseUrl = Config.REACT_APP_API_BASE_URL;
console.log(apiBaseUrl);

type CurrentBookingsProps = NativeStackScreenProps<BookingsStackParamList, 'CurrentBookings'>;

interface Reservation {
    id: number;
    startDate: string;
    endDate: string;
    Tool: {
        name: string;
        price: number;
    };
}

const CurrentBookingsScreen: React.FC<CurrentBookingsProps> = ({ navigation }) => {
    const [reservations, setReservations] = useState<Reservation[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const isFocused = useIsFocused();

    useEffect(() => {
        const fetchReservations = async () => {
            try {
                const user = getAuth().currentUser;
                if (!user) {
                    Alert.alert('Error', 'User not authenticated');
                    return;
                }

                const idToken = await user.getIdToken();

                const response = await fetch(`IPADDRESS:8000/api/reservations/current`, {
                    headers: {
                        'Authorization': `Bearer ${idToken}`,
                    },
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch reservations');
                }

                const data = await response.json();
                setReservations(data.Reservations);
            } catch (error: unknown) {
                if (error instanceof Error) {
                    setError(error.message);
                } else {
                    setError('An unexpected error occurred');
                }
            } finally {
                setLoading(false);
            }
        };

        if (isFocused) {
            fetchReservations();
        }
    }, [isFocused]);

    const renderReservation = ({ item }: { item: Reservation }) => (
        <View style={styles.reservationContainer}>
            <Text style={styles.toolName}>{item.Tool.name}</Text>
            <Text>Price: ${item.Tool.price}</Text>
            <Text>Start Date: {new Date(item.startDate).toLocaleDateString()}</Text>
            <Text>End Date: {new Date(item.endDate).toLocaleDateString()}</Text>

            <TouchableOpacity
                onPress={() =>
                    navigation.navigate('BookingDetails', { reservationId: item.id })
                }
            >
                <Text style={styles.detailsButton}>View Details</Text>
            </TouchableOpacity>
        </View>
    );

    if (loading) {
        return (
            <View style={styles.centered}>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        );
    }

    if (error) {
        return (
            <View style={styles.centered}>
                <Text style={styles.errorText}>{error}</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Your Current Bookings</Text>
            {reservations.length > 0 ? (
                <FlatList
                    data={reservations}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={renderReservation}
                />
            ) : (
                <Text style={styles.noBookingsText}>You have no current bookings.</Text>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 16,
    },
    header: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 16,
    },
    reservationContainer: {
        backgroundColor: "#f9f9f9",
        padding: 16,
        marginBottom: 12,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: "#ddd",
    },
    toolName: {
        fontSize: 18,
        fontWeight: "bold",
    },
    detailsButton: {
        marginTop: 8,
        color: "blue",
        textDecorationLine: "underline",
    },
    centered: {
        justifyContent: "center",
        alignItems: "center",
        flex: 1,
    },
    errorText: {
        color: "red",
        fontSize: 16,
    },
    noBookingsText: {
        fontSize: 16,
        textAlign: "center",
        color: "#777",
    },
});

export default CurrentBookingsScreen;
