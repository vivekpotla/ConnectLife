import React, { useEffect, useState } from 'react';
import CampCard from './CampCard';
import axios from 'axios';
import {
  MagnifyingGlassIcon,
  ChevronDownIcon,
  AdjustmentsHorizontalIcon
} from '@heroicons/react/24/solid';
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Input, Typography, Menu, MenuHandler, MenuItem, MenuList } from '@material-tailwind/react';
import Footer from '../Footer';import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { isAfter } from 'date-fns';

export const CampsList = () => {
  const [query, setQuery] = useState('');

  const [selectedFilter, setSelectedFilter] = useState("Latest");
  const [searchedCamps, setSearchedCamps] = useState([]);
  const [loading, setLoading] = useState(true);
  const [campsData, setCampsData] = useState([]);

  useEffect(() => {
    const getCampsData = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/ngo/view-all-camps');
            const now = new Date();
            const upcoming = response.data.filter(camp => isAfter(new Date(camp.startDate), now));
            setCampsData(upcoming);
            setLoading(false); // Set loading to false after getting data
        } catch (error) {
            console.error(error);
        }
    };

    getCampsData();
}, []);

  useEffect(() => {

    const getSearchedCampsData = async (val) => {
      await axios.get(`http://localhost:5000/api/donor/search-camps/${val}`).then((res) => {
        setSearchedCamps(res.data);
      }).catch((error) => {
        console.log(error);
      });
    }

    const getNearestCampsData = async () => {
      try {
        // Get latitude and longitude using browser geolocation API
        navigator.geolocation.getCurrentPosition(async (position) => {
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;
          // Make API call with latitude and longitude

          await axios.post('http://localhost:5000/api/donor/nearestcamps', {
            latitude,
            longitude
          }).then((res) => {
            setSearchedCamps(res.data);
          }).catch((error) => {
            console.log(error);
          });
        });
      } catch (error) {
        console.error('Error fetching camps data:', error);
      }
    };

    if (selectedFilter === "Location") {
      getNearestCampsData();
    } else if (selectedFilter === "Name") {
      const data = campsData.sort((a, b) => {
        // Sort alphabetically by 'name' property
        if (a.name < b.name) {
          return -1;
        }
        if (a.name > b.name) {
          return 1;
        }
        return 0;
      });

      setSearchedCamps(data);
    } else if (selectedFilter === "Search") {
      getSearchedCampsData(query);
    } else {
      setSearchedCamps([]);
    }

  }, [selectedFilter,query]);
    
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <FontAwesomeIcon icon={faSpinner} spin size="3x" /> {/* Display spinner icon */}
      </div>
    );
  }

  return (
    <div className='bg-gray-100 p-1'>
      <Typography variant='h5' className='font-semibold md:ml-10 ml-4 text-red-700 text-center text-2xl mt-3' >Blood Donation Camps</Typography>
      <div className="md:flex-row flex-col flex md:mr-5 mr-2 mt-3 justify-center">
        <div className='relative flex justify-end place-self-end md:mt-0 mt-3'>
          <ListMenu selectedFilter={selectedFilter} setSelectedFilter={setSelectedFilter} />
          <Input
            type="text"
            placeholder='search by name or location'
            value={query}
            onChange={(val) => {
              setQuery(val.target.value);
            }}
          className="!border !border-gray-300 pr-14 bg-white text-gray-900 shadow-lg shadow-gray-900/5 ring-2 ring-transparent focus:ring-gray-900/10"
          labelProps={{
            className: "hidden",
          }}
          containerProps={{ className: "max-w-[300px] min-w-[100px]" }}
          />
          <Button
            size="sm"
            disabled={!query}
            onClick={() => {
              setSelectedFilter("");
              setSelectedFilter("Search");
            }}
            className="!absolute right-1 top-1 rounded bg-red-900 px-3 py-1.5"
          >
            <MagnifyingGlassIcon className='h-5 w-5' />
          </Button>
        </div>
      </div>
      {searchedCamps.length !== 0 && <div>
        <Typography variant='h6' className='md:ml-10 ml-3 mt-2 text-red-600 text-center'>Showing Search Results:</Typography>
        <div className="flex flex-wrap justify-center">
          {searchedCamps.map((camp, index) => (
            <CampCard key={index} camps={camp} />
          ))}
        </div>
      </div>}
      <div>
        {searchedCamps.length !== 0 &&
          <Typography variant='h6' className='md:ml-10 ml-3 mt-2 text-red-600 text-center'>Latest Camps:</Typography>
        }
        <div className="flex flex-wrap justify-center">
          {campsData.map((camp, index) => (
            <CampCard key={index} camps={camp} />
          ))}
        </div>
      </div>
      
    </div>
  );
}


// nav list menu
const navListMenuItems = [
  {
    title: "Latest",
    description:
      "View Latest Camps ",
  },
  {
    title: "Name",
    description:
      "Sort by Name",
  },
  {
    title: "Location",
    description:
      "Find Nearest Camps",
  },
];

function ListMenu({ selectedFilter, setSelectedFilter }) {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const renderItems = navListMenuItems.map(({ title, description }) => (
    <Link key={title} onClick={() => setSelectedFilter(title)}>
      <MenuItem className={selectedFilter === title ? 'py-1 px-1 bg-blue-gray-50' : "py-1 px-1"}>
        <Typography variant="h6" color="blue-gray" className="">
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
          <Typography variant="small" className="font-normal">
            <MenuItem className="text-base items-center gap-2 font-medium text-blue-gray-900 flex rounded-full">
              <AdjustmentsHorizontalIcon className="h-[18px] w-[18px] text-blue-gray-500" />{" "}
              {selectedFilter}
              <ChevronDownIcon
                strokeWidth={2}
                className={`h-3 w-3 transition-transform ${isMenuOpen ? "rotate-180" : ""
                  }`}
              />
            </MenuItem>
          </Typography>
        </MenuHandler>
        <MenuList className="w-[80px] gap-2 overflow-visible">
          <ul className="flex w-full flex-col gap-0.5">
            {renderItems}
          </ul>
        </MenuList>
      </Menu>
    </React.Fragment>
  );
}