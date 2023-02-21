import React, { useState, useContext } from "react";
import axios from "axios";
const baseURL = "http://localhost:8080";

const GlobalContext = React.createContext();

export const GlobalProvider = ({ children }) => {

  const [error, setError] = useState(null);

  const addPost = async (income) => {
    const res = await axios
      .post(`${baseURL}/add-post`, income)
      .catch((err) => {
        setError(err.res.data.message);
      });
  };

  return (
    <GlobalContext.Provider value={{ addPost }}>
      {children}
    </GlobalContext.Provider>
  );
};
export const useGlobalContext = () => {
  return useContext(GlobalContext);
};
