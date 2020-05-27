import React, { useEffect, useState } from 'react';
import { watchUserChanges } from '../servicios/firebase';

export const AuthContext = React.createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [pending, setPending] = useState(true);

  useEffect(() => {
    watchUserChanges((user) => {
        // if(user) {
            setCurrentUser(user);
            setPending(false);
        // }
        // else {
        //     setCurrentUser(null);
        //     setPending(true);
        // }
    });
  });

  if(pending){
    return <>Loading...</>
  }

  return (
    <AuthContext.Provider value={{ currentUser }}>
      {children}
    </AuthContext.Provider>
  );
};