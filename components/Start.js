import React, { useState } from "react";
import {
  View,
  TextInput,
  Button,
  StyleSheet,
  Text,
  TouchableOpacity,
  ImageBackground,
  Dimensions,
  Image,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { getAuth, signInAnonymously } from "firebase/auth";

const Start = () => {
  const [name, setName] = useState("");
  const [chatColor, setChatColor] = useState("#FFFFFF"); // Default chat color
  const navigation = useNavigation();

  const auth = getAuth(); // Initialize outside for efficiency

  const handleSignIn = () => {
    signInAnonymously(auth)
      .then((userCredential) => {
        const user = userCredential.user;
        //Pass userID to Chat so the app knows which messages belong to the user
        navigation.navigate("Chat", { userID: user.uid, name, chatColor });
        Alert.alert("Signed in Successfully!");
      })
      .catch((error) => {
        console.error("Error signing in anonymously:", error.message);
        Alert.alert("Unable to sign in, please try again later.");
      });
  };

  return (
    <ImageBackground
      source={require("../assets/background-image.png")}
      style={styles.background}
    >
      {/* KeyboardAvoidingView wraps only the moving content */}
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={200} // Adjust this value as needed
        style={{ flex: 1 }}
      >
        <View style={styles.container}>
          <Text style={styles.title}>Sync</Text>
          <View style={styles.fixedLayout}>
            <TextInput
              style={styles.textInput}
              value={name}
              onChangeText={setName}
              placeholder="Your Name"
            />
            <Text style={styles.chooseColorText}>
              Choose a background color
            </Text>
            <View style={styles.colorContainer}>
              <TouchableOpacity
                style={[
                  styles.colorCircle,
                  { backgroundColor: "#282928" },
                  chatColor === "#282928" && styles.selectedColorCircle, // Add outline if selected
                ]}
                onPress={() => setChatColor("#282928")}
              />
              <TouchableOpacity
                style={[
                  styles.colorCircle,
                  { backgroundColor: "#474056" },
                  chatColor === "#474056" && styles.selectedColorCircle,
                ]}
                onPress={() => setChatColor("#474056")}
              />
              <TouchableOpacity
                style={[
                  styles.colorCircle,
                  { backgroundColor: "#8A95A5" },
                  chatColor === "#8A95A5" && styles.selectedColorCircle, 
                ]}
                onPress={() => setChatColor("#8A95A5")}
              />
              <TouchableOpacity
                style={[
                  styles.colorCircle,
                  { backgroundColor: "#B9C6AE" },
                  chatColor === "#B9C6AE" && styles.selectedColorCircle,
                ]}
                onPress={() => setChatColor("#B9C6AE")}
              />
            </View>
            <View style={styles.buttonWrapper}>
              <TouchableOpacity style={styles.button} onPress={handleSignIn}>
                <Text style={styles.buttonText}>Start Chatting</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </KeyboardAvoidingView>
    </ImageBackground>
  );
};

const { height, width } = Dimensions.get("window");

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  fixedLayout: {
    height: height * 0.44,
    width: width * 0.88,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.94)",
    borderRadius: 10,
    padding: 16,
  },
  title: {
    fontSize: 45,
    fontWeight: "600",
    color: "#FFFFFF",
    marginTop: "100",
    marginBottom: "100",
  },
  textInput: {
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 8,
    width: "88%",
    height: 60,
    fontSize: 16,
    fontWeight: "300",
    color: "#757083",
    backgroundColor: "#FFFFFF",
    placeholderTextColor: "#757083",
    borderRadius: 5,
    Opacity: 1,
  },
  chooseColorText: {
    fontSize: 16,
    fontWeight: "300",
    color: "#757083",
    marginBottom: 10,
  },
  colorContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "80%",
    marginBottom: 20,
  },
  colorCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  selectedColorCircle: {
    borderWidth: 1, 
    borderColor: "#000000", 
  },
  buttonWrapper: {
    width: "100%",
    alignItems: "center",
    marginTop: 20,
  },
  button: {
    backgroundColor: "#757083",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    height: 60,
    width: "88%",
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#FFFFFF",
    textAlign: "center",
  },
});

export default Start;
