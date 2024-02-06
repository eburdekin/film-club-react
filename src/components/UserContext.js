// UserContext.js
import { createContext, useContext, useState, useEffect } from "react";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState();

  //   useEffect(() => {
  //     fetch("/check_session")
  //       .then((r) => r.json())
  //       .then((u) => setUser(u));
  //   }, []);

  useEffect(() => {
    const checkSession = async () => {
      try {
        const response = await fetch("http://localhost:5555/check_session");
        if (!response.ok) {
          throw new Error("No user found");
        }
        const data = await response.json();
        setUser(data);
      } catch (error) {
        console.error(error);
      }
    };

    checkSession();
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
