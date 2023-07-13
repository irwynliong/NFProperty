import { useState, useEffect } from 'react';
import firebase from 'firebase/app';
import 'firebase/firestore';

const useFirebase = () => {
  const [error, setError] = useState(null);

  useEffect(() => {
    const connect = async () => {
      try {
        // Initialize Firebase
        const firebaseConfig = {
          // Your Firebase configuration object
        };
        if (!firebase.apps.length) {
          firebase.initializeApp(firebaseConfig);
        }

        // Get a reference to the Firestore database
        const db = firebase.firestore();

        // Use the Firestore database as needed
      } catch (err) {
        setError(err);
      }
    };
    connect();
  }, []);

  return { error };
};

export default useFirebase;

