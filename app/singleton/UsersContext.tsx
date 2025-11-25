'use client'

import React, { createContext, Dispatch, SetStateAction, useState } from "react";


export type User = {
    username: string,
    email: string
}

export type UserContextType = [
    user: User,
    setUser: Dispatch<SetStateAction<User>>
]

const DEFAULT_USER: User = {
    username: "",
    email: ""
}

export const UserContext = createContext<UserContextType>([
    DEFAULT_USER,
    () => null
]);


export const UserContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState(DEFAULT_USER);

    return <UserContext.Provider value={[user, setUser]}>
        {children}
    </UserContext.Provider>
}