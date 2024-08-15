import { useEffect, useState } from "react";
import './Login.css';
import { Navigate, useNavigate } from "react-router-dom";
import { FaUserGraduate } from "react-icons/fa6";
import { FaLock } from "react-icons/fa";
import LoginService from "./LoginService";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { jwtDecode } from 'jwt-decode' ;


const Login = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const doLogin = async () => {
    try {
      const response = await LoginService().doLogin({ username, password });

      if (response.status === 200) {
        localStorage.setItem("user", JSON.stringify(response.data));
        const token = response.data.accessToken;

          const decodedToken = jwtDecode(token);
          const userRole = decodedToken.roles[0]; 

          console.log("Decoded Token:", decodedToken);
          console.log("User Role:", userRole);
         

          if (userRole === "ROLE_USER") {
            navigate("/student");
          } else if (userRole === "ROLE_ADMIN") {
            navigate("/teacher");
          } else {
            toast.error('Unknown role detected.', {
              position: "top-left",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
          
        }
      }
    } catch (error) {
      if (error.response && error.response.data && error.response.data.errors) {
        error.response.data.errors.forEach(err => {
          toast.error(err.description, {
            position: "top-left",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        });
      } else {
        toast.error('An error occurred while logging in. Please try again.', {
          position: "top-left",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    }
  };

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user?.user?.roles[0] === "ROLE_USER") {
      navigate("/exam");
    } else if (user?.user?.roles[0] === "ROLE_ADMIN") {
      navigate("/teacher");
    }
  }, [navigate]);



  return (
    <div className="container">
      <ToastContainer />
      <div className="left-side">
        <h1>TEST <span className="highlight">APPLICATION</span></h1>
        <p>Let's get high scores</p>
        <img src="https://hvnh.edu.vn/medias/tuyensinh/vi/12.2019/system/archivedate/c0cc0c19_anh1498123875_7769.jpg" alt="Illustration" />
      </div>
      <div className="wrapper">
        <form onSubmit={(e) => { e.preventDefault(); doLogin(); }}>
          <h1>Get Started</h1>
          <p>Good luck to you on your exam!</p>
          <div className="input-box">
            <input 
              type="text" 
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Username" 
              required 
            />
            <FaUserGraduate className='icon'/>
          </div>
          <div className="input-box">
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password" 
              required 
            />
            <FaLock className='icon'/>
          </div>
          <div className="remember-forgot">
            <label>
              <input type="checkbox" />
              Remember me
            </label>
            <a href="#">Forgot password?</a>
          </div>
          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
};

export default Login;