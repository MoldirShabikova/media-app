import React from 'react'
import { useState } from 'react';
function Login() {
    const [isLogin, setIsLogin] = useState(true)

    return (
        isLogin &&
        <main>
            <div>Log in</div>
            <form>
                <label htmlFor="email">
                    Email
                    <input type="email" name="email" id="email" placeholder="email" />
                </label>
                <label htmlFor="password">
                    Password
                    <input
                        type="password"
                        name="password"
                        id="password"
                        placeholder="password"
                    />
                </label>
                <button>Log in</button>

                <h3>OR</h3>
                <h3>Log in with Google</h3>
                <p>Forgot password?</p>
            </form>
            <form >
                <p>Don't have an account? Sign Up</p>
            </form>
        </main>
      
    )


}

export default Login