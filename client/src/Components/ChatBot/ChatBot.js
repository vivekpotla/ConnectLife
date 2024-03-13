import React, { useEffect, useRef, useState } from 'react'
import {
    Button,
    SpeedDial,
    SpeedDialHandler,
    SpeedDialContent,
    SpeedDialAction,
    Drawer,
    Typography,
    IconButton,
    Input,
    Spinner
} from "@material-tailwind/react";
import {
    HomeIcon,
    CogIcon,
    LockClosedIcon,
    XMarkIcon
} from "@heroicons/react/24/outline";
import Lottie from "lottie-react";
import Bot from '../../Icons/Animation - 1709051490247.json';
import { PaperAirplaneIcon } from '@heroicons/react/24/solid';
import axios from 'axios';

const ChatBot = () => {

    const [openRight, setOpenRight] = useState(false);

    const openDrawerRight = () => setOpenRight(true);
    const closeDrawerRight = () => setOpenRight(false);

    const [closeSpeedDial, setCloseSpeedDial] = useState(false);

    const [quest, setQuest] = useState("");

    const [chat, setChat] = useState([]);
    const listRef = useRef(null);

    useEffect(() => {
        if (listRef.current) {
            listRef.current.scrollTop = listRef.current.scrollHeight;
        }
    }, [chat]);

    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && quest.trim() !== '') {
            handleSendQuestion();
        }
    };

    const handleSendQuestion = async () => {
        const newQuestion = quest.trim();
        if (newQuestion) {
            const newChat = [...chat, { question: newQuestion, answer: "" }];
            setChat(newChat);
            try {
                setQuest("");
                await axios.get(`http://localhost:4000/chatbot?question=${encodeURIComponent(newQuestion)}`).then((response) => {
                    console.log(response.data);
                    const res = response.data;
                    const newAnswer = res || "Sorry, I couldn't find an answer.";
                    const updatedChat = [...newChat];
                    updatedChat[newChat.length - 1].answer = newAnswer;
                    setChat(updatedChat);
                    setQuest("");
                }).catch((error) => {
                    console.log(error);
                });

            } catch (error) {
                console.error("Error fetching chatbot response:", error);
            }
        }
    };

    return (
        <div>
            <SpeedDial>
                <SpeedDialHandler className={closeSpeedDial ? "hidden" : ""}>
                    <button className='h-4'>
                        <Lottie animationData={Bot} onClick={openDrawerRight} loop={true} className="block lg:h-[150px] lg:w-[150px] h-[80px] w-[80px] rounded-full" />
                        {/* <EnvelopeOpenIcon className="hidden h-7 w-7 group-hover:block" /> */}
                        {/* <EnvelopeIcon className="block h-7 w-7 group-hover:hidden" /> */}
                    </button>
                </SpeedDialHandler>
                <SpeedDialContent className={closeSpeedDial ? "hidden" : ""}>
                    <SpeedDialAction>
                        <HomeIcon className="h-5 w-5" />
                    </SpeedDialAction>
                    <SpeedDialAction>
                        <CogIcon className="h-5 w-5 hover:animate-spin" />
                    </SpeedDialAction>
                    <SpeedDialAction onClick={() => {
                        setCloseSpeedDial(true);
                        setTimeout(() => {
                            setCloseSpeedDial(false);
                        }, 10000)
                    }}>
                        <LockClosedIcon className="h-5 w-5" />
                    </SpeedDialAction>
                </SpeedDialContent>
            </SpeedDial>
            <Drawer
                placement="right"
                open={openRight}
                onClose={closeDrawerRight}
                className="p-4 bg-gray-50"
                size={600}
            >
                <div className="mb-6 flex items-center justify-between rounded">
                    <Typography variant="h5" color="blue-gray">
                        ConnectLife Helper
                    </Typography>
                    <IconButton
                        variant="text"
                        color="blue-gray"
                        onClick={closeDrawerRight}
                    >
                        <XMarkIcon className="h-5 w-5" />
                    </IconButton>
                </div>

                <div className="mb-4 px-1 font-normal h-[80%] overflow-auto text-sm" ref={listRef}>
                    <div className='bg-red-100 place-self-start px-2 py-1.5 max-w-[16vw] rounded-xl rounded-tl-sm'>
                        Hello, How can I help you?
                    </div>
                    {chat.map((val, index) => (
                        <div key={index} className='flex flex-col gap-2 py-4 border-b'>
                            <div className='bg-blue-100 place-self-end px-2 py-1.5 ml-5 rounded-xl rounded-tr-sm'>
                                <div className='font-semibold text-gray-700 text-xs'>You :</div>
                                <div className='pl-1'>
                                    {val.question}
                                </div>
                            </div>
                            <div className='bg-red-100 place-self-start px-2 py-1.5 mr-5 rounded-xl rounded-tl-sm'>
                                <div className='font-semibold text-grey-700 text-xs'>Bot :</div>
                                {val.answer ?
                                    <div className='pl-1'>
                                        {val.answer}
                                    </div> :
                                    <div className='place-items-center px-5 py-1.5'>
                                        <Spinner color='gray' className='h-4 w-4' />
                                    </div>
                                }
                            </div>
                        </div>
                    ))}
                </div>

                <div className="relative">
                    <Input
                        type="text"
                        placeholder="Type Anything"
                        value={quest}
                        onChange={(e) => setQuest(e.target.value)}
                        className="!border pr-14 !border-gray-300 bg-white text-gray-900 shadow-lg shadow-gray-900/5 ring-2 ring-transparent focus:ring-gray-900/10"
                        labelProps={{
                            className: "hidden",
                        }}
                        containerProps={{ className: "w-full" }}
                        autoFocus={true}
                        onKeyDown={handleKeyPress}
                    />
                    <Button
                        size="sm"
                        disabled={!quest}
                        onClick={handleSendQuestion}
                        className="!absolute right-1 top-1 rounded bg-red-900 px-3 py-1.5"
                    >
                        <PaperAirplaneIcon className='h-5 w-5' />
                    </Button>
                </div>

            </Drawer>
        </div>
    )
}

export default ChatBot