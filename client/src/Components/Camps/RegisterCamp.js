import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import axios from 'axios';
import { Input, Button, Typography, Spinner, Textarea } from '@material-tailwind/react';
import { useNavigate } from 'react-router';
import Footer from '../Footer';
const RegisterCamp = ({ marker, locationAddress, ngoId, setLocationAddress }) => {
    const validationSchema = Yup.object().shape({
        description: Yup.string().required('Description is required'),
        startDate: Yup.string().required('Start Date is required'),
        endDate: Yup.string().required('End Date is required'),
        maxDonorsPerSlot: Yup.number().required('Maximum Donors per Slot is required').positive().integer(),
        startTime: Yup.string().required('Start Time is required'),
        endTime: Yup.string().required('End Time is required'),
        name: Yup.string().required('Name is required'),
    });

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(validationSchema),
    });

    const navigate = useNavigate();
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);

    const [imageURL, setImageURL] = useState(null);
    const [fileObject, setFileObject] = useState();

    function handleCampImage(e) {
        console.log(e.target.files);
        setImageURL(URL.createObjectURL(e.target.files[0]));
        setFileObject(e.target.files[0]);
        console.log(fileObject);
    }

    const notifyVolunteers = async (campId) => {
        await axios.post("http://localhost:5000/api/ngo/notify-volunteers-email", { campId }).then((res) => {
            console.log(res.message);
        }).catch((error) => {
            console.log(error);
        });
    }

    const onSubmit = async (data) => {
        try {
            setLoading(true);
            const formData = new FormData();

            Object.keys(data).forEach((key, index) => {
                formData.append(key, data[key])
            });

            formData.append("ngoId", ngoId);
            formData.append("longitude", marker.longitude);
            formData.append("latitude", marker.latitude);
            formData.append("location", locationAddress);
            formData.append("image", fileObject);

            const axiosConfig = {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            };
            await axios.post("http://localhost:5000/api/ngo/create-camp", formData, axiosConfig).then((res) => {
                // Assuming res.data.payload contains the user data
                notifyVolunteers(res?.data?._id);
                navigate("/mycamps");
            }).catch((error) => {
                setMessage(error.message);
            });

            console.log(formData.get("image"));
            console.log(formData.get("location"));
        } catch (error) {
            setMessage('Failed to create camp');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex items-center justify-center bg-gray-100 p-5 rounded-lg">
            <div className="max-w-md w-full px-8 py-6 bg-white shadow-lg rounded-lg">
                <h1 className="text-2xl font-bold text-center text-gray-800">
                    Camp Details
                </h1>
                <form onSubmit={handleSubmit(onSubmit)} className="mt-4 space-y-4">
                    <Input
                        type="text"
                        label="Camp Name"
                        placeholder="Name"
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
                    <Textarea
                        type="text"
                        label="Description"
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
                    <Input
                        type="date"
                        label="Start Date"
                        placeholder="Start Date"
                        {...register('startDate')}
                    />
                    {errors?.startDate && (
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
                            {errors.startDate.message}
                        </Typography>
                    )}
                    <Input
                        type="date"
                        label="End Date"
                        placeholder="End Date"
                        {...register('endDate')}
                    />
                    {errors?.endDate && (
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
                            {errors.endDate.message}
                        </Typography>
                    )}
                    <Input
                        type="time"
                        label="Start Time"
                        defaultValue="09:00:00"
                        placeholder="Start Time"
                        {...register('startTime')}
                    />
                    {errors?.startTime && (
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
                            {errors.startTime.message}
                        </Typography>
                    )}
                    <Input
                        type="time"
                        label="End Time"
                        defaultValue="18:00:00"
                        placeholder="End Time"
                        {...register('endTime')}
                    />
                    {errors?.endTime && (
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
                            {errors.endTime.message}
                        </Typography>
                    )}
                    <Input
                        type="number"
                        label="Maximum Donors per Slot"
                        defaultValue={4}
                        placeholder="Maximum Donors per Slot"
                        {...register('maxDonorsPerSlot')}
                    />
                    {errors?.maxDonorsPerSlot && (
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
                            {errors.maxDonorsPerSlot.message}
                        </Typography>
                    )}
                    <Input
                        type="text"
                        label="Location"
                        value={locationAddress}
                        onChange={(e) => setLocationAddress(e.target.value)}
                        placeholder="Location"
                    />
                    {errors?.location && (
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
                            {errors.location.message}
                        </Typography>
                    )}
                    {/* <Input
                        type="text"
                        label="Street"
                        placeholder="Street"
                        {...register('address.street')}
                    />
                    <Input
                        type="text"
                        label="City"
                        placeholder="City"
                        {...register('address.city')}
                    />
                    <Input
                        type="text"
                        label="State"
                        placeholder="State"
                        {...register('address.state')}
                    />
                    <Input
                        type="text"
                        label="Country"
                        placeholder="Country"
                        {...register('address.country')}
                    />
                    <Input
                        type="text"
                        label="Postal Code"
                        placeholder="Postal Code"
                        {...register('address.postalCode')}
                    /> */}
                    <div>
                        <Typography className='mb-2 text-gray-600'>Camp Image</Typography>
                        <figure className="relative h-80 w-full">
                            {imageURL != null ?
                                <img
                                    className="h-full w-full rounded-xl object-cover object-center"
                                    src={imageURL}
                                    alt="campImage"
                                /> :
                                <div className="grid animate-pulse h-full w-full place-items-center rounded-lg bg-gray-300">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth={2}
                                        stroke="currentColor"
                                        className="h-12 w-12 text-gray-500"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                                        />
                                    </svg>
                                </div>
                            }
                            <figcaption className="absolute bottom-8 left-2/4 flex w-[calc(100%-4rem)] -translate-x-2/4 justify-center rounded-xl border border-white bg-white/50 py-2 px-6 shadow-lg shadow-black/5 saturate-200 backdrop-blur-[1px]">
                                <input
                                    type="file"
                                    placeholder="Image"
                                    className='text-sm w-fit'
                                    onChange={handleCampImage}
                                />
                            </figcaption>
                        </figure>
                    </div>
                    <Button
                        color="blue"
                        ripple={true}
                        type="submit"
                        className="w-full flex justify-center"
                        disabled={loading}
                    >
                        {loading ? <Spinner className="h-4 w-4" /> : "Create Camp"}
                    </Button>
                </form>
                {message && <Typography color="red" className='mt-2 text-sm'>{message}</Typography>}
            </div>
            <Footer/>
        </div>
    );
};

export default RegisterCamp;

