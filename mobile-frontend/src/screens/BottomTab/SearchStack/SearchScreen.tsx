import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput,Image, Button, FlatList, ActivityIndicator, TouchableOpacity } from 'react-native';
import { useStripe } from '@stripe/stripe-react-native';
import { doc, updateDoc, arrayUnion } from 'firebase/firestore';
import { authInstance, db } from '../../../services/firebase';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { SearchStackParamList } from '../../../navigation/types';
import { Dimensions } from 'react-native';
import { Color, Border, FontFamily, FontSize } from "./GlobalStylesSearchScreen";
const { width } = Dimensions.get('window'); // Get the screen width

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
                const response = await fetch('http://192.168.1.129:8000/api/tools/');
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
    console.log(tools.length);

    return (
        <View style={styles.container}>
      		<Image style={styles.backgroundIcon} resizeMode="cover" source={require("../../../../assets/Background.png")} />

            <Text style={styles.title}>Search for Tools</Text>
      		<View style={[styles.tempNavBar, styles.tempNavBarPosition]} />


              <View style={styles.filterContainer}>
                <View>
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
                </View>
                <View style={[styles.searchbuttoncontainer, styles.searchLayout]}>
                <Button title="Search" onPress={() => {}} />
                </View>
            </View>
    
            {loading ? (
                <ActivityIndicator size="large" color="#0000ff" />
            ) : (
                <FlatList
                    data={tools}
                    numColumns={2}  // Display items in two columns
                    renderItem={({ item }) => (
                        <View
                            style={[
                                styles.itemCardChild, ,
                                {
                                    margin: 10,
                                    width: (width - 40) / 2 // Adjust width dynamically based on screen size
                                }
                            ]}
                        >
        				<View style={styles.itemCardItem}>
                            <Text>{item.name}</Text>
                            <Text>${item.price}</Text>
                            <Button
                                title="View Details"
                                onPress={() => navigation.navigate('ToolDetails', { tool: item })}
                            />
                        </View>
                    </View>
                    )}
                    keyExtractor={(item) => item.id.toString()}
                />
            )}
    
        
            <View style={styles.bottomContainer}>
            <TouchableOpacity onPress={handleAddPaymentMethod} disabled={loading}>
                <Image style={styles.addpaymentcontainerIcon } resizeMode="cover" source={require("../../../../assets/skinnyContainer.png")} />
                <Text style={styles.addpayment}>Add Payment Method</Text>

            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigation.navigate('AddTool')} disabled={loading}>
                <Image style={styles.addpaymentcontainerIcon} resizeMode="cover" source={require("../../../../assets/skinnyContainer.png")} />
                <Text style={styles.addpayment}>Lend a Tool!</Text>

            </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
//     addpaymentPosition: {
//         top: 794,
//         height: 28,
//         // position: "absolute",
//         flex:1
//   },
searchLayout: {
    width: 90,
    position: "absolute",
    flex:1
},
searchbuttoncontainer: {
    flex: 1, // Allow it to take remaining space in the row
    marginLeft: 310, // Add some space between the filters and button
    height: 90, // Set a consistent height
    borderRadius: 10,
    backgroundColor: "#e8f4ff",
    justifyContent: 'center', // Center the button vertically
    alignItems: 'center', // Center the button horizontally
    width: "150%"
},
bottomContainer: {
    flexDirection: 'column',  // Stack buttons vertically
    alignItems: 'center',     // Center items horizontally
    justifyContent: 'flex-start', // Align buttons from the top
    width: '100%',
    left: 55,
    marginBottom: 5,         // Add some space at the bottom
    paddingHorizontal: 20,    // Add some padding on the sides if needed
},
	addpaymentPosition: {
    		top: 794,
    		height: 28,
    		position: "absolute"
  	},
addpaymentcontainerIcon: {
    borderRadius: Border.br_11xl,
    width: '100%',
        height: '100%',
        position: 'absolute',
        bottom: -3,
        right: -3,
},
    addpayment: {
        left: -55,
        width: 253,
        color: Color.colorWhite,
        fontFamily: FontFamily.quicksandMedium,
        fontWeight: "500",
        textAlign: "center",
        fontSize: FontSize.size_3xl
  },
    
  filterContainer: {
    flexDirection: 'row', // Arrange inputs and button horizontally
    alignItems: 'center', // Align items vertically
    justifyContent: 'space-between', // Space out inputs and button
    width: '100%', // Ensure it takes the full width
    marginBottom: 15,
},
    
    tempNavBarPosition: {
        width: 430,
        top: 0,
        position: "absolute"
  },
    tempNavBar: {
        left: 1,
        height: 170,
        width: 430,
        top: 0,
        position: "absolute",
        backgroundColor: Color.colorWhite
  },
    backgroundIcon: {
        left: 0,
        width: 430,
        top: 0,
        position: "absolute",
        height: 932
  },
    itemTitle: {
    		height: 30,
    		width: 149,
    		left: 10,
    		top: 180,
    		position: "absolute"
  	},
    itemCardChild: {
        backgroundColor: Color.colorWhitesmoke,
        borderRadius: Border.br_11xl,
        height: 240,
        width: 184,
        left: 0,
        top: 0,
        flex:1
        // position: "absolute"
  },
  itemCardItem: {
    borderBottomRightRadius: Border.br_11xl,
    borderBottomLeftRadius: Border.br_11xl,
    height: 70,
    top:180,
    width: '100%', // Use full width of the parent container
    backgroundColor: Color.colorWhite,
    justifyContent: 'center', // Center vertically within the card
    alignItems: 'center', // Center horizontally within the card
    paddingHorizontal: 10, // Add horizontal padding
},
    container: {
        flex: 1,
        justifyContent: 'flex-start', // Align items at the top of the screen
        alignItems: 'stretch', // Make the container stretch to full width
        backgroundColor: '#f5f5f5',
        paddingTop: 20,
        paddingHorizontal: 10,  // Apply horizontal padding (use it wisely, as it takes away space)
    },
    title: {
        fontSize: 24,
        marginBottom: 20,
    },
    input: {
        width: '300%',
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
        alignItems: 'center', // Center content within each item
    },
    searchButton: {
        width: '100%', // Make button width dynamic
        textAlign: 'center',
        fontWeight: 'bold',
        color: '#007BFF',
    },
});

export default SearchScreen;
