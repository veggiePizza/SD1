import React, { useState, useEffect } from "react";
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { MessagesStackParamList } from "../../../navigation/types";
import { getMessages } from "../../../services/messageService";
import { authInstance } from "../../../services/firebase"; // Correct import for authInstance

type InboxScreenProps = NativeStackScreenProps<MessagesStackParamList, "Inbox">;

const InboxScreen: React.FC<InboxScreenProps> = ({ navigation }) => {
    const [messages, setMessages] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [currentUserId, setCurrentUserId] = useState<string | null>(null);

    useEffect(() => {
        const user = authInstance.currentUser;
        if (user) {
            console.log("Authenticated User: ", user);
            setCurrentUserId(user.uid);
        } else {
            console.error("No user is authenticated");
        }
    }, []);

    useEffect(() => {
        const fetchMessages = async () => {
            if (!currentUserId) return;

            try {
                setLoading(true);
                console.log("Fetching messages for user ID:", currentUserId);

                const messagesList = await getMessages(currentUserId);
                console.log("Fetched Messages: ", messagesList);

                const groupedMessages = groupMessagesByUser(messagesList);
                setMessages(groupedMessages);
            } catch (error) {
                console.error("Error fetching messages:", error);
                alert("Failed to load messages. Please try again.");
            } finally {
                setLoading(false);
            }
        };

        fetchMessages();
    }, [currentUserId]);

    const groupMessagesByUser = (messages: any[]) => {
        const grouped: { [key: string]: any } = {};

        messages.forEach((message) => {
            const { senderId, receiverId, messageText, timestamp } = message;
            console.log("Processing message: ", message);

            const conversationKey = senderId < receiverId ? `${senderId}-${receiverId}` : `${receiverId}-${senderId}`;

            if (!grouped[conversationKey]) {
                grouped[conversationKey] = {
                    senderId,
                    receiverId,
                    message: messageText,
                    timestamp,
                    conversationKey,
                };
            } else {
                if (new Date(timestamp).getTime() > new Date(grouped[conversationKey].timestamp).getTime()) {
                    grouped[conversationKey].message = messageText;
                    grouped[conversationKey].timestamp = timestamp;
                }
            }
        });

        console.log("Grouped Messages: ", grouped);
        return Object.values(grouped);
    };

    const handleSelectMessage = (message: any) => {
        console.log("Selected message: ", message);
        navigation.navigate("Chat", {
            senderId: message.senderId,
            receiverId: message.receiverId,
            conversationKey: message.conversationKey,
        });
    };

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Inbox</Text>
            {loading ? (
                <Text>Loading...</Text>
            ) : messages.length === 0 ? (
                <Text>No messages available.</Text>
            ) : (
                <FlatList
                    data={messages}
                    renderItem={({ item }) => (
                        <TouchableOpacity onPress={() => handleSelectMessage(item)}>
                            <View style={styles.messageItem}>
                                <Text style={styles.userName}>
                                    User {item.senderId} {/* Consider showing actual names if possible */}
                                </Text>
                                <Text style={styles.messagePreview}>{item.message}</Text>
                                <Text style={styles.timestamp}>
                                    {new Date(item.timestamp).toLocaleTimeString()}
                                </Text>
                            </View>
                        </TouchableOpacity>
                    )}
                    keyExtractor={(item, index) => index.toString()}
                    onEndReached={() => console.log("End of list reached")}
                />
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: "#f5f5f5",
    },
    header: {
        fontSize: 24,
        fontWeight: "bold",
        color: "#333",
        marginBottom: 20,
    },
    messageItem: {
        padding: 15,
        backgroundColor: "#fff",
        marginBottom: 10,
        borderRadius: 10,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
    },
    userName: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#333",
    },
    messagePreview: {
        fontSize: 14,
        color: "#666",
        marginTop: 5,
    },
    timestamp: {
        fontSize: 12,
        color: "#bbb",
        marginTop: 5,
        textAlign: "right",
    },
});

export default InboxScreen;
