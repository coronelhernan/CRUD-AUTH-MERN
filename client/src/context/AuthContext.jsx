import { createContext, useState, useContext, useEffect } from "react";
import { registerRequest, loginRequest, verifyTokenRequest } from "../api/auth";
import Cookies from "js-cookie";

// Creamos el contexto
export const AuthContext = createContext(null);

// Hook que va a usar el contexto
export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    console.warn("useAuth must be used within an AuthProvider");
  }

  return context;
};

// Proveemos el contexto
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [errors, setErrors] = useState([]);
  const [loading, setLoading] = useState(true);

  const signup = async (user) => {
    try {
      const response = await registerRequest(user);
      setUser(response.data);
      setIsAuthenticated(true);
    } catch (error) {
      setErrors(error.response?.data || error.message);
    }
  };

  const signin = async (user) => {
    try {
      const response = await loginRequest(user);
      setErrors([]); // Limpiar errrores previos en caso de que el login falle
      setIsAuthenticated(true);
      setUser(response.data);
    } catch (error) {
      setErrors(error.response?.data?.errors || []);
    }
  };

  const logout = async () => {
    Cookies.remove('token');
    setIsAuthenticated(false);
    setUser(null);
  }

  useEffect(() => {
    if (errors.length > 0) {
      const timer = setTimeout(() => {
        setErrors([]);
      }, 3000);

      // Funcion de limpieza del timer
      return () => clearTimeout(timer);
    }
  }, [errors]);

  useEffect(() => {
    async function checkLogin() {
      const cookies = Cookies.get();

      // Si no hay Token
      if (!cookies.token) {
        setIsAuthenticated(false);
        setLoading(false);
        return setUser(null);
      }

      // Si hay token se valida lo siguiente
      try {
          const response = await verifyTokenRequest(cookies.token);
          if (!response.data) {
            setIsAuthenticated(false);
            setLoading(false);
            return;
          }

          setIsAuthenticated(true);
          setUser(response.data);
          setLoading(false);
        } catch (error) {
          setIsAuthenticated(false);
          setUser(null);
          setLoading(false);
        }
    }

    checkLogin();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        signup,
        signin,
        logout,
        loading,
        user,
        isAuthenticated,
        errors,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
