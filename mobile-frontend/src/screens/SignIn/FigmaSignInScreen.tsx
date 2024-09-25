import * as React from "react";
import { Animated, Image, StyleSheet, Text, View, TouchableOpacity, Pressable, TextInput, Easing } from "react-native";

import { useNavigation } from '@react-navigation/native';
import { AuthScreenNavigationType } from "../../navigation/types";
import { useForm, Controller } from 'react-hook-form';
import { Alert } from 'react-native';
import { signInWithEmailAndPassword } from 'firebase/auth'; // Import the signIn function from Firebase
import { authInstance } from "../../services/firebase"; // Import Firebase authentication instance


// Define an interface to type the form data for user sign-in
interface IUser {
    email: string;
    password: string;
}

// Define the SignInScreen component
const FigmaSignInScreen = () => {
    // Use the useNavigation hook to get access to the navigation prop with typed routes
    const navigation = useNavigation<AuthScreenNavigationType<"SignIn">>();

    const slideAnimation = React.useRef(new Animated.Value(500)).current;

    React.useEffect(() => {
        // Trigger the slide-in animation when the component mounts
        Animated.timing(slideAnimation, {
          toValue: 0, // Slide to the original position
          duration: 1500, // Animation duration in milliseconds
          easing: Easing.out(Easing.exp), // Use easing for a smoother animation
          useNativeDriver: true, // Enable native driver for better performance
        }).start();
      }, [slideAnimation]);

    // Initialize react-hook-form with default values for the form fields
    const { control, handleSubmit, formState: { errors } } = useForm<IUser>({
        defaultValues: {
            email: "",
            password: "",
        },
    });

    // Error handling function to display an alert if the form submission fails
    const onError = (errors: any, e: any) => {
        console.log(errors, e);
        Alert.alert("Submission Failed", "Please check your input and try again.");
    };

    // Function to handle form submission
    const onSubmit = async (data: IUser) => {
        try {
            const { email, password } = data;
            await loginWithEmailAndPassword(email, password); // Attempt to log in the user
            // Navigate to the next screen after successful login in loginWithEmailAndPassword
        } catch (error) {
            console.log("Error submitting form:", error);
        }
    };

    // Function to handle user login with email and password
    const loginWithEmailAndPassword = async (email: string, password: string) => {
        try {
            const userCredential = await signInWithEmailAndPassword(authInstance, email, password);
            const user = userCredential.user;
            console.log('User logged in:', user);
            // Navigate to the next screen after successful login
            // Example: navigation.navigate("Home"); // Uncomment and replace with the actual route
        } catch (error) {
            console.log('Error signing in:', error);
            Alert.alert("Login Failed", "An error occurred during login. Please check your credentials and try again.");
            throw error; // Re-throw the error so that it can be caught in the onSubmit function
        }
    };


  	
  	return (
    		<View style={styles.lenditSignUpIphone141}>
      			<Image style={styles.backgroundIcon} resizeMode="cover" source={require("../../../assets/Background.png")}/>

      			{/* <Text style={styles.welcomeBackLender}>Welcome Back, Lender!</Text> */}

                 {/* Animated Text */}
                <Animated.Text
                    style={[
                    styles.welcomeBackLender,
                    {
                        transform: [{ translateX: slideAnimation }], // Apply slide animation
                    },
                    ]}
                >
                    Welcome Back, Lender!
                </Animated.Text>
                
                {/* user input */}
      			<View style={styles.signUpUserInput}>

                    {/* email input */}
                    <Controller
                        control={control}
                        name="email"
                        render={({ field: { onChange, onBlur, value } }) => (
                            <TextInput
                                style={[ styles.textInput, styles.email, styles.containerShadowBox]}
                                placeholder="Email"
                                onChangeText={onChange}
                                onBlur={onBlur}
                                value={value}
                            />
                        )}
                    />	
                    {/* {errors.email && <Text color="$red">Email is required</Text>} */}

                    {/* password input */}
                    <Controller
                        control={control}
                        name="password"
                        render={({ field: { onChange, onBlur, value } }) => (
        				    <TextInput 
                                style={[ styles.textInput, styles.passwordContainer, styles.containerShadowBox]} 
                                placeholder="Password"
                                secureTextEntry
                                onChangeText={onChange}
                                onBlur={onBlur}
                                value={value}
                            />
                        )}
                    />
                    {/* {errors.password && <Text color="$red">Password is required</Text>} */}
                    
      			</View>

                {/* Sign in button */}
      			<TouchableOpacity style={[styles.signUpButton, styles.signLayout]} activeOpacity={0.8} onPress={handleSubmit(onSubmit)}>
        				<Image style={[styles.signUpContainer, styles.signUpContainerPosition]} resizeMode="cover" source={require("../../../assets/SignUpContainer.png")} />
        				<Text style={[styles.signIn, styles.backTypo]}>{`Sign in `}</Text>
      			</TouchableOpacity>

                  <View style={[styles.orSeperator, styles.orLayout]} >
        				<Text style={[styles.or, styles.orLayout]}>Or</Text>
        				<View style={[styles.orSeperatorChild, styles.seperatorLayout]} />
        				<View style={[styles.orSeperatorItem, styles.seperatorLayout]} />
      			</View>
      			
                {/* Google sign in Button */}
        		<TouchableOpacity style={[styles.googleSignInButton, styles.signLayout]} activeOpacity={0.8}>
          				<Image style={[styles.signUpContainer, styles.signUpContainerPosition]} resizeMode="cover" source={require("../../../assets/GoogleSignInButton.png")} />
        		</TouchableOpacity>

                 {/* navigaiton to sing in screen if user already has an account */}
      			<Text style={[styles.dontHaveAn, styles.dontHaveAnTypo]}>{`Don't have an account? `}</Text>
      			<Text style={[styles.signUpHere, styles.dontHaveAnTypo]} onPress={()=> navigation.navigate("SignUp")}>
                    Sign up here!
                </Text>


                {/* Back button */}
        		<TouchableOpacity style={[styles.backButton, styles.backLayout]} activeOpacity={0.8} onPress={()=> navigation.navigate("Welcome")}>
          			<Image resizeMode="cover" source={require("../../../assets/BackButton.png")} />
        		</TouchableOpacity>
        		
                <Image style={styles.lenddittIcon} resizeMode="cover" source={require("../../../assets/NewLenditLogo.png")} />
        	</View>);
};
      			
