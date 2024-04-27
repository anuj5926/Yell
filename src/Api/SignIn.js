import React from "react";
import axios from "axios";
import { Flip, toast } from "react-toastify";

export const SignIn = async(data)=>{
    try {
        const response = await axios.post(`${process.env.REACT_APP_LOGIN_URL}`, data);
        return response;
      } catch (error) {
        console.error('Error during API call:', error);
        toast.error(error, {
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