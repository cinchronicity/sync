# Sync


## Table of Contents
- [Overview](#overview)
- [Features](#features)
- [User Stories](#user-stories)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [Screenshots](#screenshots)
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
   ```sh
   npm start
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
│── services/                # Firebase and API service handlers
│── App.js                   # Main app entry point
│── package.json             # Project dependencies and scripts
│── README.md                # Project documentation
```
<!-- 
## Screenshots
(Add images here if available) -->

## Future Enhancements
- Push notifications for new messages
- Group chat functionality
- Voice and video calling support
- Dark mode option

## Contributing
Contributions are welcome! Please submit a pull request for any improvements.

## License
This project is licensed under the MIT License.
