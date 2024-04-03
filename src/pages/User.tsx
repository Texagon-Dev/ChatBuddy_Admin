import React from 'react'
import { Session } from '@supabase/supabase-js'
import { supabaseClient } from '../config/supabase'

function User() {
    const [session, setSession] = React.useState<Session | null>(
        null
    )

    React.useEffect(() => {
        supabaseClient.auth.getSession().then(({ data: { session } }) => {
            setSession(session)
        })

        supabaseClient.auth.onAuthStateChange((_event, session) => {
            setSession(session)
        })

    }, [])

    const logout: React.MouseEventHandler<HTMLButtonElement> = async () => {
        try {
            await supabaseClient.auth.signOut()
        } catch (error) {
            console.log(error)
            throw error
        }
    }
    return (
        <div>
            <h1>User</h1>
            {/* <h4 style={{ color: 'red' }}>This is a User protected route</h4> */}
            <h2>
                {session?.user.email}
            </h2>
            <button
                onClick={logout}
            >Logout</button>
        </div>
    )
}

export default User