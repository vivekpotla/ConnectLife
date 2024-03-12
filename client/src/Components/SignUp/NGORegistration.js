import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import axios from "axios";
import { Input, Button, Typography, Avatar, Spinner } from "@material-tailwind/react";
import ProfilePic from '../Images/profile.jpg';
import { useNavigate } from 'react-router';
const NGORegistration = () => {
    // define the validation schema for the form
    const validationSchema = Yup.object().shape({
        name: Yup.string().required("Name is required"),
        email: Yup.string()
            .required("Email is required")
            .email("Email is invalid"),
        password: Yup.string()
            .required("Password is required")
            .min(8, "Password must be at least 8 characters"),
        confirmPassword: Yup.string()
            .required("Confirm Password is required")
            .oneOf([Yup.ref("password")], "Passwords must match"), // use Yup.ref to refer to the password field value
        phoneNumber: Yup.string()
            .required("Phone number is required")
            .matches(/^\d{10}$/, "Phone number must be 10 digits"),
        description: Yup.string().required("Description is required"),
        address: Yup.object().shape({
            street: Yup.string().required("Street is required"),
            city: Yup.string().required("City is required"),
            state: Yup.string().required("State is required"),
            country: Yup.string().required("Country is required"),
            postalCode: Yup.string().required("Postal code is required"),
        }),
    });

    const navigate = useNavigate();

    // use the useForm hook with the validation schema
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(validationSchema),
    });
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);

    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const [file, setFile] = useState();
    const [objectFile, setObjectFile] = useState();
    function handleProfileFile(e) {
        console.log(e.target.files);
        setFile(URL.createObjectURL(e.target.files[0]));
        setObjectFile(e.target.files[0]);
        console.log(objectFile);
    }

    const onSubmit = async (data) => {
        console.log('jfjjf')
        try {
            setLoading(true);
            const formData = new FormData();
            // Append each form field to the FormData object
            formData.append('name', data.name);
            formData.append('email', data.email);
            formData.append('password', data.password);
            formData.append('phoneNumber', data.phoneNumber);
            formData.append('description', data.description);
            formData.append('address[street]', data.address.street);
            formData.append('address[city]', data.address.city);
            formData.append('address[state]', data.address.state);
            formData.append('address[country]', data.address.country);
            formData.append('address[postalCode]', data.address.postalCode);

            // Append the file to the FormData object
            formData.append('image', objectFile);

            // Make the POST request using axios
            const axiosConfig = {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            };
            await axios.post("http://localhost:5000/api/ngo/register", formData, axiosConfig).then((res) => {
                // Assuming res.data.payload contains the user data
                console.log("then method");
                localStorage.setItem("user", JSON.stringify({ ...res.data.payload, userType: "ngo" }));
                navigate("/");
            }).catch((error) => {
                setMessage(error.response.data.message);
            });
            console.log(localStorage.getItem("user"));
            // // Handle success response
        } catch (error) {
            // Handle error response
            setMessage(error);
        } finally {
            setLoading(false);
        }
    };


    return (
        <div className="flex items-center justify-center bg-gray-100 py-5">
            <div className="max-w-md w-full p-8 bg-white shadow-lg rounded-lg">
                <h1 className="text-3xl font-bold text-center text-gray-800">
                    Sign Up
                </h1>
                <form onSubmit={handleSubmit(onSubmit)} className="mt-4 space-y-4">
                    <div className="flex flex-col items-center relative">
                        <Avatar
                            src={file ? file : ProfilePic}
                            withBorder={true}
                            className="p-0.5"
                            size="xxl"
                        />
                        <div className="inline-block absolute bottom-0 right-1/3">
                            <div className="inline-block w-9 h-9 relative rounded-full cursor-pointer">
                                <div className="inline-flex items-center justify-center w-8 h-8 bg-gray-200 rounded-full hover:bg-gray-300 absolute left-0.5 top-0.5">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125" />
                                    </svg>
                                </div>
                                <input
                                    type="file"
                                    onChange={handleProfileFile}
                                    className="opacity-0 rounded-full w-8 h-8 absolute left-0.5 top-0.5"
                                />
                            </div>
                        </div>
                    </div>
                    <div>
                        <Input
                            type="text"
                            label="Name"
                            id="name"
                            name="name"
                            placeholder="Enter your name"
                            // error={errors?.name ? errors.name.message : ""}
                            {...register('name')}
                        />
                        {errors?.name && (
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
                                {errors.name.message}
                            </Typography>
                        )}
                    </div>
                    <div>
                        <Input
                            type="email"
                            label="Email"
                            id="email"
                            name="email"
                            placeholder="Enter your email"
                            // error={errors?.email ? errors.email.message : ""}
                            {...register('email')}
                        />
                        {errors?.email && (
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
                                {errors.email.message}
                            </Typography>
                        )}
                    </div>
                    <div className="relative">
                        <Input
                            type={showPassword ? "text" : "password"}
                            label="Password"
                            id="password"
                            name="password"
                            placeholder="Enter your password"
                            // error={errors?.password ? errors.password.message : ""}
                            {...register('password')}
                        />
                        <button
                            type="button"
                            size="sm"
                            onClick={togglePasswordVisibility}
                            className="absolute inset-y-0 right-0 flex items-center m-1 px-3 focus:bg-gray-100 rounded-2xl"
                        >
                            {showPassword ? (
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-4 w-4 text-gray-600"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                </svg>
                            ) : (
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-600" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" >
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                </svg>
                            )}
                        </button>
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
                    </div>
                    <div>
                        <Input
                            type={showPassword ? "text" : "password"}
                            label="Confirm Password"
                            id="confirmPassword"
                            name="confirmPassword"
                            placeholder="Re-enter your password"
                            // error={errors?.confirmPassword ? errors.confirmPassword.message : ""}
                            {...register('confirmPassword')}
                        />
                        {errors?.confirmPassword && (
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
                                {errors.confirmPassword.message}
                            </Typography>
                        )}
                    </div>
                    <div>
                        <Input
                            type="text"
                            label="Phone number"
                            id="phoneNumber"
                            name="phoneNumber"
                            placeholder="Enter your phone number"
                            // error={errors?.phoneNumber ? errors.phoneNumber.message : ""}
                            {...register('phoneNumber')}
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
                    </div>
                    <div>
                        <Input
                            type="textarea"
                            label="Description"
                            id="description"
                            name="description"
                            placeholder="Enter a brief description about yourself"
                            // error={errors?.description ? errors.description.message : ""}
                            {...register('description')}
                        />
                        {errors?.description && (
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
                                {errors.description.message}
                            </Typography>
                        )}
                    </div>
                    <div>
                        <Input
                            type="text"
                            label="Street"
                            id="street"
                            name="address.street"
                            placeholder="Enter your street"
                            // error={errors?.address?.street ? errors.address.street.message : ""}
                            {...register('address.street')}
                        />
                        {errors?.address?.street && (
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
                                {errors.address.street.message}
                            </Typography>
                        )}
                    </div>
                    <div>
                        <Input
                            type="text"
                            label="City"
                            id="city"
                            name="address.city"
                            placeholder="Enter your city"
                            // error={errors?.address?.city ? errors.address.city.message : ""}
                            {...register('address.city')}
                        />
                        {errors?.address?.city && (
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
                                {errors.address.city.message}
                            </Typography>
                        )}
                    </div>
                    <div>
                        <Input
                            type="text"
                            label="State"
                            id="state"
                            name="address.state"
                            placeholder="Enter your state"
                            // error={errors?.address?.state ? errors.address.state.message : ""}
                            {...register('address.state')}
                        />
                        {errors?.address?.state && (
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
                                {errors.address.state.message}
                            </Typography>
                        )}
                    </div>
                    <div>
                        <Input
                            type="text"
                            label="Country"
                            id="country"
                            name="address.country"
                            placeholder="Enter your country"
                            // error={errors?.address?.country ? errors.address.country.message : ""}
                            {...register('address.country')}
                        />
                        {errors?.address?.country && (
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
                                {errors.address.country.message}
                            </Typography>
                        )}
                    </div>
                    <div>
                        <Input
                            type="text"
                            label="Postal code"
                            id="postalCode"
                            name="address.postalCode"
                            placeholder="Enter your postal code"
                            // error={errors?.address?.postalCode ? errors.address.postalCode.message : ""}
                            {...register('address.postalCode')}
                        />
                        {errors?.address?.postalCode && (
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
                                {errors.address.postalCode.message}
                            </Typography>
                        )}
                    </div>
                    <Button
                        color="blue"
                        ripple={true}
                        type="submit"
                        className="w-full flex justify-center"
                        disabled={loading}
                    >
                        {loading ? <Spinner className="h-4 w-4" /> : "Sign up"}
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
                    </svg> {message}
                </div>}
            </div>
        </div>
    );
}

export default NGORegistration;
