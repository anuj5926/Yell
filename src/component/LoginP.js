import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { Context } from '../Context/Context';
import { Flip, toast } from 'react-toastify';
import { SignUp } from '../Api/SignUp';
import { SignIn } from '../Api/SignIn';
import { LoginPagePBody, LoginPagePHtml } from '../css/LoginPageP';
import jQuery from 'jquery';

export default function LoginP() {

    const [ischecked, setIsChecked] = useState(true);

    const { setLoad, setLoadColor } = useContext(Context);

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
                        position: "top-right",
                        autoClose: 1500,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "colored",
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
                        position: "top-right",
                        autoClose: 1500,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "colored",
                        transition: Flip,
                    });
                }
            }
            setLoad(false);
        }
        else if (signUpData.name !== "" && signUpData.username !== "" && signUpData.password && signUpData?.phone?.length !== 10) {
            toast.warn('Give Correct Number', {
                position: "top-right",
                autoClose: 1500,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
                transition: Flip,
            });
        }
        else {
            toast.error("Give all Details Properly", {
                position: "top-right",
                autoClose: 1500,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
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
                        position: "top-right",
                        autoClose: 1500,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "colored",
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
                        position: "top-right",
                        autoClose: 1500,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "colored",
                        transition: Flip,
                    });
                }
                setLoad(false);
            }
            setLoad(false);
        }
        else {
            toast.error("Give all Details Properly", {
                position: "top-right",
                autoClose: 1500,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
                transition: Flip,
            });
        }
    }

    const handleChangeLoginMethod = () => {
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
            <LoginPagePHtml>
                <LoginPagePBody>
                    <div className="wrapperP">
                        <div className="title-text">
                            <div className="title login">Login Form</div>
                            <div className="title signup">Signup Form</div>
                        </div>
                        <div className="form-containerP">
                            <div className="slide-controls">
                                <input type="radio" name="slide" id="login" onClick={() => { handleChangeLoginMethod(); setIsChecked(true) }} checked={ischecked} />
                                <input type="radio" name="slide" id="signup" onClick={() => { handleChangeLoginMethod(); setIsChecked(false) }} checked={!ischecked} />
                                <label for="login" className="slide login">Login</label>
                                <label for="signup" className="slide signup">Signup</label>
                                <div className="slider-tab"></div>
                            </div>
                            <div className="form-inner">
                                <form action="#" className="login" style={{marginLeft:!ischecked?"-50%":"0%"}}>
                                    <div className="field">
                                        <input type="text" placeholder="Username" value={signInData.username} onChange={(e) => { handleChangeSignIn(e, "username") }} required />
                                    </div>
                                    <div className="field">
                                        <input type="password" placeholder="Password" value={signInData.password} onChange={(e) => { handleChangeSignIn(e, "password") }} required />
                                    </div>
                                    <div className="pass-link"><a href="#">Forgot password?</a></div>
                                    <div className="field btn1">
                                        <div className="btn-layer"></div>
                                        <input type="submit" value="Login" onClick={(e) => handleClickSignInUser(e)} />
                                    </div>
                                    <div className="signup-link">Not a member? <a onClick={() => handleChangeLoginMethod()} href="">Signup now</a></div>
                                </form>
                                <form action="#" className="signup">
                                    <div className="field">
                                        <input type="text" placeholder="Name" value={signUpData.name} onChange={(e) => { handleChangeSignUp(e, "name") }} required />
                                    </div>
                                    <div className="field">
                                        <input type="text" placeholder="Username" value={signUpData.username} onChange={(e) => { handleChangeSignUp(e, "username") }} required />
                                    </div>
                                    <div className="field">
                                        <input type="password" placeholder="Password" value={signUpData.password} onChange={(e) => { handleChangeSignUp(e, "password") }} required />
                                    </div>
                                    <div className="field">
                                        <input type="tel" placeholder="Mobile No." value={signUpData.phone} onChange={(e) => { (e.target.value === '' || /^\d+$/.test(e.target.value)) && e.target.value.length < 11 && handleChangeSignUp(e, "mobile") }} required />
                                    </div>
                                    <div className="field btn1">
                                        <div className="btn-layer"></div>
                                        <input type="submit" value="Signup" onClick={(e) => handleClickSignUpUser(e)} />
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </LoginPagePBody>
            </LoginPagePHtml>
        </>
    )
}
