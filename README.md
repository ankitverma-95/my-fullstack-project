# Real-Time Flight Status Updates System

This system provides real-time flight status updates and notifications to passengers. It features a web application developed with React.js for the frontend, a backend built with Java, MongoDB for data storage, and Firebase Cloud Messaging for sending notifications. Additionally, Leaflet is used to display flight maps.

## Features
- Real-time Updates: Display current flight status (delays, cancellations, gate
changes).
- Push Notifications: Send notifications for flight status changes via SMS, email, or
app notifications you can use kafka, RabbitMQ , etc.
- Integration with Airport Systems: Pull data from airport databases for accurate 
information.

## Tech Stack
- Frontend: React.js
- Backend: Java
- Database: MongoDB
- Notifications: Firebase Cloud Messaging
- Maps: Leaflet

## Prerequisites
- Node.js
- Java Development Kit (JDK)
- MongoDB
- Firebase account

## Setup

### Frontend (React.js)
1. Clone the repository:

2. Install dependencies:
    ```sh
    npm install
    ```

3. Start the React development server:
    ```sh
    npm start
    ```

### Backend (Java)
1. Navigate to the backend directory:
    ```sh
    cd flight-status-updates/backend
    ```

2. Build the project using your preferred build tool (e.g., Maven, Gradle):
    ```sh
    mvn clean install
    ```

3. Run the backend server:
    ```sh
    java -jar target/your-backend-jar-file.jar
    ```

### Database (MongoDB)
1. Install MongoDB and start the MongoDB server:
    ```sh
    mongod
    ```

2. Ensure MongoDB is running on the default port (27017).

### Firebase Configuration
1. Create a Firebase project at the [Firebase Console](https://console.firebase.google.com/).
2. Enable Firebase Cloud Messaging:
   - In your Firebase project, go to **Project Settings**.
   - Navigate to the **Cloud Messaging** tab.
   - Generate a new server key and note down the credentials.

3. Configure Firebase in your React project:
   - Create a `firebaseutils.js` file in your `src` directory:
    ```javascript
    import firebase from 'firebase/app';
    import 'firebase/messaging';

    const firebaseConfig = {
      apiKey: "YOUR_API_KEY",
      authDomain: "YOUR_AUTH_DOMAIN",
      projectId: "YOUR_PROJECT_ID",
      storageBucket: "YOUR_STORAGE_BUCKET",
      messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
      appId: "YOUR_APP_ID",
      measurementId: "YOUR_MEASUREMENT_ID"
    };

    firebase.initializeApp(firebaseConfig);

    const messaging = firebase.messaging();

    export { messaging };
    ```

4. Configure Firebase in your Java backend:
   - Add the Firebase Admin SDK to your project dependencies.
   - Initialize Firebase Admin SDK:
  
5. Obtain the service account key file from your Firebase project and save it in resources directory in backend folder project .

6. Ensure to check database name in application.property file in resources directory.

## Usage
- Start the frontend server (`npm start` in the `frontend` directory).
- Start the backend server (`java -jar target/your-backend-jar-file.jar` in the `backend` directory) or simply run bootrun command.
- Ensure MongoDB server is running.
- Access the web application at `http://localhost:3000`.


## Demo
Check out the demo video to see the system in action: [Demo Video](https://www.example.com/demo)


