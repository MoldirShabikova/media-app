import React, { useState} from 'react'

function Register() {
     const [isRegister, setIsRegister] = useState(true);
    return (
      isRegister &&
    <main>
      <div>Sign up</div>
      <h3>Log in with Google</h3>
      <h3>OR</h3>
      <form>
        <label htmlFor="username">
          Username
          <input type="text" id="username" placeholder="username" />
        </label>
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
        <button>Sign up</button>
      </form>
      <form>
        <p>Have an account? Log in</p>
      </form>
    </main>
  );
}

export default Register