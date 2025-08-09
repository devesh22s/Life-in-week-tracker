// import React, { useState, useEffect } from "react";
// import { AuthContext } from "./AuthContext";

// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null);

//   useEffect(() => {
//     // Check token on first load (mocked)
//     const token = localStorage.getItem("token");
//     if (token) {
//       // Replace this with real user-fetching logic
//       setUser({ email: "demo@example.com" });
//     }
//   }, []);

//   return (
//     <AuthContext.Provider value={{ user, setUser }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };



import { useState } from 'react'
import { AuthContext } from './AuthContext'

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)

  const login = async (email, password) => {
    setUser({ email  })
  }

  const register = async (email, password) => {
    setUser({ email })
  }

  const logout = () => setUser(null)

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  )
}
