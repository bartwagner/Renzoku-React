import React, { useState } from "react";

export const AuthContext = React.createContext({});

export const AuthProvider = (props) => {
  const [inputSearchMovie, setInputSearchMovie] = useState(false)

  return(
    <AuthContext.Provider value = {{inputSearchMovie, setInputSearchMovie}}>
      {props.children}
    </AuthContext.Provider> 
  )
}

export const inputSearchAuth = () => React.useContext(AuthContext)