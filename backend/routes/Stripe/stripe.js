const express = require('express');
const { db } = require("../../firebase/firebaseAdmin");
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY); // Use environment variables for secrets
const router = express.Router();

// Route to create a Stripe customer and store it in Firebase
router.post('/create-stripe-customer', async (req, res) => {
    const { userId, email } = req.body;  // `userId` is Firebase UID

    // Validate if STRIPE_SECRET_KEY exists
    if (!process.env.STRIPE_SECRET_KEY) {
        console.error("Stripe secret key not set in environment variables");
        return res.status(500).send({ error: "Internal Server Error: Stripe secret key missing" });
    }

    const userRef = db.collection('users').doc(userId);  // Reference to Firestore document
    console.log("Attempting to set Firestore document for userId:", userId);

    try {
        // Create a Stripe customer
        const customer = await stripe.customers.create({
            email: email,
            metadata: {
                userId: userId, // Store Firebase UID in Stripe's metadata
            }
        });

        // Create a Setup Intent for securely adding a payment method
        const setupIntent = await stripe.setupIntents.create({
            customer: customer.id,
        });

        // Store the Stripe customer ID and setup intent client secret in Firebase Firestore
        await userRef.set({
            stripeCustomerId: customer.id,  // Store Stripe customer ID
            setupIntentClientSecret: setupIntent.client_secret,  // Store the Setup Intent client secret
        }, { merge: true });

        console.log("Firestore document set for userId:", userId);
        res.json({ stripeCustomerId: customer.id, clientSecret: setupIntent.client_secret });

    } catch (error) {
        console.error("Error creating Stripe customer:", error);

        // Additional logging to pinpoint the error
        if (error.type) {
            console.error("Stripe error type:", error.type);
        }
        if (error.code) {
            console.error("Stripe error code:", error.code);
        }
        if (error.raw && error.raw.message) {
            console.error("Stripe raw message:", error.raw.message);
        }

        res.status(500).send({ error: 'Failed to create Stripe customer' });
    }
});

module.exports = router;
