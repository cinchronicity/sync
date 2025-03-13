import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { useEffect } from "react";

const Chat = ({ route, navigation }) => {
  const { name, chatColor } = route.params;

  //empty array as second argument triggers the effect only once after the initial render
  useEffect(() => {
    navigation.setOptions({ title: name });
  }, []);

  // Function to determine text color based on background color
  const getTextColor = (backgroundColor) => {
    const darkColors = ["#090C08", "#474056"];
    return darkColors.includes(backgroundColor) ? "#FFFFFF" : "#000000";
  };
  const textColor = getTextColor(chatColor);

  return (
    <View style={[styles.container, { backgroundColor: chatColor }]}>
      <Text style={[styles.text, { color: textColor }]}>
        Welcome to the chat, {name}!
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 18,
  },
});

export default Chat;
