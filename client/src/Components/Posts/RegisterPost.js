// import React, { useState } from 'react'
// import axios from 'axios';

// const RegisterPost = ({ addData }) => {
//   const [postName, setPostName] = useState('');
//   const [description, setDescription] = useState('');
//   const [createdby, setCreatedby] = useState('');
//   const [postImg, setPostImg] = useState('');

//   const handleSubmit = async (event) => {
//     event.preventDefault();

//     const formData = {
//       ngo: "18028",
//       name: postName,
//       description,
//       createdby,
//       postImg
//     };
//     console.log(formData)
//     try {
//       await axios.post("http://localhost:5000/api/ngo/create-camp", formData);
//       console.log("Post created successfully!");

//       // Reset form fields after successful submission
//       setPostName('');
//       setDescription('');
//       setCreatedby('');
//       setPostImg('');
//     } catch (error) {
//       console.error("Error creating post:", error);
//       // Handle error here
//     }
//   }
//   const handleImageChange = async (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       const reader = new FileReader();
//       reader.onload = () => {
//         if (reader.readyState === 2) {
//           setPostImg(reader.result);
//         }
//       };
//       reader.readAsDataURL(file);

//     }
//   }
//   return (
//     <div className="w-full mt-4 p-4 rounded-lg shadow-lg max-w-md bg-gray-100 ">
//       <form onSubmit={handleSubmit}>
//         <div className="mb-4">
//           <label htmlFor="postName" className="block text-gray-700 font-bold mb-2">
//             Post Name
//           </label>
//           <input
//             type="text"
//             id="postName"
//             value={postName}
//             onChange={(e) => setPostName(e.target.value)}
//             className="border rounded-md px-4 py-2 w-full focus:outline-none focus:border-blue-500"
//             required
//             placeholder='Provide a Title'
//           />
//         </div>
//         <div className="mb-4">
//           <label htmlFor="description" className="block text-gray-700 font-bold mb-2">
//             Description
//           </label>
//           <textarea
//             id="description"
//             value={description}
//             onChange={(e) => setDescription(e.target.value)}
//             className="border rounded-md px-4 py-2 w-full focus:outline-none focus:border-blue-500"
//             required
//             placeholder='Write a caption'
//           />
//         </div>
//         <div className="mb-4">
//           <label htmlFor="image" className="block text-gray-700 font-bold mb-2">
//             Upload Image
//           </label>
//           <input
//             type="file"
//             id="image"
//             accept="image/*"
//             onChange={handleImageChange}
//             className="border rounded-md px-4 py-2 w-full focus:outline-none focus:border-blue-500"
//             required
//           />
//         </div>
//         {postImg && (
//           <div className="mb-4">
//             <img src={postImg} alt="Uploaded" className="w-full h-auto" />
//           </div>
//         )}
//         <div className='flex justify-end'>
//           <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
//             Create Post
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// };


// export default RegisterPost;


import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import axios from 'axios';
import { Input, Button, Typography, Spinner } from '@material-tailwind/react';
import { useNavigate } from 'react-router';

const RegisterPost = () => {
  const validationSchema = Yup.object().shape({
    title: Yup.string().required('Title is required'),
    description: Yup.string().required('Description is required')
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

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      const formData = new FormData();

      Object.keys(data).forEach((key) => {
        formData.append(key, data[key]);
      });

      formData.append("image", fileObject);
      formData.append("ngoId", JSON.parse(localStorage.getItem("user"))._id);

      const axiosConfig = {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      };

      await axios.post("http://localhost:5000/api/ngo/create-post", formData, axiosConfig).then((res) => {
        // Assuming res.data.payload contains the post data
        console.log(res.data);
        setMessage("Post Created Successfully")
        navigate("/myposts");
      }).catch((error) => {
        setMessage(error.message);
      });
    } catch (error) {
      setMessage('Failed to create post');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center bg-gray-100 md:p-5 p-2 rounded-lg max-w-lg w-full">
      <div className="w-full px-8 py-6 bg-white shadow-lg rounded-lg">
        <form onSubmit={handleSubmit(onSubmit)} className="mt-4 space-y-4">
          <Input
            type="text"
            label="Title"
            placeholder="Title"
            {...register('title')}
          />
          {errors?.title && (
            <Typography
              variant="small"
              color="red"
              className="mt-1 flex items-center gap-1 text-xs font-normal"
            >
              {errors.title.message}
            </Typography>
          )}
          <Input
            type="text"
            label="Description"
            placeholder="Description"
            {...register('description')}
          />
          {errors?.description && (
            <Typography
              variant="small"
              color="red"
              className="mt-1 flex items-center gap-1 text-xs font-normal"
            >
              {errors.description.message}
            </Typography>
          )}
          <div>
            <Typography className='mb-2 text-gray-600'>Camp Image</Typography>
            <figure className="relative md:h-80 h-64 w-full">
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
                  className='text-sm w-fit text-gray-600'
                  onChange={handleCampImage}
                />
              </figcaption>
            </figure>
            {imageURL === null && (
              <Typography
                variant="small"
                color="red"
                className="mt-1 flex items-center gap-1 text-xs font-normal"
              >
                Post Image is required
              </Typography>
            )}
          </div>
          <Button
            color="blue"
            ripple={true}
            type="submit"
            className="w-full flex justify-center"
            disabled={loading || imageURL == null}
          >
            {loading ? <Spinner className="h-4 w-4" /> : "Create Post"}
          </Button>
        </form>
        {message && <Typography color="red" className='mt-2 text-sm'>{message}</Typography>}
      </div>
    </div>
  );
};

export default RegisterPost;
