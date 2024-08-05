import { useState } from "react";
import './Login.css';
import { useNavigate } from "react-router-dom";
import { FaUserGraduate } from "react-icons/fa6";
import { FaLock } from "react-icons/fa";
const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const account = {
    username: username,
    password: password,
  };

  const doLogin = async () => {
    
    console.log(account);

  };

  return (
    <div className="container">
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
           < FaLock className='icon'/>
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