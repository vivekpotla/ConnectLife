import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import axios from 'axios';

// import markerIcon from './marker-icon.png';

// const customMarkerIcon = L.icon({
//     iconUrl: markerIcon,
//     iconSize: [25, 41],
//     iconAnchor: [12, 41],
//     popupAnchor: [1, -34]
// });

const MapComponent = () => {
    const [userLocation, setUserLocation] = useState(null);
    const [selectedLocation, setSelectedLocation] = useState(null);
    const [mapCenter, setMapCenter] = useState([0, 0]);
    const [mapZoom, setMapZoom] = useState(2);

    useEffect(() => {
        if ('geolocation' in navigator) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    setUserLocation([position.coords.latitude, position.coords.longitude]);
                    setMapCenter([position.coords.latitude, position.coords.longitude]);
                    setMapZoom(15); // Set an appropriate zoom level
                },
                (error) => {
                    console.error('Error getting user location:', error);
                    // If unable to get user location, set default center and zoom level
                    setMapCenter([0, 0]);
                    setMapZoom(2);
                }
            );
        } else {
            console.log('Geolocation is not available.');
            // If geolocation is not available, set default center and zoom level
            setMapCenter([0, 0]);
            setMapZoom(2);
        }
    }, []);

    // useEffect(() => {
    //     setMapCenter(userLocation);
    //     setMapZoom(20);
    // }, [userLocation])

    const handleMapClick = (e) => {
        setSelectedLocation(e.latlng);
        console.log("hi");
    };

    const sendLocation = async () => {
        try {
            await axios.post('/api/location', selectedLocation);
            alert('Location sent successfully!');
        } catch (error) {
            console.error('Error sending location:', error);
            alert('Error sending location. Please try again.');
        }
    };



    return (
        <div className=''>
            <h1>Select Location</h1>
            {userLocation && (
                <p>User Location: Latitude: {userLocation[0]}, Longitude: {userLocation[1]}</p>
            )}
            {userLocation && <MapContainer center={mapCenter} zoom={mapZoom} onClick={(e) => handleMapClick(e)} style={{ height: '600px', width: '100%' }}>
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                {userLocation && <Marker position={userLocation}><Popup>You are here</Popup></Marker>}
                {selectedLocation && <Marker position={selectedLocation}><Popup>You selected this location</Popup></Marker>}

            </MapContainer>}
            {selectedLocation && (
                <div>
                    <p>Selected Location: Latitude: {selectedLocation.lat}, Longitude: {selectedLocation.lng}</p>
                    <button onClick={sendLocation}>Send Location</button>
                </div>
            )}
        </div>
    );
};

export default MapComponent;
