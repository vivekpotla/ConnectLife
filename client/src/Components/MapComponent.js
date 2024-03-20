import React, { useEffect, useState, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';

const MapComponent = ({ setLocationAddress, setMarker, address }) => {
    const setLocationAddressRef = useRef(setLocationAddress);
    const setMarkerRef = useRef(setMarker);
    useEffect(() => {
        setLocationAddressRef.current = setLocationAddress;
    }, [setLocationAddress]);
    useEffect(() => {
        setMarkerRef.current = setMarker;
    }, [setMarker]);

    useEffect(() => {
        mapboxgl.accessToken = 'pk.eyJ1Ijoic2Fpa3VtYXIzIiwiYSI6ImNscjRtemcycTFnMXkyam8xOXIzMG9oMWgifQ.EMbgdqSKTvIrE0yjrC20_w';
        const map = new mapboxgl.Map({
            container: 'map',
            style: 'mapbox://styles/mapbox/streets-v12',
            center: [78.3839, 17.537537],
            zoom: 10,
            scrollZoom: false
        });

        // Add zoom controls
        map.addControl(new mapboxgl.NavigationControl(), "bottom-left");

        const geocoder = new MapboxGeocoder({
            accessToken: mapboxgl.accessToken,
            mapboxgl: mapboxgl,
            marker: { color: "red" }
        });

        // Event listener for geocoder result
        geocoder.on('result', (event) => {
            const lngLat = event.result.geometry.coordinates;
            if (setMarkerRef.current) {
                setMarkerRef.current({
                    longitude: lngLat[0],
                    latitude: lngLat[1]
                });
            }
            if (setLocationAddressRef.current) {
                setLocationAddressRef.current(event.result.place_name);
            }
        });

        map.addControl(geocoder);
        if (address) {
            const truncatedAddress = address.slice(0, 20);
            geocoder.query(truncatedAddress);
        }
        else {
            const addressCollege = "VNR Vignana Jyothi Institute of Engineering & Technology, VNR Vignana Jyothi Institute of Engineering & Technology Batchupally Nizampet (S.O.) Hyderabad- 500 090,Rangareddy Dt. Andhra P, Hyderabad, Telangana 500090, India";
            const truncatedAddress = addressCollege.slice(0, 20);
            geocoder.query(truncatedAddress)
        }



        return () => {
            map.remove();
        };
    }, []);

    return (
        <div id="map" style={{ height: "72vh", borderRadius: "10px", marginBottom: "20px" }} className='w-50 mx-auto' />
    );
};

export default MapComponent;
