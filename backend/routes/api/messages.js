const express = require('express');
const {admin, db} = require("../../firebase/firebaseAdmin");
const router = express.Router();

router.post('/sendMessage', async (req, res) => {
    const { senderId, receiverId, message } = req.body;

    if (!senderId || !receiverId || !message) {
        return res.status(400).send("Missing required fields");
    }

    try {
        const newMessage = {
            senderId,
            receiverId,
            message,
            timestamp: admin.firestore.FieldValue.serverTimestamp(),  // Now admin is defined
        };

        // Add the message to Firestore
        await db.collection('messages').add(newMessage);

        res.status(200).send('Message sent successfully');
    } catch (error) {
        console.error("Error sending message: ", error);
        res.status(500).send('Internal Server Error');
    }
});

module.exports = router;
