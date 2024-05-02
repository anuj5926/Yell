import axios from "axios";
import { Flip, toast } from "react-toastify";

export const GetDeposit =async (data)=>{
    try {
        const response = await axios.post(`${process.env.REACT_APP_GET_DEPOSIT_URL}`,data,{
        headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization':JSON.parse(localStorage.getItem('userinfo'))?.auth_token
            }
        });
        return response;
      } catch (error) {
        console.error('Error during API call:', error.message);
        toast.error(error.message, {
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