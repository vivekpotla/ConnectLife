import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import axios from "axios";

const SignupForm = () => {
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
      .max(10, "Phone number must be 10 digits long"),
    description: Yup.string().required("Description is required"),
    address: Yup.object().shape({
      street: Yup.string().required("Street is required"),
      city: Yup.string().required("City is required"),
      state: Yup.string().required("State is required"),
      country: Yup.string().required("Country is required"),
      postalCode: Yup.string().required("Postal code is required"),
    }),
  });

  // use the useForm hook with the validation schema
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(validationSchema),
  });
  const [message, setMessage] = useState("");

  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const onSubmit = (data) => {
    console.log(data);
    // axios
    //   .post("/api/signup", data)
    //   .then((res) => {
    //     setMessage(res.data.message);
    //   })
    //   .catch((err) => {
    //     setMessage(err.response.data.message);
    //   });
  };

  return (
    <div className="flex items-center justify-center bg-gray-100 py-5">
      <div className="max-w-md w-full p-8 bg-white shadow-lg rounded-lg">
        <h1 className="text-2xl font-bold text-center text-gray-800">
          Sign up for NGO
        </h1>
        <form onSubmit={handleSubmit(onSubmit)} className="mt-4 space-y-4">
          <div className="flex flex-col">
            <label htmlFor="name" className="text-sm font-medium text-gray-600">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Enter your name"
              {...register('name')}
              className="mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            {errors?.name && (
              <span className="text-xs text-red-500">{errors.name.message}</span>
            )}
          </div>
          <div className="flex flex-col">
            <label htmlFor="email" className="text-sm font-medium text-gray-600">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email"
              {...register('email')}
              className="mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            {errors?.email && (
              <span className="text-xs text-red-500">{errors.email.message}</span>
            )}
          </div>
          <div className="flex flex-col">
            <label
              htmlFor="password"
              className="text-sm font-medium text-gray-600"
            >
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                placeholder="Enter your password"
                {...register('password')}
                className="mt-1 p-2 border w-full border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              {errors?.password && (
                <span className="text-xs text-red-500">
                  {errors.password.message}
                </span>
              )}
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute inset-y-0 right-0 px-3 flex items-center focus:outline-none"
              >
                {showPassword ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-gray-600"
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
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-gray-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 4v2m0 12v2m16-2v-2m0-12V4m-8 16h.01"
                    />
                  </svg>
                )}
              </button>
            </div>

          </div>
          <div className="flex flex-col">
            <label
              htmlFor="confirmPassword"
              className="text-sm font-medium text-gray-600"
            >
              Confirm Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              id="confirmPassword"
              name="confirmPassword"
              placeholder="Re-enter your password"
              {...register('confirmPassword')}
              className="mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            {errors?.confirmPassword && (
              <span className="text-xs text-red-500">
                {errors.confirmPassword.message}
              </span>
            )}
          </div>
          <div className="flex flex-col">
            <label
              htmlFor="phoneNumber"
              className="text-sm font-medium text-gray-600"
            >
              Phone number
            </label>
            <input
              type="text"
              id="phoneNumber"
              name="phoneNumber"
              placeholder="Enter your phone number"
              {...register('phoneNumber')}
              className="mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            {errors?.phoneNumber && (
              <span className="text-xs text-red-500">
                {errors.phoneNumber.message}
              </span>
            )}
          </div>
          <div className="flex flex-col">
            <label
              htmlFor="description"
              className="text-sm font-medium text-gray-600"
            >
              Description
            </label>
            <textarea
              id="description"
              name="description"
              placeholder="Enter a brief description about yourself"
              {...register('description')}
              className="mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            {errors?.description && (
              <span className="text-xs text-red-500">
                {errors.description.message}
              </span>
            )}
          </div>
          <div className="flex flex-col">
            <label
              htmlFor="street"
              className="text-sm font-medium text-gray-600"
            >
              Street
            </label>
            <input
              type="text"
              id="street"
              name="address.street"
              placeholder="Enter your street"
              {...register('address.street')}
              className="mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            {errors?.address?.street && (
              <span className="text-xs text-red-500">
                {errors.address.street.message}
              </span>
            )}
          </div>
          <div className="flex flex-col">
            <label htmlFor="city" className="text-sm font-medium text-gray-600">
              City
            </label>
            <input
              type="text"
              id="city"
              name="address.city"
              placeholder="Enter your city"
              {...register('address.city')}
              className="mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            {errors?.address?.city && (
              <span className="text-xs text-red-500">
                {errors.address.city.message}
              </span>
            )}
          </div>
          <div className="flex flex-col">
            <label
              htmlFor="state"
              className="text-sm font-medium text-gray-600"
            >
              State
            </label>
            <input
              type="text"
              id="state"
              name="address.state"
              placeholder="Enter your state"
              {...register('address.state')}
              className="mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            {errors?.address?.state && (
              <span className="text-xs text-red-500">
                {errors.address.state.message}
              </span>
            )}
          </div>
          <div className="flex flex-col">
            <label
              htmlFor="country"
              className="text-sm font-medium text-gray-600"
            >
              Country
            </label>
            <input
              type="text"
              id="country"
              name="address.country"
              placeholder="Enter your country"
              {...register('address.country')}
              className="mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            {errors?.address?.country && (
              <span className="text-xs text-red-500">
                {errors.address.country.message}
              </span>
            )}
          </div>
          <div className="flex flex-col">
            <label
              htmlFor="postalCode"
              className="text-sm font-medium text-gray-600"
            >
              Postal code
            </label>
            <input
              type="text"
              id="postalCode"
              name="address.postalCode"
              placeholder="Enter your postal code"
              {...register('address.postalCode')}
              className="mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            {errors?.address?.postalCode && (
              <span className="text-xs text-red-500">
                {errors.address.postalCode.message}
              </span>
            )}
          </div>
          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="w-full py-2 px-4 bg-blue-500 text-white font-bold rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              Sign up
            </button>
          </div>
        </form>
        {message && <p className="mt-4 text-center text-gray-600">{message}</p>}
      </div>
    </div>
  );
}

export default SignupForm;