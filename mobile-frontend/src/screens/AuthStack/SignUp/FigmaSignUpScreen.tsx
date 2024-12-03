import * as React from "react";
import { useNavigation } from '@react-navigation/native';
import { Alert } from 'react-native';
import { AuthScreenNavigationType } from "../../../navigation/types";
import {createUserWithEmailAndPassword, getAuth, updateProfile} from 'firebase/auth';
import { useForm, Controller } from 'react-hook-form';
import { authInstance } from "../../../services/firebase"
import { Animated, Image, StyleSheet, Text, View, TouchableOpacity, Pressable, TextInput, Easing} from "react-native";


// import "@fontsource/quicksand"; // Defaults to weight 400
// import "@fontsource/quicksand/400.css"; // Specify weight
// import "@fontsource/quicksand/400-italic.css"; // Specify weight and style

// Define an interface to type the form data for user sign-up
interface IUser {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
}



// Define the SignupScreen component
const FigmaSignUpScreen = () => {
    // Use the useNavigation hook to get access to the navigation prop with typed routes
    const navigation = useNavigation<AuthScreenNavigationType<"SignUp">>();

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
            name: "",
            email: "",
            password: "",
            confirmPassword: "",
        },
    });

	const validateEmail = (email: string): boolean => {
		const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		return re.test(String(email).toLowerCase());
	}

	const onSubmit = async (data: IUser): Promise<void> => {
		try {
			const { email, name, password, confirmPassword } = data;

			if (password !== confirmPassword) {
				Alert.alert("Passwords do not match", "Please make sure both passwords are the same.");
				return;
			}

			if (!validateEmail(email)) {
				Alert.alert("Invalid Email", "Please enter a valid email address.");
				return;
			}

			const names = name.split(' ');
			const firstName = names[0];
			const lastName = names.slice(1).join(' ') || 'Unknown'; // Provide a fallback for lastName

			console.log('Names:', { firstName, lastName });

			const auth = getAuth();
			const userCredential = await createUserWithEmailAndPassword(auth, email, password);
			const firebaseUID = userCredential.user.uid;

			const userData = {
				firstName,
				lastName,
				email,
				username: email.split('@')[0],
				password,
				firebaseUID
			};

			console.log('User data before sending to backend:', userData);

			const response = await fetch(`IPADDRESS:8000/api/users/`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(userData),
			});

			if (!response.ok) {
				const errorResponse = await response.text();
				console.error('Error response from server:', errorResponse);
				throw new Error(`Failed to sign up user: ${response.status} ${response.statusText}`);
			}

			const responseData = await response.json();
			console.log('User signed up successfully:', responseData);

		} catch (error) {
			if (error instanceof Error) {
				console.error('Error signing up user:', error.message);
				Alert.alert("Submission Failed", error.message);
			} else {
				console.error('Unknown error occurred', error);
				Alert.alert("Submission Failed", "Please check your input and try again.");
			}
		}
	};





	// Function to handle user registration and profile update
    const signUpWithEmailAndPassword = async (email: string, password: string, name: string) => {
        try {
            // Create a new user with the provided email and password using Firebase
            const userCredential = await createUserWithEmailAndPassword(authInstance, email, password);
            const user = userCredential.user;
            console.log('User created:', user);

            // Update the user's profile with their display name
            await updateProfile(user, { displayName: name });
            console.log("User's display name updated:", name);

            // Navigate to the next screen after successful signup (e.g., Home screen)
            // navigation.navigate("Home"); // Uncomment and replace with the actual route
        } catch (error) {
            console.log("Error registering user", error);
            // Alert the user in case of an error during registration
            Alert.alert("Registration Error", "There was an issue creating your account. Please try again.");
        }
    }

  	return (
    		<View style={styles.lenditSignUpIphone}>
      			<Image style={styles.backgroundIcon} resizeMode="cover" source={require("../../../../assets/Background.png")}/>

      			<Animated.Text style={[styles.letsGetStarted, { transform: [{ translateX: slideAnimation }] }]}>
  					Let's get started
				</Animated.Text>


      			<View style={[styles.signUpUserInput, styles.inputPosition]}>
                {/* full name  input */}
                    <Controller
                        control={control}
                        name="name"
                        render={({ field: { onChange, onBlur, value } }) => (
                            <TextInput
                                style={[ styles.textInput, styles.fullNameContainer, styles.containerShadowBox]}
                                placeholder="Full Name"
                                onChangeText={onChange}
                                onBlur={onBlur}
                                value={value}
                            />
                        )}
                    />
                    {errors.name && <Text >Name is required</Text>}

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
                    {errors.password && <Text style={{ color: 'red' }}>Password is required</Text>}

                {/* confirm password input */}
                    <Controller
                        control={control}
                        name="confirmPassword"
                        render={({ field: { onChange, onBlur, value } }) => (
        				    <TextInput 
                                style={[ styles.textInput, styles.confirmPasswordContainer, styles.containerShadowBox]} 
                                placeholder="Confirm Password"
                                secureTextEntry
                                onChangeText={onChange}
                                onBlur={onBlur}
                                value={value}
                            />
                        )}
                    />
                    {errors.confirmPassword && <Text style={{ color: 'red' }}>Confirm Password is required</Text>}

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
                    {errors.email && <Text style={{ color: 'red' }}>Email is required</Text>}
                    
      			</View>

                {/* sign up submission button */}
      			<TouchableOpacity style={[styles.signUpButton, styles.signLayout]} activeOpacity={0.8} onPress={handleSubmit(onSubmit)}>
        				<Image style={[styles.signUpContainer, styles.signLayout]} resizeMode="cover" source={require("../../../../assets/SignUpContainer.png")} />
        				<Text style={[styles.confirmPasswordTemp1, styles.backTypo]}>Sign up</Text>
      			</TouchableOpacity>

				<View style={[styles.orSeperator, styles.orLayout]}>
        				<Text style={[styles.or, styles.orLayout]}>Or</Text>
        				<View style={[styles.orSeperatorChild, styles.seperatorLayout]} />
        				<View style={[styles.orSeperatorItem, styles.seperatorLayout]} />
      			</View>

                {/* navigaiton to sing in screen if user already has an account */}
      			<Text style={[styles.alreadyHaveAn, styles.signInTypo]}>{`Already have an account? `}</Text>
      			<Text style={[styles.signIn, styles.signInTypo]} onPress={()=> navigation.navigate("SignIn")}>
                    Sign in.
                </Text>

                {/* continue with google button */}
                {/* work in progress still */}
      			<TouchableOpacity style={[styles.googleSignInButton, styles.signLayout]}  activeOpacity={0.8}>
        				<Image style={[styles.signUpContainer, styles.signLayout]} resizeMode="cover" source={require("../../../../assets/GoogleSignInButton.png")} />
      			</TouchableOpacity>

    
                {/* back to home screen button */}
      			<TouchableOpacity style={[styles.backButton, styles.backLayout]} activeOpacity={0.8} onPress={()=> navigation.navigate("Welcome")}>
        				<Image resizeMode="cover" source={require("../../../../assets/BackButton.png")} />
      			</TouchableOpacity>
    		</View>);
};

