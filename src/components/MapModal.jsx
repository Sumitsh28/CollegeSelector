"use client";

import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import { IoClose } from "react-icons/io5";
import "leaflet/dist/leaflet.css";
import { useTheme } from "../context/ThemeContext";

const MapModal = ({ isOpen, onClose, location }) => {
  const { theme } = useTheme();

  if (!isOpen) return null;

  const center = location
    ? { lat: location.lat, lng: location.lng }
    : { lat: 0, lng: 0 };

  const defaultIcon = new L.Icon({
    iconUrl: require("leaflet/dist/images/marker-icon.png"),
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
    shadowSize: [41, 41],
  });

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div
        className={`${
          theme === "light" ? "bg-[#9BA3AF]" : "bg-[#202226]"
        } p-4 rounded-3xl relative w-auto`}
      >
        <button
          onClick={onClose}
          className="absolute top-3 right-2 text-2xl text-white "
        >
          <IoClose />
        </button>
        <div className="m-5 rounded-3xl md:w-[600px] md:h-[400px] w-[300px] h-[300px]">
          <MapContainer
            center={center}
            zoom={15}
            style={{ height: "100%", width: "100%" }}
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            <Marker position={center} icon={defaultIcon}>
              <Popup>{location.name}</Popup>
            </Marker>
          </MapContainer>
        </div>
      </div>
    </div>
  );
};

export default MapModal;
