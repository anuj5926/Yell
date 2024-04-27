import React, { createContext, useState } from 'react';

const Context = createContext();

const ContextProvider = ({ children }) => {

  const [userInfo , setUserInfo] = useState(null)
  const [load , setLoad] = useState(false)

  return (
    <Context.Provider
      value={{
        setUserInfo,userInfo,setLoad,load
      }}
    >
      {children}
    </Context.Provider>
  );
};

export { Context, ContextProvider };