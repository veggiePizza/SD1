import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { SearchStackParamList } from "../../../navigation/types";

import * as React from "react";
import { Color, FontFamily, FontSize, Border } from "./GlobalStylesSinglePost";
import { useNavigation } from '@react-navigation/native';



type ToolDetailsProp = NativeStackScreenProps<SearchStackParamList, 'ToolDetails'>;

const ToolDetailsScreen: React.FC<ToolDetailsProp> = ({ route }) => {
    // Extracting tool details from the route params
    const { tool } = route.params;

    const handleBookItemPress = () => {
        // Handle Book Item press
        console.log("Book Item pressed");
    };

    const handleMessageLenderPress = () => {
        // Handle Message Lender press
        console.log("Message Lender pressed");
    };
    


    

    return (
        <View style={styles.lenditProfilePage}>
      			<Image style={styles.backgroundIcon} resizeMode="cover" source={require("../../../../assets/Background.png")} />

                 
      			<Text style={[styles.itemTitle, styles.priceFlexBox]}>{tool.name}</Text>
      			<Text style={[styles.price, styles.priceTypo]}>${tool.price}</Text>
        		<Text style={[styles.cityState, styles.cityStateTypo]}>{tool.city}, {tool.state}</Text>

        		<Text style={[styles.description, styles.cityStateTypo]}>Description</Text>
                <View style={styles.container}>
                    <ScrollView style={styles.scrollView}>
        		        <Text style={styles.thisIsTemporary}>{tool.description}</Text>
                    </ScrollView>
                </View>
                



                  
                <Image style={styles.newlenditlogoProcessed1Icon} resizeMode="cover" source={require("../../../../assets/NewLenditLogo.png")} />

      			<View style={[styles.imageplaceholder, styles.pricePosition]} />

            
      			<Image style={[styles.messagelendercontainerIcon, styles.iconLayout]} resizeMode="cover" source={require("../../../../assets/SmallContainer.png")} />
      			<Text style={[styles.messageLender, styles.bookItemTypo]}>Message Lender?</Text>

                
        		<Image style={[styles.bookitemcontainerIcon, styles.iconLayout]} resizeMode="cover" source={require("../../../../assets/SmallContainer.png")} />
        		<Text style={[styles.bookItem, styles.bookItemTypo]}>Book Item</Text>
        				
        </View>);

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
        height: 28,
        left: 66,
        position: "absolute",
        textAlign: "left",
        color: Color.colorDarkslategray
  },
  newlenditlogoProcessed1Icon: {
        top: 735,
        left: 124,
        width: 173,
        height: 153,
        position: "absolute"
  },
  messagelendercontainerIcon: {
        left: 14,
        borderRadius: Border.br_11xl
  },
  imageplaceholder: {
        top: 133,
        backgroundColor: "#d9d9d9",
        width: 300,
        height: 274
  },
  messageLender: {
        left: 37,
        width: 162
  },
  bookitemcontainerIcon: {
        left: 224,
        borderRadius: Border.br_11xl
  },
  bookItem: {
        left: 275,
        width: 91
  },
  thisIsTemporary: {
    color: Color.colorBlack,
    fontFamily: FontFamily.quicksandMedium,
    fontWeight: "500",
    fontSize: FontSize.size_lg,
    textAlign: "left",
},
  cityState: {
        top: 479,
        width: 170,
        fontFamily: FontFamily.quicksandMedium,
        fontWeight: "500"
  },
  description: {
        top: 520,
        width: 122,
        fontFamily: FontFamily.quicksandBold,
        fontWeight: "700"
  },
  backButtonChild: {
        backgroundColor: Color.colorDarkslategray,
        borderStyle: "solid",
        borderColor: Color.colorDarkslategray,
        borderWidth: 1,
        borderRadius: Border.br_11xl,
        left: 0,
        top: 0
  },
  backButtonItem: {
        top: 19,
        left: 12,
        maxHeight: "100%",
        width: 23,
        position: "absolute"
  },
  back: {
        top: 5,
        left: 39,
        fontSize: 23,
        width: 54,
        height: 29,
        color: Color.colorWhite,
        fontWeight: "500",
        textAlign: "left",
        position: "absolute"
  },
  backButton: {
        top: 70,
        left: 30
  },
  lenditProfilePage: {
        backgroundColor: Color.colorWhite,
        flex: 1,
        width: "100%",
        overflow: "hidden",
        height: 932
  }
    // container: {
    //     padding: 20,
    // },
    // title: {
    //     fontSize: 24,
    //     fontWeight: 'bold',
    //     marginBottom: 10,
    // },
    // subtitle: {
    //     fontSize: 18,
    //     fontWeight: '600',
    //     marginTop: 20,
    // },
    // text: {
    //     fontSize: 16,
    //     marginVertical: 5,
    // },
});

export default ToolDetailsScreen;
