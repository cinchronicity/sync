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
import { collection, query, orderBy, onSnapshot, addDoc, where } from "firebase/firestore";

const Chat = ({ route, navigation, db }) => {
  const { name, chatColor, userID } = route.params;
  const [messages, setMessages] = useState([]);

  // Function to determine text color based on background color
  const getTextColor = (backgroundColor) => {
    const darkColors = ["#090C08", "#474056"];
    return darkColors.includes(backgroundColor) ? "#FFFFFF" : "#000000";
  };
  const textColor = getTextColor(chatColor);

  useEffect(() => {
    // 
    navigation.setOptions({ title: name });

    // Firestore query
    const messagesQuery = query(
      collection(db, "messages"),
      // where("user._id", "==", userID), // Fetch only messages sent by this user
      orderBy("createdAt", "desc")
    );

    // Real-time listener for messages
    const unsubscribe = onSnapshot(messagesQuery, (snapshot) => {
      const fetchedMessages = snapshot.docs.map((doc) => ({
        _id: doc.id, //use firestore document ID as unique key
        text: doc.data().text,
        createdAt: doc.data().createdAt.toDate(), // Convert Firestore Timestamp to Date
        user: doc.data().user,
      }));
      // Update the state with the fetched messages
      setMessages(fetchedMessages);
    });

    return () => unsubscribe(); // Cleanup Firestore listener on unmount
  }, [db, userID]); // Re-run effect when userID changes

  //save sent messages to Firestore database
  const onSend = (newMessages) => {
    addDoc(collection(db, "messages"), newMessages[0]);
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
          _id: userID, // Unique ID for the user
          name: name, 
        }}
        renderSystemMessage={renderSystemMessage} // Custom system message
        renderDay={renderDay} // Custom date
      />
      <KeyboardAvoidingView
        behavior={Platform.OS === "android" ? "height" : "padding"}
        keyboardVerticalOffset={-210}
      />
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
