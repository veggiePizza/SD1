import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Button, Alert } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { SearchStackParamList } from "../../../navigation/types";
import { Color, FontFamily, FontSize, Border } from "./GlobalStylesSinglePost";
import { useNavigation } from '@react-navigation/native';
import { getAuth } from 'firebase/auth';
import DateTimePicker from '@react-native-community/datetimepicker';
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
            <Text style={styles.text}>{tool.city}, {tool.state}, {tool.country}</Text>

            <Text style={styles.subtitle}>Coordinates</Text>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    touchableContainer: {
        alignItems: "center",
        marginTop: 10,
    },
    container: {
        // flex: 1,               // Ensures the container takes up available space
        justifyContent: "center",
        alignItems: "center",
    },
    scrollView: {
        marginTop: 543,           // Adjust positioning as needed
        marginHorizontal: 66,     // Align horizontally based on your design
        width: 298, 
        height: 140,              // Match the width requirement
        borderWidth: 1,           // Border thickness
        borderColor: "#D3D3D3",   // Light gray outline color
        borderRadius: 8,          // Optional: Rounded corners for the outline
        padding: 10,              // Space inside the border
    },
    backgroundIconPosition: {
        left: 0,
        top: 0
  },
  priceFlexBox: {
        textAlign: "left",
        color: Color.colorDarkslategray
  },
  priceTypo: {
        width: 122,
        fontFamily: FontFamily.quicksandBold,
        fontWeight: "700"
  },
  iconLayout: {
        height: 56,
        width: 193,
        top: 691,
        position: "absolute"
  },
  pricePosition: {
        left: 66,
        position: "absolute"
  },
  bookItemTypo: {
        height: 33,
        fontSize: FontSize.size_lg,
        top: 705,
        color: Color.colorWhite,
        textAlign: "left",
        fontFamily: FontFamily.quicksandBold,
        fontWeight: "700",
        position: "absolute"
  },
  cityStateTypo: {
        height: 23,
        color: Color.colorBlack,
        fontSize: FontSize.size_lg,
        textAlign: "left",
        left: 65,
        position: "absolute"
  },
  backLayout: {
        height: 38,
        width: 108,
        position: "absolute"
  },
  backTypo: {
        fontFamily: FontFamily.quicksandMedium,
        fontWeight: "500"
  },
  backgroundIcon: {
        width: 430,
        position: "absolute",
        height: 932
  },
  itemTitle: {
        top: 407,
        fontSize: 32,
        width: 234,
        height: 40,
        fontFamily: FontFamily.quicksandBold,
        fontWeight: "700",
        left: 65,
        color: Color.colorDarkslategray,
        position: "absolute"
  },
  price: {
        top: 451,
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
});

export default ToolDetailsScreen;
