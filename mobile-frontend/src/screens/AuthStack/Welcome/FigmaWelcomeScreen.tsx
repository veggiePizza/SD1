import * as React from "react";
import {Image, StyleSheet, Text, View, TouchableOpacity} from "react-native";
import { useNavigation } from '@react-navigation/native';
import { AuthScreenNavigationType } from "../../../navigation/types";


const FigmaWelcomeScreen = () => {
    const navSignUp = useNavigation<AuthScreenNavigationType<"SignUp">>();
    const navSignIn = useNavigation<AuthScreenNavigationType<"SignIn">>();

  	
  	return (
    		<View style={styles.lenditSignUpIphone141}>
      			<Image style={styles.backgroundIcon} resizeMode="cover" source={require("../../../../assets/Background.png")}/>
      			<TouchableOpacity style={[styles.signInButton, styles.signLayout, { zIndex: 1 }]} activeOpacity={0.8}  onPress={()=> navSignIn.navigate("SignIn")}>
        				<Image style={styles.signInContainer} resizeMode="cover" source={require("../../../../assets/SignUpContainer.png")} />
        				<Text style={[styles.signIn, styles.signTypo]}>Sign in</Text>
      			</TouchableOpacity>
      			<TouchableOpacity style={[styles.signUpButton, styles.signLayout]} activeOpacity={0.8}  onPress={()=> navSignUp.navigate("SignUp")}>
        				<Image style={styles.signInContainer} resizeMode="cover" source={require("../../../../assets/SignUpContainer.png")} />
        				<Text style={[styles.signUp, styles.signTypo]}>Sign up</Text>
      			</TouchableOpacity>
      			<View style={styles.orSeperator}>
        				<Text style={styles.or}>Or</Text>
        				<View style={[styles.orSeperatorChild, styles.seperatorLayout]} />
        				<View style={[styles.orSeperatorItem, styles.seperatorLayout]} />
      			</View>
      			<Image style={styles.newlenditlogo1Icon} resizeMode="cover" source={require("../../../../assets/NewLenditLogo.png")} />
    		</View>);
};

const styles = StyleSheet.create({
  	signLayout: {
    		height: 56,
    		width: 352,
    		left: 39,
    		position: "absolute"
  	},
  	signTypo: {
    		height: 43,
    		textAlign: "left",
    		color: "#fff",
    		fontFamily: "Quicksand-Medium",
    		fontWeight: "500",
    		fontSize: 30,
    		top: 6,
    		position: "absolute"
  	},
  	seperatorLayout: {
    		height: 1,
    		width: 146,
    		borderTopWidth: 1,
    		borderColor: "#32373d",
    		borderStyle: "solid",
    		top: 20,
    		opacity: 0.3,
    		position: "absolute"
  	},
  	signInContainer: {
    		borderRadius: 30,
    		left: 0,
    		top: 0,
    		height: 56,
    		width: 352,
    		position: "absolute"
  	},
  	signIn: {
    		left: 127,
    		width: 97
  	},
  	signInButton: {
    		top: 506
  	},
  	signUp: {
    		left: 121,
    		width: 123
  	},
  	signUpButton: {
    		top: 614
  	},
  	or: {
    		left: 153,
    		fontSize: 25,
    		fontFamily: "Quicksand-Regular",
    		color: "#000",
    		width: 33,
    		opacity: 0.3,
    		height: 36,
    		textAlign: "left",
    		top: 0,
    		position: "absolute"
  	},
  	orSeperatorChild: {
    		left: 0
  	},
  	orSeperatorItem: {
    		left: 190
  	},
  	orSeperator: {
    		top: 570,
    		left: 52,
    		width: 335,
    		height: 36,
    		position: "absolute"
  	},
  	newlenditlogo1Icon: {
    		top: 166,
    		left: 15,
    		width: 400,
    		height: 400,
			// width: 376,
    		// height: 308,
    		position: "absolute"
  	},
  	lenditSignUpIphone141: {
    		backgroundColor: "#fff",
    		flex: 1,
    		width: "100%",
    		height: 932,
    		overflow: "hidden"
  	},
	  backgroundIcon: {
		  width: 430,
		  left: 0,
		  top: 0,
		  position: "absolute",
		  height: 932,
		  opacity: 0.35
	},
});

export default FigmaWelcomeScreen;