const styles = StyleSheet.create({
    textInput: {
        paddingHorizontal: 30, // Adds padding to start text 15 pixels to the right of the previous start point
        fontSize: 35, // Makes the text larger for better readability
        height: "100%", // Ensures the input text fills the container properly
        color: "#343A40", // Sets the input text color
    },
  	letsGetStartedPosition: {
    		width: 350,
    		left: 39,
    		marginTop:0,
    		position: "absolute"
  	},
    inputPosition: {
        width: 350,
        left: 39,
        position: "absolute"
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
  	tempTypo: {
    		left: 23,
    		opacity: 0.3,
    		height: 43,
    		color: "#463f3a",
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
  	backTypo: {
    		fontFamily: "Quicksand-Medium",
    		fontWeight: "500",
    		position: "absolute"
  	},
  	signInTypo: {
    		height: 19,
    		fontSize: 17,
    		top: 830,
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
  	backgroundIcon: {
    		width: 430,
    		left: 0,
    		top: 0,
    		position: "absolute",
    		height: 932,
            opacity: 0.35
  	},
  	letsGetStarted: {
    		top: 160,
    		fontSize: 60,
    		fontWeight: "700",
    		fontFamily: "Quicksand-Bold",
    		height: 150,
			left: 39,
    		textAlign: "left",
    		color: "#343a40"
  	},
  	fullNameContainer: {
    		top: -1
  	},
  	passwordContainer: {
    		top: 139
  	},
  	confirmPasswordContainer: {
    		top: 210
  	},
  	email: {
    		top: 69
  	},
  	fullNameTemp: {
    		top: 7,
    		left: 20,
    		opacity: 0.3,
    		color: "#463f3a",
    		height: 43,
    		width: 235,
    		fontFamily: "Quicksand-Regular",
    		fontSize: 30,
    		textAlign: "left",
    		position: "absolute"
  	},
  	emailTemp: {
    		top: 77,
    		width: 235,
    		left: 23
  	},
  	passwordTemp: {
    		top: 147,
    		width: 235,
    		left: 23
  	},
  	confirmPasswordTemp: {
    		top: 218,
    		width: 291
  	},
  	signUpUserInput: {
    		top: 312,
    		height: 267
  	},
  	signUpContainer: {
    		borderRadius: 30,
    		height: 56,
    		left: 0,
    		top: 0
  	},
  	confirmPasswordTemp1: {
    		top: 6,
    		left: 116,
    		color: "#fff",
    		width: 120,
    		height: 43,
    		fontWeight: "500",
    		fontSize: 30,
    		textAlign: "left"
  	},
  	signUpButton: {
    		top: 648,
    		left: 39
  	},
  	alreadyHaveAn: {
    		left: 84,
    		width: 212,
    		fontFamily: "Quicksand-Regular",
    		fontSize: 17,
    		top: 830
  	},
  	signIn: {
    		left: 280,
    	    textDecorationLine: "underline",
    		fontWeight: "600",
    		fontFamily: "Quicksand-SemiBold",
    		width: 71
  	},
  	continueWithGoogle: {
    		left: 63,
    		color: "#32373d",
    		width: 265,
    		top: 10,
    		fontFamily: "Quicksand-Medium",
    		fontWeight: "500",
    		position: "absolute",
    		height: 43
  	},
  	googleLogoIcon: {
    		left: 8,
    		width: 47,
    		top: 10
  	},
  	googleSignInButton: {
    		top: 758,
    		left: 39
  	},
  	or: {
    		left: 153,
    		width: 33,
    		fontSize: 25,
    		textAlign: "left",
    		color: "#000",
    		height: 36,
    		opacity: 0.3,
    		fontFamily: "Quicksand-Regular",
    		top: 0
  	},
  	orSeperatorChild: {
    		left: 0
  	},
  	orSeperatorItem: {
    		left: 190
  	},
  	orSeperator: {
    		top: 713,
    		left: 45,
    		width: 335
  	},
  	backButtonChild: {
    		top: 19,
    		left: 12,
    		maxHeight: "100%",
    		width: 23,
    		position: "absolute"
  	},
  	backButtonItem: {
    		backgroundColor: "rgba(189, 224, 254, 0.35)",
    		borderWidth: 1,
    		borderColor: "#343a40",
    		borderStyle: "solid",
    		height: 38,
    		width: 108,
    		borderRadius: 30,
    		left: 0,
    		top: 0
  	},
  	back: {
    		top: 5,
    		fontSize: 23,
    		width: 54,
    		height: 29,
    		textAlign: "left",
    		color: "#343a40",
    		left: 39
  	},
  	backButton: {
    		top: 77,
    		left: 39
  	},
  	lenditSignUpIphone: {
    		backgroundColor: "#fff",
    		flex: 1,
    		width: "100%",
    		overflow: "hidden",
    		height: 932
  	}
});

export default FigmaSignUpScreen;
