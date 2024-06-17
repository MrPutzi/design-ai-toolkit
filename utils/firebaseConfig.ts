
import { initializeApp } from 'firebase/app';
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth';


export const firebaseConfig = {
        apiKey: "AIzaSyClhLvGQbdFJPGUMouNbbtCtmv30KjpNYs",
        authDomain: "design-ai-toolkit.firebaseapp.com",
        projectId: "design-ai-toolkit",
        storageBucket: "design-ai-toolkit.appspot.com",
        messagingSenderId: "13598358803",
        appId: "1:13598358803:web:8efd8eb84de4e955bdeee6",
        measurementId: "G-DLFC7BLVMC"
}

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { app, auth, signInWithEmailAndPassword, onAuthStateChanged };
