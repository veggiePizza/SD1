import * as React from 'react';
import { View, Button, Text, StyleSheet } from 'react-native';
import { useStripe } from '@stripe/stripe-react-native';
import { authInstance } from '../../../services/firebase';

const PaymentMethodsScreen: React.FC = () => {
    const { initPaymentSheet, presentPaymentSheet } = useStripe();
    const [loading, setLoading] = React.useState(false);

    const handleAddPaymentMethod = async () => {
        setLoading(true);

        try {
            // Call your backend to create a Stripe customer and setup intent
            const response = await fetch('http://192.168.1.249:8000/stripe/create-stripe-customer', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    userId: authInstance.currentUser?.uid,
                    email: authInstance.currentUser?.email,
                }),
            });

            const { stripeCustomerId, clientSecret } = await response.json();

            // Initialize the Payment Sheet with the setup intent client secret
            const { error: initError } = await initPaymentSheet({
                setupIntentClientSecret: clientSecret,
                merchantDisplayName: 'Your Merchant Name',
                customerId: stripeCustomerId,  // Optional: Stripe customer ID
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
                console.log('Payment method successfully added');
            }

        } catch (error) {
            console.error("Error adding payment method:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <View style={styles.container}>
            <Button
                title="Add Payment Method"
                onPress={handleAddPaymentMethod}
                disabled={loading}
            />
            {loading && <Text>Loading...</Text>}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
});

export default PaymentMethodsScreen;

