import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import axios from "axios";
import { Input, Button, Spinner, Typography } from "@material-tailwind/react";
import { useNavigate, useParams } from 'react-router';
import { useDispatch } from 'react-redux'
import { login } from "../../Redux/slices/userSlice";

const Login = () => {

  const validationSchema = Yup.object().shape({
    phoneNumber: Yup.string()
      .required("Phone number is required")
      .max(10, "Phone number must be 10 digits long"),
    password: Yup.string()
      .required("Password is required")
      .min(8, "Password must be at least 8 characters"),
  });

  const { userType } = useParams();
  const navigate = useNavigate();

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const dispatch = useDispatch();

  const onSubmit = async (data) => {
    try {
      setLoading(true); // Set loading state to true when form is submitted
      // Make the POST request using axios
      await axios.post(`http://localhost:5000/api/${userType.toLowerCase()}/login`, data).then((res) => {
        // Assuming res.data.payload contains the user data
        let reduxObj = login(res.data.payload);
        dispatch(reduxObj);
        localStorage.setItem("user", JSON.stringify({ ...res.data.payload, userType: userType.toLowerCase() }));
        navigate("/");
      }).catch((error) => {
        console.log(error);
        setMessage(error.message);
      });

      // Redirect user after successful login
    } catch (error) {
      setMessage(error.message || "An error occurred");
    } finally {
      setLoading(false); // Set loading state to false when request completes
    }
  };

  const userButtonStyle = {
    active: "border border-blue-gray-300 rounded-lg w-24 text-center py-1 cursor-pointer bg-red-600 font-semibold transition duration-300 ease-in-out transform hover:scale-105",
    inactive: "border border-blue-gray-300 rounded-lg w-24 text-center py-1 cursor-pointer transition duration-300 ease-in-out transform hover:scale-105"
  };

  return (
    <div className='bg-gray-100 py-1 h-screen'>
      <div className='flex flex-row gap-5 my-3 justify-center flex-wrap text-sm'>
        <div className={userType === "NGO" ? userButtonStyle.active : userButtonStyle.inactive} onClick={() => navigate("/login/NGO")}>NGO</div>
        <div className={userType === "Volunteer" ? userButtonStyle.active : userButtonStyle.inactive} onClick={() => navigate("/login/Volunteer")}>Volunteer</div>
        <div className={userType === "Donor" ? userButtonStyle.active : userButtonStyle.inactive} onClick={() => navigate("/login/Donor")}>Donor</div>
        <div className={userType === "Recipient" ? userButtonStyle.active : userButtonStyle.inactive} onClick={() => navigate("/login/Recipient")}>Recipient</div>
      </div>

      <div className="flex items-center justify-center bg-gray-100 py-5">
        <div className="max-w-md w-full p-8 bg-white shadow-lg rounded-lg">
          <h1 className="text-3xl font-bold text-center text-gray-800">
            Login
          </h1>
          <form onSubmit={handleSubmit(onSubmit)} className="mt-4 space-y-4">
            <Input
              type="text"
              label="Phone Number"
              {...register("phoneNumber")}
            />
            {errors?.phoneNumber && (
              <Typography
                variant="small"
                color="red"
                className="mt-1 flex items-center gap-1 text-xs font-normal"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="-mt-px h-3 w-3"
                >
                  <path
                    fillRule="evenodd"
                    d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm8.706-1.442c1.146-.573 2.437.463 2.126 1.706l-.709 2.836.042-.02a.75.75 0 01.67 1.34l-.04.022c-1.147.573-2.438-.463-2.127-1.706l.71-2.836-.042.02a.75.75 0 11-.671-1.34l.041-.022zM12 9a.75.75 0 100-1.5.75.75 0 000 1.5z"
                    clipRule="evenodd"
                  />
                </svg>
                {errors.phoneNumber.message}
              </Typography>
            )}
            <Input
              type="password"
              label="Password"
              {...register("password")}
            />
            {errors?.password && (
              <Typography
                variant="small"
                color="red"
                className="mt-1 flex items-center gap-1 text-xs font-normal"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="-mt-px h-3 w-3"
                >
                  <path
                    fillRule="evenodd"
                    d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm8.706-1.442c1.146-.573 2.437.463 2.126 1.706l-.709 2.836.042-.02a.75.75 0 01.67 1.34l-.04.022c-1.147.573-2.438-.463-2.127-1.706l.71-2.836-.042.02a.75.75 0 11-.671-1.34l.041-.022zM12 9a.75.75 0 100-1.5.75.75 0 000 1.5z"
                    clipRule="evenodd"
                  />
                </svg>
                {errors.password.message}
              </Typography>
            )}
            <Button
              color="blue"
              ripple={true}
              type="submit"
              className="w-full flex justify-center"
              disabled={loading} // Disable button when loading
            >
              {loading ? <Spinner className="h-4 w-4" /> : "Login"}
            </Button>
          </form>
          {message && <div className="mt-4 text-center text-sm font-semibold flex items-center gap-1 text-red-600">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="-mt-px h-3 w-3"
            >
              <path
                fillRule="evenodd"
                d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm8.706-1.442c1.146-.573 2.437.463 2.126 1.706l-.709 2.836.042-.02a.75.75 0 01.67 1.34l-.04.022c-1.147.573-2.438-.463-2.127-1.706l.71-2.836-.042.02a.75.75 0 11-.671-1.34l.041-.022zM12 9a.75.75 0 100-1.5.75.75 0 000 1.5z"
                clipRule="evenodd"
              />
            </svg> Invalid Password or Phone Number
          </div>}
        </div>
      </div>

    </div>
  )
}

export default Login