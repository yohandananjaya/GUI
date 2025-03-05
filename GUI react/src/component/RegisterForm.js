import React, { useState } from "react";
import { registerUser } from "./api";

const RegisterForm = ({ onLoginClick }) => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newUser = { name, email, password };
        try {
            await registerUser(newUser);
            alert("Registration successful! Please log in.");
            onLoginClick();
        } catch (err) {
            setError("Failed to register. Please try again.");
        }
    };

    return (
        <div className="form-box register">
            <h1>Register</h1>
            <form onSubmit={handleSubmit}>
                <div className="input-box">
                    <span className="icon">
                        <ion-icon name="person"></ion-icon>
                    </span>
                    <input
                        type=""
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                    <label>Username</label>
                </div>
                <div className="input-box">
                    <span className="icon">
                        <ion-icon name="mail-outline"></ion-icon>
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
                        <ion-icon name="lock-closed-outline"></ion-icon>
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
                    Register
                </button>
                <div className="login-register">
                    <p>
                        Already have an account?{" "}
                        <a href="#" onClick={onLoginClick}>
                            Login
                        </a>
                        
                    </p>
                </div>
            </form>
        </div>
    );
};

export default RegisterForm;
