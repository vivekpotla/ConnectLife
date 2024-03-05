import React, { useEffect, useState } from 'react';
// import PostsComments from './PostsComments'; // Assuming you have a separate component for comments
import img from '../Images/Create_Post.png'; // Import your image
import {
  Avatar,
  Typography,
  Card,
  CardHeader,
  CardBody,
  IconButton,
  Tooltip,
  Dialog,
  DialogBody,
  Button,
  DialogFooter,
  DialogHeader
} from '@material-tailwind/react';
import axios from 'axios';
import {
  HeartIcon,
  ChatBubbleOvalLeftEllipsisIcon
} from '@heroicons/react/24/outline';
import {
  HeartIcon as FilledHeart,
  EllipsisVerticalIcon,
  XMarkIcon
} from '@heroicons/react/24/solid';

const PostsLists = () => {
  const [postsData, setPostsData] = useState([
    {
      ngo: "NGO 1",
      title: "Title number 1",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      imageURL: img,
      _id: 1
    },
    {
      ngo: "NGO 2",
      title: "Title number 2",
      description: "Hello you all must donate blood.",
      imageURL: img,
      _id: 2
    },
    // Add more posts as needed
  ]);

  const [like, setLike] = useState(false);

  useEffect(() => {
    const getPostData = async () => {
      await axios.get("http://localhost:5000/api/donor/get-all-posts").then((res) => {
        // console.log(res.data);
        setPostsData(res.data);
      }).catch((error) => {
        console.log(error);
      })
    }
    getPostData();
  }, []);

  const [open, setOpen] = React.useState(false);

  const DialogComponent = ({ post }) => (
    <Dialog
      size='xl'
      open={open}
      onCancel={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      className='h-[90%]'
      title='Open Post'
    >
      <DialogHeader className='justify-between py-3'>
        <Typography color="blue-gray" className='ml-2 font-semibold text-xl md:font-extrabold md:text-3xl flex gap-3'>
          <Avatar
            src="https://docs.material-tailwind.com/img/face-2.jpg"
            alt="avatar"
            className="border h-10 w-10 border-green-500 shadow-xl shadow-green-900/20 ring-4 ring-green-500/30"
          />
          <div>
            <Typography variant="h6">{post.title}</Typography>
            <Typography variant="small" color="gray" className="font-normal text-xs pl-0.5">
              NGO
            </Typography>
          </div>
        </Typography>
        <IconButton
          color="blue-gray"
          size="sm"
          variant="text"
          onClick={() => setOpen(false)}
        >
          <XMarkIcon className='h-5 w-5' />
        </IconButton>
      </DialogHeader>
      <DialogBody className='p-0 lg:mx-2 py-3 bg-blue-gray-50 rounded-md'>
        <div className='h-[73vh] overflow-auto lg:flex justify-center gap-3'>
          <div className='max-w-[500px]'>
            <div className='p-2'>
              <img
                className="max-w-full mb-3 rounded-lg object-cover object-center shadow-xl shadow-blue-gray-900/50"
                src={post.imageURL}
                alt="natureImage"
              />
            </div>
            <div className="flex justify-between px-3 my-2 lg:ml-4 ml-2">
              <Typography variant="h5" color="blue-gray" className="mb-2 font-bold">
                {post.title}
              </Typography>
              <div className='flex justify-end items-start gap-2 pr-2'>
                <IconButton
                  onClick={() => setLike(!like)}
                  size="sm"
                  variant="text"
                  className="rounded-full active:animate-ping"
                >
                  {like ? <FilledHeart className='h-6 w-6 fill-red-600' /> :
                    <HeartIcon color='gray' className='h-6 w-6' />}
                </IconButton>
              </div>
            </div>
            <div className="text-sm lg:ml-4 ml-2 px-1 mb-3 font-thin text-blue-gray-500">
              {post.description}{" "}
              Cupidatat duis irure magna ad elit. Exercitation esse minim labore proident velit est. Laboris ut dolore eiusmod mollit nostrud elit ex occaecat nostrud amet ex velit veniam. Incididunt cupidatat ex nostrud nostrud. Sunt occaecat velit adipisicing enim veniam eiusmod duis ea proident cupidatat ullamco duis. Minim adipisicing ullamco ex ut.
              Ad amet occaecat exercitation et. Exercitation irure consequat reprehenderit ea labore esse. Ea aute aliquip velit non. Ullamco dolore sint tempor magna laborum.
              Nisi non laboris nisi qui non dolor cupidatat veniam exercitation elit. Minim labore dolor est et. Id veniam est irure magna tempor occaecat. Magna ut eiusmod laborum ipsum adipisicing officia quis dolore aliqua. Do irure ex dolor enim nulla. Lorem cupidatat in Lorem esse aliquip fugiat ea mollit.
              Aliquip pariatur proident ea proident ad enim magna officia veniam consequat ex voluptate adipisicing. Sunt et aliqua aliqua esse ipsum. Qui adipisicing cillum in Lorem excepteur proident exercitation dolore consequat ullamco eu exercitation proident do.
            </div>
          </div>
          <div className='max-w-[500px] w-full p-2'>
            <div className='bg-white rounded-md h-full p-3'>
              comments
            </div>
          </div>
        </div>
      </DialogBody>
    </Dialog>
  )

  return (
    <div className="lg:p-4 py-4 px-2 flex gap-6 flex-col items-center">
      {postsData.map((post) => (
        <div key={post._id} className='bg-blue-gray-50 px-2 pt-2.5 pb-3 rounded-2xl max-w-md'>
          <div className="flex items-center gap-4 pb-2 pl-4 relative">
            <Avatar
              src="https://docs.material-tailwind.com/img/face-2.jpg"
              alt="avatar"
              className="border h-10 w-10 border-green-500 shadow-xl shadow-green-900/20 ring-4 ring-green-500/30"
            />
            <div>
              <Typography variant="h6">{post.title}</Typography>
              <Typography variant="small" color="gray" className="font-normal text-xs pl-0.5">
                NGO
              </Typography>
            </div>
            <IconButton
              size="sm"
              variant="text"
              className="!absolute top-1.5 right-4 rounded-full"
            >
              <EllipsisVerticalIcon className='h-5 w-5 fill-gray-800' />
            </IconButton>
          </div>
          <Card className="w-full rounded-lg bg-gray-50">
            <CardHeader floated={false} className="">
              <img src={post.imageURL} alt="PostPicture" className='w-full' />
            </CardHeader>
            <CardBody className="pt-2 pb-4 sm:h-[22vh] h-[15vh] relative">
              <div className="flex justify-between">
                <Typography variant="h5" color="blue-gray" className="mb-2 font-bold">
                  {post.title}
                </Typography>
                <div className='flex justify-end items-start gap-2 pr-2'>
                  <IconButton
                    onClick={() => setLike(!like)}
                    size="sm"
                    variant="text"
                    className="rounded-full active:animate-ping"
                  >
                    {like ? <FilledHeart className='h-6 w-6 fill-red-600' /> :
                      <HeartIcon color='gray' className='h-6 w-6' />}
                  </IconButton>
                  <IconButton
                    size="sm"
                    variant="text"
                    className="rounded-full active:animate-ping"
                  >
                    <ChatBubbleOvalLeftEllipsisIcon color='gray' className='h-6 w-6' />
                  </IconButton>
                </div>
              </div>
              <Tooltip content="View More">
                <div onClick={() => setOpen(true)} className="text-sm font-thin text-blue-gray-500 line-clamp-3 cursor-pointer hover:animate-pulse">
                  {post.description}{" "}
                  Cupidatat duis irure magna ad elit. Exercitation esse minim labore proident velit est. Laboris ut dolore eiusmod mollit nostrud elit ex occaecat nostrud amet ex velit veniam. Incididunt cupidatat ex nostrud nostrud. Sunt occaecat velit adipisicing enim veniam eiusmod duis ea proident cupidatat ullamco duis. Minim adipisicing ullamco ex ut.
                  Ad amet occaecat exercitation et. Exercitation irure consequat reprehenderit ea labore esse. Ea aute aliquip velit non. Ullamco dolore sint tempor magna laborum.
                  Nisi non laboris nisi qui non dolor cupidatat veniam exercitation elit. Minim labore dolor est et. Id veniam est irure magna tempor occaecat. Magna ut eiusmod laborum ipsum adipisicing officia quis dolore aliqua. Do irure ex dolor enim nulla. Lorem cupidatat in Lorem esse aliquip fugiat ea mollit.
                  Aliquip pariatur proident ea proident ad enim magna officia veniam consequat ex voluptate adipisicing. Sunt et aliqua aliqua esse ipsum. Qui adipisicing cillum in Lorem excepteur proident exercitation dolore consequat ullamco eu exercitation proident do.
                </div>
              </Tooltip>
            </CardBody>
          </Card>
          {<DialogComponent post={post} />}
        </div>
      ))}
    </div>
  );
}

export default PostsLists;
