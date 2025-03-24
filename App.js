import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Start from "./components/Start";
import Chat from "./components/Chat";

import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

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

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Start">
        <Stack.Screen name="Start" component={Start} />
        <Stack.Screen name="Chat">
          {/* Pass the db variable to the Chat component via reacts "passing addiitonal props docs"*/}
          {(props) => <Chat {...props} db={db} />}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
