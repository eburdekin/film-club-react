// UserContext.js
import { createContext, useContext, useState, useEffect } from "react";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState();
  const [loading, setLoading] = useState(true);

  //   useEffect(() => {
  //     fetch("/check_session")
  //       .then((r) => r.json())
  //       .then((u) => setUser(u));
  //   }, []);

  useEffect(() => {
    const checkSession = async () => {
      try {
        const response = await fetch("/check_session");
        if (!response.ok) {
          throw new Error("No user found");
        }
        const data = await response.json();
        setUser(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false); // Set loading to false when fetch completes
      }
    };

    // if (!user) {
    checkSession();
    // }
  }, []);

  const loginUser = (userData) => {
    setUser(userData);
  };

  const logoutUser = () => {
    setUser(null);
  };

  return (
    <UserContext.Provider
      value={{ user, setUser, loading, loginUser, logoutUser }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
