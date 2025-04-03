import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Start from "./components/Start";
import Chat from "./components/Chat";

import { Alert } from "react-native";
import { initializeApp } from "firebase/app";
import {
  getFirestore,
  enableNetwork,
  disableNetwork,
} from "firebase/firestore";
import { useNetInfo } from "@react-native-community/netinfo";
import { useEffect } from "react";
import { getStorage } from "firebase/storage";

const Stack = createNativeStackNavigator();

const App = () => {
  const firebaseConfig = {
    apiKey: "AIzaSyATqcDr9sgUSX5ynbTzj_oGCQHShESIHSc",
    authDomain: "sync-chat-app-daaac.firebaseapp.com",
    projectId: "sync-chat-app-daaac",
    storageBucket: "sync-chat-app-daaac.firebasestorage.app",
    messagingSenderId: "708910123647",
    appId: "1:708910123647:web:db42f4f981feb723334d4a",
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);

  // Initialize Cloud Firestore and get a reference to the service (db variable)
  const db = getFirestore(app);
  //initialize Cloud Storage and get a reference to the service (storage variable)
  const storage = getStorage(app);

  //new state that represents the connection status
  const connectionStatus = useNetInfo();

  useEffect(() => {
    if (connectionStatus.isConnected === false) {
      //disable Firestore network when connection is lost and show an alert
      Alert.alert("Connection Lost!");
      disableNetwork(db).catch((error) =>
        console.error("Error disabling Firestore network:", error)
      );
    } else if (connectionStatus.isConnected === true) {
      //enable Firestore network when online
      enableNetwork(db).catch((error) =>
        console.error("Error enabling Firestore network:", error)
      );
    }
  }, [connectionStatus.isConnected]); // Re-run effect when connection status changes

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Start">
        <Stack.Screen name="Start" component={Start} />
        <Stack.Screen name="Chat">
          {/* Pass the db variable to the Chat component via reacts "passing addiitonal props docs"*/}
          {(props) => (
            <Chat
              {...props}
              db={db}
              isConnected={connectionStatus.isConnected}
              storage={storage}
            />
          )}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
