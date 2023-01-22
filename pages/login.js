import React from 'react'
import { useUser } from "@auth0/nextjs-auth0/client";

function login() {
    const { user } = useUser();
    console.log(user);

    return (
        <div>login</div>
    )
}

export default login