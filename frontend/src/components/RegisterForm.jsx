import { useState}  from "react";
import api from "../api"
import { useNavigate } from "react-router-dom";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants";
import "../styles/Form.css"
import LoadingIndicator from "./LoadingIndicator";

function Form({route, method}){
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const name = method === "login" ? "Login" : "Register";

    const handleSubmit = async (e) => {
        e.preventDefault();
        const errorMessage = validateForm();

        if (errorMessage !== "") {
            alert(errorMessage);
            return;
        }
        
        setLoading(true);

        try {
            const res = await api.post(route, {username, password})
            if (method === "login") {
                localStorage.setItem(ACCESS_TOKEN, res.data.access);
                localStorage.setItem(REFRESH_TOKEN, res.data.refresh);
                navigate("/");
            } else {
                navigate("/login");
            }

        } catch (error) {
            alert(error);
        } finally {
            setLoading(false);
        }
    }

     const validateForm = () => {
        // Check if email is valid
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(username)) {
            return("Please enter a valid email address");
        }
        //Choose password
        if (password === '' || confirmPassword === ''){
            return("Please choose a password");
        }
        // Check if passwords match
        if (password !== confirmPassword) {
            return("Passwords do not match");
        }

        return "";
    };

    return <form onSubmit={handleSubmit} className="form-container">
        <h1>{name}</h1>
        <input 
            className="form-input" 
            type="text" 
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Email"
        />
        <input 
            className="form-input" 
            type="password" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
        />
        <input 
            className="form-input" 
            type="password" 
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirm Password"
        />        
        {loading && <LoadingIndicator />}
        <button className="form-button" type="submit">
            {name}
        </button>
        <a href="/login"
            className="form-text">
            Already have an account? Login
        </a>
        
    </form>
}


export default Form