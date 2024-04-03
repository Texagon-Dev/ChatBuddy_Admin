import React from 'react'
import { supabaseClient } from '../config/supabase';
import { Session } from '@supabase/supabase-js';
import { useNavigate } from 'react-router-dom';

function Signup() {
    const navigate = useNavigate()
    const [email, setEmail] = React.useState<string>('')
    const [password, setPassword] = React.useState<string>('')
    const [session, setSession] = React.useState<Session | null>()
    console.log(session)

    React.useEffect(() => {
        supabaseClient.auth.getSession().then(({ data: { session } }) => {
            setSession(session)
        })

        supabaseClient.auth.onAuthStateChange((_event, session) => {
            setSession(session)
        })
    }, [])

    const onSignup: React.MouseEventHandler<HTMLButtonElement> = async () => {
        const data = await supabaseClient.auth.signUp({
            email,
            password,
        })
        if (data.error) {
            alert(data.error.message)
        } else {
            alert('Check your email for the confirmation link!')
        }
    }

    const onLogin: React.MouseEventHandler<HTMLButtonElement> = async () => {
        const data = await supabaseClient.auth.signInWithPassword({
            email,
            password,
        })

        if (data.error) {
            alert(data.error.message)
        } else {
            navigate('/user')
        }
    }

    return (
        <div>
            <h1>Signup</h1>
            <h4 style={{ color: 'red' }}>This is a Signup unprotected route</h4>
            <input type="text" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
            <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
            <button
                onClick={onSignup}
            >Signup</button>

            {/* login page */}
            <h1>Login</h1>
            <h4 style={{ color: 'red' }}>This is a Login unprotected route</h4>
            <input type="text" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
            <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
            <button
                onClick={onLogin}
            >Login</button>

        </div>
    )
}

export default Signup