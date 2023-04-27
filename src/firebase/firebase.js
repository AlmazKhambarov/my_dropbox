import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyDqCG7OX4K199Iz6WwqORDtg0OUq5-zerU",
    authDomain: "dropbox-f4625.firebaseapp.com",
    projectId: "dropbox-f4625",
    storageBucket: "dropbox-f4625.appspot.com",
    messagingSenderId: "504889889864",
    appId: "1:504889889864:web:3ca43b1268d542e61f347d",
    measurementId: "G-3YEZJVYB1S"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app); // initialize Firebase Storage
export { auth, db, storage };