import React, { useState } from "react";
import Register from "./Register";
import Login from "./Login";

const Auth = () => {
  const [login, setLogin] = useState(true);
  return (
    <div>{login ? <Login setLogin={setLogin} /> : <Register />}</div>
  );
};

export default Auth;
