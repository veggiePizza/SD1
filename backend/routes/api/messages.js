const express = require('express');
const { admin, db } = require("../../firebase/firebaseAdmin");  // Firebase Admin SDK for Firestore access
const router = express.Router();

/**
 * Route to send a message from one user to another.
 * It checks for required fields, stores the message in Firestore,
 * and returns a success or error response.
 */
router.post('/sendMessage', async (req, res) => {
    // Destructure senderId, receiverId, and message from the request body
    const { senderId, receiverId, message } = req.body;

    // Validate that all required fields are provided
    if (!senderId || !receiverId || !message) {
        return res.status(400).send("Missing required fields");  // Bad request if fields are missing
    }

    try {
        // Create a message object with a timestamp from Firestore
        const newMessage = {
            senderId,
            receiverId,
            message,
            timestamp: admin.firestore.FieldValue.serverTimestamp(),  // Add a server-side timestamp
        };

        // Store the message in Firestore under the 'messages' collection
        await db.collection('messages').add(newMessage);

        // Send a success response to the client
        res.status(200).send('Message sent successfully');
    } catch (error) {
        // Log and handle errors, send a generic error message to the client
        console.error("Error sending message: ", error);
        res.status(500).send('Internal Server Error');  // Internal server error for unexpected issues
    }
});

module.exports = router;
