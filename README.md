# Sync


## Table of Contents
- [Overview](#overview)
- [Features](#features)
- [User Stories](#user-stories)
- [Tech Stack](#tech-stack)
- [Setting Up the Environment](#Setting-Up-the-Environment)
- [Installation](#installation)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [Future Enhancements](#future-enhancements)
- [Contributing](#contributing)
- [License](#license)

## Overview
Sync is React Native Mobile Chat App is a real-time chat application built using React Native, Expo, and Firebase. It allows users to communicate via text messages, share images, and send their current location.

## Features
- Anonymous user authentication via Firebase
- Real-time messaging using Firestore Database
- Image sharing from device library or camera
- Location sharing via map integration
- Offline message storage and retrieval
- Accessibility support for screen readers
- Customizable chat UI with different background themes

## User Stories
- **As a new user**, I want to enter a chat room quickly, so I can start conversations immediately.
- **As a user**, I want to send and receive messages in real-time.
- **As a user**, I want to share images from my gallery or camera.
- **As a user**, I want to send my current location to friends.
- **As a user**, I want to read my messages offline.
- **As a user with a visual impairment**, I want the app to be screen reader-compatible.

## Tech Stack
- **Frontend**: React Native, Expo
- **Backend**: Firebase Firestore Database, Firebase Authentication, Firebase Cloud Storage
- **Libraries**: Gifted Chat, AsyncStorage, Expo Location, Expo ImagePicker


## Setting Up the Environment

To ensure your development environment is properly configured for running the Sync chat app, follow these steps:

**Install Node.js**

1. Download and install Node.js from nodejs.org.



**Set Up Expo**

1. Create an Expo account at expo.dev.

2. Install Expo Go on your mobile device from the App Store or Google Play.

**Install Android Studio (For Android Emulator)**

1. Download and install Android Studio.

2. Open Android Studio and go to SDK Manager to install necessary SDK tools.

3. Under **SDK Platforms** ensure the following are checked: 
   - Android 15.0 ("Vanilla Ice Cream")
   - Android SDK Platform 35
   - Sources for Android 35
   - Google Play ARM 64 v8a System Image

4. Under **SDK Tools** ensure the following are checked: 
   - Android SDK Build-Tools 36 
   - Android Emulator 
   - Android SDK PLatform- Tools 


**Firebase Configuration**

1. Create a Firebase project at Firebase Console.

2. Enable Firestore Database and Authentication.

3. Configure read/write "Rules" Tab of database configuration. 
   Example: 
   - allow read, write: if **false**; 

   Change to; 
   - allow read, write: if **true**; 




## Installation
1. Clone the repository:
   ```sh
   git clone https://github.com/your-username/sync.git
   ```
2. Navigate to the project folder:
   ```sh
   cd sync
   ```
3. Install dependencies:
   ```sh
   npm install
   ```
4. Start the Expo development server: 
You do not need to install expo-cli globally. Instead, you can use npx to run Expo:
This will automatically use the latest version of Expo CLI:

   ```sh
   npx expo start
   ```

## Usage
1. Run the app on an emulator or physical device using Expo Go.
2. Enter your name and choose a background color.
3. Join the chat room and start messaging.
4. Send images and location as needed.

## Project Structure
```
sync/
│── assets/                  # Static images and icons
│── components/              # Reusable UI components
│── App.js                   # Main app entry point & Firebase and API service handlers
│── package.json             # Project dependencies and scripts
│── README.md                # Project documentation
```

## Future Enhancements
- Push notifications for new messages
- Group chat functionality
- Voice and video calling support
- Dark mode option

## Contributing
Contributions are welcome! Please submit a pull request for any improvements.

## License
This project is licensed under the MIT License.
