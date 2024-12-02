import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, Button, FlatList, ActivityIndicator } from 'react-native';
import { useStripe } from '@stripe/stripe-react-native';
import { doc, updateDoc, arrayUnion } from 'firebase/firestore';
import { authInstance, db } from '../../../services/firebase';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { SearchStackParamList } from '../../../navigation/types';

type SearchProps = NativeStackScreenProps<SearchStackParamList, 'Search'>;

const SearchScreen: React.FC<SearchProps> = ({ navigation }) => {
    const { initPaymentSheet, presentPaymentSheet } = useStripe();
    const [loading, setLoading] = useState(false);
    const [tools, setTools] = useState<any[]>([]); // State to store tools
    const [filters, setFilters] = useState({
        minPrice: '',
        maxPrice: '',
    });

    // Fetch tools from the backend API
    useEffect(() => {
        const fetchTools = async () => {
            try {
                setLoading(true);
                const response = await fetch('http://:8000/api/tools/');
                const data = await response.json();
                setTools(data.Tools); // Set the tools from the API response
                setLoading(false);
            } catch (error) {
                console.error("Error fetching tools:", error);
                setLoading(false);
            }
        };

        fetchTools();
    }, []);

    const getIdToken = async () => {
        const currentUser = authInstance.currentUser;
        if (currentUser) {
            try {
                const idToken = await currentUser.getIdToken();
                console.log("Firebase ID Token:", idToken);
            } catch (error) {
                console.error("Error retrieving ID token:", error);
            }
        } else {
            console.log("No user is currently signed in.");
        }
    };

    useEffect(() => {
        getIdToken();
    }, []);

    const handleAddPaymentMethod = async () => {
        setLoading(true);

        // Call your backend to create a setup intent
        const response = await fetch('/stripe/create-stripe-customer', {
            method: 'POST',
            body: JSON.stringify({ userId: authInstance.currentUser?.uid }),
            headers: {
                'Content-Type': 'application/json',
            },
        });
        const { clientSecret } = await response.json();

        // Initialize the Payment Sheet with the client secret
        const { error: initError } = await initPaymentSheet({
            setupIntentClientSecret: clientSecret,
            merchantDisplayName: 'Your Merchant Name',
        });

        if (initError) {
            console.error(initError);
            setLoading(false);
            return;
        }

        // Present the Payment Sheet to the user
        const { error: paymentError } = await presentPaymentSheet();
        if (paymentError) {
            console.error(paymentError);
        } else {
            // On success, update Firestore with the new payment method
            const userRef = doc(db, 'users', authInstance.currentUser?.uid || '');
            await updateDoc(userRef, {
                paymentMethods: arrayUnion({
                    type: 'credit_card',
                    lastFour: '9876', // You can extract this from the card
                    expDate: '12/25',
                }),
            });
        }

        setLoading(false);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Search for Tools</Text>

            {/* Filter Inputs */}
            <TextInput
                style={styles.input}
                placeholder="Min Price"
                value={filters.minPrice}
                onChangeText={(text) => setFilters({ ...filters, minPrice: text })}
            />
            <TextInput
                style={styles.input}
                placeholder="Max Price"
                value={filters.maxPrice}
                onChangeText={(text) => setFilters({ ...filters, maxPrice: text })}
            />

            <Button title="Search" onPress={() => {}} />

            {loading ? (
                <ActivityIndicator size="large" color="#0000ff" />
            ) : (
                <FlatList
                    data={tools}
                    renderItem={({ item }) => (
                        <View style={styles.toolItem}>
                            <Text>{item.name}</Text>
                            <Text>{item.price}</Text>
                            <Button
                                title="View Details"
                                onPress={() => navigation.navigate('ToolDetails', { tool: item })}

                                    />
                        </View>
                    )}
                    keyExtractor={(item) => item.id.toString()}
                />
            )}

            <Button
                title="Add Payment Method"
                onPress={handleAddPaymentMethod}
                disabled={loading}
            />

            <Button
                title="Add New Tool"
                onPress={() => navigation.navigate('AddTool')} // Navigate to AddToolScreen
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f5f5f5',
        padding: 20,
    },
    title: {
        fontSize: 24,
        marginBottom: 20,
    },
    input: {
        width: '100%',
        padding: 10,
        margin: 5,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
    },
    toolItem: {
        padding: 15,
        marginVertical: 5,
        backgroundColor: '#fff',
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#ccc',
        width: '100%',
    }
});

export default SearchScreen;
