import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Button, Alert } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { SearchStackParamList } from '../../../navigation/types';
import DateTimePicker from '@react-native-community/datetimepicker';
import { getAuth } from 'firebase/auth';
import config from 'react-native-config';

const apiBaseUrl = config.REACT_APP_API_BASE_URL;

type ToolDetailsProp = NativeStackScreenProps<SearchStackParamList, 'ToolDetails'>;

const ToolDetailsScreen: React.FC<ToolDetailsProp> = ({ route }) => {
    const { tool } = route.params;

    // State for date pickers
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());

    // State for the tool owner
    const [owner, setOwner] = useState<{ firstName: string; lastName: string } | null>(null);

    // State to control visibility of the date picker
    const [showStartDate, setShowStartDate] = useState(false);
    const [showEndDate, setShowEndDate] = useState(false);

    // Fetch the tool owner data
    useEffect(() => {
        const fetchToolDetails = async () => {
            try {
                const response = await fetch(`IPADDRESS:8000/api/tools/${tool.id}`);
                const data = await response.json();

                if (data.Owner) {
                    setOwner(data.Owner);
                }
            } catch (error) {
                console.error('Error fetching tool details:', error);
                Alert.alert('Error', 'Failed to fetch tool details');
            }
        };

        fetchToolDetails();
    }, [tool.id]);

    const onStartDateChange = (event: any, selectedDate: Date | undefined) => {
        setShowStartDate(false);
        if (selectedDate) {
            setStartDate(selectedDate);
        }
    };

    const onEndDateChange = (event: any, selectedDate: Date | undefined) => {
        setShowEndDate(false);
        if (selectedDate) {
            setEndDate(selectedDate);
        }
    };

    const handleBookTool = async () => {
        const user = getAuth().currentUser;
        if (!user) {
            Alert.alert('Error', 'User not authenticated');
            return;
        }

        const idToken = await user.getIdToken();

        try {
            const response = await fetch(`IPADDRESS:8000/api/reservations`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${idToken}`,
                },
                body: JSON.stringify({
                    toolId: tool.id, // Assuming tool has an 'id' field
                    startDate: startDate.toISOString(),
                    endDate: endDate.toISOString(),
                }),
            });

            if (!response.ok) {
                throw new Error('Failed to book tool');
            }

            Alert.alert('Success', 'Tool booked successfully');
        } catch (error: unknown) {
            if (error instanceof Error) {
                Alert.alert('Error', error.message);
            } else {
                Alert.alert('Error', 'An unknown error occurred');
            }
        }
    };

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.title}>{tool.name}</Text>
            <Text style={styles.subtitle}>Description</Text>
            <Text style={styles.text}>{tool.description}</Text>

            <Text style={styles.subtitle}>Price</Text>
            <Text style={styles.text}>${tool.price}</Text>

            <Text style={styles.subtitle}>Location</Text>
            <Text style={styles.text}>{tool.address}</Text>
            <Text style={styles.text}>
                {tool.city}, {tool.state}, {tool.country}
            </Text>

            {owner && (
                <View style={styles.ownerSection}>
                    <Text style={styles.subtitle}>Owner</Text>
                    <Text style={styles.text}>{owner.firstName} </Text>
                </View>
            )}

            <Text style={styles.subtitle}>Select Start Date</Text>
            <Button title={`Choose Start Date: ${startDate.toLocaleDateString()}`} onPress={() => setShowStartDate(true)} />
            {showStartDate && (
                <DateTimePicker
                    value={startDate}
                    mode="date"
                    display="default"
                    onChange={onStartDateChange}
                />
            )}

            <Text style={styles.subtitle}>Select End Date</Text>
            <Button title={`Choose End Date: ${endDate.toLocaleDateString()}`} onPress={() => setShowEndDate(true)} />
            {showEndDate && (
                <DateTimePicker
                    value={endDate}
                    mode="date"
                    display="default"
                    onChange={onEndDateChange}
                />
            )}

            <Button title="Book Tool" onPress={handleBookTool} />
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
    ownerSection: {
        marginTop: 20,
    },
});

export default ToolDetailsScreen;
