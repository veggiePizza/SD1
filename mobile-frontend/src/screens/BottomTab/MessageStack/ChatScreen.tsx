import React, { useState, useEffect, useRef } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, FlatList, KeyboardAvoidingView, Platform } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { MessagesStackParamList } from "../../../navigation/types";
import { sendMessage, getMessages } from "../../../services/messageService";

type ChatScreenProps = NativeStackScreenProps<MessagesStackParamList, "Chat">;

const ChatScreen: React.FC<ChatScreenProps> = ({ route }) => {
    const { senderId, receiverId } = route.params; // Extract senderId and receiverId from route params
    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState<any[]>([]);
    const flatListRef = useRef<FlatList>(null); // Reference to the FlatList to scroll to bottom

    useEffect(() => {
        // Fetch messages when the screen loads
        const fetchMessages = async () => {
            try {
                const messagesList = await getMessages(senderId); // Fetch messages
                setMessages(messagesList);
            } catch (error) {
                console.error("Error fetching messages:", error);
            }
        };
        fetchMessages();
    }, [senderId, receiverId]); // Run effect when senderId or receiverId changes

    const handleSendMessage = async () => {
        if (message.trim() === "") {
            console.log("Message cannot be empty");
            return;
        }
        try {
            // Send message through the service
            await sendMessage(senderId, receiverId, message);
            setMessage(""); // Clear input after sending
            alert("Message sent successfully!");

            // Fetch the updated messages list
            const updatedMessages = await getMessages(senderId); // Fetch only the relevant messages
            setMessages(updatedMessages);

            // Scroll to the bottom after sending a new message
            flatListRef.current?.scrollToEnd({ animated: true });
        } catch (error) {
            console.error("Error sending message:", error);
        }
    };

    const renderItem = ({ item }: { item: any }) => (
        <View style={[styles.messageContainer, item.senderId === senderId ? styles.sentMessage : styles.receivedMessage]}>
            {item.senderId !== senderId && (
                <Text style={styles.senderName}>{item.senderName}</Text> // Display sender's name
            )}
            <Text style={styles.messageText}>{item.message}</Text>
        </View>
    );

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === "ios" ? "padding" : undefined}
        >
            <FlatList
                ref={flatListRef}
                data={messages}
                renderItem={renderItem}
                keyExtractor={(item, index) => index.toString()}
                contentContainerStyle={styles.messagesList}
                inverted // Invert the list to show the latest message at the bottom
            />
            <View style={styles.footer}>
                <TextInput
                    style={styles.input}
                    value={message}
                    onChangeText={setMessage}
                    placeholder="Type your message"
                    multiline
                    numberOfLines={4}
                />
                <TouchableOpacity style={styles.sendButton} onPress={handleSendMessage}>
                    <Text style={styles.sendButtonText}>Send</Text>
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f5f5f5",
    },
    messagesList: {
        padding: 20,
        paddingBottom: 80, // Padding to avoid overlap with the input field
    },
    messageContainer: {
        maxWidth: "80%",
        marginBottom: 10,
        padding: 12,
        borderRadius: 10,
    },
    sentMessage: {
        alignSelf: "flex-end",
        backgroundColor: "#DCF8C6",
    },
    receivedMessage: {
        alignSelf: "flex-start",
        backgroundColor: "#fff",
    },
    senderName: {
        fontWeight: "bold",
        marginBottom: 5,
    },
    messageText: {
        fontSize: 16,
        color: "#333",
    },
    footer: {
        flexDirection: "row",
        padding: 10,
        backgroundColor: "#fff",
        borderTopWidth: 1,
        borderTopColor: "#ddd",
    },
    input: {
        flex: 1,
        height: 40,
        borderColor: "#ddd",
        borderWidth: 1,
        borderRadius: 10,
        paddingLeft: 10,
        fontSize: 16,
        backgroundColor: "#fff",
        marginRight: 10,
    },
    sendButton: {
        backgroundColor: "#4CAF50",
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 25,
        justifyContent: "center",
        alignItems: "center",
    },
    sendButtonText: {
        color: "#fff",
        fontSize: 18,
        fontWeight: "bold",
    },
});

export default ChatScreen;
