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
} from "react-native";
import { useNavigation } from "@react-navigation/native";
// import SvgIcon from "../assets/icon.svg"; // Import the SVG icon

const Start = () => {
  const [name, setName] = useState("");
  const [chatColor, setChatColor] = useState("#FFFFFF"); // Default chat color
  const navigation = useNavigation();

  const handleStartChatting = () => {
    navigation.navigate("Chat", { name, chatColor });
  };
  return (
    <ImageBackground
      source={require("../assets/background-image.png")}
      style={styles.background}
    >
      <View style={styles.container}>
        <Text style={styles.title}>Sync</Text>
        <View style={styles.fixedLayout}>
          {/* <View style={styles.inputWrapper}> */}
          {/* <SvgIcon width={24} height={24} style={styles.icon} /> */}
          <TextInput
            style={styles.textInput}
            value={name}
            onChangeText={setName}
            placeholder="Your Name"
          />
          <Text style={styles.chooseColorText}>Choose a background color</Text>
          <View style={styles.colorContainer}>
            <TouchableOpacity
              style={[styles.colorCircle, { backgroundColor: "#090C08" }]}
              onPress={() => setChatColor("#090C08")}
            />
            <TouchableOpacity
              style={[styles.colorCircle, { backgroundColor: "#474056" }]}
              onPress={() => setChatColor("#474056")}
            />
            <TouchableOpacity
              style={[styles.colorCircle, { backgroundColor: "#8A95A5" }]}
              onPress={() => setChatColor("#8A95A5")}
            />
            <TouchableOpacity
              style={[styles.colorCircle, { backgroundColor: "#B9C6AE" }]}
              onPress={() => setChatColor("#B9C6AE")}
            />
          </View>
          <View style={styles.buttonWrapper}>
            <TouchableOpacity
              style={styles.button}
              onPress={handleStartChatting}
            >
              <Text style={styles.buttonText}>Start Chatting</Text>
            </TouchableOpacity>
          </View>
        </View>
        {Platform.OS === "ios" ? (
          <KeyboardAvoidingView behavior="padding" />
        ) : null}
      </View>
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
    marginBottom: "200",
  },
  // inputWrapper: {
  //   flexDirection: "row",
  //   alignItems: "center",
  //   width: "100%",
  //   marginBottom: 12,
  // },

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
    // opacity: 1,
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
