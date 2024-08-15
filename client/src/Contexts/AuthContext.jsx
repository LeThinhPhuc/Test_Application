import { createContext, useContext, useState, useEffect } from "react";
import * as jwt_decode from "jwt-decode";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [role, setRole] = useState("student");
  const [decodedToken, setDecodedToken] = useState(null);
  const [token, setToken] = useState("");

  useEffect(() => {
    // Giải mã token khi token thay đổi
    if (token) {
        try {
            const decoded = jwt_decode(token);
            setDecodedToken(decoded);
            // Cập nhật role từ token nếu có thông tin
            if (decoded && decoded.role) {
                setRole(decoded.role);
            }
        } catch (error) {
            console.error("Error decoding token:", error);
        }
    }
  }, [token]);

  return (
    <AuthContext.Provider value={{ role, setRole, token, setToken }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook để sử dụng AuthContext
export const useAuth = () => useContext(AuthContext);
