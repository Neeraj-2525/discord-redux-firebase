import React from 'react'
import './Login.css'
import { auth, provider } from '../../firebase';



const Login = () => {
    const signIn = () => {
        // do clever google login
        auth.signInWithPopup(provider)
        .catch(error=>alert(error.message));

    }

    return (
        <div className='login'>
            <div className="logo">
                <img src="https://www.internetmatters.org/wp-content/uploads/2020/07/discord-hero-1.png" alt="discord logo" />
            </div>
            <button onClick={signIn}>Sign In</button>
        </div>
    )
}

export default Login
