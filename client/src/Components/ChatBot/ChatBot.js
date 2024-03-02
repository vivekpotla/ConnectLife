import React, { useState } from 'react'
import {
    Button,
    SpeedDial,
    SpeedDialHandler,
    SpeedDialContent,
    SpeedDialAction,
    Drawer,
    Typography,
    IconButton
} from "@material-tailwind/react";
import {
    HomeIcon,
    CogIcon,
    LockClosedIcon
} from "@heroicons/react/24/outline";
import Lottie from "lottie-react";
import Bot from '../../Icons/Animation - 1709051490247.json';

const ChatBot = () => {

    const [openRight, setOpenRight] = useState(false);

    const openDrawerRight = () => setOpenRight(true);
    const closeDrawerRight = () => setOpenRight(false);

    const [closeSpeedDial, setCloseSpeedDial] = useState(false);

    return (
        <div>
            <SpeedDial>
                <SpeedDialHandler className={closeSpeedDial ? "hidden" : ""}>
                    <button className='h-4'>
                        <Lottie animationData={Bot} onClick={openDrawerRight} loop={true} className="block h-[150px] w-[150px] rounded-full" />
                        {/* <EnvelopeOpenIcon className="hidden h-7 w-7 group-hover:block" /> */}
                        {/* <EnvelopeIcon className="block h-7 w-7 group-hover:hidden" /> */}
                    </button>
                </SpeedDialHandler>
                <SpeedDialContent className={closeSpeedDial ? "hidden" : ""}>
                    <SpeedDialAction>
                        <HomeIcon className="h-5 w-5" />
                    </SpeedDialAction>
                    <SpeedDialAction>
                        <CogIcon className="h-5 w-5" />
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
                className="p-4"
            >
                <div className="mb-6 flex items-center justify-between">
                    <Typography variant="h5" color="blue-gray">
                        Material Tailwind
                    </Typography>
                    <IconButton
                        variant="text"
                        color="blue-gray"
                        onClick={closeDrawerRight}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={2}
                            stroke="currentColor"
                            className="h-5 w-5"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M6 18L18 6M6 6l12 12"
                            />
                        </svg>
                    </IconButton>
                </div>
                <Typography color="gray" className="mb-8 pr-4 font-normal">
                    Material Tailwind features multiple React and HTML components, all
                    written with Tailwind CSS classes and Material Design guidelines.
                </Typography>
                <div className="flex gap-2">
                    <Button size="sm" variant="outlined">
                        Documentation
                    </Button>
                    <Button size="sm">Get Started</Button>
                </div>
            </Drawer>
        </div>
    )
}

export default ChatBot