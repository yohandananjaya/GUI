import React, { useState } from "react";
import { loginUser } from "./api";
import { Link,useNavigate } from "react-router-dom";

const LoginForm = ({ onRegisterClick }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const user = await loginUser({ email, password });
        if (user) {
            localStorage.setItem("loggedInUserId", user.id);
            alert(`Welcome, ${user.name}!`);
            navigate("/appointment/table");
        } else {
            setError("Invalid email or password.");
        }
    };
    

    return (
        <div className="form-box login">
            <h1>Login</h1>
            <form onSubmit={handleSubmit}>
                <div className="input-box">
                    <span className="icon">
                        <ion-icon name="mail"></ion-icon>
                    </span>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <label>Email</label>
                </div>
                <div className="input-box">
                    <span className="icon">
                        <ion-icon name="lock-closed"></ion-icon>
                    </span>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <label>Password</label>
                </div>
                {error && <p style={{ color: "red" }}>{error}</p>}
                <button type="submit" className="btn">
                    Login
                </button>
                <div className="login-register">
                    <p>
                        Don't have an account?{" "}
                        <button onClick={onRegisterClick}>
                            Register
                        </button>
                        
                    
                    </p>
                </div>
            </form>
        </div>
    );
};

export default LoginForm;
