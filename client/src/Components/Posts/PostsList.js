import React, { useEffect, useState } from 'react';
import PostsComments from './PostsComments'; // Assuming you have a separate component for comments
import img from '../Images/Create_Post.png'; // Import your image
import {
  Avatar,
  Typography,
  Card,
  CardHeader,
  CardBody,
  IconButton,
  Tooltip,
} from '@material-tailwind/react';
import axios from 'axios';
import {
  HeartIcon,
  ChatBubbleOvalLeftEllipsisIcon
} from '@heroicons/react/24/outline';
import {
  HeartIcon as FilledHeart,
  EllipsisVerticalIcon
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

  const [comments, setComments] = useState({});
  const [likes, setLikes] = useState({});

  const handleAddComment = (postId, comment) => {
    setComments(prevComments => ({
      ...prevComments,
      [postId]: [...(prevComments[postId] || []), comment]
    }));
  };

  const handleLike = (postId) => {
    setLikes(prevLikes => ({
      ...prevLikes,
      [postId]: !prevLikes[postId]
    }));
  };

  const [commentSectionOpen, setCommentSectionOpen] = useState({});

  const toggleCommentSection = postId => {
    setCommentSectionOpen(prevState => ({
      ...prevState,
      [postId]: !prevState[postId]
    }));
  };

  return (
    <div className="lg:p-4 py-4 px-2 flex gap-6 flex-col items-center">
      {postsData.map((post) => (
        <div className='bg-blue-gray-50 px-2 pt-2.5 pb-3 rounded-2xl max-w-md'>
          <div className="flex items-center gap-4 pb-2 pl-4 relative">
            <Avatar
              src="https://docs.material-tailwind.com/img/face-2.jpg"
              alt="avatar"
              className="border h-10 w-10 border-green-500 shadow-xl shadow-green-900/20 ring-4 ring-green-500/30"
            />
            <div>
              <Typography variant="h6">{post.title}</Typography>
              <Typography variant="xs" color="gray" className="font-normal text-xs pl-0.5">
                NGO
              </Typography>
            </div>
            <IconButton
              size="sm"
              variant="text"
              className="!absolute top-1.5 right-4 rounded-full"
            >
              {/* <HeartIcon className='h-5 w-5' /> */}
              <EllipsisVerticalIcon className='h-5 w-5 fill-gray-800' />
            </IconButton>
          </div>
          <Card className="w-full rounded-lg bg-gray-50">
            <CardHeader floated={false} className="md:h-[43vh] h-[24vh]">
              <img src={post.imageURL} alt="PostPicture" className='w-full h-full' />
            </CardHeader>
            <CardBody className="pt-2 pb-4 sm:h-[22vh] h-[15vh] relative">
              <div className="flex justify-between">
                <Typography variant="h5" color="blue-gray" className="mb-2 font-bold">
                  {post.title}
                </Typography>
                <div className='flex justify-end items-start gap-2 pr-2'>
                  <IconButton
                    size="sm"
                    variant="text"
                    className="rounded-full active:animate-ping"
                  >
                    <FilledHeart className='h-6 w-6 fill-red-600' />
                    {/* <HeartIcon color='gray' className='h-6 w-6' /> */}
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
                <div className="text-sm font-thin text-blue-gray-500 line-clamp-3 cursor-pointer hover:animate-pulse">
                  Lorem aliquip elit elit tempor aliquip cupidatat duis velit ipsum proident. Amet deserunt magna do labore. Nisi voluptate cupidatat sit esse excepteur nostrud Lorem duis eu consectetur adipisicing. In magna ex aute excepteur dolore sit irure qui exercitation. Sint in ut proident qui in adipisicing Lorem non eu irure mollit anim qui. Ad fugiat nostrud mollit ullamco est eiusmod veniam excepteur mollit elit laboris consectetur ex ullamco. Pariatur enim qui id Lorem proident dolore enim cupidatat minim adipisicing laborum eiusmod cillum. Sint irure consectetur non ex voluptate irure nostrud officia. Esse aliqua veniam esse amet dolore nisi dolor magna velit aute laboris reprehenderit. Culpa Lorem dolor esse excepteur sunt.
                </div>
              </Tooltip>
            </CardBody>
          </Card>
        </div>
      ))}
      {/* <div key={post._id} className="border border-gray-100 my-4 rounded items-center bg-white  shadow-xl overflow-hidden">
        <div className="flex items-center gap-4 py-2 px-5">
          <Avatar
            src="https://docs.material-tailwind.com/img/face-2.jpg"
            alt="avatar"
            className="border h-10 w-10 border-green-500 shadow-xl shadow-green-900/20 ring-4 ring-green-500/30"
          />
          <div>
            <Typography variant="h6">{post.title}</Typography>
            <Typography variant="small" color="gray" className="font-normal">
              Web Developer
            </Typography>
          </div>
        </div>
        <img src={post.imageURL} alt="Post" className="w-full h-full object-cover object-center" />
        <div className="px-4 py-1 border border-t-gray-200 border-b-gray-200">
          <h2 className="text-xl font-semibold">{post.title}</h2>
          <p className="text-gray-700">{post.description}</p>
        </div>
        <div className="flex items-center px-2">
          <button className="text-gray-500" onClick={() => handleLike(post._id)}>
            <svg className={`h-8 w-8 ${likes[post._id] ? 'fill-red-600 text-red-500' : 'fill-gray-100 text-gray-500'}`} width="24" height="24" viewBox="0 0 24 24" strokeWidth="1" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
              <path fill="none" />
              <path d="M12 20l-7 -7a4 4 0 0 1 6.5 -6a.9 .9 0 0 0 1 0a4 4 0 0 1 6.5 6l-7 7" />
            </svg>
          </button>
          <button className="text-gray-600 flex items-center space-x-1" onClick={() => toggleCommentSection(post._id)}>
            <svg className="h-8 w-8 text-gray-500 " fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
            <p>Comments</p>
          </button>
        </div>
        {commentSectionOpen[post._id] && (
          <PostsComments postId={post._id} comments={comments[post._id]} onAddComment={handleAddComment} />
        )}
      </div> */}
      {/* <div key={post._id} className="border border-gray-100 my-4 rounded items-center bg-white  shadow-xl overflow-hidden">
        <div className="flex items-center gap-4 py-2 px-5">
          <Avatar
            src="https://docs.material-tailwind.com/img/face-2.jpg"
            alt="avatar"
            className="border h-10 w-10 border-green-500 shadow-xl shadow-green-900/20 ring-4 ring-green-500/30"
          />
          <div>
            <Typography variant="h6">{post.title}</Typography>
            <Typography variant="small" color="gray" className="font-normal">
              Web Developer
            </Typography>
          </div>
        </div>
        <img src={post.imageURL} alt="Post" className="w-full h-full object-cover object-center" />
        <div className="px-4 py-1 border border-t-gray-200 border-b-gray-200">
          <h2 className="text-xl font-semibold">{post.title}</h2>
          <p className="text-gray-700">{post.description}</p>
        </div>
        <div className="flex items-center px-2">
          <button className="text-gray-500" onClick={() => handleLike(post._id)}>
            <svg className={`h-8 w-8 ${likes[post._id] ? 'fill-red-600 text-red-500' : 'fill-gray-100 text-gray-500'}`} width="24" height="24" viewBox="0 0 24 24" strokeWidth="1" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
              <path fill="none" />
              <path d="M12 20l-7 -7a4 4 0 0 1 6.5 -6a.9 .9 0 0 0 1 0a4 4 0 0 1 6.5 6l-7 7" />
            </svg>
          </button>
          <button className="text-gray-600 flex items-center space-x-1" onClick={() => toggleCommentSection(post._id)}>
            <svg className="h-8 w-8 text-gray-500 " fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
            <p>Comments</p>
          </button>
        </div>
        {commentSectionOpen[post._id] && (
          <PostsComments postId={post._id} comments={comments[post._id]} onAddComment={handleAddComment} />
        )}
      </div> */}
      {/* <Card className="max-w-[60vw] flex-row">
          <CardHeader
            shadow={false}
            floated={false}
            className="m-0 shrink-0 rounded-r-none"
          >
            <img
              src={post.imageURL}
              alt="card-image"
              className="h-[40vh] w-full object-cover"
            />
          </CardHeader>
          <CardBody>
            <Typography variant="h6" color="gray" className="mb-4 uppercase">
              startups
            </Typography>
            <Typography variant="h4" color="blue-gray" className="mb-2">
              Lyft launching cross-platform service this week
            </Typography>
            <Typography color="gray" className="mb-8 font-normal">
              Like so many organizations these days, Autodesk is a company in
              transition. It was until recently a traditional boxed software company
              selling licenses. Yet its own business model disruption is only part
              of the story
            </Typography>
            <Button variant="text" className="flex items-center gap-2">
              Learn More
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
                className="h-4 w-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
                />
              </svg>
            </Button>
          </CardBody>
        </Card> */}
    </div>
  );
}

export default PostsLists;
