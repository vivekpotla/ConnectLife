import React, { useEffect, useState } from "react";
import {
    Navbar,
    Collapse,
    Typography,
    Button,
    Menu,
    MenuHandler,
    MenuList,
    MenuItem,
    Avatar,
    Card,
    IconButton,
} from "@material-tailwind/react";
import {
    UserCircleIcon,
    CodeBracketSquareIcon,
    Square3Stack3DIcon,
    ChevronDownIcon,
    Cog6ToothIcon,
    InboxArrowDownIcon,
    LifebuoyIcon,
    PowerIcon,
    RocketLaunchIcon,
    Bars2Icon,
    HomeIcon,
    BuildingStorefrontIcon,
} from "@heroicons/react/24/solid";
import { ConnectlifeIcon } from "../Icons/ConnectlifeIcon";
import { DonateBloodIcon } from "../Icons/DonateBloodIcon";
import { Link } from "react-router-dom";
import { useLocation, useNavigate } from 'react-router';
import { logout } from "../Redux/slices/userSlice";
import { useDispatch } from "react-redux";

// profile menu component
const profileMenuItems = [
    {
        label: "My Profile",
        icon: UserCircleIcon,
        link: ""
    },
    {
        label: "Edit Profile",
        icon: Cog6ToothIcon,
        link: "/editprofile"
    },
    {
        label: "Inbox",
        icon: InboxArrowDownIcon,
        link: ""
    },
    {
        label: "Help",
        icon: LifebuoyIcon,
        link: ''
    },
    {
        label: "Sign Out",
        icon: PowerIcon,
        link: '/'
    },
];

// const userObj = JSON.parse(localStorage.getItem("user"));

function ProfileMenu({ userObj }) {
    const [isMenuOpen, setIsMenuOpen] = React.useState(false);
    const naviate = useNavigate();

    const dispatch = useDispatch();

    return (
        <Menu open={isMenuOpen} handler={setIsMenuOpen} placement="bottom-end">
            <MenuHandler>
                <Button
                    variant="text"
                    color="blue-gray"
                    className="flex items-center gap-1 rounded-full py-0.5 pr-2 pl-0.5 lg:ml-auto"
                >
                    <Avatar
                        variant="circular"
                        size="sm"
                        alt="tania andrew"
                        className="border border-gray-900 p-0.5"
                        src={userObj.imageURL}
                    />
                    <ChevronDownIcon
                        strokeWidth={2.5}
                        className={`h-3 w-3 transition-transform ${isMenuOpen ? "rotate-180" : ""
                            }`}
                    />
                </Button>
            </MenuHandler>
            <MenuList className="p-1">
                {profileMenuItems.map(({ label, icon, link }, key) => {
                    const isLastItem = key === profileMenuItems.length - 1;
                    return (
                        <MenuItem
                            key={label}
                            onClick={() => {
                                setIsMenuOpen(false);
                                if (label === "Sign Out") {
                                    let log = logout();
                                    dispatch(log);
                                }
                                naviate(link);
                            }}
                            className={`flex items-center gap-2 rounded ${isLastItem
                                ? "hover:bg-red-500/10 focus:bg-red-500/10 active:bg-red-500/10"
                                : ""
                                }`}
                        >
                            {React.createElement(icon, {
                                className: `h-4 w-4 ${isLastItem ? "text-red-500" : ""}`,
                                strokeWidth: 2,
                            })}
                            <Typography
                                as="span"
                                variant="small"
                                className="font-normal"
                                color={isLastItem ? "red" : "inherit"}
                            >
                                {label}
                            </Typography>
                        </MenuItem>
                    );
                })}
            </MenuList>
        </Menu>
    );
}

// nav list menu
const navListMenuItems = [
    {
        title: "@material-tailwind/html",
        description:
            "Learn how to use @material-tailwind/html, packed with rich components and widgets.",
    },
    {
        title: "@material-tailwind/react",
        description:
            "Learn how to use @material-tailwind/react, packed with rich components for React.",
    },
    {
        title: "Material Tailwind PRO",
        description:
            "A complete set of UI Elements for building faster websites in less time.",
    },
];

