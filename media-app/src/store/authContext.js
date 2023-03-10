import { useState, useEffect, useCallback, createContext } from "react";

let logoutTimer;

export const AuthContext = createContext({
  token: "",
  login: () => {},
  logout: () => {},
  userId: null,
});

const calculateRemainingTime = (exp) => {
  const currentTime = new Date().getTime();
  const expTime = exp;
  const remainingTime = expTime - currentTime;
  return remainingTime;
};

const getLocalData = () => {
  const storedToken = localStorage.getItem("token");
  const storedExp = localStorage.getItem("exp");
  const remainingTime = calculateRemainingTime(storedExp);

  if (remainingTime <= 1000 * 60 * 30) {
    localStorage.removeItem("token");
    localStorage.removeItem("exp");
    return null;
  }

  return {
    token: storedToken,
    duration: remainingTime,
    userId: localStorage.getItem('userId')
  };
};

export const AuthContextProvider = (props) => {
  const localData = getLocalData();
console.log(localData, "localData");
  let initialToken;
  let initialId;

  if (localData) {
    initialToken = localData.token;
    initialId = localData.userId;
  }

  const [token, setToken] = useState(initialToken);
  const [image, setImage] = useState('')
  const [userId, setUserId] = useState(initialId);
  const [username, setUsername] = useState('')
  const logout = useCallback(() => {
    setToken(null);
    setUserId(null);
    localStorage.removeItem("token");
    localStorage.removeItem("exp");
    localStorage.removeItem("userId");
    localStorage.removeItem("username");
    localStorage.removeItem('image')

    if (logoutTimer) {
      console.log("logout");
      clearTimeout(logoutTimer);
    }
  }, []);

  const login = (token, expTime, userId, username, image) => {
    console.log(token, expTime, userId, username, 'check');
    setToken(token);
    setUserId(userId);
    setImage(image)
    setUsername(username)
    localStorage.setItem("token", token);
    localStorage.setItem("exp", expTime);
    localStorage.setItem("userId", userId);
    localStorage.setItem("username", username);
    localStorage.setItem('image', image)
   

    const remainingTime = calculateRemainingTime(expTime);
    console.log("login");
    logoutTimer = setTimeout(logout, remainingTime);
  };

  useEffect(() => {
    if (localData) {
      console.log(localData.duration);
      logoutTimer = setTimeout(logout, localData.duration);
    }
  }, [localData, logout]);

  const contextValue = {
    token,
    image,
    login,
    logout,
    userId,
    username,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
