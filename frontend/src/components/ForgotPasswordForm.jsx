import { useState }  from "react";
import api from "../api"
import "../styles/Form.css"

function ForgotPassword({route}){
    const [email, setEmail] = useState("");
    const handleSubmit = async (e) => {
        e.preventDefault();
        const errorMessage = validateEmail();

        if (errorMessage !== "") {
            alert(errorMessage);
            return;
        }        

        try {
            const res = await api.post(route, {email})
            

        } catch (error) {
            alert(error);
        } finally {
        }
    }
    
     const validateEmail = () => {
        // Check if email is valid
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(email)) {
            return("Please enter a valid email address");
        }     
        
        return "";
    };

    return <form onSubmit={handleSubmit} className="form-container">
        <h1>Forgot your password?</h1>
        <input 
            className="form-input" 
            type="text" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            style={{marginTop:"20px"}}
        />        
        <button className="form-button" type="submit">
            Reset Password
        </button>        
        
    </form>
}

export default ForgotPassword