function NavListMenu() {
    const [isMenuOpen, setIsMenuOpen] = React.useState(false);

    const renderItems = navListMenuItems.map(({ title, description }) => (
        <Link key={title}>
            <MenuItem>
                <Typography variant="h6" color="blue-gray" className="mb-1">
                    {title}
                </Typography>
                <Typography variant="small" color="gray" className="font-normal">
                    {description}
                </Typography>
            </MenuItem>
        </Link>
    ));

    return (
        <React.Fragment>
            <Menu allowHover open={isMenuOpen} handler={setIsMenuOpen}>
                <MenuHandler>
                    <Typography as="a" href="#" variant="small" className="font-normal">
                        <MenuItem className="hidden text-base items-center gap-2 font-medium text-blue-gray-900 lg:flex lg:rounded-full">
                            <Square3Stack3DIcon className="h-[18px] w-[18px] text-blue-gray-500" />{" "}
                            Pages{" "}
                            <ChevronDownIcon
                                strokeWidth={2}
                                className={`h-3 w-3 transition-transform ${isMenuOpen ? "rotate-180" : ""
                                    }`}
                            />
                        </MenuItem>
                    </Typography>
                </MenuHandler>
                <MenuList className="hidden w-[36rem] grid-cols-7 gap-3 overflow-visible lg:grid">
                    <Card
                        color="blue"
                        shadow={false}
                        variant="gradient"
                        className="col-span-3 grid h-full w-full place-items-center rounded-md"
                    >
                        <RocketLaunchIcon strokeWidth={1} className="h-28 w-28" />
                    </Card>
                    <ul className="col-span-4 flex w-full flex-col gap-1">
                        {renderItems}
                    </ul>
                </MenuList>
            </Menu>
            <MenuItem className="flex items-center gap-2 font-medium text-blue-gray-900 lg:hidden">
                <Square3Stack3DIcon className="h-[18px] w-[18px] text-blue-gray-500" />{" "}
                Pages{" "}
            </MenuItem>
            <ul className="ml-6 flex w-full flex-col gap-1 lg:hidden">
                {renderItems}
            </ul>
        </React.Fragment>
    );
}

// nav list component
const navListItems = [
    {
        label: "Home",
        icon: HomeIcon,
        link: "/",
        users: ["ngo", "volunteer", "donor", "recipient", "all"]
    },
    {
        label: "Camps",
        icon: BuildingStorefrontIcon,
        link: "/camps",
        users: ["ngo", "volunteer", "donor", "recipient"]
    },
    {
        label: "NGO",
        icon: BuildingStorefrontIcon,
        link: "/ngo",
        users: ["ngo"]
    },
    {
        label: "Donate",
        icon: DonateBloodIcon,
        link: "/donate",
        users: ["donor"]
    },
    {
        label: "FAQs",
        icon: CodeBracketSquareIcon,
        link: "/faqs",
        users: ["ngo", "volunteer", "donor", "recipient", "all"]
    },
];

function NavList({ userObj }) {

    const location = useLocation();

    return (
        <ul className="mt-2 mb-4 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center">
            {navListItems.map(({ label, icon, link, users }, key) => {
                if (users.includes(userObj?.userType) || "all" === users[4])
                    return (
                        <Link to={link} key={label}>
                            <Typography
                                variant="small"
                                color="gray"
                                className={"font-medium text-blue-gray-500 text-base"}
                            >
                                <MenuItem className={location.pathname === link ? "flex items-center gap-2 lg:rounded-full bg-gray-100" : "flex items-center gap-2 lg:rounded-full"}>
                                    {React.createElement(icon, { className: "h-[18px] w-[18px]" })}{" "}
                                    <span className="text-gray-900"> {label}</span>
                                </MenuItem>
                            </Typography>
                        </Link>
                    )
                else
                    return null
            })}
            <NavListMenu />
        </ul>
    );
}

export function Header() {
    const [isNavOpen, setIsNavOpen] = React.useState(false);

    const toggleIsNavOpen = () => setIsNavOpen((cur) => !cur);

    const [userObj, setUserObj] = useState(null);

    const navigate = useNavigate();

    useEffect(() => {
        window.addEventListener(
            "resize",
            () => window.innerWidth >= 960 && setIsNavOpen(false),
        );
    }, []);

    const userRef = localStorage.getItem("user");

    useEffect(() => {
        setUserObj(JSON.parse(localStorage.getItem("user")));
    }, [userRef]);

    return (
        <Navbar className="p-2 lg:pl-6">
            <div className="relative mx-auto flex items-center justify-between text-blue-gray-900">
                <Typography
                    as="a"
                    href="#"
                    className="mr-2 ml-2 cursor-pointer font-medium"
                >
                    <div className="flex flex-row gap-2 place-items-center">
                        <ConnectlifeIcon />
                        <div className="lg:text-3xl text-2xl font-bold text-gray-700">ConnectLife</div>
                    </div>
                </Typography>
                <div className="flex gap-2">
                    <div className="hidden lg:block">
                        <NavList userObj={userObj} />
                    </div>
                    <IconButton
                        size="sm"
                        color="blue-gray"
                        variant="text"
                        onClick={toggleIsNavOpen}
                        className="ml-auto mr-2 lg:hidden"
                    >
                        <Bars2Icon className="h-6 w-6" />
                    </IconButton>

                    {!userObj ? <>
                        <Button size="sm" variant="text" onClick={() => navigate("/login/NGO")}>
                            <span>Log In</span>
                        </Button>
                        <Button size="sm" variant="gradient" onClick={() => navigate("/SignUp/NGO")}>
                            <span>Sign Up</span>
                        </Button>
                    </> :
                        <ProfileMenu userObj={userObj} />
                    }
                </div>
            </div>
            <Collapse open={isNavOpen} className="overflow-scroll">
                <NavList userObj={userObj} />
            </Collapse>
        </Navbar>
    );
}