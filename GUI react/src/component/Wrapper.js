import React, { useState } from 'react';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';

const Wrapper = ({ isPopupActive, onClose }) => {
    const [isRegisterActive, setIsRegisterActive] = useState(false);

    return (
        <div
            className={`wrapper ${isPopupActive ? 'active-popup' : ''} ${
                isRegisterActive ? 'active' : ''
            }`}
        >
            <span className="icon-close" onClick={onClose}>
    <ion-icon name="close-outline"></ion-icon>
</span>

         
            <LoginForm onRegisterClick={() => setIsRegisterActive(true)} />
            <RegisterForm onLoginClick={() => setIsRegisterActive(false)} />
        </div>
    );
};

export default Wrapper;
