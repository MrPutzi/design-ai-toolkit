import React from 'react';

type UserState = {
    email: string;
    password: string;
} | null;

export type UserContextType = {
    user: UserState;
    setUser: React.Dispatch<React.SetStateAction<UserState>>;
};

export const UserContext = React.createContext<UserContextType | undefined>(undefined);