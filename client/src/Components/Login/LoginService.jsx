import axios from 'axios';

const LoginService = () => {
    return {
        doLogin: (body) => axios.create({
            baseURL: "http://localhost:8080",
            timeout: 5000,
            headers: {
                "Content-Type": "application/json", 
                "Accept": "application/json",
                "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept",
                "Access-Control-Allow-Origin": "http://localhost:8080",
                "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
            },
        }).post('accounts/login', body)
    };
};

export default LoginService;