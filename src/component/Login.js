import React, { useContext, useEffect, useState } from 'react'
import { SignUp } from '../Api/SignUp';
import { SignIn } from '../Api/SignIn';
import { useNavigate } from 'react-router-dom';
import LoginPageCss from '../css/LoginPageCss';
import { Flip, ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Context } from '../Context/Context';

export default function Login() {

    const { setLoad ,setLoadColor} = useContext(Context);

    const navigate = useNavigate();

    useEffect(() => {
        const auth_token = JSON.parse(localStorage.getItem('userinfo'))?.auth_token;
        if (auth_token) {
            navigate('/game');
        }
    }, [])

    const [signUpIn, setSignUpIn] = useState(false)
    const [signUpData, setSignUpData] = useState({
        name: "",
        username: "",
        password: "",
        phone: "",
    })
    const [signInData, setSignInData] = useState({
        username: "",
        password: "",
    })

    const handleChangeSignUp = (e, value) => {
        if (value === "name") {
            setSignUpData((prevData) => ({
                ...prevData,
                name: e.target.value,
            }));
        }
        else if (value === "username") {
            setSignUpData((prevData) => ({
                ...prevData,
                username: e.target.value,
            }));
        }
        else if (value === "password") {
            setSignUpData((prevData) => ({
                ...prevData,
                password: e.target.value,
            }));
        }
        else if (value === "mobile") {
            setSignUpData((prevData) => ({
                ...prevData,
                phone: e.target.value,
            }));
        }
    };
    const handleChangeSignIn = (e, value) => {
        if (value === "username") {
            setSignInData((prevData) => ({
                ...prevData,
                username: e.target.value,
            }));
        }
        else if (value === "password") {
            setSignInData((prevData) => ({
                ...prevData,
                password: e.target.value,
            }));
        }
    };

    const handleClickSignUpUser = async (e) => {
        e.preventDefault();
        if (signUpData.name !== "" && signUpData.username !== "" && signUpData.password && signUpData?.phone?.length === 10) {
            setLoad(true);
            setLoadColor("#ff4364")
            let res = await SignUp(signUpData)
            console.log(res)
            if (res) {
                if (res.data.status) {
                    localStorage.setItem("userinfo", JSON.stringify(res.data.data));
                    navigate("/game")
                    toast.success('User Registered Successfully', {
                        position: "bottom-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "dark",
                        transition: Flip,
                    });
                    setSignUpData((prevData) => ({
                        ...prevData,
                        name: "",
                        username: "",
                        password: "",
                        phone: "",
                    }));
                }
                else {
                    toast.error(res.data.message, {
                        position: "bottom-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "dark",
                        transition: Flip,
                    });
                }
            }
            setLoad(false);
        }
        else if (signUpData.name !== "" && signUpData.username !== "" && signUpData.password && signUpData?.phone?.length !== 10) {
            toast.warn('Give Correct Number', {
                position: "bottom-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
                transition: Flip,
            });
        }
        else {
            toast.error("Give all Details Properly", {
                position: "bottom-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
                transition: Flip,
            });
        }
    }

    const handleClickSignInUser = async (e) => {
        e.preventDefault();
        if (signInData.username !== "" && signInData.password !== "") {
            setLoad(true);
            setLoadColor("#ff4364")
            console.log(signInData)
            let res = await SignIn(signInData);
            console.log(res);
            if (res) {
                if (res.data.status) {
                    localStorage.setItem("userinfo", JSON.stringify(res.data.data));
                    toast.success('User Login Successfully', {
                        position: "bottom-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "dark",
                        transition: Flip,
                    });
                    navigate("/game")
                    setSignInData((prevData) => ({
                        ...prevData,
                        username: "",
                        password: "",
                    }));
                }
                else {
                    toast.error(res.data.message, {
                        position: "bottom-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "dark",
                        transition: Flip,
                    });
                }
                setLoad(false);
            }
            setLoad(false);
        }
        else {
            toast.error("Give all Details Properly", {
                position: "bottom-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
                transition: Flip,
            });
        }
    }

    const handleChangeLoginMethod = ()=>{
        setSignUpIn(!signUpIn)
        setSignInData((prevData) => ({
           ...prevData,
            username: "",
            password: "",
        }));
        setSignUpData((prevData) => ({
            ...prevData,
            name: "",
            username: "",
            password: "",
            phone: "",
        }));
    }

    return (
        <>
            <LoginPageCss>
                <div className={`container Login ${signUpIn ? "right-panel-active" : ""}`} id="container">
                    <div className="form-container sign-up-container">
                        <form action="#">
                            <h1>Create Account</h1>
                            {/*<div className="social-container">
                                <a href="#" className="social">
                                    <i className="fab fa-facebook-f" />
                                </a>
                                <a href="#" className="social">
                                    <i className="fab fa-google-plus-g" />
                                </a>
                                <a href="#" className="social">
                                    <i className="fab fa-linkedin-in" />
                                </a>
                            </div>*/}
                            <span>or use your email for registration</span>
                            <input type="name" placeholder="Name" value={signUpData.name} onChange={(e) => { handleChangeSignUp(e, "name") }} required />
                            <input type="username" placeholder="Username" value={signUpData.username} onChange={(e) => { handleChangeSignUp(e, "username") }} required />
                            <input type="password" placeholder="Password" value={signUpData.password} onChange={(e) => { handleChangeSignUp(e, "password") }} required />
                            <input type="tel" placeholder="Mobile No." value={signUpData.phone} onChange={(e) => { (e.target.value === '' || /^\d+$/.test(e.target.value)) && e.target.value.length < 11 && handleChangeSignUp(e, "mobile") }} required />
                            <button onClick={(e) => handleClickSignUpUser(e)}>Sign Up</button>
                        </form>
                    </div>
                    <div className="form-container sign-in-container">
                        <form >
                            <h1>Sign in</h1>
                            {/*<div className="social-container">
                                <a href="#" className="social">
                                    <i className="fab fa-facebook-f" />
                                </a>
                                <a href="#" className="social">
                                    <i className="fab fa-google-plus-g" />
                                </a>
                                <a href="#" className="social">
                                    <i className="fab fa-linkedin-in" />
                                </a>
                            </div>*/}
                            <span>or use your account</span>
                            <input type="Username" value={signInData.username} onChange={(e) => { handleChangeSignIn(e, "username") }} placeholder="Username" required />
                            <input type="password" value={signInData.password} onChange={(e) => { handleChangeSignIn(e, "password") }} placeholder="Password" required />
                            <a >Forgot your password?</a>
                            <button onClick={(e) => handleClickSignInUser(e)}>Sign In</button>
                        </form>
                    </div>
                    <div className="overlay-container">
                        <div className="overlay">
                            <div className="overlay-panel overlay-left">
                                <h1>Welcome Back!</h1>
                                <p>To keep connected with us please login with your personal info</p>
                                <button className="ghost" id="signIn" onClick={() => handleChangeLoginMethod()}>
                                    Sign In
                                </button>
                            </div>
                            <div className="overlay-panel overlay-right">
                                <h1>Hello, Friend!</h1>
                                <p>Enter your personal details and start journey with us</p>
                                <button className="ghost" id="signUp" onClick={() => handleChangeLoginMethod()}>
                                    Sign Up
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </LoginPageCss>
        </>
    )
}