const styles = StyleSheet.create({
    textInput: {
        paddingHorizontal: 30, // Adds padding to start text 15 pixels to the right of the previous start point
        fontSize: 35, // Makes the text larger for better readability
        height: "100%", // Ensures the input text fills the container properly
        color: "#343A40", // Sets the input text color
    },
    containerShadowBox: {
        height: 58,
        width: 354,
        shadowOpacity: 1,
        elevation: 4,
        shadowRadius: 4,
        shadowOffset: {
              width: 0,
              height: 4
        },
        shadowColor: "rgba(0, 0, 0, 0.25)",
        left: -1,
        borderWidth: 1,
        borderColor: "#343a40",
        borderStyle: "solid",
        borderRadius: 30,
        position: "absolute"
  },
        emailShadowBox: {
            height: 58,
            width: 354,
            shadowOpacity: 1,
            elevation: 4,
            shadowRadius: 4,
            shadowOffset: {
                    width: 0,
                    height: 4
            },
            shadowColor: "rgba(0, 0, 0, 0.25)",
            left: -1,
            borderWidth: 1,
            borderColor: "#343a40",
            borderStyle: "solid",
            borderRadius: 30,
            position: "absolute"
        },
        tempTypo: {
            opacity: 0.3,
            width: 235,
            color: "#463f3a",
            left: 23,
            height: 43,
            fontFamily: "Quicksand-Regular",
            fontSize: 30,
            textAlign: "left",
            position: "absolute"
        },
        signLayout: {
            height: 56,
            width: 352,
            position: "absolute"
        },
        signUpContainerPosition: {
            top: 0,
            left: 0,
            borderRadius: 30
        },
        backTypo: {
            color: "#fff",
            fontFamily: "Quicksand-Medium",
            fontWeight: "500",
            textAlign: "left",
            position: "absolute"
        },
        dontHaveAnTypo: {
            height: 19,
            fontSize: 17,
            top: 698,
            color: "#000",
            textAlign: "left",
            position: "absolute"
        },
        orTypo: {
            fontSize: 25,
            textAlign: "left"
        },
        orLayout: {
            height: 36,
            position: "absolute"
        },
        seperatorLayout: {
            height: 1,
            width: 146,
            borderTopWidth: 1,
            borderColor: "#32373d",
            top: 20,
            opacity: 0.3,
            borderStyle: "solid",
            position: "absolute"
        },
        backLayout: {
            height: 38,
            width: 108,
            position: "absolute"
        },
        welcomeBackLender: {
            top: 130,
            fontSize: 60,
            fontWeight: "700",
            fontFamily: "Quicksand-Bold",
            color: "#343a40",
            width: 284,
            height: 219,
            textAlign: "left",
            left: 39,
            position: "absolute"
        },
        passwordContainer: {
            top: 69
        },
        email: {
            top: -1
        },
        emailTemp: {
            top: 7
        },
        passwordTemp: {
            top: 77
        },
        signUpUserInput: {
            top: 368,
            height: 126,
            width: 352,
            left: 39,
            position: "absolute"
        },
        signUpContainer: {
            left: 0,
            height: 56,
            width: 352,
            position: "absolute"
        },
        signIn: {
            top: 6,
            left: 127,
            width: 97,
            height: 43,
            fontSize: 30,
            color: "#fff"
        },
        signUpButton: {
            top: 513,
            left: 39
        },
        dontHaveAn: {
            left: 66,
            width: 193,
            fontFamily: "Quicksand-Regular",
            height: 19,
            fontSize: 17,
            top: 698
        },
        signUpHere: {
            left: 257,
            textDecorationLine: "underline",
            fontWeight: "600",
            fontFamily: "Quicksand-SemiBold",
            width: 106
        },
        continueWithGoogle: {
            left: 63,
            color: "#32373d",
            width: 265,
            top: 10,
            fontSize: 25,
            fontFamily: "Quicksand-Medium",
            fontWeight: "500",
            height: 43,
            position: "absolute"
        },
        googleLogoIcon: {
            left: 8,
            width: 47,
            top: 10,
            borderRadius: 30,
            height: 36
        },
        googleSignInButton: {
            top: 623,
            left: 39
        },
        or: {
            left: 153,
            width: 33,
            fontSize: 25,
            textAlign: "left",
            color: "#000",
            height: 36,
            top: 0,
            opacity: 0.3,
            fontFamily: "Quicksand-Regular"
        },
        orSeperatorChild: {
            left: 0
        },
        orSeperatorItem: {
            left: 190
        },
        orSeperator: {
            top: 578,
            left: 45,
            width: 335
        },
        backButtonChild: {
            backgroundColor: "#343a40",
            left: 0,
            top: 0,
            borderRadius: 30,
            borderWidth: 1,
            borderColor: "#343a40",
            borderStyle: "solid",
            height: 38,
            width: 108
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
            fontSize: 23,
            width: 54,
            height: 29,
            left: 39
        },
        backButton: {
            top: 77,
            left: 39
        },
        lenddittIcon: {
            // top: 763,
            // left: 117,
            width: 250,
            height: 240,
            position: 'absolute', // Positioning at the bottom
            bottom: -25, // Add some space from the bottom
            alignSelf: 'center', // Center horizontally
        },
        lenditSignUpIphone141: {
            backgroundColor: "#fff",
            flex: 1,
            width: "100%",
            height: 932,
            overflow: "hidden",
            alignItems: 'center',
            position:'relative'
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

export default FigmaSignInScreen;
