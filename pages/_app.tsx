import { Analytics } from "@vercel/analytics/react";
import type { AppProps } from "next/app";
import { useState } from 'react';
import { UserContext, UserContextType } from '../context/UserContext';
import "../styles/globals.css";
import firebase, {initializeApp} from 'firebase/app';
import { getStorage } from 'firebase/storage';
import 'firebase/analytics';
import {firebaseConfig} from "../utils/firebaseConfig";




function MyApp({ Component, pageProps }: AppProps) {
    const [user, setUser] = useState<UserContextType['user']>(null);


    const app = initializeApp(firebaseConfig);
    const storage = getStorage(app);

    console.log('MyApp -> storage', storage);
    return (
        <UserContext.Provider value={{ user, setUser }}>
            <Component {...pageProps} />
            <Analytics />
        </UserContext.Provider>
    );
}
export default MyApp;