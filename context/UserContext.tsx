import React from 'react';

type UserState = {
    email: string;
    password: string;
    credit: number; // Add this line
} | null;

export type UserContextType = {
    user: UserState;
    setUser: React.Dispatch<React.SetStateAction<UserState>>;
};

const defaultUserState: UserState = null;

const defaultContextValue: UserContextType = {
    user: defaultUserState,
    setUser: () => {}, // No-op function for default value
};

export const UserContext = React.createContext<UserContextType>(defaultContextValue);
