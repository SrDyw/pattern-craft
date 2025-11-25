'use client'

import { useContext } from "react"
import { UserContext, UserContextType } from "./UsersContext"

export default function Welcome() {
    const [user] = useContext(UserContext) as UserContextType

    return <>
        {user.username != "" ? (<h2>Welcome from other component, <strong>{user.username}</strong></h2>) : (<></>)}
    </>
}