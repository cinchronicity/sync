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
  InputToolbar, 
} from "react-native-gifted-chat";
import { collection, query, orderBy, onSnapshot, addDoc, where,} from "firebase/firestore";
import { deleteDoc, getDocs, doc} from "firebase/firestore";
import AsyncStorage from "@react-native-async-storage/async-storage";
import CustomActions from "./CustomActions";
import MapView from 'react-native-maps';



const Chat = ({ route, navigation, db, isConnected , storage}) => {
  const { name, chatColor, userID } = route.params;
  const [messages, setMessages] = useState([]);

  // Function to determine text color based on background color
  const getTextColor = (backgroundColor) => {
    const darkColors = ["#090C08", "#474056"];
    return darkColors.includes(backgroundColor) ? "#FFFFFF" : "#000000";
  };
  const textColor = getTextColor(chatColor);

  let unsubMessages;

  useEffect(() => {
    // Sets the username as navigation bar title
    navigation.setOptions({ title: name });
    if (isConnected === true) {
      // Unregister the current onSnapshot() listener to avoid multiple listeners when useEffect re-executes.
      if (unsubMessages) unsubMessages();
      unsubMessages = null;
      // Firestore query that sorts messages by creation date
      const messagesQuery = query(
        collection(db, "messages"),
        orderBy("createdAt", "desc")
      );
      // Real-time listener for messages
      unsubMessages = onSnapshot(messagesQuery, (docs) => {
        // console.log("onSnapshot triggered"); 
        let newMessages = [];
        docs.forEach(doc => {
          newMessages.push({
            id: doc.id,
            ...doc.data(),
            createdAt: new Date(doc.data().createdAt.toMillis())
          })
        })
        // console.log("Fetched messages from Firestore:", newMessages); // Log the messages array
        // console.log("Updated messages:", newMessages); // Check if image/location messages are included

        cacheMessages(newMessages);
        setMessages(newMessages);
      });
    } else {
      loadCachedMessages(); // Load cached messages if offline
    }
  
    return () => {
      // Clean up Firestore listener when the component unmounts
      if (unsubMessages) unsubMessages();
    };
  }, [isConnected]); // Re-run effect when connection status changes
  
  /**
   * Handler to cache messages to AsyncStorage
   * @param messagesToCache The messages array to store in the cache
   */
  const cacheMessages = async (messagesToCache) => {
    try {
      await AsyncStorage.setItem(
        "messages_list",
        JSON.stringify(messagesToCache)
      );
    } catch (error) {
      console.log(error.message);
    }
  };

  
  /**
   * Handler to load cached messages when offline
   */
  const loadCachedMessages = async () => {
    const cachedMessages = await AsyncStorage.getItem("messages_list");
    if (cachedMessages) {
      setMessages(JSON.parse(cachedMessages));
    }
  };

    /**
   * Handler to render the InputToolbar
   * @param props The default props of InputToolbar
   * @returns InputToolbar if internet connection is available, otherwise null
   */
    const renderInputToolbar = (props) => {
      if (isConnected) return <InputToolbar {...props} />;
      else return null;
    };
  

  // save sent messages to Firestore database
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
// This function renders the CustomActions component, passing all received props to it.
// used to add custom UI actions (e.g., buttons or menus) in the chat interface.
// CustomActions component is a button that allows users to take a photo, choose an image from the library, or share their location.
  const renderCustomActions = (props) => {
    return <CustomActions onSend={onSend} storage={storage} userID={userID} name={route.params.name} {...props} />;
  };

//check if currentMesssage has a location data, if yes return a mapview
  const renderCustomView = (props) => {
    const { currentMessage} = props;
    if (currentMessage.location) {
      // console.log("Rendering MapView for location:", currentMessage.location); NOT WORKING 
      return (
          <MapView
            style={{
              width: 150,
              height: 100,
              borderRadius: 13,
              margin: 3}}
            region={{
              latitude: currentMessage.location.latitude,
              longitude: currentMessage.location.longitude,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
          />
      );
    }
    return null;
  }

  return (
    <View style={[styles.container, { backgroundColor: chatColor }]}>
      <GiftedChat
        messages={messages}
        renderBubble={renderBubble}
        renderSystemMessage={renderSystemMessage} // Custom system message
        renderDay={renderDay} // Custom date
        renderInputToolbar={renderInputToolbar}
        renderActions={renderCustomActions}
        renderCustomView={renderCustomView}
        onSend={messages => onSend(messages)}
        user={{
          _id: userID, // Unique ID for the user
          name: name, 
        }}

      />
      <KeyboardAvoidingView
        behavior={Platform.OS === "android" ? "height" : "padding"}
   
      />
    </View>
  );x
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default Chat;
