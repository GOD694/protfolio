import { createContext, useContext, useEffect, useState } from "react";



// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext();


export const AuthProvider = ({ children }) => {
  const isAvailable = localStorage.getItem("token");
  const [Token, setToken] = useState(isAvailable);
  const [user, setUser] = useState({ username: "", email: "", _id: "", phone: "", isAdmin: "" });
  const isLoggedin = !!Token;
  const [SERVICES, setservice] = useState([]);
  const [isLoading, setisLoading] = useState(true)
  const isAuthorization = `Bearer ${Token}`;


//FETCH API  FROM ENV

const API = import.meta.env.VITE_API_URL || "http://localhost:5000/api";
  //logic all are here 

  const storeLocalStorage = (servertoken) => {

    setToken(servertoken);
    return localStorage.setItem("token", servertoken)
  }


  const LogoutUser = () => {
    setToken("")
    setUser({ username: "", email: "", _id: "", phone: "", isAdmin: "" })
    return localStorage.removeItem("token")
  };

  const AuthenticationUser = async () => {
    try {
      setisLoading(true)
      const response = await fetch(`${API}/auth/user`, {
        method: "GET",
        headers: {
          // "Content-Type": "application/json",
          Authorization: isAuthorization,
        },
      })
      if (response.ok) {
        const data = await response.json();

        const { username, email, userId, phone, isAdmin } = data;
        setUser({ username: username, email: email, _id: userId, phone: phone, isAdmin: isAdmin });
        setisLoading(false);
      } else {
        LogoutUser()
        setUser({ username: "", email: "", _id: "", phone: "", isAdmin: "" })
        setisLoading(false);

      }
    } catch (error) {
      console.log(error)

    }
  };

  const getservice = async () => {
    try {
      const response = await fetch(`${API}/services/data`, {
        method: "GET",

      })
      if (!response.ok) {
        console.log("Failed to fetch services")
      }
      const resdata = await response.json();
      setservice(resdata.data)
    } catch (error) {
      console.log(error)
    }
  };


  useEffect(() => {
    getservice();
    if (Token) {

      AuthenticationUser();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [Token])


  return (
    <AuthContext.Provider value={{ storeLocalStorage, LogoutUser, isLoggedin, AuthenticationUser, user, SERVICES, isAuthorization, isLoading ,API }}>
      {children}
    </AuthContext.Provider>
  )
};


// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {

  const contextvalue = useContext(AuthContext);


  if (contextvalue === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }

  return contextvalue;

};