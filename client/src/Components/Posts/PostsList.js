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
        setPostsData(res.data);
      }).catch((error) => {
        console.log(error);
      })
    }
    getPostData();
  }, []);

  const [open, setOpen] = React.useState(false);
  const [selectPost, setSelectedPost] = useState();

  const DialogComponent = () => {

    const post = selectPost ? postsData.find(item => item._id === selectPost) : null;

    if (post) {
      return (
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
                src={post?.authorNGO?.imageURL}
                alt="avatar"
                className="border h-10 w-10 border-green-500 shadow-xl shadow-green-900/20 ring-4 ring-green-500/30"
              />
              <div>
                <Typography variant="h6">{post?.authorNGO?.name}</Typography>
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
            <div className='h-[73vh] overflow-auto flex justify-center flex-wrap gap-3'>
              <div className='lg:max-w-[500px] max-w-[700px]'>
                <div className='p-2'>
                  <img
                    className="w-full mb-3 rounded-lg object-cover object-center shadow-xl shadow-blue-gray-900/50"
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
                <div className="text-sm lg:px-5 px-4 mb-3 text-justify font-thin text-blue-gray-500">
                  {post.description}
                </div>
              </div>
              <div className='lg:max-w-[500px] max-w-[700px] w-full p-2'>
                <div className='lg:p-3 p-2 border-2 border-gray-300 h-screen rounded-lg'>
                  <div className='text-gray-700'>Comments:</div>
                  <div className='flex flex-col gap-3 lg:pl-5 pl-3 pt-4'>
                    {post?.comments.map((comment, index) => (
                      <div key={index} className='text-sm text-gray-600 flex flex-col gap-2' >
                        <div className='flex gap-2 items-start'>
                          <Avatar src={comment?.author.imageURL} className="w-8 h-8 border border-red-500 shadow-xl shadow-red-900/20 ring-2 ring-red-500/30" alt="avatar" />
                          <div className='pt-1 font-bold text-nowrap'>{comment?.author.name}</div>
                          <div className='pt-1'>{comment.comment}</div>
                        </div>
                        <div class="flex items-center w-fit pl-7">
                          <div class="w-8 border-t border-gray-400"></div>
                          <span class="px-1 text-gray-500 bg-gray-50 text-xs rounded-full">replies</span>
                          <div class="w-8 border-t border-gray-400"></div>
                        </div>
                        <div className='flex flex-col gap-3 pl-6'>
                          {comment?.replies.map((reply, index) => (
                            <div key={index} className='flex gap-2 items-start'>
                              <Avatar src={reply?.author.imageURL} className="w-7 h-7 border border-green-500 shadow-xl shadow-green-900/20 ring-2 ring-green-500/30" alt="avatar" />
                              <div className='pt-0.5 flex gap-2'><span className='font-bold text-nowrap'>{reply?.author.name}</span>{reply.comment}</div>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </DialogBody>
        </Dialog>
      )
    }
  }

  return (
    <div className="lg:p-4 py-4 px-2 flex gap-6 flex-col items-center">
      {postsData.map((post) => (
        <div key={post._id} className='bg-blue-gray-50 px-2 pt-2.5 pb-3 rounded-2xl max-w-md'>
          <div className="flex items-center gap-4 pb-2 pl-4 relative">
            <Avatar
              src={post?.authorNGO?.imageURL}
              alt="avatar"
              className="border h-10 w-10 border-green-500 shadow-xl shadow-green-900/20 ring-4 ring-green-500/30"
            />
            <div>
              <Typography variant="h6">{post?.authorNGO?.name}</Typography>
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
            <CardBody className="pt-2 pb-4 relative">
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
                <div onClick={() => {
                  setSelectedPost(post._id);
                  setOpen(true);
                }} className="text-sm font-thin text-justify text-blue-gray-500 line-clamp-3 cursor-pointer hover:animate-pulse">
                  {post.description}
                </div>
              </Tooltip>
            </CardBody>
          </Card>
          {<DialogComponent />}
        </div>
      ))}
    </div>
  );
}

export default PostsLists;
