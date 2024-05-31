import { Analytics } from "@vercel/analytics/react";
import type { AppProps } from "next/app";
import { useState } from 'react';
import { UserContext, UserContextType } from '../context/UserContext';
import "../styles/globals.css";
import firebase, {initializeApp} from 'firebase/app';
import 'firebase/storage';
import 'firebase/analytics';





function MyApp({ Component, pageProps }: AppProps) {
    const [user, setUser] = useState<UserContextType['user']>(null);

    return (
        <UserContext.Provider value={{ user, setUser }}>
            <Component {...pageProps} />
            <Analytics />
        </UserContext.Provider>
    );
}
export default MyApp;