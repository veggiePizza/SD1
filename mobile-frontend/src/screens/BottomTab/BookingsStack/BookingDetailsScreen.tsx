import React, { useState, useEffect } from "react";
import { View, Text, Button, StyleSheet, Alert, ActivityIndicator } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { BookingsStackParamList } from "../../../navigation/types";
import { getAuth } from "firebase/auth";
import DateTimePicker from '@react-native-community/datetimepicker';
import Config from 'react-native-config';

const apiBaseUrl = Config.REACT_APP_API_BASE_URL;

type BookingDetailsProps = NativeStackScreenProps<BookingsStackParamList, 'BookingDetails'>;





interface Reservation {
    id: number;
    startDate: string;
    endDate: string;
    Tool: {
        id: number;
        name: string;
        price: number;
    };
}

const BookingDetailsScreen: React.FC<BookingDetailsProps> = ({ route, navigation }) => {
    const [reservation, setReservation] = useState<Reservation | null>(null);
    const [newStartDate, setNewStartDate] = useState<Date | null>(null);
    const [newEndDate, setNewEndDate] = useState<Date | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [showStartDatePicker, setShowStartDatePicker] = useState<boolean>(false);
    const [showEndDatePicker, setShowEndDatePicker] = useState<boolean>(false);
    const [totalPrice, setTotalPrice] = useState<number>(0);

    useEffect(() => {
        const fetchReservationDetails = async () => {
            try {
                const user = getAuth().currentUser;
                if (!user) {
                    Alert.alert('Error', 'User not authenticated');
                    return;
                }

                const idToken = await user.getIdToken();

                const response = await fetch(`$IPADDRESS:8000/api/reservations/${route.params.reservationId}`, {
                    headers: {
                        'Authorization': `Bearer ${idToken}`
                    },
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch reservation');
                }

                const data = await response.json();
                if (!data.Tool) {
                    throw new Error('Tool data is missing in the reservation response');
                }
                setReservation(data);
                const start = new Date(data.startDate);
                const end = new Date(data.endDate);
                setNewStartDate(start);
                setNewEndDate(end);
                setTotalPrice(calculateTotalPrice(start, end, data.Tool.price));
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

        fetchReservationDetails();
    }, [route.params.reservationId]);

    const calculateTotalPrice = (startDate: Date, endDate: Date, price: number) => {
        const diffTime = Math.abs(endDate.getTime() - startDate.getTime());
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
        return diffDays * price;
    };

    const handleEdit = async () => {
        if (!newStartDate || !newEndDate) {
            Alert.alert('Error', 'Please select both start and end dates');
            return;
        }

        try {
            const user = getAuth().currentUser;
            if (!user) {
                Alert.alert('Error', 'User not authenticated');
                return;
            }

            const idToken = await user.getIdToken();
            console.log(`Updating reservation ID: ${reservation?.id}`);
            const response = await fetch(`IPADDRESS:8000/api/reservations/${reservation?.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${idToken}`,
                },
                body: JSON.stringify({
                    toolId: reservation?.Tool.id,
                    startDate: newStartDate.toISOString(),
                    endDate: newEndDate.toISOString(),
                }),
            });

            if (!response.ok) {
                throw new Error('Failed to update reservation');
            }

            const updatedReservation = await response.json();
            setReservation(updatedReservation);
            const start = new Date(updatedReservation.startDate);
            const end = new Date(updatedReservation.endDate);
            setNewStartDate(start);
            setNewEndDate(end);
            setTotalPrice(calculateTotalPrice(start, end, updatedReservation.Tool.price));
            Alert.alert('Success', 'Reservation updated successfully');
        } catch (error: unknown) {
            if (error instanceof Error) {
                Alert.alert('Error', error.message);
            } else {
                Alert.alert('Error', 'An unexpected error occurred');
            }
        }
    };

    const handleDelete = async () => {
        try {
            const user = getAuth().currentUser;
            if (!user) {
                Alert.alert('Error', 'User not authenticated');
                return;
            }

            const idToken = await user.getIdToken();

            const response = await fetch(`IPADDRESS:8000/api/reservations/${reservation?.id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${idToken}`,
                },
            });

            if (!response.ok) {
                throw new Error('Failed to delete reservation');
            }

            Alert.alert('Success', 'Reservation deleted successfully');
            navigation.goBack();
        } catch (error: unknown) {
            if (error instanceof Error) {
                Alert.alert('Error', error.message);
            } else {
                Alert.alert('Error', 'An unexpected error occurred');
            }
        }
    };

    const onStartDateChange = (event: any, selectedDate: Date | undefined) => {
        setShowStartDatePicker(false);
        if (selectedDate) {
            setNewStartDate(selectedDate);
            if (newEndDate && reservation) {
                setTotalPrice(calculateTotalPrice(selectedDate, newEndDate, reservation.Tool.price));
            }
        }
    };

    const onEndDateChange = (event: any, selectedDate: Date | undefined) => {
        setShowEndDatePicker(false);
        if (selectedDate) {
            setNewEndDate(selectedDate);
            if (newStartDate && reservation) {
                setTotalPrice(calculateTotalPrice(newStartDate, selectedDate, reservation.Tool.price));
            }
        }
    };

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
            <Text style={styles.header}>Booking Details</Text>
            {reservation && reservation.Tool ? (
                <>
                    <Text>Tool: {reservation.Tool.name}</Text>
                    <Text>Price: ${reservation.Tool.price}</Text>
                    <Text>Start Date: {new Date(reservation.startDate).toLocaleDateString()}</Text>
                    <Text>End Date: {new Date(reservation.endDate).toLocaleDateString()}</Text>

                    <Text>Select New Start Date:</Text>
                    <Button title="Pick Start Date" onPress={() => setShowStartDatePicker(true)} />
                    {showStartDatePicker && (
                        <DateTimePicker
                            value={newStartDate || new Date()}
                            mode="date"
                            display="default"
                            onChange={onStartDateChange}
                        />
                    )}

                    <Text>Select New End Date:</Text>
                    <Button title="Pick End Date" onPress={() => setShowEndDatePicker(true)} />
                    {showEndDatePicker && (
                        <DateTimePicker
                            value={newEndDate || new Date()}
                            mode="date"
                            display="default"
                            onChange={onEndDateChange}
                        />
                    )}

                    <Text>Total Price: ${totalPrice.toFixed(2)}</Text>

                    <Button title="Save Changes" onPress={handleEdit} />
                    <Button title="Delete Reservation" onPress={handleDelete} color="red" />
                </>
            ) : (
                <Text style={styles.errorText}>Tool data is missing</Text>
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
    input: {
        height: 40,
        borderColor: "#ddd",
        borderWidth: 1,
        marginBottom: 16,
        padding: 8,
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
});

export default BookingDetailsScreen;
