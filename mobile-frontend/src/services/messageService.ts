import { db } from "./firebase";  // Assuming db is initialized correctly in firebase.ts
import { collection, addDoc, getDocs, query, where, serverTimestamp } from "firebase/firestore";

// Send a message to Firestore
export const sendMessage = async (senderId: string, receiverId: string, message: string) => {
    try {
        const newMessage = {
            senderId,
            receiverId,
            message,
            timestamp: serverTimestamp(),  // Use serverTimestamp for consistent time
        };

        // Using the Firestore v9 modular API
        const messagesCollection = collection(db, "messages");
        await addDoc(messagesCollection, newMessage);
    } catch (error) {
        if (error instanceof Error) {
            throw new Error("Error sending message: " + error.message);
        }
        throw new Error("An unknown error occurred while sending the message.");
    }
};


// Get all messages for the current user (either sender or receiver)
export const getMessages = async (currentUserId: string) => {
    try {
        const messagesCollection = collection(db, "messages");

        // Query for messages where the current user is either the sender or the receiver
        const senderQuery = query(messagesCollection, where("senderId", "==", currentUserId));
        const receiverQuery = query(messagesCollection, where("receiverId", "==", currentUserId));

        // Fetching both sender and receiver messages
        const [senderSnapshot, receiverSnapshot] = await Promise.all([getDocs(senderQuery), getDocs(receiverQuery)]);

        const senderMessages = senderSnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
        }));
        const receiverMessages = receiverSnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
        }));

        // Combine both sender and receiver messages
        const allMessages = [...senderMessages, ...receiverMessages];

        return allMessages;
    } catch (error) {
        console.error("Error fetching messages:", error);  // Improved logging
        throw new Error("Error fetching messages: " + (error instanceof Error ? error.message : "Unknown error"));
    }
};
