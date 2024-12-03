import React, { useState } from 'react';
import { ScrollView, View, TextInput, Button, StyleSheet, Text, Alert, Image, TouchableOpacity } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { SearchStackParamList } from '../../../navigation/types';
import { getAuth } from 'firebase/auth'; 
import { Color, Border, FontFamily, FontSize } from "./GlobalStylesAddTool";

type SearchProps = NativeStackScreenProps<SearchStackParamList, 'AddTool'>;

const AddToolScreen = ({ navigation }: SearchProps) => {
    const [toolDetails, setToolDetails] = useState({
        name: '',
        description: '',
        price: '',
        address: '',
        city: '',
        state: '',
        country: '',
        lat: '',
        lng: '',
    });

    const handleInputChange = (field: keyof typeof toolDetails, value: string) => {
        setToolDetails({ ...toolDetails, [field]: value });
    };

    const handleSubmit = async () => {
        if (!toolDetails.name || !toolDetails.price || !toolDetails.description) {
            Alert.alert('Error', 'Please fill in all required fields');
            return;
        }

        try {
            const user = getAuth().currentUser;
            if (!user) {
                Alert.alert('Error', 'User not authenticated');
                return;
            }

            const idToken = await user.getIdToken();
            const response = await fetch('http://:8000/api/tools', {
                method: 'POST',
                body: JSON.stringify(toolDetails),
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${idToken}`,
                },
            });

            const result = await response.json();

            if (response.ok) {
                Alert.alert('Success', 'Tool added successfully');
                navigation.goBack();
            } else {
                Alert.alert('Error', result.message || 'Something went wrong');
            }
        } catch (error) {
            console.error('Error creating tool:', error);
            Alert.alert('Error', 'An error occurred while creating the tool');
        }
    };

    return (
        <ScrollView 
    contentContainerStyle={styles.container}
    keyboardShouldPersistTaps="handled"
>
    <Image 
        style={styles.backgroundIcon} 
        resizeMode="cover" 
        source={require("../../../../assets/Background.png")} 
    />
    <Text style={styles.whatWillYou}>What will you be lending?</Text>

    <View style={styles.formContainer}>
        <TextInput
            style={styles.input}
            placeholder="Tool Name"
            value={toolDetails.name}
            onChangeText={(text) => handleInputChange('name', text)}
        />
        <TextInput
            style={styles.input}
            placeholder="Price"
            keyboardType="numeric"
            value={toolDetails.price}
            onChangeText={(text) => handleInputChange('price', text)}
        />
        <TextInput
            style={styles.input}
            placeholder="Address"
            value={toolDetails.address}
            onChangeText={(text) => handleInputChange('address', text)}
        />
        <TextInput
            style={styles.input}
            placeholder="City"
            value={toolDetails.city}
            onChangeText={(text) => handleInputChange('city', text)}
        />
        <TextInput
            style={styles.input}
            placeholder="State"
            value={toolDetails.state}
            onChangeText={(text) => handleInputChange('state', text)}
        />
        <TextInput
            style={styles.input}
            placeholder="Country"
            value={toolDetails.country}
            onChangeText={(text) => handleInputChange('country', text)}
        />
        <TextInput
            style={styles.descriptionInput}
            placeholder="Description"
            value={toolDetails.description}
            multiline
            onChangeText={(text) => handleInputChange('description', text)}
        />
    </View>

    <TouchableOpacity 
        style={[styles.submitButton]} 
        activeOpacity={0.8} 
        onPress={handleSubmit}
    >
        <Text style={styles.submitText}>Lend It!</Text>
    </TouchableOpacity>
</ScrollView>

    );
};

const styles = StyleSheet.create({
    container: {
        padding: 20,
    },
    formContainer: {
        top:110,
        marginBottom: 20,
    },
    input: {
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: Border.br_11xl,
        marginBottom: 10,
        paddingHorizontal: 10,
    },
    descriptionInput: {
        height: 100,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: Border.br_11xl,
        padding: 10,
        textAlignVertical: 'top',
        marginBottom: 20,
    },
    submitButton: {
        top: 60,
        backgroundColor: Color.colorDarkslategray_200,
        borderRadius: Border.br_11xl,
        padding: 15,
        alignItems: 'center',
        marginVertical: 20,
    },
    submitText: {
        color: '#fff',
        fontFamily: FontFamily.quicksandMedium,
        fontSize: FontSize.size_11xl,
    },
    backgroundIcon: {
        width: 430,
        left: 0,
        top: 0,
        position: "absolute",
        height: 932
    },
    whatWillYou: {
        top:122,
        fontSize: 40,
        fontWeight: '700',
        fontFamily: FontFamily.quicksandBold,
        marginBottom: 20,
        textAlign: 'center',
    },
});

export default AddToolScreen;
