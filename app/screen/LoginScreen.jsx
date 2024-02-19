import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import * as WebBrowser from "expo-web-browser";
import { useOAuth } from "@clerk/clerk-expo";
import Colors from "../utils/Colors";
import { useWarmUpBrowser } from "../../hooks/useWarmUpBrowser";

WebBrowser.maybeCompleteAuthSession();






export default function LoginScreen() {
useWarmUpBrowser();
const { startOAuthFlow } = useOAuth({ strategy: "oauth_google" });

 const onPress = async () => {
  try {
    const { createdSessionId, signIn, signUp, setActive } =
      await startOAuthFlow();

    if (createdSessionId) {
      setActive({ session: createdSessionId });
    } else {
      // Use signIn or signUp for next steps such as MFA
    }
  } catch (err) {
    console.error("OAuth error", err);
  }
}; 

  return (
    <View style={styles.container}>
      <Image
        source={require("../../assets/images/logo.jpg")}
        style={styles.logoImage}
      />
      <Image
        source={require("../../assets/images/background.jpg")}
        style={styles.bgImage}
      />
      <View style={styles.headingContainer}>
        <Text style={styles.headingText}>
          Your Ultimate EV Charging Station Finder App
        </Text>
        <Text style={styles.description}>
          Find EV charging station near you, plan trip and so much move in just
          one click
        </Text>
        <TouchableOpacity style={styles.button} onPress={onPress}>
          <Text style={styles.buttonText}>Login With Google</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 50,
  },
  logoImage: {
    width: 200,
    height: 40,
    resizeMode: "contain",
  },
  bgImage: {
    width: "100%",
    height: 240,
    //resizeMode: 'contain'
  },
  headingContainer: {
    padding: 20,
  },
  headingText: {
    fontSize: 25,
    fontFamily: "outfit-bold",
    textAlign: "center",
    marginTop: 20,
  },
  description: {
    fontSize: 17,
    fontFamily: "outfit",
    marginTop: 15,
    textAlign: "center",
    color: Colors.GRAY,
  },
  button: {
    backgroundColor: Colors.PRIMARY,
    padding: 16,
    display: "flex",
    borderRadius: 99,
    marginTop: 50,
  },
  buttonText: {
    textAlign: "center",
    color: Colors.WHITE,
    fontSize: 17,
    fontFamily: "outfit",
  },
});
