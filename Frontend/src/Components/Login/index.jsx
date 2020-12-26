import React, { useContext, useState, useRef } from "react";
import { Redirect } from "react-router-dom";
import { Auth } from "../../Contexts/Auth";
import "./login.css";

function Authenticate() {

    const auth = useContext(Auth);
    const passwordInput = useRef(null);
    const emailInput = useRef(null);
    const [passwordStatus, setPasswordStatus] = useState(true);
    const [message, setMessage] = useState("");

    async function login(e) {
        e.preventDefault();
        setMessage("");
        const elements = [...e.target.elements];
        elements.forEach(element => {
            element.disabled = true;
        });
        let email = e.target.elements[0].value;
        let password = e.target.elements[1].value;

        const response = await fetch('/user/login', {
            method: "post",
            body: JSON.stringify({ email, password }),
            headers: { 'Content-Type': 'application/json' }
        });
        const data = await response.json();
        if (response.status === 200) {
            sessionStorage.setItem('sid', data.token);
            auth.setToken(data.token);
            auth.setUser(data.user);
            auth.setAuthenticated(true);
            return <Redirect to="/" />;
        } else {
            elements.forEach(element => {
                element.disabled = false;
            });
            setMessage(data);
        }
    }

    function togglePassword() {
        if (passwordInput.current.type === 'password') {
            passwordInput.current.type = 'text';
            setPasswordStatus(false);
        } else {
            passwordInput.current.type = 'password';
            setPasswordStatus(true);
        }
    }

    function adminLogin() {
        emailInput.current.value = "bernard.lowe@bug-tracker.com";
        passwordInput.current.value = "password";
    }

    function userLogin() {
        emailInput.current.value = "maeve.millay@bug-tracker.com";
        passwordInput.current.value = "password";
    }

    return <div className="login full flex">
        <div className="login-left flex flex-column center text-center">
            <h1>Bug Tracker</h1>
            <p>Keeps track of reported software bugs in software development projects.</p>
        </div>
        <div className="login-right flex flex-column center">

            <p>Login as <span onClick={adminLogin} className="pointer span-link">Administrator</span> Privileges or <span onClick={userLogin} className="pointer span-link">User</span></p>

            <form className="login-form" onSubmit={login}>

                {message && <p className="error-message">{message}</p>}

                <input type="email" ref={emailInput}  placeholder="Email" required />

                <div className="login-password">
                    <span className="login-password-toggle pointer small-text" onClick={togglePassword}>
                        {passwordStatus ? 'Show' : 'Hide'}
                    </span>
                    <input ref={passwordInput} type="password" placeholder="Password" required />
                </div>

                <button type="submit">Login</button>

            </form>
        </div>
    </div >;
}

export default Authenticate