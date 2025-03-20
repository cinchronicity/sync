import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Platform,
  KeyboardAvoidingView,
} from "react-native";
import { useEffect, useState } from "react";
import {
  GiftedChat,
  Bubble,
  Day,
  SystemMessage,
} from "react-native-gifted-chat";

const Chat = ({ route, navigation }) => {
  const { name, chatColor } = route.params;
  const [messages, setMessages] = useState([]);

  // Function to determine text color based on background color
  const getTextColor = (backgroundColor) => {
    const darkColors = ["#090C08", "#474056"];
    return darkColors.includes(backgroundColor) ? "#FFFFFF" : "#000000";
  };
  const textColor = getTextColor(chatColor);

  //empty array as second argument triggers the effect only once after the initial render
  useEffect(() => {
    navigation.setOptions({ title: name });
    setMessages([
      {
        _id: 1,
        text: "Hello developer",
        createdAt: new Date(),
        user: {
          _id: 2,
          name: "React Native",
          avatar: "https://placeimg.com/140/140/any",
        },
      },
      {
        _id: 2,
        text: "This is a system message",
        createdAt: new Date(),
        system: true,
      },
    ]);
  }, []);

  const onSend = (newMessages) => {
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, newMessages)
    );
  };
  // Custom render for system messages from the GiftedChat library
  const renderSystemMessage = (props) => {
    return (
      <SystemMessage
        {...props}
        textStyle={{ color: textColor }} // Apply dynamic text color
      />
    );
  };
  // Custom render for the date (Day component)
  const renderDay = (props) => {
    return <Day {...props} textStyle={{ color: textColor }} />;
  };

  const renderBubble = (props) => {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          right: {
            backgroundColor: "#000",
          },
          left: {
            backgroundColor: "#FFF",
          },
        }}
      />
    );
  };

  return (
    <View style={[styles.container, { backgroundColor: chatColor }]}>
      <GiftedChat
        messages={messages}
        renderBubble={renderBubble}
        onSend={(messages) => onSend(messages)}
        user={{
          _id: 1,
          name,
        }}
        renderSystemMessage={renderSystemMessage} // Custom system message
        renderDay={renderDay} // Custom date
      />
      {Platform.OS === "android" ? (
        <KeyboardAvoidingView behavior="height" />
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  // text: {
  //   fontSize: 18,
  // },
});

export default Chat;
